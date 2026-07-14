import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

export function StartPage() {
  const doors = [
    {
      href: '/demo',
      dark: true,
      tag: 'Recommended',
      title: 'Book a demo',
      desc: 'A specialist walks through Groundwork with your real workflow. 30 minutes.',
      checks: ['Tailored to your trade', 'Real data, real outcome', 'No slides'],
      cta: 'Book a demo →',
    },
    {
      href: '/signup',
      dark: false,
      tag: 'Trial',
      title: 'Request access',
      desc: 'Set up a sandboxed pilot workspace loaded with your data. Try before you commit.',
      checks: ['Sandbox with your data', '14-day pilot window', 'No credit card'],
      cta: 'Request access →',
    },
    {
      href: '/login',
      dark: false,
      tag: 'Existing customer',
      title: 'Log in',
      desc: 'Straight to your workspace at groundwork-crm.com.',
      checks: ['SSO support', 'Google login', 'Forgot password'],
      cta: 'Log in →',
    },
  ]

  return (
    <Layout
      title="Start here — Groundwork CRM"
      description="Three paths: book a demo, request access, or log in."
      path="/start"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Get started</span>
          <h1 style="margin-top: 20px;">
            Three doors.&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">One system.</em>
          </h1>
          <p class="lede">
            Whether you're evaluating Groundwork, starting a trial, or already a customer — pick the door that fits.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {doors.map((d) =>
              d.dark ? (
                <a
                  href={d.href}
                  style="text-decoration: none; background: var(--gw-forest-800); color: var(--gw-cream-100); border-radius: var(--r-lg); padding: 40px 36px; display: block; box-shadow: var(--shadow-md); position: relative; overflow: hidden;"
                >
                  <div style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7CC9A3; font-weight: 600; margin-bottom: 12px;">
                    {d.tag}
                  </div>
                  <div style="font-family: var(--font-serif); font-size: 32px; font-weight: 500; margin-bottom: 12px;">{d.title}</div>
                  <div style="color: #B7CFC1; font-size: 15px; margin-bottom: 28px;">{d.desc}</div>
                  <div style="color: #B7CFC1; font-size: 13px; margin-bottom: 24px; line-height: 1.6;">
                    {d.checks.map((c) => (
                      <div>
                        <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> {c}
                      </div>
                    ))}
                  </div>
                  <div style="font-size: 12px; color: #7CC9A3; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">{d.cta}</div>
                </a>
              ) : (
                <a
                  href={d.href}
                  style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 40px 36px; display: block;"
                >
                  <div style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 12px;">
                    {d.tag}
                  </div>
                  <div style="font-family: var(--font-serif); font-size: 32px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 12px;">{d.title}</div>
                  <div style="color: var(--gw-ink-500); font-size: 15px; margin-bottom: 28px;">{d.desc}</div>
                  <div style="color: var(--gw-ink-700); font-size: 13px; margin-bottom: 24px; line-height: 1.6;">
                    {d.checks.map((c) => (
                      <div>
                        <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> {c}
                      </div>
                    ))}
                  </div>
                  <div style="font-size: 12px; color: var(--gw-forest-700); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;">{d.cta}</div>
                </a>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
