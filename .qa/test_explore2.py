import asyncio
from playwright.async_api import async_playwright

URL = "https://3000-imjiqnu6a3theittt7acs-8f57ffe2.sandbox.novita.ai/explore"

async def goto_panel(page, key):
    el = await page.query_selector(f'[data-demo-sidebar-target="{key}"]')
    await el.click()
    await page.wait_for_timeout(150)

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width':1400,'height':1000})
        page.on("console", lambda msg: errors.append(f"CONSOLE[{msg.type}]: {msg.text}") if msg.type == "error" else None)
        page.on("pageerror", lambda exc: errors.append(f"PAGEERROR: {exc}"))

        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-demo-root]')

        # --- Command: task toggle + bell badge ---
        await goto_panel(page, 'command')
        bell_before = await page.text_content('[data-demo-bell-badge]')
        task = await page.query_selector('[data-demo-task]')
        await task.click()
        await page.wait_for_timeout(100)
        done_class = await task.get_attribute('class')
        bell_after = await page.text_content('[data-demo-bell-badge]')
        print(f"Command task toggle: class={done_class} bell {bell_before}->{bell_after}")

        # --- Pipeline: lead card -> slideover ---
        await goto_panel(page, 'pipeline')
        lead = await page.query_selector('[data-demo-lead="knesley"]')
        await lead.click()
        await page.wait_for_timeout(300)
        slideover = await page.query_selector('[data-demo-slideover]')
        so_class = await slideover.get_attribute('class')
        detail = await page.query_selector('[data-lead-detail="knesley"]')
        detail_hidden = await detail.get_attribute('hidden')
        print(f"Pipeline slideover: class={so_class} knesley-detail-hidden={detail_hidden}")
        close = await page.query_selector('[data-demo-slideover-close]')
        await close.click()
        await page.wait_for_timeout(200)
        so_class2 = await slideover.get_attribute('class')
        print(f"Pipeline slideover after close: class={so_class2}")

        # --- Leads: handle row ---
        await goto_panel(page, 'leads')
        row = await page.query_selector('[data-demo-panel="leads"] [data-demo-handle]')
        tag_before = await page.text_content('[data-demo-panel="leads"] [data-demo-handle-tag]')
        await row.click()
        await page.wait_for_timeout(100)
        tag_after = await (await row.query_selector('[data-demo-handle-tag]')).text_content()
        handled_class = await row.get_attribute('class')
        print(f"Leads handle row: tag {tag_before} -> {tag_after}, class={handled_class}")

        # --- Clients: expand row ---
        await goto_panel(page, 'clients')
        row = await page.query_selector('[data-demo-panel="clients"] [data-demo-expand]')
        detail = await row.query_selector('.demo-row-detail')
        hidden_before = await detail.get_attribute('hidden')
        await row.click()
        await page.wait_for_timeout(100)
        hidden_after = await detail.get_attribute('hidden')
        row_class = await row.get_attribute('class')
        print(f"Clients expand row: hidden {hidden_before} -> {hidden_after}, class={row_class}")

        # --- Budget: expand + labor math ---
        await goto_panel(page, 'budget')
        row = await page.query_selector('[data-demo-panel="budget"] [data-demo-expand]')
        await row.click()
        await page.wait_for_timeout(100)
        detail_text = await (await row.query_selector('.demo-row-detail')).text_content()
        print(f"Budget labor detail revealed: {detail_text[:60]}...")

        # --- Invoicing: handled label override ---
        await goto_panel(page, 'invoicing')
        row = await page.query_selector('[data-demo-panel="invoicing"] [data-demo-handle]')
        await row.click()
        await page.wait_for_timeout(100)
        tag_text = await (await row.query_selector('[data-demo-handle-tag]')).text_content()
        print(f"Invoicing handled label: {tag_text}")

        # --- Dispatch: expand crew row ---
        await goto_panel(page, 'dispatch')
        row = await page.query_selector('[data-demo-panel="dispatch"] [data-demo-expand]')
        await row.click()
        await page.wait_for_timeout(100)
        detail_text = await (await row.query_selector('.demo-row-detail')).text_content()
        print(f"Dispatch crew detail: {detail_text[:60]}...")

        # --- Work Orders: new clickable tasks ---
        await goto_panel(page, 'workorders')
        tasks = await page.query_selector_all('[data-demo-panel="workorders"] [data-demo-task]')
        print(f"Work Orders clickable tasks found: {len(tasks)}")
        if tasks:
            await tasks[0].click()
            await page.wait_for_timeout(100)
            cls = await tasks[0].get_attribute('class')
            print(f"  after click class={cls}")

        # --- Client Portal: disable/enable toggle ---
        await goto_panel(page, 'clientportal')
        user_row = (await page.query_selector_all('[data-demo-portal-status]'))[0]
        status_before = await user_row.get_attribute('data-demo-portal-status')
        toggle_btn = await user_row.query_selector('[data-demo-portal-toggle]')
        btn_text_before = await toggle_btn.text_content()
        await toggle_btn.click()
        await page.wait_for_timeout(100)
        status_after = await user_row.get_attribute('data-demo-portal-status')
        btn_text_after = await toggle_btn.text_content()
        tag_text = await (await user_row.query_selector('[data-demo-portal-tag]')).text_content()
        print(f"Portal toggle: status {status_before}->{status_after}, btn '{btn_text_before}'->'{btn_text_after}', tag={tag_text}")
        # check row didn't also do something weird (no expand class since portal rows aren't expand type)
        row_class = await user_row.get_attribute('class')
        print(f"  row class after toggle: {row_class}")

        # --- AAR: handled label override ---
        await goto_panel(page, 'aar')
        row = await page.query_selector('[data-demo-panel="aar"] [data-demo-handle]')
        await row.click()
        await page.wait_for_timeout(100)
        tag_text = await (await row.query_selector('[data-demo-handle-tag]')).text_content()
        print(f"AAR handled label: {tag_text}")

        # --- Search filter ---
        await goto_panel(page, 'command')
        search = await page.query_selector('[data-demo-search]')
        await search.fill('knesley')
        await page.wait_for_timeout(200)
        # go to pipeline while search term set - check searchable filtering behavior persists visually
        hidden_count = len(await page.query_selector_all('[data-demo-searchable].demo-search-hide'))
        visible_count = len(await page.query_selector_all('[data-demo-searchable]:not(.demo-search-hide)'))
        print(f"Search 'knesley': hidden={hidden_count} visible={visible_count}")
        await search.fill('zzzznomatch')
        await page.wait_for_timeout(200)
        empty = await page.query_selector('[data-demo-search-empty]')
        empty_hidden = await empty.get_attribute('hidden')
        print(f"Search no-match banner hidden attr: {empty_hidden}")
        await search.fill('')
        await page.wait_for_timeout(200)

        await browser.close()
        print("\n=== ERRORS ===")
        print(errors if errors else "None")

asyncio.run(main())
