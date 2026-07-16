# Sales pricing cheat sheet — internal use only

**Do not publish this file or send it to prospects.** It exists so a rep can
quote in real time on a demo call without doing bracket math by hand. The
public-facing version of this logic is the live calculator on
`https://groundwork-crm.info/pricing` — when in doubt, drive the prospect to
that page and adjust the seat counts live, or just plug the numbers in there
yourself while on the call.

Everything below is derived from the same formulas that ship in
`public/static/site.js` (`fieldCost()` / `viewCost()`) and are documented in
`src/components/PricingCalculator.tsx`. If those change, this file is stale —
regenerate it (see script at the bottom).

## The model in one paragraph

- **Owner/Admin seats are free**, unlimited, every plan.
- **Rep/Estimator** and **Office Manager** are billed flat per seat at the
  plan's rate — no volume discount on these two roles.
- **Field** seats get a graduated volume discount: seats 1–5 at full rate,
  seats 6–10 at −10%, seats 11+ at −15%. It's a bracket, not a cliff — the
  discount only applies to the seats *in* that tier, same as a tax bracket.
- **View-only** seats are free up to the plan's included quota (Core=1,
  Growth=3, Pro=5), then $10/mo flat per seat above that, same rate on every
  plan.
- **Seat minimums** count Rep + Field + Office only — View-only seats never
  count toward or against a plan's minimum.

## Plan rates

| | Core | Growth | Pro |
|---|---|---|---|
| Rep / Estimator | $49/mo | $65/mo | $85/mo |
| Field (base rate, seats 1–5) | $25/mo | $30/mo | $35/mo |
| Office Manager | $89/mo | $105/mo | $135/mo |
| View-only included free | 1 | 3 | 5 |
| View-only overage | $10/mo | $10/mo | $10/mo |
| Seat minimum (Rep+Field+Office) | 3 | 5 | 8 |

## Quick-quote table (pre-computed, common team shapes)

All totals below are monthly, verified against the live calculator formula.
"BELOW MIN" means that plan's seat minimum isn't met at that headcount —
don't quote that plan/scenario combo; point them at the next plan down or up.

| Team | Core | Growth | Pro |
|---|---|---|---|
| 1 rep + 2 field | **$99** | below min (5) | below min (8) |
| 1 rep + 4 field | **$149** | **$185** | below min (8) |
| 1 rep + 4 field + 1 office | **$238** | **$290** | below min (8) |
| 1 rep + 9 field + 1 office | **$353** | **$428** | **$521** |
| 2 rep + 8 field + 1 office | **$379.50** | **$466** | **$574.50** |
| 1 rep + 14 field + 1 office | **$460.50** | **$557** | **$671.50** |
| 2 rep + 12 field + 2 office | **$556** | **$676** | **$832** |
| 1 rep + 24 field + 1 office | **$673** | **$812** | **$969** |
| 1 rep + 5 field + 1 office + 2 view-only | **$273** | **$320** | below min (8) |
| 1 rep + 5 field + 1 office + 6 view-only | **$313** | **$350** | below min (8) |

Anything not on this list: plug it into the calculator on `/pricing` — it's
the same formula, live, with a UI. Faster than re-deriving it by hand.

## Jobber talk track (matches the live comparison table on /pricing)

Real, current numbers pulled from `getjobber.com/pricing` (verify before
quoting if it's been more than a few months — Jobber does change pricing):

| Team size | Jobber plan & rate | Groundwork |
|---|---|---|
| 5 users (1 owner + 4 field) | Connect, $119–169/mo | Core, $149/mo |
| 10 users (1 owner + 9 field) | Grow, $199–349/mo | Growth, $323/mo |
| 15 users (1 owner + 14 field) | Plus, $449–599/mo | Pro, $536.50/mo |
| 25 users (1 owner + 24 field) | **No published rate — Jobber requires a sales call past 15 users** | Pro, $834/mo |

Talking points:
- Jobber's "user" is one flat rate regardless of role — a laborer costs the
  same as an admin. Groundwork's Field rate is a fraction of Rep/Office
  because that's what the role actually needs.
- Jobber's published range at every tier is a *spread* ($119–169, not a
  single number) — that's monthly vs. annual-prepay, not a negotiation range.
  Groundwork's number is exact and doesn't depend on prepaying a year up
  front to get the good rate.
- Past 15 users, Jobber has no self-serve price at all — you have to talk to
  their sales team and negotiate. Groundwork keeps computing a transparent
  number all the way up; that's a real differentiator for growing teams and
  worth leading with if the prospect is at or near that 15-person mark.
- Don't quote Jobber's annual-prepay low end as if it's their real price in a
  side-by-side — always use the monthly-billed number for the apples-to-apples
  comparison, same as the public page does.

## Regenerating this table

If seat rates or the discount brackets change, re-run this and paste the
output back into the two tables above:

```python
def field_cost(qty, rate):
    if qty <= 0: return 0
    tier1 = min(qty, 5)
    tier2 = max(0, min(qty, 10) - 5)
    tier3 = max(0, qty - 10)
    return tier1 * rate + tier2 * rate * 0.9 + tier3 * rate * 0.85

def view_cost(qty, included, rate=10):
    return max(0, qty - included) * rate

plans = {
    'Core':   {'rep': 49, 'field': 25, 'office': 89, 'view_included': 1, 'min_seats': 3},
    'Growth': {'rep': 65, 'field': 30, 'office': 105, 'view_included': 3, 'min_seats': 5},
    'Pro':    {'rep': 85, 'field': 35, 'office': 135, 'view_included': 5, 'min_seats': 8},
}

scenarios = [
    ("1 rep, 2 field", 1, 2, 0, 0),
    ("1 rep, 4 field", 1, 4, 0, 0),
    # ...add whatever team shapes come up often on calls
]

for label, rep, field, office, view in scenarios:
    print(label + ":")
    for name, p in plans.items():
        total = rep*p['rep'] + field_cost(field, p['field']) + office*p['office'] + view_cost(view, p['view_included'])
        min_ok = "OK" if (rep+field+office) >= p['min_seats'] else "BELOW MIN " + str(p['min_seats'])
        print("  " + name + ": $" + format(total, '.2f') + "  [" + min_ok + "]")
```

_Last regenerated: 2026-07-16, matching commit `8f3e859` on `main`._
