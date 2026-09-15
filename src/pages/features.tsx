import { Layout } from '../components/Layout'
import { CTABand, SplitList } from '../components/Blocks'
import { PMMain, PMTitleRow, PMStats, PMStatRow, PMCard } from '../components/ProductMock'
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
              <PMTitleRow title="Money Loop" sub="OWNER VIEW · FY2026" />
              <div style="background: var(--gw-cream-200); border-radius: 10px; padding: 16px 18px; margin-bottom: 16px;">
                <div style="font-size: 11px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">How we're tracking</div>
                <div style="font-size: 12.5px; color: var(--gw-ink-700); margin-bottom: 10px;">
                  <strong style="font-family: var(--font-serif); font-size: 20px; color: var(--gw-ink-900);">83%</strong> of what it costs to keep the doors open this year
                </div>
                <div style="height: 9px; background: var(--gw-cream-300); border-radius: 5px; overflow: hidden;">
                  <div style="width: 83%; height: 100%; background: linear-gradient(90deg, var(--gw-forest-600), var(--gw-green-500));"></div>
                </div>
              </div>
              <PMStatRow
                columns={5}
                stats={[
                  { label: 'Money to Collect', value: '$48.2k' },
                  { label: 'Needs an Invoice', value: '5' },
                  { label: 'Needs to be Paid', value: '9', variant: 'overdue' },
                  { label: "Something's Off", value: '2', variant: 'overdue' },
                  { label: 'Needs Your Call', value: '3' },
                ]}
              />
              <PMCard heading="What Needs Doing" chip="19 items">
                {[
                  { client: 'R. Aleman', job: 'Full landscape · job complete, not yet invoiced', tag: 'Needs an Invoice', variant: 'qual' },
                  { client: 'D. Patel', job: 'Hardscape · invoiced Jul 3, unpaid 12 days', tag: 'Needs to be Paid', variant: 'red' },
                  { client: 'L. Ozawa', job: 'Maint. Contract · amount doesn\'t match estimate', tag: "Something's Off", variant: 'red' },
                  { client: 'J. Grumley', job: 'Tree Removal · 3 calls, no answer', tag: 'Needs Your Call', variant: 'follow' },
                ].map((row, i) => (
                  <div style={`display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 8px 0;${i < 3 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <div>
                      <div style="font-size: 12.5px; font-weight: 600;">{row.client}</div>
                      <div style="font-size: 11px; color: var(--gw-ink-500);">{row.job}</div>
                    </div>
                    <span class={`tag tag-${row.variant}`}>{row.tag}</span>
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
            <h2>See the money — and what it costs — without opening the books.</h2>
            <p class="lede">
              Invoices, deposits, payments, and statements — all tied to the client, property, and job that generated
              them. Money Loop turns overhead recovery into one plain-language number; Budget &amp; Rates runs the
              burdened-cost math underneath every price you charge.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Money Loop', body: "Overhead-coverage percentage — how much of this year's cost of doing business is covered so far." },
                { num: '→', title: 'Budget & Rates', body: 'Burdened labor, equipment, and overhead-pool costing, with immutable rate history.' },
                { num: '→', title: 'Invoices & Payments', body: 'Send, track, reconcile — partial payments and deposits included.' },
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
                    { label: 'Command Center', access: [true, true, true, true] },
                    { label: 'Pipeline', access: [true, true, false, false] },
                    { label: 'Money Loop', access: [true, false, false, false] },
                    { label: 'Budget & Rates', access: [true, false, true, false] },
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
                { num: '→', title: 'Client Portal', body: "Invite clients to a scoped, read-only portal. Staff manage access and can preview a client's exact view." },
                { num: '→', title: 'AAR Template builder', body: 'Configure the end-of-day field report question set — Yes/No, text, rating, checklist, dropdown.' },
                { num: '→', title: 'Approval queue & audit log', body: 'Approve estimates, flag anomalies, see who changed what.' },
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
              connect the two without asking either side to change how they work — and Groundwork AI sits on top
              of all three, on every screen.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
            {[
              { letter: 'M', title: 'My Day', body: 'Personal daily view — open, overdue, upcoming, and a daily start-up checklist. Every role gets one, tuned to their work.' },
              { letter: 'T', title: 'Team View', body: "Managers see every rep's day, every crew's status, every follow-up state — one screen, no reports." },
              { letter: 'F', title: 'Field Mode', body: 'Rugged mobile-first view for foremen and crews. Route, scope, clock, photos, After Action Report. Nothing else.' },
              { letter: 'AI', title: 'Groundwork AI', body: 'A slide-over assistant on every screen — Home, Suggestions, an owner-level Coach that flags at-risk deals, Setup, and free-text Chat that already knows the page you\'re on.' },
            ].map((c) => (
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-lg); padding: 32px;">
                <div style="width: 32px; height: 32px; border-radius: 7px; background: var(--gw-forest-700); color: var(--gw-green-100); display: grid; place-items: center; font-weight: 700; margin-bottom: 18px;">{c.letter}</div>
                <h3 style="color: var(--gw-cream-100); font-family: var(--font-serif); font-weight: 500; margin-bottom: 12px;">{c.title}</h3>
                <p style="color: #B7CFC1; font-size: 15px;">{c.body}</p>
              </div>
            ))}
          </div>

          <div style="margin-top: 40px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--r-lg); overflow: hidden; max-width: 420px; margin-left: auto; margin-right: 0;">
            <div style="display: flex; gap: 4px; padding: 12px 14px 0;">
              {['Home', 'Suggestions', 'Coach', 'Setup', 'Chat'].map((t, i) => (
                <span style={`font-size: 10px; letter-spacing: 0.04em; padding: 6px 9px; border-radius: 5px 5px 0 0; ${i === 2 ? 'background: rgba(255,255,255,0.08); color: white; font-weight: 600;' : 'color: #7A9788;'}`}>{t}</span>
              ))}
            </div>
            <div style="padding: 16px 18px 20px; border-top: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 10px; letter-spacing: 0.1em; color: #7CC9A3; text-transform: uppercase; font-weight: 600; margin-bottom: 10px;">Coach · Deals going quiet</div>
              {[
                { name: 'Nicole Knesley', detail: 'Pool Coping · $58,200 · no contact 7 days', risk: '$58,200 at risk' },
                { name: 'Sydney Lampard', detail: 'Deck lighting · $18,000 · missed follow-up', risk: '$18,000 at risk' },
              ].map((d, i) => (
                <div style={`background: rgba(255,255,255,0.05); border-left: 3px solid var(--gw-red-500); border-radius: 6px; padding: 10px 12px;${i < 1 ? ' margin-bottom: 8px;' : ''}`}>
                  <div style="font-size: 12.5px; font-weight: 600; color: white; margin-bottom: 2px;">{d.name}</div>
                  <div style="font-size: 11px; color: #B7CFC1; margin-bottom: 4px;">{d.detail}</div>
                  <div style="font-size: 10.5px; color: #F0A8A0; font-weight: 600;">{d.risk}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready to see it live?"
        title={<>Walk the platform with a specialist who <em>knows your trade.</em></>}
        description="30 minutes, your workflow, no slides."
        secondaryHref="/trades"
        secondaryLabel="See it for my industry"
      />
    </Layout>
  )
}
