// Case study data for Groundwork CRM. Extracted from src/pages/case-studies.tsx
// into a reusable module so both the human-facing /case-studies page and the
// chat's get_customer_story tool share a single source of truth.
//
// IMPORTANT — confidentiality posture: these are ILLUSTRATIVE, fictional
// examples (same posture as DEMO_PANELS in ai-knowledge.ts being tagged
// demo_only) — no real customer data. The page already discloses this
// ("Case studies below are illustrative. Real published case studies coming
// at launch."), and the chat tool below carries the same disclosure through
// to the model so it can never be presented as a real, verified customer
// outcome.

export interface CaseStudy {
  slug: string
  tag: string
  title: string
  desc: string
  metrics: string[]
  /** Trade slugs (matching src/data/trades.ts) this story is most relevant
   * to, for the chat's get_customer_story tool to filter/match against. */
  trades: string[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'meridian-landscape',
    tag: 'Meridian Landscape · 24 employees · Northern VA',
    title: 'From spreadsheet chaos to $186k month.',
    desc: 'The 6-week story of migrating a design-build landscape company off a Rolodex of tools.',
    metrics: ['Pipeline value up 42%', 'Follow-ups 0 slipped in first quarter', 'Office admin time down 8 hrs/week'],
    trades: ['landscaping', 'irrigation'],
  },
  {
    slug: 'northline-hvac',
    tag: 'Northline HVAC · 3 branches · DC Metro',
    title: 'Same-day dispatch, callbacks under 4%.',
    desc: 'How one regional HVAC operator dropped their callback rate and doubled tune-up renewals.',
    metrics: ['Callback rate 12% → 3.8%', 'Membership renewals +2.1x', 'Invoice-to-payment 22 → 9 days'],
    trades: ['hvac', 'plumbing', 'electrical'],
  },
  {
    slug: 'ridgeline-exteriors',
    tag: 'Ridgeline Exteriors · Insurance-driven',
    title: 'One system for adjusters, PMs, and crews.',
    desc: 'What changed when the paperwork problem restoration teams face lived in Groundwork.',
    metrics: ['Claim-to-schedule 18 → 6 days', 'Change order revenue +$140k/qtr', 'Client NPS 42 → 71'],
    trades: ['roofing', 'painting', 'chimney'],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

/** Find the single best-matching case study for a given trade slug, falling
 * back to the first story if nothing matches directly — the chat tool always
 * wants to return something useful rather than an empty result. */
export function findCaseStudyForTrade(trade: string | null): CaseStudy {
  if (trade) {
    const match = CASE_STUDIES.find((c) => c.trades.includes(trade))
    if (match) return match
  }
  return CASE_STUDIES[0]
}
