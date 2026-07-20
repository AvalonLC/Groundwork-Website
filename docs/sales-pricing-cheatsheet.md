# Sales pricing cheat sheet — internal use only

**Do not publish this file or send it to prospects.** It exists so a rep can
quote in real time on a demo call without doing math by hand. The
public-facing version of this logic is the live calculator on
`https://groundwork-crm.info/pricing` — when in doubt, drive the prospect to
that page and adjust the user count live, or just plug the numbers in there
yourself while on the call.

Everything below is derived from the same formula that ships in
`public/static/site.js` (`bindPricingCalculator`) and is documented in
`src/components/PricingCalculator.tsx`. If those change, this file is stale —
regenerate it (see script at the bottom).

## The model in one paragraph

- Every plan has a **flat monthly base fee** that includes a **starting
  allotment of internal users** — the allotment is different per plan (see
  table below), unlike the base fee itself.
- **Every user beyond that allotment is $25/mo flat** — no matter their role
  or permission level. Owner, admin, rep, estimator, field, office: all the
  same rate.
- **No seat minimums.** A true solo operator on Core just pays the $259 base
  fee with zero additional users.
- **No volume-discount brackets.** The $25/mo rate doesn't change as
  headcount grows past the included allotment.
- **Customer-portal and other external users are free** and never count
  toward the paid internal-user total. Only people who log in to run the
  business (not clients checking their own job status) count.
- AI allowances and AI add-on packages are unchanged and priced separately,
  per company — see the AI section below.

## Plan rates

| | Core | Growth | Pro | Enterprise |
|---|---|---|---|---|
| Base platform fee | $259/mo | $359/mo | $459/mo | Custom |
| Included users | 1 | 5 | 10 | Built around your locations |
| Each additional user | $25/mo | $25/mo | $25/mo | Custom |
| AI allowance | 100 actions/mo | 250 actions/mo | 500 actions/mo | Custom |

**Heads up on this model:** because the included-user allotment jumps a lot
between plans (1 → 5 → 10) while the base fee only steps up modestly, a
prospect right at a boundary (e.g. exactly 10 users) can find **Pro cheaper
than Growth or Core** even though it's the "higher" tier — Pro's bigger
allotment absorbs the headcount for free where Core/Growth would be charging
per-user overage. Always run the actual headcount through all three plans
(or the live calculator) before quoting — don't assume Core is always
cheapest or Pro is always most expensive. Lead with the plan that fits their
*feature* needs, and mention if a higher tier also happens to be cheaper at
their headcount — it's a good-news moment, not something to hide.

## Quick-quote table (pre-computed, common team sizes)

Formula: `total = base_fee + max(0, users - included) * 25`. There's no
"below minimum" case — every headcount from 1 up is quotable on every plan.

| Users | Core (incl. 1) | Growth (incl. 5) | Pro (incl. 10) |
|---|---|---|---|
| 1 | **$259** | **$359** | **$459** |
| 3 | **$309** | **$359** | **$459** |
| 5 | **$359** | **$359** | **$459** |
| 8 | **$434** | **$434** | **$459** |
| 10 | **$484** | **$484** | **$459** ← cheapest here |
| 15 | **$609** | **$609** | **$584** ← cheapest here |
| 20 | **$734** | **$734** | **$709** ← cheapest here |
| 25 | **$859** | **$859** | **$834** — at 25+, point them to Enterprise |

Anything not on this list: plug it into the calculator on `/pricing` — it's
the same formula, live, with a UI. Faster than re-deriving it by hand.

## Jobber talk track (matches the live comparison table on /pricing)

Real, current numbers pulled from `getjobber.com/pricing` (verify before
quoting if it's been more than a few months — Jobber does change pricing):

| Team size | Jobber plan & rate | Groundwork |
|---|---|---|
| 5 users | Connect, $119–169/mo | Core, $359/mo |
| 10 users | Grow, $199–349/mo | Growth, $484/mo |
| 15 users | Plus, $449–599/mo | Pro, $584/mo |
| 25 users | **No published rate — Jobber requires a sales call past 15 users** | Enterprise — contact us for custom pricing |

**Positioning:** Jobber's per-user add-on ($29/mo) is now *higher* than
Groundwork's ($25/mo) — and Groundwork bakes a starting allotment of users
straight into the base fee (Core 1, Growth 5, Pro 10) rather than charging
for every seat from day one. Lead with these:

- **Simple, predictable pricing.** One number to remember: the base fee,
  plus $25/mo per person beyond the plan's included allotment. No brackets,
  no minimums, no negotiating.
- **The operational value of Groundwork CRM.** Don't make this only about
  the per-user rate (Groundwork's is already the lower number) — it's about
  what the base fee unlocks: reporting, automation, a client portal, and
  built-in AI that Jobber doesn't bundle the same way. Steer the
  conversation to what the team can *do* with each plan, not just what a
  login costs.
- Jobber's published range at every tier is a *spread* ($119–169, not a
  single number) — that's monthly vs. annual-prepay, not a negotiation
  range. Groundwork's number is exact and doesn't depend on prepaying a
  year up front to get the good rate.
- Past 15 users, Jobber has no self-serve price at all — you have to talk to
  their sales team and negotiate. Groundwork keeps computing a transparent
  number up to that same point, then moves cleanly to a custom Enterprise
  quote (25+ users or multi-location) instead of an opaque one.
- Don't quote Jobber's annual-prepay low end as if it's their real price in a
  side-by-side — always use the monthly-billed number for the apples-to-apples
  comparison, same as the public page does.

## Housecall Pro talk track (matches the live comparison table on /pricing)

Housecall Pro does **not** run a plain public pricing page — their site
routes visitors through a quote quiz instead of listing rates. The numbers
below are our best-effort read of their publicly reported tiers (Basic,
Essentials, MAX), cross-checked against third-party review/aggregator sites,
**not** pulled from a live rate card. Treat these as directionally accurate,
not exact — say so if a prospect pushes on the specific number.

| Team size | Housecall Pro plan & rate | Groundwork |
|---|---|---|
| 1 user (owner-operator) | Basic, ~$59/mo | Core, $259/mo |
| 5 users | Essentials, ~$149/mo | Core, $359/mo |
| 8 users | MAX, ~$299–329/mo | Growth, $434/mo |

Talking points:
- Lead with the confidence caveat yourself before the prospect asks — "their
  own site won't tell you the number either, so here's the best public data
  we could find" builds more trust than presenting it as gospel.
- Housecall Pro's MAX tier caps around 8 users; past that they're in
  custom/sales-quote territory too, same pattern as Jobber past 15.
- The Groundwork number at 1 user looks higher than Housecall's Basic — that's
  expected and fine to acknowledge. The pitch there is what the base fee buys
  (a full operations platform, not just a per-user login), not a race to the
  cheapest solo tier.
- Don't lean on this table as hard as the Jobber one in a competitive deal —
  it's a supporting data point, not a verified head-to-head.

## JobNimbus / ServiceTitan / Buildertrend — no published pricing, don't
## invent numbers

All three keep pricing off their websites entirely and route every visitor to
a sales call or "request a quote" form — confirmed by direct crawl, not just
absence of a marketing page. Third-party estimates exist for all three but
disagree with each other by roughly 2–3x on the same product, which means
they're not reliable enough to quote or put in writing anywhere, including on
a call.

| Competitor | What we found | Rough third-party chatter (do not quote) |
|---|---|---|
| JobNimbus | Named tiers exist (Essentials/Pro/Premium/Enterprise by user-count bands: up to 3/10/19/20+) but zero dollar figures published; by-request only. | ~$225–550/mo base + $20–75/user — wide enough spread to be unusable. |
| ServiceTitan | No pricing anywhere on the site; always a sales conversation, typically quoted per-technician. | ~$245–398/technician/month — again, too wide to state as fact. |
| Buildertrend | No self-serve pricing at all; entire site funnels to "get your custom quote." | No usable range found. |

Talking points:
- Don't repeat the third-party numbers above to a prospect as if they're
  confirmed — frame it as "even the review sites can't agree within 2-3x of
  each other, which tells you something."
- The differentiator to lead with is transparency itself: Groundwork's full
  rate card is published on `/pricing` and the calculator gives an exact
  number in seconds — no call, no quiz, no waiting on a quote.
- If a prospect is actively evaluating one of these three, ask what number
  sales quoted them and compare directly — don't guess on their behalf.

## Regenerating this table

If the base fees, included-user allotments, or the per-user rate change,
re-run this and paste the output back into the tables above:

```python
plans = {
    'Core':   {'base': 259, 'included': 1},
    'Growth': {'base': 359, 'included': 5},
    'Pro':    {'base': 459, 'included': 10},
}

PER_USER = 25

scenarios = [1, 3, 5, 8, 10, 15, 20, 25]
# ...add whatever team sizes come up often on calls

for users in scenarios:
    print(str(users) + " users:")
    for name, p in plans.items():
        additional = max(0, users - p['included'])
        total = p['base'] + additional * PER_USER
        print("  " + name + ": $" + format(total, '.2f'))
```

_Last regenerated: 2026-07-20, matching the per-user rate cut and per-plan
included-user allotment change (rate dropped $29 → $25/mo; Growth now
includes 5 users, Pro now includes 10, Core unchanged at 1) on `main`._
