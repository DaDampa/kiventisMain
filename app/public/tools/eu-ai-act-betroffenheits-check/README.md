# EU AI Act Art. 4 Betroffenheits-Check

Region: DACH
Erzeugt: 2026-10-15T11:00:38+00:00
Status: ENTWURF

## Testwerte

1) Anbieter + Betreiber, KI aktiv, 10 Personen, Dokumentation 20%, kein Plan, Schwelle 60 → Score ~94 (Handlungsbedarf hoch)
2) Betreiber, kein KI-Einsatz, Dokumentation 80%, Plan vorhanden, Schwelle 60 → Score ~6 (Grundlage prüfen)
3) Unklare Rolle, KI aktiv, 0 Personen angegeben, Dokumentation 0%, kein Plan, Schwelle 60 → Score ~40 (Klärung der Rolle nötig)

## README

## Zweck
Kurz-Selbsteinschätzung für Anbieter und Betreiber von KI-Systemen, ob Art. 4 der EU-KI-Verordnung (KI-Kompetenzpflicht) auf den Betrieb zutrifft und wo Handlungsbedarf besteht.

## Formeln (offen im Code)
```
Score = (Anbieter × Gewicht_Anbieter) + (Betreiber × Gewicht_Betreiber)
      + (KI_Einsatz × Gewicht_KI) + (Hochrisiko × Gewicht_Hochrisiko)
      - (Dokumentation_% × Abzugsfaktor_Doku)
      + (Kein_Plan × Abzug_Fehlender_Plan)
```
Jede Variable ist ein sichtbares Eingabefeld. Keine festen rechtlichen Schwellenwerte.

## Annahmen
- Art. 4 gilt ab 02.02.2025 für Anbieter und Betreiber.
- Keine Mindestmitarbeiterzahl in der Verordnung definiert.
- „Ausreichend“ und konkrete Prozentwerte für Nachweise sind nicht kodifiziert – daher Eingabefelder mit Hinweis „(bitte prüfen)“.
- Die Gewichtungen (Standardwerte 30 / 30 / 20 / 15 / 0.3 / 20) dienen nur der Orientierung und sind editierbar.

## Quellen-Hinweise
- EU KI-Verordnung (EU) 2024/1689, Art. 4 (Kompetenz).
- Keine externen Studien oder erfundenen Förderhöhen verwendet.
- Für verbindliche Rechtseinschätzung: Fachanwalt für IT- und Datenschutzrecht konsultieren.

