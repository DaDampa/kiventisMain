# KIVENTIS – statische Startseite (Relaunch-Paket)

**Repository:** github.com/DaDampa/kiventisMain, dieser Ordner: `relaunch/`.
Auf dem VPS: `git clone https://github.com/DaDampa/kiventisMain.git` und dann
`./kiventisMain/relaunch/deploy/vps-install.sh ./kiventisMain/relaunch /var/www/kiventis --apply`.

Neu gebaute, vorgerenderte Startseite für www.kiventis.com: deutsch unter `/`, englisch unter `/en/`,
dazu Impressum und Datenschutz. Kein JavaScript, keine externen Requests, zwei lokale Schriften.

```
kiventis-relaunch/
├── index.html            Startseite DE (0 KB JS, vollständig im HTML)
├── en/index.html         Startseite EN (echte Übersetzung, nicht dieselbe Datei)
├── impressum.html        Pflichtangaben – Platzhalter ausfüllen
├── datenschutz.html      Datenschutzhinweise – Platzhalter ausfüllen
├── llms.txt              Faktenbasis, Aussagen zu 100 %-Claims korrigiert
├── og-image.png          Social-Preview im neuen Design (1200 x 630)
├── apple-touch-icon.png  Icon für iOS (180 x 180)
├── assets/
│   ├── styles.css        komplettes Design, ~14 KB, keine Frameworks
│   ├── fonts.css         @font-face, lokal
│   ├── fonts/            Inter + Newsreader (woff2, latin/latin-ext)
│   ├── mark.svg          Wortmarke, flach
│   ├── favicon.svg
│   ├── shot-bom.webp     Screenshot BOM Designer Pro (1600 px)
│   ├── shot-rechnung.webp Screenshot Rechnungsprüfer (1600 px)
│   ├── shot-fi-export.webp  Screenshot Buchungsexport (gerendert aus der Demo)
│   └── shot-konditionen.webp Screenshot Konditionsexport (gerendert aus der Demo)
├── favicon.svg           auch im Webroot, weil die Seiten /favicon.svg aufrufen
├── beispiele/
│   ├── index.html        Übersicht der vier Demos
│   ├── assets/demo.css   dichtes ERP-Design (0 Radius, 26 px Zeilen)
│   ├── fi-rfbibl00/      Demo 1: FI-Buchungsexport (index.html + app.js)
│   └── preise-konditionen/ Demo 2: Konditionsexport (index.html + app.js)
├── deploy/nginx-kiventis.conf
├── tools/verify.py       Prüfskript (Playwright)
├── qa/                   Screenshots + verify-report.json
└── CHANGES.md            Empfehlung → Befund → Änderung
```

## Lokal ansehen

```bash
cd kiventis-relaunch
python3 -m http.server 8080
# http://127.0.0.1:8080/  und  http://127.0.0.1:8080/en/
```

## Prüfen

```bash
PLAYWRIGHT_BROWSERS_PATH=$PWD/../.pw-browsers ../.venv/bin/python tools/verify.py
PLAYWRIGHT_BROWSERS_PATH=$PWD/../.pw-browsers ../.venv/bin/python tools/verify_demos.py
```

`verify.py` prüft die Seiten, `verify_demos.py` prüft die Demo-Logik: Satzlängen, Saldo,
Kodierung, Dateiinhalte, Filter, Tastenkürzel – jeweils unter dem CSP-Header aus der nginx-Konfiguration.

Prüft: HTTP-Status, genau eine H1 je Seite, Konsolenfehler, fehlgeschlagene Requests, defekte Bilder,
fehlende `alt`-Texte, horizontalen Überlauf bei 1440 px und 390 px, alle internen Links.
Aktueller Stand: alle Prüfungen bestanden, Startseite 7.307 px hoch (vorher 20.360 px).

## Deployment

1. **Backup**: bisheriges `index.html` im Webroot nach `app.html` umbenennen (das ist die React-App,
   sie versorgt weiter alle Unterseiten wie `/beispiele` oder die Insights-Artikel).
2. Dateien kopieren: `index.html`, `en/`, `impressum.html`, `datenschutz.html`, `llms.txt`,
   `beispiele/`, `favicon.svg`, `og-image.png`, `apple-touch-icon.png` sowie aus `assets/`
   `styles.css`, `fonts.css`, `fonts/`, `mark.svg`, `shot-*.webp`.
   Das Verzeichnis `assets/` enthält bereits die gehashten Bundles der App – die Dateinamen
   kollidieren nicht. `beispiele/index.html` liegt vor den App-Routen, die alten Demos
   (`/beispiele/bom-designer`, `/beispiele/rechnungspruefer`) laufen unverändert in der App.
3. `deploy/nginx-kiventis.conf` in den bestehenden Server-Block übernehmen (TLS-Block bleibt),
   `nginx -t`, reload. Die Zeile `add_header_inherit merge;` sorgt dafür, dass die CSP auch in
   den Locations mit eigenem Cache-Header gilt (nötig ab nginx 1.29.3, auf dem Server läuft 1.31.7).
   Meldet `nginx -t` „unknown directive add_header_inherit“, diese Zeile entfernen und die
   Sicherheits-Header in den betroffenen Locations wiederholen.
4. Danach prüfen: `curl -sI https://www.kiventis.com/?lang=en` muss `301 → /en/` liefern;
   `curl -s https://www.kiventis.com/ | grep -c '<h1'` muss `1` ergeben.

**Rollback**: `app.html` wieder zu `index.html` machen, Block „Statische Startseite“ entfernen, reload.

## Was noch echte Daten braucht

Nichts davon ist erfunden – deshalb steht es als Platzhalter drin:

- [ ] **Impressum**: Firmenname, Anschrift, Vertretungsberechtigte, Registerdaten, USt-IdNr., Telefon.
      Zusätzlich prüfen lassen, ob für die US-Gesellschaft ein Zustellungsbevollmächtigter nach
      § 5 Abs. 3 DDG nötig ist.
- [ ] **Telefonnummer** in der Kontaktkarte (`index.html`, Kommentar `TODO: Telefonnummer`). Für den
      Mittelstand ist eine erreichbare Nummer ein stärkeres Signal als jede Formulierung.
- [x] **Screenshots** von BOM Designer Pro und Rechnungsprüfer sind eingesetzt: eigene Sektion
      „Werkzeuge“ mit Verlinkung auf die Live-Demos `/beispiele/bom-designer` und
      `/beispiele/rechnungspruefer`. Ausgangsdateien (2566 × 1836 px) liegen in `../images/`,
      im Paket liegen WebP-Fassungen mit 1600 px Breite.
- [ ] **Inhalt der Screenshots prüfen**: Bitte kurz gegenlesen, ob echte Kundennamen, Preise oder
      Personendaten zu sehen sind. Ich kann Bildinhalte mit diesem Modell nicht lesen und habe
      deshalb weder etwas geschwärzt noch zugeschnitten.
- [ ] **Zwei bis drei Fotos**: Team, Workshop-Situation, realer Arbeitsplatz. Ohne Gesichter bleibt die
      Seite kopflastig.
- [ ] **Kundennamen und Logos** für die beiden Fallstudien, falls freigegeben. Aktuell anonymisiert,
      im Text mit „Kundennamen nennen wir auf Anfrage“ abgedeckt.
- [ ] **Enddatum der 999-€-Aktion** eintragen (steht als „nennen wir im Angebot“ drin).
- [ ] **Quelle für „78 %“**, falls die Zahl zurück soll. Ohne Quelle ist sie der angreifbarste Satz der
      alten Seite und wurde deshalb weggelassen.

## Die beiden neuen Demos

Beide laufen ohne Build, ohne Framework und ohne Netzwerkzugriff: eine HTML-Datei,
eine JS-Datei, gemeinsam genutzt wird nur `beispiele/assets/demo.css`.

**`/beispiele/fi-rfbibl00/` – FI-Buchungsexport**
- Drei Belege (Kreditor, Debitor, Umbuchung) mit Soll/Haben-Prüfung; Beträge sind in der
  Tabelle anklickbar, ein schiefer Betrag blockiert den Export sofort.
- Satzarten `BGR00` (41 Zeichen), `BBK00` (72), `BBS00` bzw. `BBSEG` (75). Das komplette
  Feldlayout steht auf der Seite unter „Feldlayout der Satzarten“ und im Code in `LAYOUT`.
- Optionen: Batch-Input / Direct Input / Call Transaction, festes Satzformat oder TAB-getrennt,
  UTF-8 oder ISO-8859-1, Dezimalzeichen Komma oder Punkt.
- Shortcuts: `F2` validieren, `Strg`/`⌘`+`E` herunterladen, `↑`/`↓` Beleg wechseln.

**`/beispiele/preise-konditionen/` – SD-Preislisten & Konditionen**
- Elf Konditionssätze (PR00, K004, K005, RA00, RB00) mit Staffelpreisen, Gültigkeiten und
  Statusbadges; zwei absichtlich fehlerhafte Sätze zeigen die Prüfung.
- Export als Flatfile `BVD00`/`BVD01`/`BVD02`, als IDoc `COND_A04` (Segmentdarstellung oder XML)
  oder als CSV. Gesperrte und fehlerhafte Sätze werden nicht exportiert.
- Shortcuts: `F2` validieren, `F4` Staffeln/Details, `Enter` Preis bearbeiten,
  `Strg`/`⌘`+`E` herunterladen.

**Wichtig für den Einsatz**: Die Satzlayouts sind dokumentiert und an einer Stelle im Code
änderbar. Vor einem echten Import gegen ein SAP-System müssen sie mit dem dort installierten
RFBIBL00- bzw. COND_A04-Layout abgeglichen werden (Release und Customizing unterscheiden sich).
Die IDoc-Ausgabe ist eine lesbare Segmentdarstellung; die Transportdatei mit Satzlängen erzeugt
üblicherweise die Middleware.

**CSP beachten**: Die Seiten laufen unter `style-src 'self'`. Inline-`<style>`-Blöcke und
`style="…"`-Attribute werden blockiert – Stile gehören in `demo.css` oder `index.css`.

## Weiteres Werkzeug ergänzen

Die Werkzeug-Sektion verträgt beliebig viele Einträge – Bild und Text wechseln automatisch die Seite.

1. Screenshot vorbereiten (skaliert auf 1600 px, schreibt WebP, gibt den HTML-Block aus):
   ```bash
   python3 tools/prepare_tool_image.py <screenshot.png> <name>
   ```
2. Den ausgegebenen Block in `index.html` unter dem letzten `<article class="tool">` einsetzen.
   Jedes zweite Element bekommt die Klasse `tool--flip` – dann steht das Bild abwechselnd links und rechts.
3. Denselben Block in `en/index.html` mit englischem Text einsetzen.
4. Im Code stehen in beiden Dateien fertige Platzhalter-Vorlagen als HTML-Kommentar
   (`VORLAGE FÜR EIN WEITERES WERKZEUG`).

## Bewusste Entscheidungen

- **Kein JavaScript**: alles vorgerendert, keine Hydration, keine Font-CDNs, kein Analytics-Skript.
  Damit entfällt auch der Grund, warum `?lang=en` bisher nicht funktionierte.
- **Interaktiver ROI-Rechner** ist von der Startseite verschwunden. Er war ein eigener Abschnitt mit
  eigener Logik; Vorschlag: als `/rechner/` behalten und aus der Preistabelle verlinken.
- **Insights-Artikel, `/beispiele`, Personas-Tabs** laufen weiter in der bestehenden React-App. Für ein
  einheitliches Bild sollten sie mittelfristig dieselbe Typografie bekommen.
- **Preise stehen offen auf der Seite.** Wenn Sie das nicht wollen, ist die Alternative, sie
  hinter das Erstgespräch zu legen – aber dann muss die Seite einen anderen Beweis tragen (Namen, Logos,
  Zitate).

## Nächste Ausbaustufen

1. Fotos und echte Screenshots einbauen (größter Effekt pro Stunde Arbeit).
2. Rechner als Unterseite mit Verlinkung aus der Preistabelle.
3. Blog-Artikel auf dieselbe Typografie umstellen oder neu als statische Seiten bauen.
4. Vier Wochen nach Launch: Scrolltiefe und Anfragen pro Woche messen, dann entscheiden, ob die
   Preistabelle bleibt.
