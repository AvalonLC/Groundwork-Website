import { Icon } from './Icon'

// Access-matrix table used on the Admin product page — ported from the
// design's inline-styled grid (kept as a component so the repeated cell
// markup isn't duplicated by hand).
export function AccessMatrix({ columns, rows }: { columns: string[]; rows: { label: string; access: boolean[] }[] }) {
  return (
    <div style={`display: grid; grid-template-columns: 1.5fr repeat(${columns.length}, 1fr); gap: 4px; font-size: 11px;`}>
      <div style="padding: 6px 4px; color: var(--gw-ink-500); font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">
        View
      </div>
      {columns.map((c) => (
        <div style="padding: 6px 4px; color: var(--gw-ink-500); font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align:center;">
          {c}
        </div>
      ))}
      {rows.map((r) => (
        <>
          <div style="padding: 8px 4px; border-top: 1px solid var(--gw-cream-300);">{r.label}</div>
          {r.access.map((has) => (
            <div style="padding: 8px 4px; border-top: 1px solid var(--gw-cream-300); text-align:center; color: var(--gw-ink-300);">
              {has ? <Icon name="check" size={14} style="color: var(--gw-green-600); vertical-align:-2px;" /> : '—'}
            </div>
          ))}
        </>
      ))}
    </div>
  )
}
