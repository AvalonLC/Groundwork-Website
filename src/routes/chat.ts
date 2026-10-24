// /api/chat — Groundwork AI's chat endpoint, plus small supporting routes
// (session rate limiting, budget enforcement, graceful degradation).
// Mounted into the main Hono app in src/index.tsx.

import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import type { ChatEnvBindings } from '../lib/chat/config'
import {
  MAX_USER_MESSAGE_CHARS,
  SESSION_RATE_LIMIT,
  IP_RATE_LIMIT,
  getProviderMode,
} from '../lib/chat/config'
import { createProvider } from '../lib/chat/provider'
import { runChatTurn } from '../lib/chat/orchestrator'
import { tryReserveBudget, commitBudget } from '../lib/chat/budget'
import { ensureSession, touchSessionMessageCount, checkAndIncrementRateLimit, logEvent, rateMessage } from '../lib/chat/db'
import { isAllowedUrl } from '../data/ai-knowledge'

export const chatRoutes = new Hono<{ Bindings: ChatEnvBindings }>()

const DEGRADED_MESSAGE =
  "Groundwork AI is temporarily unavailable right now. You can still book a walkthrough directly or reach the team — nothing else on the site is affected."
const DEGRADED_LINKS = { bookingUrl: '/demo', email: 'tyler@groundwork-crm.com' }

function isValidSessionId(id: unknown): id is string {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{8,100}$/.test(id)
}

function getClientIp(c: { req: { header: (k: string) => string | undefined } }): string {
  return c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown'
}

chatRoutes.post('/api/chat', async (c) => {
  const { env } = c
  let body: Record<string, unknown>
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const sessionId = body.sessionId
  const path = typeof body.path === 'string' ? body.path.slice(0, 300) : '/'
  const message = typeof body.message === 'string' ? body.message : ''

  if (!isValidSessionId(sessionId)) {
    return c.json({ ok: false, error: 'Missing or invalid sessionId' }, 400)
  }
  if (!message.trim()) {
    return c.json({ ok: false, error: 'Message is required' }, 400)
  }
  // Bounded input (requirement: "bounded inputs and outputs").
  const trimmedMessage = message.slice(0, MAX_USER_MESSAGE_CHARS)

  const ip = getClientIp(c)

  // Rate limiting — per-session and per-IP, independent windows.
  const sessionLimit = await checkAndIncrementRateLimit(env.DB, `session:${sessionId}`, SESSION_RATE_LIMIT.max, SESSION_RATE_LIMIT.windowMs)
  if (!sessionLimit.allowed) {
    await logEvent(env.DB, sessionId, 'rate_limited', { scope: 'session' })
    return c.json({ ok: false, error: "You've sent a lot of messages in a short time — please wait a bit before continuing.", degraded: true, ...DEGRADED_LINKS }, 429)
  }
  const ipLimit = await checkAndIncrementRateLimit(env.DB, `ip:${ip}`, IP_RATE_LIMIT.max, IP_RATE_LIMIT.windowMs)
  if (!ipLimit.allowed) {
    await logEvent(env.DB, sessionId, 'rate_limited', { scope: 'ip' })
    return c.json({ ok: false, error: 'Too many requests from this connection — please wait a bit before continuing.', degraded: true, ...DEGRADED_LINKS }, 429)
  }

  await ensureSession(env.DB, sessionId, path)

  const providerMode = getProviderMode(env)
  const provider = createProvider(env, providerMode)

  // Budget circuit breaker — reserve BEFORE calling the model.
  const reservation = await tryReserveBudget(env, sessionId, provider.estimateReservationUsd())
  if (!reservation.granted) {
    return c.json(
      {
        ok: false,
        error: DEGRADED_MESSAGE,
        degraded: true,
        ...DEGRADED_LINKS,
      },
      200 // 200, not an error status — this is an expected, handled degraded state the UI shows inline, not a failure.
    )
  }

  return streamSSE(c, async (stream) => {
    let actualCost = 0
    try {
      const result = await runChatTurn(env, provider, sessionId, path, trimmedMessage, {
        onToken: async (token) => {
          await stream.writeSSE({ event: 'token', data: token })
        },
        onToolCall: async (name, args) => {
          await stream.writeSSE({ event: 'tool_call', data: JSON.stringify({ name, args }) })
        },
        onToolResult: async (name, result) => {
          // Only forward safe, UI-relevant fields — never forward raw tool
          // internals the frontend doesn't need (defense in depth; also
          // keeps SSE payloads small).
          const r = result as { ok: boolean; data?: Record<string, unknown> }
          if (r.ok && r.data) {
            const url = r.data.url
            if (typeof url === 'string' && !isAllowedUrl(url.split('?')[0])) {
              // Should be impossible (tools.ts already checks), but this is
              // the last line of defense before anything reaches the
              // browser: never forward a URL that fails the allowlist.
              return
            }
          }
          await stream.writeSSE({ event: 'tool_result', data: JSON.stringify({ name, result: r }) })
        },
      })
      actualCost = result.totalCostUsd
      await touchSessionMessageCount(env.DB, sessionId)
      await logEvent(env.DB, sessionId, 'message_sent', { toolCallCount: result.toolCallCount, hitLoopLimit: result.hitLoopLimit })
      await stream.writeSSE({ event: 'done', data: JSON.stringify({ ok: true, messageId: result.assistantMessageId }) })
    } catch (err) {
      console.error('Groundwork AI chat turn failed', err)
      await logEvent(env.DB, sessionId, 'tool_error', { error: err instanceof Error ? err.message : String(err) })
      await stream.writeSSE({
        event: 'error',
        data: JSON.stringify({ message: DEGRADED_MESSAGE, ...DEGRADED_LINKS }),
      })
    } finally {
      await commitBudget(env, reservation.reservedUsd, actualCost)
    }
  })
})

// Lightweight thumbs up/down rating for a specific assistant reply
// (requirement: "measurement" — quality signal beyond lead conversion).
// Does NOT touch the AI budget or tool loop; a tiny, idempotent D1 write.
chatRoutes.post('/api/chat/rate', async (c) => {
  const { env } = c
  let body: Record<string, unknown>
  try {
    body = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const sessionId = body.sessionId
  const messageId = body.messageId
  const rating = body.rating

  if (!isValidSessionId(sessionId)) {
    return c.json({ ok: false, error: 'Missing or invalid sessionId' }, 400)
  }
  if (typeof messageId !== 'number' || !Number.isInteger(messageId) || messageId <= 0) {
    return c.json({ ok: false, error: 'Missing or invalid messageId' }, 400)
  }
  if (rating !== 'up' && rating !== 'down') {
    return c.json({ ok: false, error: 'rating must be "up" or "down"' }, 400)
  }

  const result = await rateMessage(env.DB, sessionId, messageId, rating)
  if (!result.ok) {
    return c.json({ ok: false, error: 'Message not found for this session' }, 404)
  }
  if (!result.wasAlreadyRated) {
    await logEvent(env.DB, sessionId, 'response_rated', { messageId, rating })
  }
  return c.json({ ok: true })
})
