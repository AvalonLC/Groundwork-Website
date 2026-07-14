import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
import { PMCard, PMMain, PMStats, PMTask, PMTitleRow, PMSectionLabel } from '../../components/ProductMock'

export function MyDayPage() {
  return (
    <Layout
      title="My Day — Groundwork CRM"
      description="The role-based daily dashboard every Groundwork user opens first."
      path="/product/my-day"
    >
      <SubpageHero
        eyebrow="Product · My Day"
        title={<>The first thing your team opens every&nbsp;morning.</>}
        lede="My Day is a personalized start-of-day view for every user in Groundwork. Open, overdue, upcoming, and a daily checklist — no reports to run, no dashboards to build. Tuned to your role, your work, your day."
        secondaryHref="/product"
        secondaryLabel="See other modules"
      />

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="The ritual"
            title="A structured start to every workday."
            lede="Reps do not have to remember what to do first. Owners do not have to hunt down status. Foremen do not have to text the office for direction. My Day builds a small, opinionated ritual around the queue that actually matters today."
          >
            <SplitList
              items={[
                { num: '→', title: 'Open · Proposals · Overdue · Sold', body: 'Four stats at the top. Everyone knows what "good" looks like at 8am.' },
                { num: '→', title: 'My Tasks, ranked by urgency', body: 'Overdue rises. Today shows next. Upcoming stays quiet.' },
                { num: '→', title: 'Daily Sales Start-Up checklist', body: 'An opinionated ritual — review pipeline, prioritize top three, chase overdue follow-ups, log activity.' },
                { num: '→', title: 'Recently Updated', body: 'See what changed while you were out — deals, notes, sign-offs.' },
              ]}
            />
          </SplitContent>
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Today" sub="TYLER · TUESDAY, JULY 7" />
              <PMStats
                stats={[
                  { label: 'Open', value: '6' },
                  { label: 'Proposals', value: '4' },
                  { label: 'Overdue', value: '2', variant: 'overdue' },
                  { label: 'Sold', value: '3', variant: 'sold' },
                ]}
              />
              <PMCard heading="My Tasks" chip="2 overdue">
                <PMSectionLabel label="Overdue (2)" />
                <PMTask title="Follow up with Nicole Knesley" overdue tags={[{ label: 'Follow-Up', variant: 'follow' }, { label: 'Jul 6', variant: 'overdue' }]} />
                <PMTask title="Follow up with Sydney Lampard" overdue tags={[{ label: 'Follow-Up', variant: 'follow' }, { label: 'Jul 6', variant: 'overdue' }]} />
                <PMSectionLabel label="Upcoming" upcoming />
                <PMTask title="Theresa McDermott follow-up" done tags={[{ label: 'Tyler', variant: 'name' }]} />
                <PMTask title="Post Site Visit Email" tags={[{ label: 'Email', variant: 'email' }]} />
                <PMTask title="Vijay Dhulipala discovery" />
              </PMCard>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div class="section-head" style="text-align: center; margin: 0 auto 56px; max-width: 760px;">
            <span class="eyebrow" style="justify-content: center;">One dashboard, five lenses</span>
            <h2 style="margin-top: 20px;">Every role gets their own My Day.</h2>
            <p class="lede" style="margin: 20px auto 0;">
              The underlying data is the same. The lens is not. Owners see cash and pipeline. Reps see queues.
              Foremen see routes. Crews see stops.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
            {[
              { href: '/roles/owners', title: 'Owner', desc: 'Business Pulse: pipeline value, cash, ops load.' },
              { href: '/roles/office-managers', title: 'Office manager', desc: 'Cross-team follow-ups + invoicing queue.' },
              { href: '/roles/sales-reps', title: 'Sales rep', desc: 'Queue-driven view with Daily Sales Start-Up.' },
              { href: '/roles/foremen', title: 'Foreman', desc: 'Field Mode: route, scope, clock, sign-off.' },
              { href: '/roles/laborers', title: 'Laborer', desc: 'Read-only stops for today. Nothing else.' },
            ].map((r) => (
              <a href={r.href} style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 20px; display: block;">
                <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 6px;">{r.title}</div>
                <div style="font-size: 13px; color: var(--gw-ink-500);">{r.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Explore related modules"
        items={[
          { href: '/product/sales', title: 'Sales', desc: 'Pipeline, leads, follow-ups, estimates.' },
          { href: '/product/operations', title: 'Operations', desc: 'Schedule, dispatch, work orders, time.' },
          { href: '/product/admin', title: 'Admin', desc: 'Roles, permissions, workflow, audit.' },
          { href: '/features', title: 'All features', desc: 'The full capability list.' },
        ]}
      />

      <CTABand
        title={<>See My Day tuned to <em>your</em> role.</>}
        description="Owner, office, sales, foreman, or crew — we will show you the exact view your team gets."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
