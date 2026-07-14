import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { PM, PMMain, PMTitleRow, PMStats, PMCard, PMTask } from '../../components/ProductMock'

export function SalesRepsPage() {
  const checklist = [
    'Review all open opportunities and follow-up dates',
    'Identify the top 3 priorities for today',
    'Check for any overdue follow-ups (7+ days no contact)',
    'Confirm all scheduled calls, site walks, meetings',
    'Review any outstanding proposals awaiting decision',
    'Prepare for any discovery calls scheduled today',
    'Update the pipeline after any calls or site visits',
    'Log all activity, notes, and next steps in the system',
  ]

  return (
    <Layout
      title="For sales reps — Groundwork CRM"
      description="Work your pipeline, not your inbox. The workspace built for reps."
      path="/roles/sales-reps"
    >
      <SubpageHero
        eyebrow="Role · Sales Rep"
        title={<>Work your pipeline. Not your&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">inbox.</em></>}
        lede="Sales reps get a daily sales start-up, their leads sorted by stage, a follow-up rhythm they can't miss, and every script or checklist they need mid-call."
        primaryLabel="Book a sales-rep demo"
        secondaryHref="/roles"
        secondaryLabel="See all roles"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">A rep's day, structured</span>
            <h2 style="margin-top: 20px;">The ritual reps actually follow.</h2>
            <p class="lede">
              Every morning: open My Day, tick through the Daily Sales Start-Up, work overdue, work today, log
              activity. Every deal you touch nudges the pipeline forward.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'My Day, ranked', body: 'Overdue, today, upcoming — a queue built for the phone.' },
                { num: '→', title: 'Discovery + budget scripts', body: "Sales resources attached to the stage you're in." },
                { num: '→', title: 'Objection handling & pricing tools', body: 'Answers in hand before the call gets awkward.' },
                { num: '→', title: 'Estimates & proposals', body: 'Send from the lead. Track opens. Close the loop.' },
                { num: '→', title: 'AI Assistant', body: 'Draft a follow-up. Summarize a history. Suggest a next step.' },
              ]}
            />
          </div>
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="My Day" sub="SALES REP · MARCUS" />
              <PMStats
                stats={[
                  { label: 'Open', value: '21' },
                  { label: 'Proposals', value: '4' },
                  { label: 'Overdue', value: '3', variant: 'overdue' },
                  { label: 'Sold WTD', value: '$42k', variant: 'sold' },
                ]}
              />
              <PMCard heading="Daily Sales Start-Up" chip="0/8 · 0% done">
                {checklist.map((title) => (
                  <PMTask title={title} />
                ))}
              </PMCard>
            </PMMain>
          </PM>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/my-day', title: 'My Day', desc: 'The daily rep dashboard.' },
          { href: '/product/sales', title: 'Sales module', desc: 'Pipeline, leads, follow-ups.' },
          { href: '/features', title: 'All features', desc: 'The full capability list.' },
          { href: '/roles', title: 'All roles', desc: 'See how the team fits together.' },
        ]}
      />

      <CTABand
        title={<>Give your reps a queue they can actually&nbsp;work.</>}
        description="Book a demo — we'll load your open deals and walk through a rep's day."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
