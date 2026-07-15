const { chromium } = require('playwright');

const BASE = process.env.AUDIT_BASE || 'https://groundwork-crm.info';
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

  const allIssues = {};

  for (const path of PAGES) {
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(200);

    const issues = await page.evaluate(() => {
      const problems = [];

      // 1. Viewport meta tag
      const vp = document.querySelector('meta[name="viewport"]');
      if (!vp) problems.push({ type: 'missing-viewport-meta' });

      // 2. Tap target sizes for interactive elements (buttons, links, inputs)
      const interactive = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
      const small = [];
      for (const el of interactive) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue; // hidden
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        if ((rect.height < 40 || rect.width < 32) && rect.height > 0) {
          const text = (el.textContent || '').trim().slice(0, 30);
          small.push({
            tag: el.tagName,
            text,
            class: el.className && typeof el.className === 'string' ? el.className.slice(0, 40) : '',
            w: Math.round(rect.width),
            h: Math.round(rect.height),
            y: Math.round(rect.top + window.scrollY),
          });
        }
      }
      if (small.length) problems.push({ type: 'small-tap-targets', count: small.length, samples: small.slice(0, 8) });

      // 3. Font sizes too small for body text
      const textEls = document.querySelectorAll('p, span, a, li, div');
      const tinyFonts = new Set();
      let tinyCount = 0;
      for (const el of textEls) {
        const text = (el.textContent || '').trim();
        if (text.length < 3) continue;
        const style = getComputedStyle(el);
        const fs = parseFloat(style.fontSize);
        if (fs > 0 && fs < 11 && el.children.length === 0) {
          tinyCount++;
          tinyFonts.add(`${el.tagName}.${(el.className||'').toString().slice(0,30)} (${fs}px): "${text.slice(0,40)}"`);
        }
      }
      if (tinyCount > 0) problems.push({ type: 'tiny-fonts', count: tinyCount, samples: Array.from(tinyFonts).slice(0, 6) });

      // 4. Fixed-width images/elements wider than viewport
      const fixedWide = [];
      document.querySelectorAll('*').forEach(el => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth + 5 && style.position !== 'fixed') {
          const inlineWidth = el.style.width;
          if (inlineWidth && inlineWidth.includes('px')) {
            fixedWide.push({ tag: el.tagName, class: (el.className||'').toString().slice(0,40), width: inlineWidth, actual: Math.round(rect.width) });
          }
        }
      });
      if (fixedWide.length) problems.push({ type: 'fixed-width-overflow', count: fixedWide.length, samples: fixedWide.slice(0,5) });

      // 5. Text that overflows its container (clipped)
      const clipped = [];
      document.querySelectorAll('p, span, a, h1,h2,h3,h4, div').forEach(el => {
        if (el.scrollWidth > el.clientWidth + 3 && el.children.length === 0) {
          const style = getComputedStyle(el);
          if (style.overflow === 'hidden' || style.textOverflow === 'ellipsis' || style.whiteSpace === 'nowrap') {
            const text = (el.textContent||'').trim();
            if (text.length > 0) clipped.push({ tag: el.tagName, class: (el.className||'').toString().slice(0,30), text: text.slice(0,40), scrollW: el.scrollWidth, clientW: el.clientWidth });
          }
        }
      });
      if (clipped.length) problems.push({ type: 'clipped-text', count: clipped.length, samples: clipped.slice(0,6) });

      // 6. Horizontal scrollability check
      const hasHScroll = document.documentElement.scrollWidth > window.innerWidth + 2;
      if (hasHScroll) problems.push({ type: 'horizontal-scroll', scrollWidth: document.documentElement.scrollWidth, viewport: window.innerWidth });

      return problems;
    });

    allIssues[path] = issues;
    console.log(`--- ${path} ---`);
    if (issues.length === 0) console.log('  clean');
    for (const issue of issues) {
      console.log(' ', JSON.stringify(issue).slice(0, 300));
    }
    await page.close();
  }

  await context.close();
  await browser.close();
  require('fs').writeFileSync('mobile-audit/issues.json', JSON.stringify(allIssues, null, 2));
})();
