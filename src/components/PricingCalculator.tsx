// Interactive "what would my team pay?" calculator for the pricing page.
// Purely client-side math (site.js: bindPricingCalculator) — no backend call.
// Numbers live as data-* attributes on the result cards so the calculator has
// zero pricing logic duplicated in JS beyond arithmetic + the field volume
// brackets (seats 1-5 full price, 6-10 at -10%, 11+ at -15%, mirrored exactly
// in bindPricingCalculator's fieldCost() helper) and the view-only overage
// (first N per plan included free, additional seats at the flat rate below).

interface CalcPlan {
  key: string
  name: string
  repPrice: number
  fieldPrice: number
  officePrice: number
  viewIncluded: number
  minSeats: number
  badge?: string
}

interface AiPackage {
  key: string
  label: string
  optionText: string
  price: number | null // null = not a fixed number (Custom / contact sales)
  lineLabel: string // shown in the per-plan AI line item
}

const VIEW_ONLY_PRICE = 10

const CALC_PLANS: CalcPlan[] = [
  { key: 'core', name: 'Core', repPrice: 49, fieldPrice: 25, officePrice: 89, viewIncluded: 1, minSeats: 3 },
  { key: 'growth', name: 'Growth', repPrice: 65, fieldPrice: 30, officePrice: 105, viewIncluded: 3, minSeats: 5, badge: 'Most popular' },
  { key: 'pro', name: 'Pro', repPrice: 85, fieldPrice: 35, officePrice: 135, viewIncluded: 5, minSeats: 8 },
]

// Company-wide AI add-on, priced flat per company (never multiplied by seat
// count, never counted toward minSeats). "Included" is the $0 default that
// every plan already ships with; the rest are optional packages layered on
// top. Mirrors the dedicated Groundwork AI section below the calculator.
const AI_PACKAGES: AiPackage[] = [
  { key: 'included', label: 'Included AI', optionText: 'Included AI — $0/mo (plan allowance)', price: 0, lineLabel: 'Included AI' },
  { key: 'essentials', label: 'AI Essentials', optionText: 'AI Essentials — $12/mo (500 actions)', price: 12, lineLabel: 'AI Essentials' },
  { key: 'plus', label: 'AI Plus', optionText: 'AI Plus — $29/mo (1,500 actions)', price: 29, lineLabel: 'AI Plus' },
  { key: 'max', label: 'AI Max', optionText: 'AI Max — $59/mo (5,000 actions)', price: 59, lineLabel: 'AI Max' },
  { key: 'byok', label: 'Use my own API key', optionText: 'Use my own API key — $0 Groundwork charge', price: 0, lineLabel: 'Your API key (BYOK)' },
  { key: 'custom', label: 'Custom', optionText: 'Custom — contact sales', price: null, lineLabel: 'Custom' },
]

export function PricingCalculator() {
  return (
    <div class="pricing-calc" data-pricing-calc data-view-price={VIEW_ONLY_PRICE}>
      <div class="pricing-calc-head">
        <span class="eyebrow">Estimate your price</span>
        <h3>What would your team actually pay?</h3>
        <p>Owners and admins are always free. Enter everyone else and see a real monthly number per plan.</p>
      </div>

      <div class="calc-owner-row">
        <div class="calc-owner-info">
          <span class="calc-owner-count">1</span>
          <div class="calc-owner-copy">
            <strong>Owner / Admin seat</strong>
            <span>You — free, unlimited, on every plan. This is the floor: full access, zero seat cost.</span>
          </div>
        </div>
        <div class="calc-owner-price">$0<small>/mo</small></div>
      </div>

      <div class="pricing-calc-inputs">
        <label class="calc-field">
          <div class="calc-label">
            Reps / Estimators
            <span>Build proposals, manage the pipeline</span>
          </div>
          <div class="calc-stepper">
            <button type="button" class="calc-step" data-calc-step="rep" data-dir="-1" aria-label="Decrease">
              −
            </button>
            <input type="number" min="0" max="999" value="2" data-calc-input="rep" inputmode="numeric" />
            <button type="button" class="calc-step" data-calc-step="rep" data-dir="1" aria-label="Increase">
              +
            </button>
          </div>
        </label>
        <label class="calc-field">
          <div class="calc-label">
            Field crew
            <span>Crew, laborers, foremen clocking in</span>
          </div>
          <div class="calc-stepper">
            <button type="button" class="calc-step" data-calc-step="field" data-dir="-1" aria-label="Decrease">
              −
            </button>
            <input type="number" min="0" max="999" value="6" data-calc-input="field" inputmode="numeric" />
            <button type="button" class="calc-step" data-calc-step="field" data-dir="1" aria-label="Increase">
              +
            </button>
          </div>
        </label>
        <label class="calc-field">
          <div class="calc-label">
            Office Managers
            <span>Dispatch, billing, back-office ops</span>
          </div>
          <div class="calc-stepper">
            <button type="button" class="calc-step" data-calc-step="office" data-dir="-1" aria-label="Decrease">
              −
            </button>
            <input type="number" min="0" max="999" value="1" data-calc-input="office" inputmode="numeric" />
            <button type="button" class="calc-step" data-calc-step="office" data-dir="1" aria-label="Increase">
              +
            </button>
          </div>
        </label>
        <label class="calc-field">
          <div class="calc-label">
            View-only
            <span>Read-only — subs, investors, accountants</span>
          </div>
          <div class="calc-stepper">
            <button type="button" class="calc-step" data-calc-step="view" data-dir="-1" aria-label="Decrease">
              −
            </button>
            <input type="number" min="0" max="999" value="0" data-calc-input="view" inputmode="numeric" />
            <button type="button" class="calc-step" data-calc-step="view" data-dir="1" aria-label="Increase">
              +
            </button>
          </div>
        </label>
      </div>

      <div class="calc-volume-note">
        Field pricing already includes volume breaks — seats 6–10 are 10% lower, seats 11+ are 15% lower — and
        every plan includes a handful of free view-only seats before the $10/mo add-on rate kicks in. Both are
        baked into the totals below automatically.
      </div>

      <label class="calc-field calc-field-ai">
        <div class="calc-label">
          Add company-wide AI
          <span>One allowance for the whole company — not billed per seat</span>
        </div>
        <select data-calc-ai-select class="calc-ai-select">
          {AI_PACKAGES.map((pkg) => (
            <option value={pkg.key} data-price={pkg.price === null ? '' : pkg.price} data-line-label={pkg.lineLabel} selected={pkg.key === 'included'}>
              {pkg.optionText}
            </option>
          ))}
        </select>
      </label>

      <div class="calc-solo-hint" data-calc-solo-hint style="display: none;">
        Just you, no crew yet? These plans have seat minimums — <a href="#starter-plan">check out Starter</a> instead,
        it's built for solo operators.
      </div>

      <div class="pricing-calc-results">
        {CALC_PLANS.map((p) => (
          <div
            class={`calc-result${p.badge ? ' active' : ''}`}
            data-calc-plan={p.key}
            data-rep-price={p.repPrice}
            data-field-price={p.fieldPrice}
            data-office-price={p.officePrice}
            data-view-included={p.viewIncluded}
            data-min-seats={p.minSeats}
          >
            {p.badge ? <div class="calc-badge">{p.badge}</div> : <div class="calc-badge-spacer"></div>}
            <div class="calc-plan-name">{p.name}</div>

            <div class="calc-line-items">
              <div class="calc-line">
                <span>CRM and seats</span>
                <span data-calc-crm-subtotal>$0/mo</span>
              </div>
              <div class="calc-line calc-line-ai" data-calc-ai-line-row>
                <span data-calc-ai-line-label>Included AI</span>
                <span data-calc-ai-line>$0/mo</span>
              </div>
            </div>

            <div class="calc-total">
              <span class="calc-total-label">Estimated total</span>
              <span data-calc-total>$0</span>
              <small>/mo</small>
            </div>
            <div class="calc-note" data-calc-note></div>
            <a href="/demo" class="calc-cta">
              Get this as a real quote →
            </a>
          </div>
        ))}
        <div class="calc-result calc-result-enterprise">
          <div class="calc-badge-spacer"></div>
          <div class="calc-plan-name">Enterprise</div>
          <div class="calc-total">
            <span>Custom</span>
          </div>
          <div class="calc-note">Multi-location roll-up &amp; volume pricing, plus a custom AI allowance</div>
          <a href="/demo" class="calc-cta">
            Talk to sales →
          </a>
        </div>
      </div>
    </div>
  )
}
