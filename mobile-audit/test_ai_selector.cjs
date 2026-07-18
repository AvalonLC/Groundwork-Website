const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  // Default: Included AI ($0) -> AI line should read $0/mo, total unaffected
  const coreCrm0 = await page.locator('[data-calc-plan="core"] [data-calc-crm-subtotal]').textContent();
  const coreAi0 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal0 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Default AI (Included) — Core CRM:', coreCrm0, 'AI line:', coreAi0, 'Total:', coreTotal0);

  // Switch to AI Plus ($29) -> CRM subtotal stays same, AI line = $29/mo, total = CRM + 29
  await page.selectOption('[data-calc-ai-select]', 'plus');
  await page.waitForTimeout(200);
  const coreCrm1 = await page.locator('[data-calc-plan="core"] [data-calc-crm-subtotal]').textContent();
  const coreAi1 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal1 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal1 = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  console.log('AI Plus selected — Core CRM:', coreCrm1, 'AI line:', coreAi1, 'Total:', coreTotal1, '(expect CRM+$29)');
  console.log('Growth total w/ AI Plus:', growthTotal1);

  // Verify AI cost is flat per company: bump field seats, AI line should stay $29 (not scale)
  await page.fill('[data-calc-input="field"]', '20');
  await page.locator('[data-calc-input="field"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAi2 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  console.log('AI line after bumping field seats to 20 (expect still $29/mo, flat per company):', coreAi2);

  // Verify minSeats note is unaffected by AI selection — set seats below minSeats, check note
  await page.fill('[data-calc-input="rep"]', '0');
  await page.fill('[data-calc-input="field"]', '1');
  await page.fill('[data-calc-input="office"]', '0');
  await page.fill('[data-calc-input="view"]', '0');
  await page.locator('[data-calc-input="view"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const growthNote = await page.locator('[data-calc-plan="growth"] [data-calc-note]').textContent();
  console.log('Growth note w/ 1 seat total, AI Plus selected (expect min-seat warning, unaffected by AI):', growthNote.trim());

  // Custom AI package -> AI line should say "Contact sales", total should append " + AI"
  await page.selectOption('[data-calc-ai-select]', 'custom');
  await page.waitForTimeout(200);
  const coreAi3 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  const coreTotal3 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Custom AI package — AI line:', coreAi3, 'Total suffix:', coreTotal3);

  // BYOK -> AI line should be $0/mo but with distinct label
  await page.selectOption('[data-calc-ai-select]', 'byok');
  await page.waitForTimeout(200);
  const coreAiLabel4 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line-label]').textContent();
  const coreAi4 = await page.locator('[data-calc-plan="core"] [data-calc-ai-line]').textContent();
  console.log('BYOK selected — AI line label:', coreAiLabel4, 'AI line value:', coreAi4);

  await browser.close();
})();
