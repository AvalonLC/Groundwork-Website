import { Layout } from '../../components/Layout'
import { CTABand, RelatedCards } from '../../components/Blocks'
import { AcademyHero, Lesson } from '../../components/Academy'

export function AcademyEstimating101Page() {
  return (
    <Layout
      title="Estimating 101 — Groundwork Academy"
      description="How to scope, price, and present a job — a six-lesson training track built directly into Groundwork."
      path="/academy/estimating-101"
    >
      <AcademyHero
        eyebrow="Groundwork Academy · Estimating 101"
        title={<>How to scope, price, and&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">present a job.</em></>}
        lede="Six lessons that move a new estimator from guessing to estimating — reading a site walk correctly, pricing materials and labor honestly, and protecting margin before a number ever reaches the client."
        meta="6 lessons · scope · pricing · margin"
      />

      <section class="section" style="padding-top: 0;">
        <div class="wrap">
          <div style="max-width: 780px;">
            <Lesson n={1} title="What Is an Estimate?" type="Lesson" duration="5 min">
              An estimate is not a guess and it's not a quote pulled from memory — it's a documented, defensible
              number built from a specific scope. This lesson sets the frame the rest of the track builds on: every
              line on an estimate should trace back to something you actually measured, priced, or scheduled.
            </Lesson>
            <Lesson n={2} title="Reading a Site Walk" type="Lesson" duration="8 min">
              What to measure, photograph, and ask before you leave the property — access constraints, existing
              conditions, utility locations, and the questions that prevent a change order later. A site walk done
              right means the estimate that follows doesn't need a second visit to get right.
            </Lesson>
            <Lesson n={3} title="Material Pricing Basics" type="Lesson" duration="6 min">
              How to price materials without underquoting: current supplier pricing vs. list price, waste and
              overage factors, and delivery/handling costs that are easy to forget until they eat the job's margin.
            </Lesson>
            <Lesson n={4} title="Labor Costing" type="Lesson" duration="7 min">
              The difference between what you pay a crew and what a labor hour actually costs the business — burden
              (payroll tax, workers' comp, benefits) rolled into a fully-loaded rate. This is the same math Budget
              & Rates runs behind every price in the system; this lesson explains why it matters at estimate time,
              not just at reporting time.
            </Lesson>
            <Lesson n={5} title="Building Your Margin" type="Lesson" duration="6 min">
              Once cost is known, this lesson covers how to set a target margin deliberately — instead of backing
              into whatever number "feels competitive" — and how overhead allocation factors into every job, not
              just the big ones.
            </Lesson>
            <Lesson n={6} title="Presenting the Estimate" type="Lesson" duration="5 min">
              How to walk a client through options (not just a single total), frame the investment in terms of the
              outcome, and handle the "why does this cost so much" question before it's even asked.
            </Lesson>
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 24px;">
            <span class="eyebrow">Why estimating is its own track</span>
            <h2 style="margin-top: 20px;">Underpricing is the single most common way a good job goes bad.</h2>
            <p class="lede">
              A poorly scoped estimate doesn't just risk a lost sale — it risks a won job that loses money. Estimating
              101 exists because scoping, pricing, and margin discipline are teachable skills, not instinct, and the
              cost of skipping this training shows up months later on a job that's already been completed.
            </p>
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Other Academy tracks"
        items={[
          { href: '/academy/sales', title: 'Sales Academy', desc: 'Estimating in the context of a live pipeline.' },
          { href: '/academy/financial-literacy', title: 'Financial Literacy', desc: 'How estimate margin rolls up to P&L.' },
          { href: '/academy/crm-guide', title: 'CRM Guide', desc: 'How estimates flow into invoices and payments.' },
          { href: '/product/financial', title: 'Budget & Rates', desc: 'The burdened-cost engine this track teaches.' },
        ]}
      />

      <CTABand
        title={<>Stop pricing jobs by&nbsp;<em>feel.</em></>}
        description="A specialist will walk through Budget & Rates and how Estimating 101 teaches your team to use it."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
