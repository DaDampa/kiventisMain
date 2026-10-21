#!/usr/bin/env python3
"""Funktionstest der beiden neuen Demos (RFBIBL00-Export, Konditionsexport).

Prüft nicht das Aussehen, sondern die Rechen- und Exportlogik:
Satzlängen, Saldo, Kodierung, Dateiinhalt, Filter, Tastenkürzel und
den Produktions-CSP-Header aus deploy/nginx-kiventis.conf.

Aufruf:
    PLAYWRIGHT_BROWSERS_PATH=../.pw-browsers ../.venv/bin/python tools/verify_demos.py
"""

from __future__ import annotations

import socket
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
CONF = (ROOT / "deploy/nginx-kiventis.conf").read_text(encoding="utf-8")
CSP = CONF.split('Content-Security-Policy "')[1].split('"')[0]
problems: list[str] = []
checks = 0


def check(condition: bool, message: str) -> None:
    global checks
    checks += 1
    if not condition:
        problems.append(message)


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class Quiet(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        pass


def main() -> int:
    port = free_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), Quiet)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{port}"

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1500, "height": 950}, accept_downloads=True)

        def add_csp(route):
            resp = route.fetch()
            headers = dict(resp.headers)
            headers["content-security-policy"] = CSP
            route.fulfill(response=resp, headers=headers)

        ctx.route("**/*", add_csp)

        def new_page():
            page = ctx.new_page()
            page.errors = []
            page.on("console", lambda m: page.errors.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: page.errors.append(str(e)))
            return page

        # ---------------- Demo 1: RFBIBL00 ----------------
        page = new_page()
        page.goto(base + "/beispiele/fi-rfbibl00/", wait_until="networkidle")
        page.wait_for_timeout(300)
        check("VALIDIERT" in page.inner_text("#statusBadge"), "FI: Startstatus ist nicht VALIDIERT")
        check(page.inner_text("#kpiSaldo") == "0,00", "FI: Saldo zu Beginn nicht 0,00")

        lines = page.eval_on_selector_all(".line__txt", "els => els.map(e => e.textContent)")
        check(len(lines) == 12, f"FI: erwartet 12 Sätze, erzeugt {len(lines)}")
        widths = {len(l) for l in lines}
        check(widths == {41, 72, 75}, f"FI: Satzlängen {sorted(widths)} statt 41/72/75")
        check(lines[0].startswith("BGR00") and lines[1].startswith("BBK00"), "FI: Kopfzeilen falsch")
        check("0000041500" in lines[2], "FI: Kontonummer nicht 10-stellig aufgefüllt")
        check("00000004200,00" in lines[2], "FI: Betrag nicht rechtsbündig formatiert")

        # Saldo-Prüfung: Betrag verändern -> Export muss blockiert werden
        page.click("#posBody tr:first-child td.editable")
        page.fill("#posBody input", "4.300,00")
        page.keyboard.press("Enter")
        page.wait_for_timeout(200)
        check("PRÜFUNG" in page.inner_text("#statusBadge"), "FI: unausgeglichener Beleg nicht erkannt")
        downloads: list[str] = []
        page.on("download", lambda d: downloads.append(d.suggested_filename))
        page.keyboard.press("Control+e")
        page.wait_for_timeout(400)
        check(not downloads, "FI: Datei trotz Saldo-Fehler heruntergeladen")
        page.click("#posBody tr:first-child td.editable")
        page.fill("#posBody input", "4.200,00")
        page.keyboard.press("Enter")
        page.wait_for_timeout(200)
        check("VALIDIERT" in page.inner_text("#statusBadge"), "FI: Status nach Korrektur nicht zurückgesetzt")

        # Export und Inhalt
        with page.expect_download() as dl:
            page.keyboard.press("Control+e")
        data = Path(dl.value.path()).read_bytes()
        text = data.decode("utf-8")
        rows = [r for r in text.split("\r\n") if r]
        check(len(rows) == 12, f"FI: Datei enthält {len(rows)} Zeilen")
        check(text.count("BBK00") == 3, "FI: nicht drei Belegköpfe in der Datei")
        total_debit = sum(
            float(r[17:30].replace(",", ".")) for r in rows
            if r.startswith("BBS00") and r[5:7] in ("40", "01")
        )
        total_credit = sum(
            float(r[17:30].replace(",", ".")) for r in rows
            if r.startswith("BBS00") and r[5:7] in ("50", "31")
        )
        check(abs(total_debit - total_credit) < 0.005, "FI: Datei ist nicht ausgeglichen")

        # Direct Input -> BBSEG, ISO-8859-1 -> Umlaut als Einzelbyte
        page.select_option("#mode", "DI")
        page.select_option("#encoding", "ISO-8859-1")
        page.wait_for_timeout(200)
        check(page.eval_on_selector_all(".line__txt", "e => e[2].textContent").startswith("BBSEG"),
              "FI: Direct Input erzeugt kein BBSEG")
        with page.expect_download() as dl:
            page.keyboard.press("Control+e")
        latin = Path(dl.value.path()).read_bytes()
        check(b"Erl\xf6se" in latin, "FI: ISO-8859-1-Kodierung nicht angewendet")
        check(page.errors == [], f"FI: Konsolenfehler {page.errors}")
        page.close()

        # ---------------- Demo 2: Konditionen ----------------
        page = new_page()
        page.goto(base + "/beispiele/preise-konditionen/", wait_until="networkidle")
        page.wait_for_timeout(300)
        check(page.inner_text("#kpiRows") == "11", "Konditionen: nicht elf Sätze geladen")
        badges = page.eval_on_selector_all("#condBody .badge", "els => els.map(e => e.textContent)")
        check(badges.count("GESPERRT") == 1, "Konditionen: gesperrter Satz nicht erkannt")
        check(badges.count("PRÜFUNG") == 3, f"Konditionen: {badges.count('PRÜFUNG')} Fehlersätze statt 3")

        bvd = page.eval_on_selector_all(".line__txt", "els => els.map(e => e.textContent)")
        check(any(l.startswith("BVD00") for l in bvd), "Konditionen: kein BVD00-Kopf")
        check(any(l.startswith("BVD02") for l in bvd), "Konditionen: keine Staffelsätze BVD02")
        check(all(len(l) == 89 for l in bvd if l.startswith("BVD01")), "Konditionen: BVD01 nicht 89 Zeichen")
        joined = "".join(bvd)
        check("MAT-200002" not in joined, "Konditionen: Satz mit ungültigem Datumsbereich wurde exportiert")
        check("MAT-100003" not in joined, "Konditionen: gesperrter Satz wurde exportiert")

        # Preis editieren
        page.keyboard.press("Enter")
        page.wait_for_timeout(150)
        page.fill('td[data-field="kbetr"] input', "133,00")
        page.keyboard.press("Enter")
        page.wait_for_timeout(250)
        cell = page.eval_on_selector_all('#condBody tr:nth-child(1) td', "t => t[6].textContent")
        check(cell.strip() == "133,00", f"Konditionen: Preisänderung nicht übernommen ({cell!r})")

        # F4-Detail
        page.keyboard.press("F4")
        page.wait_for_timeout(150)
        check("Zugriffsfolge" in page.inner_text("#detail"), "Konditionen: F4 zeigt keine Details")

        for fmt, ext in (("IDOC", "txt"), ("XML", "xml"), ("CSV", "csv"), ("BVD", "txt")):
            page.select_option("#format", fmt)
            page.wait_for_timeout(250)
            with page.expect_download() as dl:
                page.keyboard.press("Control+e")
            name = dl.value.suggested_filename
            check(name.endswith("." + ext), f"Konditionen: {fmt} liefert {name}")
        check(page.errors == [], f"Konditionen: Konsolenfehler {page.errors}")
        page.close()

        # ---------------- Übersicht und Mobil ----------------
        page = new_page()
        page.goto(base + "/beispiele/", wait_until="networkidle")
        links = page.eval_on_selector_all("a.go", "els => els.map(e => e.getAttribute('href'))")
        check(len(links) == 4, f"Übersicht: {len(links)} statt 4 Demos verlinkt")
        check(page.errors == [], f"Übersicht: Konsolenfehler {page.errors}")
        page.close()

        for path in ("/beispiele/", "/beispiele/fi-rfbibl00/", "/beispiele/preise-konditionen/", "/", "/en/"):
            mobile = browser.new_context(viewport={"width": 390, "height": 844}).new_page()
            mobile.goto(base + path, wait_until="networkidle")
            over = mobile.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            check(over <= 0, f"{path}: horizontaler Überlauf auf 390 px ({over} px)")
            mobile.close()

        browser.close()

    server.shutdown()
    print(f"{checks} Prüfungen ausgeführt.")
    if problems:
        print("\nPROBLEME:")
        for p in problems:
            print(" -", p)
        return 1
    print("Alle Demo-Prüfungen bestanden.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
