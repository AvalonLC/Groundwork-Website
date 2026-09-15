const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  page.on('console', msg => console.log('CONSOLE:', msg.text()));

  await page.locator('#gwAiOrb').click();
  await page.waitForTimeout(300);
  console.log('URL @300ms:', page.url());
  await page.screenshot({ path: 'orb_watch_300ms.png' });

  await page.waitForTimeout(1000);
  console.log('URL @1300ms:', page.url());
  await page.screenshot({ path: 'orb_watch_1300ms.png' });

  await browser.close();
})();
