const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  // Inspect all fixed-position elements near bottom right
  const info = await page.evaluate(() => {
    const all = document.querySelectorAll('button, div');
    const results = [];
    for (const el of all) {
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (r.right > window.innerWidth - 150 && r.bottom > window.innerHeight - 150 && r.width > 0 && r.width < 200 && style.position === 'fixed') {
        results.push({
          tag: el.tagName,
          cls: el.className,
          text: el.innerText.slice(0,50),
          rect: {top: r.top, left: r.left, w: r.width, h: r.height}
        });
      }
    }
    return results;
  });
  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
