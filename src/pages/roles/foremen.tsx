import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'

export function ForemenPage() {
  const stops = [
    {
      status: 'STOP 1 · IN PROGRESS',
      time: '08:00 – 11:30',
      title: 'Knesley · Pool Coping',
      meta: '6005 Chapman Rd, Lorton VA · Crew A (4)',
      accent: true,
    },
    {
      status: 'STOP 2 · SCHEDULED',
      time: '13:00 – 15:00',
      title: 'McDermott · Front Garden Bed',
      meta: 'Arlington VA · Crew A (2)',
    },
    {
      status: 'STOP 3 · SCHEDULED',
      time: '15:30 – 17:00',
      title: 'Karamsetty · Backyard Tree Install',
      meta: 'Vienna VA · Crew A (4)',
    },
  ]

  return (
    <Layout
      title="For foremen — Groundwork CRM"
      description="Field-first mobile workspace built for foremen who lead crews."
      path="/roles/foremen"
    >
      <SubpageHero
        eyebrow="Role · Foreman"
        title={<>Show up&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">ready.</em> Every job.</>}
        lede="Foremen open Groundwork on their phone in the truck. Today's stops, crew assignments, scope, safety checklists, materials, and a clean way to log time and progress from the field."
        primaryLabel="Book a foreman demo"
        secondaryHref="/roles"
        secondaryLabel="See all roles"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">The truck view</span>
            <h2 style="margin-top: 20px;">Route, scope, crew, log.</h2>
            <p class="lede">
              Field Mode is designed for the phone in the truck. Big touch targets. High contrast. Offline-capable.
              No pipeline. No pricing. Just the day.
            </p>
            <SplitList
              items={[
                { num: '→', title: "Today's route", body: 'Ordered stops with client, address, and job context.' },
                { num: '→', title: 'Scope + files at the property', body: 'Notes from sales, photos, plans, materials list.' },
                { num: '→', title: 'Crew & time tracking', body: "Who's on site, when they clocked in, where they are now." },
                { num: '→', title: 'Safety checklists', body: 'JHA / tailgate meeting checklists per job.' },
                { num: '→', title: 'Sign-off & photos', body: 'Client signature, before/after photos, quality notes.' },
              ]}
            />
          </div>
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 460px; overflow:hidden;">
            <main class="pm-main" style="background: var(--gw-forest-900); color: var(--gw-cream-100);">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px;">
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500;">
                  Field Mode{' '}
                  <span style="font-family: var(--font-sans); font-size: 10.5px; color: #7CC9A3; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; margin-left: 12px;">
                    FOREMAN · JULY 8
                  </span>
                </div>
                <span style="background: var(--gw-green-500); color: white; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                  ● Clocked in · 07:12
                </span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                {stops.map((s) => (
                  <div
                    style={`background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px;${s.accent ? ' border-left: 3px solid var(--gw-green-500);' : ''}`}
                  >
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #93AFA1; margin-bottom: 6px;">
                      <span>{s.status}</span>
                      <span>{s.time}</span>
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: white; margin-bottom: 4px;">{s.title}</div>
                    <div style="font-size: 12px; color: #B7CFC1;">{s.meta}</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/mobile', title: 'Mobile & Field Mode', desc: 'The whole mobile experience.' },
          { href: '/product/operations', title: 'Operations', desc: 'How dispatch flows to Field Mode.' },
          { href: '/roles/laborers', title: 'For the crew', desc: 'The laborer view.' },
          { href: '/roles', title: 'All roles', desc: 'See how the team fits together.' },
        ]}
      />

      <CTABand
        title={<>Field Mode, in your foreman's hand — <em>today.</em></>}
        description="Book a demo — we'll walk your field lead through Field Mode live."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
