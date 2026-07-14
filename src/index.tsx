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

// Redirect rules from the design handoff
app.get('/book-demo', (c) => c.redirect('/demo', 301))
app.get('/info', (c) => c.redirect('/', 301))

// The product lives at login.groundwork-crm.com (finalized domain map).
// Redirect legacy/typo'd paths straight to the real product login.
app.get('/app', (c) => c.redirect('https://login.groundwork-crm.com/login', 301))
app.get('/workspace', (c) => c.redirect('https://login.groundwork-crm.com/login', 301))

export default app
