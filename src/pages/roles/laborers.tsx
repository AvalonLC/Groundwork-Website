import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { PM, PMMain, PMTitleRow, PMCard } from '../../components/ProductMock'

export function LaborersPage() {
  const assignments = [
    {
      n: '1',
      title: 'Knesley · Pool Coping',
      meta: 'Lorton VA · Crew A · Foreman: Miguel',
      status: 'On site',
      active: true,
    },
    {
      n: '2',
      title: 'McDermott · Front Garden',
      meta: 'Arlington VA · 13:00',
      status: 'Scheduled',
    },
    {
      n: '3',
      title: 'Karamsetty · Tree Install',
      meta: 'Vienna VA · 15:30',
      status: 'Scheduled',
    },
  ]

  return (
    <Layout
      title="For laborers — Groundwork CRM"
      description="A distraction-free view of today's work — no pipeline, no pricing, no admin."
      path="/roles/laborers"
    >
      <SubpageHero
        eyebrow="Role · Laborer"
        title={<>Clean handoff. Cleaner&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">day.</em></>}
        lede="Field crews do not need a CRM. They need to know where they're going, who they're with, what the job is, and when they're done. Groundwork gives them a distraction-free view built for that."
        secondaryHref="/roles"
        secondaryLabel="See all roles"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">What crews see</span>
            <h2 style="margin-top: 20px;">Just today. Nothing else.</h2>
            <p class="lede">
              Laborers get a read-only view of today's stops, their crew, their foreman, and a simple clock in /
              clock out flow. No pricing. No pipeline. No possible way to break anything.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Assigned stops only', body: 'No pipeline. No pricing. Just your work today.' },
                { num: '→', title: 'Clock in from the truck', body: "Time tracker aware of the job you're on." },
                { num: '→', title: 'Photos & sign-offs', body: 'Log before / after photos, mark the job done, move on.' },
                { num: '→', title: 'Read-only, always safe', body: "You can't accidentally break anything." },
                { num: '→', title: '15-minute training', body: 'Full crew onboarded in a single tailgate meeting.' },
              ]}
            />
          </div>
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="My Work" sub="LABORER · DIEGO" />
              <PMCard heading="Today's Assignments" chip="3 stops">
                {assignments.map((a) => (
                  <div style="display: flex; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--gw-cream-300);">
                    <div
                      style={`width: 40px; height: 40px; border-radius: 8px; background: ${a.active ? 'var(--gw-green-050)' : 'var(--gw-cream-200)'}; color: ${a.active ? 'var(--gw-forest-700)' : 'var(--gw-ink-500)'}; display: grid; place-items: center; font-family: var(--font-serif); font-size: 14px; font-weight: 600;`}
                    >
                      {a.n}
                    </div>
                    <div style="flex:1;">
                      <div style="font-weight: 600; font-size: 14px;">{a.title}</div>
                      <div style="font-size: 12px; color: var(--gw-ink-500);">{a.meta}</div>
                    </div>
                    <span
                      style={`background: ${a.active ? 'var(--gw-green-050)' : 'var(--gw-cream-200)'}; color: ${a.active ? 'var(--gw-green-600)' : 'var(--gw-ink-500)'}; padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 500;`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </PMCard>
            </PMMain>
          </PM>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/mobile', title: 'Mobile app', desc: 'The whole mobile experience.' },
          { href: '/roles/foremen', title: 'For foremen', desc: 'The field-lead view.' },
          { href: '/roles', title: 'All roles', desc: 'See how the team fits together.' },
          { href: '/product/admin', title: 'Permissions', desc: 'How view-only access works.' },
        ]}
      />

      <CTABand
        title={<>Put the crew on the same page — <em>literally.</em></>}
        description="Book a demo — we'll show you the laborer view."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
