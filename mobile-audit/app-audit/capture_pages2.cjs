const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

const targets = [
  { name: 'pipeline', text: 'Pipeline' },
  { name: 'leads', text: 'Leads' },
  { name: 'clients', text: 'Clients' },
  { name: 'properties', text: 'Properties' },
  { name: 'estimates', text: 'Estimates' },
  { name: 'communications', text: 'Communications' },
  { name: 'money_loop', text: 'Money Loop' },
  { name: 'job_costing', text: 'Job Costing' },
  { name: 'budget_rates', text: 'Budget & Rates' },
  { name: 'overhead_recovery', text: 'Overhead Recovery' },
  { name: 'invoice_reporting', text: 'Invoice Reporting' },
  { name: 'schedule', text: 'Schedule' },
  { name: 'dispatch', text: 'Dispatch' },
  { name: 'work_orders', text: 'Work Orders' },
  { name: 'time_tracker', text: 'Time Tracker' },
  { name: 'field_preview', text: 'Field Preview' },
  { name: 'client_portal', text: 'Client Portal' },
];

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT: ' + label)), ms)),
  ]);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await withTimeout(loginFresh(page), 30000, 'login');
  console.log('Logged in. URL:', page.url());

  for (const t of targets) {
    try {
      await withTimeout((async () => {
        const loc = page.locator(`text="${t.text}"`).first();
        const count = await loc.count();
        if (count === 0) {
          console.log('NOT FOUND:', t.name);
          return;
        }
        await loc.click({ timeout: 5000 });
        await page.waitForTimeout(1200);
        await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${t.name}.png`, fullPage: true, timeout: 8000 });
        console.log('Captured:', t.name, '| URL:', page.url());
      })(), 15000, t.name);
    } catch (e) {
      console.log('ERROR/TIMEOUT on', t.name, '-', e.message);
      // Try to recover by reloading fresh for next iteration
      try {
        await page.goto('https://groundwork-crm.com/#gwDashboard', { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1000);
      } catch (e2) {
        console.log('Recovery nav also failed:', e2.message);
      }
    }
  }

  console.log('DONE with all targets');
  await browser.close();
})().catch((e) => {
  console.log('FATAL:', e.message);
  process.exit(1);
});
