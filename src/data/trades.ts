// Trades data — one entry per trade, consumed by the shared <TradePage />
// template (src/components/TradePage.tsx). This is the "Option B" approach:
// a single template component driven by data, rather than N bespoke page
// files. Each trade gets its own URL at /trades/:slug via a dynamic route
// in src/index.tsx.

export interface TradeMockRow {
  label: string
  sub?: string
  tag?: string
  tagVariant?: 'qual' | 'rapport' | 'website'
  meta?: string
}

export interface TradeSplitItem {
  num: string
  title: string
  body: string
}

export interface TradeRelated {
  href: string
  title: string
  desc: string
}

export interface TradeData {
  slug: string
  name: string
  icon: string
  navDesc: string // short description used in the nav mega-menu tile
  category: string // eyebrow tag line, e.g. "Heating · Cooling · Ventilation"
  heroTitleMain: string
  heroTitleEm: string
  heroLede: string
  splitEyebrow: string
  splitTitle: string
  splitLede: string
  splitItems: TradeSplitItem[]
  mockTitle: string
  mockRows: TradeMockRow[]
  related: TradeRelated[]
  ctaTitleEm: string
  ctaDescription: string
}

export const TRADES: TradeData[] = [
  {
    slug: 'hvac',
    name: 'HVAC',
    icon: 'fan',
    navDesc: 'Tune-ups, installs, memberships',
    category: 'Install · Service · Maintenance agreements',
    heroTitleMain: 'Membership renewals that renew themselves. Callbacks that',
    heroTitleEm: "don't repeat.",
    heroLede:
      'Tune-ups, installs, and emergency no-cool calls — all on the same board. Groundwork tracks equipment age and service history so your techs walk in prepared and your office knows which memberships are due before the customer calls.',
    splitEyebrow: 'Built for seasonal volume',
    splitTitle: 'Every unit has a record. Every visit adds to it.',
    splitLede:
      "HVAC lives and dies by equipment history and membership retention. Groundwork's property record tracks every unit installed, every filter changed, and every tune-up completed — so renewals stop depending on someone's memory.",
    splitItems: [
      { num: '→', title: 'Membership & maintenance agreements', body: 'Auto-renewing tune-up plans with renewal reminders that fire themselves.' },
      { num: '→', title: 'Equipment history per unit', body: 'Model, install date, warranty status, every visit logged against it.' },
      { num: '→', title: 'Same-day dispatch', body: 'No-cool and no-heat calls get priority routing to the nearest available tech.' },
      { num: '→', title: 'Install vs. service pipelines', body: 'Separate sales motion for system replacements vs. service tickets.' },
      { num: '→', title: 'Invoicing from the truck', body: 'Card payment collected before the tech leaves the driveway.' },
    ],
    mockTitle: "Today's Dispatch — HVAC",
    mockRows: [
      { label: '08:00 — Reyes · AC no-cool', sub: 'Sam · Emergency', tag: 'On site', tagVariant: 'rapport', meta: 'Membership · Priority' },
      { label: '10:00 — Chen · Fall tune-up', sub: 'Dana · Membership visit', tag: 'En route', tagVariant: 'qual', meta: 'Renewal due in 14 days' },
      { label: '12:30 — Ozawa · System replacement quote', sub: 'Sales · Marcus', tag: 'Scheduled', tagVariant: 'website', meta: '18-yr-old unit on file' },
      { label: '14:00 — Lin · Furnace inspection', sub: 'Dana · Membership visit', tag: 'Scheduled', tagVariant: 'qual', meta: 'Filter due' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Dispatch built for seasonal volume.' },
      { href: '/product/sales', title: 'Sales', desc: 'Separate install & service pipelines.' },
      { href: '/product/financial', title: 'Financial', desc: 'Membership billing, automated.' },
    ],
    ctaTitleEm: 'HVAC',
    ctaDescription: 'Bring your membership list. We\u2019ll show you the renewal math.',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    icon: 'wrench',
    navDesc: 'Dispatch, inspections, water heaters',
    category: 'Service · Repipe · Water heater · Drain',
    heroTitleMain: 'Every callback opens the last visit\u2019s notes. Every emergency gets',
    heroTitleEm: 'priority.',
    heroLede:
      'No-hot-water calls at 7am. Slab leaks that turn into a week-long job. Groundwork gives plumbing companies same-day dispatch with the property history to back it up — so nobody re-diagnoses a job that was already diagnosed last month.',
    splitEyebrow: 'Same-day dispatch, done right',
    splitTitle: 'Route techs. Track jobs. Invoice from the truck.',
    splitLede:
      "Plumbing runs on urgency and trust. Groundwork's dispatch view handles the daily churn — emergencies, recurring inspections, and the constant re-jiggering of a route when a job runs long.",
    splitItems: [
      { num: '→', title: 'Emergency dispatch with priority routing', body: 'No-hot-water and active-leak calls jump the queue automatically.' },
      { num: '→', title: 'Property & fixture history', body: 'Water heater age, last inspection, prior repairs — all on the record.' },
      { num: '→', title: 'Recurring inspection agreements', body: 'Annual water heater and backflow inspections on autopilot.' },
      { num: '→', title: 'Invoicing from the truck', body: 'Send invoice with card payment before the tech leaves.' },
      { num: '→', title: 'Callback tracking', body: 'Catch bad first visits. Retrain or reassign before it happens twice.' },
    ],
    mockTitle: "Today's Dispatch — Plumbing",
    mockRows: [
      { label: '07:15 — Ozawa · No hot water', sub: 'Jorge · Emergency', tag: 'On site', tagVariant: 'rapport', meta: 'Water heater · 9 yrs old' },
      { label: '09:30 — Nguyen · Slab leak', sub: 'Alicia · Emergency', tag: 'En route', tagVariant: 'rapport', meta: 'Escalated from inspection' },
      { label: '11:30 — Ramírez · Toilet install', sub: 'Jorge · Scheduled', tag: 'Scheduled', tagVariant: 'website', meta: 'Repeat customer' },
      { label: '14:00 — Chen · Annual inspection', sub: 'Alicia · Agreement', tag: 'Scheduled', tagVariant: 'qual', meta: 'Backflow due' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Priority routing for emergencies.' },
      { href: '/product/financial', title: 'Financial', desc: 'Invoice from the truck.' },
      { href: '/product/mobile', title: 'Mobile', desc: 'The tech-facing field app.' },
    ],
    ctaTitleEm: 'plumbing',
    ctaDescription: 'Bring your call volume. We\u2019ll show you the fit.',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    icon: 'plug',
    navDesc: 'Panel upgrades, service calls, code work',
    category: 'Service · Panel upgrades · New construction',
    heroTitleMain: 'From service call to permit-pulled panel upgrade — one',
    heroTitleEm: 'system.',
    heroLede:
      'Electrical work spans a five-minute outlet swap and a five-day panel upgrade with an inspection scheduled around it. Groundwork tracks both the same way: one job record, one timeline, sales and dispatch on the same page.',
    splitEyebrow: 'From diagnostic to code compliance',
    splitTitle: 'Panel history, permit tracking, and dispatch that matches the job size.',
    splitLede:
      "Electrical jobs vary wildly in scope. Groundwork's job record scales with them — a quick diagnostic call gets a quick ticket, a panel upgrade gets a full estimate-to-permit-to-inspection workflow.",
    splitItems: [
      { num: '→', title: 'Service vs. project pipelines', body: 'Same-day diagnostics dispatched separately from multi-day installs.' },
      { num: '→', title: 'Panel & circuit history', body: 'Panel age, amperage, prior upgrades — tied to the property record.' },
      { num: '→', title: 'Permit & inspection tracking', body: 'Know exactly which jobs are waiting on a city inspection.' },
      { num: '→', title: 'Estimate templates for code work', body: 'Panel upgrades, EV chargers, generator hookups — pre-built scopes.' },
      { num: '→', title: 'Invoicing from the truck', body: 'Card payment collected on-site, no chasing checks later.' },
    ],
    mockTitle: 'Job Board — Electrical',
    mockRows: [
      { label: '08:00 — Lin · Panel upgrade', sub: 'Diego · Day 2 of 3', tag: 'In progress', tagVariant: 'website', meta: 'Permit pulled · Inspection Fri' },
      { label: '11:00 — Patel · Outlet not working', sub: 'Diego · Service call', tag: 'Scheduled', tagVariant: 'qual', meta: 'Same-day' },
      { label: '13:00 — Ruiz · EV charger install', sub: 'Sales · Angela', tag: 'Quoted', tagVariant: 'website', meta: '200A panel confirmed' },
      { label: '15:00 — Chen · Generator hookup', sub: 'Diego · Scheduled', tag: 'Scheduled', tagVariant: 'qual', meta: 'Permit filed' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/sales', title: 'Sales', desc: 'Estimate templates for code work.' },
      { href: '/product/operations', title: 'Operations', desc: 'Service vs. project dispatch.' },
      { href: '/product/admin', title: 'Admin', desc: 'Permit & inspection tracking.' },
    ],
    ctaTitleEm: 'electrical',
    ctaDescription: 'Bring a real panel upgrade. We\u2019ll map the workflow live.',
  },
  {
    slug: 'chimney',
    name: 'Chimney',
    icon: 'chimney',
    navDesc: 'Sweeps, inspections, repairs',
    category: 'Sweep · Inspection · Repair · Liner install',
    heroTitleMain: 'Seasonal rushes. Annual inspections. One system that',
    heroTitleEm: "doesn't lose track.",
    heroLede:
      'Chimney companies live on the fall rush and the annual-inspection cycle. Groundwork tracks which properties are due, routes the seasonal surge, and turns every inspection into the next year\u2019s scheduled visit — automatically.',
    splitEyebrow: 'The seasonal rush, tamed',
    splitTitle: 'Annual inspections that book themselves back in.',
    splitLede:
      'Every chimney has a service history — liner condition, last sweep, flagged repairs. Groundwork keeps that record so the fall rush is a scheduling exercise, not a scramble.',
    splitItems: [
      { num: '→', title: 'Annual inspection reminders', body: 'Auto-flag properties due for their yearly sweep before they call.' },
      { num: '→', title: 'Liner & flue condition tracking', body: 'Photo-documented findings tied to the property record.' },
      { num: '→', title: 'Seasonal surge scheduling', body: 'Fall rush routing that packs the calendar without overbooking crews.' },
      { num: '→', title: 'Repair upsell tracking', body: 'Flagged findings become a follow-up estimate, not a lost opportunity.' },
      { num: '→', title: 'Invoicing on-site', body: 'Card payment collected the moment the sweep is done.' },
    ],
    mockTitle: 'Fall Rush Schedule — Chimney',
    mockRows: [
      { label: 'Chapman Rd · Annual sweep', sub: 'Due · Last service 11 mo ago', tag: 'Due', tagVariant: 'qual', meta: 'Auto-flagged' },
      { label: 'Ridgeline Ct · Sweep + inspection', sub: 'Scheduled Thu', tag: 'Scheduled', tagVariant: 'website', meta: 'Liner flagged last year' },
      { label: 'Patel Residence · Liner repair', sub: 'Follow-up from inspection', tag: 'Quoted', tagVariant: 'website', meta: '$1,850 estimate sent' },
      { label: 'Oakwood Dr · New customer sweep', sub: 'First visit', tag: 'Scheduled', tagVariant: 'qual', meta: 'Referral' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Seasonal surge scheduling.' },
      { href: '/product/sales', title: 'Sales', desc: 'Turn findings into estimates.' },
      { href: '/product/mobile', title: 'Mobile', desc: 'Photo-documented findings, on-site.' },
    ],
    ctaTitleEm: 'chimney service',
    ctaDescription: 'Bring your inspection list. We\u2019ll show you the fall-rush view.',
  },
  {
    slug: 'roofing',
    name: 'Roofing',
    icon: 'roof',
    navDesc: 'Storm response, insurance claims, crews',
    category: 'Storm response · Insurance claims · Install',
    heroTitleMain: 'Multi-party jobs. Multi-step payouts. One',
    heroTitleEm: 'system.',
    heroLede:
      'Roofing runs on choreography: homeowner, adjuster, sales, PM, and crew all need different views of the same job. Groundwork handles the choreography — documents, stakeholders, progress payments, and warranty callbacks.',
    splitEyebrow: 'Built for insurance-driven work',
    splitTitle: 'The workflow assumes multiple parties. Because that\u2019s reality.',
    splitLede:
      'Every storm job is a small movie with a cast: the homeowner who lost their roof, the adjuster who approves the scope, the sales rep who explained the process, the PM who runs the build, and the crew who executes. Groundwork holds all of them in one record.',
    splitItems: [
      { num: '→', title: 'Multi-stakeholder deal records', body: 'Homeowner + adjuster + sales + PM + crew, all on one file.' },
      { num: '→', title: 'Document management', body: 'Insurance approvals, adjuster scopes, contracts, change orders.' },
      { num: '→', title: 'Storm response mode', body: 'Surge scheduling and lead intake for weather-driven work.' },
      { num: '→', title: 'Photo-based scope documentation', body: 'Every photo tagged to the location and item.' },
      { num: '→', title: 'Progress-payment plans', body: 'Deposit, mid-progress, final — tracked to the claim.' },
    ],
    mockTitle: 'Claim · Storm damage · Patel Residence',
    mockRows: [
      { label: 'Homeowner · D. Patel', sub: 'Approved scope', tag: 'Approved', tagVariant: 'rapport', meta: '' },
      { label: 'Adjuster · State Farm', sub: '$32,400 approved', tag: 'Approved', tagVariant: 'website', meta: '' },
      { label: 'PM · Angela Ruiz', sub: 'Build lead', tag: 'Assigned', tagVariant: 'rapport', meta: '' },
      { label: 'Crew · Ridgeline Exteriors', sub: 'Install crew', tag: 'Scheduled', tagVariant: 'qual', meta: 'Aug 12' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Multi-stakeholder scheduling.' },
      { href: '/product/admin', title: 'Admin', desc: 'Approval queues for insurance work.' },
      { href: '/product/financial', title: 'Financial', desc: 'Progress payments, tracked.' },
    ],
    ctaTitleEm: 'roofing',
    ctaDescription: 'Bring a real claim file. We\u2019ll show you the fit.',
  },
  {
    slug: 'garage-door',
    name: 'Garage Door',
    icon: 'garage-door',
    navDesc: 'Repairs, installs, spring service',
    category: 'Repair · Install · Spring & opener service',
    heroTitleMain: 'Same-day repairs. Scheduled installs. One board that',
    heroTitleEm: "doesn't drop a ticket.",
    heroLede:
      'A broken spring is an emergency. A new door install is a project. Groundwork keeps both moving on the same dispatch board — with the door model, spring type, and opener history already on file before the tech knocks.',
    splitEyebrow: 'Repairs that don\u2019t require a callback',
    splitTitle: 'Door history on file. Every visit adds to it.',
    splitLede:
      'Garage door service is repeat business — the same house calls again in 8 years for the opener, in 12 for the door. Groundwork keeps the equipment record so the second visit starts smarter than the first.',
    splitItems: [
      { num: '→', title: 'Same-day emergency dispatch', body: 'Broken spring and off-track calls get priority routing.' },
      { num: '→', title: 'Door & opener equipment history', body: 'Model, install date, spring type — tied to the property.' },
      { num: '→', title: 'Install project pipeline', body: 'Multi-door and commercial installs tracked start to finish.' },
      { num: '→', title: 'Parts & pricing templates', body: 'Standard spring, opener, and panel pricing ready to quote.' },
      { num: '→', title: 'Invoicing from the truck', body: 'Card payment collected before the tech leaves.' },
    ],
    mockTitle: "Today's Dispatch — Garage Door",
    mockRows: [
      { label: '07:30 — Ozawa · Broken spring', sub: 'Emergency', tag: 'On site', tagVariant: 'rapport', meta: 'Torsion spring on file' },
      { label: '10:00 — Reyes · Opener not responding', sub: 'Service call', tag: 'En route', tagVariant: 'qual', meta: 'Opener 6 yrs old' },
      { label: '13:00 — Chen Residence · New door install', sub: 'Project · Day 1', tag: 'Scheduled', tagVariant: 'website', meta: 'Deposit paid' },
      { label: '15:30 — Nguyen · Annual tune-up', sub: 'Recurring', tag: 'Scheduled', tagVariant: 'qual', meta: '' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Same-day emergency dispatch.' },
      { href: '/product/sales', title: 'Sales', desc: 'Quote templates for installs.' },
      { href: '/product/financial', title: 'Financial', desc: 'Invoice from the truck.' },
    ],
    ctaTitleEm: 'garage door',
    ctaDescription: 'Bring your call volume. We\u2019ll show you the fit.',
  },
  {
    slug: 'septic',
    name: 'Septic',
    icon: 'tank',
    navDesc: 'Pumping, inspections, install',
    category: 'Pumping · Inspection · Repair · Install',
    heroTitleMain: 'Tank history that outlasts the homeowner. Routes that',
    heroTitleEm: 'make sense on a map.',
    heroLede:
      'Septic is a property business more than a person business — tank size, last pump date, and inspection findings all belong to the land, not the customer. Groundwork tracks it that way, and routes pumping trucks by geography, not by callback order.',
    splitEyebrow: 'A property record that outlasts the sale',
    splitTitle: 'Tank size, pump history, and inspection findings — on the property.',
    splitLede:
      'When a house sells, the septic history should transfer with it. Groundwork ties every pump-out, inspection, and repair to the property record, so a new owner\u2019s first call already has full context.',
    splitItems: [
      { num: '→', title: 'Property-based tank records', body: 'Tank size, last pump date, drain field condition — on file.' },
      { num: '→', title: 'Pump-out reminders', body: 'Auto-flag properties due for their 3-year (or local code) pump-out.' },
      { num: '→', title: 'Geographic route optimization', body: 'Pumping trucks routed by proximity, not call order.' },
      { num: '→', title: 'Inspection & real-estate certifications', body: 'Time-sensitive inspection requests handled on their own track.' },
      { num: '→', title: 'Repair & install estimating', body: 'Drain field repairs and new system installs, quoted properly.' },
    ],
    mockTitle: 'Pump-Out Route — Septic',
    mockRows: [
      { label: 'Maple Hollow Rd · Routine pump-out', sub: 'Due · 3 yrs since last', tag: 'Due', tagVariant: 'qual', meta: 'Route stop 1' },
      { label: 'Fox Run Ln · Real estate inspection', sub: 'Time-sensitive · closing Fri', tag: 'Priority', tagVariant: 'rapport', meta: 'Route stop 2' },
      { label: 'Old Mill Dr · Pump-out + inspection', sub: 'Scheduled', tag: 'Scheduled', tagVariant: 'website', meta: 'Route stop 3' },
      { label: 'Chapman Rd · Drain field repair', sub: 'Follow-up from inspection', tag: 'Quoted', tagVariant: 'website', meta: '$4,200 estimate' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Geographic route optimization.' },
      { href: '/product/sales', title: 'Sales', desc: 'Repair & install estimating.' },
      { href: '/product/mobile', title: 'Mobile', desc: 'The tech-facing field app.' },
    ],
    ctaTitleEm: 'septic service',
    ctaDescription: 'Bring your route sheet. We\u2019ll show you the fit.',
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    icon: 'bug',
    navDesc: 'Recurring treatments, one-time jobs',
    category: 'Recurring treatment · One-time · Termite & wildlife',
    heroTitleMain: 'Recurring routes that run themselves. One-time jobs that',
    heroTitleEm: "don't get lost.",
    heroLede:
      'Pest control is mostly a subscription business with a one-time-job problem mixed in. Groundwork runs recurring quarterly and bi-monthly routes on autopilot, while keeping urgent one-time calls — termite, wildlife, bed bugs — moving on their own track.',
    splitEyebrow: 'Recurring revenue, actually recurring',
    splitTitle: 'Treatment plans that renew, routes that optimize.',
    splitLede:
      "Groundwork treats recurring pest treatments as first-class citizens — service agreements with cadence, treatment-area history, and route optimization so a tech's day makes geographic sense.",
    splitItems: [
      { num: '→', title: 'Recurring treatment agreements', body: 'Quarterly, bi-monthly, or monthly plans that auto-schedule.' },
      { num: '→', title: 'Treatment-area & chemical history', body: 'What was applied, where, and when — for compliance and follow-up.' },
      { num: '→', title: 'Route optimization for recurring stops', body: 'Techs run tight geographic loops instead of crisscrossing town.' },
      { num: '→', title: 'One-time job triage', body: 'Termite, wildlife, and bed bug calls dispatched with urgency.' },
      { num: '→', title: 'Renewal & cancellation tracking', body: 'See churn risk before the customer calls to cancel.' },
    ],
    mockTitle: "Today's Route — Pest Control",
    mockRows: [
      { label: 'Oakwood Dr · Quarterly treatment', sub: 'Recurring · Stop 1', tag: 'Scheduled', tagVariant: 'qual', meta: 'Perimeter + interior' },
      { label: 'Ridgeline Ct · Quarterly treatment', sub: 'Recurring · Stop 2', tag: 'Scheduled', tagVariant: 'qual', meta: '' },
      { label: 'Patel Residence · Termite inspection', sub: 'One-time · Priority', tag: 'Priority', tagVariant: 'rapport', meta: 'New lead' },
      { label: 'Chen Residence · Wildlife removal', sub: 'One-time', tag: 'Scheduled', tagVariant: 'website', meta: 'Raccoon in attic' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Route optimization for recurring stops.' },
      { href: '/product/financial', title: 'Financial', desc: 'Recurring billing on autopilot.' },
      { href: '/product/sales', title: 'Sales', desc: 'Convert one-time jobs to plans.' },
    ],
    ctaTitleEm: 'pest control',
    ctaDescription: 'Bring your route list. We\u2019ll show you the renewal math.',
  },
  {
    slug: 'irrigation',
    name: 'Irrigation',
    icon: 'sprinkler',
    navDesc: 'Startups, winterizations, repairs',
    category: 'Startup · Winterization · Repair · Install',
    heroTitleMain: 'Two seasonal rushes a year. One system that never',
    heroTitleEm: 'forgets a zone map.',
    heroLede:
      'Irrigation companies live between spring startups and fall winterizations, with repair calls in between. Groundwork keeps the zone map, backflow test dates, and controller settings on the property record — so every visit starts where the last one left off.',
    splitEyebrow: 'Two rushes a year, fully scheduled',
    splitTitle: 'Zone maps and backflow dates that live on the property.',
    splitLede:
      'Every irrigation system has a layout — zones, heads, controller, backflow device. Groundwork keeps that layout attached to the property so techs aren\u2019t re-discovering the system every visit.',
    splitItems: [
      { num: '→', title: 'Seasonal campaign scheduling', body: 'Spring startup and fall winterization batches, scheduled in bulk.' },
      { num: '→', title: 'Zone maps & controller notes', body: 'System layout on file — no re-discovery on repeat visits.' },
      { num: '→', title: 'Backflow testing & compliance', body: 'Auto-flag properties due for annual backflow certification.' },
      { num: '→', title: 'Repair dispatch mid-season', body: 'Broken heads and leaks routed alongside the recurring schedule.' },
      { num: '→', title: 'Install project pipeline', body: 'New system installs quoted, scheduled, and tracked to completion.' },
    ],
    mockTitle: 'Spring Startup Batch — Irrigation',
    mockRows: [
      { label: 'Maple Hollow Rd · System startup', sub: '8 zones · Backflow due', tag: 'Scheduled', tagVariant: 'qual', meta: 'Batch 1' },
      { label: 'Fox Run Ln · System startup + repair', sub: 'Head replacement flagged', tag: 'Scheduled', tagVariant: 'website', meta: 'Batch 1' },
      { label: 'Old Mill Dr · Backflow test', sub: 'Compliance · Due', tag: 'Due', tagVariant: 'qual', meta: '' },
      { label: 'Chapman Rd · New system install', sub: 'Project · Quoted', tag: 'Quoted', tagVariant: 'website', meta: '$6,400 estimate' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Seasonal batch scheduling.' },
      { href: '/product/sales', title: 'Sales', desc: 'Estimate templates for installs.' },
      { href: '/trades/landscaping', title: 'Landscaping', desc: 'Often bundled with irrigation.' },
    ],
    ctaTitleEm: 'irrigation',
    ctaDescription: 'Bring your zone maps. We\u2019ll show you the fit.',
  },
  {
    slug: 'painting',
    name: 'Painting',
    icon: 'paint-roller',
    navDesc: 'Estimates, crews, repeat customers',
    category: 'Interior · Exterior · Commercial · Repaint',
    heroTitleMain: 'Estimates that close faster. Crews that know the',
    heroTitleEm: 'color code.',
    heroLede:
      'Painting sells on the estimate and delivers on the crew. Groundwork gives estimators a fast, consistent quoting process and gives crews the color codes, prep notes, and photos from the walkthrough — so nothing gets lost between the sale and the job.',
    splitEyebrow: 'From walkthrough to final coat',
    splitTitle: 'The estimate becomes the job — automatically.',
    splitLede:
      'A painting estimate is really a scope document: rooms, surfaces, colors, prep work. Groundwork carries that scope straight into the job record so the crew shows up already knowing what the sales rep promised.',
    splitItems: [
      { num: '→', title: 'Room-by-room estimate builder', body: 'Surfaces, colors, and prep notes captured at the walkthrough.' },
      { num: '→', title: 'Color code & spec history', body: 'Every color match tied to the property for the next repaint.' },
      { num: '→', title: 'Crew scheduling by job size', body: 'Multi-day interior/exterior jobs staffed and sequenced properly.' },
      { num: '→', title: 'Photo-based before/after documentation', body: 'Every job becomes portfolio material and proof of work.' },
      { num: '→', title: 'Repeat & referral tracking', body: 'Know which past customers are due for a repaint.' },
    ],
    mockTitle: 'Job Board — Painting',
    mockRows: [
      { label: 'Chen Residence · Full interior repaint', sub: 'Crew of 3 · Day 2 of 4', tag: 'In progress', tagVariant: 'website', meta: 'Sherwin-Williams SW7008' },
      { label: 'Ridgeline Office · Commercial exterior', sub: 'Crew of 5 · Day 1 of 6', tag: 'In progress', tagVariant: 'website', meta: 'Weather window confirmed' },
      { label: 'Ozawa Residence · Estimate walkthrough', sub: 'Sales · Angela', tag: 'Quoted', tagVariant: 'qual', meta: 'Sent, awaiting signature' },
      { label: 'Patel Residence · Repeat repaint', sub: 'Referral · 4 yrs since last', tag: 'Scheduled', tagVariant: 'rapport', meta: 'Same color on file' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/sales', title: 'Sales', desc: 'Room-by-room estimate builder.' },
      { href: '/product/mobile', title: 'Mobile', desc: 'Before/after photo documentation.' },
      { href: '/product/operations', title: 'Operations', desc: 'Crew scheduling by job size.' },
    ],
    ctaTitleEm: 'painting',
    ctaDescription: 'Bring a real estimate. We\u2019ll show you the fit.',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    icon: 'plant',
    navDesc: 'Design-build, hardscape, maintenance',
    category: 'Landscape · Hardscape · Design-build · Maintenance',
    heroTitleMain: 'From design-build firms to maintenance',
    heroTitleEm: 'operations.',
    heroLede:
      'Design-build firms with 10-week projects. Maintenance operations with 200 recurring accounts. Companies that do both. Groundwork handles all of it — and configures to your specific service lines during onboarding.',
    splitEyebrow: 'Every property, every service',
    splitTitle: 'The service history that stays with the land.',
    splitLede:
      "Landscape is fundamentally property-based. Groundwork's property record carries decades of history — every service performed, every plant installed, every photo, every note about soil, drainage, dogs, and access. Sales knows what to pitch. Crews know what to expect.",
    splitItems: [
      { num: '→', title: 'Multi-stage sales pipeline', body: 'Built around discovery + budget qualification.' },
      { num: '→', title: 'Property records', body: 'Soil, drainage, plant history, hardscape, notes, photos.' },
      { num: '→', title: 'Recurring service scheduling', body: 'Maintenance contracts on autopilot.' },
      { num: '→', title: 'Crew dispatch', body: 'Route optimization for maintenance routes.' },
      { num: '→', title: 'Estimate templates', body: 'For hardscape, softscape, and design–build.' },
    ],
    mockTitle: 'Chapman Rd · Property',
    mockRows: [
      { label: 'Pool Coping Replacement', tag: 'Budget Qualified', tagVariant: 'qual', meta: '$58,200 · Stage 4/7 · Next FU Jul 8' },
      { label: 'Bi-weekly Maintenance', tag: 'Active', tagVariant: 'rapport', meta: '$340/visit · 24 visits/yr · Crew B' },
      { label: 'Fall Cleanup 2025', tag: 'Complete', tagVariant: 'website', meta: '$1,850 · Paid · Photos attached' },
      { label: 'Backyard Patio Install', tag: 'Complete', tagVariant: 'website', meta: '$24,000 · 2023 · 32 photos on file' },
    ],
    related: [
      { href: '/trades', title: 'All trades', desc: 'See other trades we serve.' },
      { href: '/product/operations', title: 'Operations', desc: 'Scheduling & dispatch for landscape.' },
      { href: '/product/sales', title: 'Sales', desc: 'Pipeline for design-build.' },
      { href: '/customers', title: 'Customers', desc: 'Landscape teams on Groundwork.' },
    ],
    ctaTitleEm: 'landscape',
    ctaDescription: 'Bring your service lines. We\u2019ll show you the fit.',
  },
]

export function getTradeBySlug(slug: string): TradeData | undefined {
  return TRADES.find((t) => t.slug === slug)
}
