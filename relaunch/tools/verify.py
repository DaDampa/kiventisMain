#!/usr/bin/env python3
"""Prüft die statische KIVENTIS-Seite lokal.

Startet einen HTTP-Server im Projektordner, lädt alle Seiten in Chromium,
sammelt Konsolenfehler, fehlgeschlagene Requests, prüft Überschriften,
interne Links, Responsive-Überlauf und schreibt Screenshots nach qa/.

Aufruf:  .venv/bin/python kiventis-relaunch/tools/verify.py
"""
from __future__ import annotations

import json
import re
import socket
import subprocess
import sys
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
QA = ROOT / "qa"
PAGES = [
    "/",
    "/en/",
    "/impressum.html",
    "/datenschutz.html",
    "/beispiele/",
    "/beispiele/fi-rfbibl00/",
    "/beispiele/preise-konditionen/",
]
# Routen, die von der bestehenden React-App ausgeliefert werden und im lokalen
# Vorschauordner bewusst nicht existieren.
SPA_PREFIXES = ("/demos", "/wissen", "/insights")
# Demo-Seiten, die als statische Dateien im Paket liegen (Rest von /beispiele/ ist App)
STATIC_DEMOS = (
    "/beispiele/",
    "/beispiele/fi-rfbibl00/",
    "/beispiele/preise-konditionen/",
    "/beispiele/assets/",
)
VIEWPORTS = {"desktop": (1440, 900), "mobile": (390, 844)}


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        pass


def serve(port: int) -> ThreadingHTTPServer:
    srv = ThreadingHTTPServer(("127.0.0.1", port), QuietHandler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def main() -> int:
    QA.mkdir(exist_ok=True)
    port = free_port()
    srv = serve(port)
    base = f"http://127.0.0.1:{port}"
    report: dict = {"base": base, "pages": {}, "problems": []}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        for name, (w, h) in VIEWPORTS.items():
            ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
            for path in PAGES:
                page = ctx.new_page()
                errors: list[str] = []
                failed: list[str] = []
                page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
                page.on("pageerror", lambda e: errors.append(str(e)))
                page.on("requestfailed", lambda r: failed.append(r.url))
                resp = page.goto(base + path, wait_until="networkidle")
                page.wait_for_timeout(250)
                # durchscrollen, damit lazy geladene Bilder wirklich ankommen
                page.evaluate(
                    """async () => {
                        const step = window.innerHeight * 0.8;
                        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
                            window.scrollTo(0, y);
                            await new Promise(r => requestAnimationFrame(r));
                        }
                        window.scrollTo(0, 0);
                    }"""
                )
                page.wait_for_timeout(400)

                info = page.evaluate(
                    """() => {
                        const de = document.documentElement;
                        const h1 = [...document.querySelectorAll('h1')].map(e=>e.textContent.trim());
                        const h2 = [...document.querySelectorAll('h2')].map(e=>e.textContent.trim());
                        const links = [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'));
                        const imgs = [...document.images].map(i=>({src:i.getAttribute('src'), w:i.naturalWidth}));
                        const txt = document.body.innerText;
                        return {
                            title: document.title,
                            lang: de.lang,
                            h1, h2, links, imgs,
                            overflow: de.scrollWidth - de.clientWidth,
                            height: de.scrollHeight,
                            words: txt.trim().split(/\\s+/).filter(Boolean).length,
                            todos: (txt.match(/TODO|\\[Firmenname|lorem|Platzhalter/gi)||[]).length,
                            missingAlt: [...document.images].filter(i=>!i.hasAttribute('alt')).length,
                            font: getComputedStyle(document.querySelector('h1')).fontFamily,
                        };
                    }"""
                )

                key = f"{name}{path}"
                info["status"] = resp.status if resp else None
                info["console_errors"] = errors
                info["failed_requests"] = failed
                report["pages"][key] = info

                if resp is None or resp.status != 200:
                    report["problems"].append(f"{key}: HTTP-Status {info['status']}")
                if len(info["h1"]) != 1:
                    report["problems"].append(f"{key}: {len(info['h1'])} H1-Elemente")
                if info["overflow"] > 1:
                    report["problems"].append(f"{key}: horizontaler Überlauf {info['overflow']}px")
                if errors:
                    report["problems"].append(f"{key}: Konsolenfehler {errors}")
                if failed:
                    report["problems"].append(f"{key}: fehlgeschlagene Requests {failed}")
                broken = []
                for i in info["imgs"]:
                    src = i["src"] or ""
                    if src.startswith(base):
                        r = page.request.get(src)
                        if r.status != 200:
                            broken.append(f"{src.replace(base, '')} ({r.status})")
                    elif src.startswith("/") or src.startswith("assets/"):
                        r = page.request.get(base + "/" + src.lstrip("/"))
                        if r.status != 200:
                            broken.append(f"{src} ({r.status})")
                info["rendered_images"] = sum(1 for i in info["imgs"] if i["w"])
                if broken:
                    report["problems"].append(f"{key}: defekte Bilder {broken}")
                if info["missingAlt"]:
                    report["problems"].append(f"{key}: {info['missingAlt']} Bild(er) ohne alt")

                page.screenshot(path=str(QA / f"{name}{path.strip('/').replace('/', '-') or 'home'}.png"), full_page=True)
                page.close()
            ctx.close()

        # interne Links prüfen (nur Dateipfade, eine Viewportgröße reicht)
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()
        page.goto(base + "/", wait_until="networkidle")
        targets = page.evaluate(
            "() => [...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href))]"
        )
        internal = [t for t in targets if t.startswith(base) and "#" not in t.split("/")[-1]]
        report["checked_links"] = []
        report["spa_routes"] = []
        for url in internal:
            path_only = url.replace(base, "")
            is_app_route = path_only.startswith(SPA_PREFIXES) or (
                path_only.startswith("/beispiele") and path_only not in STATIC_DEMOS
            )
            if is_app_route:
                report["spa_routes"].append(path_only)
                continue
            r = page.request.get(url)
            report["checked_links"].append({"url": url.replace(base, ""), "status": r.status})
            if r.status >= 400:
                report["problems"].append(f"interner Link {url.replace(base, '')} -> {r.status}")
        ctx.close()
        browser.close()

    srv.shutdown()
    (QA / "verify-report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Server: {base}")
    for key, info in report["pages"].items():
        print(
            f"{key:34s} status={info['status']} h1={len(info['h1'])} h2={len(info['h2'])} "
            f"wörter={info['words']:4d} höhe={info['height']:5d}px overflow={info['overflow']} "
            f"fonts={info['font'].split(',')[0]}"
        )
    print(f"interne Links geprüft: {len(report['checked_links'])}")
    if report["problems"]:
        print("\nPROBLEME:")
        for p_ in report["problems"]:
            print(" -", p_)
        return 1
    print("\nAlle Prüfungen bestanden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
