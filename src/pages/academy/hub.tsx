import { Layout } from '../../components/Layout'
import { CTABand } from '../../components/Blocks'
import { TrackCard } from '../../components/Academy'

export function AcademyHubPage() {
  return (
    <Layout
      title="Groundwork Academy — Groundwork CRM"
      description="Four structured training tracks built into Groundwork — Sales Academy, Estimating 101, Financial Literacy, and the CRM Guide."
      path="/academy"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Groundwork Academy</span>
          <h1 style="margin-top: 20px;">
            Training that lives inside&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">the tool people already use.</em>
          </h1>
          <p class="lede">
            Groundwork Academy isn't a PDF nobody reads or a one-time onboarding call. It's four structured tracks —
            Sales Academy, Estimating 101, Financial Literacy, and the CRM Guide — built directly into the sidebar,
            with lesson-by-lesson progress, phase checklists, and a manager-visible completion view.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <TrackCard
              href="/academy/sales"
              icon="graduation-cap"
              label="For sales & estimating reps"
              title="Sales Academy"
              desc="Master consultative selling, close more deals, and earn certifications — from New Hire to Apprentice and beyond."
              meta="9 modules · 3 training phases · badges & quizzes"
            />
            <TrackCard
              href="/academy/estimating-101"
              icon="ruler"
              label="For anyone who builds a price"
              title="Estimating 101"
              desc="How to scope a site walk, price materials and labor honestly, and present an estimate that closes at the right margin."
              meta="6 lessons · scope, pricing, margin"
            />
            <TrackCard
              href="/academy/financial-literacy"
              icon="dollar"
              label="For owners & office managers"
              title="Financial Literacy"
              desc="Read and use financial data with confidence — P&L, gross vs. net margin, cash flow, and budget vs. actual."
              meta="5 lessons · P&L, cash flow, budget vs actual"
            />
            <TrackCard
              href="/academy/crm-guide"
              icon="clipboard"
              label="For every new hire"
              title="CRM Guide"
              desc="Walkthroughs of every major section of Groundwork — the fastest way to get a new hire from zero to productive."
              meta="7 modules · navigation, workflows, best practices"
            />
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 40px;">
            <span class="eyebrow">Why it's built in, not bolted on</span>
            <h2 style="margin-top: 20px;">Training that shows up where the work happens.</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {[
              { title: 'Progress tracking, not honor system', body: 'Each track tracks lessons completed, phase progress, and — for Sales Academy — points, badges, and quizzes. Managers see who has actually finished what.' },
              { title: 'Company-specific, not generic', body: 'Sales Academy renders your own pipeline stages as its "Company Playbook," so reps train on the process they actually run, not a stock sales course.' },
              { title: 'Assigned per role', body: "New sales hires start on Sales Academy. New estimators get Estimating 101. Everyone gets the CRM Guide. Admins choose what's required." },
            ].map((c) => (
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 26px 28px;">
                <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 8px;">{c.title}</div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500);">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>See Groundwork Academy loaded with <em>your</em> pipeline.</>}
        description="In the demo, we'll show Sales Academy's Company Playbook rendering your actual stages, not a stock example."
        secondaryHref="/resources"
        secondaryLabel="Back to resources"
      />
    </Layout>
  )
}
