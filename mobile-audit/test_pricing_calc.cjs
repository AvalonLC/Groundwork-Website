const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });

  // Default values: rep=2, field=6, office=1
  // Core: 2*49 + 6*25 + 1*89 = 98+150+89 = 337
  // Growth: 2*65 + 6*30 + 1*105 = 130+180+105 = 415
  // Pro: 2*85 + 6*38 + 1*135 = 170+228+135 = 533
  const coreTotal = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proTotal = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  console.log('Default — Core:', coreTotal, 'Growth:', growthTotal, 'Pro:', proTotal);

  // Change inputs: rep=3, field=10, office=2
  // Core: 3*49 + 10*25 + 2*89 = 147+250+178 = 575
  // Growth: 3*65 + 10*30 + 2*105 = 195+300+210 = 705
  // Pro: 3*85 + 10*38 + 2*135 = 255+380+270 = 905
  await page.fill('[data-calc-input="rep"]', '3');
  await page.fill('[data-calc-input="field"]', '10');
  await page.fill('[data-calc-input="office"]', '2');
  await page.locator('[data-calc-input="office"]').dispatchEvent('input');
  await page.waitForTimeout(200);

  const coreTotal2 = await page.locator('[data-calc-plan="core"] [data-calc-total]').textContent();
  const growthTotal2 = await page.locator('[data-calc-plan="growth"] [data-calc-total]').textContent();
  const proTotal2 = await page.locator('[data-calc-plan="pro"] [data-calc-total]').textContent();
  const growthNote = await page.locator('[data-calc-plan="growth"] [data-calc-note]').textContent();
  console.log('Updated (3 rep, 10 field, 2 office) — Core:', coreTotal2, 'Growth:', growthTotal2, 'Pro:', proTotal2);
  console.log('Growth note:', growthNote.trim());

  // Test stepper buttons
  await page.click('[data-calc-step="rep"][data-dir="1"]');
  await page.waitForTimeout(150);
  const repVal = await page.locator('[data-calc-input="rep"]').inputValue();
  console.log('Rep count after +1 stepper click:', repVal);

  // Test minimum-seat warning: set all to 0
  await page.fill('[data-calc-input="rep"]', '0');
  await page.fill('[data-calc-input="field"]', '0');
  await page.fill('[data-calc-input="office"]', '0');
  await page.locator('[data-calc-input="office"]').dispatchEvent('input');
  await page.waitForTimeout(200);
  const zeroNote = await page.locator('[data-calc-plan="growth"] [data-calc-note]').textContent();
  console.log('Zero-seats note:', zeroNote.trim());

  // Screenshot for visual check
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/pricing_desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/user/webapp/mobile-audit/pricing_mobile.png', fullPage: true });

  await browser.close();
})();
