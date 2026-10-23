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
