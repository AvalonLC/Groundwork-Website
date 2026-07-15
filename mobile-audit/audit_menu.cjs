const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Confirm hamburger button is visible, nav-links hidden
  const navLinksDisplay = await page.$eval('.nav-links', el => getComputedStyle(el).display);
  const toggleDisplay = await page.$eval('.mobile-menu-toggle', el => getComputedStyle(el).display);
  console.log('nav-links display:', navLinksDisplay);
  console.log('hamburger toggle display (first match):', toggleDisplay);

  // Click the hamburger to open mobile menu
  await page.click('[data-mobile-toggle]');
  await page.waitForTimeout(400);

  const bodyHasOpenClass = await page.evaluate(() => document.body.classList.contains('mobile-menu-open'));
  console.log('body.mobile-menu-open after click:', bodyHasOpenClass);

  const menuVisible = await page.$eval('.mobile-menu', el => {
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return { visibility: style.visibility, transform: style.transform, x: r.x, width: r.width };
  });
  console.log('mobile-menu state:', JSON.stringify(menuVisible));

  await page.screenshot({ path: 'mobile-audit/menu-open.png', fullPage: false });

  // Try clicking a link inside mobile menu to confirm it navigates
  const links = await page.$$('.mobile-menu-section a');
  console.log('mobile menu links found:', links.length);

  await browser.close();
})();
