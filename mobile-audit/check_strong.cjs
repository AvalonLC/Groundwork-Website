const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:375,height:812}});
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  const info = await page.$$eval('strong', els => els.map(el => {
    const s = getComputedStyle(el);
    return { text: el.textContent, fontSize: s.fontSize, fontFamily: s.fontFamily, display: s.display, className: el.className, parentClass: el.parentElement.className };
  }));
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
