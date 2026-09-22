import asyncio
from playwright.async_api import async_playwright

URL = "https://3000-imjiqnu6a3theittt7acs-8f57ffe2.sandbox.novita.ai/explore"

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width':390,'height':844})
        page.on("console", lambda msg: errors.append(f"CONSOLE[{msg.type}]: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(f"PAGEERROR: {exc}"))

        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-demo-root]')

        sidebar = await page.query_selector('.pm-sidebar')
        sidebar_visible = await sidebar.is_visible()
        print(f"Sidebar visible on mobile (390px): {sidebar_visible}")

        ql_wrap = await page.query_selector('.demo-quicklinks')
        ql_visible = await ql_wrap.is_visible()
        print(f"Quicklinks row visible on mobile: {ql_visible}")

        # click a quicklink to navigate since sidebar hidden
        ql_dispatch = await page.query_selector('.demo-quicklink[data-demo-goto="dispatch"]')
        await ql_dispatch.click()
        await page.wait_for_timeout(200)
        panel = await page.query_selector('[data-demo-panel="dispatch"]')
        panel_visible = await panel.is_visible()
        print(f"Dispatch panel visible after quicklink click on mobile: {panel_visible}")

        # AI trigger visible/usable on mobile?
        trigger = await page.query_selector('[data-demo-ai-trigger]')
        trigger_visible = await trigger.is_visible()
        await trigger.click()
        await page.wait_for_timeout(300)
        overlay = await page.query_selector('[data-demo-ai-overlay]')
        overlay_box = await overlay.bounding_box()
        print(f"AI trigger visible: {trigger_visible}, overlay bbox on mobile: {overlay_box}")

        await page.screenshot(path="/home/user/webapp/.qa/mobile_explore.png", full_page=False)

        await browser.close()
        print("\n=== ERRORS ===")
        print(errors if errors else "None")

asyncio.run(main())
