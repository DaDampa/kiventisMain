# Was umgesetzt wurde – Empfehlung, Befund, Änderung

Bezug: Analyse der Live-Seite vom 21.10.2026 (ausgeliefertes HTML `index-DPBphvhZ.js`, letzte Änderung 19.10.2026).
Jede Zeile nennt den Befund, die Änderung und wo sie liegt.

## 1. Texte

| Befund | Änderung |
|---|---|
| H1 englisch auf deutschem Markt, grammatisch falsch: „Seamless ERP Integration & Autonomous AI Workflows for Mid-Sized Enterprise.“ | Neue H1: „Ihr Team baut seine ERP-Werkzeuge selbst. Wir zeigen ihm, wie.“ – deutsch, konkret, mit Subjekt und Prädikat |
| Meta-Description: „Boost your processes, save license costs. Praxisnahe B2B …“ (zwei Sprachen in einem Satz) | Eine deutsche Description mit Zahlen und Nutzen (152 Zeichen), Title auf 61 Zeichen gekürzt; kein Agentur-Slogan mehr |
| Buzzword-Stapel: „Seamless“, „Autonomous“, „Intelligent“ (3×), „Architecture for Enterprise AI …“ | Alle Adjektive aus den Überschriften entfernt. H2s benennen jetzt den Inhalt: „Warum KI im Mittelstand nach dem Pilotprojekt endet“, „Festpreise, keine Tagessätze“ |
| Sprachmix in Überschriften: „Zero Data Retention & Kein Modelltraining“, „EU AI Act Art. 4 & DSGVO Compliance“ | Durchgehend Deutsch; englische Fachbegriffe nur dort, wo sie im Markt etabliert sind (ERP, RAG, On-Premise, AI Act) |
| Interner SEO-Jargon auf der Seite: H2 „Häufige Fragen für Geschäftsführung & IT-Leitung (GEO / FAQ)“ | „Häufige Fragen aus Erstgesprächen“ – ohne Klammer, ohne Suchmaschinen-Sprache |
| Rechtsaussagen: „100 % audit-sicher“, „100 % rechtskonform“, „garantiert ROI“ | Präzisiert: „Schulungsnachweise nach Art. 4“ statt Zertifizierungsgarantie; „Erfahrungswert, keine Zusage“ bei den 4,5–7 Stunden (im Seitenfuß als †) |

## 2. Beweise

| Befund | Änderung |
|---|---|
| 0 `<img>` im ausgelieferten HTML: keine Fotos, Screenshots, Logos | Zwei echte Produkt-Screenshots sind eingebaut: eigene Sektion „Werkzeuge“ mit Bild, Beschreibung, Einsatzbereich und Links auf die laufenden Demos, dazu `alt`-Texte, feste Maße gegen Layoutsprünge und Lazy-Loading beim zweiten Bild. Fotos von Menschen fehlen noch → TODO in README |
| Claims ohne Beleg („100 %“, „0 Byte“, „250+“, „78 %“) | Die zwei echten, in Ihrem Bundle bereits vorhandenen Fallstudien sind jetzt Hauptbeweis: Sondermaschinenbau 240 FTE und technischer Großhandel 140 FTE, mit Vorher-Nachher-Tabellen und Original-Zitaten |
| Kein einziger Name, keine Region, kein Zitat | Regionen und Branchen stehen in jeder Fallstudie, Zitate mit Rollenbezeichnung. Kundennamen nennen wir laut Text „auf Anfrage“ |
| Kein Impressum, kein Datenschutzlink (Pflicht nach § 5 DDG) | `impressum.html` und `datenschutz.html` angelegt, inklusive Haftungs- und Kennzahlenhinweis. Rechtliche Pflichtangaben stehen als markierter Platzhalter |

## 3. Struktur

| Befund | Änderung |
|---|---|
| 17 Sektionen, 20.360 px Scrollhöhe, doppelte Case-Sektionen (`#cases` und `#beispiele`) | 7 Blöcke auf 7.300 px (−64 %): Ausgangslage, Programme, Nachweise, Preise, Ablauf, Fragen, Kontakt. `#cases` und `#beispiele` sind zu einer Sektion „Nachweise“ zusammengelegt |
| Vier Programme, aber ohne Reihenfolge und ohne Preis | Als nummerierter Kundenpfad mit Preis, Dauer und Teilnehmerzahl je Stufe |
| Preise versteckt bzw. nur im Rechner | Preistabelle mit den echten Beträgen (999 / 4.900 / 9.250 €), Laufzeit, Teilnehmerkreis, Leistungsumfang, MwSt.-Hinweis |
| Personas-Tabs, Rechner, Insights, Blueprints, Security, Process, Pricing als eigene Startseiten-Blöcke | Auf der Startseite entfernt. Der interaktive ROI-Rechner ist der einzige inhaltliche Verlust → Vorschlag: als eigene Seite `/rechner/` weiterbetreiben und aus der Preistabelle verlinken |

## 4. Technik

| Befund | Änderung |
|---|---|
| `?lang=en` lieferte byte-identisches deutsches HTML | Echte englische Seite unter `/en/`, `hreflang` korrekt (de, en, x-default), nginx-Redirect `?lang=en` → `/en/` |
| hreflang-Cluster `de-AT` und `de-CH` zeigten auf dieselbe URL | Entfernt; Regionen sind über `areaServed` im JSON-LD abgebildet |
| Startseite ohne Inhalt im HTML (471 Wörter im Shell, Rest im JS-Bundle) | Vollständig vorgerendertes HTML, **0 KB JavaScript**, keine Hydration |
| Schriften von `fonts.googleapis.com` (IP-Übertragung an Google) | Inter und Newsreader liegen lokal in `assets/fonts/`, inklusive `preload`. Keine externen Requests mehr; CSP ohne Ausnahmen möglich |
| `analytics.kiventis.com/script.js` auf jeder Seite | Auf den neuen Seiten nicht eingebunden. Wenn Statistik gewünscht ist: selbst gehostet und nur mit Einwilligung (§ 25 TDDDG) |
| Design: `#090D14` + Teal-Gradient + Glass + Outfit/Jakarta/JetBrains-Mono | Papierweiß `#f6f3ec`, Tinte `#16181c`, ein Akzent `#0e5d54`, zwei Schriften (Newsreader für Überschriften, Inter für Text), keine Gradienten, keine Blur-Effekte, keine Schatten, keine Badge-Kaskade. Daten in Tabellen statt in Karten |
| Social-Preview und Touch-Icon trugen noch die alte Optik (dunkel, Teal-Gradient) | `og-image.png` (1200×630) und `apple-touch-icon.png` im neuen Design neu erzeugt, reproduzierbar über `tools/make_images.py` |
| Kein Impressum im Footer, US-LLC ohne deutsche Anschrift | Rechtliches steht im Footer jeder Seite; auf der Impressum-Seite als Pflichtangabe vorbereitet |

## 5. Was bewusst nicht automatisch geändert wurde

- **Kundennamen, Fotos, Telefonnummer, Firmenanschrift**: nicht erfindbar. Alle Stellen sind im HTML markiert (Kommentar `TODO:` oder sichtbarer Platzhalter in eckigen Klammern).
- **Die übrigen Seiten** (Insights-Artikel, `/beispiele`, Rechner) laufen weiter über die bestehende React-App. Für sie gilt die neue Typografie noch nicht.
- **Die Zahl „78 %“** aus der alten Startseite wurde nicht übernommen, weil im Bundle keine Quelle steht. Wenn es eine belastbare Quelle gibt, gehört sie mit Fußnote zurück auf die Seite.

## Nachtrag: zwei weitere Demos (Umsetzung der Prompts)

| Anforderung | Umsetzung |
|---|---|
| RFBIBL00-Satzarten BGR00 / BBK00 / BBS00 | `beispiele/fi-rfbibl00/app.js`, Layout als Konstante `LAYOUT` und auf der Seite dokumentiert |
| Soll/Haben-Prüfung vor Export | Prüfung je Beleg, Saldo in der Statusleiste, Export wird bei Differenz blockiert |
| Modus BI / DI / CT, UTF-8 / ISO-8859-1, Komma/Punkt | Umschalter in der Werkzeugleiste, Kodierung beim Download angewendet |
| Rohdatenvorschau mit Satzart-Highlighting | rechter Bereich, Zeilennummern, JetBrains Mono, hell/dunkel je Satzart |
| Shortcuts F2, Strg/Cmd+E | global, ohne Konflikt mit den Formularfeldern |
| Konditionen PR00 / K004 / K005 / RA00 / RB00 | elf Demo-Sätze mit Staffeln, inklusive absichtlich fehlerhafter Sätze |
| Export A/B/C (BVD, COND_A04 flat + XML, CSV) | vier Generatoren, Umschaltung über „Exportformat“ |
| Plausibilitätsprüfungen und Statusbadges | Datumsbereich, Pflichtschlüssel, Staffelreihenfolge; VALIDE / PRÜFUNG / GESPERRT |
| Shortcuts F2, F4, Enter | inkl. Inline-Edit der Preise in der Tabelle |
| Industrielles High-Density-Layout | `border-radius: 0`, keine Schatten, 26-px-Zeilen, `tabular-nums` |
| Einbindung in die Startseite | zwei neue Werkzeug-Einträge mit Screenshots aus der laufenden Demo (DE + EN), Zahl „zwei Werkzeuge“ → „vier“ |
