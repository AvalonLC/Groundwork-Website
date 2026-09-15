const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  const attrs = await page.evaluate(() => {
    const btn = document.querySelector('button.fixed, button[style*="fixed"]') ||
      Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === '8');
    if (!btn) return null;
    return {
      outerHTML: btn.outerHTML.slice(0, 1000),
      title: btn.title,
      ariaLabel: btn.getAttribute('aria-label'),
    };
  });
  console.log(JSON.stringify(attrs, null, 2));

  await browser.close();
})();
