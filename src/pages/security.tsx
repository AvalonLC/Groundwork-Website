import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

export function SecurityPage() {
  const items = [
    { icon: 'lock', title: 'Encryption', desc: 'AES-256 at rest. TLS 1.3 in transit. Every request, every backup.' },
    {
      icon: 'building',
      title: 'SOC 2 Type II',
      desc: 'Annual audit against SOC 2 Type II controls. Report available under NDA.',
    },
    {
      icon: 'key',
      title: 'SSO & MFA',
      desc: 'SAML SSO (Okta, Google, Microsoft). Enforced MFA at company or role level.',
    },
    { icon: 'globe', title: 'Data residency', desc: 'US-region hosting. EU residency available for enterprise plans.' },
    { icon: 'clipboard', title: 'Audit log', desc: 'Immutable log of every change. Exportable. Retained per your policy.' },
    {
      icon: 'refresh',
      title: 'Backups',
      desc: 'Point-in-time restore with 30-day rolling window. Disaster recovery tested quarterly.',
    },
    {
      icon: 'user',
      title: 'Least-privilege access',
      desc: 'Screen-level permissions and IP restrictions. Employees cannot view your data without explicit break-glass access.',
    },
    { icon: 'refresh', title: 'Vendor security', desc: 'Sub-processors audited. Full list published and updated as needed.' },
  ]

  return (
    <Layout
      title="Security — Groundwork CRM"
      description="How Groundwork protects your data."
      path="/security"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Security</span>
          <h1 style="margin-top: 20px;">
            How Groundwork protects your&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">data.</em>
          </h1>
          <p class="lede">
            Groundwork stores your operational core — pipeline, client records, financials, and photos of every
            property you've serviced. We treat that responsibility seriously.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            {items.map((it) => (
              <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 26px 28px;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--gw-forest-800); color: white; display: grid; place-items: center; font-size: 18px; margin-bottom: 14px;">
                  <Icon name={it.icon} size={18} />
                </div>
                <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 8px;">
                  {it.title}
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500);">{it.desc}</div>
              </div>
            ))}
            <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 12px; padding: 26px 28px;">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--gw-forest-800); color: white; display: grid; place-items: center; font-size: 18px; margin-bottom: 14px;">
                <Icon name="email" size={18} />
              </div>
              <div style="font-family: var(--font-serif); font-size: 20px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 8px;">
                Report a vulnerability
              </div>
              <div style="font-size: 13.5px; color: var(--gw-ink-500);">
                <a href="mailto:security@groundwork-crm.com" style="color: var(--gw-forest-700); text-decoration: underline;">
                  security@groundwork-crm.com
                </a>{' '}
                · PGP available.
              </div>
            </div>
          </div>

          <div
            style="margin-top: 60px; padding: 40px; background: var(--gw-forest-900); color: var(--gw-cream-100); border-radius: var(--r-lg); display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center;"
          >
            <div>
              <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500; margin-bottom: 10px;">
                Need our security package?
              </div>
              <p style="color: #B7CFC1; font-size: 14.5px; margin: 0;">
                SOC 2 report, DPA, sub-processor list, and pen-test summary available under NDA to prospective
                customers.
              </p>
            </div>
            <a href="/contact" class="btn btn-primary" style="justify-content: center; background: var(--gw-green-500);">
              Request security package
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
