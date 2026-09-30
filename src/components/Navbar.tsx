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

  const isSepia = theme === 'sepia';

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-200 border-b ${
        isSepia
          ? 'border-[#E7DFD3] bg-[#FAF8F5]/92 text-[#18130E]'
          : 'border-white/[0.08] bg-[#090D14]/92 text-slate-200'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-90 flex items-center"
        >
          <span className={isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>KI</span>
          <span className={isSepia ? 'text-[#18130E]' : 'text-white'}>VENTIS</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-7 text-sm font-medium ${
            isSepia ? 'text-[#5C5042]' : 'text-slate-400'
          }`}
        >
          <a
            href="#services"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.solutions}
          </a>
          <a
            href="#personas"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.roles}
          </a>
          <a
            href="#cases"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.cases}
          </a>
          <a
            href="#calculator"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.roi}
          </a>
          <a
            href="#beispiele"
            className={`transition-colors font-semibold ${
              isSepia
                ? 'text-[#0D9488] hover:text-[#0F766E]'
                : 'text-[#14B8A6] hover:text-white'
            }`}
          >
            {t.demos}
          </a>
          <a
            href="#pricing"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.pricing}
          </a>
          <a
            href="#faq"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.faq}
          </a>
          <a
            href="#insights"
            className={`transition-colors ${
              isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
            }`}
          >
            {t.insights}
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                isSepia
                  ? 'border-[#D5C9B7] bg-[#EFE8DC] text-[#332619] hover:bg-[#E4DBCB]'
                  : 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
              title={
                lang === 'de'
                  ? themeMode === 'auto'
                    ? `Aktuell: ${isSepia ? 'Sepia (Tag)' : 'Dunkel (Nacht)'} durch Zeitplan (07:00–20:00 Sepia · 20:00–07:00 Dunkel). Klicken zum Umschalten.`
                    : `Manuell gewählt: ${isSepia ? 'Sepia' : 'Dunkel'}. Klicken zum Umschalten.`
                  : themeMode === 'auto'
                    ? `Current: ${isSepia ? 'Sepia (Day)' : 'Dark (Night)'} via schedule (07:00–20:00 Sepia · 20:00–07:00 Dark). Click to toggle.`
                    : `Manually set: ${isSepia ? 'Sepia' : 'Dark'}. Click to toggle.`
              }
              aria-label={
                lang === 'de'
                  ? `Farbschema ${isSepia ? 'Sepia' : 'Dunkel'} umschalten`
                  : `Toggle theme from ${theme}`
              }
            >
              {isSepia ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                  <span className="font-mono text-[11px] tracking-tight">Sepia</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                  <span className="font-mono text-[11px] tracking-tight">Dunkel</span>
                </>
              )}
              {themeMode === 'auto' && (
                <span
                  className={`text-[9px] font-mono px-1 py-0.5 rounded uppercase font-semibold leading-none ${
                    isSepia
                      ? 'bg-[#D5C9B7]/60 text-[#4D3F30]'
                      : 'bg-white/[0.08] text-slate-400'
                  }`}
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
                  isSepia
                    ? 'border-[#D5C9B7] bg-[#FAF6EE] text-[#6B5D4E] hover:bg-[#EFE8DC] hover:text-[#18130E]'
                    : 'border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                }`}
                title={
                  lang === 'de'
                    ? 'Automatischen Zeitplan wiederherstellen (07:00–20:00 Sepia · 20:00–07:00 Dunkel)'
                    : 'Restore automatic schedule'
                }
              >
                <Clock className="h-3 w-3 shrink-0" />
                <span>Auto</span>
              </button>
            )}
          </div>

          {/* Language Switcher */}
          <div
            className={`flex items-center rounded-lg border p-0.5 text-xs font-medium ${
              isSepia
                ? 'border-[#D5C9B7] bg-[#EFE8DC]'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <button
              onClick={() => onLanguageChange('de')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                lang === 'de'
                  ? isSepia
                    ? 'bg-white text-[#18130E] font-semibold shadow-2xs'
                    : 'bg-white/[0.12] text-white font-semibold shadow-2xs'
                  : isSepia
                    ? 'text-[#6B5D4E] hover:text-[#18130E]'
                    : 'text-slate-400 hover:text-white'
              }`}
              title="Deutsch (DACH)"
            >
              DE
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en'
                  ? isSepia
                    ? 'bg-white text-[#18130E] font-semibold shadow-2xs'
                    : 'bg-white/[0.12] text-white font-semibold shadow-2xs'
                  : isSepia
                    ? 'text-[#6B5D4E] hover:text-[#18130E]'
                    : 'text-slate-400 hover:text-white'
              }`}
              title="English (International)"
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenBooking}
            className={`hidden sm:inline-flex items-center gap-2 rounded-lg font-semibold text-xs sm:text-sm px-4 py-2 transition-all whitespace-nowrap cursor-pointer shadow-sm ${
              isSepia
                ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14]'
            }`}
          >
            <span>{t.ctaButton}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors cursor-pointer ${
              isSepia ? 'text-[#5C5042] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 py-4 sm:px-6 transition-colors ${
            isSepia
              ? 'border-[#E7DFD3] bg-[#F7F4EE] text-[#18130E]'
              : 'border-white/[0.08] bg-[#0B111D] text-slate-200'
          }`}
        >
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            <div
              className={`pb-3 mb-1 border-b space-y-2 ${
                isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono ${
                    isSepia ? 'text-[#6B5D4E]' : 'text-slate-400'
                  }`}
                >
                  {lang === 'de' ? 'Farbschema:' : 'Theme:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleTheme();
                    }}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                      isSepia
                        ? 'border-[#D5C9B7] bg-[#EFE8DC] text-[#18130E]'
                        : 'border-white/10 bg-white/[0.04] text-slate-200'
                    }`}
                  >
                    {isSepia ? (
                      <>
                        <Sun className="h-3.5 w-3.5 text-amber-700" />
                        <span>Sepia {themeMode === 'auto' ? '(Auto)' : ''}</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5 text-amber-300" />
                        <span>Dunkel {themeMode === 'auto' ? '(Auto)' : ''}</span>
                      </>
                    )}
                  </button>

                  {themeMode === 'manual' && onResetToAutoTheme && (
                    <button
                      onClick={() => {
                        onResetToAutoTheme();
                      }}
                      className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs cursor-pointer ${
                        isSepia
                          ? 'border-[#D5C9B7] bg-[#FAF6EE] text-[#6B5D4E]'
                          : 'border-white/10 bg-white/[0.04] text-slate-300'
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lang === 'de' ? 'Zeitplan' : 'Auto'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.solutions}
            </a>
            <a
              href="#personas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.roles}
            </a>
            <a
              href="#cases"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.cases}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.roi}
            </a>
            <a
              href="#beispiele"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 font-semibold ${
                isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
              }`}
            >
              {t.demos}
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.pricing}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.faq}
            </a>
            <a
              href="#insights"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:opacity-80 transition-opacity"
            >
              {t.insights}
            </a>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm px-4 py-2.5 transition-all cursor-pointer ${
                  isSepia
                    ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                    : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14]'
                }`}
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
