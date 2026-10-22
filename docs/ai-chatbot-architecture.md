# Groundwork AI — Architecture Plan v2 (REVIEW DRAFT — no code built yet)

Supersedes v1. Rewritten to incorporate your Phase 1 approval, your six decisions, and your six
required changes. This version is written to stand on its own — you don't need to have read v1.

---

## 0. What changed from v1, and why

- Dropped "heavily advanced / cutting edge" as the framing. The bar is now: **accurate, and it
  helps a visitor take a real next step.** Flashy streaming/tool-calling is still here, but it's in
  service of that bar, not the headline.
- Persona renamed **Groundwork Concierge → Groundwork AI**.
- Mobile gets its own treatment (full-screen panel), not just a scaled-down slide-over.
- Budget is now a real number with a real enforcement mechanism, not an open question.
- Two items that were Phase 2 "nice to have" in v1 — **conversion tracking** and **human handoff
  quality** — are now first-class Phase 1 requirements.
- `email_transcript` is demoted to last priority, after everything else is proven out.
- Three things got real architectural attention because they were previously hand-waved:
  **lead vs. booking**, **one pricing calculation, not two**, and **live vs. demo-only vs. roadmap
  feature claims**.

---

## 1. Persona

**Name**: **Groundwork AI**.

**Behavior rules** (enforced in the system prompt, and backstopped by server-side controls in §6 —
not relying on prompt wording alone):
- Opens by identifying itself as an AI assistant, plainly (e.g. "Hi — I'm Groundwork AI, an AI
  assistant for this site."). Never pretends to be a person.
- Asks **one question at a time**. No multi-question walls of text.
- Practical and concise tone — a knowledgeable product specialist, not a hype machine.
- Zero hallucination tolerance on price, features, or capability claims. If something isn't in the
  grounded knowledge base (§4), it says so and offers a real path: the `/demo` page or
  `tyler@groundwork-crm.com`.
- **Never says "booked."** See §2 — this is enforced structurally, not just as a tone instruction.

---

## 2. Lead capture vs. booking — the distinction is structural, not just wording

**The problem**: the only real scheduling system on this site is the Google Calendar Appointment
Schedule iframe embedded in `/demo` (confirmed by reading `src/pages/demo.tsx`). It's a third-party,
cross-origin embed — the page's own JavaScript has no way to detect whether a visitor actually
picked a time slot inside it. There is currently **no signal anywhere in this codebase that means
"an appointment is confirmed."**

**What that means for Phase 1, concretely**:
- The chatbot has exactly two honest actions available, and they are kept structurally separate:
  1. **`capture_lead`** — writes a row to D1 and sends `tyler@` an email, same as the existing
     `/api/demo-request` form. This is a **request**, and the tool's result text is a fixed template
     the assistant must use verbatim-ish (not freely generated), e.g.: *"I've sent your info to the
     team — they'll reach out to find a time."* It never says "scheduled," "booked," or "confirmed."
  2. **`get_booking_link`** — returns the real `/demo` URL. Framed as: *"Here's the link to pick an
     exact time yourself."* The assistant hands the visitor to the real calendar widget rather than
     claiming to have used it on their behalf.
- Both can be offered together ("I'll pass this to the team, and if you'd rather lock in a time
  right now yourself, here's the direct link") — but they are never conflated into one claim.
- **Phase 2 candidate (not in scope now, flagged for your awareness)**: Google Calendar API/webhook
  integration to get a real "confirmed" signal server-side. That's real integration work with a
  third-party API, not a chat feature — worth doing once Phase 1 proves the lead flow is useful.

---

## 3. One pricing calculation, not two

**What I found reading the actual code**: `PricingCalculator.tsx` only holds the `CALC_PLANS` /
`AI_PACKAGES` constants and JSX markup — zero arithmetic. The real math lives in
`public/static/site.js`'s `recalc()`, as plain DOM-coupled vanilla JS:

```js
var additionalUsers = Math.max(0, totalUsers - includedUsers)
var additionalUsersCost = additionalUsers * perUserPrice
var grandTotal = basePrice + additionalUsersCost
if (aiPrice !== null) grandTotal += aiPrice
```

Re-exporting just the constants (my original plan) would still leave two independent
implementations of this arithmetic — one in `site.js` for humans, one freshly written for the
chatbot's tool. That's exactly the drift risk you flagged.

**Fix**: extract this into one shared, pure module — `src/lib/pricing.ts`:
```ts
export const CALC_PLANS = [...]        // moved here from PricingCalculator.tsx
export const AI_PACKAGES = [...]       // moved here from PricingCalculator.tsx

export function calculatePricing(planKey: string, totalUsers: number, aiPackageKey: string) {
  // the exact logic above, as a pure function — no DOM, no side effects
  // returns { basePrice, includedUsers, perUserPrice, additionalUsers, additionalUsersCost,
  //           aiPackageLabel, aiPrice, grandTotal, isCustomAi, assumptions: string[] }
}
```
- `PricingCalculator.tsx` imports `CALC_PLANS`/`AI_PACKAGES` from here instead of defining them.
- The chatbot's `get_pricing_estimate` tool (server-side, inside the Worker) imports and calls
  `calculatePricing()` directly — same TypeScript module, same build.
- **The gap**: `public/static/site.js` is a plain static file, not bundled by Vite. To let it call
  the *same* function (not a copy), the build adds one step: compile `src/lib/pricing.ts` to a tiny
  standalone bundle at `public/static/pricing.js` (via esbuild, IIFE format, `window.GroundworkPricing`),
  loaded before `site.js`. `recalc()` then calls `window.GroundworkPricing.calculatePricing(...)` and
  only handles the DOM updates — the arithmetic lives in exactly one place, compiled into both
  surfaces from the same source.
- **Display requirement**: the chatbot's pricing responses show the assumptions alongside the
  number — e.g. "$359/mo base (5 users included) + $75/mo for 3 extra users + $29/mo AI add-on =
  **$463/mo**, billed monthly" — never a bare total.

---

## 4. Live, demo-only, or roadmap — every feature claim is tagged

Because this is a CRM still being built, the chatbot must never imply something is usable by a real
customer today when it's actually illustrative. `src/data/ai-knowledge.ts` (the curated knowledge
file, §5) tags every feature/pillar/demo-panel entry with:

```ts
status: 'live' | 'demo_only' | 'roadmap'
```

- **`live`** — real, shipped, a signed-up customer can use it today.
- **`demo_only`** — exists only inside `/explore`'s sample workspace to illustrate the concept; not
  yet something a real tenant can use.
- **`roadmap`** — planned, not built.

The system prompt requires the assistant to state the status plainly whenever it describes a
feature ("that's part of the interactive demo, illustrating what it'll look like — it's not live in
the product yet" vs. "that's live today"). The `jump_to_demo_panel` tool's result also carries this
tag so the UI can render a small "Demo illustration" badge next to the deep-link button itself — the
truthfulness doesn't depend only on the model choosing its words carefully.

---

## 5. Knowledge grounding — curated, not vector search (confirmed, unchanged from v1)

Structured facts handed to the model directly in the system prompt, built from existing source
files (not scraped HTML): company facts, the pricing module above, one summary per trade (from
`trades.ts`), the four platform pillars + role breakdown (from `home.tsx`), the FAQ array, a fixed
route allowlist (§6), and the live/demo/roadmap tags (§4). Vector search over full page copy + blog
stays a Phase 2 idea, deferred until curated coverage visibly runs out (tracked via the
"unanswered question" rate once Phase 1 has real traffic).

---

## 6. Server-side enforcement — hard controls, not prompt wording

Prompt-injection resistance comes from what the server will and won't execute, independent of what
the model is tricked into saying:

- **Input validation**: every tool call's arguments are validated against a strict schema
  server-side before anything runs (reject malformed/out-of-range values — e.g. `team_size` must be
  one of a known set, `plan` must be one of `CALC_PLANS` keys).
- **URL allowlist**: a fixed `ROUTE_ALLOWLIST` array of real site paths. The model never gets to emit
  a raw clickable link in free text — only tool results produce clickable links, and tool results
  are built by server code that checks every URL against this list before it reaches the browser.
  Anything not on the list is dropped.
- **Duplicate-submission prevention**: `chat_sessions.lead_captured` flag — a second `capture_lead`
  call in the same session returns an idempotent "already received" result instead of writing a new
  row or sending a second email. A short-window de-dupe on identical email address backs this up.
- **Email send throttling**: a D1-backed daily send counter for chat-sourced lead emails, hard-capped
  independent of the AI cost budget — so even a $-free loop (e.g. a scripted bot repeatedly
  triggering `capture_lead`) can't spam `tyler@`'s inbox.
- **Fixed tool allowlist**: exactly the tools in §7, nothing else — no arbitrary actions, no hitting
  the real product's API, no "search the web."

---

## 7. Tool catalog

| Tool | What it does | Guardrail |
|---|---|---|
| `get_pricing_estimate(plan, team_size, ai_package)` | Calls `calculatePricing()` from `src/lib/pricing.ts` — the exact shared function | Renders total **with** assumptions (§3); never a bare number |
| `recommend_trade_page(trade)` | Returns the real `/trades/:slug` URL + summary | URL checked against `ROUTE_ALLOWLIST` |
| `jump_to_demo_panel(panel_key)` | Deep link into `/explore?panel=<key>` | Carries `status` tag (§4) — UI shows "Demo illustration" badge when not `live` |
| `capture_lead(name, email, company, trade, team_size, current_software, main_frustration, timeline, context_summary)` | Writes `chat_leads` row + SendGrid notify to `tyler@groundwork-crm.com`, subject `[Groundwork Chat Lead] ...` | Idempotent per session (§6); fixed "request received" template text — never claims booking (§2) |
| `get_booking_link()` | Returns the real `/demo` URL | Framed as self-serve scheduling, not an automated booking |

`email_transcript` is **cut from Phase 1 entirely** — reconsidered only after the above prove out
(accuracy, correct feature demos, useful leads).

---

## 8. Sales handoff — useful, not just captured

`chat_leads` carries the five fields you asked for, filled in as they naturally surface in
conversation (never a rigid upfront form): **trade, team size, current software, main frustration,
timeline**. Two more fields keep sales honest about what they're reading:

```sql
ai_summary        TEXT,  -- one paragraph, generated by the model — clearly labeled in the email
                          -- as "AI-generated summary", never presented as the visitor's own words
verbatim_answers  TEXT   -- JSON: { "trade": "visitor's exact sentence", "main_frustration": "...", ... }
                          -- the visitor's actual words, preserved as-is, not paraphrased or overwritten
```

The notification email to `tyler@groundwork-crm.com` (subject `[Groundwork Chat Lead] <company or
name>`) includes **both** blocks, clearly separated and labeled — sales sees the AI's read on the
conversation *and* the visitor's ground truth side by side.

---

## 9. Budget enforcement — a real circuit breaker, not a guideline

**Caps**: $50/month, $5/day, enforced in application code.

- New D1 table `chat_usage` tracks running cost per day and per month (computed from each OpenAI
  response's token usage × that model's per-token price, incremented after every call).
- Before calling OpenAI, `/api/chat` checks both counters. **If either cap is hit, the Worker does
  not call OpenAI at all** — it returns a fixed, friendly degraded message instead: *"Groundwork AI
  is temporarily unavailable — here's how to reach us directly,"* with the `/demo` link and
  `tyler@groundwork-crm.com` always shown. The rest of the site, including the demo and contact
  forms, is completely unaffected — this only ever degrades the chat widget itself.
- These numbers are a pilot starting point, adjustable once there's real usage data — not a
  permanent ceiling.

---

## 10. Outcome tracking — instrumented, tied to business value

New D1 table `chat_events` (`session_id`, `event_type`, `event_meta` JSON, `created_at`) logging:
`demo_panel_clicked`, `lead_captured`, `booking_link_clicked`, `tool_error`, `rate_limited`,
`budget_capped`.

From these, computed metrics:
- **Relevant demo-panel clicks** — did the bot point people to a real feature and did they follow it.
- **Qualified leads** — `capture_lead` calls with at least trade + one qualifying field filled in.
- **Confirmed bookings** — honestly, Phase 1 can only track `booking_link_clicked` as a **proxy**
  (clicked through to `/demo`), not a true confirmed appointment — the iframe limitation from §2
  applies here too. This will be labeled as a proxy metric, not overstated as a real conversion count.
- **Failures** — `tool_error` + `rate_limited` + `budget_capped` counts.
- **Cost per qualified lead** — `chat_usage` total spend ÷ qualified lead count, over any date range.

---

## 11. UX & placement

- **Floating launcher**, every page, added once in a shared layout component. **Click to open only
  — no auto-open, no idle/proactive triggers in Phase 1.**
- **Desktop**: slide-over panel, visually extending the `.demo-ai-overlay` pattern already shipped
  for `/explore`'s Groundwork AI panel (same visual language, now promoted to a site-wide surface).
- **Mobile**: full-screen panel (not a scaled-down slide-over) — the existing `/explore` AI overlay
  is a panel *inside* the sample workspace frame, which doesn't translate directly to a full-screen
  marketing-site experience; this is a new mobile-specific treatment, built fresh rather than
  reused as-is.
- Tool results render inline as real UI, not raw text: a pricing estimate card (same visual style
  as `/pricing`), tappable navigation buttons with real page names (never a raw URL), the lead
  capture confirmation as a small inline card.

---

## 12. Data model (D1 — first database this project would have)

```sql
CREATE TABLE chat_sessions (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  first_path TEXT,
  last_path TEXT,
  role_hint TEXT,
  trade_hint TEXT,
  message_count INTEGER DEFAULT 0,
  lead_captured INTEGER DEFAULT 0
);

CREATE TABLE chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id),
  role TEXT NOT NULL,       -- 'user' | 'assistant' | 'tool'
  content TEXT,
  tool_name TEXT,
  tool_args TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id),
  name TEXT, email TEXT, company TEXT, trade TEXT, team_size TEXT,
  current_software TEXT, main_frustration TEXT, timeline TEXT,
  ai_summary TEXT,
  verbatim_answers TEXT,    -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notified_at DATETIME
);

CREATE TABLE chat_rate_limits (
  session_id TEXT PRIMARY KEY,
  window_start DATETIME,
  message_count INTEGER DEFAULT 0
);

CREATE TABLE chat_usage (
  day TEXT PRIMARY KEY,     -- 'YYYY-MM-DD'
  month TEXT,               -- 'YYYY-MM'
  cost_usd REAL DEFAULT 0
);

CREATE TABLE chat_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_meta TEXT,          -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

No real customer/tenant data touches this — visitor conversation data only, same confidentiality
posture as the rest of this fictional-cast project.

---

## 13. Model

`gpt-5-mini` as the pilot default, supports tool calling + structured outputs per OpenAI's docs —
but **the model name is a config value** (env var or D1-stored setting), never hardcoded in the
request path. Before locking in a production default, run realistic conversation tests (not just
confirm API compatibility) — pricing-question accuracy, tone, one-question-at-a-time adherence,
tool-call reliability. Swap candidates without a code change if `gpt-5-mini` underperforms.

**Open item for you**: production should call OpenAI directly with a Cloudflare secret
(`wrangler pages secret put OPENAI_API_KEY`) using the site owner's own OpenAI account — not this
sandbox's GenSpark-proxied dev key, which is a build/dev convenience only. Confirm you have (or will
set up) a real OpenAI API key for production before I wire this in.

---

## 14. Phased rollout

**Phase 1 (this build)**
- Floating launcher, desktop slide-over + mobile full-screen panel, click-to-open only
- Streaming chat on curated knowledge (§5), with live/demo/roadmap tagging (§4)
- All 5 tools in §7, including `get_booking_link` as a distinct action from `capture_lead`
- Shared `src/lib/pricing.ts` module (§3), used by both the human calculator and the chatbot
- D1 logging, rate limiting, $50/mo + $5/day enforced budget circuit breaker (§9)
- Server-side enforcement: validation, URL allowlist, dedupe, email throttling (§6)
- Enriched sales handoff with AI-summary + verbatim-answers separation (§8)
- Outcome tracking: `chat_events`, qualified-lead count, cost-per-qualified-lead (§10)

**Phase 2 (after real Phase 1 usage)**
- Vector search (Cloudflare Vectorize) for long-tail questions outside curated coverage
- Google Calendar API/webhook integration for a real confirmed-booking signal (§2)
- Internal `/admin/chat-review` view (allowlist-gated) to read real conversations
- `email_transcript`, reconsidered only once accuracy + lead quality are proven

**Phase 3 (stretch)**
- Proactive triggers (opt-in, not default)
- A/B testing opening lines / persona tone

---

## 15. Before I start building

Two things need your confirmation, surfaced above but repeating here since they affect the build:
1. **Production OpenAI key** — your own account's key as a Cloudflare secret, or do you want to
   keep using a shared/sandbox key short-term? (§13)
2. **Nothing else is blocking** — the six decisions and six required changes from your last message
   are all incorporated above. If this matches what you intended, I'll start Phase 1 on a new
   branch, same workflow as the mobile redesign: branch → you review → explicit approval → merge →
   deploy. No code lands on `main` without that.
