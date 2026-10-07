import type { PropsWithChildren } from 'hono/jsx'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './SiteFooter'

interface LayoutProps {
  title: string
  description: string
  path: string
  // Optional extra JSON-LD object(s) a specific page wants to emit in
  // addition to the site-wide Organization + SoftwareApplication graph
  // below (e.g. FAQPage on /faq). Rendered as additional <script
  // type="application/ld+json"> tags. Plain objects, not pre-stringified —
  // Layout owns the JSON.stringify so every page gets consistent output.
  structuredData?: Record<string, unknown>[]
}

// Canonical marketing domain — see README "Domain status (interim)". Used to
// build absolute canonical/OG URLs regardless of which host actually served
// the request (keeps social-share and search-indexing URLs stable even if
// Cloudflare fronts the site under a preview/alias hostname).
const SITE_ORIGIN = 'https://groundwork-crm.info'
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/static/assets/og-share.jpg`

// Site-wide JSON-LD graph — emitted on every page via one <script> tag
// (a single @graph array, not two separate tags, per Google's own
// recommendation for combining related structured-data entities). Two
// node types:
//  - Organization: identifies the company itself (name, logo, site url) —
//    this is what lets Google associate the brand with a knowledge-panel
//    logo/name, independent of any one page's content.
//  - SoftwareApplication: describes the product being marketed. Category
//    + offers (both tiers reference /pricing's actual lowest numbers) are
//    what make this page eligible for rich-result price/category display,
//    as opposed to a bare blue link.
// Both nodes are safe to repeat identically on every page (Google dedupes
// by @id across a site) and need no per-page props, so they're hardcoded
// here rather than threaded through every page component.
const ORGANIZATION_LD = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: 'Groundwork CRM',
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/static/assets/groundwork-mark-256.png`,
  description: 'The operating system for landscape, home service, and field service businesses.',
}

const SOFTWARE_APPLICATION_LD = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_ORIGIN}/#software`,
  name: 'Groundwork CRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  url: SITE_ORIGIN,
  description: 'A CRM and operations platform built for landscape, home service, and field service companies — sales pipeline, scheduling, dispatch, invoicing, and AI-assisted follow-up in one system.',
  offers: {
    '@type': 'Offer',
    price: '25',
    priceCurrency: 'USD',
    description: 'Starting at $25/mo per additional user on top of the base plan — see /pricing for full plan tiers.',
  },
}

export function Layout({ title, description, path, structuredData, children }: PropsWithChildren<LayoutProps>) {
  const canonicalUrl = `${SITE_ORIGIN}${path}`
  const graph = [ORGANIZATION_LD, SOFTWARE_APPLICATION_LD, ...(structuredData ?? [])]
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" type="image/png" href="/static/assets/favicon.png" />

        {/* Open Graph — controls the title/description/image shown when a
            page link is shared in Slack, LinkedIn, iMessage, etc. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Groundwork CRM" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter/X card — falls back to the same OG fields above on
            platforms that read OG tags instead, but explicit tags are more
            reliably picked up by Twitter/X itself. */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/static/styles.css" />

        {/* Structured data (JSON-LD) — Organization + SoftwareApplication on
            every page, plus whatever this specific page added via
            structuredData (e.g. FAQPage on /faq). dangerouslySetInnerHTML is
            required here for the same reason Icon.tsx uses it for raw SVG:
            Hono JSX would otherwise HTML-escape the JSON string's quotes.
            Safe because jsonLd is built entirely from this file's own
            hardcoded objects plus each page's own hardcoded structuredData
            arrays — never from user input. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body>
        <SiteNav path={path} />
        {children}
        <SiteFooter />
        <script src="/static/site.js"></script>
      </body>
    </html>
  )
}
