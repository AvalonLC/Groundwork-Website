import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { PM, PMMain, PMTitleRow, PMCard, PMTask } from '../../components/ProductMock'

export function OfficeManagersPage() {
  const tasks = [
    { title: 'Nicole Knesley · Budget Qualified', rep: 'Tyler', overdue: '2d overdue' },
    { title: 'Sydney Lampard · Discovery', rep: 'Marcus', overdue: '2d overdue' },
    { title: 'M. Fernández · Presentation', rep: 'Marcus', overdue: '4d overdue' },
    { title: 'Theresa McDermott · Agreement', rep: 'Tyler', done: true },
    { title: 'Vijay Dhulipala · Discovery Prep', rep: 'Angela' },
    { title: 'Julie Grumley · Send Proposal', rep: 'Tyler' },
    { title: 'Pardha Karamsetty · Email', rep: 'Marcus' },
  ]

  return (
    <Layout
      title="For office managers — Groundwork CRM"
      description="The lateral view over sales, ops, and financials that office managers need to keep the business running."
      path="/roles/office-managers"
    >
      <SubpageHero
        eyebrow="Role · Office Manager"
        title={<>Every follow-up. Every file. Every&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">deposit.</em></>}
        lede="Office managers keep the machine running. Groundwork gives them a full lateral view of every deal, every job, every invoice — plus the tools to nudge sales, chase payments, and clean up loose ends."
        primaryLabel="Book an office demo"
        secondaryHref="/roles"
        secondaryLabel="See all roles"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">The lateral view</span>
            <h2 style="margin-top: 20px;">See what every rep, every crew, every client is doing.</h2>
            <p class="lede">
              Office managers can see everything except owner-only financial detail (configurable). That means they
              can jump into any deal, coordinate any handoff, and unstick anything that's stuck.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Cross-team pipeline', body: 'Every lead, every rep, every stage — filterable.' },
                { num: '→', title: 'Follow-up queue', body: 'All overdue follow-ups across the team. Nudge with one click.' },
                { num: '→', title: 'Invoice + payment queue', body: 'What to send, what to chase, what came in today.' },
                { num: '→', title: 'Templates & automations', body: 'The library of reusable emails, forms, and drip campaigns.' },
                { num: '→', title: 'Approval queue', body: 'Estimates, discounts, change orders — approve or deny.' },
                { num: '→', title: 'Audit log', body: 'Who did what, when, from where.' },
              ]}
            />
          </div>
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="All Follow-Ups" sub="OFFICE · 6 REPS · THIS WEEK" />
              <PMCard heading="This Week" chip="28 total · 5 overdue">
                {tasks.map((t) => (
                  <PMTask
                    title={t.title}
                    overdue={!!t.overdue}
                    done={t.done}
                    tags={[
                      { label: t.rep, variant: 'name' },
                      ...(t.overdue ? [{ label: t.overdue, variant: 'overdue' }] : []),
                    ]}
                  />
                ))}
              </PMCard>
            </PMMain>
          </PM>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/my-day', title: 'My Day', desc: 'The daily starting view.' },
          { href: '/product/financial', title: 'Financial', desc: 'The invoicing workspace.' },
          { href: '/product/admin', title: 'Admin', desc: 'Templates, workflow, approval.' },
          { href: '/roles', title: 'All roles', desc: 'See how the team fits together.' },
        ]}
      />

      <CTABand
        title={<>Give your office team the tool they actually&nbsp;need.</>}
        description="Book a demo — we'll show you the cross-team lateral view."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
