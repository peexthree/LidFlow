from playwright.sync_api import sync_playwright

def test_homepage_loads(page):
    page.goto("http://localhost:5000")

    # Wait for the TrueFocus text to appear, indicating that the page has loaded and hydrated
    page.wait_for_selector('text="Автоматизируй или умри. Телеграм-боты для бизнеса."', timeout=15000)

    # Scroll down a bit to see the TrueFocus component
    page.evaluate("window.scrollBy(0, 1500)")
    page.wait_for_timeout(2000) # wait for animations

    # Take a screenshot
    page.screenshot(path="/home/jules/verification.png", full_page=True)
    print("Screenshot saved to /home/jules/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            test_homepage_loads(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/error.png")
            print("Error screenshot saved to /home/jules/error.png")
        finally:
            browser.close()
