async function loginFresh(page) {
  await page.goto('https://groundwork-crm.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.fill('input[type="email"]', 'tyler@avalon-lc.com');
  await page.fill('input[type="password"]', 'Tyler1');
  await page.click('button:has-text("Sign In")');
  await page.waitForTimeout(3000);
  await page.reload({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => null);
  await page.waitForTimeout(2000);
}
module.exports = { loginFresh };
