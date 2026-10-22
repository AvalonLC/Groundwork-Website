# Groundwork Site Concierge — Architecture Plan (REVIEW DRAFT — no code built yet)

## 0. What this is NOT
Not a bolt-on "Intercom-style FAQ widget" that answers generic questions from a canned script. The
brief was "heavily advanced, cutting edge, practical" — so this plan is for a **grounded, tool-using
sales concierge** that knows this specific product cold, can *do* things (not just talk), and is
built to move a visitor toward a booked demo — because that's the actual job this website has.

---

## 1. Positioning & Persona

**Name (working)**: *Groundwork Concierge* (final copy decision is yours — flagged as open item #1 below).

**Persona**: A sharp, specific product specialist — not a generic assistant. It knows:
- Every trade you serve, the exact pricing model, every pillar/feature, every role's view, the
  implementation timeline, and the FAQ — cold, with zero hallucination tolerance.
- What page the visitor is currently on, and tailors its opening behavior accordingly (an HVAC-page
  visitor gets HVAC-aware framing without having to ask).

**Hard rule, enforced in the system prompt and via tool-call allowlisting**: it never invents a
price, a feature, or a capability. If something isn't in the grounded knowledge base, it says so and
offers a real human path (the existing `/demo` booking flow or `tyler@groundwork-crm.com`). This is
non-negotiable for a product with real pricing claims on a marketing site.

---

## 2. Why this is the "cutting edge" version, concretely

| Generic chatbot widget | This plan |
|---|---|
| Canned FAQ answers, text only | Streaming, token-by-token responses (feels alive, not a form) |
| No memory of where the visitor is | Full page-context awareness — knows the current route, injects it into the system prompt every turn |
| Dead-end text answers | **Tool-calling that does real things inline in the chat**: renders a live pricing estimate card, deep-links into a specific `/explore` panel, books a demo without leaving the conversation |
| One-size-fits-all tone | Light role detection ("are you more on the ops side, sales side, or ownership side?") that reshapes which pillars/features get emphasized — mirrors the "View as" pattern already built into `/explore` |
| Free-text black box, no learning loop | Every conversation logged to D1 (anonymized) so you can see what visitors actually ask and tighten the knowledge base over time |
| Can go off the rails on adversarial input | System-prompt hardening + tool allowlist + rate limiting — this is the one feature on the site with a real per-message cost, so abuse resistance is a first-class requirement, not an afterthought |

---

## 3. High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser (every page, via Layout.tsx)                            │
│  ┌──────────────┐        ┌──────────────────────────────────┐    │
│  │ Floating      │──────▶│ Slide-over chat panel              │    │
│  │ launcher      │        │ (reuses .demo-ai-overlay visual   │    │
│  │ (bottom-right)│        │  language already built for       │    │
│  └──────────────┘        │  /explore — brand-consistent)      │    │
│                            └───────────────┬────────────────────┘ │
└────────────────────────────────────────────┼──────────────────────┘
                                              │ POST /api/chat (SSE stream)
                                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Hono Worker (this repo)                                          │
│  1. Rate-limit check (D1 counter, per session + per IP)            │
│  2. Build system prompt:                                          │
│       - persona + hard rules                                      │
│       - current page context (route, trade/role if detectable)    │
│       - curated knowledge base (src/data/ai-knowledge.ts)          │
│       - conversation history (from D1, capped window)              │
│  3. Call OpenAI (gpt-5-mini default) with tool definitions          │
│  4. Stream tokens back to browser as they arrive                   │
│  5. On tool_call: execute server-side, inject result, continue      │
│  6. Persist every turn to D1 (chat_sessions / chat_messages)        │
│  7. On lead-worthy signal: write chat_leads row + SendGrid notify   │
│     (reuses existing src/lib/sendgrid.ts — zero new email infra)   │
└─────────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                                   D1 database (new binding)
                                   OpenAI API (new secret: OPENAI_API_KEY)
```

No new runtime dependencies beyond the OpenAI SDK (or raw `fetch`, which is lighter and avoids
bundle bloat on Workers — recommended). No Vectorize, no KV, no new frontend framework.

---

## 4. Knowledge grounding strategy — curated, not naive RAG

Your real content (trades, pricing, pillars, roles, FAQ) is already structured, finite, and
accurate — it lives in `trades.ts`, `PricingCalculator.tsx`, the `home.tsx` Platform pillars, the
role pages, and the FAQ array. Chunking rendered HTML and vector-searching it would be slower,
costlier, and more hallucination-prone than just **handing the model the real structured facts
directly.**

**Plan**: new `src/data/ai-knowledge.ts` — a single curated, hand-maintained knowledge object built
*from* (and kept in sync with) the existing data files:
- Company facts & positioning
- Full pricing model (literally re-export `CALC_PLANS` / `AI_PACKAGES` from `PricingCalculator.tsx`
  — one source of truth, no drift)
- One summary per trade (derived from `trades.ts`)
- The four platform pillars + role breakdown (from `home.tsx`'s Platform section)
- The exact FAQ array (from `home.tsx`) — if it's a good enough answer for a human visitor reading
  the page, it's a good enough answer for the bot to paraphrase
- A URL map (every real route) so the bot *only ever links to pages that exist*

This gets stuffed into the system prompt every call (it's small — a few KB of structured text, not
a scraped corpus). **Phase 2** (below) adds real vector search over the blog + full page copy for
long-tail questions this curated set won't cover, once you've seen what Phase 1 actually gets asked.

---

## 5. Tool-calling catalog (the part that makes it practical, not just chatty)

| Tool | What it does | Why it matters |
|---|---|---|
| `get_pricing_estimate(plan, team_size, ai_package)` | Runs the *exact* pricing math from `PricingCalculator.tsx` server-side, returns a real number | No more "roughly $X" hallucination — renders an actual estimate card inline in the chat |
| `recommend_trade_page(trade)` | Returns the real `/trades/:slug` URL + one-line summary | Bot can say "here's exactly what Groundwork does for roofing" with a real clickable link |
| `jump_to_demo_panel(panel_key)` | Returns a deep link into `/explore?panel=<key>` | "Want to see the dispatch board?" → inline button that actually opens the live interactive demo at the right screen |
| `capture_lead(name, email, company, trade, team_size, context_summary)` | Writes to `chat_leads` in D1 + fires the existing SendGrid notify (same inbox as `/api/demo-request`) | The bot can book a demo *inside the conversation* — no form, no page reload, and the summary field means your sales side gets pre-qualified context, not just a name and email |
| `email_transcript(email)` | Sends the visitor their own conversation via SendGrid | High-end touch — "want this sent to your inbox?" — also a second lead-capture surface |

**Guardrail**: tool set is a fixed allowlist defined server-side. The model can request these tools
and nothing else — no arbitrary code execution, no "search the web," no hitting the real product's
API. This is a closed, auditable action surface.

---

## 6. UX & placement

**Recommendation**: a persistent floating launcher (bottom-right, every page, added once in
`Layout.tsx`) that opens a slide-over panel — **visually extending the `.demo-ai-overlay` pattern
already built and shipped for `/explore`'s Groundwork AI panel**, so it reads as the *same* AI
surface the product itself has, not a third-party widget bolted onto a marketing site. This
reinforces "this company's own AI is this good" as a selling point in itself.

Why not a dedicated full `/ai-assistant` page instead: the whole value is that it's **one click away
on every page**, with full context of what the visitor is already looking at. A separate page breaks
that context link and adds friction. (Open to overriding this — see decision points.)

**Inline rendering inside the panel** (not just text bubbles):
- A "pricing estimate" tool result renders as the same visual card style as `/pricing`'s calculator output
- A demo-booking tool call renders a compact inline form (name/email/company) that submits without leaving the chat
- Navigation suggestions render as real tappable buttons with the destination page's name, not a raw URL

---

## 7. Data model (new D1 database — first database this project would have)

```sql
-- One row per browser session (anonymous, cookie-based id, no auth)
CREATE TABLE chat_sessions (
  id TEXT PRIMARY KEY,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  first_path TEXT,
  last_path TEXT,
  role_hint TEXT,          -- 'owner' | 'office_manager' | 'sales' | 'ops' | null
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
  tool_args TEXT,           -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES chat_sessions(id),
  name TEXT, email TEXT, company TEXT, trade TEXT, team_size TEXT,
  context_summary TEXT,     -- bot-generated one-paragraph summary of what the visitor needs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notified_at DATETIME
);

-- rate limiting: messages per session per rolling hour
CREATE TABLE chat_rate_limits (
  session_id TEXT PRIMARY KEY,
  window_start DATETIME,
  message_count INTEGER DEFAULT 0
);
```

No real customer or tenant data ever touches this — it's visitor conversation data only, same
confidentiality posture already used for this entire fictional-cast project.

---

## 8. Security & cost controls (first feature on this site with real per-message $ cost)

- **`OPENAI_API_KEY`** stored as a Cloudflare secret (`wrangler pages secret put`), never touches
  the client — identical pattern to the existing `SENDGRID_API_KEY`.
- **Rate limiting**: capped messages per session per hour (D1-backed counter) + a global daily
  budget circuit-breaker (stop serving new conversations past a configurable daily spend ceiling,
  fail gracefully to "please book a demo directly" with a real link).
- **Prompt-injection resistance**: system prompt is authoritative and not user-overridable; tool
  allowlist means even a successfully "jailbroken" conversation can't do anything beyond the 5 tools
  above — it can't, for instance, be tricked into emailing arbitrary addresses or returning
  fabricated pricing, since `get_pricing_estimate` computes from real constants, not free text.
- **Model choice**: `gpt-5-mini` by default (fast + cheap, plenty for a grounded, curated-knowledge
  assistant); flag to upgrade specific high-value moments (e.g. the final lead-summary generation)
  to full `gpt-5` if quality needs it. This is a cost/quality dial you can tune after seeing real usage.
- **CSP update required**: `connect-src`/`script-src` already allowlists Cloudflare Insights; adding
  the chat endpoint is same-origin (`/api/chat`) so no CSP changes needed for the backend call itself.

---

## 9. Phased rollout

**Phase 1 (recommended first ship)**
- Floating launcher + slide-over panel, every page
- Streaming chat backed by curated knowledge base (§4)
- All 5 tools in §5
- D1 logging + rate limiting + lead capture wired to existing SendGrid notify
- Page-context + light role detection

**Phase 2 (once you've seen Phase 1 real usage)**
- Real vector search (Cloudflare Vectorize) over full page copy + all 7 blog posts, for long-tail
  questions outside the curated set
- Persist role/trade detection across page navigations within a visit (not just within one chat)
- A simple internal `/admin/chat-review` view (password/allowlist-gated) so you can read real
  conversations and tighten the knowledge base

**Phase 3 (stretch, only if there's a clear case)**
- Proactive triggers (e.g., idle 20s on `/pricing` → gentle nudge)
- Voice input/output
- A/B testing different personas or opening lines

---

## 10. Open decision points — need your call before I build

1. **Name/persona copy** — "Groundwork Concierge," something else, or no visible name at all (just an icon)?
2. **Placement** — confirm floating launcher + slide-over (my recommendation), or do you want a
   dedicated full-page experience instead (or both)?
3. **Model budget** — comfortable with `gpt-5-mini` as the default workhorse model? (Cheapest/fastest
   credible option; quality is strong for grounded, curated-knowledge use cases like this.)
4. **Lead-capture inbox** — same `tyler@groundwork-crm.com` as the existing demo-request/contact
   forms, or a dedicated address for chat-sourced leads?
5. **Rate-limit ceiling** — want me to propose specific numbers (e.g. 30 messages/session/hour, a
   daily global cap), or do you have a budget figure in mind I should design against?
6. **Scope for v1** — good with Phase 1 as scoped above, or do you want to pull anything from Phase 2
   forward (most likely candidate: the full-site vector search)?

Once these are confirmed I'll build Phase 1 end-to-end on a branch, same workflow as the mobile
redesign — nothing touches production until you've seen it live and said go.
