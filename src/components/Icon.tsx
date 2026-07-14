import { ICONS } from '../data/icons'

interface IconProps {
  name: string
  size?: number
  stroke?: number
  style?: string
  class?: string
}

// Server-rendered inline SVG icon — ported from the design handoff's
// icons.js runtime-render approach into a static Hono JSX component.
export function Icon({ name, size = 16, stroke = 1.6, style, class: className }: IconProps) {
  const inner = ICONS[name]
  if (!inner) return null
  // Note: the <svg> is built as a raw HTML string (not JSX) because Hono
  // JSX's SSR renderer treats <svg> as a special namespace-context node,
  // which conflicts with dangerouslySetInnerHTML set directly on it. Using
  // a plain <span> wrapper with the whole markup as raw HTML avoids that.
  const svg = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`
  return (
    <span class={`icon-slot${className ? ' ' + className : ''}`} style={style} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}
