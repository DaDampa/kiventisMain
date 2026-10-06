import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Clock,
  Sparkles,
  Layers,
  Users,
  TrendingUp,
  Calculator,
  ShieldCheck,
  FileText,
  DollarSign,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const isSepia = theme === 'sepia';

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200 border-b ${
          isSepia
            ? 'border-[#E7DFD3] bg-[#FAF8F5]/92 text-[#18130E]'
            : 'border-white/[0.08] bg-[#090D14]/92 text-slate-200'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-90 flex items-center shrink-0"
            >
              <span className={isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>KI</span>
              <span className={isSepia ? 'text-[#18130E]' : 'text-white'}>VENTIS</span>
            </a>

            {/* Desktop Navigation: Only Live-Demos + Main Menu Trigger per User Request */}
            <nav className="hidden md:flex items-center gap-3">
              {/* Highlighted Live-Demos Link */}
              <a
                href="#beispiele"
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isSepia
                    ? 'bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488]/15 border border-[#0D9488]/20'
                    : 'bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/15 border border-[#14B8A6]/20'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isSepia ? 'bg-[#0D9488]' : 'bg-[#14B8A6]'
                    }`}
                  />
                </span>
                <span>{t.demos}</span>
              </a>

              {/* Menü Button to reveal all hidden sections */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                  menuOpen
                    ? isSepia
                      ? 'border-[#0D9488] bg-[#EFE8DC] text-[#0D9488]'
                      : 'border-[#14B8A6] bg-white/[0.08] text-[#14B8A6]'
                    : isSepia
                      ? 'border-[#D5C9B7] bg-[#FAF8F5] text-[#18130E] hover:bg-[#EFE8DC]'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
                aria-label={lang === 'de' ? 'Navigation umschalten' : 'Toggle navigation'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span>{lang === 'de' ? 'Menü' : 'Menu'}</span>
              </button>
            </nav>
          </div>

          {/* Zone 3: Primary Actions (Theme Toggle + Language + CTA) */}
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
                    ? `Aktuell: ${isSepia ? 'Sepia (Tag)' : 'Dunkel (Nacht)'}. Klicken zum Umschalten.`
                    : `Current: ${isSepia ? 'Sepia (Day)' : 'Dark (Night)'}. Click to toggle.`
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
                    <span className="font-mono text-[11px] tracking-tight hidden sm:inline">
                      Sepia
                    </span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span className="font-mono text-[11px] tracking-tight hidden sm:inline">
                      Dunkel
                    </span>
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
                  className={`hidden lg:inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-[11px] font-mono transition-all cursor-pointer ${
                    isSepia
                      ? 'border-[#D5C9B7] bg-[#FAF6EE] text-[#6B5D4E] hover:bg-[#EFE8DC] hover:text-[#18130E]'
                      : 'border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                  }`}
                  title={
                    lang === 'de'
                      ? 'Automatischen Zeitplan wiederherstellen'
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
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
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
                className={`px-2 sm:px-2.5 py-1 rounded transition-colors cursor-pointer ${
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
              className={`hidden sm:inline-flex items-center gap-2 rounded-lg font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 transition-all whitespace-nowrap cursor-pointer shadow-sm ${
                isSepia
                  ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                  : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14]'
              }`}
            >
              <span>{t.ctaButton}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Mobile-only Menü Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isSepia
                  ? 'border-[#D5C9B7] text-[#18130E] hover:bg-[#EFE8DC]'
                  : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
              aria-label={lang === 'de' ? 'Menü öffnen' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Flyout / Full Navigation Panel (Desktop & Mobile) */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Menu Drawer Content Container */}
          <div
            className={`relative z-50 border-b shadow-2xl transition-all duration-200 ${
              isSepia
                ? 'bg-[#FAF8F5] border-[#E7DFD3] text-[#18130E]'
                : 'bg-[#0B101C] border-white/[0.1] text-slate-200'
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
              {/* Header inside Flyout */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-current/10">
                <div>
                  <div
                    className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                      isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                    }`}
                  >
                    {lang === 'de' ? 'KIVENTIS NAVIGATION' : 'KIVENTIS DIRECTORY'}
                  </div>
                  <h3
                    className={`font-display text-xl sm:text-2xl font-bold mt-1 ${
                      isSepia ? 'text-[#18130E]' : 'text-white'
                    }`}
                  >
                    {lang === 'de' ? 'Alle Bereiche im Überblick' : 'Overview & Navigation'}
                  </h3>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    isSepia
                      ? 'border-[#D5C9B7] bg-[#EFE8DC] text-[#423425] hover:bg-[#E4DBCB]'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <X className="h-4 w-4" />
                  <span>{lang === 'de' ? 'Schließen (Esc)' : 'Close (Esc)'}</span>
                </button>
              </div>

              {/* Categorized Grid of Menu Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {/* Column 1: Services & Enablement */}
                <div className="space-y-4">
                  <div
                    className={`text-xs font-mono font-bold uppercase tracking-wider pb-2 border-b ${
                      isSepia
                        ? 'text-[#7A6B5B] border-[#E0D5C3]'
                        : 'text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    {lang === 'de' ? '1. Enablement & Leistungen' : '1. Services & Enablement'}
                  </div>

                  <div className="space-y-3">
                    <a
                      href="#services"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.solutions}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Vibe Coding, Citizen Development & operative KI-Integration'
                            : 'Practical AI tools & Citizen Dev without software engineers'}
                        </div>
                      </div>
                    </a>

                    <a
                      href="#personas"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.roles}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Für Geschäftsführung, IT-Leitung, COO & Fachabteilungen'
                            : 'Customized impact for CEOs, COOs, IT Heads and Operations'}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 2: Results & Verification */}
                <div className="space-y-4">
                  <div
                    className={`text-xs font-mono font-bold uppercase tracking-wider pb-2 border-b ${
                      isSepia
                        ? 'text-[#7A6B5B] border-[#E0D5C3]'
                        : 'text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    {lang === 'de' ? '2. Praxis & Messbarkeit' : '2. Validation & Cases'}
                  </div>

                  <div className="space-y-3">
                    <a
                      href="#beispiele"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia
                          ? 'bg-[#0D9488]/10 hover:bg-[#0D9488]/15 border border-[#0D9488]/20'
                          : 'bg-[#14B8A6]/10 hover:bg-[#14B8A6]/15 border border-[#14B8A6]/20'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#0D9488]/30 bg-white text-[#0D9488]'
                            : 'border-[#14B8A6]/30 bg-[#14B8A6]/20 text-[#14B8A6]'
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm flex items-center gap-1.5 ${
                            isSepia ? 'text-[#0D9488]' : 'text-[#14B8A6]'
                          }`}
                        >
                          <span>{t.demos}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded uppercase font-bold border border-current">
                            Interaktiv
                          </span>
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#5C5042]' : 'text-slate-300'
                          }`}
                        >
                          {lang === 'de'
                            ? 'BOM Designer & ERP Rechnungsprüfer als Vollbild-Apps bedienen'
                            : 'Test production micro-apps built by clients in 2 days'}
                        </div>
                      </div>
                    </a>

                    <a
                      href="#cases"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.cases}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Reale Kunden-Ergebnisse, Zeiteinsparungen & Amortisation'
                            : 'Real mid-sized customer case studies and saved labor hours'}
                        </div>
                      </div>
                    </a>

                    <a
                      href="#calculator"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.roi}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Eigenes Team, Stundensätze & Amortisationsdauer berechnen'
                            : 'Interactive ROI calculation for your team size'}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 3: Transparency, Compliance & Pricing */}
                <div className="space-y-4">
                  <div
                    className={`text-xs font-mono font-bold uppercase tracking-wider pb-2 border-b ${
                      isSepia
                        ? 'text-[#7A6B5B] border-[#E0D5C3]'
                        : 'text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    {lang === 'de' ? '3. Konditionen & Wissen' : '3. Terms & Resources'}
                  </div>

                  <div className="space-y-3">
                    <a
                      href="#pricing"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.pricing}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Transparente Festpreispakete ohne versteckte Folgekosten'
                            : 'Fixed-price enablement packages and team licenses'}
                        </div>
                      </div>
                    </a>

                    <a
                      href="#faq"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.faq}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Häufige Fragen zu Ablauf, DSGVO & EU AI Act Art. 4'
                            : 'Answers regarding methodology, GDPR, and AI Act compliance'}
                        </div>
                      </div>
                    </a>

                    <a
                      href="#insights"
                      onClick={handleNavClick}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                        isSepia ? 'hover:bg-[#EFE8DC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSepia
                            ? 'border-[#D5C9B7] bg-[#FCFAF7] text-[#0D9488]'
                            : 'border-white/10 bg-white/[0.04] text-[#14B8A6]'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-sm transition-colors ${
                            isSepia
                              ? 'group-hover:text-[#0D9488] text-[#18130E]'
                              : 'group-hover:text-[#14B8A6] text-white'
                          }`}
                        >
                          {t.insights}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'de'
                            ? 'Leitfaden 2025/2026 für KMU & Fachbeiträge'
                            : 'SME implementation guide, case studies & whitepapers'}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action inside Flyout Menu */}
              <div
                className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
                }`}
              >
                <div className="text-xs space-y-0.5 text-center sm:text-left">
                  <div
                    className={`font-bold ${
                      isSepia ? 'text-[#18130E]' : 'text-white'
                    }`}
                  >
                    {lang === 'de'
                      ? 'Bereit für operative Produktivitätsgewinne in Ihrem Unternehmen?'
                      : 'Ready to establish real citizen development in your company?'}
                  </div>
                  <div className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>
                    {lang === 'de'
                      ? 'Unverbindliches 30-Minuten-Erstgespräch · 100 % DSGVO-konform'
                      : 'Non-binding 30-minute discovery call · 100% GDPR compliant'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenBooking();
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold text-xs sm:text-sm px-6 py-3 transition-all cursor-pointer whitespace-nowrap shadow-sm w-full sm:w-auto ${
                    isSepia
                      ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                      : 'bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14]'
                  }`}
                >
                  <span>{t.ctaButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
