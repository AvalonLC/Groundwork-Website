const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  // Explicitly wait for all webfonts to finish loading before screenshotting
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'mobile-audit/viewport_pricing_fontsready.png' });

  // Also try WITHOUT waiting for fonts (right after DOM content, to try to reproduce the glitch)
  const page2 = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  await page2.goto('http://localhost:3000/pricing', { waitUntil: 'domcontentloaded' });
  await page2.screenshot({ path: 'mobile-audit/viewport_pricing_early.png' });

  await browser.close();
})();
