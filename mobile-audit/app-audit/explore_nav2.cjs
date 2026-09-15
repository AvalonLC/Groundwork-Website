const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  console.log('URL:', page.url());

  // Dump the full page structure of the left nav
  const navHtml = await page.evaluate(() => {
    // Try common patterns
    const candidates = document.querySelectorAll('aside, [class*="sidebar" i], [class*="nav-left" i], [id*="sidebar" i]');
    for (const c of candidates) {
      if (c.innerText && c.innerText.length > 20) return c.innerText;
    }
    return 'not found via class match';
  });
  console.log('=== NAV TEXT ===');
  console.log(navHtml);

  // Click each group header text to expand
  const groups = ['SALES', 'FINANCIAL', 'OPERATIONS', 'MARKETING', 'LEARNING', 'ADMIN'];
  for (const g of groups) {
    const loc = page.locator(`text=${g}`).first();
    if (await loc.count() > 0) {
      await loc.click().catch(() => {});
      await page.waitForTimeout(400);
    }
  }

  const navHtml2 = await page.evaluate(() => {
    const candidates = document.querySelectorAll('aside, [class*="sidebar" i], [class*="nav-left" i], [id*="sidebar" i]');
    for (const c of candidates) {
      if (c.innerText && c.innerText.length > 20) return c.innerText;
    }
    return 'not found via class match';
  });
  console.log('=== NAV TEXT AFTER EXPAND ===');
  console.log(navHtml2);

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/05_nav_expanded2.png', fullPage: true });

  await browser.close();
})();
