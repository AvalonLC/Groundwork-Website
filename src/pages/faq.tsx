import { Layout } from '../components/Layout'
import { CTABand, FAQItem } from '../components/Blocks'

export function FAQPage() {
  return (
    <Layout
      title="FAQ — Groundwork CRM"
      description="Common questions from operators evaluating Groundwork."
      path="/faq"
    >
      <section class="section subpage-hero">
        <div class="wrap">
          <span class="eyebrow">FAQ</span>
          <h1 style="margin-top: 20px;">
            Questions we hear from&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">operators.</em>
          </h1>
          <p class="lede">
            The most common questions from teams evaluating Groundwork. Have one that isn't here? Ask us in the demo.
          </p>
        </div>
      </section>

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div class="faq">
            <FAQItem question="Is Groundwork built for a specific trade?" open>
              Groundwork is built for service businesses — landscape, home services, HVAC, plumbing, restoration,
              exteriors, and multi-service field operations. The stages, templates, and workflows are configurable to
              your service lines. It is not a general-purpose CRM re-marketed to contractors.
            </FAQItem>
            <FAQItem question="How does Groundwork handle multiple roles across office, sales, and field?">
              Roles & permissions are configured at the screen level with an access matrix. Every role — Owner,
              Office Manager, Sales Rep, Estimator, Field, and View-Only — starts from a sensible company default and
              can be customized per person. Field crews get a distraction-free Field Mode designed for phones.
            </FAQItem>
            <FAQItem question="Can we import our existing clients, properties, and open deals?">
              Yes. Our implementation team handles data migration from your current CRM, spreadsheets, or scheduling
              tools. We map your existing pipeline into Groundwork's stages, clean the data, and hand you a working
              system with your history intact.
            </FAQItem>
            <FAQItem question="Does it integrate with QuickBooks and Google?">
              Yes — QuickBooks Online, Google Calendar, Gmail, Stripe for payments, Twilio for SMS, and more. We also
              expose an open API for custom integrations.
            </FAQItem>
            <FAQItem question="What about the field crew? Do laborers need to learn a CRM?">
              No. Laborers and foremen get a purpose-built mobile view (Field Mode) that only shows today's assigned
              work, time tracking, and photo / sign-off capture. There's no pipeline, no pricing, no admin — just the
              job. Training a crew takes 15 minutes.
            </FAQItem>
            <FAQItem question="How long does implementation take?">
              Most teams go live in 2–3 weeks. That includes discovery, configuration, data migration, role-based
              training, and the first 30 days of dedicated support. We don't do 90-day rollouts.
            </FAQItem>
            <FAQItem question="How is Groundwork priced?">
              Two layers. A <strong>plan</strong> — Core, Growth, Pro, or Enterprise — sets which workspaces your
              company can use (reporting, automation, client portal). Within that plan, <strong>seats</strong> are
              priced by role, so a Field or View-Only login costs a fraction of a full Sales or Admin seat. You're
              never paying full price to give crews access, and you're never buying company-wide features you don't
              need yet. See{' '}
              <a href="/pricing" style="color: var(--gw-forest-700); text-decoration: underline;">
                pricing
              </a>
              .
            </FAQItem>
            <FAQItem question="Can I try Groundwork before committing?">
              Every prospect gets a 30-minute personalized walkthrough followed by a sandboxed pilot workspace loaded
              with your data. We don't do generic free trials — the value shows up when it's your business inside the
              system.
            </FAQItem>
            <FAQItem question="Where does the software live?">
              The public brand lives at groundwork-crm.info. The product workspace lives at groundwork-crm.com. When
              you log in from the marketing site, you're handed off to the live product.
            </FAQItem>
            <FAQItem question="Do you have a mobile app?">
              Yes. iOS and Android apps for the field team. The web workspace also works on mobile browsers if you
              prefer. See{' '}
              <a href="/product/mobile" style="color: var(--gw-forest-700); text-decoration: underline;">
                Mobile & Field Mode
              </a>
              .
            </FAQItem>
            <FAQItem question="How secure is Groundwork?">
              SOC 2 Type II, encryption at rest and in transit, SSO/MFA, screen-level permissions, immutable audit
              log. See{' '}
              <a href="/security" style="color: var(--gw-forest-700); text-decoration: underline;">
                Security
              </a>
              .
            </FAQItem>
            <FAQItem question="What if we outgrow Groundwork?">
              You own your data. Full export is available at any time — clients, opportunities, properties, invoices,
              everything. No lock-in on data. We'd rather earn your renewal than trap you.
            </FAQItem>
          </div>
        </div>
      </section>

      <CTABand
        title={<>Still have&nbsp;questions?</>}
        description="Fastest path to answers is a 30-minute demo call with a specialist who knows your trade."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
