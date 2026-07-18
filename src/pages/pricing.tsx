import { Layout } from '../components/Layout'
import { CTABand, FAQItem } from '../components/Blocks'
import { Icon } from '../components/Icon'
import { PricingCalculator } from '../components/PricingCalculator'

export function PricingPage() {
  const plans = [
    {
      name: 'Core',
      tagline: 'One crew, one office. Everything you need to stop running the business out of a spreadsheet.',
      startingAt: '$49',
      seats: [
        { label: 'Owner / Admin', price: 'Free, unlimited', free: true },
        { label: 'Rep / Estimator', price: '$49/mo', primary: true },
        { label: 'Field', price: '$25/mo' },
        { label: 'Office Manager', price: '$89/mo' },
        { label: 'View-only', price: '1 free, then $10/mo' },
      ],
      minSeats: '3 seat minimum',
      aiAllowance: '100 AI actions/mo',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Request pricing',
      features: [
        'Pipeline, Leads, Clients & Properties',
        'Estimates & proposals',
        'Communications & templates',
        'Schedule Board & Dispatch',
        'Work Orders & Time Tracker',
        'Invoices & Payments',
        'Field Mode (mobile)',
        'AI drafting tools — 100 included monthly actions',
      ],
    },
    {
      name: 'Growth',
      tagline: 'Multi-crew operations that need real reporting, not gut feel.',
      startingAt: '$65',
      seats: [
        { label: 'Owner / Admin', price: 'Free, unlimited', free: true },
        { label: 'Rep / Estimator', price: '$65/mo', primary: true },
        { label: 'Field', price: '$30/mo' },
        { label: 'Office Manager', price: '$105/mo' },
        { label: 'View-only', price: '3 free, then $10/mo' },
      ],
      minSeats: '5 seat minimum',
      aiAllowance: '250 AI actions/mo',
      dark: true,
      badge: 'Most popular',
      cta: 'Request pricing',
      features: [
        'Everything in Core',
        'Business Pulse, Financial Snapshot & Operations Snapshot',
        'Recurring services & asset / maintenance tracking',
        'Deposits & statements',
        'Approval queue',
        'Academy — role-based training',
        'Advanced AI drafting tools — 250 included monthly actions',
      ],
    },
    {
      name: 'Pro',
      tagline: 'Established operators who need automation, audit trails, and a client-facing portal.',
      startingAt: '$85',
      seats: [
        { label: 'Owner / Admin', price: 'Free, unlimited', free: true },
        { label: 'Rep / Estimator', price: '$85/mo', primary: true },
        { label: 'Field', price: '$35/mo' },
        { label: 'Office Manager', price: '$135/mo' },
        { label: 'View-only', price: '5 free, then $10/mo' },
      ],
      minSeats: '8 seat minimum',
      aiAllowance: '500 AI actions/mo',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Request pricing',
      features: [
        'Everything in Growth',
        'Automation Center & workflow builder',
        'Audit log',
        'Client portal',
        'System config & custom templates',
        'SSO / SAML',
        'API access',
        'Dedicated success manager',
        'Advanced AI drafting tools — 500 included monthly actions',
        'Bring your own OpenAI API key available',
      ],
    },
    {
      name: 'Enterprise',
      tagline: 'Multi-location groups and franchises that need roll-up reporting and a real contract.',
      startingAt: 'Custom',
      seats: [] as { label: string; price: string; primary?: boolean; free?: boolean }[],
      minSeats: 'Built around your locations',
      aiAllowance: 'Custom AI allowance',
      dark: false,
      badge: undefined as string | undefined,
      cta: 'Talk to sales',
      features: [
        'Everything in Pro',
        'Multi-location roll-up reporting',
        'Volume seat pricing across locations',
        'Custom contract & SLA',
        'Dedicated implementation architect',
        'Custom integrations',
        'Custom AI allowances, billing controls & model configuration',
      ],
    },
  ]

  // Company-wide AI packages, shown in the dedicated Groundwork AI section.
  // Publicly capped at Max (5,000 actions) — heavier usage is scoped as a
  // custom allowance via sales rather than published as a 5th equal-weight
  // tier. Mirrors the calculator's AI_PACKAGES in PricingCalculator.tsx.
  const aiPackages = [
    {
      name: 'Included AI',
      price: '$0',
      priceSuffix: '/mo',
      actions: "Your plan's included allowance",
      features: ['No setup, on by default', 'Shared across the whole company', 'Live usage tracking'],
      cta: 'Included on your plan',
      popular: false,
    },
    {
      name: 'AI Essentials',
      price: '$12',
      priceSuffix: '/mo',
      actions: '500 actions/mo',
      features: ['Stacks on top of your plan allowance', 'Good for one or two busy estimators', 'Cancel or downgrade anytime'],
      cta: 'Add AI Essentials',
      popular: false,
    },
    {
      name: 'AI Plus',
      price: '$29',
      priceSuffix: '/mo',
      actions: '1,500 actions/mo',
      features: ['Best for a full estimating team', 'Covers most Growth-plan companies', 'Live usage bar with heads-up at 80%'],
      cta: 'Add AI Plus',
      popular: true,
    },
    {
      name: 'AI Max',
      price: '$59',
      priceSuffix: '/mo',
      actions: '5,000 actions/mo',
      features: ['Our highest published tier', 'Built for multi-crew, high-volume shops', 'Priority support on AI issues'],
      cta: 'Add AI Max',
      popular: false,
    },
  ]

  return (
    <Layout
      title="Pricing — Groundwork CRM"
      description="Plans control what your company can do. Seats control who can do it. Role-based per-seat pricing inside every plan."
      path="/pricing"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">Pricing</span>
          <h1 style="margin-top: 20px;">Plans for what your company&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">can do.</em> Seats for who does&nbsp;it.</h1>
          <p class="lede">
            Groundwork is priced two ways at once, on purpose. A <strong>plan</strong> sets which workspaces your whole
            company can use — reporting, automation, the client portal. A <strong>seat</strong> is priced by role, so a
            foreman's login doesn't cost what an estimator's does. You don't pay full price to give your crew access,
            and you don't buy company-wide features you don't need yet.
          </p>
          <div class="pricing-trust-row">
            <span>
              <Icon name="check-circle" size={15} /> No setup fee, ever
            </span>
            <span>
              <Icon name="check-circle" size={15} /> Unlimited free Owner/Admin seats
            </span>
            <span>
              <Icon name="check-circle" size={15} /> Cancel anytime, no lock-in contract
            </span>
          </div>
          <div class="pricing-ai-strip">
            <span class="pricing-ai-strip-icon">
              <Icon name="bolt" size={16} />
            </span>
            <div class="pricing-ai-strip-copy">
              <strong>Groundwork AI is available on every plan.</strong> Each subscription includes a monthly AI
              allowance, shared across your whole company — not charged per employee. Need more? Add a company-wide
              package anytime. No automatic overages, no hidden token charges.
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 24px;">
        <div class="wrap">
          <div class="pricing-starter-banner" id="starter-plan">
            <div class="pricing-starter-icon">
              <Icon name="user" size={22} />
            </div>
            <div class="pricing-starter-body">
              <div class="pricing-starter-eyebrow">Just starting out?</div>
              <div class="pricing-starter-title">Starter — built for solo owner-operators.</div>
              <p class="pricing-starter-desc">
                No crew yet? Starter is one seat — you — running estimates, invoicing, and your pipeline from your
                phone or laptop. No 3-seat minimum, no team features you don't need. The day you hire your first
                crew member, upgrade to Core on the same account — your data comes with you, nothing to migrate.
              </p>
              <ul class="pricing-starter-features">
                <li>
                  <Icon name="check" size={13} /> Pipeline, Leads, Clients &amp; Properties
                </li>
                <li>
                  <Icon name="check" size={13} /> Estimates &amp; proposals
                </li>
                <li>
                  <Icon name="check" size={13} /> Invoices &amp; Payments
                </li>
                <li>
                  <Icon name="check" size={13} /> Field Mode (mobile)
                </li>
                <li>
                  <Icon name="check" size={13} /> AI drafting tools — 50 included monthly actions
                </li>
              </ul>
            </div>
            <div class="pricing-starter-price-block">
              <div class="pricing-starter-price">
                <span class="pricing-starter-price-num">$29</span>
                <span class="pricing-starter-price-suffix">/mo</span>
              </div>
              <div class="pricing-starter-price-note">1 seat · no minimum</div>
              <div class="pricing-starter-ai-note">Includes 50 AI actions/mo</div>
              <a href="/signup" class="pricing-starter-cta">
                Start solo <span class="arrow">→</span>
              </a>
            </div>
          </div>

          <div class="pricing-grid">
            {plans.map((p) => (
              <div class={`pricing-card${p.dark ? ' dark' : ''}`}>
                {p.badge ? <div class="pricing-badge">{p.badge}</div> : <div class="pricing-badge-spacer"></div>}
                <div class="pricing-name">{p.name}</div>
                <div class="pricing-tagline">{p.tagline}</div>

                <div class="pricing-startingat">
                  {p.startingAt === 'Custom' ? (
                    <span class="pricing-startingat-num">Custom</span>
                  ) : (
                    <>
                      <span class="pricing-startingat-label">Starting at</span>
                      <span class="pricing-startingat-num">{p.startingAt}</span>
                      <span class="pricing-startingat-suffix">/seat/mo</span>
                    </>
                  )}
                </div>
                <div class="pricing-minseats">{p.minSeats}</div>
                <div class="pricing-ai-allowance">
                  <Icon name="bolt" size={12} /> {p.aiAllowance}
                </div>

                {p.seats.length > 0 && (
                  <div class="pricing-seat-table">
                    <div class="pricing-seat-table-head">Seat pricing by role</div>
                    {p.seats.map((s) => (
                      <div class={`pricing-seat-row${s.primary ? ' primary' : ''}${s.free ? ' free' : ''}`}>
                        <span>{s.label}</span>
                        <span>{s.price}</span>
                      </div>
                    ))}
                    <div class="pricing-seat-footnote">
                      Field seats 6–10 are 10% off, seats 11+ are 15% off — applied automatically, no negotiating.
                    </div>
                  </div>
                )}

                <ul class="pricing-features">
                  {p.features.map((f) => (
                    <li>
                      <span class="pricing-feature-check">
                        <Icon name="check" size={14} />
                      </span>{' '}
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/demo" class={`pricing-cta${p.badge ? ' primary' : ''}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <PricingCalculator />

          <div class="ai-section" id="ai-packages">
            <div class="ai-section-head">
              <span class="eyebrow">Groundwork AI</span>
              <h3>Built-in AI, with a bill you can predict.</h3>
              <p>
                Groundwork AI drafts proposals, quote descriptions, scopes of work, and follow-up emails — the
                writing that eats an estimator's afternoon. It's included on every plan as a shared, company-wide
                allowance, not a per-seat charge. Need more headroom during a busy season? Add a package. There's no
                metered token bill and no automatic overage — when you hit your limit, generation simply pauses until
                you upgrade, connect your own API key, or the month resets.
              </p>
              <div class="ai-trust-strip">
                <span>
                  <Icon name="check-circle" size={14} /> Priced per company, not per user
                </span>
                <span>
                  <Icon name="check-circle" size={14} /> No automatic overage charges
                </span>
                <span>
                  <Icon name="check-circle" size={14} /> Live usage tracking, always visible
                </span>
                <span>
                  <Icon name="check-circle" size={14} /> Change packages anytime
                </span>
              </div>
            </div>

            <div class="ai-package-grid">
              {aiPackages.map((pkg) => (
                <div class={`ai-package-card${pkg.popular ? ' popular' : ''}`}>
                  {pkg.popular ? <div class="ai-package-badge">Most popular</div> : <div class="ai-package-badge-spacer"></div>}
                  <div class="ai-package-name">{pkg.name}</div>
                  <div class="ai-package-price">
                    <span class="ai-package-price-num">{pkg.price}</span>
                    {pkg.priceSuffix && <span class="ai-package-price-suffix">{pkg.priceSuffix}</span>}
                  </div>
                  <div class="ai-package-actions">{pkg.actions}</div>
                  <ul class="ai-package-features">
                    {pkg.features.map((f) => (
                      <li>
                        <Icon name="check" size={13} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/demo" class={`ai-package-cta${pkg.popular ? ' primary' : ''}`}>
                    {pkg.cta}
                  </a>
                </div>
              ))}
            </div>

            <div class="ai-package-cap-note">
              Need more than 5,000 actions a month? <a href="/demo">Ask about a custom allowance</a> — we scope those
              case by case rather than publish a fifth tier that most teams will never touch.
            </div>

            <div class="ai-action-def" id="what-is-an-ai-action">
              <div class="ai-action-def-head">
                <Icon name="bolt" size={16} />
                <h4>What counts as an AI action?</h4>
              </div>
              <div class="ai-action-def-grid">
                <div class="ai-action-def-col ai-action-def-yes">
                  <div class="ai-action-def-col-label">Counts as 1 action</div>
                  <p>
                    A successful AI generation or substantial rewrite of a proposal, a quote description, a scope of
                    work, or a follow-up email.
                  </p>
                </div>
                <div class="ai-action-def-col ai-action-def-no">
                  <div class="ai-action-def-col-label">Counts as 0 actions</div>
                  <p>A failed request, a system error, or viewing a draft you already generated.</p>
                </div>
              </div>
            </div>

            <div class="ai-usage-bar-block">
              <div class="ai-usage-bar-headline">No hidden token charges. No surprise overages.</div>
              <p class="ai-usage-bar-copy">
                Your AI usage bar fills as your company uses its monthly allowance — visible to every admin, in real
                time. There's no metered per-token bill running in the background.
              </p>
              <div class="ai-usage-bar-track">
                <div class="ai-usage-bar-fill" style="width: 100%;">
                  <span class="ai-usage-bar-seg normal" style="width: 79%;"></span>
                  <span class="ai-usage-bar-seg warning" style="width: 20%;"></span>
                  <span class="ai-usage-bar-seg blocked" style="width: 1%;"></span>
                </div>
              </div>
              <div class="ai-usage-bar-legend">
                <span class="ai-usage-bar-legend-item">
                  <span class="ai-usage-bar-dot normal"></span> 0–79% · normal
                </span>
                <span class="ai-usage-bar-legend-item">
                  <span class="ai-usage-bar-dot warning"></span> 80–99% · heads-up
                </span>
                <span class="ai-usage-bar-legend-item">
                  <span class="ai-usage-bar-dot blocked"></span> 100% · paused until upgrade, BYOK, or reset
                </span>
              </div>
            </div>

            <div class="ai-byok-block">
              <div class="ai-byok-copy">
                <div class="ai-byok-eyebrow">Advanced option</div>
                <h5>Already have an OpenAI API account?</h5>
                <p>
                  Connect your own OpenAI API key and Groundwork's AI allowance cap no longer applies — your usage
                  bills directly to your OpenAI account instead. Your CRM subscription fee still applies; this only
                  replaces the Groundwork-metered AI allowance. Available on every paid plan, not just the higher
                  tiers.
                </p>
              </div>
              <a href="/demo" class="ai-byok-cta">
                Learn about connecting your API key <span class="arrow">→</span>
              </a>
            </div>
          </div>

          <div class="pricing-explainer">
            <div class="pricing-explainer-title">Why plans, seats, and AI usage?</div>
            <p class="pricing-explainer-intro">
              Most CRMs make you pick one axis to price by. Groundwork prices on three, on purpose — each tracking a
              different thing your company actually varies on.
            </p>
            <div class="pricing-explainer-cols">
              <div class="pricing-explainer-col">
                <div class="pricing-explainer-col-label">Plans</div>
                <p>
                  Your <strong>plan</strong> (Core, Growth, Pro, Enterprise) sets which workspaces your whole company
                  can use — reporting, automation, the client portal. It's what your business can do, not who's
                  logged in.
                </p>
              </div>
              <div class="pricing-explainer-col">
                <div class="pricing-explainer-col-label">Seats</div>
                <p>
                  Your <strong>seats</strong> are priced by what each person actually needs to touch — a laborer
                  clocking in from the truck costs a fraction of an estimator building proposals. Add crew without
                  upgrading your plan; upgrade your plan without paying more for seats you already have.
                </p>
              </div>
              <div class="pricing-explainer-col">
                <div class="pricing-explainer-col-label">AI usage</div>
                <p>
                  Your <strong>AI usage</strong> is shared across the whole company, not billed per seat — because how
                  much your team drafts with AI has nothing to do with headcount. Every plan includes an allowance;
                  heavier users add a package instead of paying per employee.
                </p>
              </div>
            </div>
          </div>

          <div class="pricing-compare">
            <div class="pricing-compare-head">
              <span class="eyebrow">How this stacks up</span>
              <h3>Same team size, side by side with Jobber.</h3>
              <p>
                Jobber's plans are priced by user count, capped at a ceiling (5 users, 10 users, 15 users), with
                extra users at a flat $29/mo add-on — and no published price at all once you pass 15. Groundwork
                prices every seat by role instead of charging one flat rate per login — here's the same headcount on
                both, at Jobber's published rates, all the way up to where Jobber stops publishing a rate.
              </p>
            </div>
            <div class="compare-table compare-table-jobber">
              <div class="compare-row compare-head-row">
                <span>Team</span>
                <span>Jobber</span>
                <span>Groundwork</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 4 field (5 users)</span>
                <span>Connect — $119–169/mo</span>
                <span class="compare-gw">Core — $149/mo</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 9 field (10 users)</span>
                <span>Grow — $199–349/mo</span>
                <span class="compare-gw">Growth — $323/mo</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 14 field (15 users)</span>
                <span>Plus — $449–599/mo</span>
                <span class="compare-gw">Pro — $536.50/mo</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 24 field (25 users)</span>
                <span>Past 15 users — contact sales, no published rate</span>
                <span class="compare-gw">Pro — $834/mo</span>
              </div>
            </div>
            <p class="compare-footnote">
              Jobber's monthly-billed rate shown above; their annual-prepay rate runs lower. Groundwork totals include
              our seat-based field volume discount (6–10 seats at −10%, 11+ at −15%) already applied — no negotiating
              required to get it. Past a Jobber plan's user cap, additional users are a flat $29/mo each regardless of
              role, and past 15 users Jobber requires a sales call with no published price at all. Groundwork's rate
              stays fully transparent and self-serve at any headcount — the seat calculator above computes it
              instantly, and teams that outgrow a per-seat plan entirely can move to Enterprise for multi-location
              roll-up pricing.
            </p>
            <p class="compare-footnote compare-footnote-ai">
              <strong>Note on AI:</strong> the totals above reflect CRM plans and seats only — Groundwork AI is
              priced separately, at the company level, and isn't folded into this comparison. Every plan already
              includes a monthly AI allowance at no extra charge; optional higher-volume AI packages are a separate
              line item, never a hidden cost baked into the number above.
            </p>
          </div>

          <div class="pricing-compare">
            <div class="pricing-compare-head">
              <span class="eyebrow">How this stacks up</span>
              <h3>Same team size, side by side with Housecall Pro.</h3>
              <p>
                Housecall Pro doesn't publish a plain pricing page either — its site routes you through a quote quiz.
                The figures below are our best-effort reading of its publicly reported tiers (Basic, Essentials, MAX),
                cross-checked against third-party review sites, not a number we pulled from a live rate card — treat
                it as directionally accurate rather than exact.
              </p>
            </div>
            <div class="compare-table compare-table-hcp">
              <div class="compare-row compare-head-row">
                <span>Team</span>
                <span>Housecall Pro</span>
                <span>Groundwork</span>
              </div>
              <div class="compare-row">
                <span>1 owner-operator (1 user)</span>
                <span>Basic — ~$59/mo</span>
                <span class="compare-gw">Starter — $29/mo</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 4 field (5 users)</span>
                <span>Essentials — ~$149/mo</span>
                <span class="compare-gw">Core — $149/mo</span>
              </div>
              <div class="compare-row">
                <span>1 owner/estimator + 7 field (8 users)</span>
                <span>MAX — ~$299–329/mo</span>
                <span class="compare-gw">Growth — $269/mo</span>
              </div>
            </div>
            <p class="compare-footnote">
              Housecall Pro's own pricing page is gated behind a sales quiz, so the numbers above come from published
              third-party reporting (review sites, pricing aggregators) rather than a direct rate card — we're
              flagging that lower confidence rather than presenting it as exact. Either way, the pattern holds:
              Groundwork's rate is computed instantly on this page and doesn't require talking to anyone to find out
              what your team would pay.
            </p>
          </div>

          <div class="pricing-compare pricing-compare-opaque">
            <div class="pricing-compare-head">
              <span class="eyebrow">The rest of the field</span>
              <h3>JobNimbus, ServiceTitan, and Buildertrend don't publish pricing at all.</h3>
              <p>
                We checked directly — all three explicitly keep pricing off their websites and route every visitor to
                a sales call or a "request a quote" form. Third-party estimates for these exist, but they vary
                wildly enough between sources (roughly 2–3x apart on the same product) that publishing a specific
                number here would be guessing, not reporting. That gap is itself the point:
              </p>
            </div>
            <ul class="compare-opaque-list">
              <li>
                <strong>JobNimbus</strong> — publishes named tiers (Essentials, Pro, Premium, Enterprise) but no
                dollar figures; pricing is by request only.
              </li>
              <li>
                <strong>ServiceTitan</strong> — no published pricing anywhere on its site; every plan requires a
                sales conversation, typically quoted per-technician.
              </li>
              <li>
                <strong>Buildertrend</strong> — no self-serve pricing; the entire site funnels to "get your custom
                quote," no ranges given.
              </li>
            </ul>
            <p class="compare-footnote">
              Groundwork is the outlier here: role-based seat pricing, published in full on this page, with a
              calculator below that gives you an exact number for your team in seconds — no call required to find
              out what you'd pay.
            </p>
          </div>

          <div class="pricing-faq">
            <div class="pricing-faq-head">Pricing questions</div>
            <div class="faq">
              <FAQItem question="Can I mix seat types on the same plan?">
                Yes — every plan supports any combination of Rep/Estimator, Field, Office Manager, and View-only
                seats. Most teams run a small number of Rep seats alongside a larger pool of Field seats for the crew.
              </FAQItem>
              <FAQItem question="What's a View-only seat, and why is it separate from Field?">
                View-only is read access with no editing — a subcontractor checking the schedule, an investor or
                accountant who just needs visibility, a client's project manager. It doesn't need Field pricing
                because it can't touch a job, log time, or update a status. Every plan includes a few free (1 on
                Core, 3 on Growth, 5 on Pro); additional view-only seats are $10/mo flat, no matter which plan you're
                on.
              </FAQItem>
              <FAQItem question="How does the field-seat volume discount work?">
                Automatically, on every plan — no need to ask for it. Your first 5 field seats are billed at the
                standard rate, seats 6 through 10 are 10% off, and seat 11 onward is 15% off. It's graduated like a
                tax bracket, so adding one more field seat never raises what your existing seats cost — it just
                keeps the per-seat rate falling as your crew grows.
              </FAQItem>
              <FAQItem question="What happens if my crew size changes mid-month?">
                Add or remove seats anytime — you're billed for what you actually have active, prorated to the day.
                There's no re-signing a contract to add a laborer for a busy season.
              </FAQItem>
              <FAQItem question="Is there a contract or lock-in?">
                No lock-in contract and no cancellation fee. Plans are billed monthly and you can cancel anytime.
                Annual billing is available at a discount if you'd prefer to lock in a rate.
              </FAQItem>
              <FAQItem question="Do Owner and Admin seats really cost nothing?">
                Correct — Owner/Admin seats are free and unlimited on every plan, including Core. You only pay for
                seats that do estimating, field, office-manager, or view-only work past the included free view-only
                seats.
              </FAQItem>
              <FAQItem question="I'm a solo operator with no employees yet — what do I sign up for?">
                Starter. It's one seat — you — for $29/mo with no minimum, built for owner-operators doing their own
                estimating, invoicing, and field work. Skip Core's 3-seat minimum entirely. The moment you hire your
                first crew member or estimator, upgrade to Core from inside your account — same data, no re-setup.
              </FAQItem>
              <FAQItem question="Is Groundwork AI included?" id="faq-ai-included">
                Yes — every plan includes a monthly AI allowance at no extra charge: 50 actions/mo on Starter, 100 on
                Core, 250 on Growth, 500 on Pro, and a custom allowance on Enterprise. If you need more than your
                plan includes, add an AI package or connect your own OpenAI API key — you're never required to pay
                more just to keep using AI.
              </FAQItem>
              <FAQItem question="Is AI charged per employee? Are AI packages priced per user?">
                No. Groundwork AI is priced per company, not per seat. Your AI allowance and any package you add are
                shared across your whole team — adding a crew member doesn't add an AI cost, and your AI cost
                doesn't change based on how many seats you have.
              </FAQItem>
              <FAQItem question="What counts as an AI action?">
                A successful AI generation or substantial rewrite of a proposal, a quote description, a scope of
                work, or a follow-up email counts as 1 action. A failed request, a system error, or viewing a draft
                you already generated counts as 0 actions.
              </FAQItem>
              <FAQItem question="What happens when we reach our AI allowance?">
                New AI generations pause until you upgrade your AI package, connect your own API key (BYOK), or your
                monthly allowance resets. Nothing you've already created is affected, and there's no automatic
                overage charge — you decide how to proceed.
              </FAQItem>
              <FAQItem question="Do unused AI actions roll over?">
                No. Your AI allowance resets each month and unused actions don't carry over. Packages are sized so
                most teams have comfortable headroom without needing to bank a surplus.
              </FAQItem>
              <FAQItem question="Can I change AI packages?">
                Yes, anytime. Upgrades take effect immediately, so you get the new allowance right away. Downgrades
                take effect at your next renewal, so you never lose access to actions you've already paid for that
                month.
              </FAQItem>
              <FAQItem question="Can we use our own OpenAI API key?">
                Yes — on every paid plan. Connecting your own key (BYOK) removes Groundwork's AI allowance cap
                entirely; your AI usage bills directly to your OpenAI account instead. Your CRM subscription fee
                still applies — BYOK replaces the metered AI allowance, not the plan itself.
              </FAQItem>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 40px; background: var(--gw-cream-100); border: 1px solid var(--gw-line); border-radius: var(--r-lg); display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center;">
            <div>
              <div style="font-family: var(--font-serif); font-size: 30px; font-weight: 500; margin-bottom: 12px;">
                Implementation is included. On every plan.
              </div>
              <p style="color: var(--gw-ink-500); font-size: 15px; margin: 0;">
                Every workspace — Core through Enterprise — gets a dedicated implementation lead for the first 30
                days: data migration, configuration, role-based training, and go-live support. No onboarding fee,
                ever. No 90-day rollout.
              </p>
            </div>
            <a href="/demo" class="btn btn-primary" style="justify-content: center;">
              Book a demo <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <CTABand
        title={<>Get pricing tailored to your team&nbsp;size.</>}
        description="Send us your team makeup — we'll build a real quote in the demo call."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
