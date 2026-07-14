import { Layout } from '../components/Layout'

export function ContactPage() {
  const channels = [
    {
      title: 'Sales & demos',
      email: 'sales@groundwork-crm.com',
      desc: 'For evaluating Groundwork for your team.',
      linkHref: '/demo',
      linkLabel: 'Book a demo →',
    },
    {
      title: 'Customer support',
      email: 'support@groundwork-crm.com',
      desc: 'For existing customers. Also available in-app 8am–6pm ET.',
      linkHref: '/login',
      linkLabel: 'Log in to workspace →',
    },
    {
      title: 'Partnerships',
      email: 'partners@groundwork-crm.com',
      desc: 'Integrations, referrals, and reseller inquiries.',
    },
    {
      title: 'Press & media',
      email: 'press@groundwork-crm.com',
      desc: 'Story ideas, quotes, and interview requests.',
    },
  ]

  return (
    <Layout title="Contact — Groundwork CRM" description="Get in touch with the Groundwork team." path="/contact">
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Contact</span>
          <h1 style="margin-top: 20px;">
            How to reach&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">us.</em>
          </h1>
          <p class="lede">For sales, support, partnerships, or press. We answer email in one business day.</p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
            <div>
              {channels.map((ch) => (
                <div style="padding: 24px 0; border-top: 1px solid var(--gw-cream-300);">
                  <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 8px;">
                    {ch.title}
                  </div>
                  <a
                    href={`mailto:${ch.email}`}
                    style="font-family: var(--font-mono); font-size: 13.5px; color: var(--gw-forest-700); display: inline-block; margin-bottom: 8px;"
                  >
                    {ch.email}
                  </a>
                  <div style="font-size: 14px; color: var(--gw-ink-500); margin-bottom: 10px;">{ch.desc}</div>
                  {ch.linkHref && (
                    <a href={ch.linkHref} style="font-size: 13px; color: var(--gw-forest-700); font-weight: 600; text-decoration: underline;">
                      {ch.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 32px;">
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; margin-bottom: 20px;">Send a message</div>
                <form
                  onsubmit="event.preventDefault(); this.querySelector('button').textContent='✓ Sent';"
                  style="display: flex; flex-direction: column; gap: 12px;"
                >
                  <label style="display: block;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Your name</div>
                    <input
                      type="text"
                      required
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; background: white; font-family: inherit;"
                    />
                  </label>
                  <label style="display: block;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Email</div>
                    <input
                      type="email"
                      required
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; background: white; font-family: inherit;"
                    />
                  </label>
                  <label style="display: block;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Topic</div>
                    <select
                      required
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; background: white; font-family: inherit;"
                    >
                      <option value="">Choose…</option>
                      <option>Sales / demo</option>
                      <option>Support</option>
                      <option>Partnership</option>
                      <option>Press</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label style="display: block;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Message</div>
                    <textarea
                      rows={5}
                      required
                      style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; background: white; font-family: inherit; resize: vertical;"
                    ></textarea>
                  </label>
                  <button type="submit" class="btn btn-primary" style="justify-content: center; margin-top: 6px;">
                    Send message <span class="arrow">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
