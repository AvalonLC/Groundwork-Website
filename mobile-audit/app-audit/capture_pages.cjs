const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

const targets = [
  { name: 'dashboard', text: 'COMMAND CENTER' },
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

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await loginFresh(page);

  for (const t of targets) {
    try {
      const loc = page.locator(`text="${t.text}"`).first();
      if (await loc.count() > 0) {
        await loc.click();
        await page.waitForTimeout(1800);
        await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${t.name}.png`, fullPage: true });
        console.log('Captured:', t.name, '| URL:', page.url());
      } else {
        console.log('NOT FOUND:', t.name);
      }
    } catch (e) {
      console.log('ERROR on', t.name, e.message);
    }
  }

  await browser.close();
})();
