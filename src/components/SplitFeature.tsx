import type { PropsWithChildren } from 'hono/jsx'

// <SplitFeature /> — the alternating copy+mock section pattern used across
// module / solution / role pages ('.wrap.split'). `reverse` swaps the mock
// to the left and copy to the right (matches the design's direction: rtl
// pattern, simplified here as literal ordering since we don't rely on the
// inline `direction: rtl` trick from the prototype).
export function SplitFeature({
  reverse = false,
  copy,
  mock,
  background,
}: {
  reverse?: boolean
  copy: any
  mock: any
  background?: string
}) {
  return (
    <section class="section" style={background}>
      <div class="wrap split">
        {reverse ? (
          <>
            {mock}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {mock}
          </>
        )}
      </div>
    </section>
  )
}

export function SplitContent({
  eyebrow,
  title,
  lede,
  children,
}: PropsWithChildren<{ eyebrow: string; title: any; lede: string }>) {
  return (
    <div class="split-content">
      <span class="eyebrow">{eyebrow}</span>
      <h2 style="margin-top: 20px;">{title}</h2>
      <p class="lede">{lede}</p>
      {children}
    </div>
  )
}

export function MockFrame({ children, minHeight = 460 }: PropsWithChildren<{ minHeight?: number }>) {
  return (
    <div class="pm" style={`grid-template-columns: 1fr; box-shadow: var(--shadow-lg); min-height: ${minHeight}px;`}>
      {children}
    </div>
  )
}
