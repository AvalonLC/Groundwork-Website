const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // Mobile full page
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const fullHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('Mobile full page height (px):', fullHeight, '=', Math.round(fullHeight / 844 * 10) / 10, 'viewport-heights of scroll');
    await page.screenshot({ path: '/tmp/mobile_full_page.png', fullPage: true });
    await page.close();
  }

  // Desktop full page height for comparison
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const fullHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('Desktop full page height (px):', fullHeight, '=', Math.round(fullHeight / 900 * 10) / 10, 'viewport-heights of scroll');
    await page.close();
  }

  await browser.close();
})();
