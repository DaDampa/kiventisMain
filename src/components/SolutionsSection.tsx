import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Briefcase,
  ShieldCheck,
  Code2,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  FileCheck,
} from 'lucide-react';

interface SolutionsSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  lang,
  onOpenBooking,
}) => {
  const tPersonas = translations[lang].personas;
  const tSolutions = translations[lang].solutions;

  const [activeRole, setActiveRole] = useState<'management' | 'itCompliance' | 'departments'>('management');

  const currentPersona = tPersonas.data[
    activeRole === 'management' ? 'management' : activeRole === 'itCompliance' ? 'itCompliance' : 'departments'
  ];

  return (
    <section id="personas" className="py-20 border-b border-white/[0.06] bg-[#0A0E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= PERSONA SWITCHER FOR BUYING COMMITTEE ================= */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <Users className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>{tPersonas.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {tPersonas.heading}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {tPersonas.subheading}
          </p>
        </div>

        {/* Functional Segmented Switcher Controls (Button elements with clean states) */}
        <div className="mt-8 flex flex-wrap gap-2 p-1.5 rounded-xl border border-white/[0.08] bg-[#0E1524] max-w-2xl">
          <button
            onClick={() => setActiveRole('management')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeRole === 'management'
                ? 'bg-[#14B8A6] text-[#090D14] shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>{tPersonas.tabs.management}</span>
          </button>

          <button
            onClick={() => setActiveRole('itCompliance')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeRole === 'itCompliance'
                ? 'bg-[#14B8A6] text-[#090D14] shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{tPersonas.tabs.itCompliance}</span>
          </button>

          <button
            onClick={() => setActiveRole('departments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeRole === 'departments'
                ? 'bg-[#14B8A6] text-[#090D14] shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>{tPersonas.tabs.departments}</span>
          </button>
        </div>

        {/* Active Persona Content Panel */}
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0E1524]/70 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {/* Persona Badge / Unboxed Metadata */}
              <div className="text-xs font-mono font-medium text-[#14B8A6]">
                {currentPersona.badge}
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentPersona.headline}
              </h3>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                {currentPersona.subheadline}
              </p>

              {/* Key Benefits List */}
              <div className="mt-6 space-y-3">
                {currentPersona.keyBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#14B8A6] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Quote from this Persona */}
              <div className="mt-8 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-sm italic text-slate-300 leading-relaxed">
                  "{currentPersona.quote.text}"
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">
                      {currentPersona.quote.author}
                    </span>
                    <span className="text-slate-400">
                      {' '}· {currentPersona.quote.role}, {currentPersona.quote.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Right Column: Standout Metric & Primary Action */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full bg-[#090D14] rounded-xl border border-white/[0.06] p-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'de' ? 'SCHLÜSSEL-KENNZAHL' : 'KEY METRIC'}
                </span>
                <div className="mt-2 font-mono tabular-nums text-4xl font-extrabold text-[#2DD4BF]">
                  {currentPersona.primaryMetric.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {currentPersona.primaryMetric.label}
                </div>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {currentPersona.primaryMetric.detail}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-semibold text-xs sm:text-sm px-4 py-3 transition-colors cursor-pointer"
                >
                  <span>{translations[lang].nav.ctaButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-2 text-[11px] text-center text-slate-400">
                  {lang === 'de' ? 'Kostenfrei & unverbindlich · 30 Minuten' : 'No obligation · 30 minutes video call'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4 DETAILED SERVICE MODULES ================= */}
        <div id="services" className="mt-24 pt-10 border-t border-white/[0.06]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
              <Layers className="h-4 w-4 shrink-0 text-[#14B8A6]" />
              <span>{tSolutions.kicker}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {tSolutions.heading}
            </h2>
            <p className="mt-3 text-base text-slate-300">
              {tSolutions.subheading}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {tSolutions.modules.map((mod, mIdx) => (
              <div
                key={mIdx}
                className="rounded-xl border border-white/[0.08] bg-[#0E1524]/60 p-7 flex flex-col justify-between hover:border-[#14B8A6]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold text-[#14B8A6]">
                        {mod.number}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {mod.id === 'vibe-coding' ? 'KERNPROGRAMM' : 'SERVICE-MODUL'}
                      </span>
                    </div>
                    {mod.id === 'scan' && <Sparkles className="h-5 w-5 text-amber-400" />}
                    {mod.id === 'vibe-coding' && <Code2 className="h-5 w-5 text-[#14B8A6]" />}
                    {mod.id === 'governance' && <FileCheck className="h-5 w-5 text-emerald-400" />}
                    {mod.id === 'on-premise' && <Server className="h-5 w-5 text-sky-400" />}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#2DD4BF] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-300">
                    {mod.tagline}
                  </p>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-5">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                      LEISTUNGSUMFANG & DELIVERABLES:
                    </span>
                    <ul className="mt-2.5 space-y-2">
                      {mod.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="h-3.5 w-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{mod.duration}</span>
                    </div>
                    <div className="text-[#14B8A6]">
                      {mod.roiTimeline}
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-semibold px-4 py-2 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Modul anfragen' : 'Inquire Module'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
