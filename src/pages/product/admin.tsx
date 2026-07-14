import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
import { PMMain, PMTitleRow } from '../../components/ProductMock'
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
                { num: '→', title: 'Automations', body: 'Triggers → actions. Deal won → invoice draft. Overdue → escalation.' },
                { num: '→', title: 'Approval Queue', body: 'Estimates, change orders, and financial changes gated by approval.' },
                { num: '→', title: 'Audit Log', body: 'Who changed what, when, and from where. Immutable.' },
                { num: '→', title: 'Access Modes', body: 'Company-wide policies: SSO, IP restrictions, 2FA enforcement.' },
                { num: '→', title: 'Integrations', body: 'QuickBooks, Google, Stripe, Twilio, Zapier, and open API.' },
              ]}
            />
          </SplitContent>
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
