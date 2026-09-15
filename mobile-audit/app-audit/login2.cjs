const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('response', async (res) => {
    if (res.url().includes('login') || res.url().includes('auth') || res.url().includes('session')) {
      console.log('RESPONSE:', res.status(), res.url());
      try {
        const body = await res.text();
        console.log('BODY (first 500 chars):', body.slice(0, 500));
      } catch (e) {
        console.log('Could not read body:', e.message);
      }
    }
  });

  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.fill('input[type="email"]', 'tyler@avalon-lc.com');
  await page.fill('input[type="password"]', 'Tyler1');

  await page.click('button:has-text("Sign In")');
  await page.waitForTimeout(5000);

  console.log('URL after login:', page.url());
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/02_retry.png' });

  await browser.close();
})();
