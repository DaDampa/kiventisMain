import React from 'react';
import { Language, Theme } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, MapPin, Mail, Phone, Globe } from 'lucide-react';

interface FooterProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
  onOpenResource: () => void;
  onOpenImpressum: () => void;
  onOpenAdminLeads: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
  onOpenResource,
  onOpenImpressum,
  onOpenAdminLeads,
}) => {
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-white/[0.08] bg-[#070A10] text-slate-400 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="font-display text-xl font-bold tracking-tight block">
              <span className={theme === 'sepia' ? 'text-[#0D9488]' : 'text-[#14B8A6]'}>KI</span>
              <span className={theme === 'sepia' ? 'text-[#1A140F]' : 'text-white'}>VENTIS</span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.tagline}
            </p>

            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs text-slate-300 max-w-sm space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>25 Jahre Business &amp; ERP Consulting</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Über 250 realisierte ERP-Projekte in 40 Branchen (Europa &amp; Southeast Asia). Spezialisiert auf Workflowanbindung (CRM, Supply Chain &amp; Produktion).
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400 font-mono pt-1">
              <div className="flex items-start gap-2">
                <Globe className="h-3.5 w-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-white font-semibold">Regionale Abdeckung (DACH):</strong><br />
                  Inhouse-Trainings vor Ort in Deutschland (München, Frankfurt, Stuttgart, Hamburg, Berlin, NRW), Österreich (Wien, Graz) &amp; der Schweiz (Zürich, Basel) sowie weltweite Remote-Sessions (DE/EN).
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
                  href="mailto:Kontakt@kiventis.com"
                  className="hover:text-white transition-colors"
                >
                  Kontakt@kiventis.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              LEISTUNGEN
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  KI-Opportunity-Scan
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Vibe Coding & Citizen Dev
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  EU AI Act Art. 4 Training
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  On-Premise & RAG Beratung
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Interaktiver ROI-Rechner
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Roles */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              ZIELGRUPPEN
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Für die Geschäftsführung
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Für IT-Leiter & CISO
                </a>
              </li>
              <li>
                <a href="#personas" className="hover:text-white transition-colors">
                  Für Fachbereich & HR
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">
                  Mittelstand Case Studies
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenResource}
                  className="text-left hover:text-white transition-colors cursor-pointer text-[#14B8A6]"
                >
                  KMU-Leitfaden (PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact Action */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white block mb-3">
              COMPLIANCE
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t.complianceNotice}
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold px-3.5 py-2 transition-colors cursor-pointer"
            >
              Erstgespräch buchen
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>{t.copyright}</div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdminLeads}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 font-mono text-[11px] transition-colors cursor-pointer"
              title="Interner Lead-Manager für Kundenkontakte & E-Mails"
            >
              <ShieldCheck className="h-3 w-3" />
              <span>Lead-Zentrale (Admin)</span>
            </button>
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
