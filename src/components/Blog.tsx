import type { PropsWithChildren } from 'hono/jsx'

// Blog/article building blocks — shared by every post under /blog/:slug
// and the /blog index. Follows the same "ported component, styles.css
// drives the visuals" pattern as Blocks.tsx and Academy.tsx.

export function ArticleHero({
  tag,
  date,
  readTime,
  title,
  lede,
}: {
  tag: string
  date: string
  readTime: string
  title: any
  lede: string
}) {
  return (
    <section class="section article-hero subpage-hero">
      <div class="wrap">
        <a
          href="/blog"
          style="font-size: 12.5px; color: var(--gw-forest-700); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 18px;"
        >
          ← All posts
        </a>
        <div class="article-meta">
          <span class="tag">{tag}</span>
          <span class="dot"></span>
          <span>{date}</span>
          <span class="dot"></span>
          <span>{readTime}</span>
        </div>
        <h1 style="margin-top: 8px; max-width: 18ch;">{title}</h1>
        <p class="lede">{lede}</p>
      </div>
    </section>
  )
}

export function ArticleBody({ children }: PropsWithChildren<{}>) {
  return (
    <section class="section" style="padding-top: 24px;">
      <div class="wrap">
        <div class="article-body">{children}</div>
      </div>
    </section>
  )
}

export function PullQuote({ children }: PropsWithChildren<{}>) {
  return <div class="article-pullquote">{children}</div>
}

export function AuthorByline({
  initials,
  name,
  role,
}: {
  initials: string
  name: string
  role: string
}) {
  return (
    <div class="article-byline">
      <div class="avatar">{initials}</div>
      <div>
        <div class="name">{name}</div>
        <div class="role">{role}</div>
      </div>
    </div>
  )
}

export function RelatedPosts({
  items,
}: {
  items: { href: string; tag: string; title: string }[]
}) {
  return (
    <section class="section" style="background: var(--gw-cream-100); border-top: 1px solid var(--gw-line); border-bottom: 1px solid var(--gw-line); padding: 56px 0;">
      <div class="wrap" style="max-width: 760px; margin: 0 auto;">
        <div style="font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gw-ink-400); font-weight: 600; margin-bottom: 20px;">
          Keep reading
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          {items.map((it) => (
            <a
              href={it.href}
              style="display: block; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 18px 20px; text-decoration: none;"
            >
              <div style="font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 8px;">
                {it.tag}
              </div>
              <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 500; color: var(--gw-ink-900); line-height: 1.3;">
                {it.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
