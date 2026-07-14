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

// Redirect rules from the design handoff
app.get('/book-demo', (c) => c.redirect('/demo', 301))
app.get('/info', (c) => c.redirect('/', 301))

// The product lives at login.groundwork-crm.com (finalized domain map).
// Redirect legacy/typo'd paths straight to the real product login.
app.get('/app', (c) => c.redirect('https://login.groundwork-crm.com/login', 301))
app.get('/workspace', (c) => c.redirect('https://login.groundwork-crm.com/login', 301))

export default app
