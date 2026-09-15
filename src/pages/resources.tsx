import { Layout } from '../components/Layout'
import { CTABand, SectionHead } from '../components/Blocks'
import { PM, PMMain, PMTitleRow, PMStats, PMCard } from '../components/ProductMock'

export function ResourcesPage() {
  const cards = [
    {
      href: '/academy',
      title: 'Groundwork Academy',
      desc: 'Structured training tracks for every seat — Sales Academy, Estimating 101, Financial Literacy, and the CRM Guide.',
    },
    {
      href: '#implementation',
      title: 'Implementation guide',
      desc: 'What to expect from a Groundwork rollout — week-by-week, role-by-role. Data checklist, training plan, go-live protocol.',
    },
    {
      href: '#blog',
      title: 'Blog · Field notes',
      desc: 'Writing about running service businesses well — process, people, systems, and the software that supports the work.',
    },
    {
      href: '#help',
      title: 'Help center',
      desc: 'Product documentation, troubleshooting guides, and video walkthroughs for every workspace.',
    },
    {
      href: '#api',
      title: 'API docs',
      desc: 'REST API + webhooks. Build custom integrations against every object in Groundwork.',
    },
    {
      href: '/faq',
      title: 'FAQ',
      desc: 'Answers to the most common questions from operators evaluating Groundwork.',
    },
  ]

  const posts = [
    {
      tag: 'Sales',
      time: '8 min read',
      title: 'How to run a discovery call for a $50k landscape sale',
      desc: 'A step-by-step framework for the discovery call that separates budget-qualified leads from tire-kickers.',
    },
    {
      tag: 'Operations',
      time: '6 min read',
      title: 'The dispatch board is a leadership tool',
      desc: 'Why your scheduling screen tells you more about the health of your ops than any KPI report.',
    },
    {
      tag: 'Owner',
      time: '10 min read',
      title: 'The three dashboards every service business owner should open in the morning',
      desc: 'Business Pulse, Financial Snapshot, Money Loop, Operations Snapshot — and what to do with each in the first 15 minutes of the day.',
    },
  ]

  return (
    <Layout
      title="Resources — Groundwork CRM"
      description="Groundwork Academy, implementation guides, FAQ, blog, help center, and API docs."
      path="/resources"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Resources</span>
          <h1 style="margin-top: 20px;">
            Everything to help you use&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">Groundwork.</em>
          </h1>
          <p class="lede">
            Structured training, implementation playbooks, help documentation, and a growing library of writing about
            how service businesses actually run.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {cards.map((card) => (
              <a
                href={card.href}
                style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 14px; padding: 28px; display: block;"
              >
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 10px;">
                  {card.title}
                </div>
                <div style="font-size: 14px; color: var(--gw-ink-500);">{card.desc}</div>
                <div style="margin-top: 16px; font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section class="section" id="academy" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);">
        <div class="wrap split" style="align-items: center;">
          <div class="split-content">
            <span class="eyebrow">Groundwork Academy</span>
            <h2 style="margin-top: 20px;">Structured training, built into the platform.</h2>
            <p class="lede">
              Groundwork Academy isn't a PDF nobody reads. It's a set of role-specific training tracks — Sales
              Academy, Estimating 101, Financial Literacy, and the CRM Guide — with progress tracking, phase
              checklists, and a live view of who has finished what.
            </p>
            <a
              href="/academy"
              style="display: inline-flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 13px; font-weight: 600; color: var(--gw-forest-700); text-decoration: none; letter-spacing: 0.02em;"
            >
              See all 4 tracks, with real lesson notes →
            </a>
          </div>
          <PM minHeight={460} shadow="var(--shadow-lg)">
            <PMMain>
              <PMTitleRow title="Sales Academy" sub="TRAINING · TEAM PROGRESS" />
              <PMStats
                stats={[
                  { label: 'Enrolled', value: '6' },
                  { label: 'Completed', value: '4', variant: 'sold' },
                  { label: 'In Progress', value: '2' },
                  { label: 'Avg. Score', value: '91%' },
                ]}
              />
              <PMCard heading="Training Phases" chip="4 phases">
                {[
                  { phase: 'Phase 1 · Discovery Fundamentals', status: 'Complete', variant: 'rapport' },
                  { phase: 'Phase 2 · Budget Conversations', status: 'Complete', variant: 'rapport' },
                  { phase: 'Phase 3 · Objection Handling', status: 'In Progress', variant: 'follow' },
                  { phase: 'Phase 4 · Closing the Deal', status: 'Not Started', variant: 'website' },
                ].map((p, i) => (
                  <div style={`display: flex; justify-content: space-between; align-items: center; padding: 8px 0;${i < 3 ? ' border-bottom: 1px solid var(--gw-cream-300);' : ''}`}>
                    <span style="font-size: 12.5px; font-weight: 600;">{p.phase}</span>
                    <span class={`tag tag-${p.variant}`}>{p.status}</span>
                  </div>
                ))}
              </PMCard>
            </PMMain>
          </PM>
        </div>
      </section>

      <section
        class="section"
        id="blog"
        style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);"
      >
        <div class="wrap">
          <SectionHead eyebrow="Latest from the blog" title="Field notes for operators." />
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            {posts.map((p) => (
              <a
                href="/resources#blog"
                style="display: block; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 24px; text-decoration: none;"
              >
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600;">
                    {p.tag}
                  </span>
                  <span style="font-size: 12px; color: var(--gw-ink-500);">{p.time}</span>
                </div>
                <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 10px; line-height: 1.25;">
                  {p.title}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500);">{p.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Prefer to see the software in&nbsp;action?</>}
        description="A specialist will show you how Groundwork solves the problems this content is talking about."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
