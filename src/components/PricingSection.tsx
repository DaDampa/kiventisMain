import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Check, ArrowRight, Sparkles, Clock, Users, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  lang: Language;
  onOpenBooking: (packageTitle?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  onOpenBooking,
}) => {
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="py-20 border-b border-white/[0.06] bg-[#090D14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <Sparkles className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {t.subheading}
          </p>
        </div>

        {/* 3 Pricing Packages */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.packages.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'border-2 border-[#14B8A6] bg-[#0E1524] shadow-2xl shadow-[#14B8A6]/10 -translate-y-2'
                    : 'border border-white/[0.08] bg-[#0E1524]/60 hover:border-white/20'
                }`}
              >
                {/* Popularity Banner */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#14B8A6] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-[#090D14]">
                    {lang === 'de' ? 'MEISTGEBUCHT IM MITTELSTAND' : 'MOST POPULAR FOR SMES'}
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono font-semibold text-[#14B8A6] tracking-wider">
                    {pkg.kicker}
                  </div>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {pkg.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 min-h-[36px]">
                    {pkg.targetAudience}
                  </p>

                  {/* Price Tag with Tabular Numerals */}
                  <div className="mt-6 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-400">{t.currency}</span>
                      <span className="font-mono tabular-nums text-4xl sm:text-5xl font-extrabold text-white">
                        {pkg.priceTag}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {pkg.priceSub}
                    </div>
                  </div>

                  {/* Operational Details */}
                  <div className="py-4 space-y-2 text-xs font-mono text-slate-300 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#14B8A6]" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{pkg.roiEstimate}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      INBEGRIFFENE LEISTUNGEN:
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <Check className="h-4 w-4 text-[#14B8A6] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onOpenBooking(pkg.title)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg font-bold text-xs sm:text-sm px-4 py-3 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090D14] shadow-md'
                        : 'border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-white'
                    }`}
                  >
                    <span>{lang === 'de' ? `${pkg.title} anfragen` : `Request ${pkg.title}`}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-2 text-[11px] text-center text-slate-400 font-mono">
                    {pkg.deliverableSnippet}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* VAT Notice */}
        <p className="mt-8 text-center text-xs text-slate-400">
          {t.vatNotice}
        </p>
      </div>
    </section>
  );
};
