const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.route('**/api/demo-request', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });

  await page.goto('http://localhost:3000/demo', { waitUntil: 'networkidle' });

  await page.fill('input[name="firstName"]', 'Jane');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'jane@example.com');
  await page.fill('input[name="company"]', 'Doe HVAC');
  await page.selectOption('select[name="trade"]', 'HVAC');
  await page.selectOption('select[name="teamSize"]', '2–5 people');
  await page.click('button[type="submit"]');
  await page.waitForSelector('#demo-booking-panel', { state: 'visible', timeout: 5000 });
  await page.waitForTimeout(6000);

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/demo_after_submit_mobile.png', fullPage: true });
  await browser.close();
})();
