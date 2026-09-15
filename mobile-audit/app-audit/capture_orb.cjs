const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/orb_00_dashboard.png', fullPage: false });

  // Try to find and click the floating orb button (bottom-right, has badge "8")
  const candidates = [
    'button:has-text("8")',
    '[class*="orb" i]',
    '[class*="assistant" i]',
    '[class*="ai-fab" i]',
    'button[aria-label*="assistant" i]',
    'button[aria-label*="AI" i]',
  ];

  let clicked = false;
  for (const sel of candidates) {
    const loc = page.locator(sel).first();
    if (await loc.count() > 0) {
      try {
        await loc.click({ timeout: 5000 });
        console.log(`Clicked orb via selector: ${sel}`);
        clicked = true;
        break;
      } catch (e) {
        console.log(`Selector ${sel} found but click failed: ${e.message}`);
      }
    }
  }

  if (!clicked) {
    // Fallback: click by fixed position bottom-right where orb was seen in earlier screenshots
    console.log('Falling back to coordinate click near bottom-right orb');
    await page.mouse.click(1390, 850);
    clicked = true;
  }

  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/orb_01_after_click.png', fullPage: false });

  // Try to dump any panel/modal text that appeared
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 3000));
  console.log('=== BODY TEXT SNAPSHOT (first 3000 chars) ===');
  console.log(bodyText);

  await browser.close();
})();
