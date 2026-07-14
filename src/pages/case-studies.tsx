import { Layout } from '../components/Layout'
import { CTABand } from '../components/Blocks'

export function CaseStudiesPage() {
  const studies = [
    {
      tag: 'Avalon Landscape · 24 employees · Northern VA',
      title: 'From spreadsheet chaos to $186k month.',
      desc: 'The 6-week story of migrating a design-build landscape company off a Rolodex of tools.',
      metrics: ['Pipeline value up 42%', 'Follow-ups 0 slipped in first quarter', 'Office admin time down 8 hrs/week'],
    },
    {
      tag: 'Northline HVAC · 3 branches · DC Metro',
      title: 'Same-day dispatch, callbacks under 4%.',
      desc: 'How one regional HVAC operator dropped their callback rate and doubled tune-up renewals.',
      metrics: ['Callback rate 12% → 3.8%', 'Membership renewals +2.1x', 'Invoice-to-payment 22 → 9 days'],
    },
    {
      tag: 'Ridgeline Exteriors · Insurance-driven',
      title: 'One system for adjusters, PMs, and crews.',
      desc: 'What changed when the paperwork problem restoration teams face lived in Groundwork.',
      metrics: ['Claim-to-schedule 18 → 6 days', 'Change order revenue +$140k/qtr', 'Client NPS 42 → 71'],
    },
  ]

  return (
    <Layout
      title="Case studies — Groundwork CRM"
      description="Deep customer stories."
      path="/case-studies"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Case studies</span>
          <h1 style="margin-top: 20px;">How specific teams changed their&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">operations.</em></h1>
          <p class="lede">
            Selected case studies from the Groundwork customer base — landscape, home service, and field service
            teams that migrated away from disconnected tools.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            {studies.map((cs) => (
              <a
                href="/customers"
                style="display: block; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 14px; padding: 32px; text-decoration: none;"
              >
                <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 14px;">
                  {cs.tag}
                </div>
                <div style="font-family: var(--font-serif); font-size: 24px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 12px; line-height: 1.2;">
                  {cs.title}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 20px;">{cs.desc}</div>
                <div style="border-top: 1px solid var(--gw-cream-300); padding-top: 16px;">
                  {cs.metrics.map((m) => (
                    <div style="font-size: 12.5px; color: var(--gw-ink-700); padding: 3px 0; display: flex; gap: 8px;">
                      <span style="color: var(--gw-green-600);">▸</span>
                      {m}
                    </div>
                  ))}
                </div>
                <div style="margin-top: 20px; font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">
                  Read the story →
                </div>
              </a>
            ))}
          </div>
          <div class="tm-note" style="margin-top: 48px;">
            — Case studies below are illustrative. Real published case studies coming at launch.
          </div>
        </div>
      </section>

      <CTABand
        title={<>Talk to a specialist about your&nbsp;migration.</>}
        description="Bring your data. We'll show you what a 2-3 week rollout actually looks like."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
