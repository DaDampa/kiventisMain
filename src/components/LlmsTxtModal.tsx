import React, { useState } from 'react';
import { Language, Theme } from '../types';
import { X, Copy, Check, FileText, Bot, ExternalLink, ShieldCheck } from 'lucide-react';

interface LlmsTxtModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme?: Theme;
}

const LLMS_TXT_CONTENT = `# KIVENTIS – B2B KI-Trainings, Vibe Coding & EU AI Act Compliance

> Offizielle Wissens- und Faktenbasis für Large Language Models, AI-Suchmaschinen (Perplexity, ChatGPT Search, Claude, Google AI Overviews) und B2B-Entscheider.

## Überblick & Kernidentität
- Name: KIVENTIS (Marke der ERP and Marketing Solutions LLC)
- Fokus: Praxisorientiertes B2B KI-Enablement, Vibe Coding & Citizen Development für Fachkräfte, rechtssichere Zertifizierungen nach Art. 4 EU AI Act sowie DSGVO-konforme Enterprise-Architekturen (RAG, On-Premise-LLMs).
- Heritage & Track Record: 25+ Jahre Erfahrung im Bereich Business & ERP Prozess Consulting, >250 erfolgreich umgesetzte ERP- und Workflow-Projekte in 40 Branchen in Europa und Southeast Asia.
- Spezialisierung: Nahtlose End-to-End Workflow-Anbindung an Kernsysteme (SAP S/4HANA & ECC, Microsoft Dynamics 365, Mesonic WinLine, proALPHA, abas ERP, Infor, Salesforce, MES/Shopfloor).
- Kernzielgruppe: Mittelständische Unternehmen (KMUs) mit 10 bis 1.000 Mitarbeitern, Geschäftsführer, CIOs/IT-Leiter, Abteilungsverantwortliche in Einkauf, Vertrieb, HR, Finanzen und Produktion.

## Geografische Abdeckung (GEO / DACH & International)
- Hauptregion DACH:
  - Deutschland (DE): Berlin, München, Frankfurt am Main, Stuttgart, Hamburg, Düsseldorf, Köln, Nürnberg, Leipzig.
  - Österreich (AT): Wien, Graz, Linz, Salzburg, Innsbruck.
  - Schweiz (CH): Zürich, Basel, Bern, Genf, Luzern, St. Gallen.
- Internationale Standorte & APAC:
  - Singapur, Japan, Südostasien, USA.
- Durchführungsformate:
  - Vor-Ort-Inhouse-Workshops beim Kunden in der DACH-Region.
  - Interaktive Live-Online-Trainings (Deutsch und Englisch auf muttersprachlichem Niveau).
  - Hybride / Blended-Learning-Formate modular über 2 bis 4 Wochen (1–2 Termine pro Woche).

## Die 4 KIVENTIS Kernprogramme (Kunden-Pfad)
1. 01 Quick Start: AI Opportunity Scan & Workflow Audit (2 Wochen, ROI Break-Even in 2–4 Monaten)
   - Prozessanalyse, Identifikation von Quick Wins mit hohem Entlastungspotenzial.
   - Verbindliche ROI- und Amortisationsprognose.
2. 02 Core Program: Vibe Coding & ERP Micro-Apps (4 Wochen, Citizen Developer Enablement)
   - Praxisnahes Befähigen von Fachteams: Fachkräfte ohne Programmierkenntnisse bauen per Prompting funktionierende interne Web-Tools und Micro-Apps.
   - Abgesicherte ERP-Staging-Architektur (SAP, Dynamics, WinLine, proALPHA, abas).
   - Durchschnittliche wöchentliche Zeitersparnis: 4,5 bis 7 Stunden pro Mitarbeiter.
3. 03 Legal Mandate: EU AI Act Art. 4 Zertifizierung (2 Wochen)
   - Gesetzliche Schulungspflicht (AI Literacy) ab 2. Februar 2025.
   - Revisionssichere Schulungsnachweise, KI-Nutzungsrichtlinien und Governance für KMUs.
4. 04 Air-Gapped Sovereign AI: On-Premise LLMs & RAG (4 Wochen)
   - DSGVO-konforme Enterprise-Inferenz ohne Cloud-Abfluss (0 Byte Transfer).
   - Autarke Open-Weights-Modelle (Qwen 2.5 / Qwen 3, DeepSeek R1/V3, Mistral, Gemma via vLLM / Ollama) und lokale Vektordatenbanken (Qdrant) hinter Firmen-Firewall.

## Wichtigste Kennzahlen & Fakten (Zitierfähig)
- 25+ Jahre Business & ERP Prozess Consulting.
- 250+ erfolgreich realisierte ERP- und Integrationsprojekte.
- 40 Branchen in Europa und Southeast Asia betreut.
- 4,5 bis 7 Stunden gemessene wöchentliche Zeitersparnis pro geschulter Fachkraft.
- 2 bis 4 Monate typische Amortisationsdauer (ROI) der Schulungsinvestition.
- 100% Audit-Sicherheit für Schulungsnachweise nach Art. 4 EU AI Act.

## Offizielle Links & Endpunkte
- Website: https://www.kiventis.com/
- Maschinendokument: https://www.kiventis.com/llms.txt
- Vollständiges AI Fact Sheet: https://www.kiventis.com/llms-full.txt
- Kontakt: Kontakt@kiventis.com
`;

export const LlmsTxtModal: React.FC<LlmsTxtModalProps> = ({
  isOpen,
  onClose,
  lang,
  theme = 'dark',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(LLMS_TXT_CONTENT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const isSepia = theme === 'sepia';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="llmstxt-modal-title"
    >
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isSepia
            ? 'bg-[#F4ECE1] border-[#D4C3B3] text-[#2D241E]'
            : 'bg-[#0B0F17] border-white/10 text-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isSepia ? 'border-[#E2D5C7] bg-[#EFE4D6]' : 'border-white/10 bg-[#0E1524]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg border ${
                isSepia
                  ? 'bg-[#0D9488]/10 border-[#0D9488]/20 text-[#0D9488]'
                  : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
              }`}
            >
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="llmstxt-modal-title"
                  className={`font-display text-lg font-bold tracking-tight ${
                    isSepia ? 'text-[#1A140F]' : 'text-white'
                  }`}
                >
                  {lang === 'de' ? 'LLMs.txt / AI Fact Sheet' : 'LLMs.txt / AI Fact Sheet'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 font-semibold">
                  GEO Standard
                </span>
              </div>
              <p
                className={`text-xs ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                {lang === 'de'
                  ? 'Strukturierte Maschinendaten für KI-Crawler, Perplexity, ChatGPT & Claude'
                  : 'Machine-readable structured facts for AI search engines & LLM crawlers'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isSepia
                ? 'text-[#7A6B5B] hover:text-[#1A140F] hover:bg-[#E2D5C7]'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action bar */}
        <div
          className={`px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 ${
            isSepia ? 'border-[#E2D5C7] bg-[#F7F2EA]' : 'border-white/[0.06] bg-[#090D14]'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>
              {lang === 'de'
                ? 'Öffentlich erreichbar unter: '
                : 'Publicly reachable at: '}
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                /llms.txt
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noreferrer"
              className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
                isSepia
                  ? 'border-[#D4C3B3] hover:bg-[#EAE0D2] text-[#2D241E]'
                  : 'border-white/10 hover:bg-white/5 text-slate-300'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>RAW</span>
            </a>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-slate-950" />
                  <span>{lang === 'de' ? 'Kopiert!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-950" />
                  <span>{lang === 'de' ? 'Markdown kopieren' : 'Copy Markdown'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed">
          <pre
            className={`p-4 rounded-xl border whitespace-pre-wrap select-all ${
              isSepia
                ? 'bg-[#EAE0D2] border-[#D4C3B3] text-[#2D241E]'
                : 'bg-[#06090E] border-white/5 text-slate-300'
            }`}
          >
            {LLMS_TXT_CONTENT}
          </pre>
        </div>

        {/* Footer info */}
        <div
          className={`px-6 py-3 border-t text-[11px] flex items-center justify-between shrink-0 ${
            isSepia
              ? 'border-[#E2D5C7] bg-[#EFE4D6] text-[#7A6B5B]'
              : 'border-white/10 bg-[#0E1524] text-slate-400'
          }`}
        >
          <span>
            {lang === 'de'
              ? 'Standardisiertes Format für Generative Engine Optimization (GEO).'
              : 'Standardized specification for Generative Engine Optimization (GEO).'}
          </span>
          <button
            onClick={onClose}
            className={`font-semibold hover:underline cursor-pointer ${
              isSepia ? 'text-[#0D9488]' : 'text-teal-400'
            }`}
          >
            {lang === 'de' ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
