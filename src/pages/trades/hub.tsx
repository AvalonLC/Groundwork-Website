import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand } from '../../components/Blocks'
import { Icon } from '../../components/Icon'
import { TRADES } from '../../data/trades'

export function TradesHubPage() {
  return (
    <Layout
      title="Trades — Groundwork CRM"
      description="Groundwork is configured for real trades — HVAC, plumbing, electrical, roofing, landscaping, and more."
      path="/trades"
    >
      <SubpageHero
        eyebrow="Trades"
        title={<>Built for real trades. Configured for&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">yours.</em></>}
        lede='Groundwork is not a generic CRM with a "field service" checkbox. It is shaped by how service businesses actually run — and configured to your specific stages, service lines, and workflows during onboarding.'
        secondaryHref="/roles"
        secondaryLabel="See roles"
      />

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div class="trades-grid">
            {TRADES.map((t) => (
              <a href={`/trades/${t.slug}`} class="trade-tile">
                <div class="trade-tile-icon">
                  <Icon name={t.icon} size={22} />
                </div>
                <div class="trade-tile-title">{t.name}</div>
                <div class="trade-tile-desc">{t.navDesc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div class="section-head" style="text-align: center; margin: 0 auto 56px; max-width: 760px;">
            <span class="eyebrow" style="justify-content: center;">Why Groundwork</span>
            <h2 style="margin-top: 20px;">Practical software, built for real operators.</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
            {[
              { n: '01', title: 'Configured to your work', body: 'Stages, service lines, checklists, and templates set to your specific business during onboarding — not out of a box.' },
              { n: '02', title: 'Connects office to field', body: 'Sales, dispatch, invoicing, and field execution in one system — so the crew already knows what sales sold.' },
              { n: '03', title: 'Owner-first clarity', body: 'Pipeline value, cash position, ops load — a single glance in the morning tells you where the business is.' },
            ].map((item) => (
              <div>
                <div style="font-family: var(--font-serif); font-size: 48px; color: var(--gw-forest-700); font-weight: 400; line-height: 1; margin-bottom: 16px;">
                  {item.n}
                </div>
                <h4 style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; margin-bottom: 12px;">{item.title}</h4>
                <p style="color: var(--gw-ink-500); font-size: 15px;">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 48px; padding-bottom: 0;">
        <div class="wrap">
          <div style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 36px 34px;">
            <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 16px;">
              Multi-role · Multi-location · Franchise · Ops at scale
            </div>
            <div style="font-family: var(--font-serif); font-size: 28px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 12px;">
              Running more than one trade, or one crew?
            </div>
            <div style="font-size: 15px; color: var(--gw-ink-500); margin-bottom: 24px;">
              When office managers coordinate reps who feed foremen who lead laborers — see how Groundwork's role-based structure scales across crews, locations, and service lines.
            </div>
            <a href="/multi-crew-ops" style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
              See multi-crew &amp; ops at scale →
            </a>
          </div>
        </div>
      </section>

      <CTABand
        title={<>Let us configure Groundwork for <em>your</em> trade — live.</>}
        description="30 minutes with a specialist. Real data. Real workflow. Real outcome."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
