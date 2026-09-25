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
//
// Real-product-parity pass (2026-09-24): using real screenshots from a
// live Groundwork customer instance as a visual reference (kept
// illustrative/fictional here — see cast note above), three panels
// (Pipeline, Estimates, Schedule) were upgraded from simple list/kanban
// mockups to match the real app's information density (filter bars,
// status-pill rows, real <table> markup, a Job Pool + crew-chip schedule
// toolbar), and three brand-new sidebar panels were added that didn't
// exist before (Assets, Time Tracker, Employees & Teams — 17 total now).

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

  const sidebarStops = ['command', 'pipeline', 'leads', 'clients', 'properties', 'estimates', 'money', 'budget', 'invoicing', 'schedule', 'dispatch', 'workorders', 'assets', 'timetracker', 'clientportal', 'employees', 'aar']

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
                  <div class="demo-ring-wrap" style="background: var(--gw-cream-200); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
                    <div class="demo-ring-box">
                      <svg viewBox="0 0 66 66">
                        <circle cx="33" cy="33" r="27" fill="none" stroke="var(--gw-cream-300)" stroke-width="8" />
                        <circle cx="33" cy="33" r="27" fill="none" stroke="var(--gw-forest-600)" stroke-width="8" stroke-linecap="round" stroke-dasharray="169.6" stroke-dashoffset="56" />
                      </svg>
                      <span class="demo-ring-num">67%</span>
                    </div>
                    <div class="demo-ring-caption">
                      <strong>4 of 6 open deals have a proposal out</strong>
                      Groundwork tracks this ratio automatically — reps whose proposal rate drops below 50% get flagged for a coaching nudge before the pipeline dries up.
                    </div>
                  </div>
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

                {/* ================= 2. Pipeline =================
                    Real 6-stage board with a filter row, a Closed Results
                    time-range block, and a By Division breakdown — mirrors
                    the actual product's Pipeline screen (kanban + stats +
                    division split), not just a bare 4-column board. */}
                <div data-demo-panel="pipeline" hidden>
                  <PMTitleRow title="Pipeline" sub="SAMPLE WORKSPACE · SALES · CLICK A CARD" />
                  <div class="demo-filter-bar">
                    <span class="demo-filter-select">Rep: All Reps</span>
                    <span class="demo-filter-select">Division: All Divisions</span>
                    <span class="demo-filter-select">Sort: Newest First</span>
                    <span class="demo-filter-spacer"></span>
                    <span class="demo-pill active" style="cursor: default;">This Quarter</span>
                  </div>
                  <PMStatRow columns={4} stats={[
                    { label: 'Pipeline Value', value: '$202k' },
                    { label: 'Weighted Value', value: '$96k' },
                    { label: 'Avg. Deal Age', value: '11d' },
                    { label: 'Win Rate (90d)', value: '58%', variant: 'sold' },
                  ]} />
                  <PMCard heading="By Division" chip="Open pipeline value">
                    <div class="demo-hbars" style="margin-bottom: 4px;">
                      {[
                        { label: 'Landscape', pct: 100, value: '$142k', color: 'var(--gw-forest-600)' },
                        { label: 'Hardscape', pct: 34, value: '$48k', color: 'var(--gw-clay-500)' },
                        { label: 'Maintenance', pct: 8, value: '$12k', color: 'var(--gw-green-500)' },
                      ].map((s) => (
                        <div class="demo-hbar-row">
                          <span class="demo-hbar-label">{s.label}</span>
                          <div class="demo-hbar-track"><div class="demo-hbar-fill" style={`width: ${s.pct}%; background: ${s.color};`}></div></div>
                          <span class="demo-hbar-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </PMCard>
                  <div style="height: 14px;"></div>
                  <div class="demo-workspace" style="min-height: 380px;">
                    <div class="demo-kanban-wide">
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-forest-600);">New Lead · 1</div>
                        <div class="demo-lead-card" data-demo-lead="grumley" data-demo-searchable="julie grumley tree removal" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;">
                          <div style="font-size: 12px; font-weight: 600;">Julie Grumley</div>
                          <div style="font-size: 10.5px; color: var(--gw-ink-500);">Tree Removal · $8.2k</div>
                          <div class="demo-kanban-meta"><span class="demo-avatar">JG</span><span>2d in stage</span></div>
                        </div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-green-500);">Intro Call · 1</div>
                        <div class="demo-lead-card" data-demo-lead="dhulipala" data-demo-searchable="vijay dhulipala backyard redesign" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;">
                          <div style="font-size: 12px; font-weight: 600;">Vijay Dhulipala</div>
                          <div style="font-size: 10.5px; color: var(--gw-ink-500);">Backyard · $32k</div>
                          <div class="demo-kanban-meta"><span class="demo-avatar">TR</span><span>4d in stage</span></div>
                          <div class="demo-kanban-nextup">Next: 2nd measurement visit</div>
                        </div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-blue-500);">On-Site Consult · 0</div>
                        <div class="demo-jobpool-item" style="cursor: default; opacity: 0.5; text-align: center; font-size: 10.5px; color: var(--gw-ink-400); padding: 16px 8px;">No deals in this stage</div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-amber-500);">Estimate Dev. · 1</div>
                        <div class="demo-lead-card" data-demo-lead="knesley" data-demo-searchable="nicole knesley pool coping" style="background: var(--gw-green-050); border: 1px solid #C5DDCC; border-radius: 6px; padding: 10px;">
                          <div style="font-size: 12px; font-weight: 600;">Nicole Knesley</div>
                          <div style="font-size: 10.5px; color: var(--gw-ink-500);">Pool Coping · $58k</div>
                          <div style="margin-top: 4px;"><span class="tag tag-qual">Qualified</span></div>
                          <div class="demo-kanban-meta"><span class="demo-avatar">TR</span><span>6d in stage</span></div>
                        </div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-clay-500);">Presentation · 0</div>
                        <div class="demo-jobpool-item" style="cursor: default; opacity: 0.5; text-align: center; font-size: 10.5px; color: var(--gw-ink-400); padding: 16px 8px;">No deals in this stage</div>
                      </div>
                      <div>
                        <div class="demo-kanban-h" style="border-bottom-color: var(--gw-red-500);">Decision Pending · 1</div>
                        <div class="demo-lead-card" data-demo-lead="lampard" data-demo-searchable="sydney lampard deck lighting" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;">
                          <div style="font-size: 12px; font-weight: 600;">Sydney Lampard</div>
                          <div style="font-size: 10.5px; color: var(--gw-ink-500);">Deck lighting · $18k</div>
                          <div class="demo-kanban-meta"><span class="demo-avatar">TR</span><span>9d in stage</span></div>
                          <div class="demo-kanban-nextup">⚠ No contact 6 days</div>
                        </div>
                      </div>
                    </div>

                    <div style="margin-top: 16px;">
                      <div class="demo-microlabel">Closed Results · This Quarter</div>
                      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 6px;">
                        <div data-demo-searchable="r. aleman full landscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">R. Aleman · Won</div><div style="font-size: 10.5px; color: #B7CFC1;">Full landscape · $84k</div></div>
                        <div data-demo-searchable="d. patel hardscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">D. Patel · Won</div><div style="font-size: 10.5px; color: #B7CFC1;">Hardscape · $52k</div></div>
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
                  <PMCard heading="Lead Sources · Last 30 Days" chip="Where new business is coming from">
                    <div class="demo-hbars" style="margin-bottom: 4px;">
                      {[
                        { label: 'Referral', pct: 100, value: '9 leads', color: 'var(--gw-forest-600)' },
                        { label: 'Website form', pct: 78, value: '7 leads', color: 'var(--gw-forest-600)' },
                        { label: 'Called in', pct: 44, value: '4 leads', color: 'var(--gw-forest-600)' },
                        { label: 'Google/SEO', pct: 33, value: '3 leads', color: 'var(--gw-forest-600)' },
                      ].map((s) => (
                        <div class="demo-hbar-row">
                          <span class="demo-hbar-label">{s.label}</span>
                          <div class="demo-hbar-track"><div class="demo-hbar-fill" style={`width: ${s.pct}%; background: ${s.color};`}></div></div>
                          <span class="demo-hbar-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </PMCard>
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
                  <PMCard heading="Client Value" chip="Lifetime revenue by account">
                    <div class="demo-hbars" style="margin-bottom: 4px;">
                      {[
                        { label: 'N. Knesley', pct: 100, value: '$59.9k' },
                        { label: 'V. Dhulipala', pct: 53, value: '$32.0k' },
                        { label: 'S. Lampard', pct: 30, value: '$18.0k' },
                        { label: 'J. Grumley', pct: 14, value: '$8.2k' },
                      ].map((s) => (
                        <div class="demo-hbar-row">
                          <span class="demo-hbar-label">{s.label}</span>
                          <div class="demo-hbar-track"><div class="demo-hbar-fill" style={`width: ${s.pct}%;`}></div></div>
                          <span class="demo-hbar-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </PMCard>
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
                  <PMStats stats={[
                    { label: 'Properties', value: '4' },
                    { label: 'Active Jobs', value: '3', variant: 'sold' },
                    { label: 'Recurring Contracts', value: '1' },
                    { label: 'Avg. Job Value', value: '$29.1k' },
                  ]} />
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

                {/* ================= 6. Estimates =================
                    Real data-table treatment: 5 stat cards, search +
                    status/rep filters, a status-pill row, and an actual
                    <table> (Number/Customer/Title/Total/Status/Engagement/
                    Updated) — mirrors the real product's Estimates screen
                    instead of a bare ring + expandable list. */}
                <div data-demo-panel="estimates" hidden>
                  <PMTitleRow title="Estimates" sub="SAMPLE WORKSPACE · PROPOSALS OUT" />
                  <PMStatRow columns={5} stats={[
                    { label: 'Total Active', value: '4' },
                    { label: 'Awaiting Response', value: '2' },
                    { label: 'Accepted / Won', value: '1', variant: 'sold' },
                    { label: 'Drafts', value: '1' },
                    { label: 'Declined', value: '0' },
                  ]} />
                  <div class="demo-filter-bar">
                    <div class="pm-topbar search" style="flex: 1 1 200px; max-width: 240px; padding: 6px 10px;">
                      <Icon name="search" size={11} style="opacity: 0.6; margin-right: 5px; vertical-align: -2px;" />
                      <span style="font-size: 11.5px; color: var(--gw-ink-400);">Search estimates…</span>
                    </div>
                    <span class="demo-filter-select">Rep: All Reps</span>
                    <span class="demo-filter-select">Sort: Last Updated</span>
                  </div>
                  <div class="demo-pill-row">
                    <span class="demo-pill active" data-demo-pill data-demo-pill-filter="all">All</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="follow">Follow-up needed</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="viewed">Viewed</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="accepted">Accepted</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="draft">Draft</span>
                  </div>
                  <div class="demo-table-wrap">
                    <table class="demo-table">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Customer</th>
                          <th>Title / Service</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Engagement</th>
                          <th>Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { num: 'EST-1042', client: 'N. Knesley', title: 'Pool Coping Replacement', amount: '$58,200', tag: 'Sent', status: 'follow', variant: 'follow', tagLabel: 'Follow-up needed', engagement: 'Opened 3× · last Jul 4', updated: 'Jul 4', materials: '$31,400', labor: '$21,800', margin: '15%' },
                          { num: 'EST-1041', client: 'J. Grumley', title: 'Tree Removal', amount: '$8,200', tag: 'Draft', status: 'draft', variant: 'follow', tagLabel: 'Draft', engagement: 'Not yet sent', updated: 'Jul 2', materials: '$900', labor: '$5,200', margin: '25%' },
                          { num: 'EST-1039', client: 'V. Dhulipala', title: 'Backyard Redesign', amount: '$32,000', tag: 'Viewed', status: 'viewed', variant: 'website', tagLabel: 'Viewed', engagement: 'Opened 1× · Jun 30', updated: 'Jun 30', materials: '$18,600', labor: '$10,400', margin: '9%' },
                          { num: 'EST-1035', client: 'S. Lampard', title: 'Deck Lighting', amount: '$18,000', tag: 'Accepted', status: 'accepted', variant: 'rapport', tagLabel: 'Accepted', engagement: 'Signed Jun 24', updated: 'Jun 24', materials: '$9,200', labor: '$6,300', margin: '14%' },
                        ].map((e) => (
                          <>
                            <tr data-demo-table-row data-demo-status={e.status} data-demo-searchable={`${e.title.toLowerCase()} ${e.client.toLowerCase()} ${e.num.toLowerCase()}`}>
                              <td style="color: var(--gw-ink-500);">{e.num}</td>
                              <td class="demo-table-name">{e.client}</td>
                              <td>{e.title}</td>
                              <td style="font-weight: 700; color: var(--gw-ink-900);">{e.amount}</td>
                              <td><span class={`tag tag-${e.variant}`}>{e.tagLabel}</span></td>
                              <td style="color: var(--gw-ink-500);">{e.engagement}</td>
                              <td style="color: var(--gw-ink-500);">{e.updated}</td>
                            </tr>
                            <tr class="demo-table-detail-row hidden-row" data-demo-status={e.status}>
                              <td colspan={7}>
                                <div class="demo-table-detail-inner">Materials {e.materials} · Labor {e.labor} · Margin {e.margin} — priced from the same Budget &amp; Rates engine used company-wide.</div>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                  <div style="margin-bottom: 16px;">
                    <div class="demo-microlabel">$48.2k breakdown, by what's blocking it</div>
                    <div class="demo-stackbar">
                      <div class="demo-stackbar-seg" style="width: 45%; background: var(--gw-forest-600);">Needs an Invoice</div>
                      <div class="demo-stackbar-seg" style="width: 33%; background: var(--gw-amber-500);">Needs to be Paid</div>
                      <div class="demo-stackbar-seg" style="width: 15%; background: var(--gw-red-500);">Off</div>
                      <div class="demo-stackbar-seg" style="width: 7%; background: var(--gw-blue-500);">Call</div>
                    </div>
                    <div class="demo-stackbar-legend">
                      <span><span class="dot" style="background: var(--gw-forest-600);"></span>Needs an Invoice · $21.7k</span>
                      <span><span class="dot" style="background: var(--gw-amber-500);"></span>Needs to be Paid · $15.9k</span>
                      <span><span class="dot" style="background: var(--gw-red-500);"></span>Something's Off · $7.2k</span>
                      <span><span class="dot" style="background: var(--gw-blue-500);"></span>Needs Your Call · $3.4k</span>
                    </div>
                  </div>
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
                    <div class="demo-row-expand" data-demo-expand style="cursor: pointer;">
                      <div style="font-size: 11px; color: var(--gw-ink-500); margin-bottom: 6px;">$24.00/hr sticker wage &rarr; <strong style="color: var(--gw-ink-900);">$37.90/hr</strong> fully burdened — the number every estimate is actually priced against.</div>
                      <div class="demo-stackbar" style="height: 34px;">
                        <div class="demo-stackbar-seg" style="width: 63%; background: var(--gw-forest-700);">Base $24.00</div>
                        <div class="demo-stackbar-seg" style="width: 26%; background: var(--gw-forest-500);">Burden $9.80</div>
                        <div class="demo-stackbar-seg" style="width: 11%; background: var(--gw-clay-500);">Equip $4.10</div>
                      </div>
                      <div class="demo-row-detail" hidden>Base wage $24.00/hr + payroll tax/comp/benefits $9.80/hr + equipment allocation $4.10/hr = $37.90/hr fully burdened. This is the number every estimate on Cedar Grove's crews is priced against — not the $24.00 sticker wage.</div>
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
                  <div style="margin-bottom: 16px;">
                    <div class="demo-microlabel">$48.2k outstanding, by age</div>
                    <div class="demo-stackbar">
                      <div class="demo-stackbar-seg" style="width: 37%; background: var(--gw-forest-600);">0–30d</div>
                      <div class="demo-stackbar-seg" style="width: 46%; background: var(--gw-amber-500);">31–60d</div>
                      <div class="demo-stackbar-seg" style="width: 17%; background: var(--gw-red-500);">61–90d</div>
                    </div>
                  </div>
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

                {/* ================= 10. Schedule =================
                    Real calendar + crew view (not a stacked list) — mirrors
                    the actual product's week grid: crews as rows, days as
                    columns, job blocks in each cell. One cell is flagged as
                    a capacity conflict (double-booked crew) to demonstrate
                    the real feature described on /product/operations
                    ("capacity conflicts flagged inline"). Click any job
                    block to expand its dispatch note — reuses the generic
                    data-demo-expand handler already wired in site.js. */}
                <div data-demo-panel="schedule" hidden>
                  <PMTitleRow title="Schedule" sub="SAMPLE WORKSPACE · WEEK OF JULY 7 · CALENDAR + CREW VIEW" />
                  <PMStats stats={[
                    { label: 'Scheduled Hours', value: '146' },
                    { label: 'Crew Utilization', value: '91%', variant: 'sold' },
                    { label: 'Capacity Conflicts', value: '1', variant: 'overdue' },
                    { label: 'Active Crews', value: '3' },
                  ]} />
                  <div class="demo-schedule-toolbar">
                    <div class="demo-schedule-datenav">
                      <span class="demo-schedule-navbtn"><Icon name="arrow" size={11} style="transform: scaleX(-1);" /></span>
                      <span>Jul 7 – Jul 11, 2026</span>
                      <span class="demo-schedule-navbtn"><Icon name="arrow" size={11} /></span>
                      <span class="demo-schedule-todaybtn">Today</span>
                    </div>
                    <span class="demo-filter-spacer"></span>
                    <div class="demo-schedule-viewtoggle">
                      <span class="active">Week</span>
                      <span>Timeline</span>
                      <span>Month</span>
                      <span>Agenda</span>
                    </div>
                    <span class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px;">+ Job</span>
                  </div>
                  <div class="demo-crew-chips">
                    <span class="demo-crew-chip"><span class="dot" style="background: var(--gw-blue-500);"></span>Crew A · 2</span>
                    <span class="demo-crew-chip"><span class="dot" style="background: var(--gw-green-500);"></span>Crew B · 3</span>
                    <span class="demo-crew-chip"><span class="dot" style="background: var(--gw-clay-500);"></span>Crew C · 3</span>
                  </div>
                  <div class="demo-schedule-layout">
                    <div class="demo-jobpool">
                      <div class="demo-jobpool-head"><span>Job Pool</span><span>3</span></div>
                      {[
                        { name: 'M. Okafor', meta: 'Irrigation repair · unscheduled', prio: 'high' },
                        { name: 'Ferretti Cleanup', meta: 'Spring cleanup · needs crew', prio: 'normal' },
                        { name: 'Webb Fence Est.', meta: 'Site walk · tentative', prio: 'normal' },
                      ].map((j) => (
                        <div class="demo-jobpool-item">
                          <div class="name">{j.name}</div>
                          <div class="meta">{j.meta}</div>
                          <span class={`prio ${j.prio}`}>{j.prio === 'high' ? 'Needs Crew' : 'Tentative'}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                  {(() => {
                    const weekDays = [
                      { label: 'Mon', date: 'Jul 7' },
                      { label: 'Tue', date: 'Jul 8' },
                      { label: 'Wed', date: 'Jul 9' },
                      { label: 'Thu', date: 'Jul 10' },
                      { label: 'Fri', date: 'Jul 11' },
                    ]
                    const crews = [
                      { name: 'Crew A', color: 'var(--gw-blue-500)', meta: 'T. Reyes · 4 people · 38/40 hrs', jobs: [
                        { client: 'N. Knesley', job: 'Pool Coping', meta: 'Day 1 of 2', time: '7:00–3:30', note: 'Dispatched to Field Mode automatically at 6:30 AM. Foreman gets the route, checklist, and client notes on their phone.' },
                        { client: 'N. Knesley', job: 'Pool Coping', meta: 'Day 2 of 2', time: '7:00–3:30', note: 'Final day — grout, seal, and client walkthrough. Work order auto-closes once the checklist is complete.' },
                        null,
                        { client: 'R. Aleman', job: 'Full Landscape', meta: 'Phase 2 of 3', time: '7:00–4:00', note: 'Irrigation rough-in. Materials for phase 3 already staged based on the job\u2019s bill of materials.' },
                        { client: 'R. Aleman', job: 'Full Landscape', meta: 'Phase 3 of 3', time: '7:00–2:30', note: 'Planting + sod. Client walkthrough scheduled for 2:00 PM.' },
                      ]},
                      { name: 'Crew B', color: 'var(--gw-green-500)', meta: 'J. Alvarez · 5 people · 40/40 hrs', jobs: [
                        { client: 'Recurring Maint.', job: 'Route 1 · 6 stops', meta: null, time: '7:00–2:00', note: 'Weekly recurring route — set once, runs on autopilot until the client cancels or the season ends.' },
                        { client: 'Recurring Maint.', job: 'Route 1 · 6 stops', meta: null, time: '7:00–2:00', conflict: true, note: 'Capacity conflict: Crew B is also assigned an emergency irrigation callout at J. Grumley\u2019s from 1:30\u20133:00 PM today. Scheduling flags the overlap automatically \u2014 reassign a crew or push one job before Tuesday.' },
                        { client: 'Recurring Maint.', job: 'Route 1 · 6 stops', meta: null, time: '7:00–2:00', note: 'Weekly recurring route — set once, runs on autopilot until the client cancels or the season ends.' },
                        { client: 'Recurring Maint.', job: 'Route 2 · 5 stops', meta: null, time: '7:00–1:30', note: 'Bi-weekly route, second week of the cycle. Auto-invoices the morning after completion.' },
                        { client: 'Recurring Maint.', job: 'Route 2 · 5 stops', meta: null, time: '7:00–1:30', note: 'Bi-weekly route, second week of the cycle. Auto-invoices the morning after completion.' },
                      ]},
                      { name: 'Crew C', color: 'var(--gw-clay-500)', meta: 'D. Sokolov · 3 people · 34/40 hrs', jobs: [
                        null,
                        { client: 'D. Patel', job: 'Hardscape Install', meta: 'Day 1 of 3', time: '7:30–4:00', note: 'Skid steer delivered by 7:30 AM. Materials confirmed on-site the day before via the supplier integration.' },
                        { client: 'D. Patel', job: 'Hardscape Install', meta: 'Day 2 of 3', time: '7:30–4:00', note: 'Paver base + drainage. Weather flagged clear all day \u2014 no delay risk.' },
                        { client: 'S. Lampard', job: 'Deck Lighting', meta: 'Install day', time: '8:00–3:00', note: 'Single-day install. Client will receive an automatic \u201con our way\u201d text 30 minutes out.' },
                        { client: 'J. Grumley', job: 'Tree Removal', meta: 'Follow-up trim', time: '7:30–11:00', note: 'Short follow-up visit from last month\u2019s removal job \u2014 billed against the original estimate\u2019s punch list.' },
                      ]},
                    ]
                    return (
                      <div class="demo-schedule-grid demo-schedule-grid-wide" style="margin-bottom: 6px;">
                        <div class="demo-schedule-corner"></div>
                        {weekDays.map((d) => (
                          <div class="demo-schedule-daylabel">{d.label} <span>{d.date}</span></div>
                        ))}
                        {crews.map((crew) => (
                          <>
                            <div class="demo-schedule-crewlabel demo-schedule-crewlabel-wide" style={`border-left-color: ${crew.color};`}>
                              <span class="crew-name">{crew.name}</span>
                              <span class="crew-meta">{crew.meta}</span>
                            </div>
                            {crew.jobs.map((j, i) => (
                              j ? (
                                <div
                                  class={`demo-schedule-cell demo-row-expand${j.conflict ? ' conflict' : ''}`}
                                  data-demo-expand
                                  data-demo-searchable={`${j.client.toLowerCase()} ${j.job.toLowerCase()} ${crew.name.toLowerCase()}`}
                                >
                                  <div class="demo-schedule-job-title">{j.client}</div>
                                  <div class="demo-schedule-job-meta">{j.job}{j.meta ? ` · ${j.meta}` : ''}</div>
                                  <div class="demo-schedule-job-time">{j.time}</div>
                                  {j.conflict && <div class="demo-schedule-conflict-tag">⚠ Double-booked</div>}
                                  <div class="demo-row-detail" hidden>{j.note}</div>
                                </div>
                              ) : (
                                <div class="demo-schedule-cell off">Open</div>
                              )
                            ))}
                          </>
                        ))}
                      </div>
                    )
                  })()}
                  <div style="font-size: 11px; color: var(--gw-ink-400); margin-bottom: 4px;">Click any job to see its dispatch note. Real Groundwork lets you drag a block to reschedule it — this sample view is click-only.</div>
                    </div>
                  </div>
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
                  <PMCard heading="Today's Timeline" chip="7:00 AM – 4:00 PM window">
                    {[
                      { crew: 'Crew A', left: 0, width: 83.3, color: 'var(--gw-green-500)', label: 'Knesley · 7:00–3:30' },
                      { crew: 'Crew B', left: 0, width: 77.8, color: 'var(--gw-amber-500)', label: 'Maint. route · 7:00–2:00' },
                      { crew: 'Crew C', left: 5.6, width: 94.4, color: 'var(--gw-green-500)', label: 'Patel · 7:30–4:00' },
                    ].map((g) => (
                      <div class="demo-gantt-row">
                        <span class="demo-gantt-crew">{g.crew}</span>
                        <div class="demo-gantt-track">
                          <div class="demo-gantt-bar" style={`left: ${g.left}%; width: ${g.width - g.left}%; background: ${g.color};`}>{g.label}</div>
                        </div>
                      </div>
                    ))}
                    <div class="demo-gantt-axis"><span>7:00 AM</span><span>10:00 AM</span><span>1:00 PM</span><span>4:00 PM</span></div>
                  </PMCard>
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
                  <div class="demo-ring-wrap" style="background: var(--gw-cream-200); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
                    <div class="demo-ring-box">
                      <svg viewBox="0 0 66 66">
                        <circle cx="33" cy="33" r="27" fill="none" stroke="var(--gw-cream-300)" stroke-width="8" />
                        <circle cx="33" cy="33" r="27" fill="none" stroke="var(--gw-green-500)" stroke-width="8" stroke-linecap="round" stroke-dasharray="169.6" stroke-dashoffset="56" />
                      </svg>
                      <span class="demo-ring-num">67%</span>
                    </div>
                    <div class="demo-ring-caption">
                      <strong>4 of 6 checklist items complete</strong>
                      This work order auto-closes and rolls straight into the AAR review queue the moment the last box is checked.
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

                {/* ================= 13. Assets =================
                    Equipment/vehicle tracking table — stat cards, category
                    filter pills, and a real <table> (Asset/Category/
                    Assigned Crew/Status/Last Service/Next Service). */}
                <div data-demo-panel="assets" hidden>
                  <PMTitleRow title="Assets" sub="SAMPLE WORKSPACE · EQUIPMENT &amp; VEHICLES" />
                  <PMStatRow columns={4} stats={[
                    { label: 'Total Assets', value: '9' },
                    { label: 'In Use Today', value: '5', variant: 'sold' },
                    { label: 'Needs Service', value: '2', variant: 'overdue' },
                    { label: 'Out of Service', value: '0' },
                  ]} />
                  <div class="demo-pill-row">
                    <span class="demo-pill active" data-demo-pill data-demo-pill-filter="all">All</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="vehicle">Vehicles</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="equipment">Equipment</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="tool">Power Tools</span>
                  </div>
                  <div class="demo-table-wrap">
                    <table class="demo-table">
                      <thead>
                        <tr>
                          <th>Asset</th>
                          <th>Category</th>
                          <th>Assigned Crew</th>
                          <th>Status</th>
                          <th>Last Service</th>
                          <th>Next Service</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: '¾-Ton Dump Truck', tagline: 'Ford F-350 · Unit 04', cat: 'vehicle', catLabel: 'Vehicle', crew: 'Crew A', status: 'In Use', variant: 'rapport', last: 'Jun 2', next: 'Sep 2', detail: 'Oil change + brake inspection done Jun 2. Mileage 41,208 — next service due at 45,000 mi or Sep 2, whichever comes first.' },
                          { name: 'Skid Steer', tagline: 'Bobcat S650', cat: 'equipment', catLabel: 'Equipment', crew: 'Crew C', status: 'In Use', variant: 'rapport', last: 'May 20', next: 'Aug 20', detail: 'Hydraulic fluid + filter service last done May 20. 612 hours on the meter — quarterly service interval.' },
                          { name: 'Enclosed Trailer', tagline: '20ft · Unit 11', cat: 'vehicle', catLabel: 'Vehicle', crew: 'Crew B', status: 'In Use', variant: 'rapport', last: 'Apr 8', next: 'Oct 8', detail: 'Tire rotation + bearing pack Apr 8. Registration renews Nov 1.' },
                          { name: 'Stihl Chainsaw', tagline: 'MS 271 · Tag #14', cat: 'tool', catLabel: 'Power Tool', crew: 'Crew C', status: 'Needs Service', variant: 'follow', last: 'Mar 1', next: 'Overdue', detail: 'Chain sharpening + carb tune overdue by 3 weeks. Flagged after crew reported reduced cutting speed.' },
                          { name: 'Zero-Turn Mower', tagline: 'Exmark 60"', cat: 'equipment', catLabel: 'Equipment', crew: 'Crew B', status: 'In Use', variant: 'rapport', last: 'Jun 15', next: 'Sep 15', detail: 'Blade sharpening + deck cleaning Jun 15. 288 hours on the meter.' },
                          { name: '½-Ton Pickup', tagline: 'Ford F-150 · Unit 02', cat: 'vehicle', catLabel: 'Vehicle', crew: 'Unassigned', status: 'Available', variant: 'website', last: 'May 30', next: 'Aug 30', detail: 'Standard oil change interval. Currently parked at the yard — available for next dispatch.' },
                          { name: 'Backpack Blower', tagline: 'Echo PB-580T · Tag #22', cat: 'tool', catLabel: 'Power Tool', crew: 'Crew A', status: 'Needs Service', variant: 'follow', last: 'Feb 12', next: 'Overdue', detail: 'Carburetor cleaning overdue. Starting intermittently in cold mornings per crew report.' },
                          { name: 'Compact Excavator', tagline: 'Kubota KX040', cat: 'equipment', catLabel: 'Equipment', crew: 'Unassigned', status: 'Available', variant: 'website', last: 'Jun 1', next: 'Sep 1', detail: 'Undercarriage inspection Jun 1. Available for hardscape jobs starting next week.' },
                          { name: 'Utility Trailer', tagline: '12ft open · Unit 07', cat: 'vehicle', catLabel: 'Vehicle', crew: 'Crew A', status: 'In Use', variant: 'rapport', last: 'Apr 22', next: 'Oct 22', detail: 'Wheel bearing repack Apr 22. Hauling irrigation materials for the Knesley job this week.' },
                        ].map((a) => (
                          <>
                            <tr data-demo-table-row data-demo-status={a.cat} data-demo-searchable={`${a.name.toLowerCase()} ${a.tagline.toLowerCase()} ${a.crew.toLowerCase()}`}>
                              <td>
                                <div class="demo-table-name">{a.name}</div>
                                <div class="demo-table-sub">{a.tagline}</div>
                              </td>
                              <td style="color: var(--gw-ink-500);">{a.catLabel}</td>
                              <td style="color: var(--gw-ink-500);">{a.crew}</td>
                              <td><span class={`tag tag-${a.variant}`}>{a.status}</span></td>
                              <td style="color: var(--gw-ink-500);">{a.last}</td>
                              <td style={a.next === 'Overdue' ? 'color: var(--gw-red-500); font-weight: 700;' : 'color: var(--gw-ink-500);'}>{a.next}</td>
                            </tr>
                            <tr class="demo-table-detail-row hidden-row" data-demo-status={a.cat}>
                              <td colspan={6}><div class="demo-table-detail-inner">{a.detail}</div></td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <DemoGoto to="timetracker" label="See who's clocked in right now" />
                </div>

                {/* ================= 14. Time Tracker =================
                    Live clock-in timer (real, ticking JS clock) + week
                    summary table, per-crew hours. */}
                <div data-demo-panel="timetracker" hidden>
                  <PMTitleRow title="Time Tracker" sub="SAMPLE WORKSPACE · CLOCK IN / OUT" />
                  <div class="demo-clock-card">
                    <div>
                      <div class="demo-clock-time" data-demo-clock-time>00:00:00</div>
                      <div class="demo-clock-sub" data-demo-clock-sub>Clocked in · Pool Coping · N. Knesley</div>
                    </div>
                    <button type="button" class="demo-clock-btn running" data-demo-clock-btn>Clock Out</button>
                  </div>
                  <PMStatRow columns={4} stats={[
                    { label: 'Clocked In Now', value: '11' },
                    { label: "This Week's Hours", value: '146' },
                    { label: 'Overtime (wk)', value: '4', variant: 'overdue' },
                    { label: 'Active Crews', value: '3' },
                  ]} />
                  <PMCard heading="Week Summary · Jul 7–11" chip="By employee · click to expand daily breakdown">
                    {[
                      { name: 'Tyler Reyes', role: 'Foreman · Crew A', hours: '38.0 hrs', tag: 'On Track', variant: 'rapport', detail: 'Mon 7.5 · Tue 7.5 · Wed 7.5 · Thu 7.5 · Fri 8.0 — all shifts clocked in/out on time.' },
                      { name: 'Marcus Webb', role: 'Crew A', hours: '38.0 hrs', tag: 'On Track', variant: 'rapport', detail: 'Mon 7.5 · Tue 7.5 · Wed 7.5 · Thu 7.5 · Fri 8.0 — matches Tyler\u2019s shift on the Knesley job.' },
                      { name: 'Jasmine Alvarez', role: 'Foreman · Crew B', hours: '42.0 hrs', tag: '2.0 OT', variant: 'follow', detail: 'Recurring maintenance route ran long Wed due to a locked gate at stop 1 — 2 hrs of overtime flagged for payroll review.' },
                      { name: 'Priya Anand', role: 'Crew B', hours: '40.0 hrs', tag: 'On Track', variant: 'rapport', detail: 'Full 40-hour week across the two recurring maintenance routes.' },
                      { name: 'Dmitri Sokolov', role: 'Foreman · Crew C', hours: '34.0 hrs', tag: 'Under 40', variant: 'website', detail: 'Hardscape install wrapped early Thursday — no Friday job assigned yet.' },
                    ].map((e) => (
                      <div class="demo-row demo-row-expand" data-demo-expand data-demo-searchable={`${e.name.toLowerCase()} ${e.role.toLowerCase()}`}>
                        <div class="demo-row-main">
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="demo-avatar">{e.name.split(' ').map((n) => n[0]).join('')}</span>
                            <div><div style="font-size: 12.5px; font-weight: 600;">{e.name}</div><div class="demo-row-sub">{e.role}</div></div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="demo-row-value">{e.hours}</span>
                            <span class={`tag tag-${e.variant}`}>{e.tag}</span>
                          </div>
                        </div>
                        <div class="demo-row-detail" hidden>{e.detail}</div>
                      </div>
                    ))}
                  </PMCard>
                  <DemoGoto to="employees" label="See the full roster behind these hours" />
                </div>

                {/* ================= 15. Client Portal ================= */}
                <div data-demo-panel="clientportal" hidden>
                  <PMTitleRow title="Client Portal" sub="SAMPLE WORKSPACE · ADMIN · MANAGE ACCESS" />
                  <PMStats stats={[
                    { label: 'Active Users', value: '1', variant: 'sold' },
                    { label: 'Pending Invites', value: '1' },
                    { label: 'Disabled', value: '1', variant: 'overdue' },
                    { label: 'Logins (30d)', value: '9' },
                  ]} />
                  <PMCard heading="Portal Logins · Last 4 Weeks" chip="Client self-service, off your phone">
                    <div class="demo-vbars">
                      {[
                        { label: 'Wk 1', val: '2', h: 30 },
                        { label: 'Wk 2', val: '1', h: 15 },
                        { label: 'Wk 3', val: '3', h: 45 },
                        { label: 'Wk 4', val: '3', h: 45 },
                      ].map((w) => (
                        <div class="demo-vbar-col">
                          <span class="demo-vbar-val">{w.val}</span>
                          <div class="demo-vbar" style={`height: ${w.h}px;`}></div>
                          <span class="demo-vbar-label">{w.label}</span>
                        </div>
                      ))}
                    </div>
                  </PMCard>
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
                    <div style="display: grid; grid-template-columns: 1.3fr 1fr 1.6fr 0.8fr; gap: 6px;">
                      <span style="font-size: 9.5px; letter-spacing: 0.06em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 6px; border-bottom: 1px solid var(--gw-cream-300);">Event</span>
                      <span style="font-size: 9.5px; letter-spacing: 0.06em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 6px; border-bottom: 1px solid var(--gw-cream-300);">Actor</span>
                      <span style="font-size: 9.5px; letter-spacing: 0.06em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 6px; border-bottom: 1px solid var(--gw-cream-300);">Detail</span>
                      <span style="font-size: 9.5px; letter-spacing: 0.06em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 6px; border-bottom: 1px solid var(--gw-cream-300);">Date</span>
                      {[
                        { event: 'Login', actor: 'Nicole Knesley', detail: 'Portal home', date: 'Jul 6' },
                        { event: 'Invite sent', actor: 'Tyler', detail: 'D. Patel', date: 'Jul 3' },
                        { event: 'Access revoked', actor: 'Tyler', detail: 'R. Aleman', date: 'Jun 28' },
                      ].map((r, i) => (
                        <>
                          <span style={`font-size: 11px; padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.event}</span>
                          <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.actor}</span>
                          <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.detail}</span>
                          <span style={`font-size: 11px; color: var(--gw-ink-500); padding: 6px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>{r.date}</span>
                        </>
                      ))}
                    </div>
                  </PMCard>
                  <DemoGoto to="employees" label="See the team roster behind this workspace" />
                </div>

                {/* ================= 16. Employees & Teams =================
                    Roster table — roles, statuses, crew assignment, action
                    buttons. Mirrors the real product's Employees & Teams
                    screen (name/role/status/crew/actions columns). */}
                <div data-demo-panel="employees" hidden>
                  <PMTitleRow title="Employees & Teams" sub="SAMPLE WORKSPACE · ROSTER" />
                  <PMStatRow columns={4} stats={[
                    { label: 'Active Employees', value: '11' },
                    { label: 'Crews', value: '3' },
                    { label: 'On PTO', value: '1' },
                    { label: 'Open Roles', value: '1', variant: 'overdue' },
                  ]} />
                  <div class="demo-pill-row">
                    <span class="demo-pill active" data-demo-pill data-demo-pill-filter="all">All</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="foreman">Foremen</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="crew">Crew</span>
                    <span class="demo-pill" data-demo-pill data-demo-pill-filter="office">Office</span>
                  </div>
                  <div class="demo-table-wrap">
                    <table class="demo-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Crew</th>
                          <th>Status</th>
                          <th>Hire Date</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Tyler Reyes', role: 'Foreman', cat: 'foreman', crew: 'Crew A', status: 'Active', variant: 'rapport', hire: 'Mar 2022', detail: 'Leads Crew A. Certified for pool coping and hardscape installs. Direct line for client walkthroughs.' },
                          { name: 'Marcus Webb', role: 'Landscape Tech', cat: 'crew', crew: 'Crew A', status: 'Active', variant: 'rapport', hire: 'Jun 2023', detail: 'General labor + irrigation rough-in. Cross-trained on skid steer operation.' },
                          { name: 'Jasmine Alvarez', role: 'Foreman', cat: 'foreman', crew: 'Crew B', status: 'Active', variant: 'rapport', hire: 'Jan 2021', detail: 'Leads Crew B\u2019s recurring maintenance routes. Manages the weekly route schedule directly.' },
                          { name: 'Priya Anand', role: 'Maintenance Tech', cat: 'crew', crew: 'Crew B', status: 'Active', variant: 'rapport', hire: 'Aug 2024', detail: 'Runs Route 2 stops solo on Fridays. Recently certified on the new mower fleet.' },
                          { name: 'Dmitri Sokolov', role: 'Foreman', cat: 'foreman', crew: 'Crew C', status: 'Active', variant: 'rapport', hire: 'Nov 2020', detail: 'Leads Crew C\u2019s hardscape installs. Longest-tenured foreman on staff.' },
                          { name: 'Chloe Ferretti', role: 'Landscape Tech', cat: 'crew', crew: 'Crew C', status: 'On PTO', variant: 'follow', hire: 'Apr 2024', detail: 'Out through Jul 12 \u2014 approved vacation. Crew C is running one tech short until she\u2019s back.' },
                          { name: 'Nadia Chen', role: 'Office Manager', cat: 'office', crew: '\u2014', status: 'Active', variant: 'rapport', hire: 'Feb 2022', detail: 'Handles invoicing follow-up, client portal invites, and AAR review triage.' },
                          { name: 'Tyler', role: 'Owner / Admin', cat: 'office', crew: '\u2014', status: 'Active', variant: 'rapport', hire: 'Founder', detail: 'Full admin access \u2014 Budget & Rates, Client Portal, and Admin & Permissions.' },
                          { name: 'Open: Crew C Tech', role: 'Landscape Tech', cat: 'crew', crew: 'Crew C', status: 'Hiring', variant: 'overdue', hire: '\u2014', detail: 'Posted 2 weeks ago to cover Chloe\u2019s route load during peak season. 4 applicants in review.' },
                        ].map((e) => (
                          <>
                            <tr data-demo-table-row data-demo-status={e.cat} data-demo-searchable={`${e.name.toLowerCase()} ${e.role.toLowerCase()} ${e.crew.toLowerCase()}`}>
                              <td>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                  <span class="demo-avatar">{e.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                                  <span class="demo-table-name">{e.name}</span>
                                </div>
                              </td>
                              <td style="color: var(--gw-ink-500);">{e.role}</td>
                              <td style="color: var(--gw-ink-500);">{e.crew}</td>
                              <td><span class={`tag tag-${e.variant}`}>{e.status}</span></td>
                              <td style="color: var(--gw-ink-500);">{e.hire}</td>
                              <td style="text-align: right;"><span class="btn btn-secondary" style="padding: 3px 9px; font-size: 10px;">View</span></td>
                            </tr>
                            <tr class="demo-table-detail-row hidden-row" data-demo-status={e.cat}>
                              <td colspan={6}><div class="demo-table-detail-inner">{e.detail}</div></td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <DemoGoto to="aar" label="See what these crews report at end of day" />
                </div>

                {/* ================= 17. AAR Reviews ================= */}
                <div data-demo-panel="aar" hidden>
                  <PMTitleRow title="AAR Reviews" sub="SAMPLE WORKSPACE · OFFICE REVIEW QUEUE" />
                  <PMStats stats={[
                    { label: 'Submitted (7d)', value: '9' },
                    { label: 'Awaiting Review', value: '3' },
                    { label: 'Flagged Issues', value: '1', variant: 'overdue' },
                    { label: 'Same-Day Review Rate', value: '89%', variant: 'sold' },
                  ]} />
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
