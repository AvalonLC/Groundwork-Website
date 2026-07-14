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
import { SolutionsHubPage } from './pages/solutions/hub'
import { LandscapingPage } from './pages/solutions/landscaping'
import { HomeServicePage } from './pages/solutions/home-service'
import { FieldServicePage } from './pages/solutions/field-service'
import { MultiCrewTeamsPage } from './pages/solutions/multi-crew-teams'
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

const app = new Hono()

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
app.get('/solutions', (c) => c.html(<SolutionsHubPage />))
app.get('/solutions/landscaping', (c) => c.html(<LandscapingPage />))
app.get('/solutions/home-service', (c) => c.html(<HomeServicePage />))
app.get('/solutions/field-service', (c) => c.html(<FieldServicePage />))
app.get('/solutions/multi-crew-teams', (c) => c.html(<MultiCrewTeamsPage />))
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
