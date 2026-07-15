const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport:{width:375,height:812}});
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const lede = document.querySelector('.lede');
    const strong = lede.querySelector('strong');
    const s1 = getComputedStyle(strong);
    const rect1 = strong.getBoundingClientRect();
    // adjacent text node
    const rectLede = lede.getBoundingClientRect();
    return {
      strongRect: { w: rect1.width, h: rect1.height },
      strongFontWeight: s1.fontWeight,
      strongLineHeight: s1.lineHeight,
      ledeFontSize: getComputedStyle(lede).fontSize,
      ledeLineHeight: getComputedStyle(lede).lineHeight,
      html: lede.outerHTML.slice(0, 300),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
