// Site navigation IA — ported 1:1 from the design handoff's chrome.js NAV
// constant. Drives both the desktop dropdown nav and the mobile menu.

export interface NavLinkItem {
  label: string
  href: string
  desc?: string
}

export interface NavSectionBreak {
  section: string
}

export type NavMenuEntry = NavLinkItem | NavSectionBreak

export interface NavItem {
  label: string
  href: string
  menu?: NavMenuEntry[]
}

export function isSection(entry: NavMenuEntry): entry is NavSectionBreak {
  return 'section' in entry
}

export const NAV: NavItem[] = [
  {
    label: 'Product',
    href: '/product',
    menu: [
      { section: 'Overview' },
      { label: 'Product overview', href: '/product', desc: 'How Groundwork works — end to end' },
      { label: 'Platform architecture', href: '/product/platform', desc: 'How the pieces connect' },
      { label: 'Full feature list', href: '/features', desc: 'Every capability, module by module' },
      { section: 'Modules' },
      { label: 'My Day', href: '/product/my-day', desc: 'Role-based daily dashboards' },
      { label: 'Sales', href: '/product/sales', desc: 'Pipeline, leads, follow-ups' },
      { label: 'Financial', href: '/product/financial', desc: 'Invoices, payments, statements' },
      { label: 'Operations', href: '/product/operations', desc: 'Schedule, dispatch, work orders' },
      { label: 'Admin & Permissions', href: '/product/admin', desc: 'Roles, access, workflow' },
      { label: 'Mobile & Field Mode', href: '/product/mobile', desc: 'Built for the truck' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    menu: [
      { section: 'By trade' },
      { label: 'Landscaping', href: '/solutions/landscaping', desc: 'Design-build, hardscape, maintenance' },
      { label: 'Home service', href: '/solutions/home-service', desc: 'HVAC, plumbing, electrical' },
      { label: 'Field service', href: '/solutions/field-service', desc: 'Restoration, exteriors, roofing' },
      { label: 'Multi-crew teams', href: '/solutions/multi-crew-teams', desc: 'Multi-role operational scale' },
    ],
  },
  {
    label: 'Roles',
    href: '/roles',
    menu: [
      { section: 'Built for every seat' },
      { label: 'Owners', href: '/roles/owners', desc: 'Clarity, cash, and pipeline' },
      { label: 'Office managers', href: '/roles/office-managers', desc: 'Coordination and control' },
      { label: 'Sales reps', href: '/roles/sales-reps', desc: 'Work the queue, not the inbox' },
      { label: 'Foremen', href: '/roles/foremen', desc: 'Field leadership, mobile-first' },
      { label: 'Laborers', href: '/roles/laborers', desc: "Just today's work, nothing else" },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/customers' },
  {
    label: 'Resources',
    href: '/resources',
    menu: [
      { section: 'Learn' },
      { label: 'Groundwork Academy', href: '/resources#academy', desc: 'Training for every role' },
      { label: 'Implementation guide', href: '/resources#implementation', desc: 'What to expect' },
      { label: 'FAQ', href: '/faq', desc: 'Common questions' },
      { label: 'Blog', href: '/resources#blog', desc: 'Field notes & operator writing' },
      { label: 'Help center', href: '/resources#help', desc: 'Product docs & support' },
      { label: 'API docs', href: '/resources#api', desc: 'Build on Groundwork' },
      { label: 'Security', href: '/security', desc: 'How we protect your data' },
    ],
  },
  { label: 'About', href: '/about' },
]
