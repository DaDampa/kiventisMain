import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Award, ArrowRight, TrendingUp, Building2, MapPin, Quote } from 'lucide-react';

interface CaseStudiesProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  lang,
  onOpenBooking,
}) => {
  const t = translations[lang].caseStudies;
  const [activeCaseId, setActiveCaseId] = useState('case-1');

  const activeCase = t.studies.find((s) => s.id === activeCaseId) || t.studies[0];

  return (
    <section id="cases" className="py-20 border-b border-white/[0.06] bg-[#090D14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <Award className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {t.subheading}
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {t.studies.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseId(cs.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCaseId === cs.id
                  ? 'bg-white text-[#090D14] shadow-sm'
                  : 'border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <span>{cs.companyName}</span>
              <span className="ml-2 opacity-60 font-normal">({cs.industry.split('&')[0].trim()})</span>
            </button>
          ))}
        </div>

        {/* Highlighted Case Card with Before / After KPIs */}
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0E1524]/70 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6]">
                <Building2 className="h-3.5 w-3.5" />
                <span>{activeCase.industry}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                {activeCase.companyName}
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {activeCase.location}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Challenge & Solution */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  DIE AUSGANGSLAGE (CHALLENGE):
                </span>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeCase.challenge}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#14B8A6] font-semibold">
                  {lang === 'de' ? 'DIE KIVENTIS LÖSUNG & VIBE CODING:' : 'THE KIVENTIS SOLUTION & VIBE CODING:'}
                </span>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeCase.solution}
                </p>
              </div>

              {/* Client Quote Box */}
              <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="flex gap-3">
                  <Quote className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm italic text-slate-200 leading-relaxed">
                      "{activeCase.testimonial.quote}"
                    </p>
                    <div className="mt-3 text-xs">
                      <span className="font-semibold text-white">
                        {activeCase.testimonial.author}
                      </span>
                      <span className="text-slate-400">
                        {' '}· {activeCase.testimonial.position}, {activeCase.companyName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quantified Before-After KPIs */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#090D14] rounded-xl border border-white/[0.06] p-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    GEMESSENE KENNZAHLEN (KPIS)
                  </span>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>

                <div className="mt-4 space-y-4">
                  {activeCase.kpis.map((kpi, kIdx) => (
                    <div
                      key={kIdx}
                      className="p-3.5 rounded-lg border border-white/[0.04] bg-white/[0.01]"
                    >
                      <div className="text-xs text-slate-300 font-medium">
                        {kpi.label}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-xs text-slate-400">
                          Vorher:{' '}
                          <span className="font-mono tabular-nums text-slate-400 line-through">
                            {kpi.before}
                          </span>
                        </div>
                        <div className="font-mono tabular-nums text-base font-bold text-white">
                          Nachher: {kpi.after}
                        </div>
                        <div className="font-mono tabular-nums text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {kpi.improvement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-slate-100 text-[#090D14] font-semibold text-xs sm:text-sm px-4 py-3 transition-colors cursor-pointer"
                >
                  <span>{lang === 'de' ? 'Ähnlichen Case für Ihr Unternehmen besprechen' : 'Discuss a similar case for your firm'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
