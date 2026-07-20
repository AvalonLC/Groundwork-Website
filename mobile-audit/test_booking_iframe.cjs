const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

  const html = `<!DOCTYPE html>
<html><head><style>body{margin:0;padding:0;} iframe{width:100%;height:900px;border:0;}</style></head>
<body>
<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2BHZHcbMMK9uUr9qGIfT91WUwxpqPyoJXl7UNarQLLXMdErluB9PVAq_oj_VPAhKus1DK7Keoo"></iframe>
</body></html>`;

  await page.setContent(html);

  // Wait a bit for the iframe (cross-origin) to load
  await page.waitForTimeout(6000);

  await page.screenshot({ path: '/home/user/webapp/mobile-audit/booking_iframe_test.png', fullPage: false });

  // Try to inspect iframe content (will likely be blocked by cross-origin, but let's see)
  const frames = page.frames();
  console.log('Number of frames:', frames.length);
  for (const f of frames) {
    console.log('Frame URL:', f.url());
  }

  console.log('Console errors/warnings captured:', consoleErrors.length);
  consoleErrors.slice(0, 20).forEach((e) => console.log(' -', e));

  await browser.close();
})();
