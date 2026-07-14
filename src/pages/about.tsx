import { Layout } from '../components/Layout'
import { CTABand, SectionHead } from '../components/Blocks'

export function AboutPage() {
  const principles = [
    {
      title: 'Grounded, not clever',
      body: 'If a feature does not help an owner, an office manager, a rep, a foreman, or a laborer do their actual job — it does not ship.',
    },
    {
      title: 'Configured, not templated',
      body: 'Every business is different. Groundwork adapts to yours during onboarding, not the other way around.',
    },
    {
      title: 'Office and field, together',
      body: 'The gap between office and truck is where money leaks. Groundwork closes it.',
    },
    {
      title: 'Fast to live',
      body: 'Two to three weeks. Not two to three quarters.',
    },
    {
      title: 'Honest',
      body: 'No manufactured urgency. No dark patterns. If Groundwork is not right for you, we will say so.',
    },
  ]

  const team = [
    {
      initials: 'TR',
      name: 'Tyler Reid',
      role: 'CEO · Founder',
      bio: 'Former owner, regional landscape company. 12 years running crews before writing a line of software.',
    },
    {
      initials: 'AR',
      name: 'Angela Ruiz',
      role: 'VP Product',
      bio: "Former COO of a 3-branch home service group. Now designs the workspace she wishes she'd had.",
    },
    {
      initials: 'DT',
      name: 'Derek Thompson',
      role: 'VP Ops & Implementation',
      bio: '20 years in restoration. Leads customer implementation & the migration playbook.',
    },
    {
      initials: 'MK',
      name: 'Marcus Kolar',
      role: 'VP Engineering',
      bio: 'Built distributed systems at Stripe. Now writes the plumbing under Groundwork.',
    },
  ]

  return (
    <Layout title="About — Groundwork CRM" description="Why Groundwork exists — and who built it." path="/about">
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">About</span>
          <h1 style="margin-top: 20px;">
            Practical software, built for real&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">operators.</em>
          </h1>
          <p class="lede">
            Groundwork was built by people who have run service companies — not by product managers who have never
            dispatched a crew. Every screen, every default, every stage is shaped by the actual work.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
            <div>
              <span class="eyebrow">The why</span>
              <h2 style="margin-top: 20px;">Service businesses deserve better tools.</h2>
              <p class="lede" style="margin-top: 20px;">
                The market gave service operators a choice: generic CRMs (Salesforce, HubSpot) that treat every
                business the same, or industry-specific tools that peaked in 2015 and never modernized. Neither
                works.
              </p>
              <p style="color: var(--gw-ink-700); font-size: 15.5px; margin-top: 16px;">
                Groundwork is what happens when a group of people who have run landscape and home service companies
                decide to build the software they always wanted — and then bring in operators from adjacent trades to
                make sure it works for them too.
              </p>
            </div>
            <div>
              <span class="eyebrow">Principles</span>
              <ul style="list-style: none; padding: 0; margin: 20px 0 0;">
                {principles.map((p) => (
                  <li style="padding: 18px 0; border-bottom: 1px solid var(--gw-cream-300);">
                    <div style="font-weight: 600; color: var(--gw-ink-900); margin-bottom: 4px;">{p.title}</div>
                    <div style="font-size: 14px; color: var(--gw-ink-500);">{p.body}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        class="section"
        style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);"
      >
        <div class="wrap">
          <SectionHead
            eyebrow="The team"
            title="People who have carried the pager."
            lede="Our leadership includes former owners and GMs of landscape, HVAC, and restoration businesses — plus product engineers who have built at scale. It's not a coincidence."
          />
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
            {team.map((t) => (
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 24px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--gw-forest-700); color: white; display: grid; place-items: center; font-weight: 600; margin-bottom: 14px;">
                  {t.initials}
                </div>
                <div style="font-family: var(--font-serif); font-size: 18px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 2px;">
                  {t.name}
                </div>
                <div style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 10px;">
                  {t.role}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500);">{t.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Come see what&nbsp;we've built.</>}
        description="A specialist will walk you through the workspace. Then you decide."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
