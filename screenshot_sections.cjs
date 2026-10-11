const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const labels = await page.$$eval('[data-screen-label]', els => els.map(e => ({
    label: e.getAttribute('data-screen-label'),
    top: e.getBoundingClientRect().top + window.scrollY,
    height: e.getBoundingClientRect().height,
  })));

  console.log(JSON.stringify(labels, null, 2));

  for (const s of labels) {
    await page.evaluate((top) => window.scrollTo(0, top), Math.max(0, s.top - 10));
    await page.waitForTimeout(100);
    const safeName = s.label.replace(/[^a-z0-9]/gi, '_');
    await page.screenshot({ path: `/tmp/section_${safeName}.png` });
  }

  await browser.close();
})();
