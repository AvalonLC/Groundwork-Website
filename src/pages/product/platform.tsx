import { Layout } from '../../components/Layout'
import { CTABand, SectionHead, RelatedCards } from '../../components/Blocks'
import { Button } from '../../components/Button'

export function PlatformPage() {
  const integrations = [
    { name: 'QuickBooks', desc: 'Two-way sync of clients, invoices, payments' },
    { name: 'Google Workspace', desc: 'Calendar, Gmail, contacts, Drive' },
    { name: 'Stripe', desc: 'Payment processing, deposits, ACH' },
    { name: 'Twilio', desc: 'SMS follow-ups, dispatch alerts' },
    { name: 'Zapier', desc: '5,000+ connections via Zapier' },
    { name: 'Slack', desc: 'Real-time alerts into team channels' },
    { name: 'DocuSign', desc: 'Signed proposals and change orders' },
    { name: 'Open API', desc: 'REST + webhooks · build anything' },
  ]

  return (
    <Layout
      title="Platform architecture — Groundwork CRM"
      description="How Groundwork's modules connect: data model, integrations, security."
      path="/product/platform"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Product · Platform</span>
          <h1 style="margin-top: 20px;">
            How the pieces&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">connect.</em>
          </h1>
          <p class="lede">
            Groundwork is one system, not a bundle of apps. Under the hood, everything shares a common data model —
            clients, properties, opportunities, jobs, invoices, and users flow through every module.
          </p>
          <div style="display:flex; gap:12px; margin-top:32px; flex-wrap:wrap;">
            <Button href="/demo" variant="primary" arrow>Book a demo</Button>
            <Button href="/product" variant="secondary">See modules</Button>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <SectionHead
            eyebrow="Data model"
            title="Everything centers on the property."
            lede="A service business is fundamentally about doing work on properties. Groundwork's data model reflects that — the property is the anchor, and clients, opportunities, jobs, and financials all attach to it."
          />
          <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 40px; overflow-x: auto;">
            <svg viewBox="0 0 900 400" style="width: 100%; height: auto; font-family: var(--font-sans);">
              <g>
                <rect x="380" y="170" width="140" height="60" rx="10" fill="var(--gw-forest-800)" />
                <text x="450" y="195" fill="white" font-size="14" font-weight="600" text-anchor="middle">Property</text>
                <text x="450" y="215" fill="#7CC9A3" font-size="11" text-anchor="middle">Address · notes · history</text>
              </g>
              <g>
                <rect x="100" y="80" width="130" height="52" rx="8" fill="var(--gw-cream-100)" stroke="var(--gw-line-strong)" />
                <text x="165" y="102" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">Client</text>
                <text x="165" y="118" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">One → many properties</text>
                <line x1="230" y1="115" x2="380" y2="185" stroke="var(--gw-ink-400)" stroke-width="1.5" />
              </g>
              <g>
                <rect x="670" y="80" width="130" height="52" rx="8" fill="var(--gw-green-050)" stroke="var(--gw-forest-500)" />
                <text x="735" y="102" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">Opportunity</text>
                <text x="735" y="118" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">Pipeline · stages</text>
                <line x1="670" y1="115" x2="520" y2="185" stroke="var(--gw-ink-400)" stroke-width="1.5" />
              </g>
              <g>
                <rect x="670" y="270" width="130" height="52" rx="8" fill="var(--gw-cream-100)" stroke="var(--gw-line-strong)" />
                <text x="735" y="292" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">Job / Work Order</text>
                <text x="735" y="308" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">Scope · crew · time</text>
                <line x1="670" y1="285" x2="520" y2="215" stroke="var(--gw-ink-400)" stroke-width="1.5" />
              </g>
              <g>
                <rect x="100" y="270" width="130" height="52" rx="8" fill="var(--gw-cream-100)" stroke="var(--gw-line-strong)" />
                <text x="165" y="292" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">Estimate</text>
                <text x="165" y="308" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">Line items · pricing</text>
                <line x1="230" y1="285" x2="380" y2="215" stroke="var(--gw-ink-400)" stroke-width="1.5" />
              </g>
              <g>
                <rect x="385" y="330" width="130" height="52" rx="8" fill="var(--gw-cream-100)" stroke="var(--gw-line-strong)" />
                <text x="450" y="352" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">Invoice</text>
                <text x="450" y="368" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">Balance · deposit · paid</text>
                <line x1="450" y1="330" x2="450" y2="230" stroke="var(--gw-ink-400)" stroke-width="1.5" />
              </g>
              <g>
                <rect x="385" y="20" width="130" height="52" rx="8" fill="var(--gw-cream-100)" stroke="var(--gw-line-strong)" />
                <text x="450" y="42" fill="var(--gw-ink-900)" font-size="13" font-weight="600" text-anchor="middle">User · Role</text>
                <text x="450" y="58" fill="var(--gw-ink-500)" font-size="10" text-anchor="middle">Permissions · assignment</text>
                <line x1="450" y1="72" x2="450" y2="170" stroke="var(--gw-ink-400)" stroke-width="1.5" stroke-dasharray="3 3" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div class="section-head" style="max-width: 720px;">
            <span class="eyebrow">Integrations</span>
            <h2>Talks to the tools you already use.</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
            {integrations.map((i) => (
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 10px; padding: 20px;">
                <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 6px;">{i.name}</div>
                <div style="font-size: 12.5px; color: var(--gw-ink-500);">{i.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Explore modules"
        items={[
          { href: '/product/my-day', title: 'My Day', desc: 'Role-based daily dashboards.' },
          { href: '/product/sales', title: 'Sales', desc: 'Pipeline & follow-up rhythm.' },
          { href: '/product/operations', title: 'Operations', desc: 'Schedule, dispatch, work orders.' },
          { href: '/security', title: 'Security', desc: 'How we protect your data.' },
        ]}
      />

      <CTABand
        title={<>See the architecture in <em>action.</em></>}
        description="A specialist will walk through how your data will actually flow through Groundwork."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
