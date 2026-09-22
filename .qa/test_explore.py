import asyncio, sys, json
from playwright.async_api import async_playwright

URL = "https://3000-imjiqnu6a3theittt7acs-8f57ffe2.sandbox.novita.ai/explore"

SIDEBAR_KEYS = ['command','pipeline','leads','clients','properties','estimates','money','budget','invoicing','schedule','dispatch','workorders','clientportal','aar']

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width':1400,'height':1000})
        page.on("console", lambda msg: errors.append(f"CONSOLE[{msg.type}]: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(f"PAGEERROR: {exc}"))

        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-demo-root]')

        results = {}

        # Test each sidebar item click -> panel visible
        for key in SIDEBAR_KEYS:
            sel = f'[data-demo-sidebar-target="{key}"]'
            el = await page.query_selector(sel)
            if not el:
                results[key] = "MISSING_SIDEBAR_ITEM"
                continue
            await el.click()
            await page.wait_for_timeout(150)
            panel = await page.query_selector(f'[data-demo-panel="{key}"]')
            if not panel:
                results[key] = "MISSING_PANEL"
                continue
            hidden = await panel.get_attribute('hidden')
            visible = await panel.is_visible()
            results[key] = f"hidden_attr={hidden} visible={visible}"

        print("=== SIDEBAR NAV RESULTS ===")
        for k,v in results.items():
            print(f"{k}: {v}")

        # progress bar check
        fill = await page.query_selector('[data-demo-progress-fill]')
        style = await fill.get_attribute('style') if fill else None
        count = await page.text_content('[data-demo-progress-count]')
        print(f"\nProgress fill style: {style}, count text: {count}")

        # quicklinks check
        ql = await page.query_selector_all('.demo-quicklink')
        print(f"\nQuicklinks found: {len(ql)}")
        if ql:
            await ql[0].click()
            await page.wait_for_timeout(150)
            active = await page.query_selector('.demo-quicklink.active')
            print(f"Quicklink active after click: {await active.text_content() if active else None}")

        # AI overlay open/close
        trigger = await page.query_selector('[data-demo-ai-trigger]')
        await trigger.click()
        await page.wait_for_timeout(300)
        overlay = await page.query_selector('[data-demo-ai-overlay]')
        overlay_class = await overlay.get_attribute('class')
        print(f"\nAI overlay class after trigger click: {overlay_class}")
        box = await overlay.bounding_box()
        print(f"AI overlay bbox: {box}")

        # AI card thinking->detail reveal
        ai_card = await page.query_selector('[data-demo-ai-card]')
        await ai_card.click()
        await page.wait_for_timeout(100)
        thinking = await page.query_selector('[data-demo-ai-thinking]')
        thinking_hidden = await thinking.get_attribute('hidden')
        print(f"AI thinking hidden right after click: {thinking_hidden}")
        await page.wait_for_timeout(700)
        detail = await page.query_selector('[data-demo-ai-detail]')
        detail_hidden = await detail.get_attribute('hidden')
        print(f"AI detail hidden after 700ms: {detail_hidden}")

        # non-coach AI tab -> toast
        ai_tab = await page.query_selector('[data-demo-ai-tab]')
        await ai_tab.click()
        await page.wait_for_timeout(200)
        toast = await page.query_selector('.demo-toast.show')
        print(f"Toast shown after AI tab click: {toast is not None}")

        # close overlay
        close_btn = await page.query_selector('[data-demo-ai-overlay-close]')
        await close_btn.click()
        await page.wait_for_timeout(300)
        overlay_class2 = await overlay.get_attribute('class')
        print(f"AI overlay class after close: {overlay_class2}")

        await browser.close()

        print("\n=== CONSOLE/PAGE ERRORS ===")
        if errors:
            for e in errors:
                print(e)
        else:
            print("None")

asyncio.run(main())
