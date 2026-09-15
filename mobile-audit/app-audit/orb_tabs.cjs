const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  await page.locator('#gwAiOrb').click();
  await page.waitForTimeout(1000);

  const tabs = ['Suggestions', 'Coach', 'Setup', 'Chat'];
  for (const t of tabs) {
    try {
      await page.locator(`text="${t}"`).first().click({ timeout: 5000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `orb_tab_${t.toLowerCase()}.png` });
      console.log(`Captured tab: ${t}`);
    } catch (e) {
      console.log(`Failed tab ${t}: ${e.message}`);
    }
  }

  await browser.close();
})();
