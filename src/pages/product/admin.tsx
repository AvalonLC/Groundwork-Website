import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame, MockFrameWithLink } from '../../components/SplitFeature'
import { PMMain, PMTitleRow, PMStats } from '../../components/ProductMock'
import { Icon } from '../../components/Icon'
import { AccessMatrix } from '../../components/Matrix'

export function AdminPage() {
  const roleChips = [
    { icon: 'key', label: 'Owner', views: 'Full views' },
    { icon: 'clipboard', label: 'Mgmt', views: '43 views' },
    { icon: 'briefcase', label: 'Sales', views: '21 views' },
    { icon: 'ruler', label: 'Estimator', views: '7 views' },
    { icon: 'eye', label: 'View', views: '4 views' },
  ]

  const matrixRows = [
    { label: 'Pipeline', access: [true, true, true, true] },
    { label: 'Leads', access: [true, true, false, false] },
    { label: 'Clients / Properties', access: [true, true, true, false] },
    { label: 'Financial Overview', access: [true, false, false, false] },
    { label: 'Invoices', access: [true, false, false, false] },
    { label: 'Payments', access: [true, false, false, false] },
    { label: 'Schedule', access: [true, true, true, true] },
    { label: 'Work Orders', access: [true, true, true, false] },
    { label: 'Field Mode', access: [true, false, false, false] },
    { label: 'Audit Log', access: [true, false, false, false] },
  ]

  const approvals = [
    { title: 'Change order · +$4,200', sub: 'Aleman · Full landscape · Marcus (Sales)' },
    { title: 'Estimate discount · −15%', sub: 'Grumley · Tree removal · Tyler (Sales)' },
    { title: 'Refund request · $340', sub: 'Ozawa · Maintenance · Angela (Office)' },
  ]

  const roster = [
    { name: 'Marcus Reyes', role: 'Sales', team: 'Sales Team', status: 'Active' },
    { name: 'N. Knesley', role: 'Foreman', team: 'Crew A', status: 'Active' },
    { name: 'D. Patel', role: 'Estimator', team: 'Estimating', status: 'Active' },
    { name: 'J. Ozawa', role: 'Field', team: 'Crew B', status: 'On Leave' },
  ]

  return (
    <Layout
      title="Admin & Permissions — Groundwork CRM"
      description="Screen-level roles & permissions, workflow, integrations, audit, access modes."
      path="/product/admin"
    >
      <SubpageHero
        eyebrow="Product · Admin & Permissions"
        title={<>Configure once. Run&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">everywhere.</em></>}
        lede="The most under-rated feature in Groundwork is its permission model. Every screen in the platform is individually assignable to roles. Start from a sensible company default, then customize per person."
        primaryLabel="Book a demo"
      />

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Roles & permissions"
            title="Screen-level access. Not module-level."
            lede="Most CRMs give you two roles: admin and user. Groundwork gives you six by default, all configurable, all with per-screen granularity — because a service business is not two kinds of people."
          >
            <SplitList
              items={[
                { num: '→', title: 'Six default roles', body: 'Owner, Management, Sales, Estimator, Field, View-only.' },
                { num: '→', title: 'Screen-level matrix', body: 'Grant Pipeline but not Financial. Grant Reports but not Payments.' },
                { num: '→', title: 'Company defaults', body: 'Set once as the baseline. Future hires start from there.' },
                { num: '→', title: 'Per-person override', body: 'Customize any role for any individual when the case calls for it.' },
              ]}
            />
          </SplitContent>
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Roles & Permissions" sub="LIVE · SCREEN LEVEL" />
              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 14px;">
                {roleChips.map((r) => (
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px; text-align: center;">
                    <div style="font-size: 16px; margin-bottom: 4px;"><Icon name={r.icon} size={18} /></div>
                    <div style="font-size: 10px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">{r.label}</div>
                    <div style="font-size: 11px; font-weight: 600;">{r.views}</div>
                  </div>
                ))}
              </div>
              <div class="pm-card">
                <div class="pm-card-h">View Access Matrix</div>
                <AccessMatrix columns={['Office', 'Sales', 'Estimator', 'View']} rows={matrixRows} />
              </div>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Approval Queue" sub="PENDING · 4 ITEMS" />
              <div style="display: flex; flex-direction: column; gap: 8px;">
                {approvals.map((a) => (
                  <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 600; color: var(--gw-ink-900);">{a.title}</div>
                      <div style="font-size: 11px; color: var(--gw-ink-500);">{a.sub}</div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                      <button style="background: var(--gw-green-600); color: white; padding: 6px 12px; border-radius: 5px; font-size: 11px; border: none;">Approve</button>
                      <button style="background: white; border: 1px solid var(--gw-line); padding: 6px 12px; border-radius: 5px; font-size: 11px;">Deny</button>
                    </div>
                  </div>
                ))}
              </div>
            </PMMain>
          </MockFrame>
          <SplitContent
            eyebrow="Workflow, templates & audit"
            title="Automation without magic."
            lede="Groundwork's workflow engine lets you trigger tasks, emails, stage changes, and approvals from events across the platform — with a full audit log for compliance-conscious operators."
          >
            <SplitList
              items={[
                { num: '→', title: 'Templates', body: 'Reusable emails, checklists, forms, and estimates.' },
                { num: '→', title: 'AAR Template builder', body: 'Configure the end-of-day report question set — Yes/No, text, rating, checklist, dropdown.' },
                { num: '→', title: 'Approval Queue', body: 'Estimates, change orders, and financial changes gated by approval.' },
                { num: '→', title: 'Audit Log', body: 'Who changed what, when, and from where. Immutable.' },
                { num: '→', title: 'Access Modes', body: 'Company-wide policies: SSO, IP restrictions, 2FA enforcement.' },
                { num: '→', title: 'Integrations', body: 'QuickBooks, Google, Stripe, Twilio, Zapier, and open API.' },
              ]}
            />
          </SplitContent>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Employees & Teams"
            title="Everyone's role, team, and access — in one roster."
            lede="Employees & Teams is where staff get created, assigned to a role and a crew, and tied to the permission model above. It's the roster the rest of Admin points back to."
          >
            <SplitList
              items={[
                { num: '→', title: 'One roster, every seat', body: 'Office, sales, estimators, and field crews in one place.' },
                { num: '→', title: 'Team assignment', body: 'Every person tied to a crew or department for scheduling.' },
                { num: '→', title: 'Status at a glance', body: 'Active, on leave, or offboarded — no guessing who is available.' },
                { num: '→', title: 'Feeds Roles & Permissions', body: 'Assign a role here; the access matrix applies automatically.' },
              ]}
            />
          </SplitContent>
          <MockFrameWithLink panel="employees" label="Try Employees & Teams yourself">
            <PMMain>
              <PMTitleRow title="Employees & Teams" sub="ROSTER · 24 PEOPLE" />
              <PMStats
                stats={[
                  { label: 'Active', value: '22', variant: 'sold' },
                  { label: 'On Leave', value: '1' },
                  { label: 'Teams', value: '5' },
                ]}
              />
              <div class="pm-card">
                <div class="pm-card-h">Roster <span class="chip">Recently active</span></div>
                {roster.map((p, i) => (
                  <div style={`display: flex; justify-content: space-between; align-items: center; padding: 8px 0;${i < roster.length - 1 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <div>
                      <div style="font-size: 12.5px; font-weight: 600;">{p.name}</div>
                      <div style="font-size: 11px; color: var(--gw-ink-500);">{p.role} · {p.team}</div>
                    </div>
                    <span class={`tag ${p.status === 'Active' ? 'tag-rapport' : 'tag-follow'}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </PMMain>
          </MockFrameWithLink>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap split">
          <SplitContent
            eyebrow="Client Portal"
            title="Give clients their own door — that you still control."
            lede="Clients sign in at their own portal to see the status of their job, without ever touching your internal workspace. Staff manage every invite from Admin, and can step into a client's exact view to troubleshoot."
          >
            <SplitList
              items={[
                { num: '→', title: 'Scoped, read-only access', body: "Clients see their own properties, jobs, and invoices — nothing else." },
                { num: '→', title: 'Invite & disable from Admin', body: 'Staff control who gets portal access, and can revoke it instantly.' },
                { num: '→', title: 'Preview as client', body: "Step into a client's exact portal view to troubleshoot or demo — no separate login." },
                { num: '→', title: 'Real activity log', body: 'Logins, invites, and update-published events tied to work orders — auditable.' },
              ]}
            />
          </SplitContent>
          <MockFrameWithLink panel="clientportal" label="Try Client Portal yourself" minHeight={340}>
            <PMMain>
              <PMTitleRow title="Client Portal" sub="ADMIN · MANAGE ACCESS" />
              <PMStats
                stats={[
                  { label: 'Active Users', value: '1', variant: 'sold' },
                  { label: 'Pending Invites', value: '1' },
                  { label: 'Disabled', value: '1', variant: 'overdue' },
                ]}
              />
              <div class="pm-card" style="margin-bottom: 10px;">
                <div class="pm-card-h">Portal Users <span class="chip">3 total</span></div>
                {[
                  { name: 'Nicole Knesley', status: 'Active', last: 'Logged in 2d ago' },
                  { name: 'D. Patel', status: 'Pending', last: 'Invited · not yet accepted' },
                  { name: 'R. Aleman', status: 'Disabled', last: 'Revoked by Tyler' },
                ].map((u, i) => (
                  <div style={`display: flex; justify-content: space-between; align-items: center; padding: 8px 0;${i < 2 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <div>
                      <div style="font-size: 12.5px; font-weight: 600;">{u.name}</div>
                      <div style="font-size: 11px; color: var(--gw-ink-500);">{u.last}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class={`tag ${u.status === 'Active' ? 'tag-rapport' : u.status === 'Pending' ? 'tag-follow' : 'tag-red'}`}>{u.status}</span>
                      {u.status !== 'Disabled' && <button style="background: white; border: 1px solid var(--gw-line); padding: 3px 9px; border-radius: 5px; font-size: 10px;">Disable</button>}
                    </div>
                  </div>
                ))}
              </div>
              <div class="pm-card">
                <div class="pm-card-h">Recent Portal Activity</div>
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
              </div>
            </PMMain>
          </MockFrameWithLink>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/features', title: 'All features', desc: 'The complete capability list.' },
          { href: '/platform', title: 'Platform architecture', desc: 'Data model, integrations, security.' },
          { href: '/security', title: 'Security', desc: 'How Groundwork protects your data.' },
          { href: '/roles', title: 'Roles overview', desc: 'What each seat sees.' },
        ]}
      />

      <CTABand
        title={<>The permission model that fits your <em>real</em> team.</>}
        description="Walk through your org chart with us — we will map it into Groundwork's access matrix in the demo."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
