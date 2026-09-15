const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: '/home/user/webapp/mobile-audit/app-audit/auth.json' });
  const page = await context.newPage();

  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Expand each top-level nav group and list sub-items
  const navGroups = await page.$$eval('[class*="sidebar"] *', () => []); // placeholder, will refine
  const groupLabels = ['SALES', 'FINANCIAL', 'OPERATIONS', 'MARKETING', 'LEARNING', 'ADMIN'];

  for (const label of groupLabels) {
    try {
      const el = await page.$(`text="${label}"`);
      if (el) {
        await el.click();
        await page.waitForTimeout(500);
      }
    } catch (e) {
      console.log('click failed for', label, e.message);
    }
  }

  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/04_nav_expanded.png', fullPage: true });

  // Grab all visible nav text
  const navText = await page.$eval('body', (b) => {
    const sidebar = document.querySelector('[class*="sidebar" i]') || document.querySelector('nav') || null;
    return sidebar ? sidebar.innerText : 'NO SIDEBAR FOUND';
  });
  console.log('=== SIDEBAR TEXT ===');
  console.log(navText);

  await browser.close();
})();
