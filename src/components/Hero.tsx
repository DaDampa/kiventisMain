import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Database,
  Code2,
  TrendingUp,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenResource: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenBooking,
  onOpenResource,
}) => {
  const t = translations[lang].hero;
  const [activeStepIndex, setActiveStepIndex] = useState(2);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/[0.06]">
      {/* Subtle architectural background accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center">
        <div className="w-[1100px] h-[550px] bg-gradient-to-b from-[#14B8A6]/[0.08] via-transparent to-transparent blur-3xl opacity-70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Unboxed Kicker Metadata (Zero-pill discipline: quiet unboxed text) */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#14B8A6] mb-4">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#14B8A6]" />
          <span>{t.kicker}</span>
        </div>

        {/* 5-Second Rule Headline */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            {t.headlineStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#0D9488]">
              {t.headlineAccent}
            </span>{' '}
            {t.headlineEnd}
          </h1>

          {/* Subheadline: Clear, outcome-focused B2B copy */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {t.subheadline}
          </p>

          {/* CTAs with single-line labels */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-base px-6 py-3.5 transition-all shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 whitespace-nowrap cursor-pointer"
            >
              <span>{t.primaryCta}</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={onOpenResource}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-base px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{t.secondaryCta}</span>
            </button>
          </div>

          {/* Quiet Trust Markers (Unboxed text with dots) */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
            {t.trustMarkers.map((marker, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#14B8A6]" />
                <span>{marker}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Architectural Focal Carrier: Real-world B2B AI Workflow Transformation */}
        <div className="mt-14 rounded-2xl border border-white/[0.1] bg-[#0E1524]/80 p-6 lg:p-8 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>PRAXIS-BEISPIEL · LIVE ARCHITEKTUR</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {t.interactivePreview.title}
              </h3>
              <p className="text-sm text-slate-400 mt-0.5">
                {t.interactivePreview.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>Zero-Data-Retention · 100% DSGVO</span>
            </div>
          </div>

          {/* Interactive 4-step pipeline preview */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.interactivePreview.steps.map((step, index) => {
              const isActive = activeStepIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStepIndex(index)}
                  className={`group relative rounded-xl p-5 border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#14B8A6] bg-[#14B8A6]/[0.07] shadow-lg shadow-[#14B8A6]/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-400">
                      {step.tag}
                    </span>
                    {index === 0 && <FileSpreadsheet className="h-4 w-4 text-slate-400" />}
                    {index === 1 && <Database className="h-4 w-4 text-sky-400" />}
                    {index === 2 && <Code2 className="h-4 w-4 text-[#14B8A6]" />}
                    {index === 3 && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">
                      {index === 0 && 'Format: PDF/CAD/ERP'}
                      {index === 1 && 'Vektor-Embeddings (Lokal)'}
                      {index === 2 && 'Vibe Coding via Cursor'}
                      {index === 3 && 'Ø -87% Bearbeitungszeit'}
                    </span>
                    {isActive && (
                      <span className="text-[#14B8A6] font-medium">Aktiv</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Metrics Bar directly tied to Hero proof */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.quickStats.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="font-mono tabular-nums text-3xl sm:text-4xl font-extrabold text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-200">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
