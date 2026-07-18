// Groundwork icon library — thin-stroke line icons matching the product UI
// sidebar style. Ported 1:1 from the design handoff's icons.js.
// Rendered server-side as inline SVG via the <Icon /> component.

export const ICONS: Record<string, string> = {
  // Structural
  check: `<polyline points="4 12 10 18 20 6"/>`,
  'check-circle': `<circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/>`,
  plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
  x: `<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>`,
  arrow: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,

  // Roles
  key: `<circle cx="8" cy="12" r="4"/><line x1="12" y1="12" x2="21" y2="12"/><line x1="18" y1="12" x2="18" y2="15"/><line x1="15" y1="12" x2="15" y2="16"/>`,
  clipboard: `<rect x="8" y="4" width="8" height="3" rx="1"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><line x1="8" y1="12" x2="15" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>`,
  briefcase: `<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="13" x2="21" y2="13"/>`,
  ruler: `<path d="M3 15l12-12 6 6-12 12z"/><line x1="6" y1="12" x2="8" y2="14"/><line x1="9" y1="9" x2="11" y2="11"/><line x1="12" y1="6" x2="14" y2="8"/>`,
  eye: `<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>`,
  'hard-hat': `<path d="M4 18h16v-2a8 8 0 0 0-16 0v2z"/><line x1="4" y1="18" x2="20" y2="18"/><path d="M10 10V6a2 2 0 0 1 4 0v4"/>`,
  boot: `<path d="M9 3v10H5a2 2 0 0 0-2 2v6h18v-4a4 4 0 0 0-4-4h-2V3z"/><line x1="9" y1="8" x2="14" y2="8"/>`,

  // Business
  chart: `<line x1="4" y1="20" x2="4" y2="10"/><line x1="10" y1="20" x2="10" y2="4"/><line x1="16" y1="20" x2="16" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/>`,
  'chart-pie': `<path d="M12 3v9h9"/><path d="M21 12a9 9 0 1 1-9-9"/>`,
  dollar: `<line x1="12" y1="3" x2="12" y2="21"/><path d="M17 6H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"/>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>`,
  invoice: `<path d="M6 3h9l5 5v13H6z"/><path d="M14 3v6h6"/><line x1="9" y1="14" x2="17" y2="14"/><line x1="9" y1="17" x2="14" y2="17"/>`,

  // Places / things
  home: `<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>`,
  building: `<rect x="4" y="3" width="16" height="18" rx="1"/><line x1="9" y1="7" x2="9" y2="7"/><line x1="12" y1="7" x2="12" y2="7"/><line x1="15" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="9" y2="11"/><line x1="12" y1="11" x2="12" y2="11"/><line x1="15" y1="11" x2="15" y2="11"/><path d="M10 21v-5h4v5"/>`,
  truck: `<rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17.5" cy="18" r="1.5"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/>`,
  phone: `<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>`,
  email: `<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>`,

  // System
  lock: `<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>`,
  'lock-open': `<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7-2.5"/>`,
  shield: `<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>`,
  'shield-check': `<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><polyline points="8 12 11 15 16 10"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>`,
  refresh: `<path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 4 21 10 15 10"/>`,
  users: `<circle cx="9" cy="8" r="4"/><path d="M2 20c0-4 3-7 7-7s7 3 7 7"/><circle cx="17" cy="9" r="3"/><path d="M22 19a5 5 0 0 0-5-5"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>`,

  // Content
  target: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>`,
  rocket: `<path d="M12 3s6 2 6 9c0 3-2 6-6 9-4-3-6-6-6-9 0-7 6-9 6-9z"/><circle cx="12" cy="10" r="2"/><path d="M8 15l-2 5 4-2M16 15l2 5-4-2"/>`,
  'chart-bar': `<rect x="4" y="12" width="4" height="8"/><rect x="10" y="6" width="4" height="14"/><rect x="16" y="9" width="4" height="11"/>`,
  'file-text': `<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/>`,
  tag: `<path d="M20 12L12 20 4 12V4h8z"/><circle cx="8" cy="8" r="1.5"/>`,
  'graduation-cap': `<path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>`,
  bolt: `<polyline points="13 3 5 14 12 14 11 21 19 10 12 10 13 3"/>`,
  plant: `<path d="M12 22V10"/><path d="M12 10c-4 0-7-2-7-6 4 0 7 2 7 6z"/><path d="M12 10c4 0 7-2 7-6-4 0-7 2-7 6z"/>`,

  // Devices / dispatch
  smartphone: `<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>`,
  'apple-logo': `<path d="M16 3c-.5 1.5-1.7 2.5-3 2.5-.2-1.5.8-3 2-3.5.4-.1 1 .5 1 1z"/><path d="M18 12c0-2 1.5-3 1.5-3S18 6 15 6c-1.5 0-2.5 1-3.5 1s-2-1-3.5-1c-3 0-4.5 3-4.5 6 0 4 3 8 5 8 1 0 1.5-1 3-1s2 1 3 1c2 0 5-4 5-8"/>`,
  play: `<polygon points="6 4 20 12 6 20 6 4"/>`,
  'mail-plus': `<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/><line x1="17" y1="15" x2="17" y2="19"/><line x1="15" y1="17" x2="19" y2="17"/>`,
  money: `<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M9 10c0-1.5 1.5-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1.5 2 3 2 3-.5 3-2"/>`,
  'no-symbol': `<circle cx="12" cy="12" r="9"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  trending: `<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/>`,

  // Trades
  fan: `<circle cx="12" cy="12" r="1.6"/><path d="M12 10.4C11 7.5 8.5 5.5 6 6c-1 2.5.5 5 3.4 5.6"/><path d="M13.6 12C16.5 11 18.5 8.5 18 6c-2.5-1-5 .5-5.6 3.4"/><path d="M14 13.6c2.9.9 5.5.5 6-2 -1-2.5-3.5-2.5-6.4-1"/><path d="M10 14c-.9 2.9-.5 5.5 2 6 2.5-1 2.5-3.5 1-6.4"/>`,
  wrench: `<path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z"/>`,
  plug: `<path d="M9 3v5M15 3v5"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v3"/>`,
  chimney: `<path d="M8 21V13h4V3h4v10h1v8z"/><line x1="3" y1="21" x2="21" y2="21"/><path d="M13 3h3v4h-3"/>`,
  roof: `<path d="M3 13L12 5l9 8"/><path d="M6 13v8h12v-8"/><line x1="10" y1="21" x2="10" y2="16"/><line x1="14" y1="21" x2="14" y2="16"/>`,
  'garage-door': `<rect x="3" y="6" width="18" height="15" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/>`,
  tank: `<rect x="5" y="6" width="14" height="15" rx="4"/><line x1="5" y1="13" x2="19" y2="13"/><line x1="10" y1="3" x2="10" y2="6"/><line x1="14" y1="3" x2="14" y2="6"/>`,
  bug: `<circle cx="12" cy="13" r="5"/><line x1="12" y1="8" x2="12" y2="5"/><line x1="9" y1="6" x2="7.5" y2="4"/><line x1="15" y1="6" x2="16.5" y2="4"/><line x1="7" y1="12" x2="3" y2="11"/><line x1="17" y1="12" x2="21" y2="11"/><line x1="7" y1="16" x2="3" y2="18"/><line x1="17" y1="16" x2="21" y2="18"/><line x1="9" y1="18" x2="9" y2="21"/><line x1="15" y1="18" x2="15" y2="21"/>`,
  sprinkler: `<line x1="12" y1="21" x2="12" y2="11"/><circle cx="12" cy="9" r="2"/><path d="M12 7V4"/><path d="M5 9c0-2 2-4 4-4"/><path d="M19 9c0-2-2-4-4-4"/><path d="M4 15c1.5-1 3-1 4 1M20 15c-1.5-1-3-1-4 1"/>`,
  'paint-roller': `<rect x="4" y="4" width="14" height="6" rx="1"/><line x1="8" y1="10" x2="8" y2="14"/><rect x="6" y="14" width="4" height="7" rx="1"/>`,
}
