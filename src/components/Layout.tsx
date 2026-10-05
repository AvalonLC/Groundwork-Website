import type { PropsWithChildren } from 'hono/jsx'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './SiteFooter'

interface LayoutProps {
  title: string
  description: string
  path: string
}

// Canonical marketing domain — see README "Domain status (interim)". Used to
// build absolute canonical/OG URLs regardless of which host actually served
// the request (keeps social-share and search-indexing URLs stable even if
// Cloudflare fronts the site under a preview/alias hostname).
const SITE_ORIGIN = 'https://groundwork-crm.info'
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/static/assets/og-share.jpg`

export function Layout({ title, description, path, children }: PropsWithChildren<LayoutProps>) {
  const canonicalUrl = `${SITE_ORIGIN}${path}`
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
