const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('=== Homepage ===');
  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/00b_home.png' });
  console.log('URL:', page.url());
  console.log('Title:', await page.title());

  // Look for any login link
  const links = await page.$$eval('a', (as) => as.map((a) => ({ href: a.href, text: a.textContent.trim() })).filter(l => l.href));
  console.log('Links found:', JSON.stringify(links.slice(0, 30), null, 2));

  await browser.close();
})();
