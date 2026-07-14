import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { MockFrame } from '../../components/SplitFeature'

export function HomeServicePage() {
  const dispatch = [
    { initials: 'JT', bg: 'var(--gw-forest-800)', label: '08:00 — Ozawa · No hot water', sub: 'Jorge · Plumbing', status: '● On site', color: 'var(--gw-green-500)' },
    { initials: 'SR', bg: 'var(--gw-blue-500)', label: '09:30 — Reyes · AC tune-up', sub: 'Sam · HVAC · Member', status: '● En route', color: 'var(--gw-amber-500)' },
    { initials: 'AN', bg: 'var(--gw-forest-800)', label: '11:00 — Nguyen · Water heater leak', sub: 'Alicia · Plumbing', status: '● En route', color: 'var(--gw-amber-500)' },
    { initials: 'DL', bg: 'var(--gw-clay-500)', label: '13:00 — Lin · Panel upgrade', sub: 'Diego · Electrical', status: '● Scheduled', color: 'var(--gw-ink-500)' },
    { initials: 'JR', bg: 'var(--gw-forest-800)', label: '14:30 — Ramírez · Toilet install', sub: 'Jorge · Plumbing', status: '● Scheduled', color: 'var(--gw-ink-500)' },
    { initials: 'SC', bg: 'var(--gw-blue-500)', label: '15:30 — Chen · AC diagnostic', sub: 'Sam · HVAC', status: '● Scheduled', color: 'var(--gw-ink-500)' },
  ]

  return (
    <Layout
      title="Home service — Groundwork CRM"
      description="HVAC, plumbing, electrical, handyman — Groundwork gives you sales discipline and dispatch power in one system."
      path="/solutions/home-service"
    >
      <SubpageHero
        eyebrow="Solutions · Home service"
        title={<>The pipeline of a sales org. The dispatch of an ops&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">team.</em></>}
        lede="HVAC, plumbing, electrical, handyman. Volume matters. Callbacks matter. Membership retention matters. Groundwork gives you all three — on the same screen, on the same day."
        primaryLabel="Book a home service demo"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Same-day dispatch that actually works</span>
            <h2 style="margin-top: 20px;">Route techs. Track jobs. Send invoices from the truck.</h2>
            <p class="lede">
              Groundwork's dispatch view was designed for the daily churn of home service — same-day emergencies,
              recurring memberships, and the constant re-jiggering of a route when a job runs long.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Same-day dispatch with tech assignment', body: 'Assign, reassign, and reprioritize with drag-to-move.' },
                { num: '→', title: 'Recurring service agreements', body: 'HVAC tune-ups, plumbing inspections, filter swaps.' },
                { num: '→', title: 'Invoicing from the truck', body: 'Send invoice with card payment before the tech leaves.' },
                { num: '→', title: 'Property + equipment history', body: "Every callback opens the previous visit's notes and photos." },
                { num: '→', title: 'Callback tracking', body: 'Catch bad first visits. Retrain or reassign.' },
              ]}
            />
          </div>
          <MockFrame minHeight={500}>
            <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; margin-bottom: 14px;">
              Today's Dispatch
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              {dispatch.map((d) => (
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 10px 14px; display: flex; gap: 12px; align-items: center;">
                  <div style={`width: 30px; height: 30px; border-radius: 50%; background: ${d.bg}; color: white; display: grid; place-items: center; font-size: 11px; font-weight: 600;`}>
                    {d.initials}
                  </div>
                  <div style="flex: 1;">
                    <div style="font-size: 12.5px; font-weight: 600;">{d.label}</div>
                    <div style="font-size: 11px; color: var(--gw-ink-500);">{d.sub}</div>
                  </div>
                  <span style={`color: ${d.color}; font-size: 11px; font-weight: 600;`}>{d.status}</span>
                </div>
              ))}
            </div>
          </MockFrame>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/solutions', title: 'All solutions', desc: 'See other trades we serve.' },
          { href: '/product/operations', title: 'Operations', desc: 'Dispatch built for volume.' },
          { href: '/product/financial', title: 'Financial', desc: 'Invoice from the truck.' },
          { href: '/product/mobile', title: 'Mobile', desc: 'The tech-facing app.' },
        ]}
      />

      <CTABand
        title={<>See same-day dispatch built for <em>your</em> trade.</>}
        description="Bring your call volume. We'll show you the fit."
        primaryLabel="Book a home service demo"
      />
    </Layout>
  )
}
