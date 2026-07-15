const { chromium } = require('playwright');

const PAGES = ['/', '/pricing', '/features'];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  for (const path of PAGES) {
    const page = await context.newPage();
    await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const name = path === '/' ? 'home' : path.slice(1);
    await page.screenshot({ path: `mobile-audit/viewport_${name}.png` }); // above-the-fold only
    await page.close();
  }
  await browser.close();
})();
