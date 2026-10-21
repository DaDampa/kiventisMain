import React from 'react';
import { Language, Theme } from '../types';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import type { LandingSpec } from '../data/landings';

interface LandingPageProps {
  spec: LandingSpec;
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
  onBackToHome: () => void;
}

/**
 * Statische Landingpage fuer die DACH-Cluster-Keywords
 * (/ki-beratung-kmu, /erp-prozessautomatisierung).
 * Eigene Route mit semantischer H1/H2-Hierarchie, prerenderbar.
 * UI-Schutz: neue Komponente, keine Aenderung bestehender
 * Tailwind-Klassen oder Layouts.
 */
export const LandingPage: React.FC<LandingPageProps> = ({
  spec,
  lang = 'de',
  theme = 'dark',
  onOpenBooking,
  onBackToHome,
}) => {
  const isDe = lang === 'de';
  const isSepia = theme === 'sepia';
  const pick = (s: { de: string; en: string }) => (isDe ? s.de : s.en);

  const rootClass = isSepia
    ? 'min-h-screen bg-[#FAF8F5] text-[#18130E]'
    : 'min-h-screen bg-[#090D14] text-slate-200';
  const kickerClass = isSepia
    ? 'text-xs font-mono font-semibold tracking-wider text-[#0D9488]'
    : 'text-xs font-mono font-semibold tracking-wider text-[#14B8A6]';
  const headingClass = 'font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight';
  const headingColor = isSepia ? 'text-[#0F172A]' : 'text-white';
  const leadClass = isSepia ? 'mt-4 text-base text-[#475569] leading-relaxed' : 'mt-4 text-base text-slate-300 leading-relaxed';
  const cardClass = isSepia
    ? 'rounded-2xl border border-[#0F172A]/10 bg-white/70 p-6'
    : 'rounded-2xl border border-white/[0.08] bg-[#0E1524]/60 hover:border-white/20 p-6 transition-colors';
  const btnClass = isSepia
    ? 'inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-sm px-6 py-3.5 transition-all shadow-md cursor-pointer'
    : 'inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-sm px-6 py-3.5 transition-all shadow-md cursor-pointer';

  return (
    <div className={rootClass}>
      {/* Top Bar: Zurueck + Branding */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label={isDe ? 'Zurück zur Startseite' : 'Back to homepage'}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isDe ? 'KIVENTIS' : 'KIVENTIS'}</span>
          </button>
          <div className="text-xs font-mono tracking-wider text-slate-400">
            KIVENTIS
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero */}
        <section className="pt-14 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span className={kickerClass}>{pick(spec.kicker)}</span>
          </div>
          <h1 className={`${headingClass} ${headingClass} ${headingColor}`}>
            {pick(spec.h1)}
          </h1>
          <p className={leadClass}>{pick(spec.lead)}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button type="button" onClick={onOpenBooking} className={btnClass}>
              <ArrowRight className="h-4 w-4" />
              <span>
                {isDe ? '30-Min. KI-Erstgespräch buchen' : 'Book 30-min discovery call'}
              </span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              {isDe ? 'Unverbindlich · Senior-Berater' : 'No commitment · Senior consultant'}
            </span>
          </div>
        </section>

        {/* Leistungen */}
        <section className="py-10 border-t border-white/[0.06]">
          <h2 className={`font-display text-2xl sm:text-3xl font-extrabold ${headingColor} tracking-tight`}>
            {isDe ? 'Leistungen im Überblick' : 'Services at a glance'}
          </h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {spec.benefits.map((b, idx) => (
              <li key={idx} className={cardClass}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#14B8A6] mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {pick(b.title)}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {pick(b.text)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Trust / CTA-Schluss */}
        <section className="pt-12 pb-4">
          <div
            className={`rounded-2xl p-8 sm:p-10 ${
              isSepia
                ? 'bg-white/70 border border-[#0F172A]/10'
                : 'bg-gradient-to-r from-[#0E1524] to-[#121B2E] border border-white/[0.1]'
            }`}
          >
            <p className={`text-sm ${isSepia ? 'text-[#475569]' : 'text-slate-300'}`}>
              {isDe
                ? '25 Jahre ERP- & Prozessberatung · über 250 umgesetzte Projekte · DACH & APAC'
                : '25 years of ERP & process consulting · over 250 delivered projects · DACH & APAC'}
            </p>
            <button type="button" onClick={onOpenBooking} className={`${btnClass} mt-5`}>
              <ArrowRight className="h-4 w-4" />
              <span>{isDe ? 'Jetzt Erstgespräch buchen' : 'Book your discovery call'}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
