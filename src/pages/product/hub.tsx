import { Layout } from '../../components/Layout'
import { SubpageHero, CTABand, BentoCard } from '../../components/Blocks'
import { Icon } from '../../components/Icon'

export function ProductHubPage() {
  return (
    <Layout
      title="Product — Groundwork CRM"
      description="The full Groundwork platform: My Day, Sales, Financial, Operations, Admin, and Field Mode."
      path="/product"
    >
      <SubpageHero
        eyebrow="The product"
        title={<>One connected system for the office, the sales floor, and the&nbsp;<em style="font-style: italic; color: var(--gw-forest-700);">field.</em></>}
        lede="Groundwork brings pipeline, follow-ups, scheduling, dispatch, invoices, and daily role-based dashboards into a single workspace. Every person on your team sees the same source of truth — filtered to what they actually need to do today."
      />

      <section class="section" style="padding-top: 40px;">
        <div class="wrap">
          <div class="bento">
            <BentoCard href="/product/my-day" size="wide" dark icon="M" title="My Day" desc="Every user's daily start-of-day view — open, overdue, upcoming, and a checklist tailored to their role." linkLabel="Explore My Day →" />
            <BentoCard href="/product/sales" icon="S" title="Sales" desc="Pipeline, leads, clients, properties, estimates, and communications." linkLabel="Sales module →" />
            <BentoCard href="/product/financial" icon="F" title="Financial" desc="Invoices, payments, deposits, statements, activity ledger." linkLabel="Financial module →" />
            <BentoCard href="/product/operations" icon="O" title="Operations" desc="Schedule, dispatch, work orders, recurring services, assets, time." linkLabel="Operations module →" />
            <BentoCard href="/product/admin" icon="A" title="Admin & Permissions" desc="Roles, workflow, integrations, audit, access modes, system config." linkLabel="Admin module →" />
            <BentoCard href="/product/mobile" icon={<Icon name="smartphone" size={18} />} title="Mobile & Field Mode" desc="Rugged mobile view for foremen and crews." linkLabel="Field Mode →" />
            <BentoCard href="/product/platform" icon={<Icon name="settings" size={18} />} title="Platform architecture" desc="How the modules connect. Data model. Integrations." linkLabel="See architecture →" />
            <BentoCard href="/features" icon="≡" title="All features" desc="The full feature list, module by module." linkLabel="Feature index →" />
          </div>
        </div>
      </section>

      <CTABand
        title={<>See <em>your business</em> running on Groundwork in 30 minutes.</>}
        description="Walk through the platform with a specialist who knows your trade. No slides. Your real workflow."
        secondaryHref="/start"
        secondaryLabel="Start here"
      />
    </Layout>
  )
}
