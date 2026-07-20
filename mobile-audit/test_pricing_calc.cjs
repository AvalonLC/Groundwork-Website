const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  // Default: users=6. Core includes 1 -> 5 additional*$25=$125 -> $384.
  // Growth includes 5 -> 1 additional*$25=$25 -> $384. Pro includes 10 -> 0 additional -> $459.
  const coreTotal = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proTotal = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('Default (6 users) — Core:', coreTotal, 'Growth:', growthTotal, 'Pro:', proTotal, '(expect 384 / 384 / 459)');

  // Comparison-table scenario: 15 users -> Pro = 459 + 5*25 = 459 + 125 = 584
  await page.fill('[data-calc-input="users"]', '15');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const proTotal2 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  const proNote2 = await page.locator('[data-calc-plan="pro"] [data-calc-note]').textContent();
  console.log('15 users — Pro:', proTotal2, '(expect $584, matches comparison table)');
  console.log('Pro note:', proNote2.trim());

  await page.click('[data-calc-step="users"][data-dir="1"]');
  await page.waitForTimeout(150);
  const usersVal = await page.locator('[data-calc-input="users"]').inputValue();
  console.log('User count after +1 stepper click (expect 16):', usersVal);

  // 1-user floor: Core has no additional-user cost, Growth/Pro also no cost (both include more than 1)
  await page.fill('[data-calc-input="users"]', '1');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt1 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const coreUsersLine1 = await page.locator('[data-calc-plan="core"] [data-calc-users-line]').textContent();
  const coreNote1 = await page.locator('[data-calc-plan="core"] [data-calc-note]').textContent();
  const growthAt1 = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proAt1 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('Core: 1 user (expect $259, no additional-user cost):', coreAt1, 'users line:', coreUsersLine1);
  console.log('Core note at 1 user:', coreNote1.trim());
  console.log('Growth at 1 user (expect $359, still within included-5 allotment):', growthAt1);
  console.log('Pro at 1 user (expect $459, still within included-10 allotment):', proAt1);

  await page.fill('[data-calc-input="users"]', '0');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt0 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Core total after typing 0 users (expect still $259, clamped to 1 internally):', coreAt0);

  await page.click('[data-calc-step="users"][data-dir="-1"]');
  await page.waitForTimeout(150);
  const usersValFloor = await page.locator('[data-calc-input="users"]').inputValue();
  console.log('User count after stepper -1 click from 0 (expect clamp to 1):', usersValFloor);

  // Cross-over scenario: 10 users -> Pro ($459, 0 additional) should be cheaper than Growth ($484) and Core ($484)
  await page.fill('[data-calc-input="users"]', '10');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt10 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthAt10 = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proAt10 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('At 10 users — Core:', coreAt10, 'Growth:', growthAt10, 'Pro:', proAt10, '(expect 484 / 484 / 459 — Pro cheapest)');

  await browser.close();
})();
