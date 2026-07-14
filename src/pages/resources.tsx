import { Layout } from '../components/Layout'
import { CTABand, SectionHead } from '../components/Blocks'

export function ResourcesPage() {
  const cards = [
    {
      href: '#academy',
      title: 'Groundwork Academy',
      desc: 'Structured training for every seat. 40+ short videos, workflow walkthroughs, and role-specific onboarding paths.',
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
      desc: 'Business Pulse, Financial Snapshot, Operations Snapshot — and what to do with each in the first 15 minutes of the day.',
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
