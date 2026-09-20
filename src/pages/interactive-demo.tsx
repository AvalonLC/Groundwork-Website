import { Layout } from '../components/Layout'
import { CTABand } from '../components/Blocks'
import { PM, PMSidebar, PMMain, PMTitleRow, PMStats, PMStatRow, PMCard } from '../components/ProductMock'
import { Icon } from '../components/Icon'

// Interactive Demo (/explore) — a click-around sample workspace.
// 100% client-side: four "stops" (Today, Pipeline, Money Loop, Groundwork AI)
// toggled via data-demo-* attributes and public/static/site.js. No backend,
// no persisted state, no login — resets on reload. Data is the same
// illustrative fictional cast used elsewhere on the site.
//
// Realism pass (2026-09-20): wraps the four panels in the real product
// shell — PMSidebar (clickable, jumps to the matching panel) + a
// functional topbar (live search filter across tasks/leads, a
// notification bell whose badge count reacts to what's been handled, a
// "Tyler" admin label matching the persona used on the homepage hero
// mock) — plus a persistent "stops explored" progress pips row and a
// short "AI thinking…" beat before the Coach reveals its suggested
// action. Still zero backend calls, zero persisted state.

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
      id: 'knesley',
      name: 'Nicole Knesley',
      sub: 'CLIENT · LORTON VA',
      phone: '(571) 451-4944',
      address: '6005 Chapman Rd, Lorton, VA 22079',
      ops: [
        { title: 'Pool Coping Replacement', meta: '$58,200', tag: 'Budget Qualified', variant: 'qual' },
        { title: 'Bi-weekly Maintenance', meta: '$340/visit', tag: 'Active', variant: 'rapport' },
      ],
      note: 'Budget conversation went well on the site walk — waiting on a follow-up call before the proposal goes out.',
    },
    {
      id: 'grumley',
      name: 'Julie Grumley',
      sub: 'CLIENT · FAIRFAX VA',
      phone: '(703) 288-1102',
      address: '412 Vale Ct, Fairfax, VA 22030',
      ops: [{ title: 'Tree Removal', meta: '$8,200', tag: 'Discovery', variant: 'website' }],
      note: 'First contact from a referral. Site walk scheduled — two dead oaks near the driveway.',
    },
    {
      id: 'dhulipala',
      name: 'Vijay Dhulipala',
      sub: 'CLIENT · VIENNA VA',
      phone: '(703) 552-9081',
      address: '88 Birchwood Ln, Vienna, VA 22180',
      ops: [{ title: 'Backyard Redesign', meta: '$32,000', tag: 'Discovery', variant: 'website' }],
      note: 'Full backyard redesign — patio, lighting, planting beds. Waiting on a second measurement visit.',
    },
    {
      id: 'lampard',
      name: 'Sydney Lampard',
      sub: 'CLIENT · ALEXANDRIA VA',
      phone: '(571) 902-7734',
      address: '19 Duke St, Alexandria, VA 22314',
      ops: [{ title: 'Deck Lighting', meta: '$18,000', tag: 'Decision Pending', variant: 'follow' }],
      note: 'Proposal sent 6 days ago. No response yet — this is the deal Groundwork AI is flagging as going quiet.',
    },
  ]

  const moneyRows = [
    { id: 'aleman', client: 'R. Aleman', job: 'Full landscape · job complete, not yet invoiced', tag: 'Needs an Invoice', variant: 'qual' },
    { id: 'patel', client: 'D. Patel', job: 'Hardscape · invoiced Jul 3, unpaid 12 days', tag: 'Needs to be Paid', variant: 'red' },
    { id: 'ozawa', client: 'L. Ozawa', job: "Maint. Contract · amount doesn't match estimate", tag: "Something's Off", variant: 'red' },
    { id: 'grumley2', client: 'J. Grumley', job: 'Tree Removal · 3 calls, no answer', tag: 'Needs Your Call', variant: 'follow' },
  ]

  const aiDeals = [
    {
      id: 'knesley-ai',
      name: 'Nicole Knesley',
      detail: 'Pool Coping · $58,200 · no contact 7 days',
      risk: '$58,200 at risk',
      action: 'Suggested action: a personal check-in call today — deals with no contact past 5 days lose 3x the close rate for every week they sit.',
    },
    {
      id: 'lampard-ai',
      name: 'Sydney Lampard',
      detail: 'Deck lighting · $18,000 · missed follow-up',
      risk: '$18,000 at risk',
      action: 'Suggested action: send the "still thinking it over?" template — reps who follow up within 24 hours of a stall recover 4 in 10 of these deals.',
    },
  ]

  return (
    <Layout
      title="Try Groundwork — Interactive Demo"
      description="Click around a sample Groundwork workspace — Today, Pipeline, Money Loop, and Groundwork AI — with example data. No signup required."
      path="/explore"
    >
      <section class="section subpage-hero" style="padding-bottom: 0;">
        <div class="wrap">
          <span class="eyebrow">Try it yourself</span>
          <h1 style="margin-top: 20px;">
            Click around a sample&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">Groundwork workspace.</em>
          </h1>
          <p class="lede">
            Four real workflows, loaded with example data — no signup, no waiting for a call. Click a task, open a
            lead, work the Money Loop list, and see what Groundwork AI catches before a deal goes cold.
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
              <span class="demo-progress-label">Sample workspace progress</span>
              <span class="demo-progress-pips">
                <span class="demo-pip active" data-demo-pip="today" title="Today"></span>
                <span class="demo-pip" data-demo-pip="pipeline" title="Pipeline"></span>
                <span class="demo-pip" data-demo-pip="money" title="Money Loop"></span>
                <span class="demo-pip" data-demo-pip="ai" title="Groundwork AI"></span>
              </span>
              <span class="demo-progress-count"><span data-demo-progress-count>1</span> of 4 stops explored</span>
            </div>

            <div class="demo-tabs">
              <button type="button" class="demo-tab active" data-demo-tab="today">
                <span class="demo-tab-num">1</span> Today
              </button>
              <button type="button" class="demo-tab" data-demo-tab="pipeline">
                <span class="demo-tab-num">2</span> Pipeline
              </button>
              <button type="button" class="demo-tab" data-demo-tab="money">
                <span class="demo-tab-num">3</span> Money Loop
              </button>
              <button type="button" class="demo-tab" data-demo-tab="ai">
                <span class="demo-tab-num">4</span> Groundwork AI
              </button>
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

                {/* ---- Stop 1: Today ---- */}
                <div data-demo-panel="today">
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
                    {tasks.map((t, i) => (
                      <div
                        class={`pm-task${t.overdue ? ' overdue' : ''}`}
                        data-demo-task
                        data-demo-searchable={t.title.toLowerCase()}
                        style={`cursor: pointer;${i === 0 ? '' : ''}`}
                      >
                        <span class="cb"></span>
                        <span class="tk-title">{t.title}</span>
                        <span class="tk-tags">
                          {t.tags.map((tag) => (
                            <span class={`tag tag-${tag.variant}`}>{tag.label}</span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </PMCard>
                  <div style="margin-top: 20px; text-align: right;">
                    <button type="button" class="btn btn-secondary" data-demo-next="pipeline">
                      See the Sales Pipeline <span class="arrow">→</span>
                    </button>
                  </div>
                </div>

                {/* ---- Stop 2: Pipeline ---- */}
                <div data-demo-panel="pipeline" hidden>
                  <PMTitleRow title="Pipeline" sub="SAMPLE WORKSPACE · SALES · CLICK A CARD" />
                  <div class="demo-workspace" style="min-height: 380px;">
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                      <div>
                        <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-forest-600); margin-bottom: 10px;">Discovery · 2</div>
                        <div class="demo-lead-card" data-demo-lead="grumley" data-demo-searchable="julie grumley tree removal" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">Julie Grumley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Tree Removal · $8.2k</div></div>
                        <div class="demo-lead-card" data-demo-lead="dhulipala" data-demo-searchable="vijay dhulipala backyard redesign" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Vijay Dhulipala</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Backyard · $32k</div></div>
                      </div>
                      <div>
                        <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-green-500); margin-bottom: 10px;">Budget · 1</div>
                        <div class="demo-lead-card" data-demo-lead="knesley" data-demo-searchable="nicole knesley pool coping" style="background: var(--gw-green-050); border: 1px solid #C5DDCC; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Nicole Knesley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Pool Coping · $58k</div><div style="margin-top: 4px;"><span class="tag tag-qual">Qualified</span></div></div>
                      </div>
                      <div>
                        <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-clay-500); margin-bottom: 10px;">Decision · 1</div>
                        <div class="demo-lead-card" data-demo-lead="lampard" data-demo-searchable="sydney lampard deck lighting" style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Sydney Lampard</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Deck lighting · $18k</div></div>
                      </div>
                      <div>
                        <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-forest-800); margin-bottom: 10px;">Won · 2</div>
                        <div data-demo-searchable="r. aleman full landscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">R. Aleman</div><div style="font-size: 10.5px; color: #B7CFC1;">Full landscape · $84k</div></div>
                        <div data-demo-searchable="d. patel hardscape" style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">D. Patel</div><div style="font-size: 10.5px; color: #B7CFC1;">Hardscape · $52k</div></div>
                      </div>
                    </div>

                    <div class="demo-slideover" data-demo-slideover>
                      <div class="demo-slideover-close" data-demo-slideover-close aria-label="Close">
                        <Icon name="x" size={13} />
                      </div>
                      {leadDetails.map((d) => (
                        <div data-lead-detail={d.id} hidden>
                          <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 2px;">{d.name}</div>
                          <div style="font-size: 10.5px; letter-spacing: 0.08em; color: var(--gw-ink-400); text-transform: uppercase; font-weight: 600; margin-bottom: 18px;">{d.sub}</div>
                          <div style="display: grid; gap: 10px; margin-bottom: 16px;">
                            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                              <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Contact</div>
                              <div style="font-size: 13px; font-weight: 600;">{d.name}</div>
                              <div style="font-size: 11px; color: var(--gw-ink-500);">{d.phone}</div>
                            </div>
                            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                              <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Property</div>
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
                  <div style="margin-top: 20px; text-align: right;">
                    <button type="button" class="btn btn-secondary" data-demo-next="money">
                      See Money Loop <span class="arrow">→</span>
                    </button>
                  </div>
                </div>

                {/* ---- Stop 3: Money Loop ---- */}
                <div data-demo-panel="money" hidden>
                  <PMTitleRow title="Money Loop" sub="SAMPLE WORKSPACE · OWNER VIEW" />
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
                  <PMCard heading="What Needs Doing" chip="Click an item to mark it handled">
                    {moneyRows.map((row, i) => (
                      <div
                        class="demo-money-row"
                        data-demo-handle
                        data-demo-searchable={`${row.client.toLowerCase()} ${row.job.toLowerCase()}`}
                        style={`display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer;${i < moneyRows.length - 1 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}
                      >
                        <div>
                          <div style="font-size: 12.5px; font-weight: 600;">{row.client}</div>
                          <div class="demo-money-job" style="font-size: 11px; color: var(--gw-ink-500);">{row.job}</div>
                        </div>
                        <span data-demo-handle-tag class={`tag tag-${row.variant}`}>{row.tag}</span>
                      </div>
                    ))}
                  </PMCard>
                  <div style="margin-top: 20px; text-align: right;">
                    <button type="button" class="btn btn-secondary" data-demo-next="ai">
                      See Groundwork AI <span class="arrow">→</span>
                    </button>
                  </div>
                </div>

                {/* ---- Stop 4: Groundwork AI ---- */}
                <div data-demo-panel="ai" hidden>
                  <PMTitleRow title="Groundwork AI" sub="SAMPLE WORKSPACE · OWNER-LEVEL COACH" />
                  <p style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 18px; max-width: 60ch;">
                    Groundwork AI sits as a slide-over on every screen. The Coach tab is the owner-level view — it
                    flags deals going quiet before they're lost, with a reason and a suggested next step.
                  </p>
                  <div style="background: var(--gw-forest-900); border-radius: var(--r-lg); overflow: hidden; max-width: 440px;">
                    <div style="display: flex; gap: 4px; padding: 12px 14px 0;">
                      {['Home', 'Suggestions', 'Coach', 'Setup', 'Chat'].map((t, i) => (
                        <span
                          class={i !== 2 ? 'demo-ai-tab' : undefined}
                          data-demo-ai-tab={i !== 2 ? t : undefined}
                          style={`font-size: 10px; letter-spacing: 0.04em; padding: 6px 9px; border-radius: 5px 5px 0 0; cursor: pointer; ${i === 2 ? 'background: rgba(255,255,255,0.08); color: white; font-weight: 600;' : 'color: #7A9788;'}`}
                        >{t}</span>
                      ))}
                    </div>
                    <div style="padding: 16px 18px 20px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <div style="font-size: 10px; letter-spacing: 0.1em; color: #7CC9A3; text-transform: uppercase; font-weight: 600; margin-bottom: 10px;">Coach · Deals going quiet · Click a card</div>
                      {aiDeals.map((d, i) => (
                        <div
                          class="demo-ai-card"
                          data-demo-ai-card
                          style={`background: rgba(255,255,255,0.05); border-left: 3px solid var(--gw-red-500); border-radius: 6px; padding: 10px 12px;${i < aiDeals.length - 1 ? ' margin-bottom: 8px;' : ''}`}
                        >
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
                </div>
              </PMMain>
            </PM>
            <div class="demo-toast" data-demo-toast></div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Like what you clicked through?"
        title={<>This was a sample. Let's load your&nbsp;<em>real pipeline.</em></>}
        description="A specialist will show the same four screens running on your actual leads, jobs, and numbers — 30 minutes, no slides."
        secondaryHref="/features"
        secondaryLabel="See all features"
      />
    </Layout>
  )
}
