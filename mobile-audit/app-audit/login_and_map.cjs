const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  console.log('Navigating to login...');
  await page.goto('https://groundwork-crm.com/login', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/00_login.png' });

  // Try to find email/password fields
  const emailSelectors = ['input[type="email"]', 'input[name="email"]', '#email', 'input[placeholder*="email" i]'];
  const passSelectors = ['input[type="password"]', 'input[name="password"]', '#password'];

  let emailInput = null;
  for (const sel of emailSelectors) {
    emailInput = await page.$(sel);
    if (emailInput) { console.log('Found email input:', sel); break; }
  }
  let passInput = null;
  for (const sel of passSelectors) {
    passInput = await page.$(sel);
    if (passInput) { console.log('Found password input:', sel); break; }
  }

  if (!emailInput || !passInput) {
    console.log('COULD NOT FIND LOGIN FIELDS');
    const html = await page.content();
    require('fs').writeFileSync('/home/user/webapp/mobile-audit/app-audit/login_page.html', html);
    await browser.close();
    return;
  }

  await emailInput.fill('tyler@avalon-lc.com');
  await passInput.fill('Tyler1');

  const submitBtn = await page.$('button[type="submit"]') || await page.$('button:has-text("Sign In")') || await page.$('button:has-text("Log in")');
  if (submitBtn) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => null),
      submitBtn.click(),
    ]);
  } else {
    console.log('COULD NOT FIND SUBMIT BUTTON');
  }

  await page.waitForTimeout(3000);
  console.log('Current URL after login attempt:', page.url());
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/app-audit/01_after_login.png' });

  console.log('Console errors so far:', consoleErrors.length);
  consoleErrors.slice(0, 10).forEach((e) => console.log(' -', e));

  await browser.close();
})();
