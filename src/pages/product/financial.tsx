import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { SplitContent, MockFrame } from '../../components/SplitFeature'
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
          <MockFrame>
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
          </MockFrame>
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
