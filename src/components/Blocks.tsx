import type { PropsWithChildren } from 'hono/jsx'
import { Button } from './Button'

// Shared marketing-site building blocks, ported from styles.css component
// classes (.cta-band, .subpage-hero, .section-head, .bento-card, .tm-card,
// .faq-item, .related-card, etc). Each keeps the original class names so
// styles.css continues to drive the visuals unchanged.

export function CTABand({
  eyebrow = 'Book a demo',
  title,
  description,
  primaryHref = '/demo',
  primaryLabel = 'Book a demo',
  secondaryHref = '/features',
  secondaryLabel = 'Explore the product',
  showLogin = false,
  meta,
}: {
  eyebrow?: string
  title: any
  description: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  showLogin?: boolean
  meta?: any
}) {
  return (
    <section class="section" id="demo-cta" data-screen-label="Demo CTA">
      <div class="wrap">
        <div class="cta-band">
          <div>
            <span class="eyebrow" style="color: #7CC9A3;">
              {eyebrow}
            </span>
            <h2 style="margin-top: 20px;">{title}</h2>
            <p>{description}</p>
          </div>
          <div class="cta-side">
            <Button href={primaryHref} variant="primary" arrow style="justify-content: center;">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" style="justify-content: center;">
              {secondaryLabel}
            </Button>
            {showLogin && (
              <a
                href="/login"
                style="text-align: center; color: #7CC9A3; font-size: 13.5px; padding: 8px; text-decoration: underline; text-underline-offset: 3px;"
              >
                Already a customer? Log in →
              </a>
            )}
            {meta}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SubpageHero({
  eyebrow,
  title,
  lede,
  primaryHref = '/demo',
  primaryLabel = 'Book a demo',
  secondaryHref = '/features',
  secondaryLabel = 'See all features',
}: {
  eyebrow: string
  title: any
  lede: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section class="section subpage-hero">
      <div class="wrap">
        <span class="eyebrow">{eyebrow}</span>
        <h1 style="margin-top: 20px;">{title}</h1>
        <p class="lede">{lede}</p>
        <div style="display:flex; gap:12px; margin-top:32px; flex-wrap:wrap;">
          <Button href={primaryHref} variant="primary" arrow>
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string
  title: any
  lede?: string
  center?: boolean
}) {
  return (
    <div class="section-head" style={center ? 'text-align: center; margin: 0 auto 56px;' : undefined}>
      <span class="eyebrow" style={center ? 'justify-content: center;' : undefined}>
        {eyebrow}
      </span>
      <h2 style="margin-top: 20px;">{title}</h2>
      {lede && <p class="lede" style={center ? 'margin: 20px auto 0;' : undefined}>{lede}</p>}
    </div>
  )
}

export function RelatedCards({
  heading = 'Related in Product',
  items,
}: {
  heading?: string
  items: { href: string; title: string; desc: string }[]
}) {
  return (
    <section class="section" style="padding: 64px 0;">
      <div class="wrap">
        <h3 style="font-family: var(--font-serif); font-weight: 400; font-size: 30px; margin-bottom: 32px;">
          {heading}
        </h3>
        <div style={`display: grid; grid-template-columns: repeat(${items.length}, 1fr); gap: 20px;`}>
          {items.map((it) => (
            <a
              href={it.href}
              style="display: block; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 24px; text-decoration: none;"
            >
              <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 6px;">
                {it.title}
              </div>
              <div style="font-size: 13.5px; color: var(--gw-ink-500);">{it.desc}</div>
              <div style="margin-top: 14px; font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">
                Read more →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BentoCard({
  href,
  icon,
  title,
  desc,
  size = 'narrow',
  dark = false,
  linkLabel,
}: {
  href?: string
  icon: any
  title: string
  desc: string
  size?: 'wide' | 'narrow' | 'tiny'
  dark?: boolean
  linkLabel?: string
}) {
  const cls = `bento-card ${size}${dark ? ' dark' : ''}`
  const content = (
    <>
      <div class="b-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      {linkLabel && (
        <div
          style={`margin-top: ${href ? '20px' : 'auto'}; font-size: 12px; color: ${dark ? '#7CC9A3' : 'var(--gw-forest-700)'}; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600;${href ? '' : ' padding-top: 14px;'}`}
        >
          {linkLabel}
        </div>
      )}
    </>
  )
  if (href) {
    return (
      <a href={href} class={cls} style="text-decoration: none;">
        {content}
      </a>
    )
  }
  return <div class={cls}>{content}</div>
}

export function TestimonialCard({
  quote,
  initials,
  name,
  role,
}: {
  quote: string
  initials: string
  name: string
  role: string
}) {
  return (
    <div class="tm-card">
      <div class="quote">{quote}</div>
      <div class="tm-author">
        <div class="tm-avatar">{initials}</div>
        <div class="who">
          <div class="name">{name}</div>
          <div class="role">{role}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQItem({ question, children, open = false }: PropsWithChildren<{ question: string; open?: boolean }>) {
  return (
    <details class="faq-item" open={open}>
      <summary>{question}</summary>
      <div class="answer">{children}</div>
    </details>
  )
}

export function SplitList({ items }: { items: { num: string; title: string; body: string }[] }) {
  return (
    <ul class="split-list">
      {items.map((it) => (
        <li>
          <span class="num-pill">{it.num}</span>
          <div>
            <strong>{it.title}</strong>
            <span>{it.body}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
