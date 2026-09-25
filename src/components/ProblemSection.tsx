import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AlertTriangle, Clock, ShieldAlert, Cpu, ArrowDown } from 'lucide-react';

interface ProblemSectionProps {
  lang: Language;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ lang }) => {
  const t = translations[lang].problem;

  return (
    <section className="py-20 border-b border-white/[0.06] bg-[#090D14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 mb-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 3 Core Problem Cards (Numbered cleanly, no code comments) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-xl border border-white/[0.08] bg-[#0E1524]/60 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-2xl font-extrabold text-slate-400 group-hover:text-amber-400 transition-colors">
                    {card.index}
                  </span>
                  {idx === 0 && <Clock className="h-5 w-5 text-slate-400" />}
                  {idx === 1 && <ShieldAlert className="h-5 w-5 text-amber-400" />}
                  {idx === 2 && <Cpu className="h-5 w-5 text-slate-400" />}
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] bg-amber-400/[0.03] -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-xl">
                <p className="text-xs font-medium text-amber-300/90 leading-normal">
                  {card.consequence}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Solution Bridge Banner */}
        <div className="mt-12 rounded-xl border border-[#14B8A6]/30 bg-[#14B8A6]/[0.05] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-[#14B8A6]/20 border border-[#14B8A6]/30 flex items-center justify-center shrink-0">
              <ArrowDown className="h-5 w-5 text-[#14B8A6]" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#14B8A6]">
                {lang === 'de' ? 'DIE KIVENTIS TRANSFORMATION' : 'THE KIVENTIS TRANSFORMATION'}
              </span>
              <p className="mt-1 text-base font-semibold text-white leading-relaxed">
                {t.solutionBridge}
              </p>
            </div>
          </div>
          <a
            href="#personas"
            className="inline-flex items-center justify-center text-xs font-semibold px-5 py-2.5 rounded-lg bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14] transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'de' ? 'Vorteile nach Rollen ansehen' : 'Explore by Role'}
          </a>
        </div>
      </div>
    </section>
  );
};
