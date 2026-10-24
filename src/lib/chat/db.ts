// D1 data-access layer for Groundwork AI. Centralizing all queries here
// keeps the reliability guarantees (save-before-notify, idempotent lead
// capture, concurrency-safe budget reservations) in one auditable place
// rather than scattered through route handlers.

import type { ChatEnvBindings } from './config'

export type ChatRole = 'user' | 'assistant' | 'tool' | 'system'

export interface ChatMessageRow {
  id: number
  session_id: string
  role: ChatRole
  content: string | null
  tool_name: string | null
  tool_args: string | null
  tool_result: string | null
  created_at: string
}

function nowIso(): string {
  return new Date().toISOString()
}

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

export function monthUtc(): string {
  return new Date().toISOString().slice(0, 7) // YYYY-MM
}

// --- Sessions ----------------------------------------------------------

export async function ensureSession(db: D1Database, sessionId: string, path: string): Promise<void> {
  await db
    .prepare(
      `INSERT INTO chat_sessions (id, first_path, last_path, created_at, last_activity_at)
       VALUES (?1, ?2, ?2, ?3, ?3)
       ON CONFLICT(id) DO UPDATE SET last_path = ?2, last_activity_at = ?3`
    )
    .bind(sessionId, path, nowIso())
    .run()
}

export async function touchSessionMessageCount(db: D1Database, sessionId: string): Promise<void> {
  await db
    .prepare(`UPDATE chat_sessions SET message_count = message_count + 1, last_activity_at = ?2 WHERE id = ?1`)
    .bind(sessionId, nowIso())
    .run()
}

export async function markSessionLeadCaptured(db: D1Database, sessionId: string): Promise<void> {
  await db.prepare(`UPDATE chat_sessions SET lead_captured = 1 WHERE id = ?1`).bind(sessionId).run()
}

// --- Messages ------------------------------------------------------------

/** Returns the inserted row's id — used so the assistant's final message in
 * a turn can be referenced later (e.g. for thumbs up/down rating). */
export async function insertMessage(
  db: D1Database,
  sessionId: string,
  role: ChatRole,
  content: string | null,
  toolName?: string | null,
  toolArgs?: string | null,
  toolResult?: string | null
): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO chat_messages (session_id, role, content, tool_name, tool_args, tool_result, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    )
    .bind(sessionId, role, content ?? null, toolName ?? null, toolArgs ?? null, toolResult ?? null, nowIso())
    .run()
  return result.meta.last_row_id as number
}

export async function getRecentMessages(db: D1Database, sessionId: string, limit: number): Promise<ChatMessageRow[]> {
  const res = await db
    .prepare(`SELECT * FROM chat_messages WHERE session_id = ?1 ORDER BY id DESC LIMIT ?2`)
    .bind(sessionId, limit)
    .all<ChatMessageRow>()
  return (res.results ?? []).reverse()
}

/** Pull the visitor's own verbatim words from message history for a set of
 * topic fields (trade/frustration/timeline/etc). Used by capture_lead to
 * populate verbatim_answers — this reads real stored user messages, never
 * the model's paraphrase, satisfying requirement #3/"preserved separately". */
export async function getVerbatimUserMessages(db: D1Database, sessionId: string): Promise<string[]> {
  const res = await db
    .prepare(`SELECT content FROM chat_messages WHERE session_id = ?1 AND role = 'user' ORDER BY id ASC`)
    .bind(sessionId)
    .all<{ content: string | null }>()
  return (res.results ?? []).map((r) => r.content ?? '').filter(Boolean)
}

// --- Leads (save-before-notify + idempotency) -----------------------------

export interface LeadInsertResult {
  inserted: boolean // false = idempotent duplicate, existing row reused
  leadId: number
}

export async function insertLeadIfNew(
  db: D1Database,
  params: {
    sessionId: string
    name: string | null
    email: string
    company: string | null
    trade: string | null
    teamSize: string | null
    currentSoftware: string | null
    mainFrustration: string | null
    timeline: string | null
    aiSummary: string | null
    verbatimAnswersJson: string
  }
): Promise<LeadInsertResult> {
  // Idempotency: UNIQUE(session_id, email) — a second capture_lead call for
  // the same visitor/email in the same session does not create a new row or
  // trigger a second notification (requirement #4: duplicate-submission
  // protection; requirement: "save leads before sending notifications").
  const existing = await db
    .prepare(`SELECT id FROM chat_leads WHERE session_id = ?1 AND email = ?2`)
    .bind(params.sessionId, params.email)
    .first<{ id: number }>()
  if (existing) {
    return { inserted: false, leadId: existing.id }
  }

  const result = await db
    .prepare(
      `INSERT INTO chat_leads
         (session_id, name, email, company, trade, team_size, current_software, main_frustration, timeline, ai_summary, verbatim_answers, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`
    )
    .bind(
      params.sessionId,
      params.name,
      params.email,
      params.company,
      params.trade,
      params.teamSize,
      params.currentSoftware,
      params.mainFrustration,
      params.timeline,
      params.aiSummary,
      params.verbatimAnswersJson,
      nowIso()
    )
    .run()

  const leadId = result.meta.last_row_id as number
  return { inserted: true, leadId }
}

export async function markLeadNotified(db: D1Database, leadId: number): Promise<void> {
  await db.prepare(`UPDATE chat_leads SET notified_at = ?2 WHERE id = ?1`).bind(leadId, nowIso()).run()
}

export async function recordLeadNotifyFailure(db: D1Database, leadId: number, error: string): Promise<void> {
  await db
    .prepare(`UPDATE chat_leads SET notify_attempts = notify_attempts + 1, notify_last_error = ?2 WHERE id = ?1`)
    .bind(leadId, error.slice(0, 500))
    .run()
}

export async function getLeadById(db: D1Database, leadId: number): Promise<{ notified_at: string | null; notify_attempts: number } | null> {
  return db
    .prepare(`SELECT notified_at, notify_attempts FROM chat_leads WHERE id = ?1`)
    .bind(leadId)
    .first<{ notified_at: string | null; notify_attempts: number }>()
}

// --- Rate limiting ---------------------------------------------------------

export interface RateLimitCheck {
  allowed: boolean
  remaining: number
}

export async function checkAndIncrementRateLimit(
  db: D1Database,
  rateKey: string,
  max: number,
  windowMs: number
): Promise<RateLimitCheck> {
  const now = Date.now()
  const row = await db
    .prepare(`SELECT window_start, message_count FROM chat_rate_limits WHERE rate_key = ?1`)
    .bind(rateKey)
    .first<{ window_start: string; message_count: number }>()

  if (!row || now - new Date(row.window_start).getTime() > windowMs) {
    // New window.
    await db
      .prepare(
        `INSERT INTO chat_rate_limits (rate_key, window_start, message_count) VALUES (?1, ?2, 1)
         ON CONFLICT(rate_key) DO UPDATE SET window_start = ?2, message_count = 1`
      )
      .bind(rateKey, new Date(now).toISOString())
      .run()
    return { allowed: true, remaining: max - 1 }
  }

  if (row.message_count >= max) {
    return { allowed: false, remaining: 0 }
  }

  await db.prepare(`UPDATE chat_rate_limits SET message_count = message_count + 1 WHERE rate_key = ?1`).bind(rateKey).run()
  return { allowed: true, remaining: max - row.message_count - 1 }
}

// --- Budget (reserve-then-reconcile, concurrency-safe) ---------------------

async function ensureUsageRow(db: D1Database, day: string, month: string): Promise<void> {
  await db
    .prepare(`INSERT INTO chat_usage (day, month, cost_usd, reserved_usd, request_count) VALUES (?1, ?2, 0, 0, 0) ON CONFLICT(day) DO NOTHING`)
    .bind(day, month)
    .run()
}

export interface BudgetStatus {
  dayTotal: number // committed + reserved, today
  monthTotal: number // committed + reserved, this month
}

export async function getBudgetStatus(db: D1Database): Promise<BudgetStatus> {
  const day = todayUtc()
  const month = monthUtc()
  await ensureUsageRow(db, day, month)
  const dayRow = await db.prepare(`SELECT cost_usd, reserved_usd FROM chat_usage WHERE day = ?1`).bind(day).first<{ cost_usd: number; reserved_usd: number }>()
  const monthRow = await db
    .prepare(`SELECT COALESCE(SUM(cost_usd),0) as c, COALESCE(SUM(reserved_usd),0) as r FROM chat_usage WHERE month = ?1`)
    .bind(month)
    .first<{ c: number; r: number }>()
  return {
    dayTotal: (dayRow?.cost_usd ?? 0) + (dayRow?.reserved_usd ?? 0),
    monthTotal: (monthRow?.c ?? 0) + (monthRow?.r ?? 0),
  }
}

/** Reserve an estimated cost BEFORE calling the model — this is what makes
 * the budget cap concurrency-safe: two requests racing each other both
 * reserve against the same D1 row via atomic UPDATE, so neither can slip
 * through unaccounted-for while the other's OpenAI call is in flight. */
export async function reserveBudget(db: D1Database, estimatedUsd: number): Promise<void> {
  const day = todayUtc()
  const month = monthUtc()
  await ensureUsageRow(db, day, month)
  await db
    .prepare(`UPDATE chat_usage SET reserved_usd = reserved_usd + ?2, request_count = request_count + 1 WHERE day = ?1`)
    .bind(day, estimatedUsd)
    .run()
}

/** After the call completes (success or failure), release the reservation
 * and commit the actual cost (0 on failure). */
export async function reconcileBudget(db: D1Database, reservedUsd: number, actualUsd: number): Promise<void> {
  const day = todayUtc()
  await db
    .prepare(`UPDATE chat_usage SET reserved_usd = MAX(0, reserved_usd - ?2), cost_usd = cost_usd + ?3 WHERE day = ?1`)
    .bind(day, reservedUsd, actualUsd)
    .run()
}

// --- Email send throttle (independent of AI budget) -------------------------

export async function checkAndIncrementEmailThrottle(db: D1Database, maxPerDay: number): Promise<boolean> {
  const day = todayUtc()
  await db.prepare(`INSERT INTO chat_email_sends (day, send_count) VALUES (?1, 0) ON CONFLICT(day) DO NOTHING`).bind(day).run()
  const row = await db.prepare(`SELECT send_count FROM chat_email_sends WHERE day = ?1`).bind(day).first<{ send_count: number }>()
  if ((row?.send_count ?? 0) >= maxPerDay) return false
  await db.prepare(`UPDATE chat_email_sends SET send_count = send_count + 1 WHERE day = ?1`).bind(day).run()
  return true
}

// --- Events (outcome tracking) ----------------------------------------------

export type ChatEventType =
  | 'session_started'
  | 'message_sent'
  | 'demo_panel_clicked'
  | 'trade_page_clicked'
  | 'booking_link_clicked'
  | 'lead_captured'
  | 'lead_duplicate_blocked'
  | 'notify_failed'
  | 'notify_retried'
  | 'tool_error'
  | 'rate_limited'
  | 'budget_capped'
  | 'prompt_injection_suspected'
  | 'response_rated'

export async function logEvent(db: D1Database, sessionId: string | null, eventType: ChatEventType, meta?: Record<string, unknown>): Promise<void> {
  await db
    .prepare(`INSERT INTO chat_events (session_id, event_type, event_meta, created_at) VALUES (?1, ?2, ?3, ?4)`)
    .bind(sessionId, eventType, meta ? JSON.stringify(meta) : null, nowIso())
    .run()
}

// --- Response rating (thumbs up/down) ---------------------------------------

export type MessageRating = 'up' | 'down'

export interface RateMessageResult {
  ok: boolean
  /** True if this (messageId) already had a rating recorded — the caller
   * still treats this as success (idempotent, last-write-wins via REPLACE)
   * but the event log only needs one 'response_rated' per first vote. */
  wasAlreadyRated: boolean
}

/** Record (or change) a thumbs up/down vote on a specific assistant message.
 * Verifies the message belongs to the given session (defense against a
 * visitor rating another session's message id) and is an assistant message. */
export async function rateMessage(db: D1Database, sessionId: string, messageId: number, rating: MessageRating): Promise<RateMessageResult> {
  const msg = await db
    .prepare(`SELECT id FROM chat_messages WHERE id = ?1 AND session_id = ?2 AND role = 'assistant'`)
    .bind(messageId, sessionId)
    .first<{ id: number }>()
  if (!msg) return { ok: false, wasAlreadyRated: false }

  const existing = await db.prepare(`SELECT message_id FROM chat_message_ratings WHERE message_id = ?1`).bind(messageId).first<{ message_id: number }>()

  await db
    .prepare(
      `INSERT INTO chat_message_ratings (message_id, session_id, rating, created_at) VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(message_id) DO UPDATE SET rating = ?3, created_at = ?4`
    )
    .bind(messageId, sessionId, rating, nowIso())
    .run()

  return { ok: true, wasAlreadyRated: !!existing }
}
