import { Layout } from '../../components/Layout'
import { CTABand, RelatedCards } from '../../components/Blocks'
import { AcademyHero, Lesson } from '../../components/Academy'

export function AcademyFinancialLiteracyPage() {
  return (
    <Layout
      title="Financial Literacy — Groundwork Academy"
      description="Read and use financial data with confidence — a five-lesson training track built directly into Groundwork."
      path="/academy/financial-literacy"
    >
      <AcademyHero
        eyebrow="Groundwork Academy · Financial Literacy"
        title={<>Read and use financial data with&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">confidence.</em></>}
        lede="Five lessons for owners and office managers who need to actually use the numbers Groundwork already tracks — not just glance at a dashboard and hope it's fine."
        meta="5 lessons · P&L · cash flow · budget vs actual"
      />

      <section class="section" style="padding-top: 0;">
        <div class="wrap">
          <div style="max-width: 780px;">
            <Lesson n={1} title="Reading a P&L Statement" type="Lesson" duration="8 min">
              What a profit &amp; loss statement is actually telling you: revenue, cost of goods sold, gross profit,
              operating expenses, and net income, in that order. This lesson walks through Groundwork's own Financial
              Snapshot line by line so the report stops being a wall of numbers and starts being a diagnostic tool.
            </Lesson>
            <Lesson n={2} title="Gross Margin vs Net Margin" type="Lesson" duration="6 min">
              Two numbers that get confused constantly — and shouldn't be. Gross margin tells you whether the work
              itself is priced right; net margin tells you whether the business as a whole is healthy after overhead.
              A job can carry a great gross margin and the company can still lose money. This lesson explains why.
            </Lesson>
            <Lesson n={3} title="Cash Flow Basics" type="Lesson" duration="7 min">
              Profitable and solvent are not the same thing. This lesson covers the timing gap between winning a job,
              billing it, and actually getting paid — and how the Money Loop view exists specifically to make that gap
              visible before it becomes a payroll problem.
            </Lesson>
            <Lesson n={4} title="Understanding Invoices & Deposits" type="Lesson" duration="5 min">
              How deposits, progress billing, and final invoices interact with recognized revenue — and why a
              deposit sitting in the bank isn't the same as revenue you've earned yet. Covers what to check before
              treating an invoice as "done."
            </Lesson>
            <Lesson n={5} title="Budget vs Actual — Why It Matters" type="Lesson" duration="6 min">
              A budget that's never compared to what actually happened isn't a budget, it's a guess. This lesson
              covers how to read a budget-vs-actual view, spot the categories drifting first, and turn that into a
              conversation instead of a surprise at year-end.
            </Lesson>
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 24px;">
            <span class="eyebrow">Who this track is for</span>
            <h2 style="margin-top: 20px;">Not everyone needs to be an accountant. Everyone needs to read the numbers.</h2>
            <p class="lede">
              Financial Literacy isn't bookkeeping training — it's built for owners, office managers, and anyone who
              has to make a call based on what the numbers say, but didn't come up through finance. The goal is
              confidence reading Groundwork's own reports, not a general finance course.
            </p>
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Other Academy tracks"
        items={[
          { href: '/academy/sales', title: 'Sales Academy', desc: 'How margin gets set before a deal is won.' },
          { href: '/academy/estimating-101', title: 'Estimating 101', desc: 'How gross margin is built into a price.' },
          { href: '/academy/crm-guide', title: 'CRM Guide', desc: 'Where these reports live in the product.' },
          { href: '/product/financial', title: 'Budget & Rates', desc: 'The engine behind every number in this track.' },
        ]}
      />

      <CTABand
        title={<>Stop guessing at whether a job made&nbsp;<em>money.</em></>}
        description="A specialist will walk through Financial Snapshot and Money Loop and how this track teaches your team to read them."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
