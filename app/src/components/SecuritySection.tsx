import React from 'react';
import { Language, Theme } from '../types';
import {
  Shield,
  Lock,
  Server,
  FileCheck2,
  CheckCircle2,
  Cpu,
  EyeOff,
  Scale,
  ArrowRight,
} from 'lucide-react';

interface SecuritySectionProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
  onNavigateAudit?: () => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
  onNavigateAudit,
}) => {
  const isSepia = theme === 'sepia';

  const securityPillars = [
    {
      icon: Server,
      title: '100% On-Premise & Private Cloud',
      desc: 'Betrieb wahlweise auf Ihren internen Unternehmensservern (Bare Metal / VMware) oder in ISO-27001-zertifizierten Rechenzentren im DACH-Raum (Frankfurt / Zürich).',
      badge: 'AIR-GAPPED READY',
      metric: '0 Byte US-Transfer',
    },
    {
      icon: EyeOff,
      title: 'Zero Data Retention & Kein Modelltraining',
      desc: 'Ihre Geschäftsgeheimnisse, Zeichnungen, Kalkulationen und ERP-Datensätze verbleiben strikt in Ihrer Hoheit. Kein Training öffentlicher KI-Modelle, keine Datenpersistenz bei Dritten.',
      badge: 'KEIN DATENABFLUSS',
      metric: 'Geschäftsgeheimnis § 2 GeschGehG',
    },
    {
      icon: Scale,
      title: 'EU AI Act Art. 4 & DSGVO Compliance',
      desc: 'Vollständige Erfüllung der gesetzlichen Schulungspflicht (AI Literacy Art. 4) und rechtskonforme Auftragsverarbeitung (AVV) nach DSGVO Art. 28 für die Geschäftsführung.',
      badge: 'GESETZLICHE PFLICHT',
      metric: 'Haftungssicher nach § 43 GmbHG',
    },
    {
      icon: Lock,
      title: 'Granulare RBAC & Audit-Trail',
      desc: 'End-to-End rollenbasierte Zugriffskontrolle (RBAC), unveränderliche Buchungs-Logs und revisionssichere Dokumentation für Wirtschaftsprüfer und Steuerprüfungen.',
      badge: 'GOBD-KONFORM',
      metric: '100% Audit-Trace',
    },
  ];

  return (
    <section id="security" className={`py-20 md:py-28 border-b transition-colors duration-200 ${
      isSepia
        ? 'bg-[#FAF8F5] border-[#E8E2D6] text-[#18130E]'
        : 'bg-[#0B0F17] border-white/[0.08] text-slate-200'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
            <Shield className={`h-4 w-4 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
            <span className={isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}>
              SOVEREIGN AI &amp; ENTERPRISE SECURITY
            </span>
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isSepia ? 'text-[#18130E]' : 'text-white'
          }`}>
            {lang === 'de'
              ? 'Datensouveränität ohne Kompromisse'
              : 'Enterprise Data Sovereignty Without Compromise'}
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
            isSepia ? 'text-[#382F26]' : 'text-slate-300'
          }`}>
            {lang === 'de'
              ? 'Mittelständische Weltmarktführer dürfen ihre Kernkompetenzen nicht in fremde Cloud-Silos abfließen lassen. Wir sichern Ihre KI-Infrastruktur nach den strengsten europäischen Sicherheitsstandards ab.'
              : 'Mid-sized global leaders cannot afford proprietary data leakage to foreign clouds. We secure your AI infrastructure under the most stringent European compliance standards.'}
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {securityPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl border p-7 flex flex-col justify-between shadow-xl transition-all duration-300 group ${
                  isSepia
                    ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-[#0D9488]/40'
                    : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-emerald-500/30'
                }`}
              >
                <div>
                  <div className={`flex items-center justify-between pb-4 border-b ${
                    isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
                  }`}>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      isSepia
                        ? 'bg-emerald-50 border border-emerald-300 text-[#0D9488]'
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSepia
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className={`mt-5 text-xl font-bold transition-colors ${
                    isSepia ? 'text-[#18130E] group-hover:text-[#0D9488]' : 'text-white group-hover:text-emerald-300'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${
                    isSepia ? 'text-[#382F26]' : 'text-slate-300'
                  }`}>
                    {pillar.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
                  isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
                }`}>
                  <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>Prüfmaßstab:</span>
                  <span className={`font-semibold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>
                    {pillar.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Callout Banner */}
        <div className={`mt-12 rounded-2xl border p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl ${
          isSepia
            ? 'border-emerald-300 bg-emerald-50/70 text-[#18130E]'
            : 'border-emerald-500/30 bg-emerald-950/20 text-white'
        }`}>
          <div className="space-y-1.5 max-w-2xl">
            <div className={`flex items-center gap-2 text-xs font-mono font-bold ${
              isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
            }`}>
              <FileCheck2 className="h-4 w-4" />
              <span>EU AI ACT AUDIT-TOOL FÜR GESCHÄFTSFÜHRER</span>
            </div>
            <h4 className={`text-xl font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
              Prüfen Sie Ihr Bußgeld- und Haftungsrisiko nach Art. 4 EU AI Act
            </h4>
            <p className={`text-xs ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
              Seit 02. Februar 2025 gilt die gesetzliche Schulungspflicht. Unser kostenloses DIN-Audit ermittelt in 3 Minuten Ihren konkreten Compliance-Status und generiert ein Prüfzertifikat.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateAudit && (
              <button
                onClick={onNavigateAudit}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-5 py-3 transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <span>Zum Art. 4 Compliance-Check</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
