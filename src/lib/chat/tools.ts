// Server-side tool implementations for Groundwork AI. This is the fixed,
// auditable action surface the model is allowed to use — nothing else.
// Requirement #4 ("enforce actions on the server, not just via system-prompt
// wording") is implemented here: every tool call's arguments are validated
// against an explicit schema BEFORE anything runs, every returned URL is
// checked against ROUTE_ALLOWLIST, and side-effecting tools (capture_lead)
// go through save-before-notify + idempotency + throttling.

import type { ToolDefinition } from './provider'
import type { ChatEnvBindings } from './config'
import { LEAD_FIELD_MAX_LENGTHS, MAX_CHAT_EMAILS_PER_DAY } from './config'
import { calculatePricing, comparePlans, calculateRoi, CALC_PLANS, AI_PACKAGES } from '../pricing'
import { TRADES, getTradeBySlug } from '../../data/trades'
import { DEMO_PANELS, isAllowedUrl } from '../../data/ai-knowledge'
import { sendMail, esc } from '../sendgrid'
import {
  insertLeadIfNew,
  markLeadNotified,
  recordLeadNotifyFailure,
  markSessionLeadCaptured,
  getVerbatimUserMessages,
  checkAndIncrementEmailThrottle,
  logEvent,
} from './db'

const NOTIFY_TO = 'tyler@groundwork-crm.com'
const NOTIFY_FROM = 'notifications@groundwork-crm.com'

// --- Tool definitions sent to the model --------------------------------

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'get_pricing_estimate',
      description:
        'Compute a real Groundwork pricing estimate. ALWAYS use this instead of stating a price from memory — it returns the exact math and the assumptions behind it.',
      parameters: {
        type: 'object',
        properties: {
          plan: { type: 'string', enum: CALC_PLANS.map((p) => p.key), description: 'Which plan tier' },
          team_size: { type: 'integer', minimum: 1, maximum: 999, description: 'Total internal users (owners, admins, reps, field crew, office staff — not customer-portal logins)' },
          ai_package: { type: 'string', enum: AI_PACKAGES.map((a) => a.key), description: 'Which Groundwork AI add-on package' },
        },
        required: ['plan', 'team_size', 'ai_package'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'compare_plans',
      description:
        "Compare two Groundwork plans side by side — base price, included users, and the real feature differences between them. Use this when a visitor asks what's different between two plans (e.g. \"what's the difference between Growth and Pro\") instead of describing it from memory.",
      parameters: {
        type: 'object',
        properties: {
          plan_a: { type: 'string', enum: CALC_PLANS.map((p) => p.key), description: 'First plan to compare' },
          plan_b: { type: 'string', enum: CALC_PLANS.map((p) => p.key), description: 'Second plan to compare' },
        },
        required: ['plan_a', 'plan_b'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'calculate_roi',
      description:
        "Estimate time and cost savings from consolidating admin/scheduling/invoicing work into Groundwork. ALWAYS use this instead of estimating savings from memory — it returns the exact math, clearly labeled as an estimate. Ask the visitor how many hours a week they (or their office) currently spend on admin/scheduling/invoicing before calling this.",
      parameters: {
        type: 'object',
        properties: {
          admin_hours_per_week: { type: 'number', minimum: 0, maximum: 168, description: 'Current hours per week spent on admin, scheduling, dispatch, and invoicing' },
          hourly_cost_usd: { type: 'number', minimum: 1, description: 'Optional — loaded hourly cost of the person(s) doing that admin work. Defaults to a conservative $35/hr if not given.' },
          plan: { type: 'string', enum: CALC_PLANS.map((p) => p.key), description: 'Optional — a plan to net the savings against for a real monthly value number' },
          team_size: { type: 'integer', minimum: 1, maximum: 999, description: 'Optional — only used if "plan" is given, to compute that plan\'s cost' },
          ai_package: { type: 'string', enum: AI_PACKAGES.map((a) => a.key), description: 'Optional — only used if "plan" is given' },
        },
        required: ['admin_hours_per_week'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recommend_trade_page',
      description: "Get the real, verified URL and summary for one of Groundwork's trade pages. Use when a visitor names a specific trade.",
      parameters: {
        type: 'object',
        properties: {
          trade: { type: 'string', enum: TRADES.map((t) => t.slug), description: 'Trade slug' },
        },
        required: ['trade'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'jump_to_demo_panel',
      description:
        'Get a deep link into a specific panel of the /explore interactive sample workspace. IMPORTANT: every panel here is a demo illustration, not a live feature a customer is using today — always say so.',
      parameters: {
        type: 'object',
        properties: {
          panel_key: { type: 'string', enum: DEMO_PANELS.map((d) => d.key), description: 'Which demo panel to deep-link to' },
        },
        required: ['panel_key'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_booking_link',
      description:
        'Get the real link to the self-serve demo booking calendar at /demo. Use this when a visitor wants to schedule a specific time themselves. This does NOT book anything on their behalf.',
      parameters: { type: 'object', properties: {}, additionalProperties: false },
    },
  },
  {
    type: 'function',
    function: {
      name: 'capture_lead',
      description:
        'Save the visitor as a lead and notify the sales team. This is a REQUEST for sales to reach out — it is NOT a confirmed appointment. Collect fields naturally as they come up in conversation, one at a time; do not require every field before calling this — email is the only hard requirement.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.name },
          email: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.email, description: 'Required — visitor work email' },
          company: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.company },
          trade: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.trade },
          team_size: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.team_size },
          current_software: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.current_software },
          main_frustration: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.main_frustration },
          timeline: { type: 'string', maxLength: LEAD_FIELD_MAX_LENGTHS.timeline },
          context_summary: {
            type: 'string',
            maxLength: LEAD_FIELD_MAX_LENGTHS.context_summary,
            description: 'One AI-generated paragraph summarizing what the visitor needs. Will be clearly labeled as AI-generated to sales.',
          },
        },
        required: ['email'],
        additionalProperties: false,
      },
    },
  },
]

// --- Validation helpers ---------------------------------------------------

export class ToolValidationError extends Error {}

function assertType(value: unknown, type: 'string' | 'number', field: string): void {
  if (type === 'string' && typeof value !== 'string') throw new ToolValidationError(`Field "${field}" must be a string`)
  if (type === 'number' && typeof value !== 'number') throw new ToolValidationError(`Field "${field}" must be a number`)
}

function clampStr(value: unknown, maxLen: number): string | null {
  if (value === undefined || value === null) return null
  const s = String(value).trim().slice(0, maxLen)
  return s || null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseJsonArgs(raw: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new ToolValidationError('Tool arguments must be a JSON object')
    }
    return parsed as Record<string, unknown>
  } catch (e) {
    if (e instanceof ToolValidationError) throw e
    throw new ToolValidationError('Tool arguments were not valid JSON')
  }
}

// --- Tool results -----------------------------------------------------

export interface ToolExecutionContext {
  env: ChatEnvBindings
  sessionId: string
}

export interface ToolResult {
  ok: boolean
  data?: Record<string, unknown>
  error?: string
  /** Set when this tool call should be recorded as an outcome event. */
  event?: { type: Parameters<typeof logEvent>[2]; meta?: Record<string, unknown> }
}

export async function executeTool(name: string, rawArgs: string, ctx: ToolExecutionContext): Promise<ToolResult> {
  try {
    const args = parseJsonArgs(rawArgs)
    switch (name) {
      case 'get_pricing_estimate':
        return execGetPricingEstimate(args)
      case 'compare_plans':
        return execComparePlans(args)
      case 'calculate_roi':
        return execCalculateRoi(args)
      case 'recommend_trade_page':
        return execRecommendTradePage(args)
      case 'jump_to_demo_panel':
        return execJumpToDemoPanel(args)
      case 'get_booking_link':
        return execGetBookingLink()
      case 'capture_lead':
        return await execCaptureLead(args, ctx)
      default:
        return { ok: false, error: `Unknown tool "${name}" — not in the allowed tool set.` }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Invalid tool arguments'
    return { ok: false, error: message }
  }
}

function execGetPricingEstimate(args: Record<string, unknown>): ToolResult {
  assertType(args.plan, 'string', 'plan')
  assertType(args.ai_package, 'string', 'ai_package')
  if (typeof args.team_size !== 'number' || !Number.isFinite(args.team_size)) {
    throw new ToolValidationError('Field "team_size" must be a number')
  }
  const result = calculatePricing(args.plan as string, args.team_size as number, args.ai_package as string)
  if (!result.ok) return { ok: false, error: result.error }
  return { ok: true, data: result as unknown as Record<string, unknown> }
}

function execComparePlans(args: Record<string, unknown>): ToolResult {
  assertType(args.plan_a, 'string', 'plan_a')
  assertType(args.plan_b, 'string', 'plan_b')
  const result = comparePlans(args.plan_a as string, args.plan_b as string)
  if (!result.ok) return { ok: false, error: result.error }
  return { ok: true, data: result as unknown as Record<string, unknown> }
}

function execCalculateRoi(args: Record<string, unknown>): ToolResult {
  if (typeof args.admin_hours_per_week !== 'number' || !Number.isFinite(args.admin_hours_per_week)) {
    throw new ToolValidationError('Field "admin_hours_per_week" must be a number')
  }
  const hourlyCost = typeof args.hourly_cost_usd === 'number' && Number.isFinite(args.hourly_cost_usd) ? args.hourly_cost_usd : null
  const plan = typeof args.plan === 'string' ? args.plan : null
  const teamSize = typeof args.team_size === 'number' && Number.isFinite(args.team_size) ? args.team_size : null
  const aiPackage = typeof args.ai_package === 'string' ? args.ai_package : null
  const result = calculateRoi(args.admin_hours_per_week, hourlyCost, plan, teamSize, aiPackage)
  if (!result.ok) return { ok: false, error: result.error }
  return { ok: true, data: result as unknown as Record<string, unknown> }
}

function execRecommendTradePage(args: Record<string, unknown>): ToolResult {
  assertType(args.trade, 'string', 'trade')
  const trade = getTradeBySlug(args.trade as string)
  if (!trade) return { ok: false, error: `Unknown trade "${args.trade}".` }
  const url = `/trades/${trade.slug}`
  if (!isAllowedUrl(url)) return { ok: false, error: 'Resolved URL failed the route allowlist check (unexpected).' }
  return {
    ok: true,
    data: { url, name: trade.name, summary: trade.navDesc, status: 'live' },
    event: { type: 'trade_page_clicked', meta: { trade: trade.slug } },
  }
}

function execJumpToDemoPanel(args: Record<string, unknown>): ToolResult {
  assertType(args.panel_key, 'string', 'panel_key')
  const panel = DEMO_PANELS.find((p) => p.key === args.panel_key)
  if (!panel) return { ok: false, error: `Unknown demo panel "${args.panel_key}".` }
  const url = `/explore?panel=${encodeURIComponent(panel.key)}`
  if (!isAllowedUrl(url)) return { ok: false, error: 'Resolved URL failed the route allowlist check (unexpected).' }
  return {
    ok: true,
    data: { url, label: panel.label, description: panel.description, status: panel.status },
    event: { type: 'demo_panel_clicked', meta: { panel: panel.key } },
  }
}

function execGetBookingLink(): ToolResult {
  const url = '/demo'
  if (!isAllowedUrl(url)) return { ok: false, error: 'Resolved URL failed the route allowlist check (unexpected).' }
  return {
    ok: true,
    data: {
      url,
      note: 'This links to the real scheduling calendar — the visitor picks their own time. This does not confirm a booking on their behalf.',
    },
  }
}

async function execCaptureLead(args: Record<string, unknown>, ctx: ToolExecutionContext): Promise<ToolResult> {
  const email = clampStr(args.email, LEAD_FIELD_MAX_LENGTHS.email)
  if (!email || !EMAIL_RE.test(email)) {
    throw new ToolValidationError('A valid "email" is required to capture a lead.')
  }

  const name = clampStr(args.name, LEAD_FIELD_MAX_LENGTHS.name)
  const company = clampStr(args.company, LEAD_FIELD_MAX_LENGTHS.company)
  const trade = clampStr(args.trade, LEAD_FIELD_MAX_LENGTHS.trade)
  const teamSize = clampStr(args.team_size, LEAD_FIELD_MAX_LENGTHS.team_size)
  const currentSoftware = clampStr(args.current_software, LEAD_FIELD_MAX_LENGTHS.current_software)
  const mainFrustration = clampStr(args.main_frustration, LEAD_FIELD_MAX_LENGTHS.main_frustration)
  const timeline = clampStr(args.timeline, LEAD_FIELD_MAX_LENGTHS.timeline)
  const aiSummary = clampStr(args.context_summary, LEAD_FIELD_MAX_LENGTHS.context_summary)

  // Requirement: "verbatim visitor answers... preserved separately... so
  // sales sees ground truth, not just an interpretation." We pull the
  // visitor's actual stored messages rather than trusting the model's
  // restatement of them for this field.
  const verbatimMessages = await getVerbatimUserMessages(ctx.env.DB, ctx.sessionId)
  const verbatimAnswersJson = JSON.stringify({
    // Best-effort structured echo of the fields the model extracted, paired
    // with the full raw transcript of what the visitor actually typed, so a
    // human reviewer can always verify the AI's structured fields against
    // the real conversation.
    structured_fields_as_extracted: { name, email, company, trade, team_size: teamSize, current_software: currentSoftware, main_frustration: mainFrustration, timeline },
    raw_visitor_messages: verbatimMessages,
  })

  // Save BEFORE sending any notification (requirement: "save leads before
  // sending notifications"). Idempotent on (session, email).
  const { inserted, leadId } = await insertLeadIfNew(ctx.env.DB, {
    sessionId: ctx.sessionId,
    name,
    email,
    company,
    trade,
    teamSize,
    currentSoftware,
    mainFrustration,
    timeline,
    aiSummary,
    verbatimAnswersJson,
  })

  if (!inserted) {
    await logEvent(ctx.env.DB, ctx.sessionId, 'lead_duplicate_blocked', { leadId })
    return {
      ok: true,
      data: {
        status: 'already_received',
        message: "I've already sent your info to the team for this conversation — no need to resend it.",
      },
    }
  }

  await markSessionLeadCaptured(ctx.env.DB, ctx.sessionId)

  // Durable retry: attempt the send now; if it fails, the lead is already
  // safely stored (notified_at stays null, notify_attempts increments) and
  // can be retried later (e.g. via a scheduled sweep in a future phase, or
  // manually) WITHOUT re-prompting the visitor or risking a duplicate D1 row.
  const notifyResult = await attemptLeadNotification(ctx.env, {
    leadId,
    name,
    email,
    company,
    trade,
    teamSize,
    currentSoftware,
    mainFrustration,
    timeline,
    aiSummary,
    verbatimMessages,
  })

  await logEvent(ctx.env.DB, ctx.sessionId, 'lead_captured', { leadId, notified: notifyResult.ok })

  // Confirmation message MUST accurately reflect what succeeded: lead saving
  // succeeded regardless of notify outcome, so we always confirm the save,
  // but we only claim "the team has been notified" if the email actually
  // sent. Critically: NEVER say "booked" (requirement #1).
  return {
    ok: true,
    data: {
      status: 'saved',
      notified: notifyResult.ok,
      message: notifyResult.ok
        ? "Got it — I've sent your info to the team. They'll reach out to find a time that works. This isn't a confirmed appointment yet; if you'd rather lock in an exact time yourself right now, I can give you the direct scheduling link."
        : "Got it — I've saved your info. Our notification system hit a snag sending it to the team just now, but your request is safely recorded and will still reach them; you can also email tyler@groundwork-crm.com directly if you don't hear back soon. This isn't a confirmed appointment yet — if you'd like to lock in an exact time yourself, I can share the direct scheduling link.",
    },
  }
}

interface NotifyLeadParams {
  leadId: number
  name: string | null
  email: string
  company: string | null
  trade: string | null
  teamSize: string | null
  currentSoftware: string | null
  mainFrustration: string | null
  timeline: string | null
  aiSummary: string | null
  verbatimMessages: string[]
}

async function attemptLeadNotification(env: ChatEnvBindings, params: NotifyLeadParams): Promise<{ ok: boolean }> {
  const throttleOk = await checkAndIncrementEmailThrottle(env.DB, MAX_CHAT_EMAILS_PER_DAY)
  if (!throttleOk) {
    await recordLeadNotifyFailure(env.DB, params.leadId, 'Daily chat-lead email send limit reached')
    await logEvent(env.DB, null, 'notify_failed', { leadId: params.leadId, reason: 'throttled' })
    return { ok: false }
  }

  const subjectName = params.company || params.name || params.email
  const text = [
    `New chat lead from Groundwork AI on the marketing site.`,
    `This is a REQUEST — the visitor has NOT booked a confirmed appointment.`,
    ``,
    `Name: ${esc(params.name) || '(not given)'}`,
    `Email: ${params.email}`,
    `Company: ${esc(params.company) || '(not given)'}`,
    `Trade: ${esc(params.trade) || '(not given)'}`,
    `Team size: ${esc(params.teamSize) || '(not given)'}`,
    `Current software: ${esc(params.currentSoftware) || '(not given)'}`,
    `Main frustration: ${esc(params.mainFrustration) || '(not given)'}`,
    `Timeline: ${esc(params.timeline) || '(not given)'}`,
    ``,
    `--- AI-GENERATED SUMMARY (not the visitor's own words) ---`,
    params.aiSummary || '(none generated)',
    ``,
    `--- VISITOR'S VERBATIM MESSAGES (ground truth, unedited) ---`,
    params.verbatimMessages.length ? params.verbatimMessages.map((m, i) => `[${i + 1}] ${m}`).join('\n') : '(no prior messages captured)',
  ].join('\n')

  const result = await sendMail({
    apiKey: env.SENDGRID_API_KEY,
    to: NOTIFY_TO,
    from: NOTIFY_FROM,
    fromName: 'Groundwork Website',
    replyTo: params.email,
    subject: `[Groundwork Chat Lead] ${subjectName}`,
    text,
  })

  if (result.ok) {
    await markLeadNotified(env.DB, params.leadId)
    return { ok: true }
  }

  await recordLeadNotifyFailure(env.DB, params.leadId, `SendGrid ${result.status}: ${result.error ?? ''}`)
  await logEvent(env.DB, null, 'notify_failed', { leadId: params.leadId, status: result.status })
  return { ok: false }
}

/** Retry a previously-failed notification for an existing, already-saved
 * lead. Exposed for the admin/metrics surface and for a future scheduled
 * sweep — never creates a new D1 row, only re-attempts the email. */
export async function retryLeadNotification(env: ChatEnvBindings, leadId: number): Promise<{ ok: boolean }> {
  const lead = await env.DB.prepare(`SELECT * FROM chat_leads WHERE id = ?1`).bind(leadId).first<Record<string, unknown>>()
  if (!lead) return { ok: false }
  if (lead.notified_at) return { ok: true } // already succeeded
  const verbatim = JSON.parse((lead.verbatim_answers as string) || '{}')
  const result = await attemptLeadNotification(env, {
    leadId,
    name: (lead.name as string) ?? null,
    email: lead.email as string,
    company: (lead.company as string) ?? null,
    trade: (lead.trade as string) ?? null,
    teamSize: (lead.team_size as string) ?? null,
    currentSoftware: (lead.current_software as string) ?? null,
    mainFrustration: (lead.main_frustration as string) ?? null,
    timeline: (lead.timeline as string) ?? null,
    aiSummary: (lead.ai_summary as string) ?? null,
    verbatimMessages: verbatim.raw_visitor_messages ?? [],
  })
  if (result.ok) await logEvent(env.DB, null, 'notify_retried', { leadId })
  return result
}
