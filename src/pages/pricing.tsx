import { Layout } from '../components/Layout'
import { CTABand } from '../components/Blocks'
import { Icon } from '../components/Icon'

export function PricingPage() {
  const plans = [
    {
      name: 'Core',
      tagline: 'One crew, one office. Everything you need to stop running the business out of a spreadsheet.',
      seatPrice: '$49',
      seatLabel: 'per Rep / Estimator seat / month',
      subRoles: [
        { label: 'Field & View-only seats', price: '$15/mo' },
        { label: 'Office Manager seats', price: '$79/mo' },
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
      seatPrice: '$65',
      seatLabel: 'per Rep / Estimator seat / month',
      subRoles: [
        { label: 'Field & View-only seats', price: '$19/mo' },
        { label: 'Office Manager seats', price: '$95/mo' },
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
      seatPrice: '$85',
      seatLabel: 'per Rep / Estimator seat / month',
      subRoles: [
        { label: 'Field & View-only seats', price: '$25/mo' },
        { label: 'Office Manager seats', price: '$120/mo' },
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
      seatPrice: 'Custom',
      seatLabel: 'volume seat pricing',
      subRoles: [] as { label: string; price: string }[],
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
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
            {plans.map((p) => (
              <div
                style={`background: ${p.dark ? 'var(--gw-forest-800)' : 'var(--gw-cream-100)'}; color: ${p.dark ? 'var(--gw-cream-100)' : 'var(--gw-ink-900)'}; border: 1px solid ${p.dark ? 'var(--gw-forest-700)' : 'var(--gw-line)'}; border-radius: var(--r-lg); padding: 32px 28px; display: flex; flex-direction: column;`}
              >
                {p.badge ? (
                  <div style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7CC9A3; font-weight: 600; margin-bottom: 8px;">
                    {p.badge}
                  </div>
                ) : (
                  <div style="height: 20px;"></div>
                )}
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500; margin-bottom: 6px;">{p.name}</div>
                <div style={`font-size: 13px; color: ${p.dark ? '#B7CFC1' : 'var(--gw-ink-500)'}; margin-bottom: 20px; min-height: 36px;`}>
                  {p.tagline}
                </div>
                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px;">
                  <span style="font-family: var(--font-serif); font-size: 42px; font-weight: 500; letter-spacing: -0.02em;">{p.seatPrice}</span>
                </div>
                <div style={`font-size: 12px; color: ${p.dark ? '#93AFA1' : 'var(--gw-ink-500)'}; margin-bottom: 4px;`}>{p.seatLabel}</div>
                <div style={`font-size: 11.5px; color: ${p.dark ? '#7CC9A3' : 'var(--gw-forest-700)'}; margin-bottom: 16px; font-weight: 500;`}>
                  {p.minSeats}
                </div>

                {p.subRoles.length > 0 && (
                  <div
                    style={`font-size: 12px; margin-bottom: 20px; border-top: 1px solid ${p.dark ? 'var(--gw-forest-700)' : 'var(--gw-line)'}; padding-top: 14px;`}
                  >
                    {p.subRoles.map((r) => (
                      <div style="display: flex; justify-content: space-between; padding: 3px 0; color: inherit; opacity: 0.85;">
                        <span>{r.label}</span>
                        <span style="font-weight: 500;">{r.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13.5px;">
                  {p.features.map((f) => (
                    <li style="padding: 5px 0; display: flex; gap: 8px; align-items: flex-start;">
                      <span style={`color: ${p.dark ? '#7CC9A3' : 'var(--gw-green-600)'}; flex: none;`}>
                        <Icon name="check" size={14} />
                      </span>{' '}
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/demo"
                  style={`margin-top: auto; display: inline-block; text-align: center; padding: 12px; border-radius: 999px; font-weight: 500; font-size: 14px; ${p.badge ? 'background: var(--gw-green-500); color: white;' : 'background: transparent; color: var(--gw-ink-900); border: 1px solid var(--gw-line-strong);'}`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <div style="margin-top: 40px; padding: 32px; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg);">
            <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; margin-bottom: 10px;">
              Why plans <em style="font-style: italic;">and</em> seats?
            </div>
            <p style="color: var(--gw-ink-500); font-size: 14.5px; margin: 0; max-width: 780px;">
              Most CRMs make you pick one: charge everyone the same per-user fee no matter what they do all day, or
              sell you a single company-wide "membership" that ignores how few of your logins actually need the
              expensive stuff. We do both. Your <strong>plan</strong> (Core, Growth, Pro, Enterprise) unlocks the
              workspaces your company operates with — reporting, automation, client portal. Your <strong>seats</strong>{' '}
              are priced by what that person actually needs to touch — a laborer clocking in from the truck costs a
              fraction of an estimator building proposals. Add crew without upgrading your plan. Upgrade your plan
              without paying more for seats you already have.
            </p>
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
