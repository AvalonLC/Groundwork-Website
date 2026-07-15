const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:375,height:812}, deviceScaleFactor:2});
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const lede = await page.$('.lede');
  await lede.screenshot({ path: 'mobile-audit/lede-closeup.png' });
  await browser.close();
})();
