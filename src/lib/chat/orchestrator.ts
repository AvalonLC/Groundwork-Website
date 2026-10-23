// The tool-calling loop for a single chat turn. Pulled out of the route
// handler so it can be unit-tested directly against the MockProvider without
// spinning up an HTTP server.

import type { ChatEnvBindings } from './config'
import { MAX_TOOL_LOOP_ITERATIONS, MAX_HISTORY_MESSAGES } from './config'
import type { ChatMessageForModel, ChatProvider } from './provider'
import { TOOL_DEFINITIONS, executeTool } from './tools'
import { buildSystemPrompt } from './systemPrompt'
import { getRecentMessages, insertMessage, logEvent, type ChatMessageRow } from './db'

export interface OrchestratorEvents {
  onToken?: (token: string) => void
  onToolCall?: (name: string, args: Record<string, unknown>) => void
  onToolResult?: (name: string, result: unknown) => void
}

export interface OrchestratorResult {
  finalText: string
  totalCostUsd: number
  toolCallCount: number
  hitLoopLimit: boolean
}

function rowsToModelMessages(rows: ChatMessageRow[]): ChatMessageForModel[] {
  const out: ChatMessageForModel[] = []
  for (const r of rows) {
    if (r.role === 'user' || r.role === 'assistant') {
      out.push({ role: r.role, content: r.content })
    }
    // Tool call/result pairs from prior turns are intentionally NOT replayed
    // into history — each turn re-derives any tool results it needs fresh,
    // which keeps history compact and avoids stale tool-result confusion.
  }
  return out
}

export async function runChatTurn(
  env: ChatEnvBindings,
  provider: ChatProvider,
  sessionId: string,
  currentPath: string,
  userMessage: string,
  events: OrchestratorEvents = {}
): Promise<OrchestratorResult> {
  const history = await getRecentMessages(env.DB, sessionId, MAX_HISTORY_MESSAGES)
  const systemPrompt = buildSystemPrompt(currentPath)

  const messages: ChatMessageForModel[] = [{ role: 'system', content: systemPrompt }, ...rowsToModelMessages(history), { role: 'user', content: userMessage }]

  await insertMessage(env.DB, sessionId, 'user', userMessage)

  let totalCost = 0
  let toolCallCount = 0
  let hitLoopLimit = false

  for (let iteration = 0; iteration < MAX_TOOL_LOOP_ITERATIONS; iteration++) {
    const isLastAllowedIteration = iteration === MAX_TOOL_LOOP_ITERATIONS - 1
    const turn = await provider.completeTurn(messages, isLastAllowedIteration ? [] : TOOL_DEFINITIONS)
    totalCost += turn.estimatedCostUsd

    if (turn.toolCalls.length === 0) {
      // No more tool calls — relay the final answer to the browser over SSE.
      // NOTE on streaming design: this chunks the single completion response
      // word-by-word rather than re-issuing a second true token-streaming
      // model call — that gives the "feels alive, not a form" incremental
      // UX from exactly one model call per turn (no doubled cost). It is
      // NOT token-by-token streaming straight from the provider; documented
      // here and in the test report as a deliberate Phase 1 simplification.
      const finalText = turn.content ?? ''
      if (events.onToken && finalText) {
        for (const word of finalText.split(' ')) {
          events.onToken(word + ' ')
        }
      }
      await insertMessage(env.DB, sessionId, 'assistant', finalText)
      return { finalText, totalCostUsd: totalCost, toolCallCount, hitLoopLimit }
    }

    // Append the assistant's tool-call message, then each tool result.
    messages.push({
      role: 'assistant',
      content: turn.content,
      tool_calls: turn.toolCalls.map((tc) => ({ id: tc.id, type: 'function', function: { name: tc.name, arguments: tc.arguments } })),
    })

    for (const call of turn.toolCalls) {
      toolCallCount++
      let parsedArgsForEvent: Record<string, unknown> = {}
      try {
        parsedArgsForEvent = JSON.parse(call.arguments)
      } catch {
        /* leave empty — executeTool will surface the parse error itself */
      }
      events.onToolCall?.(call.name, parsedArgsForEvent)

      const result = await executeTool(call.name, call.arguments, { env, sessionId })
      events.onToolResult?.(call.name, result)

      if (!result.ok) {
        await logEvent(env.DB, sessionId, 'tool_error', { tool: call.name, error: result.error })
      } else if (result.event) {
        await logEvent(env.DB, sessionId, result.event.type, result.event.meta)
      }

      await insertMessage(env.DB, sessionId, 'tool', null, call.name, call.arguments, JSON.stringify(result))

      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        name: call.name,
        content: JSON.stringify(result),
      })
    }
  }

  // Loop limit reached without a final answer — degrade gracefully rather
  // than looping forever or erroring opaquely.
  hitLoopLimit = true
  const fallback = "I've gathered a few things here — let me simplify: would you like me to connect you with the team directly, or point you to a specific page?"
  events.onToken?.(fallback)
  await insertMessage(env.DB, sessionId, 'assistant', fallback)
  return { finalText: fallback, totalCostUsd: totalCost, toolCallCount, hitLoopLimit }
}
