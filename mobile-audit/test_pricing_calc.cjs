const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  // Default: users=6 -> additional = 5 * $29 = $145
  // Core:   259 + 145 = 404
  // Growth: 359 + 145 = 504
  // Pro:    459 + 145 = 604
  const coreTotal = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proTotal = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('Default (6 users) — Core:', coreTotal, 'Growth:', growthTotal, 'Pro:', proTotal, '(expect 404 / 504 / 604)');

  // Comparison-table scenario: 15 users -> Pro = 459 + 14*29 = 459 + 406 = 865
  await page.fill('[data-calc-input="users"]', '15');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const proTotal2 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  const proNote2 = await page.locator('[data-calc-plan="pro"] [data-calc-note]').textContent();
  console.log('15 users — Pro:', proTotal2, '(expect $865, matches comparison table)');
  console.log('Pro note:', proNote2.trim());

  // Test stepper buttons
  await page.click('[data-calc-step="users"][data-dir="1"]');
  await page.waitForTimeout(150);
  const usersVal = await page.locator('[data-calc-input="users"]').inputValue();
  console.log('User count after +1 stepper click (expect 16):', usersVal);

  // Test the 1-included-user floor: set users=1 -> no additional-user line, base fee only
  await page.fill('[data-calc-input="users"]', '1');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt1 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const coreUsersLine1 = await page.locator('[data-calc-plan="core"] [data-calc-users-line]').textContent();
  const coreNote1 = await page.locator('[data-calc-plan="core"] [data-calc-note]').textContent();
  console.log('Core: 1 user (expect $259, no additional-user cost):', coreAt1, 'users line:', coreUsersLine1);
  console.log('Core note at 1 user:', coreNote1.trim());

  // Minimum computation floor: typing 0 still computes as if 1 user (no
  // negative/zero-user math), even though the raw input field itself isn't
  // rewritten until a stepper click normalizes it.
  await page.fill('[data-calc-input="users"]', '0');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt0 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Core total after typing 0 users (expect still $259, clamped to 1 internally):', coreAt0);

  // Stepper click on a "0" field normalizes the input value itself to 1.
  await page.click('[data-calc-step="users"][data-dir="-1"]');
  await page.waitForTimeout(150);
  const usersValFloor = await page.locator('[data-calc-input="users"]').inputValue();
  console.log('User count after stepper -1 click from 0 (expect clamp to 1):', usersValFloor);

  await browser.close();
})();
