const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  const coreBase0 = await page.locator('[data-calc-plan="core"] [data-calc-base-line]').textContent();
  const coreAi0 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal0 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Default AI (Included) — Core base:', coreBase0, 'AI line:', coreAi0, 'Total:', coreTotal0);

  await page.selectOption('[data-calc-ai-select]', 'plus');
  await page.waitForTimeout(200);
  const coreAi1 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal1 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal1 = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  console.log('AI Plus selected — Core AI line:', coreAi1, 'Total:', coreTotal1, '(expect prior total + $29)');
  console.log('Growth total w/ AI Plus:', growthTotal1);

  // Bump users to 20: Core includes 1 -> 19 additional * $25 = $475.
  // AI cost should stay flat per company regardless of headcount.
  await page.fill('[data-calc-input="users"]', '20');
  await page.locator('[data-calc-input="users"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAi2 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreUsersLine2 = await page.locator('[data-calc-plan="core"] [data-calc-users-line]').textContent();
  console.log('AI line after bumping users to 20 (expect still $29/mo, flat per company):', coreAi2);
  console.log('Additional-users line at 20 users (expect $475/mo = 19*$25):', coreUsersLine2);

  await page.selectOption('[data-calc-ai-select]', 'custom');
  await page.waitForTimeout(200);
  const coreAi3 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal3 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Custom AI package — AI line:', coreAi3, 'Total suffix:', coreTotal3);

  await page.selectOption('[data-calc-ai-select]', 'byok');
  await page.waitForTimeout(200);
  const coreAiLabel4 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line-label]').textContent();
  const coreAi4 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  console.log('BYOK selected — AI line label:', coreAiLabel4, 'AI line value:', coreAi4);

  await browser.close();
})();
