// Shared helper for building a minimal ChatEnvBindings-shaped object backed
// by a fresh FakeD1Database, for unit tests that exercise real db.ts/
// tools.ts/budget.ts/orchestrator.ts code paths without a live wrangler
// server. Deliberately untyped against the real `ChatEnvBindings` interface
// (which expects the ambient Cloudflare `D1Database` type) — these test
// files run via `node --experimental-strip-types`, which only strips types
// and never type-checks, so a structural fake object works fine at runtime.
import { FakeD1Database } from './fakeD1.ts'

export interface TestEnvOverrides {
  SENDGRID_API_KEY?: string
  CHAT_DAILY_BUDGET_USD?: string
  CHAT_MONTHLY_BUDGET_USD?: string
  CHAT_PROVIDER?: string
  OPENAI_API_KEY?: string
}

export function makeTestEnv(db: FakeD1Database, overrides: TestEnvOverrides = {}) {
  return {
    DB: db as unknown as D1Database,
    SENDGRID_API_KEY: overrides.SENDGRID_API_KEY ?? 'test-sendgrid-key',
    CHAT_DAILY_BUDGET_USD: overrides.CHAT_DAILY_BUDGET_USD,
    CHAT_MONTHLY_BUDGET_USD: overrides.CHAT_MONTHLY_BUDGET_USD,
    CHAT_PROVIDER: overrides.CHAT_PROVIDER ?? 'mock',
    OPENAI_API_KEY: overrides.OPENAI_API_KEY,
  } as any
}

/** Temporarily replace globalThis.fetch for a test, returning a restore
 * function. Used to simulate SendGrid success/failure without any real
 * network call. */
export function stubFetch(impl: (input: unknown, init?: unknown) => Promise<Response> | Response) {
  const original = globalThis.fetch
  let callCount = 0
  globalThis.fetch = (async (input: unknown, init?: unknown) => {
    callCount++
    return impl(input, init)
  }) as typeof fetch
  return {
    restore: () => {
      globalThis.fetch = original
    },
    getCallCount: () => callCount,
  }
}

export function fakeSendGridSuccess(): Response {
  return new Response('', { status: 202 })
}

export function fakeSendGridFailure(status = 401, body = 'Unauthorized'): Response {
  return new Response(body, { status })
}
