const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('response', async (res) => {
    if (res.url().includes('/api/')) {
      console.log('RESP:', res.status(), res.url());
    }
  });

  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.fill('input[type="email"]', 'tyler@avalon-lc.com');
  await page.fill('input[type="password"]', 'Tyler1');
  await page.click('button:has-text("Sign In")');
  await page.waitForTimeout(4000);

  console.log('--- reloading ---');
  await page.reload({ waitUntil: 'networkidle', timeout: 20000 }).catch(e => console.log('reload err', e.message));
  await page.waitForTimeout(3000);
  console.log('URL:', page.url());
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/03_after_reload.png' });

  console.log('--- retry bootstrap fetch directly ---');
  const bootstrapResp = await page.evaluate(async () => {
    try {
      const r = await fetch('/api/auth/bootstrap', { credentials: 'include' });
      const text = await r.text();
      return { status: r.status, text: text.slice(0, 1000) };
    } catch (e) {
      return { error: e.message };
    }
  });
  console.log('bootstrap direct:', JSON.stringify(bootstrapResp));

  const meResp = await page.evaluate(async () => {
    try {
      const r = await fetch('/api/auth/me', { credentials: 'include' });
      const text = await r.text();
      return { status: r.status, text: text.slice(0, 1000) };
    } catch (e) {
      return { error: e.message };
    }
  });
  console.log('me direct:', JSON.stringify(meResp));

  await browser.close();
})();
