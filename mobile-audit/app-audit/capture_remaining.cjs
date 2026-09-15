const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout ${ms}ms: ${label}`)), ms))
  ]);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  const groups = {
    'Admin': [
      { name: 'field_reports', text: 'Field Reports' },
      { name: 'aar_template', text: 'AAR Template' },
      { name: 'aar_reviews', text: 'AAR Reviews' },
    ],
    'Learning': [
      { name: 'sales_academy', text: 'Sales Academy' },
      { name: 'estimating_101', text: 'Estimating 101' },
      { name: 'financial_literacy', text: 'Financial Literacy' },
      { name: 'crm_guide', text: 'CRM Guide' },
    ],
  };

  for (const [groupName, items] of Object.entries(groups)) {
    try {
      await page.locator(`button[data-label="${groupName}"]`).first().click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(800);
    } catch (e) {
      console.log(`Could not expand group ${groupName}: ${e.message}`);
    }

    for (const item of items) {
      try {
        await withTimeout((async () => {
          let loc = page.locator(`.nav-subtab:has-text("${item.text}")`).first();
          if (await loc.count() === 0) {
            loc = page.locator(`text=${item.text}`).first();
          }
          await loc.click({ timeout: 8000 });
          await page.waitForTimeout(1500);
          await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${item.name}.png`, fullPage: true, timeout: 15000 });
          console.log(`Captured: ${item.name}`);
        })(), 20000, item.name);
      } catch (e) {
        console.log(`FAILED: ${item.name} - ${e.message}`);
        try {
          await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${item.name}_viewport.png`, timeout: 10000 });
          console.log(`Viewport fallback captured: ${item.name}`);
        } catch (e2) {
          console.log(`Viewport fallback also failed: ${item.name} - ${e2.message}`);
        }
      }
    }
  }

  await browser.close();
})();
