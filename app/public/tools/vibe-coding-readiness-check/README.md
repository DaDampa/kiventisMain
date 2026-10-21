# Vibe-Coding-Readiness-Check

Region: DACH
Erzeugt: 2026-10-17T13:47:32+00:00
Status: ENTWURF

## Testwerte

Beispiel 1 (hoch): KI=9, Prompt=8, Zeit=15, Daten=8, Sicherheit=6, Infra=9 | Standardgewichte | Schwellen 75/45 -> Ergebnis ca. 82 (Startklar)
Beispiel 2 (mittel): KI=5, Prompt=4, Zeit=8, Daten=5, Sicherheit=5, Infra=5 | Standardgewichte | Schwellen 75/45 -> Ergebnis ca. 50 (Mit Begleitung)
Beispiel 3 (niedrig): KI=2, Prompt=1, Zeit=3, Daten=3, Sicherheit=8, Infra=2 | Standardgewichte | Schwellen 75/45 -> Ergebnis ca. 28 (Grundlagen nötig)

## README

## Zweck
Der Vibe-Coding-Readiness-Check ist ein Self-Assessment für B2B-Teams, die einschätzen möchten, ob sie eigene KI-Tools (z. B. interne Automatisierungen, Prototypen oder Produkt-Features) ohne externe Agentur entwickeln können. Er dient als Lead-Magnet für KI-Kompetenz-Trainings und liefert sofort ein transparentes Ergebnis.

## Formeln (offen im Code)
- **Score** = Σ (Dimensionᵢ × Gewichtᵢ) / (10 × Σ Gewichtᵢ) × 100
- **Dimensionen**: KI-Grundwissen, Prompt-Engineering, Entwicklerzeit, Datenqualität, Sicherheit/Compliance, Infrastruktur (jeweils 0–10).
- **Gewichte**: Sechs editierbare Felder (Standardwerte als Vorschlag, nicht als wissenschaftliche Wahrheit).
- **Schwellenwerte**: Zwei editierbare Felder für die Kategorien „Startklar“ und „Mit Begleitung“.

## Annahmen
- Es existieren **keine universell validierten wissenschaftlichen Benchmarks** für „Vibe-Coding-Readiness“. Daher sind alle Gewichte und Schwellenwerte als Eingabefelder mit dem Hinweis „(bitte prüfen)“ markiert.
- Die Entwicklerzeit wird als absolute Stundenangabe (0–40) erfasst, nicht als Prozentwert, um realistische Kapazitätsplanung zu ermöglichen.
- Sicherheit/Compliance wird als Komplexitätsfaktor (0–10) bewertet, nicht als binäre Ja/Nein-Frage, da regulatorische Anforderungen stark variieren.

## Quellen-Hinweise
- Keine spezifischen Studien oder Förderhöhen werden zitiert, da diese für das Konzept „Vibe-Coding-Readiness“ nicht standardisiert vorliegen.
- Nutzer sollten eigene interne Benchmarks, Branchenberichte (z. B. Bitkom, McKinsey Global Institute) oder unternehmensinterne Skill-Matrix-Daten als Referenz für die Schwellenwerte heranziehen.
- Das Tool ersetzt keine Rechts-, Steuer- oder strategische Unternehmensberatung.

## Nutzung
Öffnen Sie die HTML-Datei in einem Browser. Alle Eingaben wirken sofort; kein Server, kein Tracking, kein Gating.
