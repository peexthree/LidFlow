from playwright.sync_api import sync_playwright

def test_homepage_loads(page):
    page.goto("http://localhost:5000")

    # Wait for the initial Hero text to appear
    page.wait_for_selector('text="ХВАТИТ ТЕРЯТЬ ЛИДОВ. ВРЕМЯ 10X ПРОДАЖ."', timeout=30000)

    # Scroll down to the TrueFocus component
    # We will locate the text "10X АВТОМАТИЗАЦИЯ" to ensure we're looking at the correct section
    page.evaluate("window.scrollTo(0, 1500)")
    page.wait_for_timeout(2000)

    # Take a screenshot
    page.screenshot(path="/home/jules/verification.png")
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
