import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, SplitList, RelatedCards } from '../../components/Blocks'
import { Button } from '../../components/Button'

export function MobilePage() {
  return (
    <Layout
      title="Mobile & Field Mode — Groundwork CRM"
      description="The rugged mobile view your foremen and crews will actually use."
      path="/product/mobile"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Product · Mobile &amp; Field Mode</span>
          <h1 style="margin-top: 20px;">
            Built for the truck. Not the&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">boardroom.</em>
          </h1>
          <p class="lede">
            The office runs on desktops. The field runs on phones. Groundwork's mobile app and Field Mode were designed by
            watching foremen actually work — with gloves, in sun, on the way to the next site.
          </p>
          <div style="display:flex; gap:12px; margin-top:32px; flex-wrap:wrap;">
            <Button href="/demo" variant="primary" arrow>Book a demo</Button>
            <Button href="/download" variant="secondary">Download the app</Button>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <div class="split-content">
            <span class="eyebrow">Field Mode</span>
            <h2 style="margin-top: 20px;">A phone app your foremen will actually open.</h2>
            <p class="lede">
              Most "field service" apps are just a mobile version of the office. Field Mode is the opposite — a
              purpose-built view that shows the exact information a foreman needs in the truck, in the order they need it.
            </p>
            <SplitList
              items={[
                { num: '→', title: "Today's route", body: 'Ordered stops with client, address, and job context.' },
                { num: '→', title: 'Scope + files at the property', body: 'Photos, plans, materials, notes from sales.' },
                { num: '→', title: 'Clock in from the truck', body: "Time tracker aware of the job you're on." },
                { num: '→', title: 'Photos & sign-offs', body: 'Before / after photos, quality checklists, client signature.' },
                { num: '→', title: 'Offline-capable', body: 'Works in the field. Syncs when signal returns.' },
                { num: '→', title: 'Two modes', body: 'Foreman (leadership) and Laborer (read-only) — same app, different lens.' },
              ]}
            />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--gw-forest-900); border-radius: 24px; padding: 8px; aspect-ratio: 9/19; box-shadow: var(--shadow-lg); position: relative;">
              <div style="background: var(--gw-forest-900); color: var(--gw-cream-100); border-radius: 18px; padding: 40px 16px 16px; height: 100%; overflow: hidden;">
                <div style="font-size: 10px; color: #7CC9A3; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Field Mode · Foreman</div>
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; margin-bottom: 4px;">Tuesday</div>
                <div style="font-size: 11px; color: #93AFA1; margin-bottom: 16px;">Jul 8 · 3 stops</div>
                {[
                  { stop: 'STOP 1 · ON SITE', time: '07:12', title: 'Knesley · Pool Coping', sub: 'Lorton VA · Crew A', border: true },
                  { stop: 'STOP 2', time: '13:00', title: 'McDermott · Garden', sub: 'Arlington VA · Crew A' },
                  { stop: 'STOP 3', time: '15:30', title: 'Karamsetty · Tree', sub: 'Vienna VA' },
                ].map((s, i) => (
                  <div style={`background: rgba(255,255,255,0.06);${s.border ? ' border-left: 3px solid var(--gw-green-500);' : ''} border-radius: 8px; padding: 12px;${i < 2 ? ' margin-bottom: 8px;' : ''}`}>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #93AFA1; margin-bottom: 4px;">
                      <span>{s.stop}</span><span>{s.time}</span>
                    </div>
                    <div style="font-size: 13px; font-weight: 600; margin-bottom: 3px;">{s.title}</div>
                    <div style="font-size: 11px; color: #B7CFC1;">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style="background: var(--gw-cream-100); border-radius: 24px; padding: 8px; aspect-ratio: 9/19; box-shadow: var(--shadow-lg); border: 1px solid var(--gw-line);">
              <div style="background: var(--gw-cream-100); border-radius: 18px; padding: 40px 16px 16px; height: 100%; overflow: hidden;">
                <div style="font-size: 10px; color: var(--gw-forest-700); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">My Work · Laborer</div>
                <div style="font-family: var(--font-serif); font-size: 22px; font-weight: 500; margin-bottom: 4px;">Diego</div>
                <div style="font-size: 11px; color: var(--gw-ink-500); margin-bottom: 16px;">Tuesday · Crew A</div>
                <div style="background: var(--gw-green-050); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                  <div style="font-size: 10px; color: var(--gw-forest-700); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Now</div>
                  <div style="font-size: 13px; font-weight: 600; color: var(--gw-ink-900); margin-bottom: 3px;">Knesley · Pool Coping</div>
                  <button style="background: var(--gw-green-600); color: white; padding: 6px 12px; border-radius: 5px; font-size: 11px; border: none; margin-top: 6px;">● Clocked in</button>
                </div>
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                  <div style="font-size: 10px; color: var(--gw-ink-500); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Next</div>
                  <div style="font-size: 13px; font-weight: 600; color: var(--gw-ink-900); margin-bottom: 3px;">McDermott · Garden</div>
                  <div style="font-size: 11px; color: var(--gw-ink-500);">Arlington · 13:00</div>
                </div>
                <div style="background: var(--gw-cream-200); border-radius: 8px; padding: 12px;">
                  <div style="font-size: 10px; color: var(--gw-ink-500); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Later</div>
                  <div style="font-size: 13px; font-weight: 600; color: var(--gw-ink-900);">Karamsetty · Tree</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap split">
          <div style="background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); padding: 32px;">
            <div style="font-family: var(--font-serif); font-size: 26px; font-weight: 500; margin-bottom: 20px;">The bridge, illustrated.</div>
            <div style="position: relative; padding: 20px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
                <div style="flex:1; background: var(--gw-cream-200); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 10px; color: var(--gw-ink-500); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Office · Sales</div>
                  <div style="font-size: 13px; font-weight: 600;">Sale closed<br />Knesley · Pool Coping</div>
                </div>
                <div style="color: var(--gw-forest-600); font-size: 20px;">→</div>
                <div style="flex:1; background: var(--gw-forest-800); color: var(--gw-cream-100); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 10px; color: #7CC9A3; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Field · Foreman</div>
                  <div style="font-size: 13px; font-weight: 600;">Sees job in tomorrow's route<br />Scope + materials attached</div>
                </div>
              </div>
              <div style="text-align: center; padding: 14px 0; color: var(--gw-ink-500); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600;">↓ later that week ↓</div>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 20px;">
                <div style="flex:1; background: var(--gw-forest-800); color: var(--gw-cream-100); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 10px; color: #7CC9A3; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Field · Foreman</div>
                  <div style="font-size: 13px; font-weight: 600;">Uploads 12 site photos<br />Notes scope change: +extra step</div>
                </div>
                <div style="color: var(--gw-forest-600); font-size: 20px;">→</div>
                <div style="flex:1; background: var(--gw-cream-200); border-radius: 8px; padding: 16px;">
                  <div style="font-size: 10px; color: var(--gw-ink-500); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Office · Sales + Finance</div>
                  <div style="font-size: 13px; font-weight: 600;">Change order drafted<br />Photos on property record</div>
                </div>
              </div>
            </div>
          </div>
          <div class="split-content">
            <span class="eyebrow">Same data. Different lens.</span>
            <h2 style="margin-top: 20px;">The office and the field see the same reality.</h2>
            <p class="lede">
              Nothing gets re-entered. Nothing gets lost. A scope change captured in the field appears on the office
              desktop instantly — and vice versa. This is the connective tissue between sales and execution.
            </p>
            <SplitList
              items={[
                { num: '→', title: 'Two-way sync', body: 'Every edit on either side is immediate.' },
                { num: '→', title: 'Push notifications', body: 'Route changes, urgent messages, day-of updates.' },
                { num: '→', title: 'Photo attachments', body: 'Any photo taken in the field lands on the property record.' },
                { num: '→', title: 'Voice notes', body: 'For the foreman who does not want to type.' },
              ]}
            />
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { href: '/product/operations', title: 'Operations', desc: 'Dispatch that flows into Field Mode.' },
          { href: '/product/my-day', title: 'My Day', desc: 'The daily view on desktop.' },
          { href: '/roles/foremen', title: 'For foremen', desc: 'How field leaders use Groundwork.' },
          { href: '/roles/laborers', title: 'For crews', desc: 'The read-only laborer view.' },
        ]}
      />

      <CTABand
        title={<>Put Groundwork in your foreman's <em>hands.</em></>}
        description="A specialist will walk your field team through Field Mode in the demo."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
