const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  console.log('URL before click:', page.url());
  await page.screenshot({ path: 'orb_clean_00_before.png' });

  const orb = page.locator('button:has-text("8")').first();
  await orb.click();
  await page.waitForTimeout(1500);
  console.log('URL after click:', page.url());
  await page.screenshot({ path: 'orb_clean_01_after.png', fullPage: true });

  await browser.close();
})();
