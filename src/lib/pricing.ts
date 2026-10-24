// Shared pricing calculation — the single source of truth for Groundwork's
// plan math. Used by BOTH:
//   1. The human-facing calculator on /pricing (PricingCalculator.tsx renders
//      the markup; public/static/site.js's recalc() calls calculatePricing()
//      via the compiled bundle at public/static/pricing.js — see
//      scripts/build-pricing-bundle.mjs)
//   2. Groundwork AI's get_pricing_estimate tool (src/lib/chat/tools.ts),
//      called directly as a TypeScript import inside the Worker.
//
// Previously the constants lived in PricingCalculator.tsx and the actual
// arithmetic was reimplemented separately, by hand, inside site.js's
// recalc(). That meant two independent copies of the math that could drift.
// Now there is exactly one implementation: calculatePricing() below. Nothing
// else should compute a Groundwork price.

export interface CalcPlan {
  key: string
  name: string
  basePrice: number
  includedUsers: number
  perUserPrice: number
  badge?: string
}

export interface AiPackage {
  key: string
  label: string
  optionText: string
  price: number | null // null = not a fixed number (Custom / contact sales)
  lineLabel: string // shown in the per-plan AI line item
}

export const CALC_PLANS: CalcPlan[] = [
  { key: 'core', name: 'Core', basePrice: 259, includedUsers: 1, perUserPrice: 25 },
  { key: 'growth', name: 'Growth', basePrice: 359, includedUsers: 5, perUserPrice: 25, badge: 'Most popular' },
  { key: 'pro', name: 'Pro', basePrice: 459, includedUsers: 10, perUserPrice: 25 },
]

// Company-wide AI add-on, priced flat per company (never multiplied by user
// count). "Included" is the $0 default that every plan already ships with;
// the rest are optional packages layered on top.
export const AI_PACKAGES: AiPackage[] = [
  { key: 'included', label: 'Included AI', optionText: 'Included AI — $0/mo (plan allowance)', price: 0, lineLabel: 'Included AI' },
  { key: 'essentials', label: 'AI Essentials', optionText: 'AI Essentials — $12/mo (500 actions)', price: 12, lineLabel: 'AI Essentials' },
  { key: 'plus', label: 'AI Plus', optionText: 'AI Plus — $29/mo (1,500 actions)', price: 29, lineLabel: 'AI Plus' },
  { key: 'max', label: 'AI Max', optionText: 'AI Max — $59/mo (5,000 actions)', price: 59, lineLabel: 'AI Max' },
  { key: 'byok', label: 'Use my own API key', optionText: 'Use my own API key — $0 Groundwork charge', price: 0, lineLabel: 'Your API key (BYOK)' },
  { key: 'custom', label: 'Custom', optionText: 'Custom — contact sales', price: null, lineLabel: 'Custom' },
]

export function clampUserCount(v: number): number {
  if (!Number.isFinite(v) || v < 1) return 1
  if (v > 999) return 999
  return Math.round(v)
}

export function getPlan(planKey: string): CalcPlan | undefined {
  return CALC_PLANS.find((p) => p.key === planKey)
}

export function getAiPackage(aiKey: string): AiPackage | undefined {
  return AI_PACKAGES.find((a) => a.key === aiKey)
}

export interface PricingResult {
  ok: true
  planKey: string
  planName: string
  basePrice: number
  includedUsers: number
  perUserPrice: number
  totalUsers: number
  additionalUsers: number
  additionalUsersCost: number
  aiPackageKey: string
  aiPackageLabel: string
  aiPrice: number | null // null = Custom / contact sales
  isCustomAi: boolean
  /** Null when isCustomAi is true — total is not a fixed number (depends on
   * a sales-provided Custom quote). Otherwise base + additional users + AI. */
  grandTotal: number | null
  /** Human-readable line-by-line assumptions, in display order. Always
   * populated even when isCustomAi is true, so the UI/assistant never shows
   * a bare number without the math behind it. */
  assumptions: string[]
}

export interface PricingError {
  ok: false
  error: string
}

// --- Plan comparison (compare_plans tool) ---------------------------------
// Hand-curated, mirrors the feature lists on /pricing (src/pages/pricing.tsx).
// This is NOT pricing math — it's descriptive feature-differentiator text,
// same "hand-maintained, not re-derived" pattern as src/data/ai-knowledge.ts.
// Kept here (not duplicated in pricing.tsx) so both the human-facing page
// and the chat tool can eventually read from one place if pricing.tsx is
// refactored to import it; for now it's a deliberately separate, bounded
// summary — if /pricing's feature lists change, update PLAN_ADDED_FEATURES
// to match.

export const PLAN_TIER_ORDER = ['core', 'growth', 'pro'] as const

// Features ADDED at each tier, over the tier below it (Enterprise is
// intentionally excluded — it's "contact sales" custom pricing, not in
// CALC_PLANS, and comparisons against it would require a number we don't have).
export const PLAN_ADDED_FEATURES: Record<string, string[]> = {
  core: [
    'Pipeline, Leads, Clients & Properties',
    'Estimates & proposals',
    'Communications & templates',
    'Schedule Board & Dispatch',
    'Work Orders & Time Tracker',
    'Invoices & Payments',
    'Field Mode (mobile) & After Action Reports',
  ],
  growth: [
    'Business Pulse, Money Loop & Operations Snapshot',
    'Budget & Rates — burdened labor & equipment costing',
    'Recurring services & asset/maintenance tracking',
    'Deposits & statements',
    'Approval queue',
    'Academy — role-based training',
  ],
  pro: [
    'Automation Center & workflow builder',
    'Audit log',
    'Client Portal — invite, activity log, preview as client',
    'Groundwork AI Coach — owner-level at-risk deal alerts',
    'System config, custom templates & AAR question builder',
    'SSO / SAML',
    'API access',
    'Dedicated success manager',
    'Bring your own OpenAI API key available',
  ],
}

export const PLAN_AI_ALLOWANCE: Record<string, string> = {
  core: '100 AI actions/mo included',
  growth: '250 AI actions/mo included',
  pro: '500 AI actions/mo included',
}

export interface PlanComparisonSide {
  key: string
  name: string
  basePrice: number
  includedUsers: number
  perUserPrice: number
  aiAllowance: string
}

export interface PlanComparisonResult {
  ok: true
  planA: PlanComparisonSide
  planB: PlanComparisonSide
  /** Features plan B has that plan A does not (empty if A is the higher tier). */
  onlyInB: string[]
  /** Features plan A has that plan B does not (empty if B is the higher tier). */
  onlyInA: string[]
  assumptions: string[]
}

export function comparePlans(planKeyA: string, planKeyB: string): PlanComparisonResult | PricingError {
  const planA = getPlan(planKeyA)
  if (!planA) return { ok: false, error: `Unknown plan "${planKeyA}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(', ')}.` }
  const planB = getPlan(planKeyB)
  if (!planB) return { ok: false, error: `Unknown plan "${planKeyB}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(', ')}.` }
  if (planA.key === planB.key) {
    return { ok: false, error: 'Pick two different plans to compare.' }
  }

  const idxA = PLAN_TIER_ORDER.indexOf(planA.key as (typeof PLAN_TIER_ORDER)[number])
  const idxB = PLAN_TIER_ORDER.indexOf(planB.key as (typeof PLAN_TIER_ORDER)[number])
  const [lowIdx, highIdx] = idxA < idxB ? [idxA, idxB] : [idxB, idxA]
  const addedGoingUp: string[] = []
  for (let i = lowIdx + 1; i <= highIdx; i++) {
    addedGoingUp.push(...PLAN_ADDED_FEATURES[PLAN_TIER_ORDER[i]])
  }
  const onlyInB = idxA < idxB ? addedGoingUp : []
  const onlyInA = idxA > idxB ? addedGoingUp : []

  const toSide = (p: CalcPlan): PlanComparisonSide => ({
    key: p.key,
    name: p.name,
    basePrice: p.basePrice,
    includedUsers: p.includedUsers,
    perUserPrice: p.perUserPrice,
    aiAllowance: PLAN_AI_ALLOWANCE[p.key] ?? 'See plan details',
  })

  return {
    ok: true,
    planA: toSide(planA),
    planB: toSide(planB),
    onlyInB,
    onlyInA,
    assumptions: [
      `${planA.name}: $${planA.basePrice}/mo base, includes ${planA.includedUsers} user${planA.includedUsers === 1 ? '' : 's'}, then $${planA.perUserPrice}/mo per additional user.`,
      `${planB.name}: $${planB.basePrice}/mo base, includes ${planB.includedUsers} user${planB.includedUsers === 1 ? '' : 's'}, then $${planB.perUserPrice}/mo per additional user.`,
      'Base prices shown here exclude any optional AI add-on package and any additional-user cost beyond what\u2019s included — use get_pricing_estimate for an exact total at a specific team size.',
    ],
  }
}

// --- ROI estimate (calculate_roi tool) ------------------------------------
// A deliberately conservative, clearly-labeled ESTIMATE of admin time saved
// by consolidating scheduling/invoicing/follow-up into one system — NOT a
// guarantee, and never presented as one (assumptions array always ships
// alongside the number, same pattern as calculatePricing).

/** Estimated share of admin/scheduling/invoicing time reclaimed by
 * consolidating previously-separate tools into one system. Intentionally
 * conservative and the SAME figure across all plans/trades — we have no
 * per-customer measured data to vary it by, so varying it would be guessing,
 * not estimating. */
export const ROI_TIME_SAVINGS_FRACTION = 0.3
export const ROI_DEFAULT_HOURLY_COST_USD = 35
const WEEKS_PER_MONTH = 4.33

export interface RoiResult {
  ok: true
  adminHoursPerWeek: number
  hourlyCostUsd: number
  hoursSavedPerWeek: number
  hoursSavedPerMonth: number
  dollarsSavedPerMonth: number
  /** Present only when a plan was supplied. */
  subscriptionCostUsd: number | null
  /** dollarsSavedPerMonth - subscriptionCostUsd, only when subscriptionCostUsd is known. */
  netMonthlyValueUsd: number | null
  assumptions: string[]
}

export function calculateRoi(
  adminHoursPerWeekInput: number,
  hourlyCostUsdInput?: number | null,
  planKey?: string | null,
  totalUsersInput?: number | null,
  aiPackageKey?: string | null
): RoiResult | PricingError {
  if (!Number.isFinite(adminHoursPerWeekInput) || adminHoursPerWeekInput < 0) {
    return { ok: false, error: 'Field "admin_hours_per_week" must be a non-negative number.' }
  }
  const adminHoursPerWeek = Math.min(adminHoursPerWeekInput, 168)
  const hourlyCostUsd = Number.isFinite(hourlyCostUsdInput) && (hourlyCostUsdInput as number) > 0 ? (hourlyCostUsdInput as number) : ROI_DEFAULT_HOURLY_COST_USD

  const hoursSavedPerWeek = adminHoursPerWeek * ROI_TIME_SAVINGS_FRACTION
  const hoursSavedPerMonth = hoursSavedPerWeek * WEEKS_PER_MONTH
  const dollarsSavedPerMonth = hoursSavedPerMonth * hourlyCostUsd

  const assumptions: string[] = [
    `Estimate assumes ~${Math.round(ROI_TIME_SAVINGS_FRACTION * 100)}% of current admin/scheduling/invoicing time is reclaimed by consolidating into one system — a planning estimate, not a guarantee, and it will vary by business.`,
    `Based on ${adminHoursPerWeek} admin hour${adminHoursPerWeek === 1 ? '' : 's'}/week today at an assumed $${hourlyCostUsd}/hr loaded cost${Number.isFinite(hourlyCostUsdInput) && (hourlyCostUsdInput as number) > 0 ? '' : ' (default — tell me your real number for a more accurate estimate)'}.`,
  ]

  let subscriptionCostUsd: number | null = null
  let netMonthlyValueUsd: number | null = null
  if (planKey) {
    const totalUsers = Number.isFinite(totalUsersInput) ? (totalUsersInput as number) : 1
    const pricing = calculatePricing(planKey, totalUsers, aiPackageKey || 'included')
    if (!pricing.ok) return pricing
    if (pricing.grandTotal !== null) {
      subscriptionCostUsd = pricing.grandTotal
      netMonthlyValueUsd = dollarsSavedPerMonth - subscriptionCostUsd
      assumptions.push(`Compared against the ${pricing.planName} plan at $${pricing.grandTotal}/mo (see get_pricing_estimate for the full breakdown).`)
    } else {
      assumptions.push(`${pricing.planName} plan with a Custom AI package has no fixed number to net against — contact sales for that quote.`)
    }
  }

  return {
    ok: true,
    adminHoursPerWeek,
    hourlyCostUsd,
    hoursSavedPerWeek: Math.round(hoursSavedPerWeek * 10) / 10,
    hoursSavedPerMonth: Math.round(hoursSavedPerMonth * 10) / 10,
    dollarsSavedPerMonth: Math.round(dollarsSavedPerMonth),
    subscriptionCostUsd,
    netMonthlyValueUsd: netMonthlyValueUsd !== null ? Math.round(netMonthlyValueUsd) : null,
    assumptions,
  }
}

export function calculatePricing(planKey: string, totalUsersInput: number, aiPackageKey: string): PricingResult | PricingError {
  const plan = getPlan(planKey)
  if (!plan) {
    return { ok: false, error: `Unknown plan "${planKey}". Valid plans: ${CALC_PLANS.map((p) => p.key).join(', ')}.` }
  }
  const aiPackage = getAiPackage(aiPackageKey)
  if (!aiPackage) {
    return { ok: false, error: `Unknown AI package "${aiPackageKey}". Valid packages: ${AI_PACKAGES.map((a) => a.key).join(', ')}.` }
  }

  const totalUsers = clampUserCount(totalUsersInput)
  const additionalUsers = Math.max(0, totalUsers - plan.includedUsers)
  const additionalUsersCost = additionalUsers * plan.perUserPrice
  const isCustomAi = aiPackage.price === null
  const grandTotal = isCustomAi ? null : plan.basePrice + additionalUsersCost + (aiPackage.price as number)

  const assumptions: string[] = [
    `${plan.name} base platform fee: $${plan.basePrice}/mo (includes ${plan.includedUsers} user${plan.includedUsers === 1 ? '' : 's'})`,
  ]
  if (additionalUsers > 0) {
    assumptions.push(`${additionalUsers} additional user${additionalUsers === 1 ? '' : 's'} beyond the included allotment × $${plan.perUserPrice}/mo = $${additionalUsersCost}/mo`)
  } else {
    assumptions.push(`${totalUsers} total user${totalUsers === 1 ? '' : 's'} — within the ${plan.includedUsers} included in the base fee, so $0/mo in additional user cost`)
  }
  if (isCustomAi) {
    assumptions.push(`${aiPackage.label}: priced individually — contact sales for a number`)
  } else {
    assumptions.push(`${aiPackage.label}: $${aiPackage.price}/mo, billed once per company (not per user)`)
  }
  assumptions.push('All figures are monthly, billed monthly. Customer-portal / external logins are never counted or charged.')

  return {
    ok: true,
    planKey: plan.key,
    planName: plan.name,
    basePrice: plan.basePrice,
    includedUsers: plan.includedUsers,
    perUserPrice: plan.perUserPrice,
    totalUsers,
    additionalUsers,
    additionalUsersCost,
    aiPackageKey: aiPackage.key,
    aiPackageLabel: aiPackage.label,
    aiPrice: aiPackage.price,
    isCustomAi,
    grandTotal,
    assumptions,
  }
}
