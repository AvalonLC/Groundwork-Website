import { Layout } from '../components/Layout'

export function SignupPage() {
  return (
    <Layout
      title="Request access — Groundwork CRM"
      description="Request access to a Groundwork pilot workspace."
      path="/signup"
    >
      <section class="section" style="padding: 80px 0;">
        <div class="wrap" style="max-width: 560px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <a
              href="/"
              style="display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-serif); font-size: 26px; font-weight: 500; color: var(--gw-ink-900); text-decoration: none;"
            >
              <span class="brand-mark" style="width: 34px; height: 34px; font-size: 15px;">
                Gw
              </span>
              Groundwork
            </a>
          </div>
          <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 40px; box-shadow: var(--shadow-md);">
            <span class="eyebrow">Request access</span>
            <div style="font-family: var(--font-serif); font-size: 30px; font-weight: 500; margin: 12px 0 8px;">Start a pilot workspace.</div>
            <div style="font-size: 14px; color: var(--gw-ink-500); margin-bottom: 28px;">
              A specialist will provision a sandboxed workspace with your data and reach out within one business day.
            </div>
            <form
              data-live-submit
              data-endpoint="/api/signup-request"
              data-success-text="✓ Request sent"
              style="display: flex; flex-direction: column; gap: 14px;"
            >
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <label style="display: block;">
                  <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">First name</div>
                  <input
                    type="text"
                    name="firstName"
                    required
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                  />
                </label>
                <label style="display: block;">
                  <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Last name</div>
                  <input
                    type="text"
                    name="lastName"
                    required
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                  />
                </label>
              </div>
              <label style="display: block;">
                <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Work email</div>
                <input
                  type="email"
                  name="email"
                  required
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                />
              </label>
              <label style="display: block;">
                <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Company</div>
                <input
                  type="text"
                  name="company"
                  required
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                />
              </label>
              <label style="display: block;">
                <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Your role</div>
                <select
                  name="role"
                  required
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                >
                  <option value="">Choose…</option>
                  <option>Owner</option>
                  <option>Office Manager</option>
                  <option>Sales</option>
                  <option>Operations</option>
                  <option>Other</option>
                </select>
              </label>
              <label style="display: block;">
                <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Anything else?</div>
                <textarea
                  name="notes"
                  rows={3}
                  style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white; resize: vertical;"
                  placeholder="Current tools, team size, biggest headache…"
                ></textarea>
              </label>
              <button type="submit" class="btn btn-primary" style="justify-content: center; margin-top: 8px;">
                Request access <span class="arrow">→</span>
              </button>
              <div data-form-error style="display: none; font-size: 12.5px; color: #b42318; text-align: center; margin-top: 2px;"></div>
            </form>
            <div style="font-size: 12.5px; color: var(--gw-ink-500); text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--gw-cream-300);">
              Already have a workspace?{' '}
              <a href="/login" style="color: var(--gw-forest-700); text-decoration: underline; font-weight: 500;">
                Log in
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
