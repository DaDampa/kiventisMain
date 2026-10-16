# Implementierungsplan: EU AI Act Artikel 4 Haftungs- & Bußgeld-Rechner (Honeypot, DIN-Zertifikat & Viral-Loop)

Dieser Plan beschreibt die vollständige Umsetzung des „Angst-Hebels“ nach Artikel 4 des EU AI Acts (Verordnung EU 2024/1689 – gesetzliche Pflicht zur KI-Kompetenz für alle gewerblichen Betreiber) als interaktiver Compliance-Honeypot für KMU-Geschäftsführer unter `/ai-act-audit`.

---

## 1. Beschlossene Anforderungen & Klarstellungen

Basierend auf den Antworten aus der Klärungsphase:
- **Routing & Zugriff:** Eigenständige Standalone-Ansicht unter `/ai-act-audit` (inklusive direkter Browser-URL-Unterstützung, History API und prominentem Navigations-Link in Desktop- & Mobile-Navbar).
- **Zertifikatsdesign:** Hochoffizielles deutsches DIN-Audit-Zertifikat (angelehnt an TÜV- / Bundesanzeiger- / ISO-Zertifikate) mit Guilloche-Sicherheitsrahmen, Bundesadler-artigem Siegel, Verifikations-Prüfnummer (`KIV-ACT4-2025-XXXXX`), digitalem Verifikations-QR-Code und Druck-Optimierung.
- **Funnel & Lead-Sequenzierung:** Sofortige, ungefilterte Risikoscore- & Bußgeld-Vorschau in Knallrot für maximalen Dringlichkeits-Effekt – gefolgt von einer Lead-Erfassung für den vollständigen 8-seitigen DIN-Audit-Prüfbericht und die Enthaftungs-Checkliste.
- **Viral-Loop:** 
  1. 1-Klick-LinkedIn-Zertifikats-Share („Ich bin offiziell zertifiziert nach EU AI Act Art. 4 durch KIVENTIS“).
  2. Embed-fähiges Website-Trust-Badge („KI-kompetenter Betrieb nach EU AI Act Art. 4“) für den Footer von KMU-Kunden mit vorschriftsmäßigem `rel="nofollow"`-Link (kein unnatürliches SEO-Widget-Penalty, maximaler Klick-Traffic & Social Proof).

---

## 2. Geplante Komponenten & Architektur

### 2.1 Datenmodell & Rechenlogik (`src/data/aiActAuditData.ts`)
- **5 zielgerichtete Diagnosefragen für Geschäftsführer:**
  1. **KI-Nutzung im Betrieb:** Nutzen Mitarbeiter ChatGPT, DeepL, Copilot, Midjourney oder sonstige Tools im Arbeitsalltag? (inklusive Dunkelziffer/Shadow-AI)
  2. **Schulungsnachweise (Art. 4):** Gibt es dokumentierte, personengebundene Schulungs- und Befähigungsnachweise nach Art. 4 EU AI Act für alle Beschäftigten?
  3. **Geschäftsgeheimnisse & Kundendaten:** Werden vertrauliche Daten, Kundeninformationen oder interner Quellcode in KI-Dienste eingegeben?
  4. **Betriebliche Richtlinie (AI Policy):** Gibt es eine formal verabschiedete KI-Betriebsvereinbarung mit Urheberrechts- und Prompting-Regeln?
  5. **Mitarbeiteranzahl mit KI-Zugriff:** Skalierungsfaktor für Bußgeld- und Schadensersatzrisiko (1–10, 11–50, 51–250, 250+ Beschäftigte).
- **Haftungs- & Bußgeld-Kalkulator:**
  - Berechnung des persönlichen Geschäftsführer-Haftungsrisikos (§ 43 GmbHG / § 93 AktG bei Organisationsverschulden).
  - Behördliche Bußgelddimension nach EU AI Act Art. 99 (bis zu 15 Mio. € bzw. 3% des weltweiten Vorjahresumsatzes) und DSGVO Art. 83 (bis zu 20 Mio. € bzw. 4%).
  - Risikostufen: *Akut gefährdet (Rot)*, *Bedingt haftbar (Orange)*, *Teilkonform (Gelb)*, *Rechtskonform & Dokumentiert (Grün)*.
  - Zweisprachige Unterstützung (`de` und `en`).

### 2.2 DIN-Audit-Zertifikat-Komponente (`src/components/audit/DinCertificate.tsx`)
- **Optik & Behörden-Flair:**
  - DIN A4-Proportionen mit filigranem Guilloche-Sicherheitsrahmen.
  - Geprägtes goldenes/dunkelblaues Prüfstellen-Siegel („PRÜFSTELLE FÜR BETRIEBLICHE KI-COMPLIANCE · VERORDNUNG (EU) 2024/1689“).
  - Fälschungssichere Prüfnummer (z. B. `KIV-ACT4-2025-88412-DE`).
  - QR-Code mit Live-Verifikations-URL (`kiventis.com/ai-act-audit?verify=KIV-ACT4...`).
  - Offizieller Zertifizierungstext gemäß Art. 4 Abs. 1 EU AI Act (AI Literacy & menschliche Aufsicht).
  - Unterschriftenfeld mit digitalem Zeitstempel und Prüfstempel.
  - Interaktiver Namens- & Firmenname-Editor zur sofortigen Live-Vorschau.
  - Vollständige Druckoptimierung (`@media print`) für PDF-Export direkt aus dem Browser.

### 2.3 Viral-Loop Hub & Website-Badge (`src/components/audit/AuditBadgeGenerator.tsx`)
- **1-Klick-LinkedIn-Share:** Vorbereiteter URL-Parameter für LinkedIn mit optimiertem Text, Hashtags und Nachweis-Link.
- **Website-Badge für Kunden-Websites:**
  - Modernes SVG/HTML-Badge: „KI-kompetenter Betrieb nach EU AI Act Art. 4 · Nachgewiesen durch KIVENTIS“.
  - Varianten: Dunkler Hintergrund, Heller Hintergrund, Sepia/Warm.
  - HTML-Embed-Snippet mit 1-Klick-Kopieren.
  - **SEO-Absicherung:** Explizite Attribute `rel="nofollow noopener noreferrer"` gemäß Google Webmaster Guidelines gegen Widget-Link-Spam.

### 2.4 Hauptseite `/ai-act-audit` (`src/components/audit/AiActAuditPage.tsx`)
- **Hero-Bereich:** Hohe Dringlichkeit, klarer rechtlicher Rahmen („Seit 2. Februar 2025 gesetzlich verpflichtend für alle EU-Betriebe“).
- **Interaktiver 5-Fragen-Audit-Flow:** Schrittweise Beantwortung mit Fortschrittsanzeige und Zwischenerklärungen.
- **Sofortige Risikoauswertung in Knallrot:**
  - Tachometer-/Balken-Risikoprofil.
  - Konkrete Bußgeld- und Schadensersatz-Szenarien (z. B. Urheberrechtsverletzung durch ungeschultes Personal, DSGVO-Datenabfluss, Organhaftung).
- **Gated Lead-Capture & Sofort-PDF-Bericht:**
  - Download des DIN-Audit-Prüfberichts und der Enthaftungs-Checkliste gegen Eingabe von Name, Firma, E-Mail und Position.
  - Speicherung im bestehenden Lead-System / `localStorage` (kompatibel mit `AdminLeadModal`).
- **1-Klick-Lösungsangebot:**
  - Direkter Absprung in das Kiventis Article 4 Inhouse- oder Online-Training mit vorgefertigter Paket-Vorauswahl.
- **Interaktiver Zertifikats-Tester & Viral-Badge-Generator.**
- **Rechtsquellen-Akkordeon:** Zitate von Art. 4, Art. 99 EU AI Act, § 43 GmbHG und DSGVO Art. 83.

### 2.5 Navigation & App-Integration (`src/App.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`)
- **`src/App.tsx`:**
  - Routen-Erkennung für `/ai-act-audit` (sowie Hash `#ai-act-audit`).
  - Rendering der `AiActAuditPage` mit Theme- und Sprach-Unterstützung.
  - Aktualisierung der dynamischen Metatags (`title`, `description`, `canonical`, OpenGraph und Schema.org `TechArticle`/`SoftwareApplication`).
- **`src/components/Navbar.tsx`:**
  - Ergänzung eines prominenten Navigationspunkts „EU AI Act Audit“ mit Shield-Icon in Desktop-Nav, Mobilmenü und Flyout-Menü.
- **`src/components/Footer.tsx`:**
  - Direkter Link und Vertrauenshinweis im Footer.

---

## 3. Schritt-für-Schritt Umsetzungsreihenfolge

1. **Schritt 1: Daten & Berechnungen (`src/data/aiActAuditData.ts`)**
   - Definition von Fragen, Scoring, Bußgeld-Modell und Übersetzungen (DE/EN).
2. **Schritt 2: DIN-Zertifikat (`src/components/audit/DinCertificate.tsx`)**
   - Gestaltung des Behörden-Looks mit Guilloche, Siegel, QR-Code, Prüfnummer und Druck-CSS.
3. **Schritt 3: Viral-Loop & Badge-Generator (`src/components/audit/AuditBadgeGenerator.tsx`)**
   - LinkedIn-Share und HTML-Badge-Generator mit `rel="nofollow"`.
4. **Schritt 4: Haupt-Audit-Seite (`src/components/audit/AiActAuditPage.tsx`)**
   - 5-Fragen-Assistent, Risikorechner, Lead-Capture-Formular, 1-Klick-Buchungsabsprung und Gesetzesquellen.
5. **Schritt 5: App-Routing & SEO-Integration (`src/App.tsx`, `src/utils/seo.ts`)**
   - Routen-Handling für `/ai-act-audit`, Zurück-Navigation und Metatags.
6. **Schritt 6: Navbar & Footer Verlinkung (`src/components/Navbar.tsx`, `src/components/Footer.tsx`)**
   - Menü-Einträge und Aktions-Buttons einbauen.
7. **Schritt 7: Verifikation & Tests**
   - TypeScript-Kompilierung (`compile_applet`), ESLint (`lint_applet`), Funktions- und Designprüfung.

---

## 4. Verifikationsplan

### Automatisierte Tests:
- `compile_applet`: Sicherstellen fehlerfreier TypeScript-Kompilierung.
- `lint_applet`: Validierung von Syntax, Imports und Formatierung.

### Manuelle Testszenarien:
1. **Routing:** Aufruf von `/ai-act-audit` im Browser, Umschalten auf Startseite und zurück via Navbar-Link.
2. **Audit-Durchlauf:**
   - Alle 5 Fragen durchklicken mit High-Risk-Antworten -> Rotes Haftungsergebnis und Bußgelder bis zu 15 Mio. € bzw. 3% werden korrekt kalkuliert.
   - Low-Risk-Antworten testen -> Geringeres Risiko, aber Hinweis auf zwingende Art. 4 Nachweispflicht.
3. **Lead-Capture & PDF-Bericht:**
   - Formular ausfüllen -> Freischaltung des DIN-Prüfberichts, Eintrag im Admin-Leads-Speicher.
4. **Zertifikats-Vorschau:**
   - Eigenen Firmennamen eingeben -> Live-Aktualisierung im DIN-Zertifikat mit Prüfstempel und QR-Code.
   - Druckfunktion aufrufen -> Sauberes DIN A4-Druckbild ohne Navigation oder Web-Elemente.
5. **Viral-Loop:**
   - LinkedIn-Button klicken -> Prüfen, ob Share-URL korrekt mit Text belegt ist.
   - HTML-Badge Code kopieren -> Sicherstellen, dass `rel="nofollow"` im Snippet enthalten ist.
6. **Sprache & Theme:**
   - Wechsel zwischen Deutsch und Englisch sowie Dark und Sepia prüfen.
