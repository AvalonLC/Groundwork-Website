import { Layout } from '../components/Layout'
import { Icon } from '../components/Icon'

export function DemoPage() {
  const features = [
    {
      icon: 'clock',
      title: '30 minutes, no filler',
      desc: 'Structured walkthrough. Your questions, your workflow, your data.',
    },
    {
      icon: 'plant',
      title: 'Configured to your trade',
      desc: "HVAC? Plumbing? Landscaping? Whatever trade you run, we'll show you the right defaults.",
    },
    {
      icon: 'target',
      title: 'Real outcome',
      desc: "We'll load a sample of your open deals. You'll leave knowing if this is right.",
    },
    {
      icon: 'rocket',
      title: '2–3 week implementation',
      desc: "If it's a fit, you go live in weeks — not quarters.",
    },
  ]

  return (
    <Layout
      title="Book a demo — Groundwork CRM"
      description="Book a 30-minute walkthrough with a Groundwork specialist. Tailored to your service lines."
      path="/demo"
    >
      <section class="section" style="padding: 80px 0 40px;">
        <div class="wrap" style="max-width: 1100px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
            <div>
              <span class="eyebrow">Book a demo</span>
              <h1 style="font-size: clamp(38px, 4.5vw, 60px); margin: 20px 0;">
                See <em style="font-style: italic; color: var(--gw-forest-700);">your business</em> running on
                Groundwork.
              </h1>
              <p class="lede">
                Thirty minutes with a specialist who knows your trade. We'll walk through your real workflow — sales
                pipeline, dispatch, invoicing — and show you exactly what changes.
              </p>
              <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 12px;">
                {features.map((f) => (
                  <div style="display: flex; gap: 14px; align-items: flex-start; padding: 10px 0;">
                    <div style="width: 34px; height: 34px; border-radius: 8px; background: var(--gw-green-050); color: var(--gw-forest-700); display: grid; place-items: center; font-size: 16px; flex: none;">
                      <Icon name={f.icon} size={18} />
                    </div>
                    <div>
                      <div style="font-weight: 600; color: var(--gw-ink-900); font-size: 15px;">{f.title}</div>
                      <div style="font-size: 13.5px; color: var(--gw-ink-500);">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="demo-request-card" style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 36px; box-shadow: var(--shadow-md);">
              <div id="demo-request-intro">
                <div style="font-family: var(--font-serif); font-size: 24px; font-weight: 500; margin-bottom: 8px;">Request your demo</div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 24px;">
                  Answer a few quick questions, then pick a time that works for you.
                </div>
              </div>
              <form
                data-live-submit
                data-endpoint="/api/demo-request"
                data-success-text="✓ Sent"
                data-booking-intro="demo-request-intro"
                data-booking-panel="demo-booking-panel"
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
                  <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Trade</div>
                  <select
                    name="trade"
                    required
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                  >
                    <option value="">Choose one…</option>
                    <option>HVAC</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Chimney</option>
                    <option>Roofing</option>
                    <option>Garage door</option>
                    <option>Septic</option>
                    <option>Pest control</option>
                    <option>Irrigation</option>
                    <option>Painting</option>
                    <option>Landscaping</option>
                    <option>Multi-service / multi-crew</option>
                    <option>Other service business</option>
                  </select>
                </label>
                <label style="display: block;">
                  <div style="font-size: 12px; font-weight: 600; color: var(--gw-ink-700); margin-bottom: 4px;">Team size</div>
                  <select
                    name="teamSize"
                    required
                    style="width: 100%; padding: 10px 12px; border: 1px solid var(--gw-line); border-radius: 8px; font-size: 14px; font-family: inherit; background: white;"
                  >
                    <option value="">Choose one…</option>
                    <option>Just me (owner-operator)</option>
                    <option>2–5 people</option>
                    <option>6–15 people</option>
                    <option>16–50 people</option>
                    <option>50+ people</option>
                  </select>
                </label>
                <button type="submit" class="btn btn-primary" style="justify-content: center; margin-top: 8px;">
                  Request demo <span class="arrow">→</span>
                </button>
                <div data-form-error style="display: none; font-size: 12.5px; color: #b42318; text-align: center; margin-top: 2px;"></div>
                <div style="font-size: 12px; color: var(--gw-ink-500); text-align: center; margin-top: 4px;">
                  Prefer to log in?{' '}
                  <a href="/login" style="color: var(--gw-forest-700); text-decoration: underline;">
                    Go to workspace
                  </a>
                </div>
              </form>
              <div id="demo-booking-panel" style="display: none;">
                <div style="font-family: var(--font-serif); font-size: 24px; font-weight: 500; margin-bottom: 4px;">
                  Thanks — now pick a time
                </div>
                <div style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 20px;">
                  Choose whatever slot works for you below. You'll get a calendar invite with the video link right
                  away — no back-and-forth.
                </div>
                <div class="demo-booking-frame">
                  <iframe
                    src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2BHZHcbMMK9uUr9qGIfT91WUwxpqPyoJXl7UNarQLLXMdErluB9PVAq_oj_VPAhKus1DK7Keoo"
                    title="Book your Groundwork demo"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
