// Interactive "what would my team pay?" calculator for the pricing page.
// Purely client-side math (site.js: bindPricingCalculator) — no backend call.
// Model: every plan includes 1 internal user in its base fee; every
// additional internal user is a flat $29/mo, regardless of role or
// permission level. Customer-portal / external users are free and are
// never counted here. The AI add-on axis is untouched and priced
// per-company, layered on as its own line item.

interface CalcPlan {
  key: string
  name: string
  basePrice: number
  includedUsers: number
  perUserPrice: number
  badge?: string
}

interface AiPackage {
  key: string
  label: string
  optionText: string
  price: number | null // null = not a fixed number (Custom / contact sales)
  lineLabel: string // shown in the per-plan AI line item
}

const CALC_PLANS: CalcPlan[] = [
  { key: 'core', name: 'Core', basePrice: 259, includedUsers: 1, perUserPrice: 29 },
  { key: 'growth', name: 'Growth', basePrice: 359, includedUsers: 1, perUserPrice: 29, badge: 'Most popular' },
  { key: 'pro', name: 'Pro', basePrice: 459, includedUsers: 1, perUserPrice: 29 },
]

// Company-wide AI add-on, priced flat per company (never multiplied by user
// count). "Included" is the $0 default that every plan already ships with;
// the rest are optional packages layered on top. Mirrors the dedicated
// Groundwork AI section below the calculator — this axis is unchanged.
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
    <div class="pricing-calc" data-pricing-calc>
      <div class="pricing-calc-head">
        <span class="eyebrow">Estimate your price</span>
        <h3>What would your team actually pay?</h3>
        <p>Every plan includes 1 internal user. Enter your total team size and see a real monthly number per plan.</p>
      </div>

      <div class="pricing-calc-inputs">
        <label class="calc-field calc-field-users">
          <div class="calc-label">
            Internal users
            <span>Everyone who logs in to run the business — owners, admins, reps, field crew, office staff. Any role, same rate.</span>
          </div>
          <div class="calc-stepper">
            <button type="button" class="calc-step" data-calc-step="users" data-dir="-1" aria-label="Decrease">
              −
            </button>
            <input type="number" min="1" max="999" value="6" data-calc-input="users" inputmode="numeric" />
            <button type="button" class="calc-step" data-calc-step="users" data-dir="1" aria-label="Increase">
              +
            </button>
          </div>
        </label>
      </div>

      <div class="calc-volume-note">
        The first user is included in every plan's base fee; each additional internal user is a flat $29/mo, no
        matter the role or permission level — no seat minimums, no volume brackets to negotiate. Customer-portal
        and other external logins are free and never count toward this number.
      </div>

      <label class="calc-field calc-field-ai">
        <div class="calc-label">
          Add company-wide AI
          <span>One allowance for the whole company — not billed per user</span>
        </div>
        <select data-calc-ai-select class="calc-ai-select">
          {AI_PACKAGES.map((pkg) => (
            <option value={pkg.key} data-price={pkg.price === null ? '' : pkg.price} data-line-label={pkg.lineLabel} selected={pkg.key === 'included'}>
              {pkg.optionText}
            </option>
          ))}
        </select>
      </label>

      <div class="pricing-calc-results">
        {CALC_PLANS.map((p) => (
          <div
            class={`calc-result${p.badge ? ' active' : ''}`}
            data-calc-plan={p.key}
            data-base-price={p.basePrice}
            data-included-users={p.includedUsers}
            data-per-user-price={p.perUserPrice}
          >
            {p.badge ? <div class="calc-badge">{p.badge}</div> : <div class="calc-badge-spacer"></div>}
            <div class="calc-plan-name">{p.name}</div>

            <div class="calc-line-items">
              <div class="calc-line">
                <span>Base platform fee</span>
                <span data-calc-base-line>${p.basePrice}/mo</span>
              </div>
              <div class="calc-line">
                <span>Additional users</span>
                <span data-calc-users-line>$0/mo</span>
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
          <div class="calc-note">Need 25+ users or multi-location access? Contact us for custom pricing.</div>
          <a href="/demo" class="calc-cta">
            Talk to sales →
          </a>
        </div>
      </div>
    </div>
  )
}
