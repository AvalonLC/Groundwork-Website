// Playwright mobile smoke test for the Groundwork AI chat widget.
//
// Plain Node script (not node:test / @playwright/test) using the `playwright`
// package directly — kept dependency-light, matching the project's existing
// "no extra framework unless needed" posture. Run with:
//   node tests/e2e/mobile-chat.test.mjs
//
// REQUIRES: the local preview server running on http://localhost:3000 with
// CHAT_PROVIDER=mock (deterministic tool-triggering, no live LLM calls) —
// see README "Testing" section for how to flip providers safely.
//
// Covers (requirement: widget UX on mobile):
//  1. Launcher visible, icon-only (label hidden under the 720px breakpoint)
//  2. Click opens a FULL-SCREEN panel (width ~= viewport width, not a
//     desktop slide-over), aria-expanded flips to "true", focus moves to input
//  3. Contextual per-page welcome + quick-reply chips render for a fresh session
//  4. Sending a message streams tokens into an assistant bubble and renders
//     a tool-result card (pricing estimate)
//  5. Focus trap: Tab from the last focusable element cycles back to the first
//  6. Escape closes the panel and returns focus to the launcher

import { chromium, devices } from 'playwright'
import assert from 'node:assert/strict'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

function log(msg) {
  console.log('  ' + msg)
}

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    ...devices['iPhone 13'],
  })
  const page = await context.newPage()
  const failures = []

  async function step(name, fn) {
    try {
      await fn()
      log('PASS — ' + name)
    } catch (err) {
      failures.push({ name, err })
      log('FAIL — ' + name + '\n    ' + (err && err.message ? err.message : err))
    }
  }

  await page.goto(BASE_URL + '/pricing', { waitUntil: 'domcontentloaded' })

  const viewport = page.viewportSize()
  assert.ok(viewport, 'viewport should be set by device emulation')

  await step('launcher is visible and icon-only on mobile (label hidden under 720px breakpoint)', async () => {
    const launcher = page.locator('#gw-chat-launcher')
    await launcher.waitFor({ state: 'visible', timeout: 10000 })
    const labelVisible = await page.locator('.gw-chat-launcher-label').isVisible()
    assert.equal(labelVisible, false, 'launcher label text should be hidden on mobile widths')
  })

  await step('clicking the launcher opens a full-screen panel and moves focus to the input', async () => {
    await page.locator('#gw-chat-launcher').click()
    const panel = page.locator('#gw-chat-panel')
    await panel.waitFor({ state: 'visible', timeout: 5000 })
    // Wait for the open transition class (transform applied) before measuring.
    await page.waitForTimeout(300)
    const box = await panel.boundingBox()
    assert.ok(box, 'panel should have a bounding box once open')
    assert.ok(
      box.width >= viewport.width - 2,
      `panel width (${box.width}) should be ~= viewport width (${viewport.width}) on mobile — expected full-screen, not a slide-over`
    )
    const expanded = await page.locator('#gw-chat-launcher').getAttribute('aria-expanded')
    assert.equal(expanded, 'true', 'launcher aria-expanded should flip to "true" once open')
    const focused = await page.evaluate(() => document.activeElement && document.activeElement.id)
    assert.equal(focused, 'gw-chat-input', 'focus should move to the chat input on open')
  })

  await step('contextual welcome message + quick-reply chips render for a fresh /pricing session', async () => {
    const welcome = page.locator('[data-gw-chat-welcome]')
    const text = await welcome.textContent()
    assert.match(text || '', /pricing/i, 'the /pricing page welcome message should mention pricing')
    const chips = page.locator('.gw-chat-quickreply-chip')
    const chipCount = await chips.count()
    assert.ok(chipCount >= 1, 'at least one quick-reply chip should render on a fresh session')
  })

  await step('sending a message streams an assistant reply and renders a tool-result card', async () => {
    const input = page.locator('#gw-chat-input')
    await input.fill('What would pricing look like for a 5 person crew?')
    await page.locator('[data-gw-chat-form]').evaluate((form) => form.requestSubmit())

    // Wait for at least one AI bubble beyond the welcome message.
    await page.waitForFunction(
      () => document.querySelectorAll('.gw-chat-bubble-ai').length >= 2,
      { timeout: 15000 }
    )
    const aiBubbles = page.locator('.gw-chat-bubble-ai')
    const lastBubbleText = await aiBubbles.last().textContent()
    assert.ok(lastBubbleText && lastBubbleText.trim().length > 0, 'assistant reply bubble should have text')

    // A pricing tool-result card should have rendered from the SSE tool_result event.
    await page.waitForSelector('.gw-chat-card .gw-chat-card-total', { timeout: 5000 })
    const cardTitle = await page.locator('.gw-chat-card-title').first().textContent()
    assert.match(cardTitle || '', /plan estimate/i, 'a pricing estimate card should render')
  })

  await step('focus trap: Tab from the last focusable element cycles back to the first', async () => {
    const focusables = page.locator('#gw-chat-panel button, #gw-chat-panel input, #gw-chat-panel a[href]')
    const count = await focusables.count()
    assert.ok(count >= 2, 'panel should have multiple focusable elements to trap between')
    await focusables.last().focus()
    await page.keyboard.press('Tab')
    const firstEl = await focusables.first().evaluate((el) => el)
    const activeMatchesFirst = await page.evaluate(() => {
      const panel = document.getElementById('gw-chat-panel')
      const all = panel.querySelectorAll('button, input, a[href]')
      return document.activeElement === all[0]
    })
    assert.equal(activeMatchesFirst, true, 'Tab from the last element should cycle focus back to the first')
  })

  await step('Escape closes the panel and returns focus to the launcher', async () => {
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    const expanded = await page.locator('#gw-chat-launcher').getAttribute('aria-expanded')
    assert.equal(expanded, 'false', 'launcher aria-expanded should flip back to "false" on close')
    const focused = await page.evaluate(() => document.activeElement && document.activeElement.id)
    assert.equal(focused, 'gw-chat-launcher', 'focus should return to the launcher after Escape')
  })

  await browser.close()

  console.log('')
  if (failures.length) {
    console.log(`${failures.length} test(s) FAILED out of 7.`)
    process.exitCode = 1
  } else {
    console.log('All 7 mobile chat widget tests passed.')
  }
}

main().catch((err) => {
  console.error('Fatal error running mobile chat e2e test:', err)
  process.exit(1)
})
