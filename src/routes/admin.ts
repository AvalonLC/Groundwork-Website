// Internal metrics dashboard for Groundwork AI — usage, cost, errors, leads,
// and conversion activity, per requirement #7 ("a practical way for me to
// review usage, costs, errors, leads, and conversion activity").
//
// Access control: this marketing site has no login system at all (it's a
// pure static-ish marketing site backed by Hono), so there's no existing
// session/auth mechanism to hook into. Gated instead by a shared-secret
// query param checked against the ADMIN_METRICS_KEY Cloudflare secret — the
// same pattern already used nowhere else on this site, but the simplest
// correct option given no auth system exists. If the secret isn't
// configured, the route refuses all access rather than defaulting open.

import { Hono } from 'hono'
import type { ChatEnvBindings } from '../lib/chat/config'
import { getDailyBudgetUsd, getMonthlyBudgetUsd } from '../lib/chat/config'
import { retryLeadNotification } from '../lib/chat/tools'

export const adminRoutes = new Hono<{ Bindings: ChatEnvBindings }>()

function checkAdminKey(c: { req: { query: (k: string) => string | undefined }; env: ChatEnvBindings }): boolean {
  const configured = c.env.ADMIN_METRICS_KEY
  if (!configured) return false
  const provided = c.req.query('key')
  return typeof provided === 'string' && provided === configured
}

// --- Definitions used by the dashboard & its JSON API -----------------------
// "Qualified lead" (requirement #7: define this explicitly): a chat_leads row
// where email is present (always true — it's the only hard requirement to
// capture a lead) AND at least one of trade/team_size/main_frustration/
// timeline/current_software is also populated — i.e. the visitor gave enough
// context for sales to act on beyond a bare email address.
const QUALIFIED_LEAD_SQL = `(
  email IS NOT NULL AND email != '' AND (
    (trade IS NOT NULL AND trade != '') OR
    (team_size IS NOT NULL AND team_size != '') OR
    (main_frustration IS NOT NULL AND main_frustration != '') OR
    (timeline IS NOT NULL AND timeline != '') OR
    (current_software IS NOT NULL AND current_software != '')
  )
)`

adminRoutes.get('/api/admin/chat-metrics', async (c) => {
  if (!checkAdminKey(c)) return c.json({ ok: false, error: 'Unauthorized' }, 401)
  const { env } = c
  const db = env.DB

  const [usageMonth, usageToday, totalSessions, totalMessages, totalLeads, qualifiedLeads, notifiedLeads, failedNotifies, events, recentLeads] = await Promise.all([
    db.prepare(`SELECT COALESCE(SUM(cost_usd),0) as spent FROM chat_usage WHERE month = strftime('%Y-%m','now')`).first<{ spent: number }>(),
    db.prepare(`SELECT COALESCE(cost_usd,0) as spent FROM chat_usage WHERE day = strftime('%Y-%m-%d','now')`).first<{ spent: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_sessions`).first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_messages WHERE role = 'user'`).first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_leads`).first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_leads WHERE ${QUALIFIED_LEAD_SQL}`).first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_leads WHERE notified_at IS NOT NULL`).first<{ n: number }>(),
    db.prepare(`SELECT COUNT(*) as n FROM chat_leads WHERE notified_at IS NULL AND notify_attempts > 0`).first<{ n: number }>(),
    db
      .prepare(
        `SELECT event_type, COUNT(*) as n FROM chat_events GROUP BY event_type ORDER BY n DESC`
      )
      .all<{ event_type: string; n: number }>(),
    db
      .prepare(`SELECT id, company, trade, email, created_at, notified_at, notify_attempts FROM chat_leads ORDER BY id DESC LIMIT 20`)
      .all<Record<string, unknown>>(),
  ])

  const eventCounts: Record<string, number> = {}
  for (const row of events.results ?? []) eventCounts[row.event_type] = row.n

  const qualifiedCount = qualifiedLeads?.n ?? 0
  const monthSpend = usageMonth?.spent ?? 0
  const costPerQualifiedLead = qualifiedCount > 0 ? monthSpend / qualifiedCount : null

  return c.json({
    ok: true,
    budget: {
      dailyCapUsd: getDailyBudgetUsd(env),
      monthlyCapUsd: getMonthlyBudgetUsd(env),
      todaySpendUsd: usageToday?.spend ?? 0,
      monthSpendUsd: monthSpend,
    },
    volume: {
      totalSessions: totalSessions?.n ?? 0,
      totalUserMessages: totalMessages?.n ?? 0,
    },
    leads: {
      totalLeads: totalLeads?.n ?? 0,
      qualifiedLeads: qualifiedCount,
      qualifiedLeadDefinition:
        'A lead with an email plus at least one of: trade, team size, main frustration, timeline, or current software.',
      notifiedLeads: notifiedLeads?.n ?? 0,
      failedNotifyLeads: failedNotifies?.n ?? 0,
      costPerQualifiedLeadUsd: costPerQualifiedLead,
    },
    conversionActivity: {
      demoPanelClicks: eventCounts['demo_panel_clicked'] ?? 0,
      tradePageClicks: eventCounts['trade_page_clicked'] ?? 0,
      bookingLinkClicks: eventCounts['booking_link_clicked'] ?? 0,
      // Deliberately reported SEPARATELY from bookingLinkClicks, per
      // requirement #7 — this is a proxy for interest, NOT a confirmed
      // booking (see docs for why no true confirmation signal exists yet).
      confirmedBookingsNote:
        'Not tracked — no reliable signal exists today (the Google Calendar widget on /demo is a cross-origin iframe this site cannot see into). bookingLinkClicks above is a proxy for intent only, not a confirmed appointment count.',
    },
    errors: {
      toolErrors: eventCounts['tool_error'] ?? 0,
      rateLimited: eventCounts['rate_limited'] ?? 0,
      budgetCapped: eventCounts['budget_capped'] ?? 0,
      notifyFailed: eventCounts['notify_failed'] ?? 0,
      promptInjectionSuspected: eventCounts['prompt_injection_suspected'] ?? 0,
    },
    eventCounts,
    recentLeads: recentLeads.results ?? [],
  })
})

adminRoutes.post('/api/admin/chat-leads/:id/retry-notify', async (c) => {
  if (!checkAdminKey(c)) return c.json({ ok: false, error: 'Unauthorized' }, 401)
  const id = Number(c.req.param('id'))
  if (!Number.isFinite(id)) return c.json({ ok: false, error: 'Invalid lead id' }, 400)
  const result = await retryLeadNotification(c.env, id)
  return c.json({ ok: result.ok })
})

// Minimal HTML dashboard — no framework needed, just fetches the JSON API
// above and renders it. Kept intentionally plain; this is an internal tool,
// not a marketing page.
adminRoutes.get('/admin/chat-metrics', async (c) => {
  if (!checkAdminKey(c)) return c.html('<h1>401 — add ?key=... (see ADMIN_METRICS_KEY secret)</h1>', 401)
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Groundwork AI — Metrics</title>
<meta name="robots" content="noindex, nofollow" />
<style>
  body { font-family: -apple-system, system-ui, sans-serif; background: #FBFAF6; color: #14181A; padding: 32px; max-width: 920px; margin: 0 auto; }
  h1 { font-size: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 16px 0 28px; }
  .card { background: white; border: 1px solid #E4DFD3; border-radius: 8px; padding: 14px 16px; }
  .card .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #7A8582; }
  .card .value { font-size: 22px; font-weight: 600; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #EFEBE2; }
  .note { font-size: 12px; color: #7A8582; margin-top: 4px; }
  section { margin-bottom: 28px; }
</style>
</head>
<body>
  <h1>Groundwork AI — Pilot Metrics</h1>
  <div id="root">Loading…</div>
  <script>
    const key = new URLSearchParams(location.search).get('key')
    fetch('/api/admin/chat-metrics?key=' + encodeURIComponent(key)).then(r => r.json()).then(d => {
      if (!d.ok) { document.getElementById('root').textContent = 'Error: ' + (d.error || 'unknown'); return }
      const fmt = (n) => '$' + Number(n).toFixed(2)
      document.getElementById('root').innerHTML = \`
        <section>
          <div class="grid">
            <div class="card"><div class="label">Today spend / cap</div><div class="value">\${fmt(d.budget.todaySpendUsd)} / \${fmt(d.budget.dailyCapUsd)}</div></div>
            <div class="card"><div class="label">Month spend / cap</div><div class="value">\${fmt(d.budget.monthSpendUsd)} / \${fmt(d.budget.monthlyCapUsd)}</div></div>
            <div class="card"><div class="label">Sessions</div><div class="value">\${d.volume.totalSessions}</div></div>
            <div class="card"><div class="label">Visitor messages</div><div class="value">\${d.volume.totalUserMessages}</div></div>
          </div>
        </section>
        <section>
          <h2>Leads</h2>
          <div class="grid">
            <div class="card"><div class="label">Total leads</div><div class="value">\${d.leads.totalLeads}</div></div>
            <div class="card"><div class="label">Qualified leads</div><div class="value">\${d.leads.qualifiedLeads}</div></div>
            <div class="card"><div class="label">Notified</div><div class="value">\${d.leads.notifiedLeads}</div></div>
            <div class="card"><div class="label">Failed notify</div><div class="value">\${d.leads.failedNotifyLeads}</div></div>
            <div class="card"><div class="label">Cost / qualified lead</div><div class="value">\${d.leads.costPerQualifiedLeadUsd === null ? '—' : fmt(d.leads.costPerQualifiedLeadUsd)}</div></div>
          </div>
          <div class="note">Qualified lead definition: \${d.leads.qualifiedLeadDefinition}</div>
        </section>
        <section>
          <h2>Conversion activity</h2>
          <div class="grid">
            <div class="card"><div class="label">Demo panel clicks</div><div class="value">\${d.conversionActivity.demoPanelClicks}</div></div>
            <div class="card"><div class="label">Trade page clicks</div><div class="value">\${d.conversionActivity.tradePageClicks}</div></div>
            <div class="card"><div class="label">Booking link clicks (proxy only)</div><div class="value">\${d.conversionActivity.bookingLinkClicks}</div></div>
          </div>
          <div class="note">\${d.conversionActivity.confirmedBookingsNote}</div>
        </section>
        <section>
          <h2>Errors</h2>
          <div class="grid">
            <div class="card"><div class="label">Tool errors</div><div class="value">\${d.errors.toolErrors}</div></div>
            <div class="card"><div class="label">Rate limited</div><div class="value">\${d.errors.rateLimited}</div></div>
            <div class="card"><div class="label">Budget capped</div><div class="value">\${d.errors.budgetCapped}</div></div>
            <div class="card"><div class="label">Notify failed</div><div class="value">\${d.errors.notifyFailed}</div></div>
          </div>
        </section>
        <section>
          <h2>Recent leads</h2>
          <table>
            <tr><th>ID</th><th>Company</th><th>Trade</th><th>Email</th><th>Created</th><th>Notified</th></tr>
            \${d.recentLeads.map(l => \`<tr><td>\${l.id}</td><td>\${l.company||''}</td><td>\${l.trade||''}</td><td>\${l.email||''}</td><td>\${l.created_at||''}</td><td>\${l.notified_at ? 'yes' : (l.notify_attempts>0?'failed':'pending')}</td></tr>\`).join('')}
          </table>
        </section>
      \`
    }).catch(e => { document.getElementById('root').textContent = 'Error: ' + e })
  </script>
</body>
</html>`)
})
