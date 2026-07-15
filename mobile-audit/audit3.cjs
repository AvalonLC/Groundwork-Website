const { chromium } = require('playwright');

const BASE = process.env.AUDIT_BASE || 'http://localhost:3000';
const PAGES = [
  '/', '/pricing', '/faq', '/features', '/about', '/demo', '/security',
  '/contact', '/login', '/start', '/signup', '/download', '/customers',
  '/resources', '/case-studies'
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
  });

  for (const path of PAGES) {
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(200);

    const issues = await page.evaluate(() => {
      function isVisible(el) {
        if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return false;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return false;
        return true;
      }

      const problems = [];

      // Tap targets: real interactive elements, genuinely visible, excluding
      // deliberately compact social icons (which are a known/common design pattern)
      const interactive = document.querySelectorAll('a, button, input, select, textarea');
      const small = [];
      for (const el of interactive) {
        if (!isVisible(el)) continue;
        const rect = el.getBoundingClientRect();
        const isSocialIcon = el.closest('.social, [class*="social"]') || /^(𝕏|in|yt|f|ig)$/.test((el.textContent||'').trim());
        if (isSocialIcon) continue;
        if (rect.height < 40 && rect.width < 200) {
          const text = (el.textContent || '').trim().slice(0, 40);
          if (!text) continue; // icon-only, skip (covered separately if needed)
          small.push({ tag: el.tagName, text, w: Math.round(rect.width), h: Math.round(rect.height), y: Math.round(rect.top + window.scrollY) });
        }
      }
      if (small.length) problems.push({ type: 'small-tap-targets', count: small.length, samples: small.slice(0, 10) });

      // Tiny fonts, visible only
      const textEls = document.querySelectorAll('p, span, a, li, div, button, label');
      const tinySet = new Map();
      for (const el of textEls) {
        if (el.children.length !== 0) continue;
        const text = (el.textContent || '').trim();
        if (text.length < 3) continue;
        if (!isVisible(el)) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs > 0 && fs < 11) {
          const key = `${el.className||''}:${text.slice(0,30)}`;
          tinySet.set(key, { class: (el.className||'').toString().slice(0,40), fs, text: text.slice(0,40) });
        }
      }
      if (tinySet.size) problems.push({ type: 'tiny-fonts-visible', count: tinySet.size, samples: Array.from(tinySet.values()).slice(0, 10) });

      return problems;
    });

    console.log(`--- ${path} ---`);
    if (issues.length === 0) console.log('  clean');
    for (const issue of issues) console.log(' ', JSON.stringify(issue));
    await page.close();
  }

  await context.close();
  await browser.close();
})();
