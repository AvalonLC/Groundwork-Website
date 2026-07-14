import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { CTABand, FAQItem, SectionHead, SplitList, TestimonialCard } from '../components/Blocks'
import { PM, PMCard, PMMain, PMSectionLabel, PMSidebar, PMSidebarSimple, PMStats, PMTask, PMTitleRow } from '../components/ProductMock'

export function HomePage() {
  return (
    <Layout
      title="Groundwork CRM — The operating system for service businesses"
      description="Groundwork CRM runs sales, operations, financials, and daily execution for landscape, home service, and field service businesses — in one system."
      path="/"
    >
      {/* Hero */}
      <header class="hero" data-screen-label="Hero">
        <div class="hero-grid">
          <div class="hero-tag">
            <span class="pill">New</span>
            Field Mode + AI Assistant now live for every workspace
          </div>
          <h1>
            Run sales, operations, and&nbsp;the daily work of your business <em>in one place.</em>
          </h1>
          <p class="lede">
            Groundwork is the CRM built for service companies that actually run — landscape crews, home service
            teams, field operators. Give owners clarity, give teams direction, give crews a cleaner day.
          </p>
          <div class="hero-ctas">
            <Button href="/demo" variant="primary" arrow>
              Book a demo
            </Button>
            <Button href="/features" variant="secondary">
              See how it works
            </Button>
          </div>
          <div class="hero-meta">
            <span class="check">
              <svg class="ico" viewBox="0 0 24 24">
                <polyline points="4 12 10 18 20 6" />
              </svg>
              Live in 2–3 weeks
            </span>
            <span class="dot"></span>
            <span>Purpose-built for field &amp; service businesses</span>
            <span class="dot"></span>
            <span>Role-based access from owner to laborer</span>
          </div>

          {/* Hero product mock */}
          <div class="hero-mock">
            <div class="pm pm-lg">
              <PMSidebar />
              <PMMain>
                <div class="pm-topbar">
                  <div class="search">Search scripts, forms, stages, templates…</div>
                  <span class="new-btn">+ New</span>
                  <span style="opacity: 0.7;">Admin</span>
                </div>
                <PMTitleRow
                  title="Today"
                  sub="TYLER · TUESDAY, JULY 7"
                  actions={
                    <div style="display:flex; gap: 6px;">
                      <span style="background: var(--gw-forest-800); color: white; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                        + New Task
                      </span>
                      <span style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); padding: 5px 12px; border-radius: 5px; font-size: 11px; color: var(--gw-ink-700);">
                        + New Lead
                      </span>
                      <span style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); padding: 5px 12px; border-radius: 5px; font-size: 11px; color: var(--gw-ink-700);">
                        Pipeline
                      </span>
                    </div>
                  }
                />
                <PMStats
                  stats={[
                    { label: 'Open', value: '6' },
                    { label: 'Proposals', value: '4' },
                    { label: 'Overdue', value: '2', variant: 'overdue' },
                    { label: 'Sold', value: '3', variant: 'sold' },
                  ]}
                />
                <PMCard heading="My Tasks" chip="2 overdue · Add Task">
                  <PMSectionLabel label="Overdue (2)" />
                  <PMTask
                    title="Follow up with Nicole Knesley"
                    overdue
                    tags={[
                      { label: 'Follow-Up', variant: 'follow' },
                      { label: 'Jul 6, 2026', variant: 'overdue' },
                      { label: 'Nicole Knesley', variant: 'name' },
                    ]}
                  />
                  <PMTask
                    title="Follow up with Sydney Lampard"
                    overdue
                    tags={[
                      { label: 'Follow-Up', variant: 'follow' },
                      { label: 'Jul 6, 2026', variant: 'overdue' },
                      { label: 'Sydney Lampard', variant: 'name' },
                    ]}
                  />
                  <PMSectionLabel label="Upcoming" upcoming />
                  <PMTask
                    title="Follow up with Theresa McDermott"
                    done
                    tags={[
                      { label: 'Follow-Up', variant: 'follow' },
                      { label: 'Theresa McDermott', variant: 'name' },
                    ]}
                  />
                  <PMTask
                    title="Follow up with Pardha Karamsetty"
                    done
                    tags={[
                      { label: 'Follow-Up', variant: 'follow' },
                      { label: 'Pardha Karamsetty', variant: 'name' },
                    ]}
                  />
                  <PMTask
                    title="Post Site Visit Email"
                    tags={[
                      { label: 'Email', variant: 'email' },
                      { label: 'Nicole Knesley', variant: 'name' },
                    ]}
                  />
                  <PMTask
                    title="Follow up with Vijay Dhulipala"
                    tags={[
                      { label: 'Follow-Up', variant: 'follow' },
                      { label: 'Vijay Dhulipala', variant: 'name' },
                    ]}
                  />
                </PMCard>
              </PMMain>
            </div>
          </div>
        </div>
      </header>

      {/* Trust bar */}
      <section class="logostrip">
        <div class="wrap logostrip-inner">
          <div class="label">
            Trusted by service teams
            <br />
            across every trade
          </div>
          <div class="logos">
            <span class="logo-mark">
              <span class="sq"></span> Avalon Landscape
            </span>
            <span class="logo-mark">
              <span class="sq circle"></span> Northline HVAC
            </span>
            <span class="logo-mark">
              <span class="sq"></span> Cedar Grove Co.
            </span>
            <span class="logo-mark">
              <span class="sq circle"></span> Redwater Plumbing
            </span>
            <span class="logo-mark">
              <span class="sq"></span> Ridgeline Exteriors
            </span>
            <span class="logo-mark">
              <span class="sq circle"></span> Ironhouse Services
            </span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section class="section" data-screen-label="Problem">
        <div class="wrap">
          <SectionHead
            eyebrow="The problem"
            title={<>Your business runs on six tools that don't talk to each&nbsp;other.</>}
            lede="Sales lives in a spreadsheet. Scheduling lives in a whiteboard. Invoices live somewhere else. Crews find out what's happening by text message. Owners never see the whole picture until it's already a problem."
          />
          <div class="problems">
            <div class="problem-card">
              <div class="num">01</div>
              <h3>Owners can't see what's actually happening today.</h3>
              <p>
                Pipeline health, cash position, overdue follow-ups, jobs in progress — you shouldn't need three
                logins and a phone tree to know where you stand at 8am.
              </p>
            </div>
            <div class="problem-card">
              <div class="num">02</div>
              <h3>Sales reps chase leads out of memory.</h3>
              <p>
                Follow-ups slip. Stages get skipped. Estimates go out inconsistent. Deals that should have closed
                don't — not because the lead was bad, but because the process wasn't there.
              </p>
            </div>
            <div class="problem-card">
              <div class="num">03</div>
              <h3>Crews arrive to jobs missing context.</h3>
              <p>
                Foremen call the office. Laborers wait around. Scope changes never make it back to the file. Every
                gap between office and field costs you a real day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Groundwork is */}
      <section
        class="section"
        style="background: linear-gradient(180deg, transparent, rgba(20, 40, 30, 0.02));"
        data-screen-label="What"
      >
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">What Groundwork is</span>
            <h2 style="margin-top: 20px;">One connected system for the office, the sales floor, and the field.</h2>
            <p class="lede">
              Groundwork brings pipeline, follow-ups, scheduling, dispatch, field execution, invoices, and daily
              role-based dashboards into a single workspace. Every person on your team sees the same source of
              truth — filtered to what they actually need to do today.
            </p>
            <SplitList
              items={[
                { num: '1', title: 'Sales visibility', body: 'Every lead, every stage, every follow-up. Nothing slips through email.' },
                { num: '2', title: 'Operations awareness', body: 'Schedule, dispatch, work orders, recurring services, crew status — one screen.' },
                { num: '3', title: 'Financial clarity', body: 'Invoices, payments, deposits, statements — attached to the work that produced them.' },
                { num: '4', title: 'Role-based execution', body: 'Owner, office, sales, foreman, laborer — everyone lands in a view built for their day.' },
              ]}
            />
            <Button href="/product" variant="secondary" arrow>
              Explore the platform
            </Button>
          </div>

          {/* Lead detail mock */}
          <div class="pm" style="grid-template-columns: 1fr; min-height: 460px; box-shadow: var(--shadow-lg);">
            <PMMain style=" padding: 22px 24px;">
              <div style="display: flex; gap: 14px; align-items: flex-start; padding-bottom: 16px; border-bottom: 1px solid var(--gw-cream-300); margin-bottom: 18px;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--gw-forest-700); color: white; display: grid; place-items: center; font-weight: 600;">
                  NK
                </div>
                <div style="flex:1;">
                  <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; color: var(--gw-ink-900); letter-spacing: -0.01em;">
                    Nicole Knesley
                  </div>
                  <div style="font-size: 12px; color: var(--gw-ink-500); margin-top: 2px;">
                    Pool Coping and Pool Decking Replacement · Lorton, VA 22079
                  </div>
                  <div style="display: flex; gap: 6px; margin-top: 8px;">
                    <span class="tag tag-qual">Budget &amp; Investment Qualified</span>
                    <span class="tag tag-website">Website</span>
                  </div>
                </div>
                <div style="display: flex; gap: 6px;">
                  <span style="background: var(--gw-green-050); color: var(--gw-green-600); padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                    <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> Save
                  </span>
                  <span style="background: var(--gw-green-600); color: white; padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                    <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> Mark Sold
                  </span>
                </div>
              </div>

              {/* Pipeline stepper */}
              <div style="display: flex; gap: 4px; margin-bottom: 20px; padding: 6px 0;">
                {[
                  { label: 'Intake', state: 'done' },
                  { label: 'Agreement', state: 'done' },
                  { label: 'Discovery', state: 'done' },
                  { label: 'Budget', state: 'current', n: 4 },
                  { label: 'Decision', state: 'todo', n: 5 },
                  { label: 'Presentation', state: 'todo', n: 6 },
                  { label: 'Won', state: 'todo', n: 7 },
                ].map((s) => (
                  <div style="text-align:center; flex:1;">
                    {s.state === 'done' ? (
                      <div style="width:22px; height:22px; border-radius:50%; background: var(--gw-green-600); color: white; margin: 0 auto 6px; display: grid; place-items:center; font-size: 11px;">
                        <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" />
                      </div>
                    ) : s.state === 'current' ? (
                      <div style="width:22px; height:22px; border-radius:50%; background: var(--gw-forest-800); color: white; margin: 0 auto 6px; display: grid; place-items:center; font-size: 11px; box-shadow: 0 0 0 3px var(--gw-green-050);">
                        {s.n}
                      </div>
                    ) : (
                      <div style="width:22px; height:22px; border-radius:50%; background: var(--gw-cream-300); color: var(--gw-ink-400); margin: 0 auto 6px; display: grid; place-items:center; font-size: 11px;">
                        {s.n}
                      </div>
                    )}
                    <div
                      style={
                        s.state === 'current'
                          ? 'font-size: 10px; color: var(--gw-ink-900); font-weight: 600;'
                          : s.state === 'done'
                          ? 'font-size: 10px; color: var(--gw-ink-500);'
                          : 'font-size: 10px; color: var(--gw-ink-400);'
                      }
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                <div style="font-size: 11px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 10px;">
                  Contact &amp; Opportunity
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div>
                    <div style="font-size: 10px; color: var(--gw-ink-500); margin-bottom: 3px;">Client Name</div>
                    <div style="background: white; border: 1px solid var(--gw-cream-300); padding: 6px 10px; border-radius: 5px; font-size: 12px;">
                      Nicole Knesley
                    </div>
                  </div>
                  <div>
                    <div style="font-size: 10px; color: var(--gw-ink-500); margin-bottom: 3px;">Phone</div>
                    <div style="background: white; border: 1px solid var(--gw-cream-300); padding: 6px 10px; border-radius: 5px; font-size: 12px;">
                      (571) 451-4944
                    </div>
                  </div>
                  <div>
                    <div style="font-size: 10px; color: var(--gw-ink-500); margin-bottom: 3px;">Service Line</div>
                    <div style="background: white; border: 1px solid var(--gw-cream-300); padding: 6px 10px; border-radius: 5px; font-size: 12px;">
                      Landscape – Hardscape/Patio/Walls
                    </div>
                  </div>
                  <div>
                    <div style="font-size: 10px; color: var(--gw-ink-500); margin-bottom: 3px;">Lead Source</div>
                    <div style="background: white; border: 1px solid var(--gw-cream-300); padding: 6px 10px; border-radius: 5px; font-size: 12px;">
                      Website
                    </div>
                  </div>
                </div>
              </div>

              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 8px; padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-900);">
                    Next Follow-Up · <span style="color: var(--gw-red-500);">Jul 6 · Overdue</span>
                  </div>
                  <span style="background: var(--gw-green-600); color: white; padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                    Save Follow-Up
                  </span>
                </div>
                <div style="font-size: 12px; color: var(--gw-ink-500);">
                  Type: <span style="color: var(--gw-ink-900); font-weight: 500;">Email follow-up</span> · Note:{' '}
                  <span style="color: var(--gw-ink-900);">next steps</span>
                </div>
              </div>
            </PMMain>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section class="section" id="platform" data-screen-label="Pillars">
        <div class="wrap">
          <SectionHead
            eyebrow="The platform"
            title="Four surfaces. One connected system."
            lede="Groundwork is organized around how service businesses actually operate. Every module talks to the others — a lead in Sales becomes a job in Operations, an invoice in Financial, and a task on someone's day."
          />

          <div class="pillars">
            <div class="pillar">
              <div class="pillar-top">
                <div class="pillar-icon">S</div>
                <span class="pillar-eyebrow">Sales</span>
              </div>
              <h3>Pipeline, leads, and follow-ups that don't slip.</h3>
              <p>
                Stage-driven pipeline with built-in follow-up rhythm, discovery checklists, and estimate tracking.
                Reps stop working from memory.
              </p>
              <ul class="pillar-list">
                <li>Multi-stage pipeline with objection handling &amp; scripts</li>
                <li>Automated follow-up scheduling</li>
                <li>Client + property + opportunity records</li>
                <li>Estimates, proposals, and pricing tools</li>
              </ul>
              <div class="pillar-visual">
                <div style="display: flex; gap: 8px;">
                  <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px; flex:1;">
                    <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-400); text-transform: uppercase; margin-bottom: 4px;">
                      Open
                    </div>
                    <div style="font-family: var(--font-serif); font-size: 22px; color: var(--gw-ink-900);">42</div>
                  </div>
                  <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px; flex:1;">
                    <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-400); text-transform: uppercase; margin-bottom: 4px;">
                      Proposals
                    </div>
                    <div style="font-family: var(--font-serif); font-size: 22px; color: var(--gw-ink-900);">12</div>
                  </div>
                  <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px; flex:1;">
                    <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-400); text-transform: uppercase; margin-bottom: 4px;">
                      Sold MTD
                    </div>
                    <div style="font-family: var(--font-serif); font-size: 22px; color: var(--gw-green-500);">$186k</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pillar">
              <div class="pillar-top">
                <div class="pillar-icon">F</div>
                <span class="pillar-eyebrow">Financial</span>
              </div>
              <h3>See the money without opening the books.</h3>
              <p>
                Invoices, deposits, payments, and statements tied directly to jobs and clients. Owners get a
                snapshot; office teams get a system.
              </p>
              <ul class="pillar-list">
                <li>Invoices tied to jobs, estimates, and change orders</li>
                <li>Deposit + payment tracking</li>
                <li>Financial snapshot dashboard</li>
                <li>Statements &amp; activity ledger per client</li>
              </ul>
              <div class="pillar-visual">
                <div style="display: flex; gap: 8px;">
                  <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px; flex:1;">
                    <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-400); text-transform: uppercase; margin-bottom: 4px;">
                      Outstanding
                    </div>
                    <div style="font-family: var(--font-serif); font-size: 22px; color: var(--gw-ink-900);">$48,200</div>
                  </div>
                  <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px; flex:1;">
                    <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-400); text-transform: uppercase; margin-bottom: 4px;">
                      Deposits
                    </div>
                    <div style="font-family: var(--font-serif); font-size: 22px; color: var(--gw-green-500);">$24,900</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pillar">
              <div class="pillar-top">
                <div class="pillar-icon">O</div>
                <span class="pillar-eyebrow">Operations</span>
              </div>
              <h3>Schedule, dispatch, and work — connected.</h3>
              <p>
                Job scheduling, crew dispatch, work orders, recurring services, assets, tools, and time tracking —
                the operational nervous system for field teams.
              </p>
              <ul class="pillar-list">
                <li>Schedule + dispatch + recurring services</li>
                <li>Crew view &amp; work orders</li>
                <li>Assets, maintenance, inventory, tools</li>
                <li>Time tracker + timesheet review</li>
              </ul>
              <div class="pillar-visual">
                <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); border-radius: 6px; padding: 10px 12px;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--gw-ink-500); margin-bottom: 6px;">
                    <span>Crew A · Chapman Rd</span>
                    <span style="color: var(--gw-green-500); font-weight: 600;">On site</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--gw-ink-500); margin-bottom: 6px;">
                    <span>Crew B · Backyard install</span>
                    <span style="color: var(--gw-amber-500); font-weight: 600;">En route</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--gw-ink-500);">
                    <span>Crew C · Recurring maint.</span>
                    <span style="color: var(--gw-ink-500); font-weight: 600;">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pillar">
              <div class="pillar-top">
                <div class="pillar-icon">A</div>
                <span class="pillar-eyebrow">Admin &amp; Roles</span>
              </div>
              <h3>Give every person the view built for their job.</h3>
              <p>
                Granular roles &amp; permissions, integrations, templates, workflows, audit logs, and a client
                portal. Configure once, run everywhere.
              </p>
              <ul class="pillar-list">
                <li>Owner, Manager, Sales, Estimator, Field, View-only roles</li>
                <li>Access matrix at the screen level</li>
                <li>Templates, forms, checklists, automations</li>
                <li>Audit log &amp; approval queue</li>
              </ul>
              <div class="pillar-visual">
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  {[
                    { icon: 'key', label: 'Owner' },
                    { icon: 'clipboard', label: 'Office Manager' },
                    { icon: 'briefcase', label: 'Sales Rep' },
                    { icon: 'ruler', label: 'Estimator' },
                    { icon: 'hard-hat', label: 'Foreman' },
                    { icon: 'eye', label: 'View Only' },
                  ].map((r) => (
                    <span style="background: var(--gw-cream-100); border: 1px solid var(--gw-cream-300); padding: 5px 12px; border-radius: 5px; font-size: 11px; color: var(--gw-ink-700);">
                      <Icon name={r.icon} size={14} style="vertical-align:-2px; margin-right:6px;" />
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles tabs */}
      <section
        class="section"
        id="roles"
        style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);"
        data-screen-label="Roles"
      >
        <div class="wrap">
          <SectionHead
            eyebrow="Built for every role"
            title={<>Owner to laborer — everyone lands where they need&nbsp;to&nbsp;be.</>}
            lede="Groundwork is one system with five doors. Each role sees a workspace tuned to their job — same underlying data, different lens. Nobody digs through screens they don't need."
          />

          <div class="roles-tabs" role="tablist">
            <button class="roles-tab active" data-role="owner">
              <span class="emoji">
                <Icon name="key" size={18} />
              </span>{' '}
              Owner
            </button>
            <button class="roles-tab" data-role="office">
              <span class="emoji">
                <Icon name="clipboard" size={18} />
              </span>{' '}
              Office Manager
            </button>
            <button class="roles-tab" data-role="sales">
              <span class="emoji">
                <Icon name="briefcase" size={18} />
              </span>{' '}
              Sales Rep
            </button>
            <button class="roles-tab" data-role="foreman">
              <span class="emoji">
                <Icon name="hard-hat" size={18} />
              </span>{' '}
              Foreman
            </button>
            <button class="roles-tab" data-role="laborer">
              <span class="emoji">
                <Icon name="boot" size={18} />
              </span>{' '}
              Laborer
            </button>
          </div>

          {/* Owner panel */}
          <div class="role-panel" data-role-panel="owner">
            <div class="role-copy">
              <h3>Clarity, not spreadsheets.</h3>
              <p class="lede">
                Owners open Groundwork and see the state of the business in thirty seconds — pipeline, cash, jobs,
                team activity. No more piecing it together from three tools and a phone call.
              </p>
              <ul>
                <RoleCheckItem title="Business Pulse" body="Pipeline value, close rate, sold MTD, open proposals, at-risk deals — a single page." />
                <RoleCheckItem title="Financial Snapshot" body="Outstanding, deposits, cash in, cash out — the numbers you care about, in the language you use." />
                <RoleCheckItem title="Operations Snapshot" body="Crews out, jobs scheduled, work orders in progress, capacity vs. demand." />
                <RoleCheckItem title="Full access, no restrictions" body="See everything. Nothing hidden. No permissions to fight with." />
              </ul>
              <Button href="/demo" variant="secondary" arrow>
                See the owner view
              </Button>
            </div>
            <div class="pm" style="grid-template-columns: 1fr; min-height: 440px; box-shadow: var(--shadow-md);">
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
                <PMCard heading="Pipeline by Stage" chip="7 stages">
                  <div style="display: flex; align-items: flex-end; gap: 14px; height: 120px; padding: 12px 0;">
                    {[
                      { h: 40, label: 'Intake', color: 'var(--gw-forest-600)' },
                      { h: 72, label: 'Agreement', color: 'var(--gw-forest-600)' },
                      { h: 55, label: 'Discovery', color: 'var(--gw-forest-600)' },
                      { h: 88, label: 'Budget', color: 'var(--gw-green-500)', current: true },
                      { h: 45, label: 'Decision', color: 'var(--gw-forest-600)' },
                      { h: 30, label: 'Present', color: 'var(--gw-forest-600)' },
                      { h: 22, label: 'Won', color: 'var(--gw-clay-500)' },
                    ].map((b) => (
                      <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                        <div style={`width: 100%; height: ${b.h}%; background: ${b.color}; border-radius: 4px 4px 0 0;`}></div>
                        <span style={b.current ? 'font-size: 10px; color: var(--gw-ink-900); font-weight: 600;' : 'font-size: 10px; color: var(--gw-ink-500);'}>
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </PMCard>
              </PMMain>
            </div>
          </div>

          {/* Office panel */}
          <div class="role-panel" data-role-panel="office" style="display: none;">
            <div class="role-copy">
              <h3>Every follow-up. Every file. Every deposit.</h3>
              <p class="lede">
                Office managers keep the machine running. Groundwork gives them a full lateral view of every deal,
                every job, every invoice — plus the tools to nudge sales, chase payments, and clean up loose ends.
              </p>
              <ul>
                <RoleCheckItem title="Every lead, every rep" body="Cross-team pipeline view with follow-up state." />
                <RoleCheckItem title="Invoices & payments" body="Send, track, and reconcile without leaving the workspace." />
                <RoleCheckItem title="Templates & automations" body="Emails, forms, checklists, and drips — reusable, editable." />
                <RoleCheckItem title="Approvals & audit" body="Approve estimates, review changes, see who did what and when." />
              </ul>
              <Button href="/demo" variant="secondary" arrow>
                See the office view
              </Button>
            </div>
            <div class="pm" style="grid-template-columns: 1fr; min-height: 440px; box-shadow: var(--shadow-md);">
              <PMMain>
                <PMTitleRow title="All Follow-Ups" sub="OFFICE · 6 REPS" />
                <PMCard heading="This Week" chip="28 total">
                  <PMTask title="Nicole Knesley · Budget Qualified" tags={[{ label: 'Tyler', variant: 'name' }, { label: 'Overdue', variant: 'overdue' }]} />
                  <PMTask title="Sydney Lampard · Discovery" tags={[{ label: 'Marcus', variant: 'name' }, { label: 'Overdue', variant: 'overdue' }]} />
                  <PMTask title="Theresa McDermott · Agreement" done tags={[{ label: 'Tyler', variant: 'name' }]} />
                  <PMTask title="Vijay Dhulipala · Discovery Prep" tags={[{ label: 'Angela', variant: 'name' }]} />
                  <PMTask title="Julie Grumley · Send Proposal" tags={[{ label: 'Tyler', variant: 'name' }]} />
                  <PMTask title="Pardha Karamsetty · Follow-up email" tags={[{ label: 'Marcus', variant: 'name' }]} />
                </PMCard>
              </PMMain>
            </div>
          </div>

          {/* Sales panel */}
          <div class="role-panel" data-role-panel="sales" style="display: none;">
            <div class="role-copy">
              <h3>Work your pipeline. Not your inbox.</h3>
              <p class="lede">
                Sales reps get a daily sales start-up, their leads sorted by stage, a follow-up rhythm they can't
                miss, and every script or checklist they need mid-call.
              </p>
              <ul>
                <RoleCheckItem title="My Day, ranked" body="Overdue, today, upcoming — a queue built for the phone." />
                <RoleCheckItem title="Discovery + budget scripts" body="Sales resources attached to the stage you're in." />
                <RoleCheckItem title="Objection handling & pricing tools" body="Answers in hand before the call gets awkward." />
                <RoleCheckItem title="Estimates & proposals" body="Send from the lead. Track opens. Close the loop." />
              </ul>
              <Button href="/demo" variant="secondary" arrow>
                See the sales rep view
              </Button>
            </div>
            <div class="pm" style="grid-template-columns: 1fr; min-height: 440px; box-shadow: var(--shadow-md);">
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
                  <PMTask title="Review all open opportunities and follow-up dates" />
                  <PMTask title="Identify the top 3 priorities for today" />
                  <PMTask title="Check for any overdue follow-ups (7+ days no contact)" />
                  <PMTask title="Confirm all scheduled calls, site walks, meetings" />
                </PMCard>
              </PMMain>
            </div>
          </div>

          {/* Foreman panel */}
          <div class="role-panel" data-role-panel="foreman" style="display: none;">
            <div class="role-copy">
              <h3>Show up ready. Every job.</h3>
              <p class="lede">
                Foremen open Groundwork on their phone in the truck. Today's stops, crew assignments, scope, safety
                checklists, materials, and a clean way to log time and progress from the field.
              </p>
              <ul>
                <RoleCheckItem title="Today's route" body="Ordered stops with client, address, and job context." />
                <RoleCheckItem title="Scope + files at the property" body="Notes from sales, photos, plans, materials list." />
                <RoleCheckItem title="Crew & time tracking" body="Who's on site, when they clocked in, where they are now." />
                <RoleCheckItem title="Field Mode" body="A rugged mobile view designed for gloves, sun, and short attention." />
              </ul>
              <Button href="/demo" variant="secondary" arrow>
                See the foreman view
              </Button>
            </div>
            <div class="pm" style="grid-template-columns: 1fr; min-height: 440px; box-shadow: var(--shadow-md);">
              <PMMain dark>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px;">
                  <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500;">
                    Field Mode{' '}
                    <span style="font-family: var(--font-sans); font-size: 10.5px; color: #7CC9A3; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; margin-left: 12px;">
                      FOREMAN · JULY 7
                    </span>
                  </div>
                  <span style="background: var(--gw-green-500); color: white; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 500;">
                    ● Clocked in · 07:12
                  </span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  {[
                    { status: 'STOP 1 · IN PROGRESS', time: '08:00 – 11:30', title: 'Knesley Residence · Pool Coping Replacement', sub: '6005 Chapman Rd, Lorton VA · Crew A (4)', active: true },
                    { status: 'STOP 2 · SCHEDULED', time: '13:00 – 15:00', title: 'McDermott · Front Garden Bed', sub: 'Arlington VA · Crew A (2)' },
                    { status: 'STOP 3 · SCHEDULED', time: '15:30 – 17:00', title: 'Karamsetty · Backyard Tree Install', sub: 'Vienna VA · Crew A (4)' },
                  ].map((s) => (
                    <div
                      style={`background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px;${s.active ? ' border-left: 3px solid var(--gw-green-500);' : ''}`}
                    >
                      <div style="display: flex; justify-content: space-between; font-size: 11px; color: #93AFA1; margin-bottom: 6px;">
                        <span>{s.status}</span>
                        <span>{s.time}</span>
                      </div>
                      <div style="font-size: 15px; font-weight: 600; color: white; margin-bottom: 4px;">{s.title}</div>
                      <div style="font-size: 12px; color: #B7CFC1;">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </PMMain>
            </div>
          </div>

          {/* Laborer panel */}
          <div class="role-panel" data-role-panel="laborer" style="display: none;">
            <div class="role-copy">
              <h3>Clean handoff. Cleaner day.</h3>
              <p class="lede">
                Field crews don't need a CRM. They need to know where they're going, who they're with, what the job
                is, and when they're done. Groundwork gives them a distraction-free view built for that.
              </p>
              <ul>
                <RoleCheckItem title="Assigned stops only" body="No pipeline. No pricing. Just your work today." />
                <RoleCheckItem title="Clock in from the truck" body="Time tracker aware of the job you're on." />
                <RoleCheckItem title="Photos & sign-offs" body="Log before / after photos, mark the job done, move on." />
                <RoleCheckItem title="Read-only, always safe" body="You can't accidentally break anything." />
              </ul>
              <Button href="/demo" variant="secondary" arrow>
                See the crew view
              </Button>
            </div>
            <div class="pm" style="grid-template-columns: 1fr; min-height: 440px; box-shadow: var(--shadow-md);">
              <PMMain>
                <PMTitleRow title="My Work" sub="LABORER · DIEGO" />
                <PMCard heading="Today's Assignments" chip="3 stops">
                  {[
                    { n: 1, title: 'Knesley · Pool Coping', sub: 'Lorton VA · Crew A · Foreman: Miguel', status: 'On site', active: true },
                    { n: 2, title: 'McDermott · Front Garden', sub: 'Arlington VA · Crew A · 13:00', status: 'Scheduled' },
                    { n: 3, title: 'Karamsetty · Tree Install', sub: 'Vienna VA · Crew A · 15:30', status: 'Scheduled' },
                  ].map((s, i) => (
                    <div style={`display: flex; gap: 12px; align-items: center; padding: 12px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                      <div
                        style={`width: 40px; height: 40px; border-radius: 8px; background: ${s.active ? 'var(--gw-green-050)' : 'var(--gw-cream-200)'}; color: ${s.active ? 'var(--gw-forest-700)' : 'var(--gw-ink-500)'}; display: grid; place-items: center; font-family: var(--font-serif); font-size: 14px; font-weight: 600;`}
                      >
                        {s.n}
                      </div>
                      <div style="flex:1;">
                        <div style="font-weight: 600; font-size: 14px; color: var(--gw-ink-900);">{s.title}</div>
                        <div style="font-size: 12px; color: var(--gw-ink-500);">{s.sub}</div>
                      </div>
                      <span
                        style={`background: ${s.active ? 'var(--gw-green-050)' : 'var(--gw-cream-200)'}; color: ${s.active ? 'var(--gw-green-600)' : 'var(--gw-ink-500)'}; padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 500;`}
                      >
                        {s.status}
                      </span>
                    </div>
                  ))}
                </PMCard>
              </PMMain>
            </div>
          </div>
        </div>
      </section>

      {/* My Day spotlight */}
      <section class="section" data-screen-label="MyDay">
        <div class="wrap split" style="align-items: center;">
          <div>
            <div class="pm pm-lg" style="box-shadow: var(--shadow-lg);">
              <PMSidebarSimple
                items={[
                  [{ label: 'Today', active: true }, { label: 'My Dashboard' }, { label: 'Team View' }],
                  [{ label: 'Pipeline' }, { label: 'Leads' }, { label: 'Clients' }],
                ]}
              />
              <PMMain>
                <PMTitleRow title="Today" sub="TYLER · TUESDAY, JULY 7" />
                <PMStats
                  stats={[
                    { label: 'Open', value: '5' },
                    { label: 'Proposals', value: '0' },
                    { label: 'Overdue', value: '2', variant: 'overdue' },
                    { label: 'Sold', value: '0', variant: 'sold' },
                  ]}
                />
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                  <PMCard heading="Due Now" chip="2 follow-ups">
                    <div style="border-left: 3px solid var(--gw-red-500); padding: 8px 10px; background: rgba(178,58,58,0.04); border-radius: 4px; margin-bottom: 8px;">
                      <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 12.5px;">Nicole Knesley</div>
                        <span class="tag tag-red">OVERDUE</span>
                      </div>
                      <div style="font-size: 11px; color: var(--gw-ink-500); margin-top: 4px;">Pool Coping · Lorton VA · Next: Jul 6, 2026</div>
                    </div>
                    <div style="border-left: 3px solid var(--gw-red-500); padding: 8px 10px; background: rgba(178,58,58,0.04); border-radius: 4px;">
                      <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 12.5px;">Sydney Lampard</div>
                        <span class="tag tag-red">OVERDUE</span>
                      </div>
                      <div style="font-size: 11px; color: var(--gw-ink-500); margin-top: 4px;">Landscape / lighting · Arlington · Next: Jul 6</div>
                    </div>
                  </PMCard>
                  <PMCard heading="Recently Updated" chip="6 items">
                    <div style="padding: 6px 0; border-bottom: 1px solid var(--gw-cream-300); font-size: 12px;">
                      <div style="font-weight: 600; color: var(--gw-ink-900);">Nicole Knesley</div>
                      <div style="color: var(--gw-ink-500);">Pool Coping · Today</div>
                    </div>
                    <div style="padding: 6px 0; border-bottom: 1px solid var(--gw-cream-300); font-size: 12px;">
                      <div style="font-weight: 600; color: var(--gw-ink-900);">Vijay Dhulipala</div>
                      <div style="color: var(--gw-ink-500);">Backyard Hardscape · Yesterday</div>
                    </div>
                    <div style="padding: 6px 0; font-size: 12px;">
                      <div style="font-weight: 600; color: var(--gw-ink-900);">Theresa McDermott</div>
                      <div style="color: var(--gw-ink-500);">Front Garden · 4d ago</div>
                    </div>
                  </PMCard>
                </div>
              </PMMain>
            </div>
          </div>
          <div class="split-content">
            <span class="eyebrow">Feature spotlight</span>
            <h2 style="margin-top: 20px;">The My Day dashboard — the first thing your team opens.</h2>
            <p class="lede">
              Every user on Groundwork gets a personalized start-of-day view. It shows what's open, what's overdue,
              what's coming up, and what needs a decision — no reports to run, no dashboards to build.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Ranked by urgency, not date created', body: 'Overdue rises. Today gets attention. Coming Up stays visible without shouting.' },
                { num: '→', title: 'Daily Sales Start-Up checklist', body: 'A short, opinionated ritual for reps: review, prioritize, chase, log.' },
                { num: '→', title: 'Recently Updated stream', body: 'See what changed while you were out — deals, notes, follow-ups, sign-offs.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Bento */}
      <section class="section" data-screen-label="Features">
        <div class="wrap">
          <SectionHead
            eyebrow="Features"
            title="Built for how service businesses actually work."
            lede='Not a generic CRM with a "field service module." Groundwork is designed from the ground up around the work — sales, dispatch, invoicing, roles, and everything in between.'
          />
          <div class="bento">
            <div class="bento-card wide">
              <div class="b-icon">P</div>
              <h4>Multi-stage pipeline with follow-up rhythm</h4>
              <p>
                Stages that match how you actually sell. Follow-ups that don't slip. Scripts, objection handling, and
                pricing tools attached to the moment they matter.
              </p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" />
              </div>
              <h4>Discovery &amp; stage checklists</h4>
              <p>Every stage gets a checklist. Reps can't skip steps. Owners can see who's ready to advance.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">$</div>
              <h4>Estimates, proposals, and pricing</h4>
              <p>Estimate templates, pricing calculators, proposal generation, and status tracking.</p>
            </div>
            <div class="bento-card narrow dark">
              <div class="b-icon">AI</div>
              <h4>AI Assistant</h4>
              <p>Draft follow-up emails. Summarize a lead's history. Answer "what should I do next?" — in context.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="calendar" size={18} />
              </div>
              <h4>Schedule &amp; dispatch</h4>
              <p>Assign crews to properties, manage recurring services, and see the whole week at a glance.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="invoice" size={18} />
              </div>
              <h4>Invoices &amp; payments</h4>
              <p>Send invoices from a job. Track deposits, partial payments, and statements per client.</p>
            </div>
            <div class="bento-card wide">
              <div class="b-icon">
                <Icon name="lock" size={18} />
              </div>
              <h4>Roles &amp; permissions at the screen level</h4>
              <p>
                Owner, Management, Sales, Estimator, Field, View-only. Configure exactly which screens each role
                sees — or start from company defaults and customize per person.
              </p>
            </div>
            <div class="bento-card tiny">
              <div class="b-icon">
                <Icon name="file-text" size={18} />
              </div>
              <h4>Forms &amp; checklists</h4>
              <p>Custom forms, safety checklists, quality sign-offs — attached to properties and jobs.</p>
            </div>
            <div class="bento-card tiny">
              <div class="b-icon">
                <Icon name="refresh" size={18} />
              </div>
              <h4>Workflows &amp; automations</h4>
              <p>Trigger emails, tasks, and stage changes from events across the system.</p>
            </div>
            <div class="bento-card tiny">
              <div class="b-icon">
                <Icon name="smartphone" size={18} />
              </div>
              <h4>Field Mode &amp; mobile</h4>
              <p>Rugged mobile view for foremen. Read-only crew view for laborers.</p>
            </div>
            <div class="bento-card wide">
              <div class="b-icon">
                <Icon name="chart-bar" size={18} />
              </div>
              <h4>Reports across Revenue, Sales, Financial, Operations, and Team</h4>
              <p>Built-in reporting for the numbers owners actually track — no BI tool required. Export anything.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="bolt" size={18} />
              </div>
              <h4>Integrations</h4>
              <p>QuickBooks, Google Calendar, email, Twilio, Stripe, and an open API for the rest.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="home" size={18} />
              </div>
              <h4>Client portal</h4>
              <p>Give clients a clean view of their properties, jobs, proposals, and invoices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        class="section"
        style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);"
        data-screen-label="Testimonials"
      >
        <div class="wrap">
          <SectionHead
            eyebrow="What operators say"
            title="The tool people said they always wanted — finally built for their trade."
          />
          <div class="testimonials">
            <TestimonialCard
              quote="We replaced three tools and a very tired spreadsheet the first week. My sales manager can actually see the pipeline now — and I can see whether we'll hit the month before it's over."
              initials="MK"
              name="Marcus Kolar"
              role="Owner · Regional landscape company"
            />
            <TestimonialCard
              quote="Follow-ups don't slip anymore. That's the whole thing. Every rep opens the same daily view, works the queue, and closes deals we would have lost to silence."
              initials="AR"
              name="Angela Ruiz"
              role="Office Manager · Home services group"
            />
            <TestimonialCard
              quote='Field Mode is the first "office" software my foremen have actually used on their own. They open it in the truck, do the day, close it out. That was never happening before.'
              initials="DT"
              name="Derek Thompson"
              role="Operations Director · Multi-crew field service"
            />
          </div>
          <div class="tm-note">— Illustrative customer voice · Real testimonials to be added at launch</div>
        </div>
      </section>

      {/* Implementation */}
      <section class="section" data-screen-label="Implementation">
        <div class="wrap">
          <SectionHead
            eyebrow="Implementation"
            title="Live in 2–3 weeks. Not 2–3 quarters."
            lede="We migrate your existing data, configure Groundwork to your service lines and stages, train your team by role, and turn it on. No 90-day slog. No abandoned rollout."
          />
          <div class="steps">
            <div class="step">
              <div class="step-num">Week 1 — Scope</div>
              <h4>Discovery &amp; migration plan</h4>
              <p>We map your current tools, roles, pipeline stages, service lines, and data. You approve the setup plan.</p>
            </div>
            <div class="step">
              <div class="step-num">Week 1–2 — Build</div>
              <h4>Configuration &amp; data import</h4>
              <p>Roles, permissions, templates, pipeline, and existing clients / properties / open deals imported and cleaned.</p>
            </div>
            <div class="step">
              <div class="step-num">Week 2–3 — Train</div>
              <h4>Role-based training</h4>
              <p>Separate short sessions for owners, office, sales, and field. Everyone learns their view, not the whole app.</p>
            </div>
            <div class="step">
              <div class="step-num">Week 3 — Go live</div>
              <h4>Live &amp; supported</h4>
              <p>You go live with a dedicated implementation lead on call for the first 30 days. No abandoned rollout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA band */}
      <CTABand
        title={<>See <em>your business</em> running on Groundwork in 30 minutes.</>}
        description="Walk through the workspace with a specialist who knows your trade. No slides. We'll use your real workflow — sales, dispatch, invoicing — and show you exactly what changes."
        secondaryHref="/features"
        secondaryLabel="Explore the product"
        showLogin
        meta={
          <div style="color: #93AFA1; font-size: 12.5px; padding: 8px 4px 0; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 6px;">
            <div>
              <Icon name="clock" size={14} style="vertical-align:-2px; margin-right:6px;" />
              30-minute walkthrough
            </div>
            <div>
              <Icon name="email" size={14} style="vertical-align:-2px; margin-right:6px;" />
              Live with a Groundwork specialist
            </div>
            <div>
              <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> Tailored to your service lines
            </div>
          </div>
        }
      />

      {/* FAQ */}
      <section class="section" data-screen-label="FAQ">
        <div class="wrap">
          <SectionHead eyebrow="FAQ" title="Questions we hear from operators." center />
          <div class="faq">
            <FAQItem question="Is Groundwork built for a specific trade?" open>
              Groundwork is built for service businesses — landscape, home services, HVAC, plumbing, restoration,
              exteriors, and multi-service field operations. The stages, templates, and workflows are configurable
              to your service lines. It is not a general-purpose CRM re-marketed to contractors.
            </FAQItem>
            <FAQItem question="How does Groundwork handle multiple roles across office, sales, and field?">
              Roles &amp; permissions are configured at the screen level with an access matrix. Every role — Owner,
              Office Manager, Sales Rep, Estimator, Field, and View-Only — starts from a sensible company default and
              can be customized per person. Field crews get a distraction-free Field Mode designed for phones.
            </FAQItem>
            <FAQItem question="Can we import our existing clients, properties, and open deals?">
              Yes. Our implementation team handles data migration from your current CRM, spreadsheets, or scheduling
              tools. We map your existing pipeline into Groundwork's stages, clean the data, and hand you a working
              system with your history intact.
            </FAQItem>
            <FAQItem question="Does it integrate with QuickBooks and Google?">
              Yes — QuickBooks (Online), Google Calendar, Gmail, Stripe for payments, Twilio for SMS, and more. We
              also expose an open API for custom integrations.
            </FAQItem>
            <FAQItem question="What about the field crew? Do laborers need to learn a CRM?">
              No. Laborers and foremen get a purpose-built mobile view (Field Mode) that only shows today's assigned
              work, time tracking, and photo / sign-off capture. There's no pipeline, no pricing, no admin — just the
              job. Training a crew takes 15 minutes.
            </FAQItem>
            <FAQItem question="How long does implementation take?">
              Most teams go live in 2–3 weeks. That includes discovery, configuration, data migration, role-based
              training, and the first 30 days of dedicated support. We don't do 90-day rollouts.
            </FAQItem>
            <FAQItem question="How is Groundwork priced?">
              A <strong>plan</strong> (Core, Growth, Pro, Enterprise) sets which workspaces your company can use.
              Within it, <strong>seats</strong> are priced by role — Field / View-Only seats cost a fraction of full
              Sales or Admin seats. See{' '}
              <a href="/pricing" style="color: var(--gw-forest-700); text-decoration: underline;">
                pricing
              </a>
              , or a specialist will walk through it on the demo call.
            </FAQItem>
            <FAQItem question="Can I try Groundwork before committing?">
              Every prospect gets a 30-minute personalized walkthrough followed by a sandboxed pilot workspace loaded
              with your data. We don't do generic free trials — the value shows up when it's your business inside the
              system.
            </FAQItem>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section class="section" style="padding: 80px 0 40px;">
        <div class="wrap" style="text-align: center;">
          <span class="eyebrow" style="justify-content: center;">
            Ready when you are
          </span>
          <h2 style="margin: 24px auto; max-width: 20ch;">
            Give your business the operating system it should have had five years ago.
          </h2>
          <div style="display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap;">
            <Button href="/demo" variant="primary" arrow>
              Book a demo
            </Button>
            <Button href="/product" variant="secondary">
              Explore the platform
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function RoleCheckItem({ title, body }: { title: string; body: string }) {
  return (
    <li>
      <span class="check">
        <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" />
      </span>
      <div>
        <strong>{title}</strong>
        {body}
      </div>
    </li>
  )
}
