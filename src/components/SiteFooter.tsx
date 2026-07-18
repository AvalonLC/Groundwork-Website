// <SiteFooter /> — recreation of chrome.js renderFooter().
export function SiteFooter() {
  return (
    <footer class="footer" data-screen-label="Footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <div class="brand">
              <span class="brand-mark"></span> Groundwork
            </div>
            <div class="footer-lede">
              The operating system for service businesses. Sales, ops, financials, and daily execution — in one
              place.
            </div>
            <div style="display: flex; gap: 10px;">
              <a
                href="#"
                aria-label="X"
                style="width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.06); display: grid; place-items: center; color: #B7CFC1;"
              >
                𝕏
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                style="width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.06); display: grid; place-items: center; color: #B7CFC1;"
              >
                in
              </a>
              <a
                href="#"
                aria-label="YouTube"
                style="width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,0.06); display: grid; place-items: center; color: #B7CFC1;"
              >
                yt
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="/product">Overview</a></li>
              <li><a href="/product/my-day">My Day</a></li>
              <li><a href="/product/sales">Sales</a></li>
              <li><a href="/product/financial">Financial</a></li>
              <li><a href="/product/operations">Operations</a></li>
              <li><a href="/product/admin">Admin &amp; permissions</a></li>
              <li><a href="/product/mobile">Mobile &amp; Field Mode</a></li>
              <li><a href="/features">All features</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col-trades">
            <h5>Trades</h5>
            <div class="footer-trades-cols">
              <ul>
                <li><a href="/trades/hvac">HVAC</a></li>
                <li><a href="/trades/plumbing">Plumbing</a></li>
                <li><a href="/trades/electrical">Electrical</a></li>
                <li><a href="/trades/chimney">Chimney</a></li>
                <li><a href="/trades/roofing">Roofing</a></li>
                <li><a href="/trades/garage-door">Garage door</a></li>
              </ul>
              <ul>
                <li><a href="/trades/septic">Septic</a></li>
                <li><a href="/trades/pest-control">Pest control</a></li>
                <li><a href="/trades/irrigation">Irrigation</a></li>
                <li><a href="/trades/painting">Painting</a></li>
                <li><a href="/trades/landscaping">Landscaping</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-col">
            <h5>Roles</h5>
            <ul>
              <li><a href="/roles/owners">Owners</a></li>
              <li><a href="/roles/office-managers">Office managers</a></li>
              <li><a href="/roles/sales-reps">Sales reps</a></li>
              <li><a href="/roles/foremen">Foremen</a></li>
              <li><a href="/roles/laborers">Laborers</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/customers">Customers</a></li>
              <li><a href="/case-studies">Case studies</a></li>
              <li><a href="/security">Security</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <h5 style="margin-top: 24px;">Get started</h5>
            <ul>
              <li><a href="/demo">Book a demo</a></li>
              <li><a href="/start">Start here</a></li>
              <li><a href="/signup">Sign up</a></li>
              <li><a href="/login">Log in</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="/resources">Resource hub</a></li>
              <li><a href="/resources#academy">Academy</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/resources#blog">Blog</a></li>
              <li><a href="/resources#help">Help center</a></li>
              <li><a href="/resources#api">API docs</a></li>
              <li><a href="/download">Mobile app</a></li>
            </ul>
            <h5 style="margin-top: 24px;">Product login</h5>
            <ul>
              <li>
                <a href="/login" style="font-family: var(--font-mono); font-size: 12px;">
                  groundwork-crm.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© 2026 Groundwork CRM · All rights reserved</div>
          <div class="site-domain">groundwork-crm.info</div>
          <div style="display: flex; gap: 20px;">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="/security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
