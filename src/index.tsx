import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { ProductHubPage } from './pages/product/hub'
import { MyDayPage } from './pages/product/my-day'
import { SalesPage } from './pages/product/sales'

const app = new Hono()

app.get('/', (c) => c.html(<HomePage />))
app.get('/product', (c) => c.html(<ProductHubPage />))
app.get('/product/my-day', (c) => c.html(<MyDayPage />))
app.get('/product/sales', (c) => c.html(<SalesPage />))

// Redirect rules from the design handoff
app.get('/book-demo', (c) => c.redirect('/demo', 301))
app.get('/info', (c) => c.redirect('/', 301))

export default app
