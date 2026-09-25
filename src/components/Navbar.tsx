import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const t = translations[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090D14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtext per Top Bar contract) */}
        <a
          href="#"
          className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
        >
          <span className="text-[#14B8A6]">KI</span><span className="text-white">VENTIS</span>
        </a>

        {/* Zone 2: Navigation Links (Single line, quiet hover states) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#services" className="transition-colors hover:text-white">
            {t.solutions}
          </a>
          <a href="#personas" className="transition-colors hover:text-white">
            {t.roles}
          </a>
          <a href="#cases" className="transition-colors hover:text-white">
            {t.cases}
          </a>
          <a href="#calculator" className="transition-colors hover:text-white">
            {t.roi}
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            {t.pricing}
          </a>
          <a href="#faq" className="transition-colors hover:text-white">
            {t.faq}
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Language Toggle + High-Intent CTA) */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-0.5 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('de')}
              className={`px-2.5 py-1 rounded transition-colors ${
                lang === 'de'
                  ? 'bg-[#14B8A6] text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Deutsch (DACH)"
            >
              DE
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded transition-colors ${
                lang === 'en'
                  ? 'bg-[#14B8A6] text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English (International / APAC)"
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-semibold text-xs sm:text-sm px-4 py-2 transition-all shadow-sm hover:shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
          >
            <span>{t.ctaButton}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0B111D] px-4 py-4 sm:px-6">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.solutions}
            </a>
            <a
              href="#personas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.roles}
            </a>
            <a
              href="#cases"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.cases}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.roi}
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.pricing}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {t.faq}
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-semibold text-sm px-4 py-2.5 transition-all"
              >
                <span>{t.ctaButton}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
