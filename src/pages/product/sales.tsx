import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
import { PMCard, PMMain, PMTitleRow } from '../../components/ProductMock'
import { Icon } from '../../components/Icon'

export function SalesPage() {
  return (
    <Layout
      title="Sales — Groundwork CRM"
      description="Pipeline, leads, follow-ups, estimates, and every sales resource attached to the moment it matters."
      path="/product/sales"
    >
      <SubpageHero
        eyebrow="Product · Sales"
        title={<>The pipeline is the&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">product.</em></>}
        lede="Every lead in Groundwork moves through stages you configure — Intake, Agreement, Discovery, Budget, Decision, Presentation, Won, On Hold. Every stage has a follow-up rhythm, checklists, scripts, and pricing tools attached."
        primaryLabel="Book a sales demo"
      />

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Pipeline"
            title="A stage system that matches how you actually sell."
            lede="Groundwork ships with a service-business-tuned pipeline. Change the stages, change the checklists, change the templates — but do not start from an empty grid."
          >
            <SplitList
              items={[
                { num: '→', title: 'Multi-stage pipeline', body: 'Intake → Agreement → Discovery → Budget → Decision → Presentation → Won.' },
                { num: '→', title: 'Follow-up rhythm', body: 'Automated cadence built into every stage. Overdue is impossible to ignore.' },
                { num: '→', title: 'Stage checklists', body: 'Discovery cannot advance without discovery being done. Same for budget.' },
                { num: '→', title: 'Kanban + list + calendar views', body: 'Whichever way your reps think about their pipeline.' },
              ]}
            />
          </SplitContent>
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Pipeline" sub="SALES · Q3 2026" />
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                <div>
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-forest-600); margin-bottom: 10px;">Discovery · 8</div>
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">Julie Grumley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Tree Removal · $8.2k</div></div>
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">Vijay Dhulipala</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Backyard · $32k</div></div>
                </div>
                <div>
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-green-500); margin-bottom: 10px;">Budget · 4</div>
                  <div style="background: var(--gw-green-050); border: 1px solid #C5DDCC; border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">Nicole Knesley</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Pool Coping · $58k</div><div style="margin-top: 4px;"><span class="tag tag-qual">Qualified</span></div></div>
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">T. McDermott</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Front Garden · $22k</div></div>
                </div>
                <div>
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-clay-500); margin-bottom: 10px;">Decision · 3</div>
                  <div style="background: var(--gw-cream-200); border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">S. Lampard</div><div style="font-size: 10.5px; color: var(--gw-ink-500);">Deck lighting · $18k</div></div>
                </div>
                <div>
                  <div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--gw-forest-800); margin-bottom: 10px;">Won · 12</div>
                  <div style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px; margin-bottom: 6px;"><div style="font-size: 12px; font-weight: 600;">R. Aleman</div><div style="font-size: 10.5px; color: #B7CFC1;">Full landscape · $84k</div></div>
                  <div style="background: var(--gw-forest-800); color: white; border-radius: 6px; padding: 10px;"><div style="font-size: 12px; font-weight: 600;">D. Patel</div><div style="font-size: 10.5px; color: #B7CFC1;">Hardscape · $52k</div></div>
                </div>
              </div>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Nicole Knesley" sub="CLIENT · LORTON VA" />
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;"><div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Contact</div><div style="font-size: 13px; font-weight: 600;">Nicole Knesley</div><div style="font-size: 11px; color: var(--gw-ink-500);">(571) 451-4944</div></div>
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;"><div style="font-size: 10px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Property</div><div style="font-size: 13px; font-weight: 600;">6005 Chapman Rd</div><div style="font-size: 11px; color: var(--gw-ink-500);">Lorton, VA 22079</div></div>
              </div>
              <PMCard heading="Opportunities" chip="2 open · 1 won">
                <div style="padding: 8px 0; border-bottom: 1px solid var(--gw-cream-300); display: flex; justify-content: space-between; font-size: 12.5px;"><span><strong>Pool Coping Replacement</strong> · $58,200</span><span class="tag tag-qual">Budget Qualified</span></div>
                <div style="padding: 8px 0; border-bottom: 1px solid var(--gw-cream-300); display: flex; justify-content: space-between; font-size: 12.5px;"><span><strong>Bi-weekly Maintenance</strong> · $340/visit</span><span class="tag tag-rapport">Active</span></div>
                <div style="padding: 8px 0; display: flex; justify-content: space-between; font-size: 12.5px;"><span><strong>Fall Cleanup 2025</strong> · $1,850</span><span class="tag tag-website">Complete</span></div>
              </PMCard>
            </PMMain>
          </MockFrame>
          <SplitContent
            eyebrow="Clients & properties"
            title="Every client. Every property. Every service."
            lede="Service is inherently place-based. Groundwork models clients, properties, and the services performed on them as first-class objects — with full history, notes, files, and photos."
          >
            <SplitList
              items={[
                { num: '→', title: 'Clients', body: 'One record per household or company. Multiple properties attached.' },
                { num: '→', title: 'Properties', body: 'Every address you have serviced. Notes on soil, access, equipment, dogs.' },
                { num: '→', title: 'Opportunities', body: 'A lead lives on a property. Won deals become jobs. Nothing gets lost.' },
                { num: '→', title: 'Estimates & proposals', body: 'Attached to the property. Sent from the deal. Tracked to close.' },
              ]}
            />
          </SplitContent>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Sales resources"
            title="Answers in hand before the call gets awkward."
            lede="Groundwork attaches your sales library to the stage the rep is in. Discovery scripts on discovery calls. Budget conversations on budget calls. Objection handling when someone pushes back."
          >
            <SplitList
              items={[
                { num: '→', title: 'Sales Process', body: 'Documented stages with entry & exit criteria.' },
                { num: '→', title: 'Forms & Checklists', body: 'Reusable forms attached to stages, properties, or jobs.' },
                { num: '→', title: 'Scripts & Talk Tracks', body: 'Discovery, budget, close, and follow-up scripts.' },
                { num: '→', title: 'Email Templates', body: 'Consistent, on-brand outreach with variables.' },
                { num: '→', title: 'Objection Handling', body: 'Prewritten answers to the top-20 pushbacks.' },
                { num: '→', title: 'Pricing Tools', body: 'Real-time pricing calculators for service lines.' },
                { num: '→', title: 'AI Assistant', body: 'Draft an email, summarize a deal, suggest a next step.' },
                { num: '→', title: 'Groundwork Academy', body: 'Structured training for every seat.' },
              ]}
            />
          </SplitContent>
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Sales Resources" sub="ATTACHED TO STAGE 4 · BUDGET" />
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                {[
                  { icon: 'clipboard', title: 'Budget Discovery Script', sub: '8 min · 12 questions' },
                  { icon: 'money', title: 'Pricing Calculator', sub: 'Hardscape / Softscape' },
                  { icon: 'no-symbol', title: 'Objection: "too expensive"', sub: '3 versions · use when...' },
                  { icon: 'mail-plus', title: 'Post-Budget Email Template', sub: 'Follow-up · 24hr trigger' },
                  { icon: 'check-circle', title: 'Budget Stage Checklist', sub: '7 items · 6 required' },
                  { icon: 'graduation-cap', title: 'Academy: closing the budget conversation', sub: 'Video · 14 min' },
                ].map((r) => (
                  <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px 14px;">
                    <div style="font-size: 18px; margin-bottom: 6px;"><Icon name={r.icon} size={18} /></div>
                    <div style="font-size: 12.5px; font-weight: 600; color: var(--gw-ink-900); margin-bottom: 2px;">{r.title}</div>
                    <div style="font-size: 11px; color: var(--gw-ink-500);">{r.sub}</div>
                  </div>
                ))}
              </div>
            </PMMain>
          </MockFrame>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/my-day', title: 'My Day', desc: 'Where every rep starts their day.' },
          { href: '/product/financial', title: 'Financial', desc: 'From proposal to paid invoice.' },
          { href: '/product/operations', title: 'Operations', desc: 'Sold deals become dispatched jobs.' },
          { href: '/roles/sales-reps', title: 'For sales reps', desc: 'The workspace built for reps.' },
        ]}
      />

      <CTABand
        title={<>Watch your <em>real pipeline</em> loaded into Groundwork.</>}
        description="A specialist will import a sample of your open deals and walk through what changes."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
