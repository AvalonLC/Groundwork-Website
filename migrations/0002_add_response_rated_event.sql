-- Add 'response_rated' to the chat_events.event_type CHECK constraint
-- (thumbs up/down on AI responses — part of the Phase 2 "measurement"
-- enhancements). SQLite has no ALTER TABLE ... DROP/ADD CONSTRAINT, so the
-- standard safe pattern is: create the new table shape, copy rows, drop the
-- old table, rename. Wrapped so it's safe to re-run (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS chat_events_new (
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
    'prompt_injection_suspected',
    'response_rated'
  )),
  event_meta TEXT,  -- JSON
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT INTO chat_events_new (id, session_id, event_type, event_meta, created_at)
  SELECT id, session_id, event_type, event_meta, created_at FROM chat_events;

DROP TABLE chat_events;
ALTER TABLE chat_events_new RENAME TO chat_events;

CREATE INDEX IF NOT EXISTS idx_chat_events_type ON chat_events(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_events_session ON chat_events(session_id);

-- Store which messages have been rated, to let the frontend show the
-- rating as already-selected on reload within the same session, and to
-- prevent unbounded duplicate rating spam for the same assistant message.
-- message_id references chat_messages.id (the assistant row being rated).
CREATE TABLE IF NOT EXISTS chat_message_ratings (
  message_id INTEGER PRIMARY KEY REFERENCES chat_messages(id),
  session_id TEXT NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
