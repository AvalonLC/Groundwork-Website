import { Layout } from './Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from './Blocks'
import { MockFrame } from './SplitFeature'
import type { TradeData } from '../data/trades'

// <TradePage /> — the shared template for every /trades/:slug page ("Option
// B": one component, fed by a per-trade data object from src/data/trades.ts,
// instead of N bespoke page files). Visually matches the original bespoke
// solution pages (landscaping / home-service / field-service) by reusing the
// same building blocks: SubpageHero, SplitList, MockFrame, RelatedCards, CTABand.
export function TradePage({ trade }: { trade: TradeData }) {
  return (
    <Layout
      title={`${trade.name} — Groundwork CRM`}
      description={`Groundwork CRM for ${trade.name.toLowerCase()} companies — ${trade.category.toLowerCase()}.`}
      path={`/trades/${trade.slug}`}
    >
      <SubpageHero
        eyebrow={`Trades · ${trade.name}`}
        title={
          <>
            {trade.heroTitleMain}&nbsp;
            <em style="font-style: italic; color: var(--gw-forest-700);">{trade.heroTitleEm}</em>
          </>
        }
        lede={trade.heroLede}
        primaryLabel={`Book a ${trade.name.toLowerCase()} demo`}
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">{trade.splitEyebrow}</span>
            <h2 style="margin-top: 20px;">{trade.splitTitle}</h2>
            <p class="lede">{trade.splitLede}</p>
            <SplitList items={trade.splitItems} />
          </div>
          <MockFrame minHeight={480}>
            <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; margin-bottom: 14px;">
              {trade.mockTitle}
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              {trade.mockRows.map((r) => (
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px 14px;">
                  <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 4px; align-items: baseline;">
                    <div style="font-size: 13px; font-weight: 600;">{r.label}</div>
                    {r.tag && <span class={`tag tag-${r.tagVariant || 'qual'}`} style="white-space: nowrap;">{r.tag}</span>}
                  </div>
                  <div style="display: flex; justify-content: space-between; gap: 10px; font-size: 11px; color: var(--gw-ink-500);">
                    <span>{r.sub}</span>
                    <span>{r.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </MockFrame>
        </div>
      </section>

      <RelatedCards items={trade.related} />

      <CTABand
        title={
          <>
            See Groundwork configured for <em>{trade.ctaTitleEm}</em> — live.
          </>
        }
        description={trade.ctaDescription}
        primaryLabel={`Book a ${trade.name.toLowerCase()} demo`}
      />
    </Layout>
  )
}
