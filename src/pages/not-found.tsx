import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

// 404 page — wired up via app.notFound() in src/index.tsx, so it renders
// for any unmatched route (bad/old links, typos) instead of Hono's bare
// default "404 Not Found" text response. Deliberately reuses the same
// Layout (full nav + footer) so a visitor landing here from a broken
// external link isn't stranded on an unstyled dead end — they keep every
// normal way to get back into the site.
export function NotFoundPage() {
  const popularLinks = [
    { href: '/explore', label: 'Try the interactive demo', desc: 'Click around a full sample workspace — no signup.' },
    { href: '/pricing', label: 'Pricing', desc: 'Plans, per-user pricing, and the AI allowance.' },
    { href: '/trades', label: 'Browse by trade', desc: 'HVAC, plumbing, landscaping, and 8 more.' },
    { href: '/demo', label: 'Book a demo', desc: 'See it configured for your business, live.' },
  ]

  return (
    <Layout
      title="Page not found — Groundwork CRM"
      description="The page you're looking for doesn't exist. Find your way back to Groundwork CRM."
      path="/404"
    >
      <section class="section subpage-hero" style="padding-bottom: 0;">
        <div class="wrap" style="text-align: center;">
          <span class="eyebrow" style="justify-content: center;">404</span>
          <h1 style="margin: 20px auto 0; max-width: 16ch;">
            This page took a&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">wrong turn.</em>
          </h1>
          <p class="lede" style="margin: 0 auto;">
            We couldn't find the page you were looking for — it may have moved, been renamed, or never existed.
          </p>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 32px; flex-wrap: wrap;">
            <a href="/" class="btn btn-primary">
              <Icon name="home" size={15} style="margin-right: 2px;" />
              Back to homepage
            </a>
            <a href="/explore" class="btn btn-secondary">Try the interactive demo</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap" style="max-width: 760px;">
          <div class="section-head" style="text-align: center; margin-bottom: 28px;">
            <span class="eyebrow" style="justify-content: center;">Or try one of these</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
            {popularLinks.map((l) => (
              <a
                href={l.href}
                class="bento-card"
                style="display: block; text-decoration: none; color: inherit; padding: 20px 22px;"
              >
                <h4 style="margin-bottom: 6px;">{l.label}</h4>
                <p style="font-size: 13.5px; color: var(--gw-ink-500); margin: 0;">{l.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
