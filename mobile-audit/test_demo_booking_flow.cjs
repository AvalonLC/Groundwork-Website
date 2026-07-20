const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

  // Mock the /api/demo-request endpoint so we don't actually hit SendGrid in this test,
  // but still exercise the exact client-side success-handling code path.
  await page.route('**/api/demo-request', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });

  await page.goto('http://localhost:3000/demo', { waitUntil: 'networkidle' });

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/demo_before_submit.png' });

  await page.fill('input[name="firstName"]', 'Jane');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', 'jane@example.com');
  await page.fill('input[name="company"]', 'Doe HVAC');
  await page.selectOption('select[name="trade"]', 'HVAC');
  await page.selectOption('select[name="teamSize"]', '2–5 people');

  await page.click('button[type="submit"]');

  // Wait for the success state to apply and panel to reveal
  await page.waitForSelector('#demo-booking-panel', { state: 'visible', timeout: 5000 });

  // Give the iframe (cross-origin, real Google Calendar) time to load
  await page.waitForTimeout(6000);

  const formDisplay = await page.$eval('form[data-live-submit]', (el) => getComputedStyle(el).display);
  const introDisplay = await page.$eval('#demo-request-intro', (el) => getComputedStyle(el).display);
  const panelDisplay = await page.$eval('#demo-booking-panel', (el) => getComputedStyle(el).display);
  const btnText = await page.$eval('button[type="submit"]', (el) => el.textContent);

  console.log('form display (should be none):', formDisplay);
  console.log('intro display (should be none):', introDisplay);
  console.log('panel display (should be block):', panelDisplay);
  console.log('submit button text (should be success text):', btnText);

  const frames = page.frames();
  console.log('Frame count:', frames.length);
  const calFrame = frames.find((f) => f.url().includes('calendar.google.com'));
  console.log('Calendar iframe present:', !!calFrame);

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/demo_after_submit.png', fullPage: true });

  console.log('Console errors:', consoleErrors.length);
  consoleErrors.forEach((e) => console.log(' -', e));

  await browser.close();
})();
