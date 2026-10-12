import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { CTABand, FAQItem, SectionHead, TestimonialCard } from '../components/Blocks'
import { PM, PMCard, PMMain, PMSectionLabel, PMSidebar, PMSidebarSimple, PMStats, PMTask, PMTitleRow } from '../components/ProductMock'

export function HomePage() {
  return (
    <Layout
      title="Groundwork CRM — The operating system for service businesses"
      description="Groundwork CRM runs sales, operations, financials, and daily execution for landscape, home service, and field service businesses — in one system."
      path="/"
    >
      {/* Hero — tightened to one clear idea (run the business in one
          place) and two CTAs instead of three, both built around getting
          a visitor into /explore fast: the hero tag is itself a link to
          it, "Try the live demo" leads the button row, and the whole
          product mock below is wrapped as a clickable link into it too.
          Mobile swaps that dense desktop mock for a short, dedicated
          explore card instead of a scaled-down (and still scroll-heavy)
          copy of it — the thing this page previously failed to do. */}
      <header class="hero" data-screen-label="Hero">
        <div class="hero-grid">
          <a href="/explore" class="hero-tag hero-tag-link">
            <span class="pill">Live</span>
            Click around the real app — no signup
            <Icon name="arrow" size={12} />
          </a>
          <h1>
            Run your service business <em>in one place,</em> not six.
          </h1>
          <p class="lede">
            Sales, scheduling, dispatch, invoicing, and the daily work of your crew — one connected system built for
            landscape, home service, and field teams.
          </p>
          <div class="hero-ctas">
            <Button href="/explore" variant="primary" arrow>
              Try the live demo
            </Button>
            <Button href="/demo" variant="secondary">
              Book a call
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
            <span>Role-based views from owner to laborer</span>
          </div>

          {/* Mobile-only: a short, dedicated card that does what the full
              dashboard mock below never did on a phone — put the live
              demo one tap away instead of several scroll-screens down a
              worded page. Hidden on desktop (see .hero-mobile-explore in
              styles.css), where the clickable mock below does this job. */}
          <a href="/explore" class="hero-mobile-explore">
            <span class="hero-mobile-explore-icon">
              <Icon name="sparkle" size={18} />
            </span>
            <span class="hero-mobile-explore-text">
              <strong>Try it yourself — no signup</strong>
              <span>Tap into a real, clickable Groundwork workspace</span>
            </span>
            <Icon name="arrow" size={16} />
          </a>

          {/* Hero product mock — now a link straight into /explore, with a
              badge calling out that it's the real app, not a screenshot. */}
          <a href="/explore" class="hero-mock-link" aria-label="Open the live interactive demo">
          <div class="hero-mock">
            <span class="hero-mock-badge">
              <Icon name="sparkle" size={13} />
              This is the real app — click to try it
            </span>
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
          </a>
        </div>
      </header>

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

      {/* Platform — consolidated "What Groundwork is" + "Pillars" + "Roles"
          into one section. Rationale: the old page pitched the same
          four-part story (Sales/Financial/Operations/Admin) three times in a
          row (What → Pillars → Features) and separately ran a 5-tab Roles
          section right after Pillars — on mobile nobody tapped the role
          tabs, so three of four pillars and four of five roles went unseen
          by anyone who didn't scroll-and-tap exhaustively. Now: one eyebrow/
          headline/lede, then four <details> "pillar rows" (Sales, Financial,
          Operations, Admin & Roles) — each a one-line always-visible summary
          that expands in place to a short list + a cropped product snippet.
          Role-specific content folds into the Admin & Roles row with a link
          out to /roles for full depth. Sales starts open so the pattern is
          obvious; see bindPillarRows() in site.js for one-open-at-a-time. */}
      <section class="section platform-section" id="platform" data-screen-label="Platform">
        <div class="wrap">
          <SectionHead
            eyebrow="The platform"
            title="Four surfaces. One connected system."
            lede="Groundwork is organized around how service businesses actually operate. Every module talks to the others — a lead in Sales becomes a job in Operations, an invoice in Financial, and a task on someone's day."
          />

          <div class="pillars-compact" data-pillar-group>
            <details class="pillar-row" data-pillar-row open>
              <summary>
                <span class="pillar-row-icon">S</span>
                <span class="pillar-row-head">
                  <strong>Sales</strong>
                  <span>Pipeline, leads, and follow-ups that don't slip.</span>
                </span>
                <span class="pillar-row-chevron">
                  <Icon name="arrow" size={14} />
                </span>
              </summary>
              <div class="pillar-row-body">
                <ul class="pillar-row-list">
                  <li>Multi-stage pipeline with objection handling &amp; scripts</li>
                  <li>Automated follow-up scheduling</li>
                  <li>Estimates, proposals, and pricing tools</li>
                </ul>
                <div class="pillar-row-snip">
                  <div class="snip-card">
                    <div class="snip-row">
                      <span class="snip-label">Budget</span>
                      <span class="snip-badge">Stage 4 of 7</span>
                    </div>
                    <div class="snip-value" style="font-size: 15px;">Nicole Knesley</div>
                    <div class="snip-sub">Pool Coping · Lorton, VA</div>
                  </div>
                </div>
              </div>
            </details>

            <details class="pillar-row" data-pillar-row>
              <summary>
                <span class="pillar-row-icon">F</span>
                <span class="pillar-row-head">
                  <strong>Financial</strong>
                  <span>See the money — and what it costs you — at a glance.</span>
                </span>
                <span class="pillar-row-chevron">
                  <Icon name="arrow" size={14} />
                </span>
              </summary>
              <div class="pillar-row-body">
                <ul class="pillar-row-list">
                  <li>Invoices tied to jobs, estimates, and change orders</li>
                  <li>Money Loop — overhead-coverage &amp; cash-health dashboard</li>
                  <li>Budget &amp; Rates — burdened labor, equipment &amp; overhead costing</li>
                </ul>
                <div class="pillar-row-snip">
                  <div class="snip-card">
                    <div class="snip-row">
                      <span class="snip-label">Overhead covered</span>
                      <span class="snip-value" style="color: var(--gw-green-500);">83%</span>
                    </div>
                    <div class="snip-row">
                      <span class="snip-label">Outstanding</span>
                      <span class="snip-value">$48,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details class="pillar-row" data-pillar-row>
              <summary>
                <span class="pillar-row-icon">O</span>
                <span class="pillar-row-head">
                  <strong>Operations</strong>
                  <span>Schedule, dispatch, and work — connected.</span>
                </span>
                <span class="pillar-row-chevron">
                  <Icon name="arrow" size={14} />
                </span>
              </summary>
              <div class="pillar-row-body">
                <ul class="pillar-row-list">
                  <li>Schedule + dispatch + recurring services</li>
                  <li>Crew view, work orders &amp; time tracking</li>
                  <li>Assets, maintenance, inventory, tools</li>
                </ul>
                <div class="pillar-row-snip">
                  <div class="snip-card">
                    <div class="snip-row">
                      <span class="snip-label">Crew A · Chapman Rd</span>
                      <span class="snip-value" style="font-size: 11px; color: var(--gw-green-500);">On site</span>
                    </div>
                    <div class="snip-row">
                      <span class="snip-label">Crew B · Backyard install</span>
                      <span class="snip-value" style="font-size: 11px; color: var(--gw-amber-500);">En route</span>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details class="pillar-row" data-pillar-row>
              <summary>
                <span class="pillar-row-icon">A</span>
                <span class="pillar-row-head">
                  <strong>Admin &amp; Roles</strong>
                  <span>Give every person the view built for their job.</span>
                </span>
                <span class="pillar-row-chevron">
                  <Icon name="arrow" size={14} />
                </span>
              </summary>
              <div class="pillar-row-body">
                <p class="pillar-row-para">
                  One system with five doors — Owner, Office Manager, Sales Rep, Foreman, and Laborer all see the
                  same data through a workspace tuned to their job.
                </p>
                <div class="pillar-role-chips">
                  {[
                    { icon: 'key', label: 'Owner' },
                    { icon: 'clipboard', label: 'Office Manager' },
                    { icon: 'briefcase', label: 'Sales Rep' },
                    { icon: 'hard-hat', label: 'Foreman' },
                    { icon: 'boot', label: 'Laborer' },
                  ].map((r) => (
                    <span class="pillar-role-chip">
                      <Icon name={r.icon} size={14} style="vertical-align:-2px; margin-right:6px;" />
                      {r.label}
                    </span>
                  ))}
                </div>
                <ul class="pillar-row-list">
                  <li>Access matrix at the screen level, role by role</li>
                  <li>Client Portal — invite, activity log, preview as client</li>
                </ul>
                <Button href="/roles" variant="secondary" arrow>
                  See every role's view
                </Button>
              </div>
            </details>
          </div>

          <div style="text-align: center; margin-top: 28px;">
            <Button href="/product" variant="secondary" arrow>
              Explore the full platform
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials — moved up to directly follow the consolidated
          Platform section so social proof lands right after the pitch,
          before the scroll-fatigue drop-off point. */}
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

      {/* My Day — redesigned as a full-bleed dark band instead of another
          eyebrow/serif-h2/cream-card split, to break the page's repeating
          visual formula per the redesign brief. Beats replace SplitList;
          the PM mock is unchanged. */}
      <section class="section myday-band" data-screen-label="MyDay">
        <div class="wrap">
          <div class="myday-head">
            <span class="eyebrow">Feature spotlight</span>
            <h2>The My Day dashboard — the first thing your team opens.</h2>
            <p class="lede">Every user gets a personalized start-of-day view: what's open, overdue, and next.</p>
          </div>
          <div class="myday-beats">
            <div class="myday-beat">
              <Icon name="trending" size={18} />
              <div>
                <strong>Ranked by urgency</strong>
                <span>Overdue rises. Today gets attention.</span>
              </div>
            </div>
            <div class="myday-beat">
              <Icon name="check" size={18} />
              <div>
                <strong>Daily Sales Start-Up</strong>
                <span>A short, opinionated ritual: review, prioritize, chase, log.</span>
              </div>
            </div>
            <div class="myday-beat">
              <Icon name="refresh" size={18} />
              <div>
                <strong>Recently Updated stream</strong>
                <span>See what changed while you were out.</span>
              </div>
            </div>
          </div>
          <div class="myday-mock">
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
        </div>
      </section>

      {/* Features — trimmed from 12 bento cards to 6, keeping only
          capability NOT already covered by a Platform pillar above (cut:
          pipeline, discovery checklists, estimates/pricing, scheduling,
          invoices, roles & permissions, client portal — all now implied by
          the Sales/Operations/Financial/Admin pillars). */}
      <section class="section" data-screen-label="Features">
        <div class="wrap">
          <SectionHead
            eyebrow="Features"
            title="And everything that's not just a pipeline with a paint job."
            lede="Capability that goes beyond the four core surfaces above."
          />
          <div class="bento bento-tight">
            <div class="bento-card narrow dark">
              <div class="b-icon">AI</div>
              <h4>Groundwork AI</h4>
              <p>A slide-over assistant on every screen, plus an owner-level Coach that flags at-risk deals.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="chart-bar" size={18} />
              </div>
              <h4>Reports across every surface</h4>
              <p>Built-in reporting for the numbers owners actually track — no BI tool required.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="file-text" size={18} />
              </div>
              <h4>After Action Reports</h4>
              <p>A configurable end-of-day field report, required before clock-out.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="refresh" size={18} />
              </div>
              <h4>Workflows &amp; automations</h4>
              <p>Trigger emails, tasks, and stage changes from events across the system.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="smartphone" size={18} />
              </div>
              <h4>Field Mode &amp; mobile</h4>
              <p>Rugged mobile view for foremen. Read-only crew view for laborers.</p>
            </div>
            <div class="bento-card narrow">
              <div class="b-icon">
                <Icon name="bolt" size={18} />
              </div>
              <h4>Integrations</h4>
              <p>QuickBooks, Google Calendar, email, Twilio, Stripe, and an open API for the rest.</p>
            </div>
          </div>
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
              work, time tracking, and an end-of-day After Action Report. There's no pipeline, no pricing, no admin —
              just the job. Training a crew takes 15 minutes.
            </FAQItem>
            <FAQItem question="How long does implementation take?">
              Most teams go live in 2–3 weeks. That includes discovery, configuration, data migration, role-based
              training, and the first 30 days of dedicated support. We don't do 90-day rollouts.
            </FAQItem>
            <FAQItem question="How is Groundwork priced?">
              A <strong>plan</strong> (Core, Growth, Pro, Enterprise) sets which workspaces your whole company can
              use — reporting, automation, the client portal — and includes a starting allotment of internal users.
              Every additional internal user beyond that is a flat $25/mo, no matter their role — an owner, a rep,
              and a field crew member all cost the same. <strong>Groundwork AI</strong> is a separate, shared
              company-wide allowance included on every plan, not billed per user. Customer-portal and other
              external logins are always free. See{' '}
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
    </Layout>
  )
}
