// Interactive "what would my team pay?" calculator for the pricing page.
// Purely client-side math (site.js: bindPricingCalculator) — no backend call,
// since it's just multiplying visible seat rates. Numbers live as data-*
// attributes on the result cards so the calculator has zero pricing logic
// duplicated in JS beyond arithmetic.

interface CalcPlan {
  key: string
  name: string
  repPrice: number
  fieldPrice: number
  officePrice: number
  minSeats: number
  badge?: string
}

const CALC_PLANS: CalcPlan[] = [
  { key: 'core', name: 'Core', repPrice: 49, fieldPrice: 25, officePrice: 89, minSeats: 3 },
  { key: 'growth', name: 'Growth', repPrice: 65, fieldPrice: 30, officePrice: 105, minSeats: 5, badge: 'Most popular' },
  { key: 'pro', name: 'Pro', repPrice: 85, fieldPrice: 38, officePrice: 135, minSeats: 8 },
]

export function PricingCalculator() {
  return (
    <div class="pricing-calc" data-pricing-calc>
      <div class="pricing-calc-head">
        <span class="eyebrow">Estimate your price</span>
        <h3>What would your team actually pay?</h3>
        <p>Owners and admins are always free. Enter everyone else and see a real monthly number per plan.</p>
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
            Field &amp; View-only
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
      </div>

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
            data-min-seats={p.minSeats}
          >
            {p.badge ? <div class="calc-badge">{p.badge}</div> : <div class="calc-badge-spacer"></div>}
            <div class="calc-plan-name">{p.name}</div>
            <div class="calc-total">
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
          <div class="calc-note">Multi-location roll-up &amp; volume pricing</div>
          <a href="/demo" class="calc-cta">
            Talk to sales →
          </a>
        </div>
      </div>
    </div>
  )
}
