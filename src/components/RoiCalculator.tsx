import React, { useState, useId } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calculator, ArrowRight, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

interface RoiCalculatorProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  lang,
  onOpenBooking,
}) => {
  const t = translations[lang].calculator;
  const teamSizeId = useId();
  const hourlyRateId = useId();
  const hoursSavedId = useId();

  // State sliders - defaults reflecting realistic baseline
  const [teamSize, setTeamSize] = useState<number>(20);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState<number>(2);

  // Calculations (40 net working weeks / year: factoring in vacation, holidays & sick days)
  const totalHoursSavedPerYear = teamSize * hoursSavedPerWeek * 40;
  const yearlyGrossSavings = totalHoursSavedPerYear * hourlyRate;

  // Estimated team training investment baseline (standard team bootcamp: 4,900 €)
  const estimatedInvestment = teamSize <= 8 ? 2400 : teamSize <= 15 ? 4900 : 9250;
  const breakEvenMonths = Math.max(0.3, Number(((estimatedInvestment / (yearlyGrossSavings / 12))).toFixed(1)));
  const roiMultiple = Math.max(2.0, Number((yearlyGrossSavings / estimatedInvestment).toFixed(1)));

  return (
    <section id="calculator" className="py-20 border-b border-white/[0.06] bg-[#0A0E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <Calculator className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {t.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Box */}
          <div className="lg:col-span-6 rounded-2xl border border-white/[0.08] bg-[#0E1524]/70 p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-white mb-2">
                <label htmlFor={teamSizeId}>{t.teamSizeLabel}</label>
                <span className="font-mono tabular-nums text-base text-[#14B8A6] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/10">
                  {teamSize} {lang === 'de' ? 'Mitarbeiter' : 'employees'}
                </span>
              </div>
              <input
                id={teamSizeId}
                type="range"
                min="3"
                max="80"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>3 MA</span>
                <span>40 MA</span>
                <span>80 MA</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-white mb-2">
                <label htmlFor={hourlyRateId}>{t.hourlyRateLabel}</label>
                <span className="font-mono tabular-nums text-base text-[#14B8A6] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/10">
                  {hourlyRate} € / {lang === 'de' ? 'Std.' : 'hr'}
                </span>
              </div>
              <input
                id={hourlyRateId}
                type="range"
                min="40"
                max="160"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>40 €</span>
                <span>95 €</span>
                <span>160 €</span>
              </div>
            </div>

            {/* Slider 3: Hours Saved per week */}
            <div>
              <div className="flex justify-between items-center text-sm font-semibold text-white mb-2">
                <label htmlFor={hoursSavedId}>{t.hoursSavedLabel}</label>
                <span className="font-mono tabular-nums text-base text-[#14B8A6] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/10">
                  {hoursSavedPerWeek} {lang === 'de' ? 'Std. / Woche' : 'hrs / week'}
                </span>
              </div>
              <input
                id={hoursSavedId}
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={hoursSavedPerWeek}
                onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>1 Std.</span>
                <span>2 Std.</span>
                <span>4,5 Std. (Ø KMU)</span>
                <span>8 Std.</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic pt-2 border-t border-white/[0.06]">
              {t.disclaimer}
            </p>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-6 rounded-2xl border border-[#14B8A6]/30 bg-[#090D14] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#14B8A6]">
                  {t.resultsTitle}
                </span>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>

              {/* Main big figure: Yearly savings */}
              <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[#14B8A6]/10 to-transparent border border-[#14B8A6]/20">
                <span className="text-xs font-medium text-slate-300">
                  {t.yearlySavings}
                </span>
                <div className="mt-1 font-mono tabular-nums text-4xl sm:text-5xl font-extrabold text-white">
                  {yearlyGrossSavings.toLocaleString('de-DE')} €
                </div>
                <div className="mt-2 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>
                    {totalHoursSavedPerYear.toLocaleString('de-DE')} {t.hoursPerYear}
                  </span>
                </div>
              </div>

              {/* Secondary metrics: Break even and ROI */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-xs text-slate-400 font-medium">
                    {t.breakEven}
                  </span>
                  <div className="mt-1 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
                    {breakEvenMonths} {lang === 'de' ? 'Monate' : 'mo.'}
                  </div>
                  <div className="mt-1 text-[11px] text-[#14B8A6]">
                    {lang === 'de' ? 'Ø 35 bis 55 Tage' : 'Avg. 35 to 55 days'}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-xs text-slate-400 font-medium">
                    {t.roiMultiple}
                  </span>
                  <div className="mt-1 font-mono tabular-nums text-2xl sm:text-3xl font-bold text-emerald-400">
                    {roiMultiple}x
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    {lang === 'de' ? 'Faktor im 1. Geschäftsjahr' : 'Factor in Year 1'}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Calculator CTA */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-sm px-5 py-3.5 transition-all shadow-md cursor-pointer"
              >
                <span>{t.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
