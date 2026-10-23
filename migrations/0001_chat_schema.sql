-- Groundwork AI chat — Phase 1 schema.
-- No real customer/tenant data ever touches this: visitor conversation data
-- only, same confidentiality posture as the rest of this fictional-cast
-- project. See docs/ai-chatbot-architecture.md for the full design doc.

-- One row per browser session (anonymous, cookie-based id, no auth).
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  first_path TEXT,
  last_path TEXT,
  message_count INTEGER NOT NULL DEFAULT 0,
  lead_captured INTEGER NOT NULL DEFAULT 0,
  last_activity_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Every chat turn — user, assistant, and tool messages. This is also the
-- authoritative source for "verbatim visitor answers" (see chat_leads below):
-- sales-facing summaries are generated text, but the actual words a visitor
-- typed live here, untouched, forever (subject to the retention policy).
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'tool', 'system')),
  content TEXT,
  tool_name TEXT,
  tool_args TEXT,     -- JSON
  tool_result TEXT,   -- JSON
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, created_at);

-- Leads captured via the chatbot. ai_summary is model-generated and MUST be
-- labeled as such everywhere it's shown (see tools.ts capture_lead and the
-- notification email template). verbatim_answers is a JSON object of the
-- visitor's own words, pulled from chat_messages at capture time — never
-- paraphrased, never overwritten.
CREATE TABLE IF NOT EXISTS chat_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id),
  name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  trade TEXT,
  team_size TEXT,
  current_software TEXT,
  main_frustration TEXT,
  timeline TEXT,
  ai_summary TEXT,         -- one paragraph, AI-generated, labeled as such downstream
  verbatim_answers TEXT,   -- JSON: { "trade": "...", "main_frustration": "...", ... }
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  notified_at TEXT,
  notify_attempts INTEGER NOT NULL DEFAULT 0,
  notify_last_error TEXT
);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session ON chat_leads(session_id);
-- De-dupe guard: one lead row per (session, email) pair. A second
-- capture_lead call in the same session with the same email is treated as
-- idempotent (see tools.ts) rather than creating a duplicate / re-notifying.
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_leads_session_email ON chat_leads(session_id, email);

-- Per-session + per-IP rate limiting (messages per rolling hour window).
CREATE TABLE IF NOT EXISTS chat_rate_limits (
  rate_key TEXT PRIMARY KEY,  -- 'session:<id>' or 'ip:<addr>'
  window_start TEXT NOT NULL,
  message_count INTEGER NOT NULL DEFAULT 0
);

-- Budget circuit breaker. One row per UTC day; month is derived from day for
-- the monthly rollup query. cost_usd is updated via a concurrency-safe
-- reserve-then-reconcile pattern (see budget.ts): a pending reservation is
-- added optimistically before the OpenAI call, then corrected to the actual
-- token cost afterward (or released on failure).
CREATE TABLE IF NOT EXISTS chat_usage (
  day TEXT PRIMARY KEY,     -- 'YYYY-MM-DD' (UTC)
  month TEXT NOT NULL,      -- 'YYYY-MM' (UTC)
  cost_usd REAL NOT NULL DEFAULT 0,
  reserved_usd REAL NOT NULL DEFAULT 0,  -- in-flight reservations not yet reconciled
  request_count INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_chat_usage_month ON chat_usage(month);

-- Outbound email send throttling for chat-sourced lead notifications,
-- independent of the AI cost budget above — this caps notification volume
-- even in a cost-free abuse scenario (e.g. scripted duplicate submissions
-- that happen to dodge the per-session dedupe).
CREATE TABLE IF NOT EXISTS chat_email_sends (
  day TEXT PRIMARY KEY,     -- 'YYYY-MM-DD' (UTC)
  send_count INTEGER NOT NULL DEFAULT 0
);

-- Outcome / instrumentation events. See docs for the full metrics
-- definitions (qualified lead, cost-per-qualified-lead, etc.) computed from
-- these rows plus chat_leads and chat_usage.
CREATE TABLE IF NOT EXISTS chat_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'session_started',
    'message_sent',
    'demo_panel_clicked',
    'trade_page_clicked',
    'booking_link_clicked',
    'lead_captured',
    'lead_duplicate_blocked',
    'notify_failed',
    'notify_retried',
    'tool_error',
    'rate_limited',
    'budget_capped',
    'prompt_injection_suspected'
  )),
  event_meta TEXT,  -- JSON
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_chat_events_type ON chat_events(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_events_session ON chat_events(session_id);
