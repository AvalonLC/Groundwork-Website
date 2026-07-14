import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand } from '../../components/Blocks'
import { Icon } from '../../components/Icon'

export function RolesHubPage() {
  const roles = [
    {
      href: '/roles/owners',
      icon: 'key',
      title: 'Owners',
      tag: 'Clarity, cash, and pipeline',
      desc: 'Owners get Business Pulse, Financial Snapshot, and Ops Snapshot — three dashboards that answer "where is the business right now?" in 30 seconds.',
    },
    {
      href: '/roles/office-managers',
      icon: 'clipboard',
      title: 'Office managers',
      tag: 'Coordination and control',
      desc: 'Office managers keep the machine running. Groundwork gives them cross-team pipeline visibility, invoicing queues, and the tools to nudge sales and chase payments.',
    },
    {
      href: '/roles/sales-reps',
      icon: 'briefcase',
      title: 'Sales reps',
      tag: 'Work the queue, not the inbox',
      desc: "Reps get a ranked daily queue, sales resources attached to the stage they're in, and scripts / pricing / objection handling in hand mid-call.",
    },
    {
      href: '/roles/foremen',
      icon: 'hard-hat',
      title: 'Foremen',
      tag: 'Field leadership, mobile-first',
      desc: 'Foremen open Groundwork in the truck. Route, scope, crew assignments, safety checklists, and clean field logging for time and progress.',
    },
    {
      href: '/roles/laborers',
      icon: 'boot',
      title: 'Laborers',
      tag: "Just today's work",
      desc: "Field crews don't need a CRM. They need to know where they're going, who they're with, and when they're done. Groundwork gives them exactly that.",
    },
  ]

  return (
    <Layout
      title="Roles — Groundwork CRM"
      description="Owner, office manager, sales rep, foreman, laborer — every seat sees the workspace built for their job."
      path="/roles"
    >
      <SubpageHero
        eyebrow="Roles"
        title={<>Owner to laborer — everyone lands where they need to&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">be.</em></>}
        lede="Groundwork is one system with five doors. Each role sees a workspace tuned to their job — same underlying data, different lens. Nobody digs through screens they do not need."
        secondaryHref="/product/admin"
        secondaryLabel="See permission model"
      />

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 20px;">
            {roles.map((r) => (
              <a
                href={r.href}
                style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 32px 36px; display: grid; grid-template-columns: 80px 1fr auto; gap: 28px; align-items: center;"
              >
                <div style="width: 60px; height: 60px; border-radius: 14px; background: var(--gw-forest-800); color: white; display: grid; place-items: center; font-size: 28px;">
                  <Icon name={r.icon} size={18} />
                </div>
                <div>
                  <div style="font-family: var(--font-serif); font-size: 28px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 4px;">
                    {r.title}
                  </div>
                  <div style="font-size: 13px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px;">
                    {r.tag}
                  </div>
                  <div style="font-size: 15px; color: var(--gw-ink-500); max-width: 68ch;">{r.desc}</div>
                </div>
                <div style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>One system. Five seats.&nbsp;<em>Zero</em> retraining across roles.</>}
        description="Book a demo — we'll show you every role's view, tuned to your business."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
