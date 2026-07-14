import type { PropsWithChildren } from 'hono/jsx'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'light'
  arrow?: boolean
  style?: string
  class?: string
}

// <Button /> — ported from the design handoff's .btn / .btn-primary /
// .btn-secondary / .btn-ghost / .btn-light classes.
export function Button({
  href,
  variant = 'primary',
  arrow = false,
  style,
  class: className,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <a href={href} class={`btn btn-${variant}${className ? ' ' + className : ''}`} style={style}>
      {children}
      {arrow && <span class="arrow">→</span>}
    </a>
  )
}
