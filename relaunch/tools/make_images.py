#!/usr/bin/env python3
"""Erzeugt og-image.png (1200x630) und apple-touch-icon.png (180x180) im neuen Design.

Aufruf: PLAYWRIGHT_BROWSERS_PATH=... python kiventis-relaunch/tools/make_images.py
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent

OG_HTML = """<!doctype html><html lang="de"><head><meta charset="utf-8">
<link rel="stylesheet" href="assets/fonts.css">
<style>
  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:#f6f3ec; color:#16181c;
         font-family:'Inter',sans-serif; padding:72px 80px; position:relative;
         display:flex; flex-direction:column; justify-content:space-between; }
  .top { display:flex; align-items:center; gap:16px; }
  .mark { width:44px; height:44px; }
  .name { font-size:26px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; }
  h1 { font-family:'Newsreader',serif; font-weight:500; font-size:78px; line-height:1.05;
       letter-spacing:-.02em; max-width:14ch; }
  .rule { height:2px; background:#0e5d54; width:120px; margin:34px 0 26px; }
  .sub { font-size:26px; color:#2b2f35; max-width:34ch; line-height:1.35; }
  .foot { display:flex; justify-content:space-between; font-size:20px; color:#5c626b;
          border-top:1px solid #d7d0c1; padding-top:22px; }
</style></head><body>
  <div class="top"><img class="mark" src="assets/mark.svg" alt=""><span class="name">Kiventis</span></div>
  <div>
    <h1>Ihr Team baut seine ERP-Werkzeuge selbst.</h1>
    <div class="rule"></div>
    <p class="sub">Vibe Coding, Art.&nbsp;4 EU AI Act und On-Premise-KI für den Mittelstand.</p>
  </div>
  <div class="foot"><span>25 Jahre ERP-Beratung · 250+ Projekte</span><span>kiventis.com</span></div>
</body></html>"""


def main() -> None:
    og_path = ROOT / "assets" / "_og.html"
    og_path.write_text(OG_HTML, encoding="utf-8")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        page.goto(og_path.as_uri(), wait_until="networkidle")
        page.wait_for_timeout(300)
        page.screenshot(path=str(ROOT / "og-image.png"))
        page.close()

        icon = browser.new_page(viewport={"width": 180, "height": 180}, device_scale_factor=1)
        icon.set_content(
            '<body style="margin:0;background:#16181c;display:grid;place-items:center;width:180px;height:180px">'
            '<img src="' + (ROOT / "assets" / "mark.svg").as_uri() + '" width="180" height="180" style="display:block"></body>'
        )
        icon.wait_for_timeout(200)
        icon.screenshot(path=str(ROOT / "apple-touch-icon.png"))
        browser.close()
    og_path.unlink()
    print("og-image.png und apple-touch-icon.png erzeugt")


if __name__ == "__main__":
    main()
