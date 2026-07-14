import { Layout } from '../components/Layout'
import { CTABand, TestimonialCard, SectionHead } from '../components/Blocks'

export function CustomersPage() {
  const logos = [
    'Avalon Landscape',
    'Northline HVAC',
    'Cedar Grove Co.',
    'Redwater Plumbing',
    'Ridgeline Exteriors',
    'Ironhouse Services',
  ]

  const testimonials = [
    {
      quote:
        "We replaced three tools and a very tired spreadsheet the first week. My sales manager can actually see the pipeline now — and I can see whether we'll hit the month before it's over.",
      initials: 'MK',
      name: 'Marcus Kolar',
      role: 'Owner · Regional landscape company',
    },
    {
      quote:
        "Follow-ups don't slip anymore. That's the whole thing. Every rep opens the same daily view, works the queue, and closes deals we would have lost to silence.",
      initials: 'AR',
      name: 'Angela Ruiz',
      role: 'Office Manager · Home services group',
    },
    {
      quote:
        'Field Mode is the first "office" software my foremen have actually used on their own. They open it in the truck, do the day, close it out. That was never happening before.',
      initials: 'DT',
      name: 'Derek Thompson',
      role: 'Operations Director · Multi-crew field service',
    },
    {
      quote:
        "We used to think our operations were the problem. Turns out our operations were fine — the tools just didn't talk to each other. One system. Different business.",
      initials: 'JN',
      name: 'Jennifer Nakamura',
      role: 'Owner · Landscape + hardscape',
    },
    {
      quote:
        'The permission model sold us. Every seat sees the workspace built for their job. My laborers use software now. That sentence still surprises me.',
      initials: 'RM',
      name: 'Ricardo Muñoz',
      role: 'GM · Field service · 4 branches',
    },
    {
      quote: 'My office manager saves eight hours a week just on invoicing. That was the pilot ROI in the second month.',
      initials: 'LT',
      name: 'Lisa Tremaine',
      role: 'Owner · Multi-service home business',
    },
  ]

  const caseStudies = [
    {
      tag: 'Landscape · 24 employees',
      company: 'Avalon Landscape',
      title: 'From spreadsheet chaos to $186k month.',
      desc: 'The 6-week story of migrating a 24-person landscape company off a Rolodex of tools.',
    },
    {
      tag: 'Home service · 3 branches',
      company: 'Northline HVAC',
      title: 'Same-day dispatch, callbacks under 4%.',
      desc: 'How one regional HVAC operator dropped their callback rate and doubled tune-up renewals.',
    },
    {
      tag: 'Restoration · Insurance-driven',
      company: 'Ridgeline Exteriors',
      title: 'One system for adjusters, PMs, and crews.',
      desc: 'The paperwork problem restoration teams face — and what changed when it lived in Groundwork.',
    },
  ]

  return (
    <Layout
      title="Customers — Groundwork CRM"
      description="Service businesses running on Groundwork — testimonials, case studies, and customer voice."
      path="/customers"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Customers</span>
          <h1 style="margin-top: 20px;">The teams building on&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">Groundwork.</em></h1>
          <p class="lede">
            From owner-operators to multi-crew operations. Landscape, home service, field service. Here's what
            changes when you have one system for the whole business.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 20px;">
        <div class="wrap">
          <div class="logostrip-inner" style="justify-content: space-around; padding: 20px 0 40px;">
            {logos.map((l, i) => (
              <span class="logo-mark">
                <span class={`sq${i % 2 === 1 ? ' circle' : ''}`}></span> {l}
              </span>
            ))}
          </div>
          <div class="testimonials">
            {testimonials.map((t) => (
              <TestimonialCard quote={t.quote} initials={t.initials} name={t.name} role={t.role} />
            ))}
          </div>
          <div class="tm-note">— Illustrative customer voice · Real testimonials to be added at launch</div>
        </div>
      </section>

      <section
        class="section"
        id="case-studies"
        style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line);"
      >
        <div class="wrap">
          <SectionHead
            eyebrow="Case studies"
            title="Featured customer stories."
            lede="Deeper looks at how specific teams changed their operations after moving to Groundwork."
          />
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {caseStudies.map((cs) => (
              <a
                href="/case-studies"
                style="display: block; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 28px 26px; text-decoration: none;"
              >
                <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 12px;">
                  {cs.tag}
                </div>
                <div style="font-family: var(--font-serif); font-size: 14px; font-weight: 500; color: var(--gw-ink-500); margin-bottom: 6px;">
                  {cs.company}
                </div>
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 12px;">
                  {cs.title}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 16px;">{cs.desc}</div>
                <div style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">
                  Read the story →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Ready to be the next&nbsp;story?</>}
        description="Talk to a specialist who has walked this migration with 100+ service teams."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
