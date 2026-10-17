import React from 'react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, MapPin, Mail, Phone, Globe, Bot } from 'lucide-react';

interface FooterProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
  onOpenResource: () => void;
  onOpenImpressum: () => void;
  onOpenAdminLeads: () => void;
  onNavigateAudit?: () => void;
  onOpenLlmsTxt?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
  onOpenResource,
  onOpenImpressum,
  onOpenAdminLeads,
  onNavigateAudit,
  onOpenLlmsTxt,
}) => {
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-white/[0.08] bg-[#070A10] text-slate-400 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <a href="#" className="font-display text-xl font-bold tracking-tight inline-block">
                <span className={theme === 'sepia' ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>KI</span>
                <span className={theme === 'sepia' ? 'text-[#1A140F]' : 'text-white'}>VENTIS</span>
              </a>
              <p className="mt-1 font-mono text-xs text-[#14B8A6] font-semibold tracking-wide">
                Boost your processes, save license costs
              </p>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.tagline}
            </p>

            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs text-slate-300 max-w-sm space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" />
                <span>{lang === 'de' ? '25 Jahre Business & ERP Consulting' : '25 Years Business & ERP Consulting'}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {lang === 'de'
                  ? 'Über 250 realisierte ERP-Projekte in 40 Branchen (Europa & Southeast Asia). Spezialisiert auf Workflowanbindung (CRM, Supply Chain & Produktion).'
                  : 'Over 250 completed enterprise projects across 40 industries (Europe & Southeast Asia). Specialized in mission-critical workflow integration (CRM, Supply Chain & Manufacturing).'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400 font-mono pt-1">
              <div className="flex items-start gap-2">
                <Globe className="h-3.5 w-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-white font-semibold">
                    {lang === 'de' ? 'Regionale Abdeckung (DACH):' : 'Regional & Global Coverage:'}
                  </strong><br />
                  {lang === 'de'
                    ? 'Inhouse-Trainings vor Ort in Deutschland (München, Frankfurt, Stuttgart, Hamburg, Berlin, NRW), Österreich (Wien, Graz) & der Schweiz (Zürich, Basel) sowie weltweite Remote-Sessions (DE/EN).'
                    : 'On-site enterprise enablement across Europe (Germany, Austria, Switzerland) plus worldwide interactive remote sessions (EN/DE).'}
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/[0.06]">
                <MapPin className="h-3.5 w-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>
                  ERP and Marketing Solutions LLC<br />
                  1209 Mountain Road PL NE, STE R<br />
                  Albuquerque, NM 87110, USA
                </span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <Mail className="h-3.5 w-3.5 text-[#14B8A6] shrink-0" />
                <a
                  href={lang === 'de' ? 'mailto:Kontakt@kiventis.com' : 'mailto:contact@kiventis.com'}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'de' ? 'Kontakt@kiventis.com' : 'contact@kiventis.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'KI-Opportunity-Scan' : 'AI Opportunity Scan'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Vibe Coding & Citizen Dev' : 'Vibe Coding & Citizen Dev'}
                </a>
              </li>
              <li>
                <a
                  href="/ai-act-audit"
                  onClick={(e) => {
                    if (onNavigateAudit) {
                      e.preventDefault();
                      onNavigateAudit();
                    }
                  }}
                  className={`transition-colors font-semibold flex items-center gap-1.5 ${
                    theme === 'sepia'
                      ? 'text-rose-800 hover:text-rose-950'
                      : 'text-rose-300 hover:text-rose-100'
                  }`}
                >
                  <ShieldCheck className={`h-3.5 w-3.5 ${theme === 'sepia' ? 'text-rose-800' : 'text-rose-400'}`} />
                  <span>{lang === 'de' ? 'Art. 4 Haftungs-Rechner' : 'Art. 4 Liability Calculator'}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'EU AI Act Art. 4 Training' : 'EU AI Act Art. 4 Certification'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'On-Premise & RAG Beratung' : 'On-Premise & RAG Advisory'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Interaktiver ROI-Rechner' : 'Interactive ROI Calculator'}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Roles */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              {lang === 'de' ? 'ZIELGRUPPEN' : 'TARGET ROLES'}
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Für die Geschäftsführung' : 'For Executive Leadership (CEOs)'}
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Für IT-Leiter & CISO' : 'For IT Leaders & CISOs'}
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Für Fachbereich & HR' : 'For Business Units & HR'}
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">
                  {lang === 'de' ? 'Mittelstand Case Studies' : 'Mid-Market Case Studies'}
                </a>
              </li>
              <li>
                <a href="#beispiele" className="hover:text-white transition-colors text-[#14B8A6]">
                  {lang === 'de' ? 'Kunden-Demos & Tools (MOK-Daten)' : 'Interactive Customer Demos'}
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors text-[#14B8A6]">
                  {lang === 'de' ? 'EU AI Act & Vibe Coding Insights' : 'EU AI Act & Vibe Coding Insights'}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenResource}
                  className="text-left hover:text-white transition-colors cursor-pointer text-[#14B8A6]"
                >
                  {lang === 'de' ? 'KMU-Leitfaden (PDF)' : 'Executive SME Guide (PDF)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact Action */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              {lang === 'de' ? 'COMPLIANCE' : 'COMPLIANCE & AUDIT'}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t.complianceNotice}
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold px-3.5 py-2 transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Erstgespräch buchen' : 'Book Discovery Call'}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>{t.copyright}</div>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenLlmsTxt && (
              <button
                type="button"
                onClick={onOpenLlmsTxt}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-[11px] transition-colors cursor-pointer"
                title={lang === 'de' ? 'Maschinenlesbare Unternehmensdaten & KI-Fact-Sheet' : 'Machine-readable AI Fact Sheet for Search Engines & LLMs'}
              >
                <Bot className="h-3 w-3" />
                <span>LLMs.txt / AI Fact Sheet</span>
              </button>
            )}
            {t.links.map((link, idx) => {
              const isImpressum = link.href === '#impressum' || link.href === '#legal';
              if (isImpressum) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenImpressum();
                    }}
                    className="hover:text-slate-300 transition-colors cursor-pointer text-[11px]"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
