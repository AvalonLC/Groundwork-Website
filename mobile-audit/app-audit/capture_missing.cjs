const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

const groups = {
  Sales: [
    { name: 'clients', text: 'Clients' },
    { name: 'properties', text: 'Properties' },
  ],
  Admin: [
    { name: 'services_pricing', text: 'Services & Pricing' },
    { name: 'templates', text: 'Templates' },
    { name: 'client_portal', text: 'Client Portal' },
  ],
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);
  console.log('Logged in.');

  for (const [groupName, items] of Object.entries(groups)) {
    const groupLoc = page.locator(`button[data-label="${groupName}"]`).first();
    if (await groupLoc.count() > 0) {
      await groupLoc.click({ timeout: 5000, force: true });
      await page.waitForTimeout(600);
    }
    for (const t of items) {
      try {
        const loc = page.locator(`.nav-subtab:has-text("${t.text}")`).first();
        let target = loc;
        if (await loc.count() === 0) target = page.locator(`text="${t.text}"`).first();
        await target.click({ timeout: 5000, force: true });
        await page.waitForTimeout(3000); // give slow pages more time to settle
        await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${t.name}.png`, fullPage: true, timeout: 20000 });
        console.log('Captured:', t.name);
      } catch (e) {
        console.log('STILL FAILED:', t.name, e.message.split('\n')[0]);
        // fallback: viewport-only screenshot, not fullPage
        try {
          await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${t.name}_viewport.png`, timeout: 10000 });
          console.log('Viewport fallback captured:', t.name);
        } catch (e2) {
          console.log('Viewport fallback also failed:', t.name, e2.message.split('\n')[0]);
        }
      }
    }
  }

  await browser.close();
})().catch((e) => { console.log('FATAL', e.message); process.exit(1); });
