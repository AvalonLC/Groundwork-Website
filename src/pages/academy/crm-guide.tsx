import { Layout } from '../../components/Layout'
import { CTABand, RelatedCards } from '../../components/Blocks'
import { AcademyHero, Lesson } from '../../components/Academy'

export function AcademyCrmGuidePage() {
  return (
    <Layout
      title="CRM Guide — Groundwork Academy"
      description="Walkthroughs of every major section of Groundwork — a seven-module training track for every new hire."
      path="/academy/crm-guide"
    >
      <AcademyHero
        eyebrow="Groundwork Academy · CRM Guide"
        title={<>From zero to&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">productive, on day one.</em></>}
        lede="Seven walkthroughs covering every major section of Groundwork — assigned to every new hire regardless of role, because everyone works inside the same five workspaces."
        meta="7 modules · navigation · workflows · best practices"
      />

      <section class="section" style="padding-top: 0;">
        <div class="wrap">
          <div style="max-width: 780px;">
            <Lesson n={1} title="The 5-Workspace Model" type="Overview" duration="4 min">
              Groundwork is organized into five workspaces — Sales, Operations, Financial, Admin, and Reports — and
              almost everything a new hire needs to find lives in exactly one of them. This module builds the mental
              map before touching any actual data, so nothing feels buried later.
            </Lesson>
            <Lesson n={2} title="Managing Leads & the Pipeline" type="Walkthrough" duration="6 min">
              How a lead enters the system, moves through pipeline stages, and what "done" looks like at each one —
              the same stages Sales Academy's Company Playbook covers in depth, shown here from the day-to-day
              perspective of actually working a lead list.
            </Lesson>
            <Lesson n={3} title="Clients, Properties & History" type="Walkthrough" duration="5 min">
              Where client records live, how properties attach to a client, and how to find the full history of
              past estimates, jobs, and invoices for any account without digging through email threads.
            </Lesson>
            <Lesson n={4} title="Estimates → Invoices → Payments" type="Walkthrough" duration="7 min">
              The full financial thread of a job, start to finish: how an approved estimate becomes an invoice, how
              deposits and progress billing get applied, and how a payment closes the loop. This is the same thread
              Financial Literacy covers from the numbers side — this module covers it from the clicks side.
            </Lesson>
            <Lesson n={5} title="Work Orders & Scheduling" type="Walkthrough" duration="6 min">
              How a won job turns into a work order, gets scheduled on the dispatch board, and gets assigned to a
              crew — plus what to do when a schedule changes at the last minute, which it always does.
            </Lesson>
            <Lesson n={6} title="Tasks & Command Center" type="Walkthrough" duration="5 min">
              Where day-to-day follow-ups live, how tasks get assigned and closed, and how the Command Center view
              surfaces what actually needs attention today instead of a stale to-do list nobody opens.
            </Lesson>
            <Lesson n={7} title="Reports & Data Reads" type="Walkthrough" duration="5 min">
              A tour of the reports every role checks regularly — Business Pulse, Financial Snapshot, Money Loop,
              and Operations Snapshot — and which one answers which question, so new hires know where to look
              instead of asking a manager first.
            </Lesson>
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 24px;">
            <span class="eyebrow">Assigned to everyone</span>
            <h2 style="margin-top: 20px;">The one track every new hire gets, regardless of role.</h2>
            <p class="lede">
              Sales Academy and Estimating 101 are role-specific. The CRM Guide isn't — it's the shared foundation
              every new hire completes in their first week, so a new estimator, a new office admin, and a new crew
              lead all start from the same working knowledge of where things live.
            </p>
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Other Academy tracks"
        items={[
          { href: '/academy/sales', title: 'Sales Academy', desc: 'The pipeline stages, in depth.' },
          { href: '/academy/estimating-101', title: 'Estimating 101', desc: 'The pricing math behind every estimate.' },
          { href: '/academy/financial-literacy', title: 'Financial Literacy', desc: 'The reports covered in Module 7.' },
          { href: '/product', title: 'Product overview', desc: 'The five workspaces this guide walks through.' },
        ]}
      />

      <CTABand
        title={<>Get a new hire productive in&nbsp;<em>their first week.</em></>}
        description="A specialist will show you the CRM Guide and how new-hire onboarding actually works inside Groundwork."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
