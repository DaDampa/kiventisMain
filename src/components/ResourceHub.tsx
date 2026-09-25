import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FileText, Download, CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface ResourceHubProps {
  lang: Language;
  onOpenResource: () => void;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({
  lang,
  onOpenResource,
}) => {
  const t = translations[lang].resourceHub;

  return (
    <section className="py-20 border-b border-white/[0.06] bg-[#0A0E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-r from-[#0E1524] to-[#121B2E] p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
                <BookOpen className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                <span>{t.kicker}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.heading}
              </h2>

              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                {t.subheading}
              </p>

              {/* 4 Bullet Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {t.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0 mt-0.5" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenResource}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-sm px-6 py-3.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  <span>{t.cta}</span>
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {t.badge}
                </span>
              </div>
            </div>

            {/* Document Cover Visual (Pure Clean CSS / SVG Asset) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-64 sm:w-72 aspect-[3/4] rounded-xl border border-white/20 bg-[#090D14] p-6 flex flex-col justify-between shadow-2xl relative group transform hover:-rotate-1 transition-transform">
                <div className="border-b border-white/[0.08] pb-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#14B8A6]">
                    <span>KIVENTIS PUBLISHING</span>
                    <span>2025/2026</span>
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-white leading-snug">
                    KMU-Praxisleitfaden: KI & EU AI Act
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Vibe Coding, Schulungspflicht & RAG Architekturen
                  </div>
                </div>

                <div className="space-y-2 py-4 text-[10px] text-slate-400 font-mono">
                  <div className="h-1.5 bg-white/10 rounded w-5/6" />
                  <div className="h-1.5 bg-white/10 rounded w-full" />
                  <div className="h-1.5 bg-white/10 rounded w-4/6" />
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>38 SEITEN · PDF</span>
                  <span className="text-emerald-400 font-semibold">FREE DOWNLOAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
