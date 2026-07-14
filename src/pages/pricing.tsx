import { Layout } from '../components/Layout'
import { SubpageHero, CTABand } from '../components/Blocks'
import { Icon } from '../components/Icon'

export function PricingPage() {
  const tiers = [
    {
      name: 'Field',
      desc: 'Read-only or Foreman access. For laborers and field crews.',
      price: '$19',
      unit: 'per seat / month',
      features: ['Field Mode mobile view', "Today's stops & routes", 'Clock in/out', 'Photos & sign-offs', 'Read-only property records'],
      dark: false,
      badge: undefined as string | undefined,
    },
    {
      name: 'Standard',
      desc: 'Sales reps and estimators. The productive core of the team.',
      price: '$65',
      unit: 'per seat / month',
      features: ['Everything in Field', 'Full pipeline & leads', 'Estimates & proposals', 'Sales resources & scripts', 'Communications & templates', 'AI Assistant'],
      dark: false,
      badge: undefined as string | undefined,
    },
    {
      name: 'Manager',
      desc: 'Office managers and ops leads coordinating across the team.',
      price: '$95',
      unit: 'per seat / month',
      features: ['Everything in Standard', 'Cross-team dashboards', 'Financial workspace', 'Schedule + dispatch', 'Approval queue', 'Template & automation editor'],
      dark: true,
      badge: 'Most popular',
    },
    {
      name: 'Owner',
      desc: 'Full access. No restrictions. Included with any paid workspace.',
      price: 'Included',
      unit: 'unlimited',
      features: ['Everything in Manager', 'Business Pulse', 'Financial Snapshot', 'Operations Snapshot', 'Audit log', 'Access modes & SSO'],
      dark: false,
      badge: undefined as string | undefined,
    },
  ]

  return (
    <Layout
      title="Pricing — Groundwork CRM"
      description="Per-seat pricing with role-based tiers. Field & view-only seats priced fairly."
      path="/pricing"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Pricing</span>
          <h1 style="margin-top: 20px;">Per-seat pricing that respects role-based&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">reality.</em></h1>
          <p class="lede">
            Groundwork is priced per seat, with role-based tiers. Field and view-only seats cost significantly less
            than full sales or admin seats — so you're not paying full price to give your crew access.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
            {tiers.map((t) => (
              <div
                style={`background: ${t.dark ? 'var(--gw-forest-800)' : 'var(--gw-cream-100)'}; color: ${t.dark ? 'var(--gw-cream-100)' : 'var(--gw-ink-900)'}; border: 1px solid ${t.dark ? 'var(--gw-forest-700)' : 'var(--gw-line)'}; border-radius: var(--r-lg); padding: 32px 28px; display: flex; flex-direction: column;`}
              >
                {t.badge ? (
                  <div style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7CC9A3; font-weight: 600; margin-bottom: 8px;">
                    {t.badge}
                  </div>
                ) : (
                  <div style="height: 20px;"></div>
                )}
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500; margin-bottom: 6px;">{t.name}</div>
                <div style={`font-size: 13px; color: ${t.dark ? '#B7CFC1' : 'var(--gw-ink-500)'}; margin-bottom: 20px;`}>{t.desc}</div>
                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 4px;">
                  <span style="font-family: var(--font-serif); font-size: 42px; font-weight: 500; letter-spacing: -0.02em;">{t.price}</span>
                </div>
                <div style={`font-size: 12px; color: ${t.dark ? '#93AFA1' : 'var(--gw-ink-500)'}; margin-bottom: 24px;`}>{t.unit}</div>
                <ul style="list-style: none; padding: 0; margin: 0 0 24px; font-size: 13.5px;">
                  {t.features.map((f) => (
                    <li style="padding: 5px 0; display: flex; gap: 8px; align-items: flex-start;">
                      <span style={`color: ${t.dark ? '#7CC9A3' : 'var(--gw-green-600)'}; flex: none;`}>
                        <Icon name="check" size={14} />
                      </span>{' '}
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/demo"
                  style={`margin-top: auto; display: inline-block; text-align: center; padding: 12px; border-radius: 999px; font-weight: 500; font-size: 14px; ${t.badge ? 'background: var(--gw-green-500); color: white;' : 'background: transparent; color: var(--gw-ink-900); border: 1px solid var(--gw-line-strong);'}`}
                >
                  Request pricing
                </a>
              </div>
            ))}
          </div>

          <div style="margin-top: 60px; padding: 40px; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center;">
            <div>
              <div style="font-family: var(--font-serif); font-size: 30px; font-weight: 500; margin-bottom: 12px;">
                Implementation is included.
              </div>
              <p style="color: var(--gw-ink-500); font-size: 15px; margin: 0;">
                Every workspace gets a dedicated implementation lead for the first 30 days — data migration,
                configuration, role-based training, and go-live support. No extra bill. No 90-day rollout.
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
