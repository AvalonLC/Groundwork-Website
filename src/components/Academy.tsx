import type { PropsWithChildren } from 'hono/jsx'
import { Icon } from './Icon'

// Groundwork Academy building blocks — used by the /academy hub and its
// four track pages (Sales Academy, Estimating 101, Financial Literacy,
// CRM Guide). These render real, readable curriculum content (not a
// product-mock screenshot) so "Explore" from the Resources page leads
// somewhere with actual notes and breakdowns, not just a UI preview.

export function AcademyHero({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string
  title: any
  lede: string
  meta: string
}) {
  return (
    <section class="section subpage-hero">
      <div class="wrap">
        <a href="/academy" style="font-size: 12.5px; color: var(--gw-forest-700); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 18px;">
          ← All tracks
        </a>
        <span class="eyebrow">{eyebrow}</span>
        <h1 style="margin-top: 20px;">{title}</h1>
        <p class="lede">{lede}</p>
        <div style="margin-top: 24px; font-size: 12.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gw-ink-500); font-weight: 600;">
          {meta}
        </div>
      </div>
    </section>
  )
}

export function TrackCard({
  href,
  icon,
  label,
  title,
  desc,
  meta,
}: {
  href: string
  icon: string
  label: string
  title: string
  desc: string
  meta: string
}) {
  return (
    <a
      href={href}
      style="text-decoration: none; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: 14px; padding: 28px; display: block;"
    >
      <div style="width: 36px; height: 36px; border-radius: 9px; background: var(--gw-forest-800); color: white; display: grid; place-items: center; margin-bottom: 16px;">
        <Icon name={icon} size={17} />
      </div>
      <div style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 600; margin-bottom: 6px;">
        {label}
      </div>
      <div style="font-family: var(--font-serif); font-size: 21px; font-weight: 500; color: var(--gw-ink-900); margin-bottom: 10px;">
        {title}
      </div>
      <div style="font-size: 13.5px; color: var(--gw-ink-500); margin-bottom: 16px;">{desc}</div>
      <div style="font-size: 12px; color: var(--gw-ink-400); border-top: 1px solid var(--gw-cream-300); padding-top: 12px;">{meta}</div>
    </a>
  )
}

export function Lesson({
  n,
  title,
  type,
  duration,
  children,
}: PropsWithChildren<{ n: number; title: string; type: string; duration: string }>) {
  return (
    <div style="padding: 26px 0; border-bottom: 1px solid var(--gw-line); display: flex; gap: 20px;">
      <div style="flex: none; width: 34px; height: 34px; border-radius: 8px; background: var(--gw-cream-200); color: var(--gw-ink-500); display: grid; place-items: center; font-family: var(--font-serif); font-size: 14px; font-weight: 600;">
        {n}
      </div>
      <div style="flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 8px;">
          <div style="font-family: var(--font-serif); font-size: 19px; font-weight: 500; color: var(--gw-ink-900);">{title}</div>
          <div style="flex: none; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gw-ink-400); font-weight: 600; white-space: nowrap;">
            {type} · {duration}
          </div>
        </div>
        <div style="font-size: 14px; color: var(--gw-ink-700); line-height: 1.6;">{children}</div>
      </div>
    </div>
  )
}

export function PhaseBlock({
  phase,
  title,
  desc,
  children,
}: PropsWithChildren<{ phase: string; title: string; desc: string }>) {
  return (
    <div style="margin-bottom: 40px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
        <span style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gw-forest-600); font-weight: 700;">{phase}</span>
      </div>
      <h3 style="margin: 0 0 8px;">{title}</h3>
      <p style="font-size: 14.5px; color: var(--gw-ink-500); margin: 0 0 8px; max-width: 640px;">{desc}</p>
      <div>{children}</div>
    </div>
  )
}

export function PlaybookStage({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div style="display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--gw-cream-300); align-items: baseline;">
      <div style="flex: none; width: 24px; font-family: var(--font-serif); font-size: 14px; color: var(--gw-ink-400); font-weight: 600;">{n}</div>
      <div>
        <div style="font-size: 13.5px; font-weight: 600; color: var(--gw-ink-900); margin-bottom: 2px;">{title}</div>
        <div style="font-size: 12.5px; color: var(--gw-ink-500);">{desc}</div>
      </div>
    </div>
  )
}
