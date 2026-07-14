import { Layout } from '../components/Layout'
import { CTABand, SplitList } from '../components/Blocks'
import { PMMain, PMTitleRow, PMStats, PMCard } from '../components/ProductMock'
import { AccessMatrix } from '../components/Matrix'
import { Icon } from '../components/Icon'

function PillarIcon({ letter }: { letter: string }) {
  return (
    <div style="width: 32px; height: 32px; border-radius: 7px; background: var(--gw-forest-800); color: var(--gw-green-100); display: grid; place-items: center; font-weight: 700; font-size: 14px;">
      {letter}
    </div>
  )
}

export function FeaturesPage() {
  const salesColumns = [
    { title: 'Discovery · 8', border: 'var(--gw-forest-600)', cards: [
      { name: 'Julie Grumley', sub: 'Tree Removal · $8.2k' },
      { name: 'Vijay Dhulipala', sub: 'Backyard · $32k' },
      { name: 'Pardha Karamsetty', sub: 'Tree Install · $14k' },
    ] },
    { title: 'Budget · 4', border: 'var(--gw-green-500)', cards: [
      { name: 'Nicole Knesley', sub: 'Pool Coping · $58k', tag: 'Qualified' },
      { name: 'T. McDermott', sub: 'Front Garden · $22k' },
    ] },
    { title: 'Decision · 3', border: 'var(--gw-clay-500)', cards: [
      { name: 'S. Lampard', sub: 'Deck lighting · $18k' },
      { name: 'M. Fernández', sub: 'Patio walls · $46k' },
    ] },
    { title: 'Won · 12', border: 'var(--gw-forest-800)', dark: true, cards: [
      { name: 'R. Aleman', sub: 'Full landscape · $84k' },
      { name: 'D. Patel', sub: 'Hardscape · $52k' },
    ] },
  ]

  return (
    <Layout
      title="Platform — Groundwork CRM"
      description="Explore Groundwork CRM's platform — Sales, Financial, Operations, Admin, and Field workflows in one connected system."
      path="/features"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">The platform</span>
          <h1 style="margin-top: 20px;">Every surface your business runs on. <em style="font-style: italic; color: var(--gw-forest-700);">One system.</em></h1>
          <p class="lede">
            Groundwork is organized around how service businesses actually operate — Sales, Financial, Operations,
            Admin, and Field. Each surface is deep enough to stand alone. Together, they eliminate the seams.
          </p>
          <div style="display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap;">
            <a href="#sales" class="btn btn-light">Sales</a>
            <a href="#financial" class="btn btn-light">Financial</a>
            <a href="#operations" class="btn btn-light">Operations</a>
            <a href="#admin" class="btn btn-light">Admin &amp; Roles</a>
            <a href="#field" class="btn btn-light">Field &amp; Dashboards</a>
          </div>
        </div>
      </section>

      {/* SALES */}
      <section class="section" id="sales" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line);">
        <div class="wrap split">
          <div class="split-content">
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
              <PillarIcon letter="S" />
              <span class="eyebrow" style="margin: 0;">Sales</span>
            </div>
            <h2>The pipeline is the product.</h2>
            <p class="lede">
              Every lead in Groundwork moves through stages you configure — Intake, Agreement, Discovery, Budget,
              Decision, Presentation, Won, On Hold. Every stage has a follow-up rhythm, checklists, scripts, and
              pricing tools attached.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Pipeline & Leads', body: 'Stage-driven view with follow-up urgency indicators.' },
                { num: '→', title: 'Clients & Properties', body: 'Every client tied to every property they own. Every property tied to every service.' },
                { num: '→', title: 'Communications & Automations', body: 'Email, SMS, and drip campaigns from inside the deal.' },
                { num: '→', title: 'Sales Process Resources', body: 'Scripts, forms, checklists, objection handling, pricing tools, email templates, Groundwork Academy.' },
                { num: '→', title: 'Estimates & Proposals', body: 'Generate, send, track — with amount, sent date, and status.' },
              ]}
            />
          </div>
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 500px;">
            <main class="pm-main">
              <PMTitleRow title="Pipeline" sub="SALES · Q3 2026" />
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                {salesColumns.map((col) => (
                  <div>
                    <div style={`font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid ${col.border}; margin-bottom: 10px;`}>
                      {col.title}
                    </div>
                    {col.cards.map((card, i) => (
                      <div style={`background: ${col.dark ? 'var(--gw-forest-800)' : card.tag ? 'var(--gw-green-050)' : 'var(--gw-cream-200)'};${card.tag ? ' border: 1px solid #C5DDCC;' : ''} color: ${col.dark ? 'white' : 'inherit'}; border-radius: 6px; padding: 10px;${i < col.cards.length - 1 ? ' margin-bottom: 6px;' : ''}`}>
                        <div style="font-size: 12px; font-weight: 600;">{card.name}</div>
                        <div style={`font-size: 10.5px; color: ${col.dark ? '#B7CFC1' : 'var(--gw-ink-500)'};`}>{card.sub}</div>
                        {card.tag && <div style="margin-top: 4px;"><span class="tag tag-qual">{card.tag}</span></div>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* FINANCIAL */}
      <section class="section" id="financial">
        <div class="wrap split">
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 460px;">
            <PMMain>
              <PMTitleRow title="Financial Snapshot" sub="OWNER VIEW" />
              <PMStats
                stats={[
                  { label: 'Outstanding', value: '$48.2k' },
                  { label: 'Deposits MTD', value: '$24.9k', variant: 'sold' },
                  { label: 'Invoiced MTD', value: '$142k' },
                  { label: 'Past Due 30+', value: '$8.1k', variant: 'overdue' },
                ]}
              />
              <PMCard heading="Recent Invoices" chip="14 items">
                <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.7fr; gap: 8px; font-size: 10px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 1px solid var(--gw-cream-300); margin-bottom: 6px;">
                  <span>Client</span><span>Job</span><span>Amount</span><span>Status</span>
                </div>
                {[
                  { client: 'R. Aleman', job: 'Full landscape', amount: '$84,000', tag: 'Paid', variant: 'rapport' },
                  { client: 'D. Patel', job: 'Hardscape', amount: '$52,000', tag: 'Deposit', variant: 'qual' },
                  { client: 'L. Ozawa', job: 'Maint. Contract', amount: '$1,200', tag: 'Past due', variant: 'red' },
                  { client: 'J. Grumley', job: 'Tree Removal', amount: '$8,200', tag: 'Sent', variant: 'website' },
                ].map((row, i) => (
                  <div style={`display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.7fr; gap: 8px; font-size: 12px; padding: 8px 0;${i < 3 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <span style="font-weight:600;">{row.client}</span>
                    <span style="color: var(--gw-ink-500);">{row.job}</span>
                    <span>{row.amount}</span>
                    <span><span class={`tag tag-${row.variant}`}>{row.tag}</span></span>
                  </div>
                ))}
              </PMCard>
            </PMMain>
          </div>
          <div class="split-content">
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
              <PillarIcon letter="F" />
              <span class="eyebrow" style="margin: 0;">Financial</span>
            </div>
            <h2>See the money without opening the books.</h2>
            <p class="lede">
              Invoices, deposits, payments, and statements — all tied to the client, property, and job that generated
              them. Groundwork isn't your accounting system, but it's the operational layer that keeps your accounting
              system honest.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Financial Overview', body: 'Outstanding, deposits, invoiced, past-due, month-over-month.' },
                { num: '→', title: 'Invoices & Payments', body: 'Send, track, reconcile — partial payments and deposits included.' },
                { num: '→', title: 'Deposits & Statements', body: 'Per-client statements. Deposit ledger. Activity trail.' },
                { num: '→', title: 'QuickBooks Online sync', body: 'Two-way sync of clients, invoices, and payments.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section class="section" id="operations" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap split">
          <div class="split-content">
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
              <PillarIcon letter="O" />
              <span class="eyebrow" style="margin: 0;">Operations</span>
            </div>
            <h2>The nervous system for field teams.</h2>
            <p class="lede">
              Schedule the week. Dispatch the crews. Manage recurring services. Track work orders, assets, maintenance,
              inventory, tools, and time. Operations in Groundwork isn't an afterthought — it's half the system.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Schedule & Dispatch', body: 'Calendar view, crew assignments, drag-to-reschedule.' },
                { num: '→', title: 'Recurring Services', body: 'Maintenance contracts and seasonal work that runs itself.' },
                { num: '→', title: 'Work Orders & Crew View', body: 'Every scheduled job with scope, crew, and status.' },
                { num: '→', title: 'Assets, Maintenance, Inventory, Tools', body: 'Track equipment, service intervals, and material usage.' },
                { num: '→', title: 'Time Tracker & Timesheet Review', body: 'Clock in / out from the truck. Approve at the office.' },
              ]}
            />
          </div>
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 500px;">
            <PMMain>
              <PMTitleRow title="Dispatch" sub="WEEK OF JULY 7" />
              <div style="display: grid; grid-template-columns: 60px repeat(5, 1fr); gap: 4px; font-size: 10px;">
                <div></div>
                {['MON 7', 'TUE 8', 'WED 9', 'THU 10', 'FRI 11'].map((d) => (
                  <div style="text-align:center; color: var(--gw-ink-500); font-weight: 600; padding: 6px 0;">{d}</div>
                ))}
                {[
                  { name: 'Crew A', jobs: [
                    { label: 'Knesley · Pool', bg: 'var(--gw-forest-800)' },
                    { label: 'Knesley cont.', bg: 'var(--gw-forest-800)' },
                    { label: 'McDermott · Garden', bg: 'var(--gw-green-500)' },
                    { label: 'McDermott cont.', bg: 'var(--gw-green-500)' },
                    { label: 'Karamsetty · Tree', bg: 'var(--gw-clay-500)' },
                  ] },
                  { name: 'Crew B', jobs: [
                    { label: 'Maint · 6 accounts', dashed: true },
                    { label: 'Maint · 5 accounts', dashed: true },
                    { label: 'Aleman · Landscape', bg: 'var(--gw-forest-800)' },
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
                ].map((crew) => (
                  <>
                    <div style="color: var(--gw-ink-500); padding: 4px;">{crew.name}</div>
                    {crew.jobs.map((j) =>
                      j.dashed ? (
                        <div style="background: var(--gw-cream-200); border: 1px dashed var(--gw-line); border-radius: 4px; padding: 6px 8px; font-size: 10.5px; color: var(--gw-ink-500);">{j.label}</div>
                      ) : (
                        <div style={`background: ${j.bg}; color: white; border-radius: 4px; padding: 6px 8px; font-size: 10.5px;`}>{j.label}</div>
                      )
                    )}
                  </>
                ))}
              </div>
              <div class="pm-card" style="margin-top: 16px;">
                <div class="pm-card-h">In Progress Now <span class="chip">3 crews</span></div>
                {[
                  { crew: 'Crew A', label: 'Knesley · Pool Coping', status: '● On site 07:12', color: 'var(--gw-green-500)' },
                  { crew: 'Crew B', label: 'Recurring maint. · 6 stops', status: '● En route', color: 'var(--gw-amber-500)' },
                  { crew: 'Crew C', label: 'Patel · Hardscape', status: '● On site 07:45', color: 'var(--gw-green-500)' },
                ].map((row, i) => (
                  <div style={`display: flex; justify-content: space-between; padding: 6px 0; font-size: 12.5px;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <span><strong>{row.crew}</strong> · {row.label}</span>
                    <span style={`color: ${row.color}; font-weight: 600;`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </PMMain>
          </div>
        </div>
      </section>

      {/* ADMIN */}
      <section class="section" id="admin">
        <div class="wrap split">
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 500px;">
            <PMMain>
              <PMTitleRow title="Roles & Permissions" sub="● LIVE" />
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 16px;">
                {[
                  { icon: 'key', label: 'Owner', views: 'Full access' },
                  { icon: 'clipboard', label: 'Management', views: '43 views' },
                  { icon: 'briefcase', label: 'Sales', views: '21 views' },
                  { icon: 'ruler', label: 'Estimator', views: '7 views' },
                  { icon: 'eye', label: 'View Only', views: '4 views' },
                ].map((r) => (
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px; text-align: center;">
                    <div style="font-size: 16px; margin-bottom: 4px;"><Icon name={r.icon} size={18} /></div>
                    <div style="font-size: 10px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">{r.label}</div>
                    <div style="font-size: 11px; font-weight: 600;">{r.views}</div>
                  </div>
                ))}
              </div>
              <div class="pm-card">
                <div class="pm-card-h">View Access Matrix <span class="chip">Screen level</span></div>
                <AccessMatrix
                  columns={['Office', 'Sales', 'Estimator', 'View']}
                  rows={[
                    { label: 'Today', access: [true, true, true, true] },
                    { label: 'My Dashboard', access: [true, true, false, false] },
                    { label: 'Pipeline', access: [true, true, false, false] },
                    { label: 'Financial Overview', access: [true, false, false, false] },
                    { label: 'Schedule', access: [true, true, true, true] },
                    { label: 'Admin Settings', access: [true, false, false, false] },
                  ]}
                />
              </div>
            </PMMain>
          </div>
          <div class="split-content">
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
              <PillarIcon letter="A" />
              <span class="eyebrow" style="margin: 0;">Admin &amp; Roles</span>
            </div>
            <h2>Configure once. Run everywhere.</h2>
            <p class="lede">
              The most under-rated feature in Groundwork is its permission model. Every screen in the platform is
              individually assignable to roles. Start from a sensible company default, then customize per person.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Six default roles', body: 'Owner, Management, Sales, Estimator, Field, View-only — configurable.' },
                { num: '→', title: 'Screen-level access matrix', body: 'Grant Pipeline but not Financial. Grant Reports but not Payments.' },
                { num: '→', title: 'Templates & automations', body: 'Reusable email templates, checklists, forms, and drip campaigns.' },
                { num: '→', title: 'Approval queue & audit log', body: 'Approve estimates, flag anomalies, see who changed what.' },
                { num: '→', title: 'Client portal & Field Mode', body: 'External access for clients. Rugged internal access for crews.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* FIELD / DASHBOARDS */}
      <section class="section" id="field" style="background: var(--gw-forest-900); color: var(--gw-cream-100); border-top: 1px solid rgba(255,255,255,0.06);">
        <div class="wrap">
          <div class="section-head" style="max-width: 720px;">
            <span class="eyebrow" style="color: #7CC9A3;">Field &amp; Daily Dashboards</span>
            <h2 style="color: var(--gw-cream-100); margin-top: 20px;">The bridge between the office and the truck.</h2>
            <p class="lede" style="color: #B7CFC1;">
              The office runs on desktops. The field runs on phones. Groundwork's My Day, Team View, and Field Mode
              connect the two without asking either side to change how they work.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            {[
              { letter: 'M', title: 'My Day', body: 'Personal daily view — open, overdue, upcoming, and a daily start-up checklist. Every role gets one, tuned to their work.' },
              { letter: 'T', title: 'Team View', body: "Managers see every rep's day, every crew's status, every follow-up state — one screen, no reports." },
              { letter: 'F', title: 'Field Mode', body: 'Rugged mobile-first view for foremen and crews. Route, scope, clock, photos, sign-off. Nothing else.' },
            ].map((c) => (
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-lg); padding: 32px;">
                <div style="width: 32px; height: 32px; border-radius: 7px; background: var(--gw-forest-700); color: var(--gw-green-100); display: grid; place-items: center; font-weight: 700; margin-bottom: 18px;">{c.letter}</div>
                <h3 style="color: var(--gw-cream-100); font-family: var(--font-serif); font-weight: 500; margin-bottom: 12px;">{c.title}</h3>
                <p style="color: #B7CFC1; font-size: 15px;">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready to see it live?"
        title={<>Walk the platform with a specialist who <em>knows your trade.</em></>}
        description="30 minutes, your workflow, no slides."
        secondaryHref="/solutions"
        secondaryLabel="See it for my industry"
      />
    </Layout>
  )
}
