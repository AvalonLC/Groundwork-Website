// Notification-failure handling: when SendGrid fails, the lead must still be
// saved (save-before-notify), notify_attempts/notify_last_error must be
// recorded, and the confirmation message returned to the visitor must
// honestly reflect the failure — never claim the team was notified, and
// NEVER claim anything is "booked" (requirement #1). This exercises the
// real tools.ts execCaptureLead() + attemptLeadNotification() path against a
// stubbed fetch (no real network call), complementing the earlier manual
// curl verification (which hit the real SendGrid dev key and incidentally
// got a genuine 401) with a deterministic, repeatable automated version that
// covers BOTH the failure and success branches.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { FakeD1Database } from '../helpers/fakeD1.ts'
import { makeTestEnv, stubFetch, fakeSendGridSuccess, fakeSendGridFailure } from '../helpers/testEnv.ts'
import { ensureSession, insertMessage, getLeadById } from '../../src/lib/chat/db.ts'
import { executeTool } from '../../src/lib/chat/tools.ts'

const SESSION_ID = 'notify-test-session-1'
const CAPTURE_ARGS = JSON.stringify({
  name: 'Sam Okafor',
  email: 'sam@cedargrovelandscape.example',
  company: 'Cedar Grove Landscape Co.',
  trade: 'landscaping',
  team_size: '6-10',
  current_software: 'Spreadsheets',
  main_frustration: 'Follow-ups keep slipping through the cracks',
  timeline: 'Next quarter',
  context_summary: 'Visitor runs a landscaping company and wants to fix follow-up consistency.',
})

test('capture_lead: SendGrid failure still saves the lead, records the failure, and never claims "booked"', async () => {
  const db = new FakeD1Database()
  const fetchStub = stubFetch(() => fakeSendGridFailure(401, 'Maximum credits exceeded'))
  try {
    await ensureSession(db as any, SESSION_ID, '/pricing')
    await insertMessage(db as any, SESSION_ID, 'user', 'I run a landscaping company and want to talk to someone')

    const env = makeTestEnv(db)
    const result = await executeTool('capture_lead', CAPTURE_ARGS, { env, sessionId: SESSION_ID })

    assert.equal(result.ok, true, 'capture_lead must still report ok:true — saving the lead succeeded even though notify failed')
    assert.equal(result.data?.status, 'saved')
    assert.equal(result.data?.notified, false, 'notified must be false when SendGrid fails')

    const message = String(result.data?.message ?? '')
    assert.ok(!/\bbooked\b/i.test(message), 'confirmation message must never claim the appointment is "booked"')
    assert.ok(!/\bscheduled\b/i.test(message), 'confirmation message must never claim it is "scheduled"')
    // "confirmed" is allowed ONLY inside a negation like "isn't a confirmed
    // appointment yet" — it must never appear as a positive claim.
    assert.ok(
      !/\bconfirmed\b/i.test(message) || /isn'?t a confirmed appointment/i.test(message),
      'the word "confirmed" may only appear as part of a negation ("isn\'t a confirmed appointment yet")'
    )
    assert.ok(/snag|issue|trouble/i.test(message), 'message should acknowledge the notification hiccup honestly')

    // Save-before-notify: the lead row must exist in D1 regardless of the
    // SendGrid outcome, with the failure recorded for a later retry sweep.
    const leadRow = db.raw('SELECT id, notified_at, notify_attempts, notify_last_error FROM chat_leads WHERE session_id = ?1', { p1: SESSION_ID })[0] as {
      id: number
      notified_at: string | null
      notify_attempts: number
      notify_last_error: string | null
    }
    assert.ok(leadRow, 'lead row must exist in D1 even though notification failed')
    assert.equal(leadRow.notified_at, null, 'notified_at must stay null on failure')
    assert.equal(leadRow.notify_attempts, 1)
    assert.ok(leadRow.notify_last_error && leadRow.notify_last_error.includes('401'), 'notify_last_error should capture the SendGrid status')

    const lead = await getLeadById(db as any, leadRow.id)
    assert.equal(lead!.notified_at, null)
    assert.equal(lead!.notify_attempts, 1)

    // A notify_failed event must have been logged for ops visibility.
    const events = db.raw(`SELECT event_type FROM chat_events WHERE event_type = 'notify_failed'`)
    assert.equal(events.length, 1)

    assert.equal(fetchStub.getCallCount(), 1, 'exactly one SendGrid call should have been attempted')
  } finally {
    fetchStub.restore()
    db.close()
  }
})

test('capture_lead: SendGrid success saves the lead, marks it notified, and the message says the team was notified (still not "booked")', async () => {
  const db = new FakeD1Database()
  const fetchStub = stubFetch(() => fakeSendGridSuccess())
  try {
    await ensureSession(db as any, SESSION_ID, '/pricing')
    const env = makeTestEnv(db)
    const result = await executeTool('capture_lead', CAPTURE_ARGS, { env, sessionId: SESSION_ID })

    assert.equal(result.ok, true)
    assert.equal(result.data?.status, 'saved')
    assert.equal(result.data?.notified, true)

    const message = String(result.data?.message ?? '')
    assert.ok(!/\bbooked\b/i.test(message))
    assert.ok(
      !/\bconfirmed appointment\b/i.test(message) || /\bisn'?t a confirmed appointment\b/i.test(message),
      'if "confirmed appointment" appears it must be in a negation ("isn\'t a confirmed appointment")'
    )

    const leadRow = db.raw('SELECT notified_at, notify_attempts FROM chat_leads WHERE session_id = ?1', { p1: SESSION_ID })[0] as {
      notified_at: string | null
      notify_attempts: number
    }
    assert.ok(leadRow.notified_at, 'notified_at must be set on success')
    assert.equal(leadRow.notify_attempts, 0, 'notify_attempts only increments on FAILURE — success never increments it')
  } finally {
    fetchStub.restore()
    db.close()
  }
})

test('capture_lead: missing/invalid email is rejected before any D1 write or SendGrid call', async () => {
  const db = new FakeD1Database()
  const fetchStub = stubFetch(() => fakeSendGridSuccess())
  try {
    await ensureSession(db as any, SESSION_ID, '/pricing')
    const env = makeTestEnv(db)
    const result = await executeTool('capture_lead', JSON.stringify({ name: 'No Email Person' }), { env, sessionId: SESSION_ID })

    assert.equal(result.ok, false)
    assert.ok(result.error && /email/i.test(result.error))

    const countRow = db.raw('SELECT COUNT(*) as c FROM chat_leads')[0] as { c: number }
    assert.equal(countRow.c, 0, 'no lead row should be created when email validation fails')
    assert.equal(fetchStub.getCallCount(), 0, 'SendGrid must never be called when input validation fails')
  } finally {
    fetchStub.restore()
    db.close()
  }
})
