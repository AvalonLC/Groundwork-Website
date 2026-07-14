import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand } from '../../components/Blocks'

export function SolutionsHubPage() {
  const cards = [
    {
      href: '/solutions/landscaping',
      tag: 'Landscape · Hardscape · Design-build · Maintenance',
      title: 'Landscaping',
      desc: 'Design-build firms and maintenance-heavy operations both run on Groundwork — sales pipeline, recurring services, dispatch, and hardscape scope tracking in one system.',
    },
    {
      href: '/solutions/home-service',
      tag: 'HVAC · Plumbing · Electrical · Handyman',
      title: 'Home service',
      desc: 'Volume matters. Groundwork gives you the pipeline discipline of a sales org and the dispatch power of an ops team — same day, same tool.',
    },
    {
      href: '/solutions/field-service',
      tag: 'Restoration · Roofing · Exteriors · Insurance work',
      title: 'Field service',
      desc: 'Insurance-driven work means multi-party workflows: adjuster, homeowner, sales, PM, and crew — all needing different views of the same job.',
    },
    {
      href: '/solutions/multi-crew-teams',
      tag: 'Multi-role · Multi-location · Franchise · Ops at scale',
      title: 'Multi-crew operational teams',
      desc: "When office managers coordinate reps who feed foremen who lead laborers — Groundwork's role-based structure was designed for exactly this.",
    },
  ]

  return (
    <Layout
      title="Solutions — Groundwork CRM"
      description="Groundwork is built for service businesses: landscape, home service, field service, and multi-crew operations."
      path="/solutions"
    >
      <SubpageHero
        eyebrow="Solutions"
        title={<>Built for real trades. Configured for&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">yours.</em></>}
        lede='Groundwork is not a generic CRM with a "field service" checkbox. It is shaped by how service businesses actually run — and configured to your specific stages, service lines, and workflows during onboarding.'
        secondaryHref="/roles"
        secondaryLabel="See roles"
      />

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            {cards.map((c) => (
              <a
                href={c.href}
                style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 36px 34px; display: block;"
              >
                <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 16px;">
                  {c.tag}
                </div>
                <div style="font-family: var(--font-serif); font-size: 32px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 12px;">
                  {c.title}
                </div>
                <div style="font-size: 15px; color: var(--gw-ink-500); margin-bottom: 24px;">{c.desc}</div>
                <div style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div class="section-head" style="text-align: center; margin: 0 auto 56px; max-width: 760px;">
            <span class="eyebrow" style="justify-content: center;">Why Groundwork</span>
            <h2 style="margin-top: 20px;">Practical software, built for real operators.</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
            {[
              { n: '01', title: 'Configured to your work', body: 'Stages, service lines, checklists, and templates set to your specific business during onboarding — not out of a box.' },
              { n: '02', title: 'Connects office to field', body: 'Sales, dispatch, invoicing, and field execution in one system — so the crew already knows what sales sold.' },
              { n: '03', title: 'Owner-first clarity', body: 'Pipeline value, cash position, ops load — a single glance in the morning tells you where the business is.' },
            ].map((item) => (
              <div>
                <div style="font-family: var(--font-serif); font-size: 48px; color: var(--gw-forest-700); font-weight: 400; line-height: 1; margin-bottom: 16px;">
                  {item.n}
                </div>
                <h4 style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; margin-bottom: 12px;">{item.title}</h4>
                <p style="color: var(--gw-ink-500); font-size: 15px;">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Let us configure Groundwork for <em>your</em> trade — live.</>}
        description="30 minutes with a specialist. Real data. Real workflow. Real outcome."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
