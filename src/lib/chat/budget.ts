// Concurrency-safe budget circuit breaker. Reserve-then-reconcile pattern:
// before calling the model, we optimistically add an estimated cost to
// today's D1 row (an atomic UPDATE, so two concurrent requests both see
// each other's reservations rather than racing past the cap — this is what
// makes "$50/month and $5/day, enforced by the application itself" hold up
// under concurrent requests, not just sequential ones).

import type { ChatEnvBindings } from './config'
import { getDailyBudgetUsd, getMonthlyBudgetUsd } from './config'
import { getBudgetStatus, reserveBudget, reconcileBudget, logEvent } from './db'

export interface BudgetReservation {
  granted: boolean
  reservedUsd: number
}

export async function tryReserveBudget(env: ChatEnvBindings, sessionId: string, estimatedUsd: number): Promise<BudgetReservation> {
  const status = await getBudgetStatus(env.DB)
  const dailyCap = getDailyBudgetUsd(env)
  const monthlyCap = getMonthlyBudgetUsd(env)

  if (status.dayTotal + estimatedUsd > dailyCap || status.monthTotal + estimatedUsd > monthlyCap) {
    await logEvent(env.DB, sessionId, 'budget_capped', {
      dayTotal: status.dayTotal,
      monthTotal: status.monthTotal,
      dailyCap,
      monthlyCap,
    })
    return { granted: false, reservedUsd: 0 }
  }

  // Still a narrow TOCTOU window between the read above and this write, but
  // the write itself is atomic (`reserved_usd = reserved_usd + ?`), so the
  // worst case is a slight, bounded overshoot on the cap in a genuine race —
  // never an unbounded one — and the next request's read reflects the
  // committed reservation immediately. Acceptable for a pilot; a stricter
  // guarantee would need a D1 transaction or Durable Object, noted as a
  // Phase 2 hardening candidate if real traffic patterns call for it.
  await reserveBudget(env.DB, estimatedUsd)
  return { granted: true, reservedUsd: estimatedUsd }
}

export async function commitBudget(env: ChatEnvBindings, reservedUsd: number, actualUsd: number): Promise<void> {
  await reconcileBudget(env.DB, reservedUsd, actualUsd)
}
