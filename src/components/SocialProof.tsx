import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Building2,
  CheckCircle2,
  Globe2,
  Workflow,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SocialProofProps {
  lang: Language;
}

export const SocialProof: React.FC<SocialProofProps> = ({ lang }) => {
  const t = translations[lang].socialProof;

  const pillarIcons = [
    <Building2 className="h-6 w-6 text-[#14B8A6]" key="building" />,
    <CheckCircle2 className="h-6 w-6 text-emerald-400" key="check" />,
    <Globe2 className="h-6 w-6 text-cyan-400" key="globe" />,
    <Workflow className="h-6 w-6 text-teal-300" key="workflow" />,
  ];

  return (
    <section className="py-16 md:py-20 border-b border-white/[0.08] bg-[#0A0E18] relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: Enterprise Heritage & Real Track Record */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{t.heritageBadge}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4 Core Enterprise Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {t.enterprisePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#0E1524]/80 p-6 transition-all duration-300 hover:border-teal-500/40 hover:bg-[#121B2E] hover:shadow-xl hover:shadow-teal-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {pillar.value}
                </div>
                <div className="font-bold text-sm text-teal-300 mt-1">
                  {pillar.label}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed border-t border-white/[0.06] pt-3">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Enterprise Workflow & System Connectivity Banner */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0C1220] via-[#0E1627] to-[#0A0F1D] p-5 sm:p-6 mb-12 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-wider block">
                  {lang === 'de' ? 'GELEBTE SYSTEM- & WORKFLOW-KOMPATIBILITÄT' : 'SYSTEM & WORKFLOW INTEROPERABILITY'}
                </span>
                <span className="text-sm font-semibold text-white">
                  {lang === 'de'
                    ? 'Direkte Anbindung an ERP, CRM, Supply Chain, Lager & Fertigungsleitsysteme (MES)'
                    : 'Direct integration with ERP, CRM, Supply Chain, Logistics & Manufacturing Execution Systems'}
                </span>
              </div>
            </div>

            {/* System Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {t.integrationSystems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-teal-500/30 transition-colors"
                >
                  {sys}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Delivery & DACH Presence Bar */}
        <div className="rounded-xl border border-teal-500/20 bg-teal-950/20 px-4 py-3 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-300 font-medium">
            <Globe2 className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>
              {lang === 'de'
                ? 'Regionale Vor-Ort-Verfügbarkeit & Remote-Trainings:'
                : 'Regional On-Site Availability & Remote Delivery:'}
            </span>
            <span className="font-semibold text-white">
              {lang === 'de'
                ? 'Deutschland (DE) · Österreich (AT) · Schweiz (CH) · International'
                : 'Germany (DE) · Austria (AT) · Switzerland (CH) · Global'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded border border-white/10 shrink-0">
            {lang === 'de'
              ? 'Inhouse vor Ort & Live-Online'
              : 'On-site In-house & Live-Online'}
          </span>
        </div>

        {/* Training & Quantitative Outcome Metrics */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              {t.metricsHeading}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.metrics.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-3">
                <span className="font-mono tabular-nums text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                  {item.metric}
                </span>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-snug font-medium max-w-[220px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
