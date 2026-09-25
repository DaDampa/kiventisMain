import React, { useState } from 'react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import { Menu, X, ArrowRight, Sun, Moon, Clock } from 'lucide-react';
import { ThemeMode } from '../utils/theme';

interface NavbarProps {
  lang: Language;
  theme: Theme;
  themeMode?: ThemeMode;
  onLanguageChange: (lang: Language) => void;
  onToggleTheme: () => void;
  onResetToAutoTheme?: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  theme,
  themeMode = 'auto',
  onLanguageChange,
  onToggleTheme,
  onResetToAutoTheme,
  onOpenBooking,
}) => {
  const t = translations[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090D14]/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtext per Top Bar contract) */}
        <a
          href="#"
          className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
        >
          <span className={theme === 'sepia' ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>KI</span>
          <span className={theme === 'sepia' ? 'text-[#1A140F]' : 'text-white'}>VENTIS</span>
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

        {/* Zone 3: Primary Actions (Theme Toggle + Language Toggle + High-Intent CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sepia / Dark Theme Toggle Button & Schedule indicator */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                theme === 'sepia'
                  ? 'border-[#D0C2AB] bg-[#EAE1D0] text-[#1A140F] hover:bg-[#DFD4C0]'
                  : 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
              title={
                lang === 'de'
                  ? themeMode === 'auto'
                    ? `Aktuell: ${theme === 'sepia' ? 'Sepia (Tag)' : 'Dunkel (Nacht)'} durch Zeitplan (07:00–20:00 Sepia · 20:00–07:00 Dunkel). Klicken zum manuellen Wechseln.`
                    : `Manuell gewählt: ${theme === 'sepia' ? 'Sepia' : 'Dunkel'}. Klicken zum Umschalten.`
                  : themeMode === 'auto'
                    ? `Current: ${theme === 'sepia' ? 'Sepia (Day)' : 'Dark (Night)'} via schedule (07:00–20:00 Sepia · 20:00–07:00 Dark). Click to toggle.`
                    : `Manually set: ${theme === 'sepia' ? 'Sepia' : 'Dark'}. Click to toggle.`
              }
              aria-label={
                lang === 'de'
                  ? `Farbschema ${theme === 'sepia' ? 'Sepia' : 'Dunkel'} umschalten`
                  : `Toggle theme from ${theme}`
              }
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-[11px] tracking-tight">Dunkel</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <span className="font-mono text-[11px] tracking-tight">Sepia</span>
                </>
              )}
              {themeMode === 'auto' && (
                <span
                  className={`text-[9px] font-mono px-1 py-0.5 rounded uppercase font-semibold leading-none ${
                    theme === 'sepia'
                      ? 'bg-[#D0C2AB]/60 text-[#423425]'
                      : 'bg-cyan-400/15 text-cyan-300'
                  }`}
                  title={
                    lang === 'de'
                      ? 'Zeitplan aktiv (07:00–20:00 Sepia · 20:00–07:00 Dunkel)'
                      : 'Schedule active (07:00–20:00 Sepia · 20:00–07:00 Dark)'
                  }
                >
                  Auto
                </span>
              )}
            </button>

            {/* Quick-restore button when manually overridden */}
            {themeMode === 'manual' && onResetToAutoTheme && (
              <button
                onClick={onResetToAutoTheme}
                className={`hidden sm:inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-[11px] font-mono transition-all cursor-pointer ${
                  theme === 'sepia'
                    ? 'border-[#D0C2AB] bg-[#F4EDE1] text-[#6B5A47] hover:bg-[#EAE1D0] hover:text-[#1A140F]'
                    : 'border-white/10 bg-white/[0.04] text-teal-300 hover:bg-white/[0.08] hover:text-teal-200'
                }`}
                title={
                  lang === 'de'
                    ? 'Automatischen Zeitplan wiederherstellen (07:00–20:00 Sepia · 20:00–07:00 Dunkel)'
                    : 'Restore automatic schedule (07:00–20:00 Sepia · 20:00–07:00 Dark)'
                }
              >
                <Clock className="h-3 w-3 shrink-0" />
                <span>Auto</span>
              </button>
            )}
          </div>

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
            <div className="pb-3 mb-1 border-b border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {lang === 'de' ? 'Farbschema:' : 'Theme:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleTheme();
                    }}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                      theme === 'sepia'
                        ? 'border-[#D0C2AB] bg-[#EAE1D0] text-[#1A140F]'
                        : 'border-white/10 bg-white/[0.04] text-slate-200'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Moon className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Dunkel {themeMode === 'auto' ? '(Auto)' : ''}</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-3.5 w-3.5 text-amber-700" />
                        <span>Sepia {themeMode === 'auto' ? '(Auto)' : ''}</span>
                      </>
                    )}
                  </button>

                  {themeMode === 'manual' && onResetToAutoTheme && (
                    <button
                      onClick={() => {
                        onResetToAutoTheme();
                      }}
                      className="flex items-center gap-1 rounded-lg border border-teal-500/40 bg-teal-500/10 px-2.5 py-1.5 text-xs text-teal-300 hover:bg-teal-500/20"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lang === 'de' ? 'Zeitplan' : 'Auto'}</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Clock className="h-3 w-3 text-teal-400 shrink-0" />
                <span>
                  {lang === 'de'
                    ? 'Zeitplan: 07:00–20:00 Sepia (Tag) · 20:00–07:00 Dunkel (Nacht)'
                    : 'Schedule: 07:00–20:00 Sepia (Day) · 20:00–07:00 Dark (Night)'}
                </span>
              </div>
            </div>
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
