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
- `SiteNav` / mobile menu — desktop CSS-hover dropdowns driven by `src/data/nav.ts` (ported 1:1 from the design's `chrome.js` NAV data), off-canvas mobile panel
- `SiteFooter` — 5-column footer matching the design; all links point at real, built routes
- `Icon` — 40+ inline SVG icons ported from the design's `icons.js`, rendered server-side (see implementation note below)
- `Button`, `CTABand`, `SubpageHero`, `SectionHead`, `SplitList`, `BentoCard`, `TestimonialCard`, `FAQItem`, `RelatedCards`, `SplitFeature`/`SplitContent`/`MockFrame`, `ProductMock` building blocks (`PM`, `PMSidebar`, `PMStats`, `PMCard`, `PMTask`, etc.), `AccessMatrix`
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
| `/solutions` | Solutions hub |
| `/solutions/landscaping` | Landscaping solution |
| `/solutions/home-service` | Home service solution |
| `/solutions/field-service` | Field service solution |
| `/solutions/multi-crew-teams` | Multi-crew teams solution |
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

**Redirects** (from the design handoff + interim domain plan):
- `/book-demo → /demo` (301)
- `/info → /` (301)
- `/app → https://groundwork-crm.com` (301) — interim, see "Domain status" above
- `/workspace → https://groundwork-crm.com` (301) — interim, see "Domain status" above

## Pricing Model
`/pricing` presents three independent pricing axes:
- **Plans** — Core, Growth, Pro, Enterprise (+ Starter for solo owner-operators) — gate which workspaces a company can use.
- **Seats** — priced by role (Owner/Admin free & unlimited, Rep/Estimator, Field with volume breaks, Office Manager, View-only with a free-seat allowance + flat overage).
- **Groundwork AI** — a shared, company-wide monthly allowance included on every plan (Starter 50 / Core 100 / Growth 250 / Pro 500 / Enterprise custom), with optional paid packages (Essentials $12/500, Plus $29/1,500, Max $59/5,000 actions), a "contact sales" custom tier above 5,000, and a BYOK (bring-your-own-OpenAI-key) escape valve that removes the allowance cap. AI is priced flat per company — never per seat — and is a separate line item from CRM + seats everywhere it's shown (price calculator, Jobber comparison). This is presentation only; no usage metering or billing enforcement lives in this repo (see "Not Yet Implemented").

## Key Implementation Notes
- **Icon rendering gotcha**: Hono JSX's SSR renderer treats `<svg>` as a namespace-context node, which throws when combined with `dangerouslySetInnerHTML` directly on the `<svg>` element. Fixed by building the icon's SVG markup as a raw HTML string and injecting it via a wrapping `<span dangerouslySetInnerHTML>` instead (see `src/components/Icon.tsx`).
- Component classes/CSS selectors were kept identical to the design's `styles.css` (e.g. `.pm`, `.bento-card`, `.split-list`) so the ported stylesheet drives visuals unchanged — no Tailwind rewrite was done, matching the "recreate in framework, keep visuals authoritative" instruction from the handoff README.
- The Cloudflare email-obfuscation markup on the original `security.html` (`/cdn-cgi/l/email-protection`) was replaced with a plain `mailto:security@groundwork-crm.com` link — that obfuscation script only works when served through Cloudflare's edge, not from a local Worker.
- All internal links across every page use root-relative app routes (`/pricing`, `/faq`, etc.), not the design handoff's static `*.html` filenames.

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
