// Groundwork AI — centralized, env-overridable configuration. Nothing here
// should be hardcoded elsewhere in the chat module; every tunable lives here
// so ops can adjust budget caps, rate limits, and the model without a code
// change (per the user's explicit "model must remain configurable, not a
// foregone conclusion" requirement, extended to the other knobs that matter
// for a pilot).

export interface ChatEnvBindings {
  DB: D1Database
  SENDGRID_API_KEY: string
  // OpenAI — all optional at the type level because Phase 1 must run with
  // mocked responses when no key is configured yet (see provider.ts).
  OPENAI_API_KEY?: string
  OPENAI_BASE_URL?: string
  OPENAI_MODEL?: string
  // Placeholder per-1K-token USD pricing — NOT verified real OpenAI/billing
  // numbers (see README "Remaining credential & configuration requirements").
  // Override via Cloudflare secrets once real pricing is confirmed for
  // whichever model ends up in production.
  OPENAI_PRICE_INPUT_PER_1K?: string
  OPENAI_PRICE_OUTPUT_PER_1K?: string
  // Budget circuit breaker.
  CHAT_DAILY_BUDGET_USD?: string
  CHAT_MONTHLY_BUDGET_USD?: string
  // Force the mock provider even if a real key is present — useful for CI/
  // automated tests that must be deterministic and free. 'mock' | 'openai'.
  CHAT_PROVIDER?: string
  // Simple shared-secret gate for the internal metrics dashboard (no login
  // system exists on this marketing site — see docs for the tradeoff).
  ADMIN_METRICS_KEY?: string
}

export function getModel(env: ChatEnvBindings): string {
  return env.OPENAI_MODEL?.trim() || 'gpt-5-mini'
}

export function getDailyBudgetUsd(env: ChatEnvBindings): number {
  const v = Number(env.CHAT_DAILY_BUDGET_USD)
  return Number.isFinite(v) && v > 0 ? v : 5
}

export function getMonthlyBudgetUsd(env: ChatEnvBindings): number {
  const v = Number(env.CHAT_MONTHLY_BUDGET_USD)
  return Number.isFinite(v) && v > 0 ? v : 50
}

// Placeholder pricing — deliberately conservative (slightly overestimates
// cost so the reservation step under-serves rather than over-serves the
// budget while real pricing is unconfirmed). See config comment above.
export function getInputPricePer1k(env: ChatEnvBindings): number {
  const v = Number(env.OPENAI_PRICE_INPUT_PER_1K)
  return Number.isFinite(v) && v >= 0 ? v : 0.00025
}
export function getOutputPricePer1k(env: ChatEnvBindings): number {
  const v = Number(env.OPENAI_PRICE_OUTPUT_PER_1K)
  return Number.isFinite(v) && v >= 0 ? v : 0.002
}

export function getProviderMode(env: ChatEnvBindings): 'mock' | 'openai' {
  if (env.CHAT_PROVIDER === 'mock') return 'mock'
  if (env.CHAT_PROVIDER === 'openai') return 'openai'
  // Default: use the real provider only if a key is actually configured.
  return env.OPENAI_API_KEY ? 'openai' : 'mock'
}

// --- Bounds & limits (abuse/cost controls, requirement #5) -----------------

/** Max characters accepted in a single visitor chat message. */
export const MAX_USER_MESSAGE_CHARS = 2000
/** Max assistant output tokens per model call — bounds cost per turn. */
export const MAX_OUTPUT_TOKENS = 700
/** Max tool-call round-trips the server will execute per single user
 * message before forcing a final answer — prevents runaway tool loops. */
export const MAX_TOOL_LOOP_ITERATIONS = 4
/** Max prior turns (user+assistant pairs) replayed to the model as history —
 * bounds both token cost and prompt-injection surface from old messages. */
export const MAX_HISTORY_MESSAGES = 16
/** Per-session message rate limit (rolling window). */
export const SESSION_RATE_LIMIT = { max: 20, windowMs: 60 * 60 * 1000 } // 20/hour
/** Per-IP message rate limit (rolling window) — catches multi-session abuse
 * from a single visitor/script. */
export const IP_RATE_LIMIT = { max: 40, windowMs: 60 * 60 * 1000 } // 40/hour
/** Outbound chat-lead notification emails per day, independent of the AI
 * cost budget (requirement #5 — "separate email-send limits"). */
export const MAX_CHAT_EMAILS_PER_DAY = 50
/** Bounded field lengths for capture_lead inputs (requirement: "bounded
 * inputs and outputs" + "validate all tool arguments"). */
export const LEAD_FIELD_MAX_LENGTHS = {
  name: 200,
  email: 200,
  company: 200,
  trade: 100,
  team_size: 50,
  current_software: 200,
  main_frustration: 800,
  timeline: 100,
  context_summary: 1200,
} as const
