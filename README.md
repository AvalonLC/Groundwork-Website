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

## Currently Implemented — all 30 pages built ✅

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
| `/pricing` | Pricing — plans, role-based seats, and Groundwork AI (allowance + paid packages + BYOK) |
| `/customers` | Customer testimonials + logos |
| `/case-studies` | Deeper case studies |
| `/resources` | Resources hub (Academy/Implementation/Blog/Help/API/FAQ cards) + blog preview |
| `/faq` | FAQ accordion |
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
`/pricing` presents three independent pricing axes:
- **Plans** — Core, Growth, Pro, Enterprise (+ Starter for solo owner-operators) — gate which workspaces a company can use.
- **Seats** — priced by role (Owner/Admin free & unlimited, Rep/Estimator, Field with volume breaks, Office Manager, View-only with a free-seat allowance + flat overage).
- **Groundwork AI** — a shared, company-wide monthly allowance included on every plan (Starter 50 / Core 100 / Growth 250 / Pro 500 / Enterprise custom), with optional paid packages (Essentials $12/500, Plus $29/1,500, Max $59/5,000 actions), a "contact sales" custom tier above 5,000, and a BYOK (bring-your-own-OpenAI-key) escape valve that removes the allowance cap. AI is priced flat per company — never per seat — and is a separate line item from CRM + seats everywhere it's shown (price calculator, Jobber comparison). This is presentation only; no usage metering or billing enforcement lives in this repo (see "Not Yet Implemented").

## Trades Mega-Menu (Nav Redesign)
The old 4-item "Solutions" nav dropdown (Landscaping / Home service / Field service / Multi-crew teams) was replaced with an 11-trade "Trades" mega-menu so that companies across many different trades — not just the original 4 broad categories — see themselves reflected in the nav: HVAC, Plumbing, Electrical, Chimney, Roofing, Garage Door, Septic, Pest Control, Irrigation, Painting, Landscaping.

- `src/data/nav.ts` — the Trades `NavItem` sets `mega: true` plus `viewAllHref`/`viewAllLabel`; each menu entry carries an `icon` (instead of the `desc` text used by other dropdowns).
- `src/components/SiteNav.tsx` — branches on `item.mega`: mega items render `<MegaPanel>` (desktop, `.dropdown-panel-mega` / `.mega-grid` / `.mega-tile`, a 4-column icon-tile CSS grid) instead of the standard label+desc `<StandardPanel>`; the mobile off-canvas menu gets a matching `.mm-mega-grid` / `.mm-mega-tile` 3-column (2-column on small phones) icon-tile grid. Both include a "View all" tile that links to `/trades`.
- `public/static/styles.css` — new `.dropdown-panel-mega`/`.mega-*` (desktop) and `.mm-mega-*` (mobile) rules, plus `.trades-grid`/`.trade-tile` for the `/trades` hub page grid, with responsive column collapses at the existing 960px/720px breakpoints.
- Trade data lives in `src/data/trades.ts` (`TradeData` interface + `TRADES` array) and is rendered by the single `TradePage` template component — adding a 12th trade means adding one array entry, not a new page file.
- The `/demo` booking form's "Trade" `<select>` was updated to list the same 11 individual trades (plus "Multi-service / multi-crew" and "Other service business") instead of the old 5 coarse categories — keeping the qualification data granular enough to match the new nav taxonomy.

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
- Production deployment — not yet deployed; awaiting user review per explicit instruction.

## Data / Storage
No database. Purely static marketing content rendered server-side per request via Hono.

## Local Development
```
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000/
```

## Deployment
Not yet deployed — pending user review. Two Cloudflare deploy paths are available for this project (BYOK vs. Genspark-hosted) — ask the user which one before deploying, per project convention.
