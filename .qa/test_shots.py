import asyncio
from playwright.async_api import async_playwright

URL = "https://3000-imjiqnu6a3theittt7acs-8f57ffe2.sandbox.novita.ai/explore"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop full view
        page = await browser.new_page(viewport={'width':1400,'height':1100})
        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_selector('[data-demo-root]')
        await page.screenshot(path="/home/user/webapp/.qa/desktop_command.png", full_page=False)

        # Click through to a few panels for visual check
        for key, fname in [('pipeline','desktop_pipeline.png'),('clients','desktop_clients.png'),
                            ('budget','desktop_budget.png'),('dispatch','desktop_dispatch.png'),
                            ('clientportal','desktop_portal.png')]:
            el = await page.query_selector(f'[data-demo-sidebar-target="{key}"]')
            await el.click()
            await page.wait_for_timeout(200)
            await page.screenshot(path=f"/home/user/webapp/.qa/{fname}", full_page=False)

        # Expand a row in clients for visual
        el = await page.query_selector('[data-demo-sidebar-target="clients"]')
        await el.click()
        await page.wait_for_timeout(150)
        row = await page.query_selector('[data-demo-panel="clients"] [data-demo-expand]')
        await row.click()
        await page.wait_for_timeout(150)
        await page.screenshot(path="/home/user/webapp/.qa/desktop_clients_expanded.png", full_page=False)

        await browser.close()

asyncio.run(main())
