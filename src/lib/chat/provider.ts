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
  constructor(private env: ChatEnvBindings) {}

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

  async completeTurn(messages: ChatMessageForModel[], tools: ToolDefinition[]): Promise<ModelTurnResult> {
    const text = this.lastUserText(messages)
    const hasTool = (name: string) => tools.some((t) => t.function.name === name)

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
