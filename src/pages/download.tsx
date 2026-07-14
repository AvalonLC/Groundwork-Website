import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

export function DownloadPage() {
  return (
    <Layout
      title="Download the app — Groundwork CRM"
      description="Get the Groundwork mobile app for iOS and Android."
      path="/download"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Download</span>
          <h1 style="margin-top: 20px;">
            The Groundwork app for your&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">field team.</em>
          </h1>
          <p class="lede">
            Field Mode lives on iOS and Android. Foremen and crews open it in the truck — no VPN, no bookmarks, no
            confusion.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 700px; margin: 0 auto;">
            <a
              href="#"
              style="background: var(--gw-forest-900); color: var(--gw-cream-100); border-radius: var(--r-lg); padding: 32px 36px; display: flex; align-items: center; gap: 20px; text-decoration: none; box-shadow: var(--shadow-md);"
            >
              <div style="font-size: 40px;">
                <Icon name="apple-logo" size={18} />
              </div>
              <div>
                <div style="font-size: 11px; color: #93AFA1; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600;">Download on</div>
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500;">App Store</div>
              </div>
            </a>
            <a
              href="#"
              style="background: var(--gw-forest-900); color: var(--gw-cream-100); border-radius: var(--r-lg); padding: 32px 36px; display: flex; align-items: center; gap: 20px; text-decoration: none; box-shadow: var(--shadow-md);"
            >
              <div style="font-size: 40px;">
                <Icon name="play" size={18} />
              </div>
              <div>
                <div style="font-size: 11px; color: #93AFA1; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600;">Get it on</div>
                <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500;">Google Play</div>
              </div>
            </a>
          </div>
          <div style="text-align: center; margin-top: 32px; font-size: 13.5px; color: var(--gw-ink-500);">
            Or use the web app at{' '}
            <a href="/login" style="color: var(--gw-forest-700); font-family: var(--font-mono); font-size: 13px;">
              groundwork-crm.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
