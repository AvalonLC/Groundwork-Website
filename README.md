# Groundwork CRM — Marketing Site

## Project Overview
- **Name**: Groundwork CRM marketing site
- **Goal**: Public-facing conversion site for Groundwork CRM (a service-business operating system for landscape, home service, and field service companies). Explains the product, targets owners/office managers/sales reps/foremen/laborers, and drives demo requests.
- **Source**: Built from the Genspark Design handoff repo `designer2-c6cfacb8-848c-45ab-9f3d-2f34c3767db6` (30-page hifi design). Recreated in Hono JSX (not the raw prototype HTML), per the handoff's instructions.
- **Stack**: Hono + TypeScript + Vite, deployed as a Cloudflare Pages/Workers site. No backend data storage needed (static marketing content + mock forms).

## Currently Implemented

**Shared system** (in `src/components/` + `src/data/`):
- `Layout` — page shell: fonts (Newsreader serif / Instrument Sans / JetBrains Mono), meta tags, nav, footer, `site.js`
- `SiteNav` / mobile menu — desktop CSS-hover dropdowns driven by `src/data/nav.ts` (ported 1:1 from the design's `chrome.js` NAV data), off-canvas mobile panel
- `SiteFooter` — 5-column footer matching the design
- `Icon` — 40+ inline SVG icons ported from the design's `icons.js`, rendered server-side (see implementation note below)
- `Button`, `CTABand`, `SubpageHero`, `SectionHead`, `SplitList`, `BentoCard`, `TestimonialCard`, `FAQItem`, `RelatedCards`, `SplitFeature`/`SplitContent`/`MockFrame`, `ProductMock` building blocks (`PM`, `PMSidebar`, `PMStats`, `PMCard`, `PMTask`, etc.), `AccessMatrix`
- `public/static/styles.css` — the design's full stylesheet (design tokens, responsive breakpoints) copied verbatim, with asset URLs rewritten to `/static/assets/...`
- `public/static/site.js` — client-side behavior: mobile menu open/close, homepage role-tab switching, anchor smooth-scroll, mock form "✓ Sent" state. FAQ accordions are native `<details>` (no JS needed). Desktop nav dropdowns are pure CSS.

**Pages implemented** (in `src/pages/`):
- `/` — Homepage: hero w/ "Today" dashboard product mock, trust logo strip, problem section (3 cards), "what is Groundwork" split w/ lead-detail mock, four pillars (Sales/Financial/Operations/Admin), role tabs section (Owner/Office/Sales/Foreman/Laborer, 5 switchable panels), My Day spotlight, bento feature grid (12 cards), testimonials, implementation timeline (4 steps), dark CTA band, 8-item FAQ, final CTA
- `/product` — Product hub (8-tile bento linking to every module)
- `/product/my-day` — My Day module page (ritual copy + Today mock, 5-role-lens grid, related cards, CTA)
- `/product/sales` — Sales module page (pipeline kanban mock, client detail mock, sales resources grid, related cards, CTA)

**Routes wired in `src/index.tsx`**: `/`, `/product`, `/product/my-day`, `/product/sales`, plus the handoff's stated redirects `/book-demo → /demo` and `/info → /`.

## Not Yet Implemented (remaining from the 30-page route map)

The handoff specifies 30 pages total; **4 are built, 26 remain**:
- Product modules: `/product/financial`, `/product/operations`, `/product/admin`, `/product/mobile`, `/product/platform` (source HTML already reviewed in the design repo — same `SplitFeature`/`ProductMock`/`RelatedCards`/`CTABand` component pattern as Sales/My Day, just needs the page files written)
- `/features` — full feature list (388-line dense page, one section per pillar)
- Solutions: `/solutions` hub + `/solutions/landscaping`, `/solutions/home-service`, `/solutions/field-service`, `/solutions/multi-crew-teams`
- Roles: `/roles` hub + `/roles/owners`, `/roles/office-managers`, `/roles/sales-reps`, `/roles/foremen`, `/roles/laborers`
- Utility: `/pricing`, `/customers`, `/case-studies`, `/resources`, `/faq`, `/security`, `/about`, `/contact`
- Conversion: `/demo`, `/start`, `/signup`, `/login`, `/download`
- The `/app → workspace.groundwork-crm.com/login` redirect and the `login.html` → workspace bridge behavior

All source design HTML for these pages is available at
`$HOME/sb-git-refs/designer2-c6cfacb8-848c-45ab-9f3d-2f34c3767db6/design_handoff_groundwork_marketing_site/pages/*.html`
and follows the same patterns already implemented (`SubpageHero`, `SplitFeature`, `ProductMock`, `RelatedCards`, `CTABand`, `BentoCard`). Building them out is mechanical repetition of the established component system — no new architecture needed.

## Key Implementation Notes
- **Icon rendering gotcha**: Hono JSX's SSR renderer treats `<svg>` as a namespace-context node, which throws when combined with `dangerouslySetInnerHTML` directly on the `<svg>` element. Fixed by building the icon's SVG markup as a raw HTML string and injecting it via a wrapping `<span dangerouslySetInnerHTML>` instead (see `src/components/Icon.tsx`).
- Component classes/CSS selectors were kept identical to the design's `styles.css` (e.g. `.pm`, `.bento-card`, `.split-list`) so the ported stylesheet drives visuals unchanged — no Tailwind rewrite was done, matching the "recreate in framework, keep visuals authoritative" instruction from the handoff README.

## Data / Storage
No database. Purely static marketing content rendered server-side per request via Hono. Demo/signup/contact forms (once built) are mocked client-side per the handoff spec (`event.preventDefault()` + "✓ Sent" state) — wiring to a real lead-capture endpoint (HubSpot, Salesforce Web-to-Lead, or a Cloudflare Worker + email API) is a follow-up task.

## Local Development
```
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000/
```

## Deployment
Not yet deployed. Two Cloudflare deploy paths are available for this project (BYOK vs. Genspark-hosted) — ask the user which one before deploying, per project convention.
