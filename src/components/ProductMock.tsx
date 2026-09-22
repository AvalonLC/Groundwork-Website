import type { PropsWithChildren } from 'hono/jsx'

// Product-mock building blocks — ported from styles.css .pm / .pm-sidebar /
// .pm-stats / .pm-card / .pm-task / .tag component classes. These are
// stylized recreations of the real Groundwork product UI, used throughout
// the marketing site's hero and split-feature sections.

export function PM({
  large = false,
  minHeight = 500,
  shadow,
  children,
}: PropsWithChildren<{ large?: boolean; minHeight?: number; shadow?: string }>) {
  return (
    <div
      class={`pm${large ? ' pm-lg' : ''}`}
      style={!large ? `grid-template-columns: 1fr; min-height: ${minHeight}px;${shadow ? ` box-shadow: ${shadow};` : ''}` : undefined}
    >
      {children}
    </div>
  )
}

// `active` selects which item carries the .active highlight (defaults to
// 'command', matching every existing static usage). `interactive`, when
// true, tags EVERY item with data-demo-sidebar-target=<key> so the
// /explore page's client-side JS can wire the whole sidebar up to a real
// panel — not just a curated subset. Inert on any page that isn't /explore.
export function PMSidebar({ active = 'command', interactive = false }: { active?: string; interactive?: boolean } = {}) {
  const attr = (key: string) => (interactive ? { 'data-demo-sidebar-target': key } : {})
  const cls = (key: string) => `sb-item${active === key ? ' active' : ''}`
  return (
    <aside class="pm-sidebar">
      <div class="brand">
        <span class="brand-mark"></span> Groundwork
      </div>
      <div class="brand-sub">Cedar Grove Landscape Co.</div>

      <div class={cls('command')} style="margin-top: 10px;" {...attr('command')}>
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>{' '}
        Command Center
      </div>

      <div class="sb-group">
        <div class="sb-label">Sales</div>
        <div class={cls('pipeline')} {...attr('pipeline')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 6h16M4 12h10M4 18h6" />
          </svg>{' '}
          Pipeline
        </div>
        <div class={cls('leads')} {...attr('leads')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="9" cy="8" r="4" />
            <path d="M2 20c0-4 3-7 7-7s7 3 7 7" />
          </svg>{' '}
          Leads
        </div>
        <div class={cls('clients')} {...attr('clients')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="9" cy="8" r="4" />
            <circle cx="17" cy="10" r="3" />
          </svg>{' '}
          Clients
        </div>
        <div class={cls('properties')} {...attr('properties')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-4v-6h-8v6H4a1 1 0 0 1-1-1z" />
          </svg>{' '}
          Properties
        </div>
        <div class={cls('estimates')} {...attr('estimates')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="4" y1="9" x2="20" y2="9" />
          </svg>{' '}
          Estimates
        </div>
      </div>
      <div class="sb-group">
        <div class="sb-label">Financial</div>
        <div class={cls('money')} {...attr('money')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 4v16h16" />
            <path d="M8 16l4-6 3 3 5-7" />
          </svg>{' '}
          Money Loop
        </div>
        <div class={cls('budget')} {...attr('budget')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 10c0-1.5 1.5-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1.5 2 3 2 3-.5 3-2" />
          </svg>{' '}
          Budget &amp; Rates
        </div>
        <div class={cls('invoicing')} {...attr('invoicing')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>{' '}
          Invoice Reporting
        </div>
      </div>
      <div class="sb-group">
        <div class="sb-label">Operations</div>
        <div class={cls('schedule')} {...attr('schedule')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="16" y1="3" x2="16" y2="7" />
          </svg>{' '}
          Schedule
        </div>
        <div class={cls('dispatch')} {...attr('dispatch')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M9 20l-5-9 5-9M15 4l5 9-5 9" />
          </svg>{' '}
          Dispatch
        </div>
        <div class={cls('workorders')} {...attr('workorders')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
            <rect x="7" y="4" width="10" height="6" rx="1" />
          </svg>{' '}
          Work Orders
        </div>
      </div>
      <div class="sb-group">
        <div class="sb-label">Admin</div>
        <div class={cls('clientportal')} {...attr('clientportal')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="9" cy="8" r="4" />
            <circle cx="17" cy="10" r="3" />
          </svg>{' '}
          Client Portal
        </div>
        <div class={cls('aar')} {...attr('aar')}>
          <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="8" y="4" width="8" height="3" rx="1" />
            <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          </svg>{' '}
          AAR Reviews
        </div>
      </div>
    </aside>
  )
}

export function PMSidebarSimple({ items }: { items: { label: string; active?: boolean }[][] }) {
  const groupLabels = ['Dashboard', 'Sales']
  return (
    <aside class="pm-sidebar">
      <div class="brand">
        <span class="brand-mark"></span> Groundwork
      </div>
      {items.map((group, i) => (
        <div class="sb-group" style={i === 0 ? 'margin-top: 22px;' : undefined}>
          <div class="sb-label">{groupLabels[i] ?? ''}</div>
          {group.map((it) => (
            <div class={`sb-item${it.active ? ' active' : ''}`}>
              {it.active ? '■' : '□'} {it.label}
            </div>
          ))}
        </div>
      ))}
    </aside>
  )
}

export function PMMain({ children, style, dark = false }: PropsWithChildren<{ style?: string; dark?: boolean }>) {
  return (
    <main
      class="pm-main"
      style={`${dark ? 'background: var(--gw-forest-900); color: var(--gw-cream-100);' : ''}${style ?? ''}`}
    >
      {children}
    </main>
  )
}

export function PMTitleRow({ title, sub, actions }: { title: string; sub?: string; actions?: any }) {
  return (
    <div class="pm-title-row">
      <div class="pm-title">
        {title} {sub && <small>{sub}</small>}
      </div>
      {actions}
    </div>
  )
}

export function PMStats({ stats }: { stats: { label: string; value: string; variant?: 'overdue' | 'sold' }[] }) {
  return (
    <div class="pm-stats">
      {stats.map((s) => (
        <div class={`pm-stat${s.variant ? ' ' + s.variant : ''}`}>
          <div class="lbl">{s.label}</div>
          <div class="val">{s.value}</div>
        </div>
      ))}
    </div>
  )
}

// Like PMStats, but supports an arbitrary number of columns — used for
// screens whose real stat row doesn't fit the 4-up grid (e.g. Money Loop's
// 5-card "what needs doing" row, Dispatch Board's 4-card row reused at a
// different width).
export function PMStatRow({ stats, columns }: { stats: { label: string; value: string; variant?: 'overdue' | 'sold' }[]; columns?: number }) {
  return (
    <div style={`display: grid; grid-template-columns: repeat(${columns ?? stats.length}, 1fr); gap: 10px; margin-bottom: 18px;`}>
      {stats.map((s) => (
        <div class={`pm-stat${s.variant ? ' ' + s.variant : ''}`}>
          <div class="lbl">{s.label}</div>
          <div class="val">{s.value}</div>
        </div>
      ))}
    </div>
  )
}

export function PMCard({ heading, chip, children }: PropsWithChildren<{ heading: string; chip?: string }>) {
  return (
    <div class="pm-card">
      <div class="pm-card-h">
        {heading} {chip && <span class="chip">{chip}</span>}
      </div>
      {children}
    </div>
  )
}

export function PMTask({
  title,
  done = false,
  overdue = false,
  tags,
}: {
  title: string
  done?: boolean
  overdue?: boolean
  tags?: { label: string; variant: string }[]
}) {
  return (
    <div class={`pm-task${overdue ? ' overdue' : ''}`}>
      <span class={`cb${done ? ' done' : ''}`}></span>
      <span class="tk-title">{title}</span>
      {tags && (
        <span class="tk-tags">
          {tags.map((t) => (
            <span class={`tag tag-${t.variant}`}>{t.label}</span>
          ))}
        </span>
      )}
    </div>
  )
}

export function PMSectionLabel({ label, upcoming = false }: { label: string; upcoming?: boolean }) {
  return <div class={`pm-section-label${upcoming ? ' upcoming' : ''}`}>{label}</div>
}
