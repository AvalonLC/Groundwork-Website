const { chromium } = require('playwright');

const BASE = process.env.AUDIT_BASE || 'https://groundwork-crm.info';
const PAGES = [
  '/', '/pricing', '/faq', '/features', '/about', '/demo', '/security',
  '/contact', '/login', '/start', '/signup', '/download', '/customers',
  '/resources', '/case-studies'
];

const VIEWPORTS = [
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-14', width: 390, height: 844 },
  { name: 'pixel-7', width: 412, height: 915 },
];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });

    for (const path of PAGES) {
      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', err => consoleErrors.push(err.message));

      try {
        await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(300);

        // Check horizontal overflow: does document scrollWidth exceed viewport width?
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const bodyWidth = document.body.scrollWidth;
          const viewportWidth = window.innerWidth;
          const maxWidth = Math.max(docWidth, bodyWidth);
          // Find elements wider than viewport
          const offenders = [];
          if (maxWidth > viewportWidth + 2) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > viewportWidth + 5 || rect.left < -5) {
                offenders.push({
                  tag: el.tagName,
                  class: el.className && typeof el.className === 'string' ? el.className.slice(0,60) : '',
                  id: el.id,
                  right: Math.round(rect.right),
                  left: Math.round(rect.left),
                  width: Math.round(rect.width),
                });
                if (offenders.length >= 5) break;
              }
            }
          }
          return { docWidth: maxWidth, viewportWidth, overflowPx: maxWidth - viewportWidth, offenders };
        });

        const filename = `mobile-audit/${vp.name}${path.replace(/\//g, '_') || '_home'}.png`;
        await page.screenshot({ path: filename, fullPage: true });

        results.push({
          viewport: vp.name,
          path,
          overflow: overflow.overflowPx > 2 ? overflow : null,
          consoleErrors: consoleErrors.slice(0, 5),
          screenshot: filename,
        });
        console.log(`✓ ${vp.name} ${path} -> overflow:${overflow.overflowPx}px errors:${consoleErrors.length}`);
      } catch (e) {
        results.push({ viewport: vp.name, path, error: e.message });
        console.log(`✗ ${vp.name} ${path} -> ERROR: ${e.message}`);
      }
      await page.close();
    }
    await context.close();
  }

  await browser.close();
  require('fs').writeFileSync('mobile-audit/results.json', JSON.stringify(results, null, 2));
  console.log('\n=== DONE ===');
})();
