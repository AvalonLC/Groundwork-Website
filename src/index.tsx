import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { ProductHubPage } from './pages/product/hub'
import { MyDayPage } from './pages/product/my-day'
import { SalesPage } from './pages/product/sales'
import { FinancialPage } from './pages/product/financial'
import { OperationsPage } from './pages/product/operations'
import { AdminPage } from './pages/product/admin'
import { MobilePage } from './pages/product/mobile'
import { PlatformPage } from './pages/product/platform'
import { FeaturesPage } from './pages/features'
import { TradesHubPage } from './pages/trades/hub'
import { TradePage } from './components/TradePage'
import { getTradeBySlug } from './data/trades'
import { MultiCrewOpsPage } from './pages/multi-crew-ops'
import { RolesHubPage } from './pages/roles/hub'
import { OwnersPage } from './pages/roles/owners'
import { OfficeManagersPage } from './pages/roles/office-managers'
import { SalesRepsPage } from './pages/roles/sales-reps'
import { ForemenPage } from './pages/roles/foremen'
import { LaborersPage } from './pages/roles/laborers'
import { PricingPage } from './pages/pricing'
import { CustomersPage } from './pages/customers'
import { CaseStudiesPage } from './pages/case-studies'
import { ResourcesPage } from './pages/resources'
import { FAQPage } from './pages/faq'
import { SecurityPage } from './pages/security'
import { AboutPage } from './pages/about'
import { ContactPage } from './pages/contact'
import { DemoPage } from './pages/demo'
import { StartPage } from './pages/start'
import { SignupPage } from './pages/signup'
import { LoginPage } from './pages/login'
import { DownloadPage } from './pages/download'
import { sendMail, esc, type Bindings } from './lib/sendgrid'

const app = new Hono<{ Bindings: Bindings }>()

const NOTIFY_TO = 'tyler@groundwork-crm.com'
const NOTIFY_FROM = 'notifications@groundwork-crm.com'

// --- Form submission endpoints -------------------------------------------------
// Both forms post JSON here. We validate required fields, then relay to SendGrid
// (server-side only — the API key is a Cloudflare secret, never exposed to the browser).

app.post('/api/demo-request', async (c) => {
  const { env } = c
  let data: Record<string, unknown>
  try {
    data = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const firstName = esc(data.firstName)
  const lastName = esc(data.lastName)
  const email = esc(data.email)
  const company = esc(data.company)
  const trade = esc(data.trade)
  const teamSize = esc(data.teamSize)

  if (!firstName || !lastName || !email || !company || !trade || !teamSize) {
    return c.json({ ok: false, error: 'Missing required fields' }, 400)
  }

  const text = [
    `New demo request from the marketing site.`,
    ``,
    `Name: ${firstName} ${lastName}`,
    `Work email: ${email}`,
    `Company: ${company}`,
    `Trade: ${trade}`,
    `Team size: ${teamSize}`,
  ].join('\n')

  const result = await sendMail({
    apiKey: env.SENDGRID_API_KEY,
    to: NOTIFY_TO,
    from: NOTIFY_FROM,
    fromName: 'Groundwork Website',
    replyTo: email,
    subject: `New demo request — ${company}`,
    text,
  })

  if (!result.ok) {
    console.error('SendGrid demo-request error', result.status, result.error)
    return c.json({ ok: false, error: 'Failed to send. Please try again or email tyler@groundwork-crm.com directly.' }, 502)
  }

  return c.json({ ok: true })
})

app.post('/api/contact', async (c) => {
  const { env } = c
  let data: Record<string, unknown>
  try {
    data = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const name = esc(data.name)
  const email = esc(data.email)
  const topic = esc(data.topic)
  const message = esc(data.message)

  if (!name || !email || !topic || !message) {
    return c.json({ ok: false, error: 'Missing required fields' }, 400)
  }

  const text = [
    `New contact form message from the marketing site.`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    ``,
    `Message:`,
    message,
  ].join('\n')

  const result = await sendMail({
    apiKey: env.SENDGRID_API_KEY,
    to: NOTIFY_TO,
    from: NOTIFY_FROM,
    fromName: 'Groundwork Website',
    replyTo: email,
    subject: `New contact form message — ${name} (${topic})`,
    text,
  })

  if (!result.ok) {
    console.error('SendGrid contact error', result.status, result.error)
    return c.json({ ok: false, error: 'Failed to send. Please try again or email tyler@groundwork-crm.com directly.' }, 502)
  }

  return c.json({ ok: true })
})

app.post('/api/signup-request', async (c) => {
  const { env } = c
  let data: Record<string, unknown>
  try {
    data = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'Invalid request body' }, 400)
  }

  const firstName = esc(data.firstName)
  const lastName = esc(data.lastName)
  const email = esc(data.email)
  const company = esc(data.company)
  const role = esc(data.role)
  const notes = esc(data.notes) // optional

  if (!firstName || !lastName || !email || !company || !role) {
    return c.json({ ok: false, error: 'Missing required fields' }, 400)
  }

  const text = [
    `New pilot access request from the marketing site.`,
    ``,
    `Name: ${firstName} ${lastName}`,
    `Work email: ${email}`,
    `Company: ${company}`,
    `Role: ${role}`,
    ...(notes ? ['', 'Notes:', notes] : []),
  ].join('\n')

  const result = await sendMail({
    apiKey: env.SENDGRID_API_KEY,
    to: NOTIFY_TO,
    from: NOTIFY_FROM,
    fromName: 'Groundwork Website',
    replyTo: email,
    subject: `New pilot access request — ${company}`,
    text,
  })

  if (!result.ok) {
    console.error('SendGrid signup-request error', result.status, result.error)
    return c.json({ ok: false, error: 'Failed to send. Please try again or email tyler@groundwork-crm.com directly.' }, 502)
  }

  return c.json({ ok: true })
})

app.get('/', (c) => c.html(<HomePage />))
app.get('/product', (c) => c.html(<ProductHubPage />))
app.get('/product/my-day', (c) => c.html(<MyDayPage />))
app.get('/product/sales', (c) => c.html(<SalesPage />))
app.get('/product/financial', (c) => c.html(<FinancialPage />))
app.get('/product/operations', (c) => c.html(<OperationsPage />))
app.get('/product/admin', (c) => c.html(<AdminPage />))
app.get('/product/mobile', (c) => c.html(<MobilePage />))
app.get('/product/platform', (c) => c.html(<PlatformPage />))
app.get('/features', (c) => c.html(<FeaturesPage />))
app.get('/trades', (c) => c.html(<TradesHubPage />))
app.get('/trades/:slug', (c) => {
  const trade = getTradeBySlug(c.req.param('slug'))
  if (!trade) return c.notFound()
  return c.html(<TradePage trade={trade} />)
})
app.get('/multi-crew-ops', (c) => c.html(<MultiCrewOpsPage />))
app.get('/roles', (c) => c.html(<RolesHubPage />))
app.get('/roles/owners', (c) => c.html(<OwnersPage />))
app.get('/roles/office-managers', (c) => c.html(<OfficeManagersPage />))
app.get('/roles/sales-reps', (c) => c.html(<SalesRepsPage />))
app.get('/roles/foremen', (c) => c.html(<ForemenPage />))
app.get('/roles/laborers', (c) => c.html(<LaborersPage />))
app.get('/pricing', (c) => c.html(<PricingPage />))
app.get('/customers', (c) => c.html(<CustomersPage />))
app.get('/case-studies', (c) => c.html(<CaseStudiesPage />))
app.get('/resources', (c) => c.html(<ResourcesPage />))
app.get('/faq', (c) => c.html(<FAQPage />))
app.get('/security', (c) => c.html(<SecurityPage />))
app.get('/about', (c) => c.html(<AboutPage />))
app.get('/contact', (c) => c.html(<ContactPage />))
app.get('/demo', (c) => c.html(<DemoPage />))
app.get('/start', (c) => c.html(<StartPage />))
app.get('/signup', (c) => c.html(<SignupPage />))
app.get('/login', (c) => c.html(<LoginPage />))
app.get('/download', (c) => c.html(<DownloadPage />))

// Redirect rules from the design handoff
app.get('/book-demo', (c) => c.redirect('/demo', 301))
app.get('/info', (c) => c.redirect('/', 301))

// Redirects from the old /solutions structure (renamed to /trades — see
// the Trades mega-menu redesign). Multi-crew teams moved out to its own
// top-level route since it's an org-scale concern, not a trade.
app.get('/solutions', (c) => c.redirect('/trades', 301))
app.get('/solutions/landscaping', (c) => c.redirect('/trades/landscaping', 301))
app.get('/solutions/home-service', (c) => c.redirect('/trades/hvac', 301))
app.get('/solutions/field-service', (c) => c.redirect('/trades/roofing', 301))
app.get('/solutions/multi-crew-teams', (c) => c.redirect('/multi-crew-ops', 301))

// NOTE — interim domain state (see README "Domain status" section):
// This marketing site is temporarily hosted at groundwork-crm.info because the
// real product (a separate, live Cloudflare Pages app — repo
// github.com/AvalonLC/Groundwork-crm) currently occupies the bare
// groundwork-crm.com domain directly (it has no /login route yet; it's a
// single-page app gated by a session cookie, entered at the site root).
// The long-term plan is for the product to move to login.groundwork-crm.com
// and this marketing site to take over groundwork-crm.com — not done yet.
// Until that migration happens, send visitors to the real, live product.
app.get('/app', (c) => c.redirect('https://groundwork-crm.com', 301))
app.get('/workspace', (c) => c.redirect('https://groundwork-crm.com', 301))

export default app
