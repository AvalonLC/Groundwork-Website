const { chromium } = require('playwright');
const { loginFresh } = require('./helpers.cjs');

// group -> [{name, text}]
const groups = {
  Sales: [
    { name: 'pipeline', text: 'Pipeline' },
    { name: 'sales_process', text: 'Sales Process' },
    { name: 'leads', text: 'Leads' },
    { name: 'clients', text: 'Clients' },
    { name: 'properties', text: 'Properties' },
    { name: 'sales_team', text: 'Team' },
    { name: 'estimates', text: 'Estimates' },
    { name: 'communications', text: 'Communications' },
  ],
  Financial: [
    { name: 'money_loop', text: 'Money Loop' },
    { name: 'work_queue', text: 'Work Queue' },
    { name: 'job_costing', text: 'Job Costing' },
    { name: 'budget_rates', text: 'Budget & Rates' },
    { name: 'overhead_recovery', text: 'Overhead Recovery' },
    { name: 'invoice_reporting', text: 'Invoice Reporting' },
    { name: 'ledger', text: 'Ledger' },
    { name: 'fin_documents', text: 'Documents' },
    { name: 'setup_config', text: 'Setup & Config' },
  ],
  Operations: [
    { name: 'schedule', text: 'Schedule' },
    { name: 'dispatch', text: 'Dispatch' },
    { name: 'work_orders', text: 'Work Orders' },
    { name: 'recurring_services', text: 'Recurring Services' },
    { name: 'assets', text: 'Assets' },
    { name: 'time_tracker', text: 'Time Tracker' },
    { name: 'timesheet_review', text: 'Timesheet Review' },
    { name: 'field_preview', text: 'Field Preview' },
  ],
  Admin: [
    { name: 'admin_settings', text: 'Settings' },
    { name: 'employees', text: 'Employees' },
    { name: 'services_pricing', text: 'Services & Pricing' },
    { name: 'templates', text: 'Templates' },
    { name: 'client_portal', text: 'Client Portal' },
  ],
};

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

  for (const [groupName, items] of Object.entries(groups)) {
    try {
      // Expand the group first
      const groupLoc = page.locator(`button[data-label="${groupName}"]`).first();
      const groupCount = await groupLoc.count();
      if (groupCount > 0) {
        await groupLoc.click({ timeout: 5000, force: true });
        await page.waitForTimeout(600);
        console.log('Expanded group:', groupName);
      } else {
        console.log('Group header not found via data-label, trying text:', groupName);
        const altLoc = page.locator(`text="${groupName.toUpperCase()}"`).first();
        if (await altLoc.count() > 0) {
          await altLoc.click({ timeout: 5000, force: true });
          await page.waitForTimeout(600);
        }
      }
    } catch (e) {
      console.log('Could not expand group', groupName, e.message);
    }

    for (const t of items) {
      try {
        await withTimeout((async () => {
          const loc = page.locator(`.nav-subtab:has-text("${t.text}")`).first();
          let target = loc;
          if (await loc.count() === 0) {
            target = page.locator(`text="${t.text}"`).first();
          }
          if (await target.count() === 0) {
            console.log('NOT FOUND:', t.name);
            return;
          }
          await target.click({ timeout: 5000, force: true });
          await page.waitForTimeout(1200);
          await page.screenshot({ path: `/home/user/webapp/mobile-audit/app-audit/page_${t.name}.png`, fullPage: true, timeout: 8000 });
          console.log('Captured:', t.name);
        })(), 12000, t.name);
      } catch (e) {
        console.log('ERROR/TIMEOUT on', t.name, '-', e.message.split('\n')[0]);
      }
    }
  }

  console.log('DONE with all targets');
  await browser.close();
})().catch((e) => {
  console.log('FATAL:', e.message);
  process.exit(1);
});
