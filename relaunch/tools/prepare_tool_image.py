#!/usr/bin/env python3
"""Bereitet einen Screenshot für die Werkzeug-Sektion vor.

Aufruf:
    python3 tools/prepare_tool_image.py <bild.png> [name]

Beispiel:
    python3 tools/prepare_tool_image.py ~/Desktop/tool.png zolltarif
    → schreibt assets/shot-zolltarif.webp (1600 px Breite) und gibt den
      fertigen HTML-Block aus, der nur noch in index.html eingesetzt wird.

Ohne Namensangabe wird der Dateiname verwendet. Das Skript schneidet nichts ab
und ändert keine Farben – es skaliert nur und entfernt die Transparenz.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
TARGET_WIDTH = 1600


def slugify(value: str) -> str:
    value = value.lower().replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "werkzeug"


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    src = Path(sys.argv[1]).expanduser()
    if not src.exists():
        print(f"Datei nicht gefunden: {src}")
        return 1

    name = slugify(sys.argv[2] if len(sys.argv) > 2 else src.stem)
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        background = Image.new("RGBA", im.size, (255, 253, 248, 255))
        im = Image.alpha_composite(background, im)
    im = im.convert("RGB")

    w, h = im.size
    if w > TARGET_WIDTH:
        im = im.resize((TARGET_WIDTH, round(h * TARGET_WIDTH / w)), Image.LANCZOS)
    width, height = im.size

    dest = ASSETS / f"shot-{name}.webp"
    im.save(dest, "WEBP", quality=88, method=6)
    print(f"geschrieben: {dest.relative_to(ROOT)}  ({width} × {height} px, {dest.stat().st_size // 1024} KB)\n")
    print("HTML-Block für index.html (Reihenfolge beachten: jedes zweite Element bekommt tool--flip):\n")
    print(
        f'''      <article class="tool tool--flip">
        <figure class="tool__shot">
          <a class="shot" href="/assets/shot-{name}.webp" aria-label="NAME in voller Größe öffnen">
            <img src="/assets/shot-{name}.webp" width="{width}" height="{height}"
                 alt="Screenshot von NAME: was auf dem Bild zu sehen ist"
                 loading="lazy" decoding="async">
          </a>
        </figure>
        <div class="tool__text">
          <h3>NAME</h3>
          <p>Zwei Sätze: was das Werkzeug tut und welches Problem es löst. Zahlen nur mit Quelle.</p>
          <p class="tool__meta">Eingesetzt in: ABTEILUNG · Anbindung an SYSTEM</p>
          <a href="/beispiele/ROUTE">Live-Demo ansehen →</a>
        </div>
      </article>'''
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
