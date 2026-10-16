import React from 'react';
import { Language, Theme } from '../types';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface ProcessTimelineProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
}) => {
  const isSepia = theme === 'sepia';

  const steps = [
    {
      step: '01',
      title: 'Architektur- & Prozess-Audit',
      timeframe: 'Tag 1 bis 3',
      desc: 'Analyse Ihrer ERP-Stammdaten, Schnittstellen (SAP, Dynamics, Infor) und manuellen Engpässe. Festlegung messbarer ROI-Ziele und Klärung der DSGVO-/EU-AI-Act-Kriterien.',
      deliverable: 'Audit-Bericht & Machbarkeits-Matrix',
      accent: isSepia
        ? 'border-blue-300 text-blue-800 bg-blue-50'
        : 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    },
    {
      step: '02',
      title: 'Funktionsfähiger PoC in 14 Tagen',
      timeframe: 'Tag 4 bis 14',
      desc: 'Wir bauen einen voll funktionsfähigen Prototyp auf Basis echter Testdaten (z. B. automatischer 3-Wege-Rechnungsabgleich oder BOM-Stücklisten-Editor). Keine Mockups, sondern funktionierender Code.',
      deliverable: 'Lauffähiges MVP in sicherer Sandbox',
      accent: isSepia
        ? 'border-teal-300 text-teal-800 bg-teal-50'
        : 'border-teal-500/40 text-teal-300 bg-teal-500/10',
    },
    {
      step: '03',
      title: 'Enterprise-Integration & ERP-Anbindung',
      timeframe: 'Tag 15 bis 30',
      desc: 'Zertifizierte Anbindung an Ihr Produktivsystem via OData, RFC oder REST. Konfiguration der Air-Gap-Sicherheitsregeln und Bereitstellung der lokalen LLM-Inferenz.',
      deliverable: 'Produktiv-Deployment & GoBD-Abnahme',
      accent: isSepia
        ? 'border-emerald-300 text-emerald-800 bg-emerald-50'
        : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
    {
      step: '04',
      title: 'Autonomer Betrieb & Team-Enablement',
      timeframe: 'Ab Tag 31',
      desc: 'Ihre Fachteams bedienen und adaptieren Workflows selbstständig (Citizen Development). Kontinuierliches Monitoring der Dunkelquote und Latenzen mit SLA-Garantie.',
      deliverable: 'SLA-Monitoring & Schulungszertifikate',
      accent: isSepia
        ? 'border-emerald-400 text-emerald-900 bg-emerald-100'
        : 'border-emerald-400 text-emerald-300 bg-emerald-500/20',
    },
  ];

  return (
    <section id="process" className={`py-20 md:py-28 border-b transition-colors duration-200 ${
      isSepia
        ? 'bg-[#FAF8F5] border-[#E8E2D6] text-[#18130E]'
        : 'bg-[#0A0E1A] border-white/[0.08] text-slate-200'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
            <Compass className={`h-4 w-4 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
            <span className={isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}>
              VOM ERSTKONTAKT ZUM LIVE-SYSTEM
            </span>
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isSepia ? 'text-[#18130E]' : 'text-white'
          }`}>
            {lang === 'de'
              ? 'In 4 Schritten zum produktiven KI-Betrieb'
              : 'In 4 Steps to Production Enterprise AI'}
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
            isSepia ? 'text-[#382F26]' : 'text-slate-300'
          }`}>
            {lang === 'de'
              ? 'Keine monatelangen IT-Beratungsprojekte mit unklarem Ausgang. Wir setzen auf einen agilen, verbindlichen Fahrplan mit garantierten Meilensteinen.'
              : 'No endless multi-month consulting marathons. We deliver on an agile, binding roadmap with verifiable production deliverables.'}
          </p>
        </div>

        {/* 4-Step Timeline with fine luminous connecting lines */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle connecting horizontal luminous line on desktop */}
          <div className={`hidden lg:block absolute top-12 left-12 right-12 h-0.5 -z-0 ${
            isSepia
              ? 'bg-gradient-to-r from-blue-300/60 via-teal-300/70 to-emerald-300/80'
              : 'bg-gradient-to-r from-blue-500/40 via-teal-400/50 to-emerald-400/60'
          }`} />

          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`relative z-10 rounded-2xl border p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-[#0D9488]/40'
                  : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-emerald-500/40'
              }`}
            >
              <div>
                {/* Step badge & Timeframe */}
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
                }`}>
                  <span className={`h-9 w-9 rounded-xl font-mono text-xs font-black flex items-center justify-center border ${item.accent}`}>
                    {item.step}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs font-mono ${
                    isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'
                  }`}>
                    <Calendar className={`h-3.5 w-3.5 ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}`} />
                    <span>{item.timeframe}</span>
                  </div>
                </div>

                <h3 className={`mt-5 text-lg font-bold transition-colors ${
                  isSepia ? 'text-[#18130E] group-hover:text-[#0D9488]' : 'text-white group-hover:text-emerald-300'
                }`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-xs leading-relaxed ${
                  isSepia ? 'text-[#382F26]' : 'text-slate-300'
                }`}>
                  {item.desc}
                </p>
              </div>

              {/* Deliverable badge */}
              <div className={`mt-6 pt-4 border-t flex items-center gap-2 text-[11px] font-mono ${
                isSepia
                  ? 'border-[#E8E2D6] text-[#0D9488]'
                  : 'border-white/[0.08] text-emerald-300'
              }`}>
                <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                <span className="truncate">{item.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className={`mt-14 p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl ${
          isSepia
            ? 'border-[#E0D5C3] bg-[#FFFFFF] text-[#18130E]'
            : 'border-white/[0.1] bg-[#0E1524]/70 text-white'
        }`}>
          <div className="space-y-1">
            <h4 className={`text-lg font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
              Starten Sie mit Schritt 1: Das unverbindliche Architektur-Audit
            </h4>
            <p className={`text-xs ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
              30 Minuten Video-Gespräch mit unseren ERP- &amp; KI-Architekten. Keine Verkaufs-Show, sondern konkrete Analyse Ihrer Systemlandschaft.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-6 py-3.5 transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-emerald-500/20"
          >
            <span>Architektur-Check buchen</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
