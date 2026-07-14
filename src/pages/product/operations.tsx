import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
import { PMMain, PMTitleRow, PMCard, PMTask } from '../../components/ProductMock'

export function OperationsPage() {
  const days = ['MON 7', 'TUE 8', 'WED 9', 'THU 10', 'FRI 11']
  const crews = [
    { name: 'Crew A', jobs: [
      { label: 'Knesley · Pool', bg: 'var(--gw-forest-800)' },
      { label: 'Knesley cont.', bg: 'var(--gw-forest-800)' },
      { label: 'McDermott', bg: 'var(--gw-green-500)' },
      { label: 'McDermott cont.', bg: 'var(--gw-green-500)' },
      { label: 'Karamsetty', bg: 'var(--gw-clay-500)' },
    ] },
    { name: 'Crew B', jobs: [
      { label: 'Maint · 6', dashed: true },
      { label: 'Maint · 5', dashed: true },
      { label: 'Aleman', bg: 'var(--gw-forest-800)' },
      { label: 'Aleman cont.', bg: 'var(--gw-forest-800)' },
      { label: 'Aleman finish', bg: 'var(--gw-forest-800)' },
    ] },
    { name: 'Crew C', jobs: [
      { label: 'Patel · Hardscape', bg: 'var(--gw-blue-500)' },
      { label: 'Patel cont.', bg: 'var(--gw-blue-500)' },
      { label: 'Patel cont.', bg: 'var(--gw-blue-500)' },
      { label: 'Open', dashed: true },
      { label: 'Open', dashed: true },
    ] },
  ]

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
              <PMTitleRow title="Dispatch" sub="WEEK OF JULY 7" />
              <div style="display: grid; grid-template-columns: 60px repeat(5, 1fr); gap: 4px; font-size: 10px;">
                <div></div>
                {days.map((d) => (
                  <div style="text-align:center; color: var(--gw-ink-500); font-weight: 600; padding: 6px 0;">{d}</div>
                ))}
                {crews.map((crew) => (
                  <>
                    <div style="color: var(--gw-ink-500); padding: 4px;">{crew.name}</div>
                    {crew.jobs.map((j) =>
                      j.dashed ? (
                        <div style="background: var(--gw-cream-200); border: 1px dashed var(--gw-line); border-radius: 4px; padding: 6px 8px; font-size: 10.5px; color: var(--gw-ink-500);">
                          {j.label}
                        </div>
                      ) : (
                        <div style={`background: ${j.bg}; color: white; border-radius: 4px; padding: 6px 8px; font-size: 10.5px;`}>
                          {j.label}
                        </div>
                      )
                    )}
                  </>
                ))}
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
