# Groundwork CRM — Marketing Site

## Project Overview
- **Name**: Groundwork CRM marketing site
- **Goal**: Public-facing conversion site for Groundwork CRM (a service-business operating system for landscape, home service, and field service companies). Explains the product, targets owners/office managers/sales reps/foremen/laborers, and drives demo requests.
- **Source**: Built from the Genspark Design handoff repo `designer2-c6cfacb8-848c-45ab-9f3d-2f34c3767db6` (30-page hifi design). Recreated in Hono JSX (not the raw prototype HTML), per the handoff's instructions.
- **Stack**: Hono + TypeScript + Vite, deployed as a Cloudflare Pages/Workers site. No backend data storage needed (static marketing content + mock forms).

## Domain status (interim)
This marketing site is being prepared for **`groundwork-crm.info`** temporarily. The bare
`groundwork-crm.com` domain is currently occupied by the **real, live Groundwork CRM product**
(a separate application — repo `github.com/AvalonLC/Groundwork-crm`, deployed as its own
Cloudflare Pages project under a different Cloudflare account). That product is a single-page
app entered directly at its domain root (session-cookie gated, hash-based client routing) — it
has no dedicated `/login` path today.

Until the two properties are consolidated, every "Log in" / product link on this marketing site
points straight to the real, live `https://groundwork-crm.com`. The long-term plan (not yet
executed) is for the product to move to `login.groundwork-crm.com` and for this marketing site
to take over the bare `groundwork-crm.com` domain. Do not "fix" links back to an aspirational
`login.groundwork-crm.com` subdomain — it does not exist yet.

## Currently Implemented — all 36 pages built ✅

**Shared system** (in `src/components/` + `src/data/`):
- `Layout` — page shell: fonts (Newsreader serif / Instrument Sans / JetBrains Mono), meta tags, nav, footer, `site.js`
- `SiteNav` / mobile menu — desktop CSS-hover dropdowns driven by `src/data/nav.ts`. Most nav items use the original label+desc list-style dropdown (ported 1:1 from the design's `chrome.js` NAV data); the Trades item renders as an icon-grid mega-menu (`mega: true` on its `NavItem`) — an 11-tile trade grid plus a "View all" tile, both on desktop (hover panel) and the off-canvas mobile menu.
- `SiteFooter` — 6-column footer matching the design; all links point at real, built routes. The Trades column lists all 11 trades (two 5/6-item sub-columns within the column) rather than a curated subset.
- `Icon` — 50+ inline SVG icons (40+ ported from the design's `icons.js`, plus 11 trade icons added for the Trades redesign — fan, wrench, plug, chimney, roof, garage-door, tank, bug, sprinkler, paint-roller, plus reuse of the existing `plant` icon for landscaping), rendered server-side (see implementation note below)
- `Button`, `CTABand`, `SubpageHero`, `SectionHead`, `SplitList`, `BentoCard`, `TestimonialCard`, `FAQItem`, `RelatedCards`, `SplitFeature`/`SplitContent`/`MockFrame`, `ProductMock` building blocks (`PM`, `PMSidebar`, `PMStats`, `PMCard`, `PMTask`, etc.), `AccessMatrix`
- `TradePage` (`src/components/TradePage.tsx`) — shared template component for every `/trades/:slug` page, fed by a per-trade data object from `src/data/trades.ts` (`TRADES: TradeData[]`, one entry per trade with hero copy, split-section copy, mock-frame rows, related cards, and CTA copy). This is a template-driven "one component, many data rows" design rather than N bespoke page files — new trades can be added by appending to `trades.ts` without touching any component code.
- `public/static/styles.css` — the design's full stylesheet (design tokens, responsive breakpoints) copied verbatim, with asset URLs rewritten to `/static/assets/...`
- `public/static/site.js` — client-side behavior: mobile menu open/close, homepage role-tab switching, anchor smooth-scroll, form submission + "✓ Sent" state, pricing calculator (seats + AI selector) recalculation. FAQ accordions are native `<details>` (no JS needed). Desktop nav dropdowns are pure CSS.

**Pages implemented** (in `src/pages/`), all wired as routes in `src/index.tsx`:

| Route | Page |
|---|---|
| `/` | Homepage — hero w/ "Today" dashboard mock, trust logos, problem section, "what is Groundwork" split, four pillars, role tabs, My Day spotlight, bento feature grid, testimonials, implementation timeline, FAQ, final CTA |
| `/product` | Product hub (8-tile bento) |
| `/product/my-day` | My Day module |
| `/product/sales` | Sales module (pipeline kanban mock, client detail mock) |
| `/product/financial` | Financial module |
| `/product/operations` | Operations module |
| `/product/admin` | Admin & permissions module |
| `/product/mobile` | Mobile & Field Mode |
| `/product/platform` | Platform architecture |
| `/features` | Full feature list |
| `/trades` | Trades hub (11-tile icon grid) |
| `/trades/hvac` | HVAC trade page |
| `/trades/plumbing` | Plumbing trade page |
| `/trades/electrical` | Electrical trade page |
| `/trades/chimney` | Chimney trade page |
| `/trades/roofing` | Roofing trade page |
| `/trades/garage-door` | Garage Door trade page |
| `/trades/septic` | Septic trade page |
| `/trades/pest-control` | Pest Control trade page |
| `/trades/irrigation` | Irrigation trade page |
| `/trades/painting` | Painting trade page |
| `/trades/landscaping` | Landscaping trade page |
| `/multi-crew-ops` | Multi-crew / ops-at-scale page (moved out of the trade grid) |
| `/roles` | Roles hub |
| `/roles/owners` | Owners role page |
| `/roles/office-managers` | Office managers role page |
| `/roles/sales-reps` | Sales reps role page |
| `/roles/foremen` | Foremen role page |
| `/roles/laborers` | Laborers role page |
| `/pricing` | Pricing — plans (each with a per-plan included-user allotment) + flat per-user rate for users beyond that, and Groundwork AI (allowance + paid packages + BYOK) |
| `/customers` | Customer testimonials + logos |
| `/case-studies` | Deeper case studies |
| `/resources` | Resources hub (Academy/Implementation/Blog/Help/API/FAQ cards) + blog preview |
| `/academy` | Groundwork Academy hub — links to all 4 training tracks |
| `/academy/sales` | Sales Academy — Company Playbook (8 stages) + 3 training phases (9 modules), real lesson notes |
| `/academy/estimating-101` | Estimating 101 — 6 lessons on scoping, pricing, and margin, real lesson notes |
| `/academy/financial-literacy` | Financial Literacy — 5 lessons on P&L, cash flow, and budget vs actual, real lesson notes |
| `/academy/crm-guide` | CRM Guide — 7 module walkthroughs of the product's core workspaces, real lesson notes |
| `/faq` | FAQ accordion |
| `/explore` | Interactive Demo — click-around sample workspace (Today, Pipeline, Money Loop, Groundwork AI), no signup required |
| `/security` | Security & compliance |
| `/about` | About / team / principles |
| `/contact` | Contact channels + message form |
| `/demo` | Book a demo form |
| `/start` | "Three doors" — demo / trial / login chooser |
| `/signup` | Request access (trial) form |
| `/login` | Log in bridge page — redirects to the real live product at `groundwork-crm.com` |
| `/download` | Mobile app download (App Store / Google Play) |

**Redirects** (from the design handoff + interim domain plan, plus the Trades rename):
- `/book-demo → /demo` (301)
- `/info → /` (301)
- `/app → https://groundwork-crm.com` (301) — interim, see "Domain status" above
- `/workspace → https://groundwork-crm.com` (301) — interim, see "Domain status" above
- `/solutions → /trades` (301) — old Solutions hub renamed to Trades
- `/solutions/landscaping → /trades/landscaping` (301)
- `/solutions/home-service → /trades/hvac` (301) — the combined HVAC/plumbing/electrical page split into individual trade pages; `home-service` redirects to `hvac` as the closest single match
- `/solutions/field-service → /trades/roofing` (301) — similarly, redirects to `roofing` as the closest single match
- `/solutions/multi-crew-teams → /multi-crew-ops` (301) — moved out of the trade grid (it's an org-scale concern, not a trade)

Unknown `/trades/:slug` values return a real 404 (`c.notFound()`), not a redirect.

## Pricing Model
`/pricing` presents two independent pricing axes (revised 2026-07-19 — the former role-based-seat model has been fully replaced):
- **Plans** — Core ($259/mo, includes 1 internal user), Growth ($359/mo, includes 5), Pro ($459/mo, includes 10), Enterprise (custom, for 25+ users or multi-location access). The Solo/Starter plan has been removed. Each plan's base fee includes a starting allotment of internal users that varies by plan.
- **Additional internal users** — a flat **$25/mo per user beyond the plan's included allotment**, the same rate on every plan, regardless of role or permission level (owner, admin, rep, field, or office). No seat minimums, no volume-discount brackets, no free/unlimited Owner or Admin seats. Customer-portal and other external users are free and never count toward this number. Note: because the included allotment jumps a lot between plans while the base fee only steps up modestly, a higher tier can be cheaper than a lower one at some headcounts (e.g. Pro's $459 flat beats Growth's $484 at 10 users) — see the sales cheat sheet's cross-over table.
- **Groundwork AI** — unchanged: a shared, company-wide monthly allowance included on every plan (Core 100 / Growth 250 / Pro 500 / Enterprise custom), with optional paid packages (Essentials $12/500, Plus $29/1,500, Max $59/5,000 actions), a "contact sales" custom tier above 5,000, and a BYOK (bring-your-own-OpenAI-key) escape valve that removes the allowance cap. AI is priced flat per company — never per seat — and is a separate line item from the plan + user pricing everywhere it's shown (price calculator, Jobber/Housecall Pro comparisons).

The pricing calculator (`src/components/PricingCalculator.tsx` + `bindPricingCalculator()` in `public/static/site.js`) shows the total as: **Base platform fee + additional users + AI add-ons = estimated monthly total**. The sales cheat sheet at `docs/sales-pricing-cheatsheet.md` mirrors this same formula (`total = base_fee + max(0, users - included) * 29`) for quoting and competitive talk tracks. This is presentation only; no usage metering or billing enforcement lives in this repo (see "Not Yet Implemented").

## Trades Mega-Menu (Nav Redesign)
The old 4-item "Solutions" nav dropdown (Landscaping / Home service / Field service / Multi-crew teams) was replaced with an 11-trade "Trades" mega-menu so that companies across many different trades — not just the original 4 broad categories — see themselves reflected in the nav: HVAC, Plumbing, Electrical, Chimney, Roofing, Garage Door, Septic, Pest Control, Irrigation, Painting, Landscaping.

- `src/data/nav.ts` — the Trades `NavItem` sets `mega: true` plus `viewAllHref`/`viewAllLabel`; each menu entry carries an `icon` (instead of the `desc` text used by other dropdowns).
- `src/components/SiteNav.tsx` — branches on `item.mega`: mega items render `<MegaPanel>` (desktop, `.dropdown-panel-mega` / `.mega-grid` / `.mega-tile`, a 4-column icon-tile CSS grid) instead of the standard label+desc `<StandardPanel>`; the mobile off-canvas menu gets a matching `.mm-mega-grid` / `.mm-mega-tile` 3-column (2-column on small phones) icon-tile grid. Both include a "View all" tile that links to `/trades`.
- `public/static/styles.css` — new `.dropdown-panel-mega`/`.mega-*` (desktop) and `.mm-mega-*` (mobile) rules, plus `.trades-grid`/`.trade-tile` for the `/trades` hub page grid, with responsive column collapses at the existing 960px/720px breakpoints.
- Trade data lives in `src/data/trades.ts` (`TradeData` interface + `TRADES` array) and is rendered by the single `TradePage` template component — adding a 12th trade means adding one array entry, not a new page file.
- The `/demo` booking form's "Trade" `<select>` was updated to list the same 11 individual trades (plus "Multi-service / multi-crew" and "Other service business") instead of the old 5 coarse categories — keeping the qualification data granular enough to match the new nav taxonomy.

## Demo Booking Flow (Hybrid: Qualify Then Book)
`/demo` keeps its full lead-qualification form (name, email, company, trade, team size) — nothing was removed. What changed: on successful submission, the form is swapped in place for an embedded **Google Calendar Appointment Schedule** widget (`calendar.google.com/calendar/appointments/schedules/AcZssZ2BHZHcbMMK9uUr9qGIfT91WUwxpqPyoJXl7UNarQLLXMdErluB9PVAq_oj_VPAhKus1DK7Keoo`, resolved from the short link `calendar.app.google/5NtDtatNK7R638z87`) so the visitor picks a real open slot on the owner's connected calendar without leaving the page or waiting on a follow-up email.
- **Verified embeddable**: confirmed via Playwright (`mobile-audit/test_booking_iframe.cjs`) that the resolved scheduling URL renders fully interactive inside a cross-origin iframe — real live availability, no `X-Frame-Options` block, no client-side frame-busting, zero console errors.
- `src/pages/demo.tsx` — added a hidden `#demo-booking-panel` (iframe + intro copy) alongside the existing form inside `#demo-request-card`. The form carries new `data-booking-panel="demo-booking-panel"` / `data-booking-intro="demo-request-intro"` attributes that opt it into the reveal behavior.
- `public/static/site.js` — `bindLiveForms()` gained an **opt-in** step: on success, if the form has `data-booking-panel`, it hides itself + its intro block and reveals the booking panel, scrolling it into view. Every other `data-live-submit` form (contact, signup) lacks these attributes, so they're unaffected — confirmed via the existing `mobile-audit/test_forms.cjs` regression check (all three forms still return 200 with their normal success text).
- `public/static/styles.css` — `.demo-booking-frame` styles the iframe container; height is responsive (720px desktop, 640px mobile).
- The SendGrid lead-notification email (`/api/demo-request` in `src/index.tsx`) is unchanged — the sales team still gets notified of every qualified lead even though the visitor self-books their own time slot.
- Test scripts: `mobile-audit/test_booking_iframe.cjs` (bare iframe embeddability check), `mobile-audit/test_demo_booking_flow.cjs` (full desktop form→panel flow with a mocked `/api/demo-request`), `mobile-audit/test_demo_booking_mobile.cjs` (same, at a 390px mobile viewport).

## Live-Product Content Overhaul (2026-09-15)
Following direct reconnaissance of the real, live `groundwork-crm.com` product (Playwright walkthrough of all nav groups, the AI assistant's 5 tabs, and the Client Portal admin view), marketing copy across the site was updated to reflect features that are actually live in the product today, replacing generic or stale placeholder language:

- **Money Loop** — the plain-language overhead-coverage / cash-health dashboard ("How we're tracking: X% of what it costs to keep the doors open this year"). Replaces generic "Financial Snapshot" framing on `/product/financial`, `/features`, `/pricing`, and the homepage Financial pillar.
- **Budget & Rates** (the burdened-hour engine) — burdened labor/equipment/overhead-pool cost calculator with immutable rate versioning. New section on `/product/financial`; referenced on `/pricing` and the homepage.
- **Client Portal** — a real, live client-facing scoped read-only portal; admin side has invite/disable, an activity log, and staff "preview as client" mode. New section on `/product/admin`; referenced on `/pricing`, `/features`, and the homepage Admin pillar.
- **After Action Reports (AAR)** — a required end-of-day field report before clock-out, with a configurable question builder (Yes/No, text, rating, checklist, dropdown). New section on `/product/operations`; AAR Template builder bullet on `/product/admin`; replaces "photos & sign-offs" language on `/product/mobile`, `/roles/foremen`, `/roles/laborers`, and the homepage laborer role panel.
- **Groundwork AI** — the 5-tab slide-over assistant (Home, Suggestions, Coach, Setup, Chat), including the owner-level Coach tab that flags at-risk deals with dollars at risk. Renamed from generic "AI Assistant" on the homepage bento grid; new 4th card on `/features`' Field & Dashboards section; AI Coach mention added to `/roles/owners` and the Pro plan on `/pricing`.
- **Services & Pricing / AI quotes** — the 3,000-item master price book powering estimates, and AI-drafted quote descriptions/scopes/follow-ups. Updated on `/product/sales`.
- **Groundwork Academy tracks** — named the 4 real tracks (Sales Academy, Estimating 101, Financial Literacy, CRM Guide) in place of generic "40+ short videos" copy on `/resources`.
- **Bug fix**: `home.tsx` and `faq.tsx` both described a stale role-based seat pricing model that contradicted the already-shipped flat $25/mo-per-user model on `/pricing` — both corrected to consistent language.

This pass touched `home.tsx`, `faq.tsx`, `features.tsx`, `pricing.tsx`, `resources.tsx`, `product/financial.tsx`, `product/operations.tsx`, `product/admin.tsx`, `product/sales.tsx`, `product/mobile.tsx`, `roles/owners.tsx`, `roles/foremen.tsx`, `roles/laborers.tsx` — content and copy only, no new routes, no component API changes. All existing `SplitContent`/`MockFrame`/`SplitList`/`PMTitleRow`/`PMStats` building blocks were reused as-is.

**Two live-app issues observed during reconnaissance (not part of this repo, flagging for awareness)**: the live product's `/login` route currently 404s, and `/api/auth/bootstrap` / `/api/auth/me` occasionally return transient 500s that clear on page reload.

**Not yet deployed** — this content pass is committed to git but has not been pushed to production. See "Deployment" below for the redeploy command.

## Groundwork Academy Content Pages (2026-09-15)
Previously, the "Groundwork Academy" card on `/resources` only scroll-anchored to an on-page UI mockup of the Sales Academy training-progress screen — there was no real, readable content behind it. This pass adds five new routes with actual written curriculum notes for all four Academy tracks, extracted structurally from live-app reconnaissance (module/lesson titles, durations, phase groupings — content itself is newly written, generic teaching copy, not reproduced verbatim from any tenant's real data):

- **`/academy`** — hub page linking to all 4 tracks via `TrackCard`s.
- **`/academy/sales`** — Sales Academy: an 8-stage "Company Playbook" (New Lead → Won/Lost) plus 3 training phases (Foundations, Execution, Mastery) covering 9 modules, each with real explanatory body text and a certification path (New Hire → Apprentice → Journeyman → Certified).
- **`/academy/estimating-101`** — 6 lessons on scoping, pricing, and margin (What Is an Estimate?, Reading a Site Walk, Material Pricing Basics, Labor Costing, Building Your Margin, Presenting the Estimate).
- **`/academy/financial-literacy`** — 5 lessons on reading and using financial data (Reading a P&L Statement, Gross Margin vs Net Margin, Cash Flow Basics, Understanding Invoices & Deposits, Budget vs Actual).
- **`/academy/crm-guide`** — 7 module walkthroughs of the product's five core workspaces (The 5-Workspace Model, Leads & Pipeline, Clients/Properties & History, Estimates→Invoices→Payments, Work Orders & Scheduling, Tasks & Command Center, Reports & Data Reads).

New shared components in `src/components/Academy.tsx`: `AcademyHero`, `TrackCard`, `Lesson`, `PhaseBlock`, `PlaybookStage` — a content-first pattern (styled after `security.tsx`'s card-grid approach) distinct from the existing `SplitContent`/`MockFrame`/`ProductMock` product-page pattern, since these pages needed to read as actual course material rather than a UI preview.

`resources.tsx`'s "Groundwork Academy" card now links to `/academy` (was `#academy`); the existing on-page Sales Academy mockup section was kept as a visual teaser, with an added "See all 4 tracks, with real lesson notes →" link into the real hub page.

**Confidentiality note**: while drafting `/academy/sales`, a module was briefly titled "The Avalon Way of Selling" — a verbatim leak of the real customer tenant's name from the reconnaissance screenshots. This was caught and renamed to the generic "The Company Way of Selling" before committing. A repo-wide grep for the real tenant/user names confirms no leaks in the new Academy files.

## Interactive Demo (2026-09-19)
Per user request for "a sort of click around space" to let visitors get a feel for the product without booking a call, added a new page at **`/explore`** — a self-contained, click-around sample workspace.

**Design decisions**:
- **Own URL, not a modal** — shareable, gives the product room to breathe at full sidebar+main-panel width, and lets a persistent "sample workspace" banner + CTA follow the whole session.
- **4 stops, sequenced as a story** (not a random tour): Today → Pipeline → Money Loop → Groundwork AI. Ends on the AI Coach card as the "wow" moment, bridging into "book a real demo."
- **100% client-side** — no backend call, no persisted state, no login. Resets on every page load. This keeps it well inside Cloudflare Pages' free-tier and stays consistent with the rest of the site's "no data storage needed" architecture.
- **Reuses existing components** — the same `ProductMock` building blocks (`PMMain`, `PMTitleRow`, `PMStats`, `PMCard`, etc.) used throughout `/features` and `/product/*`, so the demo looks visually consistent with the rest of the site rather than introducing a new design language.
- **Fictional data only** — the same placeholder cast already used elsewhere (Knesley, Patel, Grumley, Dhulipala, Lampard, Aleman, Ozawa).

**What's interactive**:
1. **Today** — click a task row to check it off (strike-through + dimmed).
2. **Pipeline** — click a lead card (Discovery/Budget/Decision columns) to open a slide-over panel with that lead's contact info, property, and opportunity history.
3. **Money Loop** — click a "What Needs Doing" row to mark it handled (tag switches to "Handled", row dims).
4. **Groundwork AI** — click a Coach card (flagging a deal going quiet) to expand a suggested next action.

**Implementation**: new `src/pages/interactive-demo.tsx`; new `bindInteractiveDemo()` function in `public/static/site.js` (tab switching, task toggling, slide-over open/close, handled-state toggling, AI card expand — all plain DOM manipulation, no framework); new CSS block in `public/static/styles.css` for `.demo-banner`, `.demo-tabs`, `.demo-slideover`, and related hover/state classes. Registered as `app.get('/explore', ...)` in `index.tsx`. Entry points: homepage hero ("Explore it yourself" ghost button, next to "Book a demo" and "See how it works"), top nav ("Try it" item, inherited into the mobile menu automatically via `nav.ts`).

Verified live: `/explore` returns 200, zero browser console errors (checked via Playwright against both local and production), all interactive data-attributes and their CSS/JS bindings present in the deployed `styles.css` / `site.js`.

## Key Implementation Notes
- **Icon rendering gotcha**: Hono JSX's SSR renderer treats `<svg>` as a namespace-context node, which throws when combined with `dangerouslySetInnerHTML` directly on the `<svg>` element. Fixed by building the icon's SVG markup as a raw HTML string and injecting it via a wrapping `<span dangerouslySetInnerHTML>` instead (see `src/components/Icon.tsx`).
- Component classes/CSS selectors were kept identical to the design's `styles.css` (e.g. `.pm`, `.bento-card`, `.split-list`) so the ported stylesheet drives visuals unchanged — no Tailwind rewrite was done, matching the "recreate in framework, keep visuals authoritative" instruction from the handoff README.
- The Cloudflare email-obfuscation markup on the original `security.html` (`/cdn-cgi/l/email-protection`) was replaced with a plain `mailto:security@groundwork-crm.com` link — that obfuscation script only works when served through Cloudflare's edge, not from a local Worker.
- All internal links across every page use root-relative app routes (`/pricing`, `/faq`, etc.), not the design handoff's static `*.html` filenames.
- The `/trades/:slug` route is Cloudflare-Workers-friendly: it's a single dynamic Hono route (`app.get('/trades/:slug', ...)`) that looks up the trade in the in-memory `TRADES` array by slug — no filesystem access, no per-trade static route needed.

## Not Yet Implemented / Follow-ups
- Real customer testimonials/case studies/logos — current copy is explicitly marked illustrative ("Real testimonials to be added at launch").
- Individual blog post pages under `/resources#blog` — currently 3 preview cards link back to the resources page anchor; no long-form post pages exist yet.
- App Store / Google Play download links on `/download` are placeholder `#` hrefs pending real app store listings.
- Domain consolidation: moving the real product to `login.groundwork-crm.com` and this marketing site to the bare `groundwork-crm.com` (see "Domain status" above) — not started.
- Groundwork AI billing enforcement (usage metering, live tenant usage bar, self-service package upgrades/downgrades, BYOK key storage, DB schema for AI actions) is product/backend work — out of scope for this marketing repo. The `/pricing` page presents the AI pricing model; it does not implement it.
- Production deployment — ✅ deployed (see "Deployment" below).

## Data / Storage
No database. Purely static marketing content rendered server-side per request via Hono.

## Local Development
```
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000/
```

## Deployment
- **Platform**: Cloudflare Pages, deployed via the user's own Cloudflare account (BYOK path, `wrangler pages deploy`).
- **Status**: ✅ Live.
- **Cloudflare project**: `groundwork-crm-marketing`
- **Live URLs**: https://groundwork-crm.info (custom domain) · https://groundwork-crm-marketing.pages.dev (Pages default domain)
- **Last deployed**: 2026-09-20 (ninth deploy, /explore realism pass) — per user request ("make the try it option more advanced... what can we add to increase the realism / feel?"), rebuilt the interactive demo's shell and interactions. `PMSidebar` gained `active`/`interactive` props: Command Center, Pipeline, and Money Loop sidebar items now jump to their matching demo panel; every other sidebar item is illustrative-only and surfaces a small toast on click ("isn't wired up in this sample — it's live in your real workspace") instead of doing nothing. `/explore` now wraps its 4 panels in the full `.pm-lg` shell (sidebar + `.pm-topbar`) instead of a bare single-pane mock — matching the chrome already used on the homepage hero mock (search bar, "+New", "Tyler" admin label, reusing the same persona name). The topbar search input is functional: live-filters Today tasks, Pipeline lead cards, and Money Loop rows via a `data-demo-searchable` substring match, with a no-matches state. Added a reactive notification bell badge (counts overdue tasks + unhandled Money Loop rows, ticks down as you work through the sample) and a persistent "N of 4 stops explored" progress-pips strip above the tabs. Groundwork AI Coach cards now show a brief animated "AI is thinking…" beat before revealing the suggested action; the AI panel's non-Coach tabs are clickable and toast back to Coach. Added `search`/`bell`/`sparkle` icons to the shared icon set. Still 100% client-side — no backend calls, no persisted state, same fictional data cast. Caught and fixed a same-session bug where an author `[hidden]` CSS override was fighting the browser default, causing the "thinking" indicator to render on page load for every AI card instead of only the clicked one. Build verified clean, and the full interaction surface (search filter, bell badge reactivity, sidebar navigation + inert-item toast, progress pips, AI thinking→detail reveal) was exercised end-to-end with Playwright, zero console/page errors. Mobile (≤720px) spot-checked: the off-canvas hamburger menu opens correctly and still links to `/explore`; the demo's sidebar/topbar collapse to the existing mobile `.pm` rules (sidebar hidden, single-column) with no layout breaks.
- **Last deployed**: 2026-09-19 (eighth deploy, nav bar fix) — user reported the "Try it" nav label wrapping to two lines and stray `groundwork-crm.com` text cluttering the desktop nav between "Log in" and "Book a demo." Renamed the nav item from "Try it" to the single-word "Explore" (`src/data/nav.ts`) so it never wraps, and removed the dead `<span class="host">groundwork-crm.com</span>` from `SiteNav.tsx`'s desktop `/login` link along with its CSS. Deeper Playwright investigation (screenshot diffing, binary-search viewport testing, bounding-box math) surfaced a more serious pre-existing bug, on both local preview and live production: the entire "Log in" / "Book a demo" CTA area was being silently clipped off-screen and made unclickable by the site's global `overflow-x: hidden` safety net at almost every common laptop/desktop width (1024px–1535px) — a longstanding bug that predated this session's nav changes, just made ~40px worse by the earlier "Try it" addition. Fixed by tightening `.nav-inner`/`.nav-links`/`.nav-cta` gaps and padding, and adding a `@media (max-width: 1100px) { .nav-cta .signin { display: none; } }` rule so the primary "Book a demo" CTA is guaranteed visible and clickable at every desktop width (the secondary "Log in" link remains reachable via the mobile hamburger menu below 720px, and is visible again at ≥1100px). Verified via Playwright bounding-box checks at 1024/1100/1150/1280/1366/1440/1536/1920px (all `True` — CTA fully in-viewport) and confirmed live on `groundwork-crm.info`.
- **Last deployed**: 2026-09-19 (seventh deploy, interactive demo) — built a fully client-side, click-around demo at `/explore` per user request ("am i able to create a live demo inside the site... something not too crazy but enough to convince them"). New `src/pages/interactive-demo.tsx` walks visitors through a 4-stop sequenced story — My Day/Today → Sales Pipeline → Money Loop → Groundwork AI — reusing the existing `ProductMock` component library and the site's established fictional-data cast (Knesley, Patel, Grumley, Dhulipala, Lampard, Aleman, Ozawa) so nothing new or real is introduced. Interactions are 100% client-side (no backend, no persisted state): task check-off on the Today panel, a lead-card slide-over on the Pipeline panel (click a kanban card to see contact/property/opportunity detail), row "handled" toggling on the Money Loop panel, and expandable AI Coach cards revealing a suggested action. Added `bindInteractiveDemo()` to the shared `public/static/site.js` (same pattern as `bindMobileMenu`/`bindPricingCalculator`), new `.demo-*` rules to `public/static/styles.css`, a `GET /explore` route in `src/index.tsx`, a "Try it" top-level nav entry in `src/data/nav.ts`, and a new ghost-variant "Explore it yourself" hero CTA on the homepage (`home.tsx`) alongside the existing "Book a demo" / "See how it works" buttons. A persistent banner on the page discloses it's a sample workspace with example data and links to `/demo` for visitors who want to see it with their real data. Verified live: `/explore` returns 200 on `groundwork-crm.info`, `PlaywrightConsoleCapture` confirms zero browser console errors both locally and in production, and homepage/nav/mobile-menu all link to `/explore` correctly.
- **Last deployed**: 2026-09-15 (sixth deploy, trust bar removed) — per explicit user decision, removed the "Trusted by service teams across every trade" logo strip from `home.tsx` and the matching logo strip from `customers.tsx`. Rationale: the real customer's actual name ("Avalon Landscape Construction") is fine to use elsewhere, but the user wants to hold off on publishing any customer names in a trust/social-proof context — real or fictional — until there's an actual roster of live customers to show, so no visitor is misled. Testimonials and case studies sections (already explicitly labeled illustrative) were left unchanged. Verified live: `grep -i "trusted by"` on the deployed homepage and `/customers` returns zero matches.
- **Last deployed**: 2026-09-15 (fifth deploy, placeholder customer-name fix) — the pre-existing placeholder logo/case-study name "Avalon Landscape" (used in `home.tsx`'s trust bar, `customers.tsx`'s logo strip/case-study list, and `case-studies.tsx`) accidentally matched the real customer tenant's business name from live-app reconnaissance ("Avalon Landscape Construction"), violating the standing no-real-customer-data constraint. Renamed to "Meridian Landscape" across all three files — consistent with the site's existing fictional-name cast (Northline HVAC, Cedar Grove Co., Ridgeline Exteriors, etc.). Verified live: `grep -i avalon` across the deployed homepage, `/customers`, and `/case-studies` returns zero matches; "Meridian Landscape" confirmed present on all three.
- **Last deployed**: 2026-09-15 (fourth deploy, Groundwork Academy content pages) — added `/academy` and its 4 track pages (`/academy/sales`, `/academy/estimating-101`, `/academy/financial-literacy`, `/academy/crm-guide`) with real written lesson/module content, per user request that "Explore" on the Academy card lead somewhere with actual notes and breakdowns, not just a mockup. Updated `resources.tsx`'s Academy card to link to `/academy`. See "Groundwork Academy Content Pages" section above for full detail. Deployed with the same manually-supplied-token workaround as the prior deploy (Deploy panel is still on the wrong Cloudflare account). Verified live: all 5 new routes return 200 on `groundwork-crm.info`, "The Company Way of Selling" (post-fix module title) confirmed live, `/resources` links to `/academy` confirmed live.
- **Last deployed**: 2026-09-15 (third deploy, mockup rebuild pass) — rebuilt the site's illustrative CSS/HTML "product mock" components (`ProductMock.tsx` and usages in `features.tsx`, `product/financial.tsx`, `product/admin.tsx`, `product/operations.tsx`, `resources.tsx`) so their layout, labels, and stats mirror the real Groundwork app's actual screens, following live-app Playwright reconnaissance (structural reference only — no real screenshots or customer data embedded, per explicit decision to avoid publishing confidential tenant data). Specifically: `PMSidebar`'s nav groups now match the real left-nav (Command Center, Sales incl. Estimates, Financial incl. Money Loop/Budget & Rates/Invoice Reporting, Operations, Admin incl. Client Portal/AAR Reviews); the Money Loop mock now shows the real "How we're tracking" progress-bar header plus the 5-card stat row (Money to Collect / Needs an Invoice / Needs to be Paid / Something's Off / Needs Your Call) and a "What Needs Doing" lane list; the Dispatch mock now shows the real Dispatch Board's 4 stat cards (Scheduled/In Progress/Completed/Active Crews) plus Crews and Activity Feed panels; Budget & Rates now shows the real 3-section layout (Labor Rates / Machine Rates / Overhead Pools); Client Portal now shows the real 3-stat row (Active Users/Pending Invites/Disabled) plus a Recent Portal Activity table; the AAR mock now shows the real Template Builder's numbered question-row structure (type dropdown, Required checkbox, reorder handle); added a Groundwork AI slide-over mock (5 tabs, Coach at-risk-deal cards) to the Field & Dashboards section; added a real `#academy` section on `/resources` with a Sales Academy training-progress mock (previously a dead anchor link). All mock data remains fictional/illustrative (the site's existing placeholder cast — Knesley, Patel, Aleman, etc.); one placeholder tenant name that briefly matched the real customer's name during editing was caught and corrected before commit. Deployed with a manually-supplied token for the correct account (see note below) — verified live on `groundwork-crm.info`, byte-identical diff against the deployment URL.
- **Last deployed**: 2026-09-15 (second deploy, full-site consistency pass) — extended the live-product content overhaul to the remaining pages that hadn't yet been touched: `product/hub.tsx` bento cards now name Money Loop, Budget & Rates, After Action Reports, and Client Portal; `product/my-day.tsx` and `roles/hub.tsx` now mention Money Loop / After Action Report where they previously used generic or stale language; every remaining "sign-off" / "photo & sign-off" reference site-wide (`faq.tsx` x2, `features.tsx` Field Mode card, `home.tsx` x2) was replaced with the real After Action Report feature name — a full-repo grep now returns zero "sign-off" matches. Verified live on `groundwork-crm.info`: all checked routes return 200, and Money Loop / Client Portal / Groundwork AI / After Action Report all resolve correctly across home, `/product`, `/faq`, `/features`, `/roles`, `/resources`, and `/pricing`.
  Reviewed and intentionally left unchanged as part of this pass (generic/infra pages where feature-specific language wouldn't fit): `about.tsx`, `customers.tsx`, `case-studies.tsx`, `security.tsx`, `contact.tsx`, `start.tsx`, `signup.tsx`, `login.tsx`, `download.tsx`, `multi-crew-ops.tsx`, `product/platform.tsx` (architecture/integrations page), `trades/hub.tsx` and the individual `/trades/:slug` pages (trade-specific copy, correctly scoped per trade rather than platform-wide features).
  (First deploy, same day — live-product content overhaul: Money Loop, Budget & Rates, Client Portal, After Action Reports, Groundwork AI (5-tab assistant incl. Coach), Services & Pricing / AI quotes, and real Academy track names woven into `home.tsx`, `faq.tsx`, `features.tsx`, `pricing.tsx`, `resources.tsx`, and the Sales/Financial/Operations/Admin/Mobile product pages plus the Owners/Foremen/Laborers role pages. Also fixed a stale role-based-seat pricing description on `home.tsx`/`faq.tsx` and a status-badge mismatch in the Client Portal mock (D. Patel now shows "Pending" instead of "Active"). Verified live on `groundwork-crm.info` post-deploy, 15/15 spot-checks passed. Prior deploy 2026-07-20 — `/demo` embedded Google Calendar booking widget. Same-day earlier deploy — per-user rate cut from $29/mo to $25/mo flat, per-plan included-user allotments introduced. Prior deploy 2026-07-19 — pricing model overhaul, removed Solo plan, removed role-based seat pricing. Earlier deploy 2026-07-18 — Trades mega-menu redesign.)
- To redeploy: `npm run build && npx wrangler pages deploy dist --project-name groundwork-crm-marketing --branch main` (requires `setup_cloudflare_api_key` first).
- **Note on Cloudflare account**: this project's Cloudflare account (which owns `groundwork-crm.info` and the `groundwork-crm-marketing` Pages project) is a *different* Cloudflare account than the one currently wired into this sandbox's Deploy panel (`setup_cloudflare_api_key`), which is set to a different site's (`avalon-lc.com`) account. The 2026-09-15 deploy above was done by exporting a manually-supplied, narrowly-scoped API token (Pages:Edit only) for that one `wrangler` invocation, without touching the Deploy panel. Future redeploys need either: (a) the Deploy panel's token temporarily swapped to the `groundwork-crm.info`-owning account, or (b) another manually-supplied token from that account passed the same way. Account ID for reference: `9cc88e60ca3b4d57d9f6461fc8100577`.
