const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.fill('input[type="email"], input[placeholder*="yourcompany"]', 'tyler@avalon-lc.com');
  await page.fill('input[type="password"]', 'Tyler1');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => null),
    page.click('button:has-text("Sign In")'),
  ]);

  await page.waitForTimeout(3000);
  console.log('URL after login:', page.url());
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/01_dashboard.png', fullPage: true });

  // Save storage state so subsequent scripts can reuse the session
  await context.storageState({ path: '/home/user/webapp/mobile-audit/app-audit/auth.json' });
  console.log('Saved auth state.');

  await browser.close();
})();
