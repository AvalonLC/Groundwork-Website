import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { MockFrame } from '../../components/SplitFeature'

export function LandscapingPage() {
  const records = [
    { title: 'Pool Coping Replacement', tag: 'Budget Qualified', variant: 'qual', meta: '$58,200 · Stage 4/7 · Next FU Jul 8' },
    { title: 'Bi-weekly Maintenance', tag: 'Active', variant: 'rapport', meta: '$340/visit · 24 visits/yr · Crew B' },
    { title: 'Fall Cleanup 2025', tag: 'Complete', variant: 'website', meta: '$1,850 · Paid · Photos attached' },
    { title: 'Backyard Patio Install', tag: 'Complete', variant: 'website', meta: '$24,000 · 2023 · 32 photos on file' },
  ]

  const workflows = [
    { title: 'Design-build sales cycle', body: 'Intake → site walk → design → budget conversation → proposal → deposit → build → invoice.' },
    { title: 'Maintenance route management', body: 'Weekly / bi-weekly routes with skip logic, weather delays, and per-visit notes.' },
    { title: 'Enhancement upsells', body: 'Track which maintenance customers are candidates for a design-build enhancement.' },
    { title: 'Seasonal service programs', body: 'Spring cleanups, mulch installs, aeration, fall cleanups, winterization.' },
    { title: 'Change order discipline', body: 'Foreman flags scope creep. Office drafts change order. Client signs. Nobody loses money.' },
    { title: 'Referral / repeat capture', body: "Every completed job becomes the next lead's testimonial and photo bank." },
  ]

  return (
    <Layout
      title="Landscaping — Groundwork CRM"
      description="Purpose-built for landscape and hardscape companies — from design-build firms to maintenance-heavy operations."
      path="/solutions/landscaping"
    >
      <SubpageHero
        eyebrow="Solutions · Landscaping"
        title={<>From design-build firms to maintenance&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">operations.</em></>}
        lede="Design-build firms with 10-week projects. Maintenance operations with 200 recurring accounts. Companies that do both. Groundwork handles all of it — and configures to your specific service lines during onboarding."
        primaryLabel="Book a landscape demo"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Every property, every service</span>
            <h2 style="margin-top: 20px;">The service history that stays with the land.</h2>
            <p class="lede">
              Landscape is fundamentally property-based. Groundwork's property record carries decades of history —
              every service performed, every plant installed, every photo, every note about soil, drainage, dogs,
              and access. Sales knows what to pitch. Crews know what to expect.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Multi-stage sales pipeline', body: 'Built around discovery + budget qualification.' },
                { num: '→', title: 'Property records', body: 'Soil, drainage, plant history, hardscape, notes, photos.' },
                { num: '→', title: 'Recurring service scheduling', body: 'Maintenance contracts on autopilot.' },
                { num: '→', title: 'Crew dispatch', body: 'Route optimization for maintenance routes.' },
                { num: '→', title: 'Estimate templates', body: 'For hardscape, softscape, and design–build.' },
              ]}
            />
          </div>
          <MockFrame>
            <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; margin-bottom: 14px;">
              Chapman Rd · Property
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              {records.map((r) => (
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <div style="font-size: 13px; font-weight: 600;">{r.title}</div>
                    <span class={`tag tag-${r.variant}`}>{r.tag}</span>
                  </div>
                  <div style="font-size: 11px; color: var(--gw-ink-500);">{r.meta}</div>
                </div>
              ))}
            </div>
          </MockFrame>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <h2 style="margin-bottom: 40px;">Common workflows we've seen from landscape companies.</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {workflows.map((w) => (
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 10px; padding: 20px 22px;">
                <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 8px;">
                  {w.title}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500);">{w.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/solutions', title: 'All solutions', desc: 'See other trades we serve.' },
          { href: '/product/operations', title: 'Operations', desc: 'Scheduling & dispatch for landscape.' },
          { href: '/product/sales', title: 'Sales', desc: 'Pipeline for design-build.' },
          { href: '/customers', title: 'Customers', desc: 'Landscape teams on Groundwork.' },
        ]}
      />

      <CTABand
        title={<>See Groundwork configured for <em>landscape</em> — live.</>}
        description="Bring your service lines. We'll show you the fit."
        primaryLabel="Book a landscape demo"
      />
    </Layout>
  )
}
