const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  // Default values: rep=2, field=6, office=1, view=0
  // fieldCost(6, rate) = 5*rate + 1*rate*0.9
  // Core:   2*49 + (5*25+1*25*0.9) + 1*89 = 98 + 147.5 + 89 = 334.5 -> $335 (rounded)
  // Growth: 2*65 + (5*30+1*30*0.9) + 1*105 = 130 + 177   + 105 = 412
  // Pro:    2*85 + (5*35+1*35*0.9) + 1*135 = 170 + 206.5 + 135 = 511.5 -> $512
  const coreTotal = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proTotal = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('Default — Core:', coreTotal, 'Growth:', growthTotal, 'Pro:', proTotal);

  // Comparison-table scenario: 1 rep + 14 field (15 users), 0 office, 0 view -> Pro
  // fieldCost(14, 35) = 5*35 + 5*35*0.9 + 4*35*0.85 = 175 + 157.5 + 119 = 451.5
  // Pro total = 85 + 451.5 = 536.5 -> $537 (rounded), matches the comparison table's $536.50
  await page.fill('[data-calc-input="rep"]', '1');
  await page.fill('[data-calc-input="field"]', '14');
  await page.fill('[data-calc-input="office"]', '0');
  await page.fill('[data-calc-input="view"]', '0');
  await page.locator('[data-calc-input="view"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const proTotal2 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  const proNote2 = await page.locator('[data-calc-plan="pro"] [data-calc-note]').textContent();
  console.log('1 rep + 14 field — Pro:', proTotal2, '(expect $537, matches comparison table $536.50)');
  console.log('Pro note:', proNote2.trim());

  // Test stepper buttons
  await page.click('[data-calc-step="rep"][data-dir="1"]');
  await page.waitForTimeout(150);
  const repVal = await page.locator('[data-calc-input="rep"]').inputValue();
  console.log('Rep count after +1 stepper click:', repVal);

  // Test view-only included quota: Core includes 1 free view-only seat.
  // Set rep=1 (avoid min-seat note noise on rep/field/office), view=1 -> should add $0
  await page.fill('[data-calc-input="rep"]', '1');
  await page.fill('[data-calc-input="field"]', '0');
  await page.fill('[data-calc-input="office"]', '0');
  await page.fill('[data-calc-input="view"]', '1');
  await page.locator('[data-calc-input="view"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt1View = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Core: rep=1, view=1 (1 free included, expect $49 — no view charge):', coreAt1View);

  // Set view=3 on Core (1 free + 2 billable @ $10 = $20) -> expect $49 + $20 = $69
  await page.fill('[data-calc-input="view"]', '3');
  await page.locator('[data-calc-input="view"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const coreAt3View = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  console.log('Core: rep=1, view=3 (1 free + 2 billable, expect $69):', coreAt3View);

  // Test minimum-seat warning: set all to 0 (rep/field/office count toward min, view does not)
  await page.fill('[data-calc-input="rep"]', '0');
  await page.fill('[data-calc-input="field"]', '0');
  await page.fill('[data-calc-input="office"]', '0');
  await page.fill('[data-calc-input="view"]', '0');
  await page.locator('[data-calc-input="view"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const zeroNote = await page.locator('[data-calc-plan="growth"] [data-calc-note]').textContent();
  console.log('Zero-seats note:', zeroNote.trim());

  await browser.close();
})();
