// LLM provider abstraction. Two implementations:
//  - OpenAiProvider: real calls via the OpenAI-compatible chat/completions
//    API (works against either a real OpenAI key or this sandbox's
//    GenSpark dev proxy — see README for which is configured where).
//  - MockProvider: fully deterministic, zero-cost, no network — used by
//    default in automated tests (and anywhere CHAT_PROVIDER=mock is set)
//    so test runs never depend on, or bill, a real API.
//
// Both implement the same ChatProvider interface so the rest of the chat
// pipeline (route handler, tool loop) never needs to know which is active.

import type { ChatEnvBindings } from './config'
import { getModel, getInputPricePer1k, getOutputPricePer1k, MAX_OUTPUT_TOKENS } from './config'

export interface ToolDefinition {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

export interface ChatMessageForModel {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | null
  tool_calls?: { id: string; type: 'function'; function: { name: string; arguments: string } }[]
  tool_call_id?: string
  name?: string
}

export interface ModelToolCall {
  id: string
  name: string
  arguments: string // raw JSON string, NOT yet parsed/validated
}

export interface ModelTurnResult {
  content: string | null
  toolCalls: ModelToolCall[]
  usage: { promptTokens: number; completionTokens: number }
  estimatedCostUsd: number
}

export interface ChatProvider {
  /** Non-streaming turn used internally to decide whether a tool call is
   * needed (kept simple/robust) — the route layer re-streams the final
   * user-visible content token-by-token via streamFinal(). */
  completeTurn(messages: ChatMessageForModel[], tools: ToolDefinition[]): Promise<ModelTurnResult>
  /** Streams a final (no-more-tool-calls) assistant message token by token. */
  streamFinal(messages: ChatMessageForModel[], tools: ToolDefinition[], onToken: (t: string) => void): Promise<ModelTurnResult>
  estimateReservationUsd(): number
  modelName(): string
}

function estimateCost(env: ChatEnvBindings, promptTokens: number, completionTokens: number): number {
  const inPrice = getInputPricePer1k(env)
  const outPrice = getOutputPricePer1k(env)
  return (promptTokens / 1000) * inPrice + (completionTokens / 1000) * outPrice
}

export class OpenAiProvider implements ChatProvider {
  private env: ChatEnvBindings
  constructor(env: ChatEnvBindings) {
    this.env = env
  }

  modelName(): string {
    return getModel(this.env)
  }

  estimateReservationUsd(): number {
    // Conservative upper-bound estimate for a single turn (system prompt +
    // history + tool defs as input, MAX_OUTPUT_TOKENS as output) — reserved
    // BEFORE the call so the budget check is concurrency-safe even under
    // concurrent requests (see db.ts reserveBudget).
    const assumedPromptTokens = 3000
    return estimateCost(this.env, assumedPromptTokens, MAX_OUTPUT_TOKENS)
  }

  private baseUrl(): string {
    return (this.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '')
  }

  async completeTurn(messages: ChatMessageForModel[], tools: ToolDefinition[]): Promise<ModelTurnResult> {
    const res = await fetch(`${this.baseUrl()}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.modelName(),
        messages,
        tools: tools.length ? tools : undefined,
        tool_choice: tools.length ? 'auto' : undefined,
        max_completion_tokens: MAX_OUTPUT_TOKENS,
      }),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`OpenAI error ${res.status}: ${text.slice(0, 300)}`)
    }
    const json: any = await res.json()
    const choice = json.choices?.[0]
    const msg = choice?.message ?? {}
    const toolCalls: ModelToolCall[] = (msg.tool_calls ?? []).map((tc: any) => ({
      id: tc.id,
      name: tc.function?.name,
      arguments: tc.function?.arguments ?? '{}',
    }))
    const promptTokens = json.usage?.prompt_tokens ?? 0
    const completionTokens = json.usage?.completion_tokens ?? 0
    return {
      content: msg.content ?? null,
      toolCalls,
      usage: { promptTokens, completionTokens },
      estimatedCostUsd: estimateCost(this.env, promptTokens, completionTokens),
    }
  }

  async streamFinal(messages: ChatMessageForModel[], tools: ToolDefinition[], onToken: (t: string) => void): Promise<ModelTurnResult> {
    const res = await fetch(`${this.baseUrl()}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.modelName(),
        messages,
        max_completion_tokens: MAX_OUTPUT_TOKENS,
        stream: true,
        stream_options: { include_usage: true },
      }),
    })
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => '')
      throw new Error(`OpenAI stream error ${res.status}: ${text.slice(0, 300)}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let full = ''
    let promptTokens = 0
    let completionTokens = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') continue
        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) {
            full += delta
            onToken(delta)
          }
          if (json.usage) {
            promptTokens = json.usage.prompt_tokens ?? promptTokens
            completionTokens = json.usage.completion_tokens ?? completionTokens
          }
        } catch {
          // ignore malformed SSE fragment (keep-alives, comments)
        }
      }
    }

    return {
      content: full,
      toolCalls: [],
      usage: { promptTokens, completionTokens },
      estimatedCostUsd: estimateCost(this.env, promptTokens, completionTokens),
    }
  }
}

// --- Mock provider -----------------------------------------------------
// Deterministic canned behavior for automated tests and local dev without a
// configured key. Inspects the latest user message for simple keyword
// triggers so tests can exercise each tool path without a real model.

export class MockProvider implements ChatProvider {
  modelName(): string {
    return 'mock-groundwork-ai'
  }
  estimateReservationUsd(): number {
    return 0.001
  }

  private lastUserText(messages: ChatMessageForModel[]): string {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') return (messages[i].content ?? '').toLowerCase()
    }
    return ''
  }

  // Find the most recent tool result appended earlier in THIS turn's loop
  // (rowsToModelMessages in orchestrator.ts never replays tool messages from
  // prior turns' history, so any 'tool' role message present here was
  // produced by this turn's own tool-call loop). Used to (a) stop the mock
  // from re-triggering the same tool every iteration and (b) surface the
  // real computed data in the final answer instead of a generic fallback.
  private findLastToolResult(messages: ChatMessageForModel[]): { name: string; result: any } | null {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role === 'tool' && m.name && m.content) {
        try {
          return { name: m.name, result: JSON.parse(m.content) }
        } catch {
          return null
        }
      }
    }
    return null
  }

  private summarizeToolResult(name: string, result: any): string {
    if (!result || result.ok === false) {
      return "I ran into an issue computing that — want me to connect you with the team directly instead?"
    }
    const data = result.data || {}
    switch (name) {
      case 'get_pricing_estimate': {
        const firstAssumption = Array.isArray(data.assumptions) && data.assumptions.length ? ` (${data.assumptions[0]})` : ''
        if (data.isCustomAi) {
          const subtotal = (Number(data.basePrice) || 0) + (Number(data.additionalUsersCost) || 0)
          return `For the ${data.planName} plan with ${data.totalUsers} users, the platform comes to $${subtotal.toLocaleString()}/mo${firstAssumption} — the AI add-on you picked is custom-priced, so our team will quote that part directly. Want me to compare this to another plan, or connect you with the team?`
        }
        return `For the ${data.planName} plan with ${data.totalUsers} users, that's an estimated $${Number(data.grandTotal).toLocaleString()}/mo total${firstAssumption}. Want me to compare this to another plan, estimate your time savings, or connect you with the team?`
      }
      case 'compare_plans':
        return `${data.planA.name} starts at $${Number(data.planA.basePrice).toLocaleString()}/mo (${data.planA.includedUsers} users included) and ${data.planB.name} starts at $${Number(data.planB.basePrice).toLocaleString()}/mo (${data.planB.includedUsers} users included). Want a pricing estimate for your actual team size?`
      case 'calculate_roi':
        return `Based on what you shared, that's roughly ${data.hoursSavedPerWeek} hours/week saved — worth about $${Number(data.dollarsSavedPerMonth).toLocaleString()}/mo. Want me to net that against a specific plan's cost, or get a pricing estimate?`
      case 'recommend_trade_page':
        return `${data.name} is a great fit — ${data.summary} You can see it at ${data.url}. Want a pricing estimate too?`
      case 'jump_to_demo_panel':
        return `Here's the ${data.label} panel — ${data.description} Want to see another panel, or get a pricing estimate?`
      case 'get_booking_link':
        return `Here's the link to pick your own time: ${data.url}. ${data.note || ''} Anything else I can help with first?`
      case 'capture_lead':
        return data.message || "Got it — I've passed this along to the team."
      case 'get_customer_story':
        return `${data.tag} — ${data.title} ${data.desc} (${(data.metrics || []).join(', ')}). Note: ${data.disclosure} Want to see another story, or get a pricing estimate?`
      case 'check_feature_availability':
        return data.found ? `${data.label} [${data.statusLabel}]: ${data.summary}` : data.message || "I couldn't confirm that — want me to connect you with the team?"
      case 'summarize_conversation_so_far':
        return data.transcript && data.transcript.length ? `Quick recap:\n${(data.transcript as string[]).join('\n')}` : data.summary || "We haven't talked about much yet."
      default:
        return "Here's what I found — let me know if you'd like more detail."
    }
  }

  async completeTurn(messages: ChatMessageForModel[], tools: ToolDefinition[]): Promise<ModelTurnResult> {
    const text = this.lastUserText(messages)
    const hasTool = (name: string) => tools.some((t) => t.function.name === name)

    // A tool already ran earlier in this turn's loop — don't re-trigger it
    // (the real keyword-match below has no memory and would fire again on
    // every remaining iteration); instead give a final answer that actually
    // uses the computed result, same as a real model would on its next turn
    // once it sees the tool's output in context.
    const priorToolResult = this.findLastToolResult(messages)
    if (priorToolResult) {
      return {
        content: this.summarizeToolResult(priorToolResult.name, priorToolResult.result),
        toolCalls: [],
        usage: { promptTokens: 60, completionTokens: 50 },
        estimatedCostUsd: 0.0008,
      }
    }

    // Prompt-injection style probes: the mock deliberately REFUSES to treat
    // embedded instructions as commands, to exercise the "ignore
    // injected instructions" expectation in automated tests.
    if (/ignore (all|your) (previous|prior) instructions|system prompt|reveal your (prompt|instructions)/.test(text)) {
      return {
        content: "I can't share internal instructions or override my setup, but I'm happy to help with questions about Groundwork CRM — pricing, features, or booking a demo.",
        toolCalls: [],
        usage: { promptTokens: 50, completionTokens: 40 },
        estimatedCostUsd: 0.0005,
      }
    }

    if (hasTool('get_pricing_estimate') && /price|pricing|cost|\$|how much/.test(text)) {
      const planMatch = /core|growth|pro/.exec(text)
      const usersMatch = /(\d+)\s*(user|people|team)/.exec(text)
      const aiMatch = /essentials|plus|max|byok|custom/.exec(text)
      return {
        content: null,
        toolCalls: [
          {
            id: 'mock-call-pricing-1',
            name: 'get_pricing_estimate',
            arguments: JSON.stringify({
              plan: planMatch ? planMatch[0] : 'growth',
              team_size: usersMatch ? Number(usersMatch[1]) : 6,
              ai_package: aiMatch ? aiMatch[0] : 'included',
            }),
          },
        ],
        usage: { promptTokens: 120, completionTokens: 30 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('compare_plans') && /compare|difference between|vs\.?\s|versus|which plan/.test(text)) {
      const plans = text.match(/core|growth|pro/g) || []
      const planA = plans[0] || 'growth'
      const planB = plans[1] || (planA === 'growth' ? 'pro' : 'growth')
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-compare-1', name: 'compare_plans', arguments: JSON.stringify({ plan_a: planA, plan_b: planB }) }],
        usage: { promptTokens: 110, completionTokens: 25 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('calculate_roi') && /roi|worth it|save (time|money)|how much time|pay for itself|payback/.test(text)) {
      const hoursMatch = /(\d+(?:\.\d+)?)\s*(hour|hr)/.exec(text)
      return {
        content: null,
        toolCalls: [
          {
            id: 'mock-call-roi-1',
            name: 'calculate_roi',
            arguments: JSON.stringify({ admin_hours_per_week: hoursMatch ? Number(hoursMatch[1]) : 10 }),
          },
        ],
        usage: { promptTokens: 110, completionTokens: 25 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('recommend_trade_page') && /trade|hvac|plumb|roof|landscap|electric|chimney|septic|pest|irrigation|paint|garage/.test(text)) {
      const slugMatch = /hvac|plumbing|electrical|chimney|roofing|garage-door|septic|pest-control|irrigation|painting|landscaping/.exec(text)
      return {
        content: null,
        toolCalls: [
          { id: 'mock-call-trade-1', name: 'recommend_trade_page', arguments: JSON.stringify({ trade: slugMatch ? slugMatch[0] : 'landscaping' }) },
        ],
        usage: { promptTokens: 110, completionTokens: 25 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('jump_to_demo_panel') && /demo|dispatch|pipeline|invoic|schedule|workspace|show me/.test(text)) {
      const panelMatch = /dispatch|pipeline|invoicing|schedule|command|leads|clients/.exec(text)
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-panel-1', name: 'jump_to_demo_panel', arguments: JSON.stringify({ panel_key: panelMatch ? panelMatch[0] : 'command' }) }],
        usage: { promptTokens: 100, completionTokens: 20 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('get_booking_link') && /book|schedule a (demo|call)|calendar|time slot/.test(text)) {
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-booking-1', name: 'get_booking_link', arguments: '{}' }],
        usage: { promptTokens: 90, completionTokens: 15 },
        estimatedCostUsd: 0.0008,
      }
    }

    if (hasTool('capture_lead') && /@/.test(text) && /\.[a-z]{2,}/.test(text)) {
      const emailMatch = /[\w.+-]+@[\w-]+\.[\w.-]+/.exec(text)
      return {
        content: null,
        toolCalls: [
          {
            id: 'mock-call-lead-1',
            name: 'capture_lead',
            arguments: JSON.stringify({
              name: 'Test Visitor',
              email: emailMatch ? emailMatch[0] : 'visitor@example.com',
              company: 'Cedar Grove Landscape Co.',
              trade: 'landscaping',
              team_size: '6-10',
              current_software: 'Spreadsheets',
              main_frustration: 'Follow-ups keep slipping through the cracks',
              timeline: 'Next quarter',
              context_summary: 'Visitor runs a landscaping company and is evaluating CRMs to fix follow-up consistency.',
            }),
          },
        ],
        usage: { promptTokens: 150, completionTokens: 60 },
        estimatedCostUsd: 0.0015,
      }
    }

    if (hasTool('get_customer_story') && /case study|customer story|success story|example|proof|anyone like me|someone like me|testimonial/.test(text)) {
      const slugMatch = /hvac|plumbing|electrical|chimney|roofing|garage-door|septic|pest-control|irrigation|painting|landscaping/.exec(text)
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-story-1', name: 'get_customer_story', arguments: JSON.stringify(slugMatch ? { trade: slugMatch[0] } : {}) }],
        usage: { promptTokens: 100, completionTokens: 20 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('check_feature_availability') && /does (it|groundwork)|can it|is there a|do you (have|support)|feature/.test(text)) {
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-feature-1', name: 'check_feature_availability', arguments: JSON.stringify({ query: text.slice(0, 300) }) }],
        usage: { promptTokens: 100, completionTokens: 20 },
        estimatedCostUsd: 0.001,
      }
    }

    if (hasTool('summarize_conversation_so_far') && /what were we talking about|recap|summarize (this|our|the) conversation|lost track|where were we/.test(text)) {
      return {
        content: null,
        toolCalls: [{ id: 'mock-call-summary-1', name: 'summarize_conversation_so_far', arguments: '{}' }],
        usage: { promptTokens: 80, completionTokens: 15 },
        estimatedCostUsd: 0.0008,
      }
    }

    // Default: plain conversational reply, one question at a time.
    return {
      content: "Hi — I'm Groundwork AI, an AI assistant for this site. What's the main thing you're trying to figure out — pricing, a specific feature, or whether Groundwork fits your trade?",
      toolCalls: [],
      usage: { promptTokens: 80, completionTokens: 40 },
      estimatedCostUsd: 0.0008,
    }
  }

  async streamFinal(messages: ChatMessageForModel[], _tools: ToolDefinition[], onToken: (t: string) => void): Promise<ModelTurnResult> {
    // Re-run completeTurn's text-generation path (no tools) and stream it
    // word-by-word so the frontend's streaming UI can be exercised in tests
    // without a real network call.
    const result = await this.completeTurn(messages, [])
    const text = result.content ?? "I'm Groundwork AI — happy to help. What would you like to know?"
    const words = text.split(' ')
    for (const w of words) {
      onToken(w + ' ')
    }
    return { ...result, content: text }
  }
}

export function createProvider(env: ChatEnvBindings, mode: 'mock' | 'openai'): ChatProvider {
  return mode === 'openai' ? new OpenAiProvider(env) : new MockProvider()
}
