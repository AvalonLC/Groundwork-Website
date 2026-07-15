const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // --- Demo form ---
  await page.goto('http://localhost:3000/demo', { waitUntil: 'networkidle' });
  await page.fill('input[name="firstName"]', 'Playwright');
  await page.fill('input[name="lastName"]', 'Tester');
  await page.fill('input[name="email"]', 'playwright-test@example.com');
  await page.fill('input[name="company"]', 'Playwright QA Co');
  await page.selectOption('select[name="trade"]', { label: 'Home service (HVAC, plumbing, electrical)' });
  await page.selectOption('select[name="teamSize"]', { label: '6–15 people' });
  const [demoResp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/demo-request')),
    page.click('button[type="submit"]'),
  ]);
  console.log('demo-request status:', demoResp.status());
  await page.waitForTimeout(300);
  const demoBtnText = await page.textContent('#app, button[type="submit"]').catch(() => null);
  const demoBtnText2 = await page.locator('form[data-live-submit] button[type="submit"]').textContent();
  console.log('demo button text after submit:', demoBtnText2.trim());

  // --- Contact form ---
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.fill('input[name="name"]', 'Playwright Tester');
  await page.fill('input[name="email"]', 'playwright-test@example.com');
  await page.selectOption('select[name="topic"]', { label: 'Support' });
  await page.fill('textarea[name="message"]', 'This is an automated end-to-end test of the contact form.');
  const [contactResp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/contact')),
    page.click('button[type="submit"]'),
  ]);
  console.log('contact status:', contactResp.status());
  await page.waitForTimeout(300);
  const contactBtnText = await page.locator('form[data-live-submit] button[type="submit"]').textContent();
  console.log('contact button text after submit:', contactBtnText.trim());

  // --- Signup form ---
  await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle' });
  await page.fill('input[name="firstName"]', 'Playwright');
  await page.fill('input[name="lastName"]', 'Tester');
  await page.fill('input[name="email"]', 'playwright-test@example.com');
  await page.fill('input[name="company"]', 'Playwright QA Co');
  await page.selectOption('select[name="role"]', { label: 'Owner' });
  await page.fill('textarea[name="notes"]', 'This is an automated end-to-end test of the signup form.');
  const [signupResp] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/signup-request')),
    page.click('button[type="submit"]'),
  ]);
  console.log('signup-request status:', signupResp.status());
  await page.waitForTimeout(300);
  const signupBtnText = await page.locator('form[data-live-submit] button[type="submit"]').textContent();
  console.log('signup button text after submit:', signupBtnText.trim());

  await browser.close();
})();
