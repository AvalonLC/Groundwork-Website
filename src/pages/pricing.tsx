import { Layout } from '../components/Layout'
import { CTABand, FAQItem } from '../components/Blocks'
import { Icon } from '../components/Icon'
import { PricingCalculator } from '../components/PricingCalculator'

export function PricingPage() {
  const plans = [
    {
      name: 'Core',
      tagline: 'One crew, one office. Everything you need to stop running the business out of a spreadsheet.',
      startingAt: '$49',
      seats: [
        { label: 'Rep / Estimator', price: '$49/mo', primary: true },
        { label: 'Field & View-only', price: '$15/mo' },
        { label: 'Office Manager', price: '$79/mo' },
      ],
      minSeats: '3 seat minimum',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Request pricing',
      features: [
        'Unlimited free Owner/Admin seats',
        'Pipeline, Leads, Clients & Properties',
        'Estimates & proposals',
        'Communications & templates',
        'Schedule Board & Dispatch',
        'Work Orders & Time Tracker',
        'Invoices & Payments',
        'Field Mode (mobile)',
      ],
    },
    {
      name: 'Growth',
      tagline: 'Multi-crew operations that need real reporting, not gut feel.',
      startingAt: '$65',
      seats: [
        { label: 'Rep / Estimator', price: '$65/mo', primary: true },
        { label: 'Field & View-only', price: '$19/mo' },
        { label: 'Office Manager', price: '$95/mo' },
      ],
      minSeats: '5 seat minimum',
      dark: true,
      badge: 'Most popular',
      cta: 'Request pricing',
      features: [
        'Everything in Core',
        'Business Pulse, Financial Snapshot & Operations Snapshot',
        'Recurring services & asset / maintenance tracking',
        'Deposits & statements',
        'Approval queue',
        'Academy — role-based training',
        'AI Assistant',
      ],
    },
    {
      name: 'Pro',
      tagline: 'Established operators who need automation, audit trails, and a client-facing portal.',
      startingAt: '$85',
      seats: [
        { label: 'Rep / Estimator', price: '$85/mo', primary: true },
        { label: 'Field & View-only', price: '$25/mo' },
        { label: 'Office Manager', price: '$120/mo' },
      ],
      minSeats: '8 seat minimum',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Request pricing',
      features: [
        'Everything in Growth',
        'Automation Center & workflow builder',
        'Audit log',
        'Client portal',
        'System config & custom templates',
        'SSO / SAML',
        'API access',
        'Dedicated success manager',
      ],
    },
    {
      name: 'Enterprise',
      tagline: 'Multi-location groups and franchises that need roll-up reporting and a real contract.',
      startingAt: 'Custom',
      seats: [] as { label: string; price: string; primary?: boolean }[],
      minSeats: 'Built around your locations',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Talk to sales',
      features: [
        'Everything in Pro',
        'Multi-location roll-up reporting',
        'Volume seat pricing across locations',
        'Custom contract & SLA',
        'Dedicated implementation architect',
        'Custom integrations',
      ],
    },
  ]

  return (
    <Layout
      title="Pricing — Groundwork CRM"
      description="Plans control what your company can do. Seats control who can do it. Role-based per-seat pricing inside every plan."
      path="/pricing"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Pricing</span>
          <h1 style="margin-top: 20px;">Plans for what your company&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">can do.</em> Seats for who does&nbsp;it.</h1>
          <p class="lede">
            Groundwork is priced two ways at once, on purpose. A <strong>plan</strong> sets which workspaces your whole
            company can use — reporting, automation, the client portal. A <strong>seat</strong> is priced by role, so a
            foreman's login doesn't cost what an estimator's does. You don't pay full price to give your crew access,
            and you don't buy company-wide features you don't need yet.
          </p>
          <div class="pricing-trust-row">
            <span>
              <Icon name="check-circle" size={15} /> No setup fee, ever
            </span>
            <span>
              <Icon name="check-circle" size={15} /> Unlimited free Owner/Admin seats
            </span>
            <span>
              <Icon name="check-circle" size={15} /> Cancel anytime, no lock-in contract
            </span>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 24px;">
        <div class="wrap">
          <div class="pricing-grid">
            {plans.map((p) => (
              <div class={`pricing-card${p.dark ? ' dark' : ''}`}>
                {p.badge ? <div class="pricing-badge">{p.badge}</div> : <div class="pricing-badge-spacer"></div>}
                <div class="pricing-name">{p.name}</div>
                <div class="pricing-tagline">{p.tagline}</div>

                <div class="pricing-startingat">
                  {p.startingAt === 'Custom' ? (
                    <span class="pricing-startingat-num">Custom</span>
                  ) : (
                    <>
                      <span class="pricing-startingat-label">Starting at</span>
                      <span class="pricing-startingat-num">{p.startingAt}</span>
                      <span class="pricing-startingat-suffix">/seat/mo</span>
                    </>
                  )}
                </div>
                <div class="pricing-minseats">{p.minSeats}</div>

                {p.seats.length > 0 && (
                  <div class="pricing-seat-table">
                    <div class="pricing-seat-table-head">Seat pricing by role</div>
                    {p.seats.map((s) => (
                      <div class={`pricing-seat-row${s.primary ? ' primary' : ''}`}>
                        <span>{s.label}</span>
                        <span>{s.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul class="pricing-features">
                  {p.features.map((f) => (
                    <li>
                      <span class="pricing-feature-check">
                        <Icon name="check" size={14} />
                      </span>{' '}
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/demo" class={`pricing-cta${p.badge ? ' primary' : ''}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <PricingCalculator />

          <div class="pricing-explainer">
            <div class="pricing-explainer-title">
              Why plans <em style="font-style: italic;">and</em> seats?
            </div>
            <p>
              Most CRMs make you pick one: charge everyone the same per-user fee no matter what they do all day, or
              sell you a single company-wide "membership" that ignores how few of your logins actually need the
              expensive stuff. We do both. Your <strong>plan</strong> (Core, Growth, Pro, Enterprise) unlocks the
              workspaces your company operates with — reporting, automation, client portal. Your <strong>seats</strong>{' '}
              are priced by what that person actually needs to touch — a laborer clocking in from the truck costs a
              fraction of an estimator building proposals. Add crew without upgrading your plan. Upgrade your plan
              without paying more for seats you already have.
            </p>
          </div>

          <div class="pricing-faq">
            <div class="pricing-faq-head">Pricing questions</div>
            <div class="faq">
              <FAQItem question="Can I mix seat types on the same plan?">
                Yes — every plan supports any combination of Rep/Estimator, Field & View-only, and Office Manager
                seats. Most teams run a small number of Rep seats alongside a larger pool of Field seats for the crew.
              </FAQItem>
              <FAQItem question="What happens if my crew size changes mid-month?">
                Add or remove seats anytime — you're billed for what you actually have active, prorated to the day.
                There's no re-signing a contract to add a laborer for a busy season.
              </FAQItem>
              <FAQItem question="Is there a contract or lock-in?">
                No lock-in contract and no cancellation fee. Plans are billed monthly and you can cancel anytime.
                Annual billing is available at a discount if you'd prefer to lock in a rate.
              </FAQItem>
              <FAQItem question="Do Owner and Admin seats really cost nothing?">
                Correct — Owner/Admin seats are free and unlimited on every plan, including Core. You only pay for
                seats that do estimating, field, or office-manager work.
              </FAQItem>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 40px; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center;">
            <div>
              <div style="font-family: var(--font-serif); font-size: 30px; font-weight: 500; margin-bottom: 12px;">
                Implementation is included. On every plan.
              </div>
              <p style="color: var(--gw-ink-500); font-size: 15px; margin: 0;">
                Every workspace — Core through Enterprise — gets a dedicated implementation lead for the first 30
                days: data migration, configuration, role-based training, and go-live support. No onboarding fee,
                ever. No 90-day rollout.
              </p>
            </div>
            <a href="/demo" class="btn btn-primary" style="justify-content: center;">
              Book a demo <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <CTABand
        title={<>Get pricing tailored to your team&nbsp;size.</>}
        description="Send us your team makeup — we'll build a real quote in the demo call."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
