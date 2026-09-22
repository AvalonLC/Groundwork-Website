import { Layout } from '../components/Layout'
import { CTABand } from '../components/Blocks'
import { PM, PMSidebar, PMMain, PMTitleRow, PMStats, PMStatRow, PMCard, PMTask } from '../components/ProductMock'
import { Icon } from '../components/Icon'

// Interactive Demo (/explore) — a click-around sample workspace.
// 100% client-side, no backend, no persisted state, resets on reload.
// Data is the same illustrative fictional cast used elsewhere on the site
// (Cedar Grove Landscape Co. — Knesley, Patel, Aleman, Grumley, Dhulipala,
// Lampard, Ozawa, McDermott — plus a handful of new intake-only leads).
//
// Full-sidebar pass (2026-09-22): every item in the real product's left
// nav (Command Center, Pipeline, Leads, Clients, Properties, Estimates,
// Money Loop, Budget & Rates, Invoice Reporting, Schedule, Dispatch, Work
// Orders, Client Portal, AAR Reviews — 14 total) is now a real, clickable
// panel instead of a curated 3-of-14 subset with a "not wired up" toast
// for the rest. Groundwork AI is not a sidebar item in the real product —
// it's a slide-over available from anywhere — so it's triggered from a
// topbar button instead of living in the sidebar list.

export function InteractiveDemoPage() {
  const tasks = [
    { title: 'Follow up with Nicole Knesley', overdue: true, tags: [{ label: 'Follow-Up', variant: 'follow' }, { label: 'Jul 6', variant: 'overdue' }] },
    { title: 'Follow up with Sydney Lampard', overdue: true, tags: [{ label: 'Follow-Up', variant: 'follow' }, { label: 'Jul 6', variant: 'overdue' }] },
    { title: 'Post site-visit email · Julie Grumley', overdue: false, tags: [{ label: 'Email', variant: 'email' }] },
    { title: 'Confirm crew for Vijay Dhulipala install', overdue: false, tags: [{ label: 'Operations', variant: 'website' }] },
    { title: 'Send updated proposal to T. McDermott', overdue: false, tags: [{ label: 'Follow-Up', variant: 'follow' }] },
  ]

  const leadDetails = [
    {
      id: 'knesley', name: 'Nicole Knesley', sub: 'CLIENT · LORTON VA', phone: '(571) 451-4944', address: '6005 Chapman Rd, Lorton, VA 22079',
      ops: [
        { title: 'Pool Coping Replacement', meta: '$58,200', tag: 'Budget Qualified', variant: 'qual' },
        { title: 'Bi-weekly Maintenance', meta: '$340/visit', tag: 'Active', variant: 'rapport' },
      ],
      note: 'Budget conversation went well on the site walk — waiting on a follow-up call before the proposal goes out.',
    },
    {
      id: 'grumley', name: 'Julie Grumley', sub: 'CLIENT · FAIRFAX VA', phone: '(703) 288-1102', address: '412 Vale Ct, Fairfax, VA 22030',
      ops: [{ title: 'Tree Removal', meta: '$8,200', tag: 'Discovery', variant: 'website' }],
      note: 'First contact from a referral. Site walk scheduled — two dead oaks near the driveway.',
    },
    {
      id: 'dhulipala', name: 'Vijay Dhulipala', sub: 'CLIENT · VIENNA VA', phone: '(703) 552-9081', address: '88 Birchwood Ln, Vienna, VA 22180',
      ops: [{ title: 'Backyard Redesign', meta: '$32,000', tag: 'Discovery', variant: 'website' }],
      note: 'Full backyard redesign — patio, lighting, planting beds. Waiting on a second measurement visit.',
    },
    {
      id: 'lampard', name: 'Sydney Lampard', sub: 'CLIENT · ALEXANDRIA VA', phone: '(571) 902-7734', address: '19 Duke St, Alexandria, VA 22314',
      ops: [{ title: 'Deck Lighting', meta: '$18,000', tag: 'Decision Pending', variant: 'follow' }],
      note: 'Proposal sent 6 days ago. No response yet — this is the deal Groundwork AI is flagging as going quiet.',
    },
  ]

  const moneyRows = [
    { client: 'R. Aleman', job: 'Full landscape · job complete, not yet invoiced', tag: 'Needs an Invoice', variant: 'qual' },
    { client: 'D. Patel', job: 'Hardscape · invoiced Jul 3, unpaid 12 days', tag: 'Needs to be Paid', variant: 'red' },
    { client: 'L. Ozawa', job: "Maint. Contract · amount doesn't match estimate", tag: "Something's Off", variant: 'red' },
    { client: 'J. Grumley', job: 'Tree Removal · 3 calls, no answer', tag: 'Needs Your Call', variant: 'follow' },
  ]

  const aiDeals = [
    { name: 'Nicole Knesley', detail: 'Pool Coping · $58,200 · no contact 7 days', risk: '$58,200 at risk', action: 'Suggested action: a personal check-in call today — deals with no contact past 5 days lose 3x the close rate for every week they sit.' },
    { name: 'Sydney Lampard', detail: 'Deck lighting · $18,000 · missed follow-up', risk: '$18,000 at risk', action: 'Suggested action: send the "still thinking it over?" template — reps who follow up within 24 hours of a stall recover 4 in 10 of these deals.' },
  ]

  // Quick-launch chips — a curated on-ramp into the full 14-item sidebar,
  // not a replacement for it. Sits above the mock, same idea as the old
  // 4-tab row, but doesn't pretend to be the only 4 things worth seeing.
  const quickLinks = [
    { key: 'command', label: 'Today' },
    { key: 'pipeline', label: 'Pipeline' },
    { key: 'money', label: 'Money Loop' },
    { key: 'dispatch', label: 'Dispatch' },
    { key: 'clientportal', label: 'Client Portal' },
    { key: 'aar', label: 'AAR Reviews' },
  ]

  const sidebarStops = ['command', 'pipeline', 'leads', 'clients', 'properties', 'estimates', 'money', 'budget', 'invoicing', 'schedule', 'dispatch', 'workorders', 'clientportal', 'aar']

  return (
    <Layout
      title="Try Groundwork — Interactive Demo"
      description="Click around a full sample Groundwork workspace — every item in the sidebar is a real, clickable panel loaded with example data. No signup required."
      path="/explore"
    >
      <section class="section subpage-hero" style="padding-bottom: 0;">
        <div class="wrap">
          <span class="eyebrow">Try it yourself</span>
          <h1 style="margin-top: 20px;">
            Click around a sample&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">Groundwork workspace.</em>
          </h1>
          <p class="lede">
            This isn't a highlight reel — every item in the sidebar below is a real, clickable panel loaded with
            example data. Check off a task, open a lead, review an AAR, disable a portal user, and see what
            Groundwork AI catches before a deal goes cold.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 32px;">
        <div class="wrap">
          <div class="demo-banner">
            <span>
              <Icon name="eye" size={15} style="margin-right: 6px; vertical-align: -2px; opacity: 0.8;" />
              You're exploring a <strong>sample workspace</strong> with example data — nothing here is saved or real.
            </span>
            <a href="/demo" class="btn btn-secondary" style="padding: 9px 16px; font-size: 13px;">
              See it with your real data →
            </a>
          </div>

          <div data-demo-root>
            <div class="demo-progress" data-demo-progress>
              <span class="demo-progress-label">Sample workspace explored</span>
              <span class="demo-progress-bar"><span class="demo-progress-fill" data-demo-progress-fill></span></span>
              <span class="demo-progress-count"><span data-demo-progress-count>1</span> of {sidebarStops.length} sidebar areas</span>
            </div>

            <div class="demo-quicklinks">
              {quickLinks.map((q, i) => (
                <button type="button" class={`demo-quicklink${i === 0 ? ' active' : ''}`} data-demo-goto={q.key}>
                  {q.label}
                </button>
              ))}
            </div>

            <PM large minHeight={560} shadow="var(--shadow-lg)">
              <PMSidebar active="command" interactive />
              <PMMain>
                <div class="pm-topbar">
                  <div class="search" data-demo-search-wrap>
                    <Icon name="search" size={12} style="opacity: 0.6; margin-right: 6px; vertical-align: -2px;" />
                    <input
                      type="text"
                      data-demo-search
                      placeholder="Search tasks, leads, clients…"
                      autocomplete="off"
                      style="background: none; border: none; outline: none; font: inherit; color: inherit; width: 100%;"
                    />
                  </div>
                  <span class="new-btn">+ New</span>
                  <span class="demo-ai-trigger" data-demo-ai-trigger title="Groundwork AI">
                    <Icon name="sparkle" size={13} />
                    <span class="demo-ai-trigger-label">Groundwork AI</span>
                  </span>
                  <span class="demo-bell" data-demo-bell title="Notifications">
                    <Icon name="bell" size={15} />
                    <span class="demo-bell-badge" data-demo-bell-badge>3</span>
                  </span>
                  <span style="opacity: 0.7;">Tyler</span>
                </div>
                <div class="demo-search-empty" data-demo-search-empty hidden>
                  No matches in this sample workspace for “<span data-demo-search-empty-term></span>”. Try “Knesley,”
                  “invoice,” or clear the search to keep exploring.
                </div>

                {/* ================= 1. Command Center (Today) ================= */}
                <div data-demo-panel="command">
                  <PMTitleRow title="Today" sub="SAMPLE WORKSPACE · TUESDAY" />
                  <PMStats
                    stats={[
                      { label: 'Open', value: '6' },
                      { label: 'Proposals', value: '4' },
                      { label: 'Overdue', value: '2', variant: 'overdue' },
                      { label: 'Sold', value: '3', variant: 'sold' },
                    ]}
                  />
                  <PMCard heading="My Tasks" chip="Click a task to check it off">
                    {tasks.map((t) => (
                      <div class={`pm-task${t.overdue ? ' overdue' : ''}`} data-demo-task data-demo-searchable={t.title.toLowerCase()} style="cursor: pointer;">
                        <span class="cb"></span>
                        <span class="tk-title">{t.title}</span>
                        <span class="tk-tags">
                          {t.tags.map((tag) => <span class={`tag tag-${tag.variant}`}>{tag.label}</span>)}
                        </span>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="pipeline" label="See the Sales Pipeline" />
                </div>

                {/* ================= 2. Pipeline ================= */}
                <div data-demo-panel="pipeline" hidden>
                  <PMTitleRow title="Pipeline" sub="SAMPLE WORKSPACE · SALES · CLICK A CARD" />
                  <div class="demo-workspace" style="min-height: 380px;">
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-forest-600);">Discovery · 2</div>
                        <div class="demo-lead-card" data-demo-lead="grumley" data-demo-searchable="julie grumley tree removal" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">Julie Grumley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Tree Removal · $8.2k</div></div>
                        <div class="demo-lead-card" data-demo-lead="dhulipala" data-demo-searchable="vijay dhulipala backyard redesign" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Vijay Dhulipala</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Backyard · $32k</div></div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-green-500);">Budget · 1</div>
                        <div class="demo-lead-card" data-demo-lead="knesley" data-demo-searchable="nicole knesley pool coping" style="background: var(--gw-green-050); border: 1px solid #C5DDCC; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Nicole Knesley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Pool Coping · $58k</div><div style="margin-top: 4px;"><span class="tag tag-qual">Qualified</span></div></div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-clay-500);">Decision · 1</div>
                        <div class="demo-lead-card" data-demo-lead="lampard" data-demo-searchable="sydney lampard deck lighting" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Sydney Lampard</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Deck lighting · $18k</div></div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-forest-800);">Won · 2</div>
                        <div data-demo-searchable="r. aleman full landscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">R. Aleman</div><div style="font-size: 10.5px; color: #B7CFC1;">Full landscape · $84k</div></div>
                        <div data-demo-searchable="d. patel hardscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">D. Patel</div><div style="font-size: 10.5px; color: #B7CFC1;">Hardscape · $52k</div></div>
                      </div>
                    </div>

                    <div class="demo-slideover" data-demo-slideover>
                      <div class="demo-slideover-close" data-demo-slideover-close aria-label="Close"><Icon name="x" size={13} /></div>
                      {leadDetails.map((d) => (
                        <div data-lead-detail={d.id} hidden>
                          <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 2px;">{d.name}</div>
                          <div style="font-size: 10.5px; letter-spacing: 0.08em; color: var(--gw-ink-400); text-transform: uppercase; font-weight: 600; margin-bottom: 18px;">{d.sub}</div>
                          <div style="display: grid; gap: 10px; margin-bottom: 16px;">
                            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                              <div class="demo-microlabel">Contact</div>
                              <div style="font-size: 13px; font-weight: 600;">{d.name}</div>
                              <div style="font-size: 11px; color: var(--gw-ink-500);">{d.phone}</div>
                            </div>
                            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                              <div class="demo-microlabel">Property</div>
                              <div style="font-size: 13px; font-weight: 600;">{d.address}</div>
                            </div>
                          </div>
                          <PMCard heading="Opportunities">
                            {d.ops.map((op, i) => (
                              <div style={`padding: 8px 0; display: flex; justify-content: space-between; font-size: 12.5px;${i < d.ops.length - 1 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                                <span><strong>{op.title}</strong> · {op.meta}</span>
                                <span class={`tag tag-${op.variant}`}>{op.tag}</span>
                              </div>
                            ))}
                          </PMCard>
                          <div style="margin-top: 14px; font-size: 12px; color: var(--gw-ink-500); line-height: 1.5;">{d.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DemoGoto to="leads" label="See where new leads come in" />
                </div>

                {/* ================= 3. Leads ================= */}
                <div data-demo-panel="leads" hidden>
                  <PMTitleRow title="Leads" sub="SAMPLE WORKSPACE · NOT YET IN THE PIPELINE" />
                  <PMStats stats={[
                    { label: 'New', value: '2' },
                    { label: 'Contacted', value: '1' },
                    { label: 'Avg. response', value: '4h' },
                    { label: 'This week', value: '3' },
                  ]} />
                  <PMCard heading="Intake Queue" chip="Click a lead to mark it contacted">
                    {[
                      { name: 'Priya Anand', source: 'Website form · irrigation repair inquiry', tag: 'New', variant: 'website' },
                      { name: 'Marcus Webb', source: 'Referral from D. Patel · fence + hardscape estimate', tag: 'New', variant: 'website' },
                      { name: 'Chloe Ferretti', source: 'Called in · spring cleanup quote request', tag: 'Contacted', variant: 'rapport' },
                    ].map((l) => (
                      <div class="demo-row" data-demo-handle data-demo-searchable={`${l.name.toLowerCase()} ${l.source.toLowerCase()}`}>
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{l.name}</div>
                          <div class="demo-row-sub demo-money-job">{l.source}</div>
                        </div>
                        <span data-demo-handle-tag class={`tag tag-${l.variant}`}>{l.tag}</span>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="pipeline" label="See a qualified lead move through Pipeline" />
                </div>

                {/* ================= 4. Clients ================= */}
                <div data-demo-panel="clients" hidden>
                  <PMTitleRow title="Clients" sub="SAMPLE WORKSPACE · ROSTER" />
                  <PMStats stats={[
                    { label: 'Active clients', value: '4' },
                    { label: 'Lifetime value', value: '$166k' },
                    { label: 'Portal users', value: '1' },
                    { label: 'Avg. tenure', value: '2.1 yrs' },
                  ]} />
                  <PMCard heading="Client Roster" chip="Click a client to expand">
                    {[
                      { name: 'Nicole Knesley', addr: '6005 Chapman Rd, Lorton VA', value: '$59.9k lifetime', note: '2 properties on file · bi-weekly maintenance contract active since 2024.' },
                      { name: 'Julie Grumley', addr: '412 Vale Ct, Fairfax VA', value: '$8.2k lifetime', note: 'New client — first job (tree removal) still in Discovery.' },
                      { name: 'Vijay Dhulipala', addr: '88 Birchwood Ln, Vienna VA', value: '$32k lifetime', note: 'Backyard redesign in Discovery — second measurement visit pending.' },
                      { name: 'Sydney Lampard', addr: '19 Duke St, Alexandria VA', value: '$18k lifetime', note: 'Deck lighting proposal sent — this is the deal Groundwork AI is flagging.' },
                    ].map((c) => (
                      <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${c.name.toLowerCase()} ${c.addr.toLowerCase()}`}>
                        <div class="demo-row-main">
                          <div>
                            <div style="font-size: 12.5px; font-weight: 600;">{c.name}</div>
                            <div class="demo-row-sub">{c.addr}</div>
                          </div>
                          <span class="demo-row-value">{c.value}</span>
                        </div>
                        <div class="demo-row-detail" hidden>{c.note}</div>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="properties" label="See the properties behind these clients" />
                </div>

                {/* ================= 5. Properties ================= */}
                <div data-demo-panel="properties" hidden>
                  <PMTitleRow title="Properties" sub="SAMPLE WORKSPACE · EVERY ADDRESS SERVICED" />
                  <PMCard heading="Property Records" chip="Click a property to expand access notes">
                    {[
                      { addr: '6005 Chapman Rd, Lorton VA', client: 'Nicole Knesley', status: 'Pool coping in progress', note: 'Gate code 4471. Friendly dog on property. Irrigation shutoff behind garage.' },
                      { addr: '412 Vale Ct, Fairfax VA', client: 'Julie Grumley', status: 'Site walk scheduled', note: 'Two dead oaks near the driveway — confirm utility markout before removal.' },
                      { addr: '88 Birchwood Ln, Vienna VA', client: 'Vijay Dhulipala', status: 'Awaiting 2nd measurement', note: 'Full backyard redesign — patio, lighting, planting beds. HOA approval on file.' },
                      { addr: '19 Duke St, Alexandria VA', client: 'Sydney Lampard', status: 'Proposal sent', note: 'Deck lighting — access via side gate only, no rear driveway access.' },
                    ].map((p) => (
                      <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${p.addr.toLowerCase()} ${p.client.toLowerCase()}`}>
                        <div class="demo-row-main">
                          <div>
                            <div style="font-size: 12.5px; font-weight: 600;">{p.addr}</div>
                            <div class="demo-row-sub">{p.client}</div>
                          </div>
                          <span class="demo-row-value" style="font-size: 11px;">{p.status}</span>
                        </div>
                        <div class="demo-row-detail" hidden><strong style="color: var(--gw-ink-700);">Access notes:</strong> {p.note}</div>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="estimates" label="See what's being quoted on these properties" />
                </div>

                {/* ================= 6. Estimates ================= */}
                <div data-demo-panel="estimates" hidden>
                  <PMTitleRow title="Estimates" sub="SAMPLE WORKSPACE · PROPOSALS OUT" />
                  <PMCard heading="Open & Recent Estimates" chip="Click one to expand the breakdown">
                    {[
                      { title: 'Pool Coping Replacement', client: 'N. Knesley', amount: '$58,200', tag: 'Sent', variant: 'website', materials: '$31,400', labor: '$21,800', margin: '15%' },
                      { title: 'Tree Removal', client: 'J. Grumley', amount: '$8,200', tag: 'Draft', variant: 'follow', materials: '$900', labor: '$5,200', margin: '25%' },
                      { title: 'Backyard Redesign', client: 'V. Dhulipala', amount: '$32,000', tag: 'Sent', variant: 'website', materials: '$18,600', labor: '$10,400', margin: '9%' },
                      { title: 'Deck Lighting', client: 'S. Lampard', amount: '$18,000', tag: 'Approved', variant: 'rapport', materials: '$9,200', labor: '$6,300', margin: '14%' },
                    ].map((e) => (
                      <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${e.title.toLowerCase()} ${e.client.toLowerCase()}`}>
                        <div class="demo-row-main">
                          <div>
                            <div style="font-size: 12.5px; font-weight: 600;">{e.title}</div>
                            <div class="demo-row-sub">{e.client} · {e.amount}</div>
                          </div>
                          <span class={`tag tag-${e.variant}`}>{e.tag}</span>
                        </div>
                        <div class="demo-row-detail" hidden>Materials {e.materials} · Labor {e.labor} · Margin {e.margin} — priced from the same Budget &amp; Rates engine used company-wide.</div>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="budget" label="See the rate engine behind these numbers" />
                </div>

                {/* ================= 7. Money Loop ================= */}
                <div data-demo-panel="money" hidden>
                  <PMTitleRow title="Money Loop" sub="SAMPLE WORKSPACE · OWNER VIEW" />
                  <div style="background: var(--gw-cream-200); border-radius: 10px; padding: 16px 18px; margin-bottom: 16px;">
                    <div class="demo-microlabel">How we're tracking</div>
                    <div style="font-size: 12.5px; color: var(--gw-ink-700); margin-bottom: 10px;">
                      <strong style="font-family: var(--font-serif); font-size: 20px; color: var(--gw-ink-900);">83%</strong> of what it costs to keep the doors open this year
                    </div>
                    <div style="height: 9px; background: var(--gw-cream-300); border-radius: 5px; overflow: hidden;">
                      <div style="width: 83%; height: 100%; background: linear-gradient(90deg, var(--gw-forest-600), var(--gw-green-500));"></div>
                    </div>
                  </div>
                  <PMStatRow columns={5} stats={[
                    { label: 'Money to Collect', value: '$48.2k' },
                    { label: 'Needs an Invoice', value: '5' },
                    { label: 'Needs to be Paid', value: '9', variant: 'overdue' },
                    { label: "Something's Off", value: '2', variant: 'overdue' },
                    { label: 'Needs Your Call', value: '3' },
                  ]} />
                  <PMCard heading="What Needs Doing" chip="Click an item to mark it handled">
                    {moneyRows.map((row, i) => (
                      <div class="demo-row" data-demo-handle data-demo-searchable={`${row.client.toLowerCase()} ${row.job.toLowerCase()}`}>
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{row.client}</div>
                          <div class="demo-row-sub demo-money-job">{row.job}</div>
                        </div>
                        <span data-demo-handle-tag class={`tag tag-${row.variant}`}>{row.tag}</span>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="invoicing" label="See the invoices behind this number" />
                </div>

                {/* ================= 8. Budget & Rates ================= */}
                <div data-demo-panel="budget" hidden>
                  <PMTitleRow title="Budget & Rates" sub="SAMPLE WORKSPACE · LABOR · MACHINE · OVERHEAD" />
                  <PMCard heading="Labor Rates" chip="Crew A Install · click for the math">
                    <div class="demo-row demo-row-expand" data-demo-expand>
                      <div class="demo-row-main">
                        <div><div style="font-size: 12.5px; font-weight: 600;">Fully burdened rate</div><div class="demo-row-sub">Base + burden + equipment allocation</div></div>
                        <span class="demo-row-value" style="font-size: 15px; font-weight: 600;">$37.90/hr</span>
                      </div>
                      <div class="demo-row-detail" hidden>Base wage $24.00/hr + payroll tax/comp/benefits $9.80/hr + equipment allocation $4.10/hr = $37.90/hr. This is the number every estimate on Cedar Grove's crews is priced against — not the $24.00 sticker wage.</div>
                    </div>
                  </PMCard>
                  <PMCard heading="Machine Rates" chip="Fleet">
                    {[
                      { name: 'Skid steer', rate: '$46.00/hr burdened', note: 'Includes fuel, maintenance reserve, and depreciation.' },
                      { name: '¾-ton dump truck', rate: '$31.50/hr burdened', note: 'Includes fuel, insurance allocation, and depreciation.' },
                    ].map((m, i) => (
                      <div class="demo-row demo-row-expand" data-demo-expand>
                        <div class="demo-row-main">
                          <div style="font-size: 11.5px;">{m.name}</div>
                          <span class="demo-row-sub">{m.rate}</span>
                        </div>
                        <div class="demo-row-detail" hidden>{m.note}</div>
                      </div>
                    ))}
                  </PMCard>
                  <PMCard heading="Overhead Pools" chip="Immutable history">
                    <div style="font-size: 11.5px; color: var(--gw-ink-500); padding: 6px 0; border-bottom: 1px solid var(--gw-cream-300);">Shop &amp; yard · $612k/yr pool · effective Jul 1, 2026</div>
                    <div style="font-size: 11.5px; color: var(--gw-ink-500); padding: 6px 0;">Insurance &amp; admin · $198k/yr pool · effective Jan 1, 2026</div>
                  </PMCard>
                  <DemoGoto to="estimates" label="See these rates price a real estimate" />
                </div>

                {/* ================= 9. Invoice Reporting ================= */}
                <div data-demo-panel="invoicing" hidden>
                  <PMTitleRow title="Invoice Reporting" sub="SAMPLE WORKSPACE · AGING SUMMARY" />
                  <PMStats stats={[
                    { label: '0–30 days', value: '$18.0k' },
                    { label: '31–60 days', value: '$22.0k', variant: 'overdue' },
                    { label: '61–90 days', value: '$8.2k', variant: 'overdue' },
                    { label: '90+ days', value: '$0' },
                  ]} />
                  <PMCard heading="Invoice Aging" chip="Click a row to send a reminder">
                    {[
                      { client: 'R. Aleman', job: 'Full landscape', amount: '$84,000', tag: 'Paid', variant: 'rapport' },
                      { client: 'D. Patel', job: 'Hardscape', amount: '$52,000', tag: 'Deposit', variant: 'qual' },
                      { client: 'L. Ozawa', job: 'Maint. Contract', amount: '$1,200', tag: 'Past due 12d', variant: 'red' },
                      { client: 'J. Grumley', job: 'Tree Removal', amount: '$8,200', tag: 'Sent', variant: 'website' },
                    ].map((row) => (
                      <div class="demo-row" data-demo-handle data-demo-handled-label="Reminder sent" data-demo-searchable={`${row.client.toLowerCase()} ${row.job.toLowerCase()}`}>
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{row.client}</div>
                          <div class="demo-row-sub demo-money-job">{row.job} · {row.amount}</div>
                        </div>
                        <span data-demo-handle-tag class={`tag tag-${row.variant}`}>{row.tag}</span>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="money" label="See how this rolls into the health number" />
                </div>

                {/* ================= 10. Schedule ================= */}
                <div data-demo-panel="schedule" hidden>
                  <PMTitleRow title="Schedule" sub="SAMPLE WORKSPACE · WEEK OF JULY 7" />
                  {[
                    { day: 'Monday', stops: [
                      { crew: 'Crew A', client: 'N. Knesley', job: 'Pool Coping · Day 1 of 2', time: '7:00 AM – 3:30 PM' },
                      { crew: 'Crew B', client: 'Recurring maintenance', job: '6 stops', time: '7:00 AM – 2:00 PM' },
                    ]},
                    { day: 'Tuesday', stops: [
                      { crew: 'Crew A', client: 'N. Knesley', job: 'Pool Coping · Day 2 of 2', time: '7:00 AM – 3:30 PM' },
                      { crew: 'Crew C', client: 'D. Patel', job: 'Hardscape install', time: '7:30 AM – 4:00 PM' },
                    ]},
                    { day: 'Wednesday', stops: [
                      { crew: 'Crew B', client: 'Recurring maintenance', job: '6 stops', time: '7:00 AM – 2:00 PM' },
                    ]},
                  ].map((d) => (
                    <PMCard heading={d.day} chip={`${d.stops.length} stop${d.stops.length === 1 ? '' : 's'}`}>
                      {d.stops.map((s) => (
                        <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${s.client.toLowerCase()} ${s.job.toLowerCase()} ${s.crew.toLowerCase()}`}>
                          <div class="demo-row-main">
                            <div><div style="font-size: 12.5px; font-weight: 600;">{s.crew} · {s.client}</div><div class="demo-row-sub">{s.job}</div></div>
                            <span class="demo-row-value" style="font-size: 11px;">{s.time}</span>
                          </div>
                          <div class="demo-row-detail" hidden>Dispatched to Field Mode automatically at 6:30 AM the morning of. Foreman gets the route, checklist, and client notes on their phone.</div>
                        </div>
                      ))}
                    </PMCard>
                  ))}
                  <DemoGoto to="dispatch" label="See today's dispatch board" />
                </div>

                {/* ================= 11. Dispatch ================= */}
                <div data-demo-panel="dispatch" hidden>
                  <PMTitleRow title="Dispatch Board" sub="SAMPLE WORKSPACE · WEEK OF JULY 7" />
                  <PMStats stats={[
                    { label: 'Scheduled', value: '18' },
                    { label: 'In Progress', value: '3', variant: 'sold' },
                    { label: 'Completed', value: '11' },
                    { label: 'Active Crews', value: '3' },
                  ]} />
                  <PMCard heading="Crews" chip="Today's dispatched jobs · click for ETA notes">
                    {[
                      { crew: 'Crew A', label: 'Knesley · Pool Coping', status: '● On site 07:12', color: 'var(--gw-green-500)', note: 'Checked in on time. Materials delivered yesterday — no blockers expected.' },
                      { crew: 'Crew B', label: 'Recurring maint. · 6 stops', status: '● En route', color: 'var(--gw-amber-500)', note: 'Stop 2 of 6. Running ~15 min behind schedule after a locked gate at stop 1.' },
                      { crew: 'Crew C', label: 'Patel · Hardscape', status: '● On site 07:45', color: 'var(--gw-green-500)', note: 'Checked in on time. Skid steer delivered by 07:30.' },
                    ].map((row) => (
                      <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${row.crew.toLowerCase()} ${row.label.toLowerCase()}`}>
                        <div class="demo-row-main">
                          <div><strong style="font-size: 12px;">{row.crew}</strong><div class="demo-row-sub">{row.label}</div></div>
                          <span style={`color: ${row.color}; font-weight: 600; font-size: 11px; white-space: nowrap;`}>{row.status}</span>
                        </div>
                        <div class="demo-row-detail" hidden>{row.note}</div>
                      </div>
                    ))}
                  </PMCard>
                  <PMCard heading="Activity Feed">
                    {[
                      { text: 'Crew A checked in · Knesley', time: '07:12' },
                      { text: 'Crew C checked in · Patel', time: '07:45' },
                      { text: 'Crew B en route · Maint. stop 2 of 6', time: '08:10' },
                    ].map((row, i) => (
                      <div style={`padding: 8px 0; font-size: 11.5px; color: var(--gw-ink-700);${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                        {row.text}<div style="font-size: 10px; color: var(--gw-ink-400); margin-top: 2px;">{row.time}</div>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="workorders" label="See the work order behind Crew A's stop" />
                </div>

                {/* ================= 12. Work Orders ================= */}
                <div data-demo-panel="workorders" hidden>
                  <PMTitleRow title="Work Order #WO-2264" sub="SAMPLE WORKSPACE · KNESLEY · POOL COPING · CREW A" />
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                    <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                      <div class="demo-microlabel">Scheduled</div>
                      <div style="font-size: 13px; font-weight: 600;">Mon Jul 7 – Tue Jul 8</div>
                    </div>
                    <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                      <div class="demo-microlabel">Crew</div>
                      <div style="font-size: 13px; font-weight: 600;">Crew A · 4 people</div>
                    </div>
                  </div>
                  <PMCard heading="Scope & Checklist" chip="Click a remaining item to check it off">
                    <PMTask title="Remove existing coping" done />
                    <PMTask title="Prep bond beam" done />
                    <PMTask title="Deliver new coping stone" done />
                    <PMTask title="Set stones" done />
                    <div class="pm-task" data-demo-task style="cursor: pointer;"><span class="cb"></span><span class="tk-title">Grout &amp; seal</span></div>
                    <div class="pm-task" data-demo-task style="cursor: pointer;"><span class="cb"></span><span class="tk-title">Final walkthrough with client</span></div>
                  </PMCard>
                  <DemoGoto to="aar" label="See the end-of-day report this feeds into" />
                </div>

                {/* ================= 13. Client Portal ================= */}
                <div data-demo-panel="clientportal" hidden>
                  <PMTitleRow title="Client Portal" sub="SAMPLE WORKSPACE · ADMIN · MANAGE ACCESS" />
                  <PMStats stats={[
                    { label: 'Active Users', value: '1', variant: 'sold' },
                    { label: 'Pending Invites', value: '1' },
                    { label: 'Disabled', value: '1', variant: 'overdue' },
                  ]} />
                  <PMCard heading="Portal Users" chip="3 total · click Disable/Enable to toggle">
                    {[
                      { name: 'Nicole Knesley', status: 'Active', last: 'Logged in 2d ago' },
                      { name: 'D. Patel', status: 'Pending', last: 'Invited · not yet accepted' },
                      { name: 'R. Aleman', status: 'Disabled', last: 'Revoked by Tyler' },
                    ].map((u) => (
                      <div class="demo-row demo-portal-user" data-demo-portal-status={u.status}>
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{u.name}</div>
                          <div class="demo-row-sub" data-demo-portal-last>{u.last}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span data-demo-portal-tag class={`tag ${u.status === 'Active' ? 'tag-rapport' : u.status === 'Pending' ? 'tag-follow' : 'tag-red'}`}>{u.status}</span>
                          <button type="button" class="btn btn-secondary demo-portal-toggle" data-demo-portal-toggle style="padding: 3px 9px; font-size: 10px;">
                            {u.status === 'Disabled' ? 'Enable' : 'Disable'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </PMCard>
                  <PMCard heading="Recent Portal Activity">
                    <div style="display: grid; grid-template-columns: 1.3fr 1fr 1.6fr 0.8fr; gap: 6px; font-size: 9.5px; letter-spacing: 0.06em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 6px; border-bottom: 1px solid var(--gw-cream-300); margin-bottom: 4px;">
                      <span>Event</span><span>Actor</span><span>Detail</span><span>Date</span>
                    </div>
                    {[
                      { event: 'Login', actor: 'Nicole Knesley', detail: 'Portal home', date: 'Jul 6' },
                      { event: 'Invite sent', actor: 'Tyler', detail: 'D. Patel', date: 'Jul 3' },
                      { event: 'Access revoked', actor: 'Tyler', detail: 'R. Aleman', date: 'Jun 28' },
                    ].map((r, i) => (
                      <div style="display: contents;">
                        <span style={`font-size: 11px; padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.event}</span>
                        <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.actor}</span>
                        <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.detail}</span>
                        <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.date}</span>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="invoicing" label="See where clients pay their invoices" />
                </div>

                {/* ================= 14. AAR Reviews ================= */}
                <div data-demo-panel="aar" hidden>
                  <PMTitleRow title="AAR Reviews" sub="SAMPLE WORKSPACE · OFFICE REVIEW QUEUE" />
                  <PMCard heading="Submitted Reports" chip="Click a report to mark it reviewed">
                    {[
                      { crew: 'Crew A', job: 'Knesley · Pool Coping', date: 'Jul 6', flag: false },
                      { crew: 'Crew C', job: 'Patel · Hardscape', date: 'Jul 6', flag: false },
                      { crew: 'Crew B', job: 'Ozawa · Maint. stop 3', date: 'Jul 5', flag: true },
                    ].map((r) => (
                      <div class="demo-row" data-demo-handle data-demo-handled-label="Reviewed" data-demo-searchable={`${r.crew.toLowerCase()} ${r.job.toLowerCase()}`}>
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{r.crew} · {r.job}</div>
                          <div class="demo-row-sub">{r.date}{r.flag ? ' · flagged a materials shortage' : ''}</div>
                        </div>
                        <span data-demo-handle-tag class={`tag ${r.flag ? 'tag-red' : 'tag-follow'}`}>{r.flag ? 'Needs Review' : 'Needs Review'}</span>
                      </div>
                    ))}
                  </PMCard>
                  <p style="font-size: 12px; color: var(--gw-ink-500); margin-top: 14px; line-height: 1.5;">
                    The question set these reports answer (Yes/No, rating, text, checklist) is configured once in{' '}
                    <a href="/product/admin" style="color: var(--gw-forest-700); font-weight: 600;">Admin &amp; Permissions</a> — see the template builder there.
                  </p>
                </div>
              </PMMain>
            </PM>

            {/* Groundwork AI — not a sidebar item in the real product; it's a
                slide-over available from anywhere, so it's triggered from the
                topbar button above rather than living in the sidebar list. */}
            <div class="demo-ai-overlay" data-demo-ai-overlay>
              <div class="demo-slideover-close demo-ai-overlay-close" data-demo-ai-overlay-close aria-label="Close"><Icon name="x" size={13} /></div>
              <div style="display: flex; gap: 4px; margin-bottom: 4px;">
                {['Home', 'Suggestions', 'Coach', 'Setup', 'Chat'].map((t, i) => (
                  <span
                    class={i !== 2 ? 'demo-ai-tab' : undefined}
                    data-demo-ai-tab={i !== 2 ? t : undefined}
                    style={`font-size: 10px; letter-spacing: 0.04em; padding: 6px 9px; border-radius: 5px 5px 0 0; cursor: pointer; ${i === 2 ? 'background: rgba(255,255,255,0.08); color: white; font-weight: 600;' : 'color: #7A9788;'}`}
                  >{t}</span>
                ))}
              </div>
              <div style="padding: 16px 2px 4px; border-top: 1px solid rgba(255,255,255,0.08);">
                <div style="font-size: 10px; letter-spacing: 0.1em; color: #7CC9A3; text-transform: uppercase; font-weight: 600; margin-bottom: 10px;">Coach · Deals going quiet · Click a card</div>
                {aiDeals.map((d, i) => (
                  <div class="demo-ai-card" data-demo-ai-card style={`background: rgba(255,255,255,0.05); border-left: 3px solid var(--gw-red-500); border-radius: 6px; padding: 10px 12px;${i < aiDeals.length - 1 ? ' margin-bottom: 8px;' : ''}`}>
                    <div style="font-size: 12.5px; font-weight: 600; color: white; margin-bottom: 2px;">{d.name}</div>
                    <div style="font-size: 11px; color: #B7CFC1; margin-bottom: 4px;">{d.detail}</div>
                    <div style="font-size: 10.5px; color: #F0A8A0; font-weight: 600;">{d.risk}</div>
                    <div class="demo-ai-thinking" data-demo-ai-thinking hidden>
                      <span class="demo-ai-dot"></span><span class="demo-ai-dot"></span><span class="demo-ai-dot"></span>
                      Groundwork AI is thinking…
                    </div>
                    <div class="demo-ai-detail" data-demo-ai-detail hidden>
                      <Icon name="sparkle" size={11} style="margin-right: 5px; vertical-align: -1px; opacity: 0.85;" />
                      {d.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="demo-toast" data-demo-toast></div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Like what you clicked through?"
        title={<>This was a sample. Let's load your&nbsp;<em>real pipeline.</em></>}
        description="A specialist will show the same screens running on your actual leads, jobs, and numbers — 30 minutes, no slides."
        secondaryHref="/features"
        secondaryLabel="See all features"
      />
    </Layout>
  )
}

// Small "suggested next" link at the bottom of a panel — jumps to another
// sidebar panel via the same client-side showPanel() the sidebar uses.
function DemoGoto({ to, label }: { to: string; label: string }) {
  return (
    <div style="margin-top: 20px; text-align: right;">
      <button type="button" class="btn btn-secondary" data-demo-goto={to}>
        {label} <span class="arrow">→</span>
      </button>
    </div>
  )
}
