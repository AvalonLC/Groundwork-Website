import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { PM, PMMain, PMTitleRow, PMStats, PMCard, PMTask } from '../../components/ProductMock'

export function OwnersPage() {
  const stageBars = [
    { label: 'Intake', height: 40, color: 'var(--gw-forest-600)' },
    { label: 'Agreement', height: 72, color: 'var(--gw-forest-600)' },
    { label: 'Discovery', height: 55, color: 'var(--gw-forest-600)' },
    { label: 'Budget', height: 88, color: 'var(--gw-green-500)' },
    { label: 'Decision', height: 45, color: 'var(--gw-forest-600)' },
    { label: 'Present', height: 30, color: 'var(--gw-forest-600)' },
    { label: 'Won', height: 22, color: 'var(--gw-clay-500)' },
  ]

  return (
    <Layout
      title="For owners — Groundwork CRM"
      description="Clarity, not spreadsheets. Owners get the state of the business in 30 seconds."
      path="/roles/owners"
    >
      <SubpageHero
        eyebrow="Role · Owner"
        title={<>Clarity, not&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">spreadsheets.</em></>}
        lede="Owners open Groundwork and see the state of the business in thirty seconds — pipeline, cash, jobs, team activity. No more piecing it together from three tools and a phone call."
        primaryLabel="Book an owner demo"
        secondaryHref="/roles"
        secondaryLabel="See all roles"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Your morning</span>
            <h2 style="margin-top: 20px;">What owners see when they log in.</h2>
            <p class="lede">
              Three dashboards. Business Pulse for pipeline and sales. Financial Snapshot for cash. Operations
              Snapshot for crew load. That's the morning.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Business Pulse', body: 'Pipeline value, close rate, sold MTD, open proposals, at-risk deals.' },
                { num: '→', title: 'Financial Snapshot', body: 'Outstanding, deposits, cash in, cash out, past-due aging.' },
                { num: '→', title: 'Operations Snapshot', body: 'Crews out, jobs scheduled, work orders in progress, capacity.' },
                { num: '→', title: 'Team View', body: "Every rep's pipeline, every crew's status — filterable." },
                { num: '→', title: 'Full access, no restrictions', body: 'Owners are Owners. Nothing is hidden.' },
              ]}
            />
          </div>
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="Business Pulse" sub="OWNER · Q3 2026" />
              <PMStats
                stats={[
                  { label: 'Pipeline Value', value: '$482k' },
                  { label: 'Close Rate', value: '38%' },
                  { label: 'Sold MTD', value: '$186k', variant: 'sold' },
                  { label: 'At Risk', value: '4', variant: 'overdue' },
                ]}
              />
              <PMCard heading="Pipeline by Stage">
                <div style="display: flex; align-items: flex-end; gap: 14px; height: 120px; padding: 12px 0;">
                  {stageBars.map((s) => (
                    <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                      <div style={`width: 100%; height: ${s.height}%; background: ${s.color}; border-radius: 4px 4px 0 0;`}></div>
                      <span style="font-size: 10px; color: var(--gw-ink-500);">{s.label}</span>
                    </div>
                  ))}
                </div>
              </PMCard>
            </PMMain>
          </PM>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="Financial Snapshot" sub="OWNER · JULY" />
              <PMStats
                stats={[
                  { label: 'Outstanding', value: '$48.2k' },
                  { label: 'Deposits Held', value: '$24.9k', variant: 'sold' },
                  { label: 'Cash In MTD', value: '$142k' },
                  { label: 'Past Due 30+', value: '$8.1k', variant: 'overdue' },
                ]}
              />
              <PMCard heading="At-risk deals">
                <PMTask title="Nicole Knesley · $58k · No contact 7 days" overdue />
                <PMTask title="Sydney Lampard · $18k · Missed follow-up" overdue />
                <PMTask title="M. Fernández · $46k · Stalled at Presentation" overdue />
                <PMTask title="D. Patel change order · Awaiting approval" />
              </PMCard>
            </PMMain>
          </PM>
          <div class="split-content">
            <span class="eyebrow">The questions Groundwork answers for you</span>
            <h2 style="margin-top: 20px;">The ones you used to have to ask three people.</h2>
            <p class="lede">
              Groundwork exists to shorten the distance between "I want to know" and "I know." Every screen is
              designed around a question an owner might reasonably ask before their first coffee.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Will we hit the month?', body: 'Business Pulse shows sold vs. goal in real time.' },
                { num: '→', title: "Who's behind?", body: 'Overdue follow-ups per rep. At-risk deals. Reason codes.' },
                { num: '→', title: "Where's the cash?", body: 'Outstanding by client. Deposits held. Aging.' },
                { num: '→', title: "Who's on site right now?", body: 'Ops Snapshot with crew live status.' },
                { num: '→', title: 'What just changed?', body: 'Recently Updated feed — deals, notes, sign-offs.' },
              ]}
            />
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/my-day', title: 'My Day', desc: 'How the daily view works.' },
          { href: '/product/financial', title: 'Financial module', desc: 'The cash view in detail.' },
          { href: '/product/admin', title: 'Admin & roles', desc: 'How access is configured.' },
          { href: '/features', title: 'All features', desc: 'The full capability list.' },
        ]}
      />

      <CTABand
        title={<>See your business through the owner's&nbsp;lens.</>}
        description="A specialist will load your real numbers and walk through the three dashboards."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
