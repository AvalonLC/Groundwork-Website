import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

export function LoginPage() {
  return (
    <Layout title="Log in — Groundwork CRM" description="Log in to your Groundwork workspace." path="/login">
      <section class="section" style="padding: 100px 0; min-height: 70vh; display: flex; align-items: center;">
        <div class="wrap" style="max-width: 460px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <a
              href="/"
              style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-serif); font-size: 26px; font-weight: 500; color: var(--gw-ink-900);"
            >
              <span class="brand-mark" style="width: 34px; height: 34px; font-size: 15px;">
                Gw
              </span>
              Groundwork
            </a>
          </div>
          <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 40px; box-shadow: var(--shadow-md);">
            <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500; text-align: center; margin-bottom: 8px;">Welcome back.</div>
            <div style="font-size: 13.5px; color: var(--gw-ink-500); text-align: center; margin-bottom: 28px;">Log in to your workspace.</div>
            <form
              onsubmit="event.preventDefault(); window.location.href='https://groundwork-crm.com';"
              style="display: flex; flex-direction: column; gap: 14px;"
            >
              <label style="display: block;">
                <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Work email</div>
                <input
                  type="email"
                  required
                  placeholder="you@yourcompany.com"
                  style="width: 100%; padding: 12px 14px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                />
              </label>
              <label style="display: block;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">
                  <span>Password</span>
                  <a href="#" style="color: var(--gw-forest-700); text-decoration: underline; font-weight: 500;">Forgot?</a>
                </div>
                <input
                  type="password"
                  required
                  style="width: 100%; padding: 12px 14px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                />
              </label>
              <button type="submit" class="btn btn-primary" style="justify-content: center; margin-top: 8px;">
                Log in <span class="arrow">→</span>
              </button>
            </form>
            <div style="display: flex; align-items: center; gap: 12px; margin: 24px 0; color: var(--gw-ink-400); font-size: 12px;">
              <div style="flex: 1; height: 1px; background: var(--gw-cream-300);"></div>
              <span>OR</span>
              <div style="flex: 1; height: 1px; background: var(--gw-cream-300);"></div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button style="width: 100%; padding: 11px; background: white; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-weight: 500; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;">
                <span style="font-size: 16px;">G</span> Log in with Google
              </button>
              <button style="width: 100%; padding: 11px; background: white; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-weight: 500; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;">
                <span style="font-size: 16px;"><Icon name="bolt" size={18} /></span> Single Sign-On (SSO)
              </button>
            </div>
            <div style="text-align: center; font-size: 12.5px; color: var(--gw-ink-500); margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--gw-cream-300);">
              Don't have a workspace?{' '}
              <a href="/signup" style="color: var(--gw-forest-700); text-decoration: underline; font-weight: 500;">
                Request access
              </a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: var(--gw-ink-500); font-family: var(--font-mono);">
            Redirects to groundwork-crm.com
          </div>
        </div>
      </section>
    </Layout>
  )
}
