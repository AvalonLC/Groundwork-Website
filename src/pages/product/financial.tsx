import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame, MockFrameWithLink } from '../../components/SplitFeature'
import { PMMain, PMTitleRow, PMStats } from '../../components/ProductMock'

export function FinancialPage() {
  return (
    <Layout
      title="Financial — Groundwork CRM"
      description="Invoices, payments, deposits, and statements tied directly to jobs, clients, and properties."
      path="/product/financial"
    >
      <SubpageHero
        eyebrow="Product · Financial"
        title={<>See the money without opening the&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">books.</em></>}
        lede="Invoices, deposits, payments, and statements — attached to the client, property, and job that generated them. Groundwork is not your accounting system. It is the operational layer that keeps your accounting system honest."
        primaryLabel="Book a demo"
      />

      <section class="section">
        <div class="wrap split">
          <SplitContent
            eyebrow="Financial Overview"
            title="The dashboard your accountant wishes you had."
            lede="Real-time financial state, not a report you have to run. Outstanding, deposits, invoiced, past-due — with drill-through to every underlying invoice."
          >
            <SplitList
              items={[
                { num: '→', title: 'Live snapshot', body: 'Outstanding, deposits, invoiced this month, past due 30/60/90.' },
                { num: '→', title: 'Per-client statements', body: 'One click to send a statement. Full activity trail.' },
                { num: '→', title: 'QuickBooks sync', body: 'Two-way sync of clients, invoices, and payments.' },
                { num: '→', title: 'Deposit ledger', body: 'Deposits tracked separately from invoices — because they need to be.' },
              ]}
            />
          </SplitContent>
          <MockFrameWithLink panel="invoicing" label="Try invoice reporting yourself">
            <PMMain>
              <PMTitleRow title="Financial Snapshot" sub="OWNER VIEW · Q3 2026" />
              <PMStats
                stats={[
                  { label: 'Outstanding', value: '$48.2k' },
                  { label: 'Deposits MTD', value: '$24.9k', variant: 'sold' },
                  { label: 'Invoiced MTD', value: '$142k' },
                  { label: 'Past Due 30+', value: '$8.1k', variant: 'overdue' },
                ]}
              />
              <div class="pm-card">
                <div class="pm-card-h">
                  Recent Invoices <span class="chip">14 items</span>
                </div>
                <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.7fr; gap: 8px; font-size: 10px; letter-spacing: 0.08em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600; padding-bottom: 8px; border-bottom: 1px solid var(--gw-cream-300); margin-bottom: 6px;">
                  <span>Client</span><span>Job</span><span>Amount</span><span>Status</span>
                </div>
                {[
                  { client: 'R. Aleman', job: 'Full landscape', amount: '$84,000', tag: 'Paid', variant: 'rapport' },
                  { client: 'D. Patel', job: 'Hardscape', amount: '$52,000', tag: 'Deposit', variant: 'qual' },
                  { client: 'L. Ozawa', job: 'Maint. Contract', amount: '$1,200', tag: 'Past due', variant: 'red' },
                  { client: 'J. Grumley', job: 'Tree Removal', amount: '$8,200', tag: 'Sent', variant: 'website' },
                ].map((row, i) => (
                  <div style={`display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.7fr; gap: 8px; font-size: 12px; padding: 8px 0;${i < 3 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <span style="font-weight:600;">{row.client}</span>
                    <span style="color: var(--gw-ink-500);">{row.job}</span>
                    <span>{row.amount}</span>
                    <span><span class={`tag tag-${row.variant}`}>{row.tag}</span></span>
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
            eyebrow="Money Loop"
            title="The health question, answered in plain language."
            lede="Owners don't think in balance sheets — they think 'are we covering what it costs to keep the doors open?' Money Loop turns overhead recovery into one honest number instead of a spreadsheet nobody opens."
          >
            <SplitList
              items={[
                { num: '→', title: 'Overhead-coverage percentage', body: "How much of this year's overhead is covered by what's been sold and billed — updated live." },
                { num: '→', title: 'Plain-language framing', body: 'No jargon. "How we\'re tracking" — the way an owner would actually say it.' },
                { num: '→', title: 'Tied to Budget & Rates', body: 'Powered by the same burdened-cost math that prices every job — not a separate estimate.' },
                { num: '→', title: 'Built for the morning glance', body: 'One card, one number, on the owner dashboard — not a report you have to run.' },
              ]}
            />
          </SplitContent>
          <MockFrameWithLink panel="money" label="Try Money Loop yourself" minHeight={340}>
            <PMMain>
              <PMTitleRow title="Money Loop" sub="OWNER · FY2026" />
              <div style="background: var(--gw-cream-200); border-radius: 10px; padding: 20px; margin-top: 6px;">
                <div style="font-size: 12.5px; color: var(--gw-ink-700); margin-bottom: 10px;">
                  How we're tracking: <strong style="color: var(--gw-ink-900);">83%</strong> of what it costs to keep the doors open this year
                </div>
                <div style="height: 10px; background: var(--gw-cream-300); border-radius: 5px; overflow: hidden;">
                  <div style="width: 83%; height: 100%; background: linear-gradient(90deg, var(--gw-forest-600), var(--gw-green-500));"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: var(--gw-ink-500); margin-top: 8px;">
                  <span>Overhead pool · $612k</span>
                  <span>Covered · $508k</span>
                </div>
              </div>
            </PMMain>
          </MockFrameWithLink>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <MockFrameWithLink panel="budget" label="Try Budget & Rates yourself" minHeight={340}>
            <PMMain>
              <PMTitleRow title="Budget & Rates" sub="LABOR · MACHINE · OVERHEAD" />
              <div class="pm-card" style="margin-bottom: 10px;">
                <div class="pm-card-h">Labor Rates <span class="chip">Crew A Install</span></div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  {[
                    { label: 'Base wage', value: '$24.00/hr' },
                    { label: 'Burden (tax, comp, benefits)', value: '+$9.80/hr' },
                    { label: 'Equipment allocation', value: '+$4.10/hr' },
                    { label: 'Fully burdened rate', value: '$37.90/hr', strong: true },
                  ].map((r) => (
                    <div style={`background: ${r.strong ? 'var(--gw-forest-800)' : 'var(--gw-cream-200)'}; color: ${r.strong ? 'white' : 'inherit'}; border-radius: 6px; padding: 8px 10px;`}>
                      <div style={`font-size: 9.5px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2px; ${r.strong ? 'color: #B7CFC1;' : 'color: var(--gw-ink-500);'}`}>{r.label}</div>
                      <div style="font-size: 13px; font-weight: 600;">{r.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="pm-card" style="margin-bottom: 10px;">
                <div class="pm-card-h">Machine Rates <span class="chip">Fleet</span></div>
                {[
                  { name: 'Skid steer', rate: '$46.00/hr burdened' },
                  { name: '¾-ton dump truck', rate: '$31.50/hr burdened' },
                ].map((m, i) => (
                  <div style={`display: flex; justify-content: space-between; padding: 6px 0; font-size: 11.5px;${i < 1 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <span>{m.name}</span><span style="color: var(--gw-ink-500);">{m.rate}</span>
                  </div>
                ))}
              </div>
              <div class="pm-card">
                <div class="pm-card-h">Overhead Pools <span class="chip">Immutable history</span></div>
                <div style="font-size: 11.5px; color: var(--gw-ink-500); padding: 6px 0; border-bottom: 1px solid var(--gw-cream-300);">Shop & yard · $612k/yr pool · effective Jul 1, 2026</div>
                <div style="font-size: 11.5px; color: var(--gw-ink-500); padding: 6px 0;">Insurance & admin · $198k/yr pool · effective Jan 1, 2026</div>
              </div>
            </PMMain>
          </MockFrameWithLink>
          <SplitContent
            eyebrow="Budget & Rates"
            title="The burdened-cost engine behind every price you charge."
            lede="Most CRMs let you type in a price. Budget & Rates calculates what a job actually costs — labor burden, equipment, and overhead allocation — so quoting under cost stops being a guessing game."
          >
            <SplitList
              items={[
                { num: '→', title: 'True burdened labor cost', body: 'Wage + payroll tax + workers comp + benefits, rolled into one rate.' },
                { num: '→', title: 'Equipment & overhead pools', body: 'Allocate fleet, tools, and overhead into the rate that prices the job.' },
                { num: '→', title: 'Immutable rate history', body: "Saving never edits an existing rate — it writes a new version. Old jobs keep the rate they were priced at." },
                { num: '→', title: 'Feeds Money Loop & estimates', body: 'The same numbers price a job, cost a job, and roll up into overhead coverage.' },
              ]}
            />
          </SplitContent>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <MockFrame>
            <PMMain>
              <PMTitleRow title="Invoice #INV-2026-0184" sub="D. PATEL · HARDSCAPE INSTALL" />
              <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 14px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="font-size: 11px; letter-spacing: 0.1em; color: var(--gw-ink-500); text-transform: uppercase; font-weight: 600;">Total invoiced</span>
                  <span style="font-family: var(--font-serif); font-size: 24px; font-weight: 500;">$52,000.00</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="font-size: 12px; color: var(--gw-ink-500);">Deposit collected (Jul 3)</span>
                  <span style="font-size: 12px; color: var(--gw-green-500);">−$15,600.00</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; color: var(--gw-ink-500);">Balance due (Aug 15)</span>
                  <span style="font-size: 12px; font-weight: 600;">$36,400.00</span>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button style="background: var(--gw-green-600); color: white; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 500; border: none;">Record payment</button>
                <button style="background: white; border: 1px solid var(--gw-line); color: var(--gw-ink-900); padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 500;">Send reminder</button>
                <button style="background: white; border: 1px solid var(--gw-line); color: var(--gw-ink-900); padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 500;">View in QuickBooks</button>
              </div>
            </PMMain>
          </MockFrame>
          <SplitContent
            eyebrow="Invoices & Payments"
            title="Send. Track. Reconcile. Done."
            lede="Invoices generated from a job. Partial payments accepted. Deposits held. Statements aged. The whole flow lives inside the same system that closed the deal."
          >
            <SplitList
              items={[
                { num: '→', title: 'Invoices tied to jobs', body: 'Every invoice references the estimate, job, and change orders behind it.' },
                { num: '→', title: 'Partial payment support', body: 'Deposits, progress billing, retainage — supported natively.' },
                { num: '→', title: 'Payment collection', body: 'Stripe-powered card + ACH. Client portal for self-serve payment.' },
                { num: '→', title: 'Auto-reminders', body: 'Overdue reminders send on your schedule, with your voice.' },
              ]}
            />
          </SplitContent>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/sales', title: 'Sales', desc: 'Sold deals flow into invoices automatically.' },
          { href: '/product/operations', title: 'Operations', desc: 'Completed jobs trigger invoice creation.' },
          { href: '/product/my-day', title: 'My Day', desc: 'The daily invoicing queue.' },
          { href: '/product/admin', title: 'Admin', desc: 'Approval workflows for financial changes.' },
        ]}
      />

      <CTABand
        title={<>Stop chasing money you already <em>earned.</em></>}
        description="Send us a sample of your open invoices — we will show you how much cleaner this can look."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
