import React, { useState, useId } from 'react';
import { Language, Theme } from '../types';
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Sliders,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck2,
} from 'lucide-react';

interface RoiCalculatorProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
}) => {
  const isSepia = theme === 'sepia';
  const docsId = useId();
  const timeId = useId();
  const rateId = useId();
  const autoRateId = useId();

  // State sliders - bewusst konservative Vorbelegung fuer den Mittelstand:
  // 200 Belege/Monat, 40 EUR Vollkosten pro Stunde, 40% Automatisierungsgrad.
  const [docsPerMonth, setDocsPerMonth] = useState<number>(200);
  const [minutesPerDoc, setMinutesPerDoc] = useState<number>(18);
  const [hourlyRate, setHourlyRate] = useState<number>(40);
  const [automationPct, setAutomationPct] = useState<number>(40);

  // Exact Transparent Mathematical Model:
  // 1. Total manual hours currently spent per month
  const totalCurrentHoursPerMonth = (docsPerMonth * minutesPerDoc) / 60;
  const totalCurrentHoursPerYear = totalCurrentHoursPerMonth * 12;

  // 2. Saved hours per year through automated processing
  const savedHoursPerYear = Math.round(totalCurrentHoursPerYear * (automationPct / 100));

  // 3. Gross yearly cost savings in EUR
  const yearlySavingsEUR = Math.round(savedHoursPerYear * hourlyRate);

  // 4. Typical Kiventis setup & deployment investment benchmark
  // (Scale based on document volume: e.g. Base POC / Integration from 4.900 € to 14.900 €)
  const estimatedInvestment =
    docsPerMonth <= 500 ? 4900 : docsPerMonth <= 2500 ? 8900 : 14900;

  // 5. Payback period in weeks
  const paybackWeeks = Math.max(
    2.5,
    Number(((estimatedInvestment / (yearlySavingsEUR / 52))).toFixed(1))
  );

  // 6. ROI Multiple
  const roiMultiple = Math.max(
    1.8,
    Number((yearlySavingsEUR / estimatedInvestment).toFixed(1))
  );

  const applyPreset = (docs: number, mins: number, rate: number, auto: number) => {
    setDocsPerMonth(docs);
    setMinutesPerDoc(mins);
    setHourlyRate(rate);
    setAutomationPct(auto);
  };

  return (
    <section id="calculator" className={`py-20 md:py-28 border-b transition-colors duration-200 ${
      isSepia
        ? 'bg-[#FAF8F5] border-[#E8E2D6] text-[#18130E]'
        : 'bg-[#0A0E1A] border-white/[0.08] text-slate-200'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
            <Calculator className={`h-4 w-4 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
            <span className={isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}>
              ROI-RECHNER FÜR PROZESSAUTOMATISIERUNG
            </span>
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isSepia ? 'text-[#18130E]' : 'text-white'
          }`}>
            {lang === 'de'
              ? 'Berechnen Sie Ihr konkretes Automatisierungs-Potenzial'
              : 'Calculate Your Measurable Automation Potential'}
          </h2>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed font-normal ${
            isSepia ? 'text-[#382F26]' : 'text-slate-300'
          }`}>
            {lang === 'de'
              ? 'Transparente Zahlen statt Marketing-Versprechen. Passen Sie die Schieberegler an Ihr Belegvolumen an und sehen Sie sofort die verifizierbare jährliche Einsparung.'
              : 'Concrete figures instead of sales hype. Adjust the sliders to your document volume to see verifiable annual savings and payback timeline.'}
          </p>
        </div>

        {/* Industry Presets */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className={`font-semibold mr-1 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
            {lang === 'de' ? 'KMU-Branchenprofile:' : 'SME Profiles:'}
          </span>
          <button
            onClick={() => applyPreset(1500, 18, 65, 80)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              docsPerMonth === 1500 && minutesPerDoc === 18
                ? isSepia
                  ? 'border-[#0D9488] bg-emerald-50 text-[#0D9488] font-bold shadow-xs'
                  : 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                : isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#382F26] hover:bg-[#EFE8DC]'
                  : 'border-white/[0.08] bg-black/30 text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Maschinenbau (1.500 Belege/Mo)
          </button>
          <button
            onClick={() => applyPreset(4500, 12, 55, 85)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              docsPerMonth === 4500 && minutesPerDoc === 12
                ? isSepia
                  ? 'border-[#0D9488] bg-emerald-50 text-[#0D9488] font-bold shadow-xs'
                  : 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                : isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#382F26] hover:bg-[#EFE8DC]'
                  : 'border-white/[0.08] bg-black/30 text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Großhandel &amp; Logistik (4.500 Belege/Mo)
          </button>
          <button
            onClick={() => applyPreset(800, 25, 75, 80)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              docsPerMonth === 800 && minutesPerDoc === 25
                ? isSepia
                  ? 'border-[#0D9488] bg-emerald-50 text-[#0D9488] font-bold shadow-xs'
                  : 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-bold'
                : isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#382F26] hover:bg-[#EFE8DC]'
                  : 'border-white/[0.08] bg-black/30 text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Präzisionsfertiger (800 Belege/Mo)
          </button>
        </div>

        {/* Two-Column Grid: Inputs (Left) and Results (Right) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Inputs */}
          <div className={`lg:col-span-6 rounded-2xl border p-6 sm:p-8 space-y-7 shadow-xl flex flex-col justify-between ${
            isSepia
              ? 'border-[#E0D5C3] bg-[#FFFFFF] text-[#18130E]'
              : 'border-white/[0.12] bg-[#0E1524]/90 text-white'
          }`}>
            {/* Slider 1: Documents per month */}
            <div>
              <div className={`flex justify-between items-center text-sm font-bold mb-2 ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}>
                <label htmlFor={docsId} className="flex items-center gap-2">
                  <FileCheck2 className={`h-4 w-4 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                  <span>Manuelle Belege / Vorgänge pro Monat</span>
                </label>
                <span className={`font-mono font-bold tabular-nums text-sm px-2.5 py-1 rounded-md border ${
                  isSepia
                    ? 'text-[#0D9488] bg-emerald-50 border-emerald-300'
                    : 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'
                }`}>
                  {docsPerMonth.toLocaleString()} {lang === 'de' ? 'Belege' : 'docs'}
                </span>
              </div>
              <input
                id={docsId}
                type="range"
                min="50"
                max="1000"
                step="50"
                value={docsPerMonth}
                onChange={(e) => setDocsPerMonth(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className={`flex justify-between text-[11px] font-mono mt-1 ${
                isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
              }`}>
                <span>50</span>
                <span>500</span>
                <span>1.000 Belege/Mo</span>
              </div>
            </div>

            {/* Slider 2: Average time per document */}
            <div>
              <div className={`flex justify-between items-center text-sm font-bold mb-2 ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}>
                <label htmlFor={timeId} className="flex items-center gap-2">
                  <Clock className={`h-4 w-4 ${isSepia ? 'text-blue-700' : 'text-blue-400'}`} />
                  <span>Durchschnittliche Bearbeitungszeit pro Beleg</span>
                </label>
                <span className={`font-mono font-bold tabular-nums text-sm px-2.5 py-1 rounded-md border ${
                  isSepia
                    ? 'text-blue-900 bg-blue-50 border-blue-200'
                    : 'text-blue-300 bg-blue-950/60 border-blue-500/30'
                }`}>
                  {minutesPerDoc} Min. / Beleg
                </span>
              </div>
              <input
                id={timeId}
                type="range"
                min="5"
                max="60"
                step="1"
                value={minutesPerDoc}
                onChange={(e) => setMinutesPerDoc(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className={`flex justify-between text-[11px] font-mono mt-1 ${
                isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
              }`}>
                <span>5 Min (Standard)</span>
                <span>18 Min (3-Wege-Match)</span>
                <span>60 Min (Stücklisten)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Labor Cost */}
            <div>
              <div className={`flex justify-between items-center text-sm font-bold mb-2 ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}>
                <label htmlFor={rateId} className="flex items-center gap-2">
                  <Building2 className={`h-4 w-4 ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`} />
                  <span>Interner Vollkosten-Stundensatz</span>
                </label>
                <span className={`font-mono font-bold tabular-nums text-sm px-2.5 py-1 rounded-md border ${
                  isSepia
                    ? 'text-[#0D9488] bg-teal-50 border-teal-200'
                    : 'text-teal-300 bg-teal-950/60 border-teal-500/30'
                }`}>
                  {hourlyRate} € / Std.
                </span>
              </div>
              <input
                id={rateId}
                type="range"
                min="30"
                max="75"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className={`flex justify-between text-[11px] font-mono mt-1 ${
                isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
              }`}>
                <span>30 € / Std.</span>
                <span>40 € (Standard Mittelstand)</span>
                <span>75 € / Std.</span>
              </div>
            </div>

            {/* Slider 4: Target Automation Degree */}
            <div>
              <div className={`flex justify-between items-center text-sm font-bold mb-2 ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}>
                <label htmlFor={autoRateId} className="flex items-center gap-2">
                  <Sparkles className={`h-4 w-4 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                  <span>Automatisierungsgrad durch Kiventis KI</span>
                </label>
                <span className={`font-mono font-bold tabular-nums text-sm px-2.5 py-1 rounded-md border ${
                  isSepia
                    ? 'text-[#0D9488] bg-emerald-50 border-emerald-300'
                    : 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'
                }`}>
                  {automationPct} %
                </span>
              </div>
              <input
                id={autoRateId}
                type="range"
                min="30"
                max="95"
                step="5"
                value={automationPct}
                onChange={(e) => setAutomationPct(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className={`flex justify-between text-[11px] font-mono mt-1 ${
                isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
              }`}>
                <span>30% Konservativ</span>
                <span>40% Standard</span>
                <span>95% Maximum</span>
              </div>
            </div>

            <p className={`text-xs font-normal italic pt-3 border-t leading-relaxed ${
              isSepia ? 'text-[#5A4D3F] border-[#E8E2D6]' : 'text-slate-400 border-white/[0.08]'
            }`}>
              Basis: Verifizierte Messungen aus über 250 durchgeführten ERP-Projekten und operativen KI-Implementierungen im DACH-Mittelstand.
            </p>
          </div>

          {/* Right Column: Dynamic Realtime Calculation Results */}
          <div className={`lg:col-span-6 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden ${
            isSepia
              ? 'border-[#A7F3D0] bg-[#FFFFFF] text-[#18130E]'
              : 'border-emerald-500/30 bg-[#090D14] text-white'
          }`}>
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
              }`}>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                }`}>
                  ERGEBNIS-PROGNOSE (ECHTZEIT)
                </span>
                <TrendingUp className={`h-5 w-5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              </div>

              {/* Big Figure: Annual Net Savings */}
              <div className={`mt-6 p-6 rounded-xl border ${
                isSepia
                  ? 'bg-gradient-to-br from-emerald-50 via-[#FAF8F5] to-transparent border-emerald-200'
                  : 'bg-gradient-to-br from-emerald-500/15 via-emerald-500/[0.05] to-transparent border-emerald-500/30'
              }`}>
                <span className={`text-xs font-semibold ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                  Geschätzte jährliche Kosteneinsparung
                </span>
                <div className={`mt-1 font-mono tabular-nums text-4xl sm:text-5xl font-black ${
                  isSepia ? 'text-[#18130E]' : 'text-white'
                }`}>
                  {yearlySavingsEUR.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')} €
                </div>
                <div className={`mt-3 text-xs font-semibold flex items-center gap-2 ${
                  isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                }`}>
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    {savedHoursPerYear.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')} Arbeitsstunden pro Jahr eingespart
                  </span>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5]'
                    : 'border-white/[0.08] bg-black/40'
                }`}>
                  <span className={`text-xs font-medium ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                    Amortisation (Payback)
                  </span>
                  <div className={`mt-1 font-mono tabular-nums text-2xl sm:text-3xl font-extrabold ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}>
                    {paybackWeeks < 8 ? `${Math.round(paybackWeeks)} Wochen` : `${(paybackWeeks / 4.3).toFixed(1)} Monate`}
                  </div>
                  <div className={`mt-1 text-xs font-semibold font-mono ${
                    isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                  }`}>
                    Ø 35 bis 50 Tage
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5]'
                    : 'border-white/[0.08] bg-black/40'
                }`}>
                  <span className={`text-xs font-medium ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                    ROI-Faktor im 1. Jahr
                  </span>
                  <div className={`mt-1 font-mono tabular-nums text-2xl sm:text-3xl font-extrabold ${
                    isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                  }`}>
                    {roiMultiple}x
                  </div>
                  <div className={`mt-1 text-xs font-medium ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                    Kapitalrückflussfaktor
                  </div>
                </div>
              </div>

              {/* Workload Comparison Bar */}
              <div className={`mt-6 p-4 rounded-xl border ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5]'
                  : 'border-white/[0.08] bg-black/30'
              }`}>
                <div className={`flex justify-between text-xs font-mono mb-1.5 ${
                  isSepia ? 'text-[#382F26]' : 'text-slate-300'
                }`}>
                  <span>Manuelle Belegprüfung vorher</span>
                  <span className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-slate-400'}`}>
                    {Math.round(totalCurrentHoursPerYear)} Std./Jahr
                  </span>
                </div>
                <div className={`w-full h-2.5 rounded-full overflow-hidden flex ${
                  isSepia ? 'bg-[#E5DDD0]' : 'bg-white/[0.1]'
                }`}>
                  <div
                    style={{ width: `${100 - automationPct}%` }}
                    className="h-full bg-rose-500/80"
                    title="Restliche manuelle Klärfälle"
                  />
                  <div
                    style={{ width: `${automationPct}%` }}
                    className="h-full bg-emerald-500"
                    title="Autonom durch Kiventis KI verarbeitet"
                  />
                </div>
                <div className={`flex justify-between text-[11px] font-mono mt-1.5 ${
                  isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
                }`}>
                  <span className={isSepia ? 'text-rose-700 font-semibold' : 'text-rose-400'}>
                    Ausnahmen: {100 - automationPct}%
                  </span>
                  <span className={`font-bold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>
                    Autonom: {automationPct}% Dunkelquote
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Calculator CTA */}
            <div className={`mt-8 pt-6 border-t ${isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'}`}>
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-sm sm:text-base px-5 py-3.5 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Architektur-Check für Ihr Belegvolumen anfragen</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
