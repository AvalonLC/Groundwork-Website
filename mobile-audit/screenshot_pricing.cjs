const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();

  // Desktop
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await desktopPage.screenshot({ path: 'mobile-audit/screenshots/pricing_desktop_full.png', fullPage: true });
  console.log('Desktop full-page screenshot saved.');

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'mobile-audit/screenshots/pricing_mobile_full.png', fullPage: true });
  console.log('Mobile full-page screenshot saved.');

  await browser.close();
})();
