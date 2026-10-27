// Duplicate-lead idempotency — a second capture_lead call for the same
// (session, email) pair must NOT create a second D1 row and must NOT
// trigger a second notification email. This exercises the real db.ts
// insertLeadIfNew() against a real SQLite schema (via FakeD1Database),
// rather than relying only on the manual curl verification done
// previously against a live wrangler server.
//
// Run with: npm test (runs all tests/unit/*.ts)

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { FakeD1Database } from '../helpers/fakeD1.ts'
import { insertLeadIfNew, ensureSession, getLeadById } from '../../src/lib/chat/db.ts'

function baseLeadParams(overrides: Partial<Parameters<typeof insertLeadIfNew>[1]> = {}) {
  return {
    sessionId: 'dup-test-session-1',
    name: 'Jordan Rivera',
    email: 'jordan@cedargrovelandscape.example',
    company: 'Cedar Grove Landscape Co.',
    trade: 'landscaping',
    teamSize: '6-10',
    currentSoftware: 'Spreadsheets',
    mainFrustration: 'Follow-ups keep slipping through the cracks',
    timeline: 'Next quarter',
    aiSummary: 'Visitor runs a landscaping company and wants to fix follow-up consistency.',
    verbatimAnswersJson: JSON.stringify({ raw_visitor_messages: ['I run a landscaping company'] }),
    ...overrides,
  }
}

test('first capture_lead call for a (session, email) pair inserts a new row', async () => {
  const db = new FakeD1Database()
  try {
    await ensureSession(db as any, 'dup-test-session-1', '/pricing')
    const result = await insertLeadIfNew(db as any, baseLeadParams())
    assert.equal(result.inserted, true)
    assert.ok(result.leadId > 0)

    const countRow = db.raw('SELECT COUNT(*) as c FROM chat_leads')[0] as { c: number }
    assert.equal(countRow.c, 1)
  } finally {
    db.close()
  }
})

test('second capture_lead call with the SAME session+email is idempotent — no new row, same leadId returned', async () => {
  const db = new FakeD1Database()
  try {
    await ensureSession(db as any, 'dup-test-session-1', '/pricing')
    const first = await insertLeadIfNew(db as any, baseLeadParams())
    const second = await insertLeadIfNew(db as any, baseLeadParams({ mainFrustration: 'A completely different restated frustration' }))

    assert.equal(second.inserted, false, 'second call must be reported as a duplicate, not a fresh insert')
    assert.equal(second.leadId, first.leadId, 'duplicate call must resolve to the SAME existing lead row')

    const countRow = db.raw('SELECT COUNT(*) as c FROM chat_leads')[0] as { c: number }
    assert.equal(countRow.c, 1, 'exactly one row must exist in chat_leads after two calls with the same session+email')

    // The duplicate call's (different) field values must NOT have overwritten
    // the original row — insertLeadIfNew only SELECTs on duplicate, it never
    // UPDATEs. Confirms "save once" semantics, not "last write wins".
    const row = db.raw('SELECT main_frustration FROM chat_leads WHERE id = ?1', { p1: first.leadId })[0] as { main_frustration: string }
    assert.equal(row.main_frustration, 'Follow-ups keep slipping through the cracks')
  } finally {
    db.close()
  }
})

test('same email in a DIFFERENT session is NOT treated as a duplicate (uniqueness is per-session, not global)', async () => {
  const db = new FakeD1Database()
  try {
    await ensureSession(db as any, 'dup-test-session-1', '/pricing')
    await ensureSession(db as any, 'dup-test-session-2', '/pricing')

    const first = await insertLeadIfNew(db as any, baseLeadParams({ sessionId: 'dup-test-session-1' }))
    const second = await insertLeadIfNew(db as any, baseLeadParams({ sessionId: 'dup-test-session-2' }))

    assert.equal(first.inserted, true)
    assert.equal(second.inserted, true)
    assert.notEqual(first.leadId, second.leadId)

    const countRow = db.raw('SELECT COUNT(*) as c FROM chat_leads')[0] as { c: number }
    assert.equal(countRow.c, 2)
  } finally {
    db.close()
  }
})

test('a DIFFERENT email in the SAME session is NOT treated as a duplicate', async () => {
  const db = new FakeD1Database()
  try {
    await ensureSession(db as any, 'dup-test-session-1', '/pricing')
    const first = await insertLeadIfNew(db as any, baseLeadParams({ email: 'jordan@cedargrovelandscape.example' }))
    const second = await insertLeadIfNew(db as any, baseLeadParams({ email: 'alex@cedargrovelandscape.example' }))

    assert.equal(first.inserted, true)
    assert.equal(second.inserted, true)
    assert.notEqual(first.leadId, second.leadId)
  } finally {
    db.close()
  }
})

test('getLeadById reflects notify state correctly for a freshly-inserted (not yet notified) lead', async () => {
  const db = new FakeD1Database()
  try {
    await ensureSession(db as any, 'dup-test-session-1', '/pricing')
    const { leadId } = await insertLeadIfNew(db as any, baseLeadParams())
    const lead = await getLeadById(db as any, leadId)
    assert.ok(lead)
    assert.equal(lead!.notified_at, null)
    assert.equal(lead!.notify_attempts, 0)
  } finally {
    db.close()
  }
})
