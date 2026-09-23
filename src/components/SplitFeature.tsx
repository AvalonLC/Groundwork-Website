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

// Small "Try this yourself →" caption link, meant to sit directly under a
// <MockFrame> — deep-links into the matching /explore panel via
// ?panel=<key> (see bindInteractiveDemo() in site.js for the reader side).
// Lets a visitor go click the real interactive version of whatever mock
// they were just looking at, instead of only ever reading about it.
export function TryItLink({ panel, label = 'Try this yourself' }: { panel: string; label?: string }) {
  return (
    <a href={`/explore?panel=${panel}`} class="try-it-caption">
      {label} <span class="arrow">→</span>
    </a>
  )
}

// Wraps a <MockFrame> + <TryItLink> as a single grid cell so the caption
// sits directly beneath the mock inside a .wrap.split two-column layout
// without disturbing the existing column sizing.
export function MockFrameWithLink({ panel, label, children, minHeight }: PropsWithChildren<{ panel: string; label?: string; minHeight?: number }>) {
  return (
    <div>
      <MockFrame minHeight={minHeight}>{children}</MockFrame>
      <TryItLink panel={panel} label={label} />
    </div>
  )
}

// Same idea as MockFrameWithLink, but for pages that build their own <PM>
// mock directly (the role pages under /roles/*) instead of going through
// <MockFrame>. Wraps whatever's passed in (typically a whole <PM>...</PM>
// block) plus the caption as one grid cell.
export function WithTryItLink({ panel, label, children }: PropsWithChildren<{ panel: string; label?: string }>) {
  return (
    <div>
      {children}
      <TryItLink panel={panel} label={label} />
    </div>
  )
}
