import { Layout } from '../../components/Layout'
import { CTABand, RelatedCards } from '../../components/Blocks'
import { AcademyHero, PhaseBlock, PlaybookStage } from '../../components/Academy'

export function AcademySalesPage() {
  const playbook = [
    { title: 'New Lead', desc: 'The inquiry is acknowledged, assigned, and ready for contact.' },
    { title: 'Intro Call', desc: 'The customer and representative agree on the appropriate next step.' },
    { title: 'On-Site Consultation', desc: 'The property, desired result, stakeholders, and constraints are documented.' },
    { title: 'Estimate Development', desc: 'A complete and internally approved solution is ready for review.' },
    { title: 'Estimate Presentation', desc: 'The customer has reviewed the scope, options, and investment with a representative.' },
    { title: 'Decision Pending', desc: 'The open concern has an owner, action, and due date.' },
    { title: 'Won', desc: 'The final outcome and handoff or loss context are complete.' },
    { title: 'Lost', desc: 'The final outcome and handoff or loss context are complete.' },
  ]

  return (
    <Layout
      title="Sales Academy — Groundwork Academy"
      description="Master consultative selling, close more deals, and earn certifications — a training track built directly into Groundwork."
      path="/academy/sales"
    >
      <AcademyHero
        eyebrow="Groundwork Academy · Sales Academy"
        title={<>Master consultative selling, close more deals, and&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">earn your certifications.</em></>}
        lede="Sales Academy renders your own pipeline as its Company Playbook, then walks every rep through three training phases — Foundations, Execution, and Mastery — with points, badges, and quizzes along the way."
        meta="9 modules · 3 phases · 0–100 points · 15 badges"
      />

      <section class="section" style="padding-top: 0;">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 32px;">
            <span class="eyebrow">Company Playbook</span>
            <h2 style="margin-top: 20px;">The stages a rep is actually trained on — because they're the stages you run.</h2>
            <p class="lede">
              Before a single lesson opens, Sales Academy shows the rep your real pipeline stages, each with a plain
              definition of what "done" looks like at that stage. This is generated from your own configured
              pipeline — not a generic sales-course example.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 8px 28px;">
            {playbook.map((s, i) => (
              <PlaybookStage n={i + 1} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 40px;">
            <span class="eyebrow">Training Phases</span>
            <h2 style="margin-top: 20px;">Three phases. Nine modules. One certification path.</h2>
          </div>

          <PhaseBlock
            phase="Phase 1 · Foundations"
            title="Master the mindset, the process, and the discipline of discovery."
            desc="The bedrock of every sale — before a rep ever quotes a price, they learn how to think like a consultant, not a salesperson."
          >
            <div style="display: grid; gap: 4px;">
              {[
                { title: 'The Company Way of Selling', meta: 'Module 1 · ~35 min · Beginner', body: 'The consultative mindset behind every stage of the pipeline — why "understand the problem" comes before "pitch the solution." This module is generated from your own playbook, so the framing matches how your company actually sells.' },
                { title: 'Core Buying Reasons', meta: 'Module 2 · ~20 min · Beginner', body: 'The handful of real reasons a homeowner or property manager actually says yes — and how to surface the true one on the intro call.' },
                { title: 'Discovery Discipline', meta: 'Module 3 · ~25 min · Beginner', body: 'A repeatable framework for the on-site consultation: property, desired result, stakeholders, and constraints — captured every time, not just when it\'s convenient.' },
              ].map((m) => (
                <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 10px; padding: 16px 18px; display: flex; justify-content: space-between; gap: 16px; align-items: baseline;">
                  <div>
                    <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 14px; margin-bottom: 4px;">{m.title}</div>
                    <div style="font-size: 13px; color: var(--gw-ink-500);">{m.body}</div>
                  </div>
                  <div style="flex: none; font-size: 10.5px; color: var(--gw-ink-400); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">{m.meta}</div>
                </div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock
            phase="Phase 2 · Execution"
            title="Site walks, scoping, estimating, and proposals that close at the right margin."
            desc="This is where selling meets the actual math of the job — the same math Estimating 101 covers in depth, applied under sales conditions."
          >
            <div style="display: grid; gap: 4px;">
              {[
                { title: 'Running the Site Walk', meta: 'Module 4 · ~30 min · Intermediate', body: 'What to measure, photograph, and ask on-site so the estimate that follows doesn\'t need a second visit.' },
                { title: 'Scoping Without Scope Creep', meta: 'Module 5 · ~20 min · Intermediate', body: 'Where to draw the line on what\'s included — and how to price the "maybe" items as clear add-ons instead of silent assumptions.' },
                { title: 'Estimating at the Right Margin', meta: 'Module 6 · ~25 min · Intermediate', body: 'Applies Budget & Rates\' burdened-cost math to real proposals — why "competitive" and "profitable" are not the same number.' },
                { title: 'Delivering the Proposal', meta: 'Module 7 · ~20 min · Intermediate', body: 'How to present options (not just one number), frame the investment, and set up the decision conversation before you leave the room.' },
              ].map((m) => (
                <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 10px; padding: 16px 18px; display: flex; justify-content: space-between; gap: 16px; align-items: baseline;">
                  <div>
                    <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 14px; margin-bottom: 4px;">{m.title}</div>
                    <div style="font-size: 13px; color: var(--gw-ink-500);">{m.body}</div>
                  </div>
                  <div style="flex: none; font-size: 10.5px; color: var(--gw-ink-400); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">{m.meta}</div>
                </div>
              ))}
            </div>
          </PhaseBlock>

          <PhaseBlock
            phase="Phase 3 · Mastery"
            title="Close confidently, hand off cleanly, and turn happy clients into ongoing revenue."
            desc="The final phase covers what happens after the proposal — objections, the decision conversation, and the handoff that keeps a won deal from becoming a support problem."
          >
            <div style="display: grid; gap: 4px;">
              {[
                { title: 'Objection Handling', meta: 'Module 8 · ~25 min · Advanced', body: '"Too expensive," "let me think about it," "I got another quote" — reframes for the objections that actually show up at Decision Pending.' },
                { title: 'Closing & Clean Handoff', meta: 'Module 9 · ~20 min · Advanced', body: 'How to move a Won deal into Operations with nothing lost in translation — plus the AAR-style review every closed deal (won or lost) gets, so the team gets sharper over time.' },
              ].map((m) => (
                <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 10px; padding: 16px 18px; display: flex; justify-content: space-between; gap: 16px; align-items: baseline;">
                  <div>
                    <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 14px; margin-bottom: 4px;">{m.title}</div>
                    <div style="font-size: 13px; color: var(--gw-ink-500);">{m.body}</div>
                  </div>
                  <div style="flex: none; font-size: 10.5px; color: var(--gw-ink-400); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">{m.meta}</div>
                </div>
              ))}
            </div>
          </PhaseBlock>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div style="max-width: 720px; margin-bottom: 24px;">
            <span class="eyebrow">Certification path</span>
            <h2 style="margin-top: 20px;">New Hire → Apprentice → Journeyman → Certified.</h2>
            <p class="lede">
              Every completed module earns points. Every phase completion unlocks a badge. Reps can see exactly how
              many points stand between them and the next rank — a small mechanic that turns "required training"
              into something people actually finish.
            </p>
          </div>
        </div>
      </section>

      <RelatedCards
        heading="Other Academy tracks"
        items={[
          { href: '/academy/estimating-101', title: 'Estimating 101', desc: 'The pricing math behind Phase 2, in depth.' },
          { href: '/academy/financial-literacy', title: 'Financial Literacy', desc: 'For reps who move into a management track.' },
          { href: '/academy/crm-guide', title: 'CRM Guide', desc: "Where a new rep starts on day one." },
          { href: '/product/sales', title: 'Sales module', desc: 'The pipeline this playbook is generated from.' },
        ]}
      />

      <CTABand
        title={<>Load your real pipeline into Sales Academy.</>}
        description="A specialist will show the Company Playbook rendering your actual stages, not a stock example."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
