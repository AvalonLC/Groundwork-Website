// Curated knowledge base for Groundwork AI (the chat assistant). Hand
// maintained, built from this site's existing structured data — NOT a
// vector-search/RAG corpus (see docs/ai-chatbot-architecture.md §5 for why).
// Everything here gets assembled into the system prompt on every chat turn.
//
// `status` is the mechanism for requirement #3 ("distinguish live, demo-only,
// and roadmap features"): every feature/pillar/demo-panel entry below is
// tagged, and the system prompt (src/lib/chat/systemPrompt.ts) requires the
// assistant to state the tag plainly whenever it describes something. Tool
// results (jump_to_demo_panel) also carry the tag through to the UI, so the
// truthfulness doesn't rest only on careful prompt wording.

import { TRADES } from './trades'
import { CALC_PLANS, AI_PACKAGES } from '../lib/pricing'

export type FeatureStatus = 'live' | 'demo_only' | 'roadmap'

export interface KnowledgePillar {
  key: string
  name: string
  status: FeatureStatus
  summary: string
  bullets: string[]
}

export interface KnowledgeFaq {
  question: string
  answer: string
}

export interface KnowledgeDemoPanel {
  key: string
  label: string
  status: FeatureStatus
  description: string
}

export const COMPANY_FACTS = {
  name: 'Groundwork CRM',
  oneLiner: 'The operating system for landscape, home service, and field service businesses.',
  longDescription:
    'A CRM and operations platform built for landscape, home service, and field service companies — sales pipeline, scheduling, dispatch, invoicing, and AI-assisted follow-up in one connected system, rather than a general-purpose CRM re-marketed to contractors.',
  implementationTimeline: 'Most teams go live in 2–3 weeks: discovery, configuration, data migration, role-based training, and the first 30 days of dedicated support. No 90-day rollouts.',
  integrations: ['QuickBooks (Online)', 'Google Calendar', 'Gmail', 'Stripe (payments)', 'Twilio (SMS)', 'an open API for custom integrations'],
  trialPolicy: 'No generic free trial. Every prospect gets a 30-minute personalized walkthrough, then a sandboxed pilot workspace loaded with their own data.',
}

// Four platform pillars, mirroring the homepage's consolidated Platform
// section (src/pages/home.tsx). All live/shipped — this is the real product.
export const PILLARS: KnowledgePillar[] = [
  {
    key: 'sales',
    name: 'Sales',
    status: 'live',
    summary: 'Pipeline, leads, and follow-ups that don\u2019t slip.',
    bullets: [
      'Multi-stage pipeline with objection handling & scripts',
      'Automated follow-up scheduling',
      'Estimates, proposals, and pricing tools',
    ],
  },
  {
    key: 'financial',
    name: 'Financial',
    status: 'live',
    summary: 'See the money — and what it costs you — at a glance.',
    bullets: [
      'Invoices tied to jobs, estimates, and change orders',
      'Money Loop — overhead-coverage & cash-health dashboard',
      'Budget & Rates — burdened labor, equipment & overhead costing',
    ],
  },
  {
    key: 'operations',
    name: 'Operations',
    status: 'live',
    summary: 'Schedule, dispatch, and work — connected.',
    bullets: [
      'Schedule + dispatch + recurring services',
      'Crew view, work orders & time tracking',
      'Assets, maintenance, inventory, tools',
    ],
  },
  {
    key: 'admin_roles',
    name: 'Admin & Roles',
    status: 'live',
    summary: 'Give every person the view built for their job.',
    bullets: [
      'Access matrix at the screen level, role by role',
      'Owner, Office Manager, Sales Rep, Foreman, Laborer — each a tuned workspace',
      'Client Portal — invite, activity log, preview as client',
    ],
  },
]

// Groundwork AI, the real in-product feature (coach + chat), as marketed on
// the homepage Features section — distinct from the marketing-site chatbot
// this file powers, though they share a name intentionally (same selling
// point: "this company's own AI is this good").
export const PRODUCT_AI_FEATURE: KnowledgePillar = {
  key: 'product_ai',
  name: 'Groundwork AI (in-product)',
  status: 'live',
  summary: 'A slide-over assistant on every screen, plus an owner-level Coach that flags at-risk deals.',
  bullets: [
    'Company-wide AI allowance included on every plan, billed once per company (not per user)',
    'Optional add-on packages (Essentials/Plus/Max) for higher monthly action volume, or bring-your-own API key',
    'Coach view flags deals going quiet (e.g. proposals sent with no response) — illustrated live in the interactive demo',
  ],
}

export const FAQS: KnowledgeFaq[] = [
  {
    question: 'Is Groundwork built for a specific trade?',
    answer: 'Groundwork is built for service businesses — landscape, home services, HVAC, plumbing, restoration, exteriors, and multi-service field operations. Stages, templates, and workflows are configurable to your service lines. It is not a general-purpose CRM re-marketed to contractors.',
  },
  {
    question: 'How does Groundwork handle multiple roles across office, sales, and field?',
    answer: 'Roles & permissions are configured at the screen level with an access matrix. Every role — Owner, Office Manager, Sales Rep, Estimator, Field, and View-Only — starts from a sensible company default and can be customized per person. Field crews get a distraction-free Field Mode designed for phones.',
  },
  {
    question: 'Can we import our existing clients, properties, and open deals?',
    answer: 'Yes. The implementation team handles data migration from your current CRM, spreadsheets, or scheduling tools, mapping your existing pipeline into Groundwork\u2019s stages with your history intact.',
  },
  {
    question: 'Does it integrate with QuickBooks and Google?',
    answer: 'Yes — QuickBooks (Online), Google Calendar, Gmail, Stripe for payments, Twilio for SMS, and more. There\u2019s also an open API for custom integrations.',
  },
  {
    question: 'What about the field crew? Do laborers need to learn a CRM?',
    answer: 'No. Laborers and foremen get a purpose-built mobile view (Field Mode) that only shows today\u2019s assigned work, time tracking, and an end-of-day After Action Report — no pipeline, no pricing, no admin. Training a crew takes about 15 minutes.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most teams go live in 2–3 weeks, including discovery, configuration, data migration, role-based training, and the first 30 days of dedicated support.',
  },
  {
    question: 'Can I try Groundwork before committing?',
    answer: 'Every prospect gets a 30-minute personalized walkthrough followed by a sandboxed pilot workspace loaded with their own data — no generic free trial.',
  },
]

// Real /explore (interactive demo) panels. ALL of these are tagged
// 'demo_only' deliberately: /explore is an illustrative sample workspace, not
// a live customer tenant, even though it showcases real product concepts.
// This is exactly the distinction requirement #3 calls for — a visitor must
// never be told "this is live for you today" about something only shown here.
export const DEMO_PANELS: KnowledgeDemoPanel[] = [
  { key: 'command', label: 'Command Center', status: 'demo_only', description: 'Owner-level overview dashboard — pipeline, revenue, and crew status at a glance.' },
  { key: 'pipeline', label: 'Sales Pipeline', status: 'demo_only', description: 'Multi-stage deal pipeline with budget-qualification stages.' },
  { key: 'leads', label: 'Leads', status: 'demo_only', description: 'Incoming lead intake and qualification.' },
  { key: 'clients', label: 'Clients', status: 'demo_only', description: 'Client records and relationship history.' },
  { key: 'properties', label: 'Properties', status: 'demo_only', description: 'Property-level service and equipment history.' },
  { key: 'estimates', label: 'Estimates', status: 'demo_only', description: 'Estimate and proposal builder.' },
  { key: 'money', label: 'Money Loop', status: 'demo_only', description: 'Overhead-coverage and cash-health dashboard.' },
  { key: 'budget', label: 'Budget & Rates', status: 'demo_only', description: 'Burdened labor, equipment, and overhead costing.' },
  { key: 'invoicing', label: 'Invoicing', status: 'demo_only', description: 'Invoices tied to jobs, estimates, and change orders.' },
  { key: 'reports', label: 'Reports', status: 'demo_only', description: 'Built-in reporting across sales, ops, and financial surfaces.' },
  { key: 'schedule', label: 'Schedule Board', status: 'demo_only', description: 'Crew and job scheduling board.' },
  { key: 'recurring', label: 'Recurring Services', status: 'demo_only', description: 'Recurring maintenance contracts on autopilot.' },
  { key: 'dispatch', label: 'Dispatch', status: 'demo_only', description: 'Daily dispatch view for crews and techs.' },
  { key: 'workorders', label: 'Work Orders', status: 'demo_only', description: 'Work order tracking from creation to completion.' },
  { key: 'assets', label: 'Assets', status: 'demo_only', description: 'Equipment and asset tracking.' },
  { key: 'inventory', label: 'Inventory', status: 'demo_only', description: 'Parts and materials inventory.' },
  { key: 'timetracker', label: 'Time Tracker', status: 'demo_only', description: 'Crew time tracking tied to jobs.' },
  { key: 'clientportal', label: 'Client Portal', status: 'demo_only', description: 'Client-facing portal — invite, activity log, preview-as-client.' },
  { key: 'employees', label: 'Employees', status: 'demo_only', description: 'Team roster and role assignment.' },
  { key: 'aar', label: 'After Action Reports', status: 'demo_only', description: 'End-of-day field report, required before clock-out.' },
  { key: 'audit', label: 'Audit Log', status: 'demo_only', description: 'Append-only activity audit trail.' },
]

// Roadmap items — explicitly NOT built, NOT in the demo. Kept short and
// conservative; only list things safe to say are planned, not promised dates.
export const ROADMAP_ITEMS: KnowledgePillar[] = [
  {
    key: 'calendar_booking_confirmation',
    name: 'Automated booking confirmation',
    status: 'roadmap',
    summary: 'A way for the system (including Groundwork AI chat) to know when a visitor has actually confirmed a demo time, rather than just requested one.',
    bullets: ['Not built yet — today, booking happens via a Google Calendar widget on /demo that the chat cannot see into.'],
  },
]

// Fixed route allowlist — the ONLY URLs the chatbot's tools are permitted to
// return as clickable links (see src/lib/chat/tools.ts enforceAllowlist()).
// The model never emits a raw link in free text; every link a visitor sees
// comes from server code that checked it against this list first.
export const ROUTE_ALLOWLIST: string[] = [
  '/',
  '/demo',
  '/pricing',
  '/features',
  '/product',
  '/product/my-day',
  '/product/sales',
  '/product/financial',
  '/product/operations',
  '/product/admin',
  '/product/mobile',
  '/product/platform',
  '/trades',
  ...TRADES.map((t) => `/trades/${t.slug}`),
  '/multi-crew-ops',
  '/roles',
  '/roles/owners',
  '/roles/office-managers',
  '/roles/sales-reps',
  '/roles/foremen',
  '/roles/laborers',
  '/customers',
  '/case-studies',
  '/resources',
  '/explore',
  '/faq',
  '/security',
  '/about',
  '/contact',
]

// --- Feature lookup for the check_feature_availability tool ----------------
// Deliberately simple keyword/substring matching over the SAME hand-curated
// knowledge already above — NOT vector search/RAG (that remains an
// explicitly deferred item; see docs/ai-chatbot-architecture.md §5). This
// just lets a single tool call answer "does it do X" grounded in real data
// instead of the model guessing, while staying consistent with the project's
// "hand-maintained knowledge, no embeddings" posture.

export interface KnowledgeFeatureEntry {
  key: string
  label: string
  status: FeatureStatus
  summary: string
  searchText: string
}

export function getAllFeatureEntries(): KnowledgeFeatureEntry[] {
  const pillarEntries: KnowledgeFeatureEntry[] = PILLARS.map((p) => ({
    key: p.key,
    label: p.name,
    status: p.status,
    summary: p.summary,
    searchText: `${p.name} ${p.summary} ${p.bullets.join(' ')}`.toLowerCase(),
  }))
  const productAiEntry: KnowledgeFeatureEntry = {
    key: PRODUCT_AI_FEATURE.key,
    label: PRODUCT_AI_FEATURE.name,
    status: PRODUCT_AI_FEATURE.status,
    summary: PRODUCT_AI_FEATURE.summary,
    searchText: `${PRODUCT_AI_FEATURE.name} ${PRODUCT_AI_FEATURE.summary} ${PRODUCT_AI_FEATURE.bullets.join(' ')}`.toLowerCase(),
  }
  const demoEntries: KnowledgeFeatureEntry[] = DEMO_PANELS.map((d) => ({
    key: d.key,
    label: d.label,
    status: d.status,
    summary: d.description,
    searchText: `${d.label} ${d.description}`.toLowerCase(),
  }))
  const roadmapEntries: KnowledgeFeatureEntry[] = ROADMAP_ITEMS.map((r) => ({
    key: r.key,
    label: r.name,
    status: r.status,
    summary: r.summary,
    searchText: `${r.name} ${r.summary} ${r.bullets.join(' ')}`.toLowerCase(),
  }))
  return [...pillarEntries, productAiEntry, ...demoEntries, ...roadmapEntries]
}

/** Best-effort keyword match — returns null if nothing scores above zero
 * (the tool caller must then say "don't know" rather than guess, per HARD
 * RULE #5 in systemPrompt.ts). */
export function findFeatureByQuery(query: string): KnowledgeFeatureEntry | null {
  const q = query.toLowerCase().trim()
  if (!q) return null
  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2)
  let best: KnowledgeFeatureEntry | null = null
  let bestScore = 0
  for (const entry of getAllFeatureEntries()) {
    let score = 0
    if (entry.searchText.includes(q)) score += 5
    for (const w of words) {
      if (entry.searchText.includes(w)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }
  return bestScore > 0 ? best : null
}

export function isAllowedUrl(path: string): boolean {
  // Only ever compares relative paths — the model/tools must never be asked
  // to validate or emit absolute/external URLs.
  const clean = path.split('?')[0].split('#')[0]
  return ROUTE_ALLOWLIST.includes(clean)
}

// One short, non-hallucinated summary per trade, derived from trades.ts
// (the same data that drives /trades/:slug). Kept intentionally brief — the
// assistant links to the real page rather than trying to recite it all.
export const TRADE_SUMMARIES = TRADES.map((t) => ({
  slug: t.slug,
  name: t.name,
  category: t.category,
  summary: t.navDesc,
}))

export function buildPricingKnowledgeText(): string {
  const planLines = CALC_PLANS.map(
    (p) => `- ${p.name}${p.badge ? ` (${p.badge})` : ''}: $${p.basePrice}/mo base, includes ${p.includedUsers} user${p.includedUsers === 1 ? '' : 's'}, then $${p.perUserPrice}/mo per additional user`
  )
  const aiLines = AI_PACKAGES.map((a) => `- ${a.label}: ${a.price === null ? 'Custom — contact sales' : `$${a.price}/mo, billed once per company`}`)
  return [
    'Plans (internal users — anyone who logs in to run the business; customer-portal/external logins are always free and never counted):',
    ...planLines,
    '',
    'Groundwork AI add-on packages (flat per-company cost, never multiplied by user count):',
    ...aiLines,
    '',
    'Enterprise / 25+ users / multi-location: contact sales for custom pricing — never state a number for this tier.',
  ].join('\n')
}

// Assembled once per request into the system prompt. Kept as plain text —
// deliberately NOT JSON — because it reads more naturally inside an LLM
// system prompt and costs fewer tokens than a verbose JSON dump.
export function buildKnowledgeBaseText(): string {
  const pillarLines = PILLARS.map((p) => `- ${p.name} [LIVE]: ${p.summary} (${p.bullets.join('; ')})`)
  const roadmapLines = ROADMAP_ITEMS.map((r) => `- ${r.name} [ROADMAP — NOT BUILT]: ${r.summary}`)
  const faqLines = FAQS.map((f) => `Q: ${f.question}\nA: ${f.answer}`)
  const tradeLines = TRADE_SUMMARIES.map((t) => `- ${t.name} (/trades/${t.slug}): ${t.summary} [${t.category}]`)
  const demoPanelLines = DEMO_PANELS.map((d) => `- ${d.label} (key: ${d.key}) [DEMO ILLUSTRATION ONLY, not live for any real customer]: ${d.description}`)

  return [
    `Company: ${COMPANY_FACTS.name} — ${COMPANY_FACTS.oneLiner}`,
    COMPANY_FACTS.longDescription,
    `Implementation: ${COMPANY_FACTS.implementationTimeline}`,
    `Integrations: ${COMPANY_FACTS.integrations.join(', ')}.`,
    `Trial policy: ${COMPANY_FACTS.trialPolicy}`,
    '',
    '=== PLATFORM PILLARS (all LIVE — real, shipped product features) ===',
    ...pillarLines,
    `- ${PRODUCT_AI_FEATURE.name} [LIVE]: ${PRODUCT_AI_FEATURE.summary} (${PRODUCT_AI_FEATURE.bullets.join('; ')})`,
    '',
    '=== PRICING (always show the full calculation via get_pricing_estimate — never state a number from memory) ===',
    buildPricingKnowledgeText(),
    '',
    '=== TRADES SERVED ===',
    ...tradeLines,
    '',
    '=== /explore INTERACTIVE DEMO PANELS — ALL DEMO-ONLY, NOT LIVE FOR CUSTOMERS ===',
    'These panels exist only inside the marketing site\u2019s sample workspace at /explore, to illustrate what the real product looks like. They are NOT something a signed-up customer can use today in the sense of "live" product state for their own data — be explicit about this distinction whenever you mention one.',
    ...demoPanelLines,
    '',
    '=== ROADMAP (NOT BUILT — be explicit this does not exist yet) ===',
    ...(roadmapLines.length ? roadmapLines : ['(none currently listed)']),
    '',
    '=== FAQ ===',
    ...faqLines,
  ].join('\n')
}
