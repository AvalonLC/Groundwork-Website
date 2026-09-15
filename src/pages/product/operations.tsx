import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
import { PMMain, PMTitleRow, PMStats, PMCard, PMTask } from '../../components/ProductMock'

export function OperationsPage() {

  return (
    <Layout
      title="Operations — Groundwork CRM"
      description="Schedule, dispatch, work orders, recurring services, assets, and time tracking — the operational nervous system."
      path="/product/operations"
    >
      <SubpageHero
        eyebrow="Product · Operations"
        title={<>The nervous system for field&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">teams.</em></>}
        lede="Schedule the week. Dispatch the crews. Manage recurring services. Track work orders, assets, maintenance, inventory, tools, and time. Operations in Groundwork is not an afterthought — it is half the system."
        primaryLabel="Book an ops demo"
      />

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Schedule & Dispatch"
            title="The whole week, one screen."
            lede="Groundwork's scheduler shows crews across the week with drag-to-reschedule, capacity conflicts flagged inline, and one-click dispatch to Field Mode. No more calling foremen at 6am to tell them where to go."
          >
            <SplitList
              items={[
                { num: '→', title: 'Calendar + crew view', body: "See every crew's week. Reschedule with a drag." },
                { num: '→', title: 'Recurring services', body: 'Weekly, bi-weekly, monthly, and seasonal services on autopilot.' },
                { num: '→', title: 'Dispatch to Field Mode', body: 'Foreman gets the route on their phone the moment you assign it.' },
                { num: '→', title: 'Capacity conflicts', body: 'Overbook detection, weather delays, and travel time factored in.' },
              ]}
            />
          </SplitContent>
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Dispatch Board" sub="WEEK OF JULY 7" />
              <PMStats
                stats={[
                  { label: 'Scheduled', value: '18' },
                  { label: 'In Progress', value: '3', variant: 'sold' },
                  { label: 'Completed', value: '11' },
                  { label: 'Active Crews', value: '3' },
                ]}
              />
              <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 14px;">
                <div class="pm-card">
                  <div class="pm-card-h">Crews <span class="chip">Today's dispatched jobs</span></div>
                  {[
                    { crew: 'Crew A', label: 'Knesley · Pool Coping', status: '● On site 07:12', color: 'var(--gw-green-500)' },
                    { crew: 'Crew B', label: 'Recurring maint. · 6 stops', status: '● En route', color: 'var(--gw-amber-500)' },
                    { crew: 'Crew C', label: 'Patel · Hardscape', status: '● On site 07:45', color: 'var(--gw-green-500)' },
                  ].map((row, i) => (
                    <div style={`display: flex; justify-content: space-between; padding: 8px 0; font-size: 12px;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                      <span><strong>{row.crew}</strong><br /><span style="color: var(--gw-ink-500); font-size: 11px;">{row.label}</span></span>
                      <span style={`color: ${row.color}; font-weight: 600; font-size: 11px; white-space: nowrap;`}>{row.status}</span>
                    </div>
                  ))}
                </div>
                <div class="pm-card">
                  <div class="pm-card-h">Activity Feed</div>
                  {[
                    { text: 'Crew A checked in · Knesley', time: '07:12' },
                    { text: 'Crew C checked in · Patel', time: '07:45' },
                    { text: 'Crew B en route · Maint. stop 2 of 6', time: '08:10' },
                  ].map((row, i) => (
                    <div style={`padding: 8px 0; font-size: 11.5px; color: var(--gw-ink-700);${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                      {row.text}
                      <div style="font-size: 10px; color: var(--gw-ink-400); margin-top: 2px;">{row.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Work Order #WO-2264" sub="KNESLEY · POOL COPING · CREW A" />
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Scheduled</div>
                  <div style="font-size: 13px; font-weight: 600;">Mon Jul 7 – Tue Jul 8</div>
                </div>
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Crew</div>
                  <div style="font-size: 13px; font-weight: 600;">Crew A · 4 people</div>
                </div>
              </div>
              <PMCard heading="Scope & Checklist" chip="6/9 done">
                <PMTask title="Remove existing coping" done />
                <PMTask title="Prep bond beam" done />
                <PMTask title="Deliver new coping stone" done />
                <PMTask title="Set stones" done />
                <PMTask title="Grout & seal" />
                <PMTask title="Final walkthrough with client" />
              </PMCard>
            </PMMain>
          </MockFrame>
          <SplitContent
            eyebrow="Work orders, assets & time"
            title="Every job has a paper trail."
            lede="Work orders that carry the sales scope, materials list, safety checklist, and time budget into the field. Assets and tools tracked with service intervals. Time captured from the truck."
          >
            <SplitList
              items={[
                { num: '→', title: 'Work Orders', body: 'Scope, materials, checklist, budget — all in one document.' },
                { num: '→', title: 'Recurring Services', body: 'Maintenance contracts that never fall off the schedule.' },
                { num: '→', title: 'Assets & Maintenance', body: 'Equipment tracked with service intervals and cost history.' },
                { num: '→', title: 'Inventory & Tools', body: 'Know what is on which truck. Reorder before you run out.' },
                { num: '→', title: 'Time Tracker', body: 'Clock in / out from the truck. Timesheet review at the office.' },
              ]}
            />
          </SplitContent>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap split">
          <SplitContent
            eyebrow="After Action Reports"
            title="A real end-of-day report — not a text to the office."
            lede="Every crew closes the day with a short, configurable After Action Report before they can clock out. Build your own question set once; the office reviews a clean feed instead of chasing down what actually happened."
          >
            <SplitList
              items={[
                { num: '→', title: 'Required before clock-out', body: "Foremen can't close the day without filing the report." },
                { num: '→', title: 'Configurable question builder', body: 'Yes/No, text, rating, checklist, and dropdown question types.' },
                { num: '→', title: 'Office review queue', body: 'AAR Reviews surfaces every submitted report for the office to check off.' },
                { num: '→', title: 'Rolls up to Field Reports', body: 'Aggregated view across crews, jobs, and dates for pattern-spotting.' },
              ]}
            />
          </SplitContent>
          <MockFrame minHeight={340}>
            <PMMain>
              <PMTitleRow title="AAR Template Builder" sub="END-OF-DAY QUESTION SET" />
              <div style="display: flex; flex-direction: column; gap: 8px;">
                {[
                  { n: 1, q: 'Was the job completed as scoped?', type: 'Yes / No', required: true },
                  { n: 2, q: "Rate the crew's pace today", type: 'Rating', required: true },
                  { n: 3, q: 'Any materials shortages?', type: 'Yes / No', required: false },
                  { n: 4, q: 'Notes for the office', type: 'Text', required: false },
                ].map((r) => (
                  <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--gw-ink-400); font-size: 11px; width: 14px;">{r.n}</span>
                    <span style="flex: 1; font-size: 12px; font-weight: 600; color: var(--gw-ink-900);">{r.q}</span>
                    <span style="background: white; border: 1px solid var(--gw-line); border-radius: 5px; padding: 3px 8px; font-size: 10.5px; color: var(--gw-ink-500);">{r.type} ▾</span>
                    <span style="display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--gw-ink-500); white-space: nowrap;">
                      <span style={`width: 11px; height: 11px; display: inline-block; border-radius: 3px; border: 1.5px solid ${r.required ? 'var(--gw-green-600)' : 'var(--gw-ink-300)'}; background: ${r.required ? 'var(--gw-green-600)' : 'transparent'};`}></span> Required
                    </span>
                    <span style="color: var(--gw-ink-400); font-size: 12px;">⋮⋮</span>
                  </div>
                ))}
              </div>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/my-day', title: 'My Day', desc: "Where crews see today's stops." },
          { href: '/product/mobile', title: 'Field Mode', desc: 'Dispatch flows into rugged mobile view.' },
          { href: '/product/admin', title: 'Admin', desc: 'Approval queues and audit for ops changes.' },
          { href: '/roles/foremen', title: 'For foremen', desc: 'The workspace built for field leaders.' },
        ]}
      />

      <CTABand
        title={<>Load next week's schedule into <em>Groundwork.</em></>}
        description="A specialist will import your crews and jobs and walk through dispatch — live."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
