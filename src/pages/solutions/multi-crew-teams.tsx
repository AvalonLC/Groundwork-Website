import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'

export function MultiCrewTeamsPage() {
  const reps = [
    { name: 'Tyler', value: '6', tag: '2 od', tagColor: 'var(--gw-red-500)' },
    { name: 'Marcus', value: '21', tag: '3 od', tagColor: 'var(--gw-red-500)' },
    { name: 'Angela', value: '14', tag: 'clean', tagColor: 'var(--gw-green-500)' },
    { name: 'Rita', value: '8', tag: '1 od', tagColor: 'var(--gw-red-500)' },
    { name: 'Sam', value: '12', tag: 'clean', tagColor: 'var(--gw-green-500)' },
    { name: 'Dana', value: '9', tag: 'clean', tagColor: 'var(--gw-green-500)' },
  ]

  return (
    <Layout
      title="Multi-crew operational teams — Groundwork CRM"
      description="Multi-role, multi-location teams — Groundwork's role-based structure was designed for exactly this."
      path="/solutions/multi-crew-teams"
    >
      <SubpageHero
        eyebrow="Solutions · Multi-crew ops"
        title={<>Every seat sees their layer of the same&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">reality.</em></>}
        lede="When you have office managers coordinating sales reps who feed foremen who lead laborers — Groundwork's role-based structure was designed for this. Everyone sees their layer. No one sees more or less than they should."
        primaryLabel="Book an ops-scale demo"
        secondaryHref="/features"
        secondaryLabel="See all features"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Ops at scale</span>
            <h2 style="margin-top: 20px;">The controls you need when the org chart gets deep.</h2>
            <p class="lede">
              Once you're past 15 people and 3 crews, coordination cost dominates. Groundwork gives managers the
              levers to run a real operation — team views, region roll-ups, approval queues, and audit.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Screen-level permissions', body: 'Five default roles across office, sales, and field.' },
                { num: '→', title: 'Team View', body: "Every rep's day, every crew's status — one screen." },
                { num: '→', title: 'Multi-location filtering', body: 'Filter by region, branch, or crew home base.' },
                { num: '→', title: 'Business Pulse with regional roll-up', body: 'Owner sees the whole. Region GMs see theirs.' },
                { num: '→', title: 'Approval queue', body: 'Estimates, change orders, and refunds gated by approver.' },
                { num: '→', title: 'Audit log', body: 'Compliance-grade record of every change.' },
              ]}
            />
          </div>
          <div class="pm" style="grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: 460px;">
            <main class="pm-main">
              <div class="pm-title-row">
                <div class="pm-title">Team View <small>THIS WEEK · 6 REPS · 3 CREWS · 2 LOCATIONS</small></div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 12px;">
                {reps.map((r) => (
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px 8px; text-align: center;">
                    <div style="font-size: 10px; color: var(--gw-ink-500); margin-bottom: 3px;">{r.name}</div>
                    <div style="font-family: var(--font-serif); font-size: 20px;">{r.value}</div>
                    <div style={`font-size: 9px; color: ${r.tagColor};`}>{r.tag}</div>
                  </div>
                ))}
              </div>
              <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px 16px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-size: 12.5px; font-weight: 600;">Team pipeline</div>
                  <span style="font-family: var(--font-serif); font-size: 20px;">$482k</span>
                </div>
                <div style="height: 6px; background: var(--gw-cream-300); border-radius: 3px; margin-top: 8px; overflow: hidden;">
                  <div style="width: 68%; height: 100%; background: linear-gradient(90deg, var(--gw-forest-600), var(--gw-green-500));"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--gw-ink-500); margin-top: 6px;">
                  <span>Q3 goal · $700k</span>
                  <span>68% to goal</span>
                </div>
              </div>
              <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 12.5px; font-weight: 600;">By region</div>
                <div style="display: flex; gap: 12px; font-size: 11px;">
                  <span><strong>Northern VA</strong> · $312k · 62%</span>
                  <span><strong>DC Metro</strong> · $170k · 38%</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/solutions', title: 'All solutions', desc: 'See other trades we serve.' },
          { href: '/product/admin', title: 'Admin', desc: 'The permission model, in detail.' },
          { href: '/roles', title: 'All roles', desc: 'Every seat, explained.' },
          { href: '/product/platform', title: 'Platform architecture', desc: 'How the pieces connect.' },
        ]}
      />

      <CTABand
        eyebrow="Book a demo"
        title={<>Bring your org chart. We'll map it into&nbsp;Groundwork.</>}
        description="A specialist will build your access matrix live in the demo."
        primaryLabel="Book a demo"
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
