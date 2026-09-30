import React from 'react';
import { Language, Theme } from '../types';
import {
  Layers,
  FileCheck2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Cpu,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface CustomerDemosProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: (packageTitle?: string) => void;
  onLaunchStandalone?: (demoId: 'bom-designer' | 'rechnungspruefer') => void;
}

export const CustomerDemos: React.FC<CustomerDemosProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
  onLaunchStandalone,
}) => {
  const isSepia = theme === 'sepia';

  return (
    <section
      id="beispiele"
      className={`py-24 border-b transition-colors duration-200 ${
        isSepia
          ? 'border-[#E7DFD3] bg-[#F4EFE6] text-[#18130E]'
          : 'border-white/[0.08] bg-[#070A10] text-slate-200'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div
            className={`flex items-center gap-2 text-xs font-mono font-semibold tracking-wider mb-3 ${
              isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
            }`}
          >
            <Cpu className="h-4 w-4 shrink-0" />
            <span>
              {lang === 'de'
                ? 'LIVE-SHOWCASE & KUNDEN-WERKZEUGE (VIBE CODING)'
                : 'INTERACTIVE CUSTOMER TOOL SHOWCASE (VIBE CODING)'}
            </span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {lang === 'de' ? (
              <>
                Echte Tools aus der Praxis:{' '}
                <span className={isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>
                  In Tagen statt Monaten gebaut
                </span>
              </>
            ) : (
              <>
                Real Production Micro-Apps:{' '}
                <span className={isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>
                  Built in Days Instead of Months
                </span>
              </>
            )}
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed ${
              isSepia ? 'text-[#5C5042]' : 'text-slate-300'
            }`}
          >
            {lang === 'de'
              ? 'Diese operativen Hilfstools wurden von Fachexperten unserer Kunden (Maschinenbau, Einkauf, Disposition) nach 2 Tagen Vibe-Coding-Kurs eigenständig entwickelt. Klicken Sie auf „Vollbild-App öffnen“, um die jeweilige Anwendung im vollwertigen Original-Design mit realistischen MOK-Industriedaten direkt zu bedienen.'
              : 'These internal tools were built independently by client domain specialists after 2 days of Vibe Coding training. Click "Open Fullscreen App" to launch and test each application in its authentic production workspace with live MOK data.'}
          </p>
        </div>

        {/* Showcase Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ---------------------------------------------------- */}
          {/* Card 1: BOM Designer Pro                             */}
          {/* ---------------------------------------------------- */}
          <div
            className={`rounded-2xl border p-7 flex flex-col justify-between transition-all shadow-md group ${
              isSepia
                ? 'border-[#E0D5C3] bg-[#FCFAF7] hover:border-[#0D9488]/60 hover:shadow-lg'
                : 'border-white/[0.1] bg-[#0E1524] hover:border-[#14B8A6]/40 shadow-xl'
            }`}
          >
            <div className="space-y-5">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`flex items-center gap-2 text-xs font-mono font-semibold ${
                    isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>FERTIGUNG & MASCHINENBAU</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold border ${
                    isSepia
                      ? 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'
                      : 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20'
                  }`}
                >
                  SAP S/4HANA ODATA SYNC
                </span>
              </div>

              <div>
                <h3
                  className={`font-display text-2xl font-bold transition-colors ${
                    isSepia
                      ? 'text-[#18130E] group-hover:text-[#0D9488]'
                      : 'text-white group-hover:text-[#14B8A6]'
                  }`}
                >
                  BOM Designer Pro
                </h3>
                <div
                  className={`text-xs font-mono mt-1 ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Baukasten- & Stücklisten-Kalkulator für Arbeitsvorbereitung (AV)
                </div>
              </div>

              {/* Story / Key Facts Box */}
              <div
                className={`rounded-xl border p-4 space-y-2 text-xs ${
                  isSepia
                    ? 'border-[#E6DDD0] bg-[#F2EDE2]'
                    : 'border-white/[0.06] bg-[#090D15]'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-semibold ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  <Building2
                    className={`h-3.5 w-3.5 ${
                      isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                    }`}
                  />
                  <span>Praxisfall: Hofmann Präzisions-Systeme (140 MA)</span>
                </div>
                <p
                  className={`leading-relaxed ${
                    isSepia ? 'text-[#574B3C]' : 'text-slate-300'
                  }`}
                >
                  {lang === 'de'
                    ? 'Gebaut von: Leiter AV & Konstruktion nach 2 Tagen Vibe-Coding-Kurs. Entwicklungsdauer: 32 Stunden (Agentur-Angebot lag bei 7.500,- €).'
                    : 'Built by: Head of Work Preparation after 2 days of Vibe Coding. Dev time: 32h (Agency quote was €7,500).'}
                </p>
                <div
                  className={`flex items-center gap-1.5 font-mono text-[11px] font-bold pt-1 ${
                    isSepia ? 'text-[#0F766E]' : 'text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Messbare Ersparnis: 6,5 Stunden bei jeder Neu-Kalkulation</span>
                </div>
              </div>

              {/* Features List */}
              <div
                className={`space-y-2 text-xs font-mono ${
                  isSepia ? 'text-[#5C5042]' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>Interaktiver Baugruppenbaum mit Unterpositionen & Normteilen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>Herstellkosten-Kalkulation (COGS) inkl. Gemeinkosten & Stundensätze</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>Live OData REST ERP-Payload-Generierung für SAP & Business Central</span>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div
              className={`mt-8 pt-5 border-t flex items-center justify-between gap-4 ${
                isSepia ? 'border-[#E6DDD0]' : 'border-white/[0.08]'
              }`}
            >
              <span
                className={`text-[11px] font-mono ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                Eigenständige Applikation mit MOK-Industriedaten
              </span>

              <button
                onClick={() => onLaunchStandalone?.('bom-designer')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm ${
                  isSepia
                    ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-[#0D9488]/20'
                    : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14] shadow-[#14B8A6]/20'
                }`}
              >
                <span>Vollbild-App öffnen</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Card 2: Rechnungsprüfer & Diskrepanz-Radar           */}
          {/* ---------------------------------------------------- */}
          <div
            className={`rounded-2xl border p-7 flex flex-col justify-between transition-all shadow-md group ${
              isSepia
                ? 'border-[#E0D5C3] bg-[#FCFAF7] hover:border-[#0D9488]/60 hover:shadow-lg'
                : 'border-white/[0.1] bg-[#0E1524] hover:border-[#14B8A6]/40 shadow-xl'
            }`}
          >
            <div className="space-y-5">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`flex items-center gap-2 text-xs font-mono font-semibold ${
                    isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                  }`}
                >
                  <FileCheck2 className="h-4 w-4" />
                  <span>EINKAUF & DISPOSITION</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold border ${
                    isSepia
                      ? 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'
                      : 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20'
                  }`}
                >
                  3-WEGE-ABGLEICH (SOLL/IST)
                </span>
              </div>

              <div>
                <h3
                  className={`font-display text-2xl font-bold transition-colors ${
                    isSepia
                      ? 'text-[#18130E] group-hover:text-[#0D9488]'
                      : 'text-white group-hover:text-[#14B8A6]'
                  }`}
                >
                  ERP Rechnungsprüfer & Radar
                </h3>
                <div
                  className={`text-xs font-mono mt-1 ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Automatisierter Abgleich von Eingangsrechnungen gegen Bestellungen
                </div>
              </div>

              {/* Story / Key Facts Box */}
              <div
                className={`rounded-xl border p-4 space-y-2 text-xs ${
                  isSepia
                    ? 'border-[#E6DDD0] bg-[#F2EDE2]'
                    : 'border-white/[0.06] bg-[#090D15]'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-semibold ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  <Building2
                    className={`h-3.5 w-3.5 ${
                      isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                    }`}
                  />
                  <span>Praxisfall: Schultheiss Komponenten (85 MA)</span>
                </div>
                <p
                  className={`leading-relaxed ${
                    isSepia ? 'text-[#574B3C]' : 'text-slate-300'
                  }`}
                >
                  {lang === 'de'
                    ? 'Gebaut von: Mitarbeiterin Einkauf in 16 Stunden Vibe Coding. Ersparnis: 12 Stunden wöchentliche manuelle Belegprüfung.'
                    : 'Built by: Procurement Specialist in 16h Vibe Coding. Saves 12h weekly manual check.'}
                </p>
                <div
                  className={`flex items-center gap-1.5 font-mono text-[11px] font-bold pt-1 ${
                    isSepia ? 'text-[#0F766E]' : 'text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Erkennt unberechtigte Teuerungszuschläge & Mengenüberhänge</span>
                </div>
              </div>

              {/* Features List */}
              <div
                className={`space-y-2 text-xs font-mono ${
                  isSepia ? 'text-[#5C5042]' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>Posteingangs-Übersicht mit automatischer Ampelbewertung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>3-Wege-Positionsprüfung (Bestellt vs. Geliefert vs. Berechnet)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span>1-Klick Freigabelauf nach SAP FI/CO & Belastungsanzeigen-Generator</span>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div
              className={`mt-8 pt-5 border-t flex items-center justify-between gap-4 ${
                isSepia ? 'border-[#E6DDD0]' : 'border-white/[0.08]'
              }`}
            >
              <span
                className={`text-[11px] font-mono ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                Eigenständige Applikation mit MOK-Belegfällen
              </span>

              <button
                onClick={() => onLaunchStandalone?.('rechnungspruefer')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm ${
                  isSepia
                    ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-[#0D9488]/20'
                    : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14] shadow-[#14B8A6]/20'
                }`}
              >
                <span>Vollbild-App öffnen</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className={`mt-12 rounded-xl border p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm ${
            isSepia
              ? 'border-[#E0D5C3] bg-gradient-to-r from-[#F7F2E9] via-[#F2ECE0] to-[#EBE3D3]'
              : 'border-white/[0.1] bg-gradient-to-r from-[#0C1220] via-[#0E1627] to-[#0A0F1D]'
          }`}
        >
          <div className="space-y-1.5 max-w-2xl">
            <div
              className={`flex items-center gap-2 text-xs font-mono font-semibold ${
                isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>
                {lang === 'de'
                  ? 'VIBE CODING ENABLEMENT FÜR IHR TEAM'
                  : 'VIBE CODING FOR YOUR ENTERPRISE'}
              </span>
            </div>
            <h4
              className={`font-display text-xl sm:text-2xl font-bold ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}
            >
              {lang === 'de'
                ? 'Möchten Sie solche Tools in Ihrem Betrieb etablieren?'
                : 'Ready to deploy specialized micro-apps across your business units?'}
            </h4>
            <p
              className={`text-xs sm:text-sm ${
                isSepia ? 'text-[#5C5042]' : 'text-slate-300'
              }`}
            >
              {lang === 'de'
                ? 'Im 2- bis 3-tägigen Inhouse-Enablement lernen Ihre Fachexperten, genau die internen Werkzeuge zu bauen, die Ihre IT-Abteilung seit Monaten vertrösten muss – 100 % sicher, datenschutzkonform und nahtlos ins ERP integriert.'
                : 'In our 2-3 day hands-on program, your domain experts learn to build the exact workflows your internal IT lacks bandwidth to tackle.'}
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('Vibe Coding & Citizen Developer Kurs')}
            className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold text-xs sm:text-sm px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap shadow-sm shrink-0 ${
              isSepia
                ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14]'
            }`}
          >
            <span>{lang === 'de' ? '30-Min. Erstgespräch buchen' : 'Book Discovery Call'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
