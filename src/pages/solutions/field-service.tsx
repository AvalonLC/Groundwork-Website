import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { MockFrame } from '../../components/SplitFeature'

export function FieldServicePage() {
  return (
    <Layout
      title="Field service — Groundwork CRM"
      description="Restoration, roofing, exteriors, and insurance-driven field service — built for multi-party workflows."
      path="/solutions/field-service"
    >
      <SubpageHero
        eyebrow="Solutions · Field service"
        title={<>Multi-party jobs. Multi-step&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">payouts.</em> One system.</>}
        lede="Restoration and exteriors run on choreography: homeowner, adjuster, sales, PM, and crew all need different views of the same job. Groundwork handles the choreography — documents, stakeholders, progress payments, and warranty callbacks."
        primaryLabel="Book a field service demo"
      />

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Built for insurance-driven work</span>
            <h2 style="margin-top: 20px;">The workflow assumes multiple parties. Because that's reality.</h2>
            <p class="lede">
              Every restoration job is a small movie with a cast: the homeowner who lost their roof, the adjuster
              who approves the scope, the sales rep who explained the process, the PM who runs the build, and the
              crew who executes. Groundwork holds all of them in one record.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Multi-stakeholder deal records', body: 'Homeowner + adjuster + sales + PM + crew, all on one file.' },
                { num: '→', title: 'Document management', body: 'Insurance approvals, adjuster scopes, contracts, change orders.' },
                { num: '→', title: 'Storm response mode', body: 'Surge scheduling for weather-driven work.' },
                { num: '→', title: 'Photo-based scope documentation', body: 'Every photo tagged to the location and item.' },
                { num: '→', title: 'Progress-payment plans', body: 'Deposit, mid-progress, final — tracked to the claim.' },
              ]}
            />
          </div>
          <MockFrame minHeight={500}>
            <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; margin-bottom: 14px;">
              Claim · Storm damage · Patel Residence
            </div>
            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Claim documents</div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="tag tag-website">Insurance approval.pdf</span>
                <span class="tag tag-website">Adjuster scope.pdf</span>
                <span class="tag tag-website">Roof photos (24)</span>
                <span class="tag tag-website">Contract signed.pdf</span>
                <span class="tag tag-website">Change order 1.pdf</span>
              </div>
            </div>
            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
              <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Stakeholders</div>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between;">
                  <span>Homeowner · D. Patel</span>
                  <span style="color: var(--gw-green-500); font-weight: 600;">Approved</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Adjuster · State Farm</span>
                  <span style="color: var(--gw-ink-500);">$32,400 approved</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>PM · Angela Ruiz</span>
                  <span style="color: var(--gw-green-500); font-weight: 600;">Assigned</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Crew · Ridgeline Exteriors</span>
                  <span style="color: var(--gw-amber-500); font-weight: 600;">Scheduled Aug 12</span>
                </div>
              </div>
            </div>
            <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px;">
              <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Payment plan</div>
              <div style="display: flex; gap: 8px; font-size: 11px;">
                {[
                  { label: 'Deposit', value: '$10,800 · Paid' },
                  { label: 'Mid-progress', value: '$10,800 · Pending' },
                  { label: 'Final', value: '$10,800 · Pending' },
                ].map((p) => (
                  <div style="flex:1; padding: 8px 10px; background: white; border-radius: 6px; border: 1px solid var(--gw-cream-300);">
                    <div style="color: var(--gw-ink-500); font-size: 10px; margin-bottom: 2px;">{p.label}</div>
                    <div style="font-weight: 600;">{p.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </MockFrame>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/solutions', title: 'All solutions', desc: 'See other trades we serve.' },
          { href: '/product/operations', title: 'Operations', desc: 'Multi-stakeholder scheduling.' },
          { href: '/product/admin', title: 'Admin', desc: 'Approval queues for insurance work.' },
          { href: '/product/financial', title: 'Financial', desc: 'Progress payments, tracked.' },
        ]}
      />

      <CTABand
        title={<>See a claim run start to finish, <em>live.</em></>}
        description="Bring a real claim file. We'll show you the fit."
        primaryLabel="Book a field service demo"
      />
    </Layout>
  )
}
