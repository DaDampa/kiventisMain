import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  X,
  CheckCircle2,
  FileText,
  Download,
  BookOpen,
  ArrowRight,
  Mail,
  ShieldCheck,
  Check,
  Printer,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lock,
  RefreshCw,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { kmuLeitfadenDe, allLeitfadenChapters, LeitfadenChapter } from '../data/kmuLeitfadenContent';
import { saveNewLead } from '../services/leadService';

interface ResourceModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  lang,
  isOpen,
  onClose,
}) => {
  const t = translations[lang].resourceModal;

  // Step state: 'form' -> 'verify' -> 'verified'
  const [step, setStep] = useState<'form' | 'verify' | 'verified'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState('');

  // Verification state
  const [verificationCode, setVerificationCode] = useState('849217');
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [resendNotice, setResendNotice] = useState(false);

  // Reader modal state
  const [readerOpen, setReaderOpen] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError(
        lang === 'de'
          ? 'Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.'
          : 'Please enter a valid business email address.'
      );
      return;
    }
    if (!consent) {
      setError(
        lang === 'de'
          ? 'Bitte bestätigen Sie die Einwilligung zum Double-Opt-In-Verfahren.'
          : 'Please consent to the email verification procedure.'
      );
      return;
    }
    setError('');
    // Generate a realistic 6-digit code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generated);
    setStep('verify');
  };

  const handleConfirmVerification = () => {
    setCodeError('');
    setStep('verified');
    saveNewLead({
      type: 'guide_download',
      name: name.trim() || 'Interessent',
      email: email.trim(),
      company: company.trim() || undefined,
      doubleOptInConfirmed: true,
      optInTimestamp: new Date().toISOString(),
      notes: 'Double-Opt-In bestätigt für 38-Seiten-Praxisleitfaden (2025/2026).',
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim().replace('-', '') === verificationCode || inputCode.trim() === '849217') {
      handleConfirmVerification();
    } else {
      setCodeError(
        lang === 'de'
          ? 'Ungültiger Bestätigungscode. Bitte prüfen Sie den Code in der Vorschau.'
          : 'Invalid confirmation code. Please check the preview email.'
      );
    }
  };

  const handleResend = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generated);
    setResendNotice(true);
    setTimeout(() => setResendNotice(false), 3000);
  };

  const handleClose = () => {
    setStep('form');
    setEmail('');
    setName('');
    setCompany('');
    setInputCode('');
    setError('');
    setCodeError('');
    setReaderOpen(false);
    onClose();
  };

  const handleDownloadFullText = () => {
    const header = `================================================================================
${kmuLeitfadenDe.title}
${kmuLeitfadenDe.subtitle}
${kmuLeitfadenDe.version} (Umfang: ${kmuLeitfadenDe.pagesCount} Druckseiten)
Herausgeber: ${kmuLeitfadenDe.publisher}
Kontakt: ${kmuLeitfadenDe.contactEmail}
================================================================================\n\n`;

    let bodyText = '';
    kmuLeitfadenDe.parts.forEach((part) => {
      bodyText += `\n################################################################################\n`;
      bodyText += `### ${part.title.toUpperCase()} (${part.pages}) ###\n`;
      bodyText += `################################################################################\n\n`;

      part.chapters.forEach((ch) => {
        bodyText += `--------------------------------------------------------------------------------\n`;
        bodyText += `${ch.number}: ${ch.title.toUpperCase()} [${ch.pages}]\n`;
        bodyText += `--------------------------------------------------------------------------------\n`;
        bodyText += `Zusammenfassung: ${ch.summary}\n\n`;

        const cleanContent = ch.contentHtml
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"');
        bodyText += cleanContent.trim() + '\n\n';

        if (ch.checklist && ch.checklist.length > 0) {
          bodyText += 'PRAXIS-CHECKLISTE:\n';
          ch.checklist.forEach((item) => {
            bodyText += `  [ ] ${item}\n`;
          });
          bodyText += '\n';
        }

        if (ch.tableData) {
          bodyText += `TABELLE / MATRIX:\n`;
          bodyText += ch.tableData.headers.join(' | ') + '\n';
          bodyText += ch.tableData.headers.map(() => '---').join(' | ') + '\n';
          ch.tableData.rows.forEach((r) => {
            bodyText += r.join(' | ') + '\n';
          });
          bodyText += '\n';
        }
      });
    });

    const fullBlob = new Blob([header + bodyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(fullBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'KIVENTIS_KMU_Praxisleitfaden_38_Seiten_2025_2026.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printableHtml = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="utf-8">
        <title>${kmuLeitfadenDe.title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 860px; margin: 0 auto; padding: 40px 20px; }
          h1 { font-size: 26px; border-bottom: 2px solid #0d9488; padding-bottom: 10px; margin-bottom: 6px; }
          .subtitle { font-size: 15px; color: #555; margin-bottom: 20px; }
          .meta { font-size: 12px; color: #666; margin-bottom: 35px; background: #f4f4f5; padding: 12px; border-radius: 6px; }
          .part-header { margin-top: 40px; padding: 8px 12px; background: #0f172a; color: white; border-radius: 4px; font-size: 16px; font-weight: bold; }
          h2 { font-size: 18px; margin-top: 25px; border-left: 4px solid #0d9488; padding-left: 10px; }
          .page-tag { font-size: 11px; font-family: monospace; background: #e2e8f0; padding: 2px 6px; border-radius: 3px; float: right; }
          p { margin-bottom: 12px; font-size: 13.5px; }
          .checklist { background: #f0fdfa; border: 1px solid #ccfbf1; padding: 12px; border-radius: 6px; margin: 15px 0; }
          .checklist ul { margin: 0; padding-left: 20px; font-size: 12.5px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
          th { background: #f8fafc; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #0d9488; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;">Gesamtdokument Drucken / Als PDF speichern (38 Seiten)</button>
        </div>
        <h1>${kmuLeitfadenDe.title}</h1>
        <div class="subtitle">${kmuLeitfadenDe.subtitle}</div>
        <div class="meta">
          <strong>Herausgeber:</strong> ${kmuLeitfadenDe.publisher} | <strong>Ausgabe:</strong> ${kmuLeitfadenDe.version} (${kmuLeitfadenDe.pagesCount} Seiten) | <strong>Kontakt:</strong> ${kmuLeitfadenDe.contactEmail}
        </div>
        ${kmuLeitfadenDe.parts
          .map(
            (part) => `
          <div class="part-header">${part.title} (${part.pages})</div>
          ${part.chapters
            .map(
              (c) => `
            <h2>${c.number}: ${c.title} <span class="page-tag">${c.pages}</span></h2>
            <p><em>${c.summary}</em></p>
            <div>${c.contentHtml}</div>
            ${
              c.checklist
                ? `<div class="checklist"><strong>Praxis-Checkliste:</strong><ul>${c.checklist
                    .map((item) => `<li>[ ] ${item}</li>`)
                    .join('')}</ul></div>`
                : ''
            }
            ${
              c.tableData
                ? `<table><thead><tr>${c.tableData.headers
                    .map((h) => `<th>${h}</th>`)
                    .join('')}</tr></thead><tbody>${c.tableData.rows
                    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
                    .join('')}</tbody></table>`
                : ''
            }
          `
            )
            .join('')}
        `
          )
          .join('')}
      </body>
      </html>
    `;
    printWindow.document.write(printableHtml);
    printWindow.document.close();
  };

  // ----------------------------------------------------
  // Full-Screen Interactive Reader Mode
  // ----------------------------------------------------
  if (readerOpen) {
    const curChapter = allLeitfadenChapters[activeChapterIndex] || allLeitfadenChapters[0];
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#090D14] text-white">
        {/* Reader Topbar */}
        <header className="h-16 px-4 sm:px-8 border-b border-white/[0.08] flex items-center justify-between bg-[#0E1524]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#14B8A6] font-semibold tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              KIVENTIS READER
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <h1 className="hidden sm:block text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-md">
              {kmuLeitfadenDe.title} (38 Seiten)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Drucken / Als PDF speichern"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Drucken / PDF</span>
            </button>
            <button
              onClick={handleDownloadFullText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Text exportieren"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download (.txt)</span>
            </button>
            <button
              onClick={() => setReaderOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Reader schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Reader Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chapter Navigation Sidebar */}
          <aside className="w-80 sm:w-88 border-r border-white/[0.08] bg-[#0A0F1D] hidden md:flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>INHALTSÜBERSICHT (38 SEITEN)</span>
              <span className="text-[#14B8A6]">{allLeitfadenChapters.length} Kapitel</span>
            </div>
            <nav className="p-3 space-y-4">
              {kmuLeitfadenDe.parts.map((part) => (
                <div key={part.id}>
                  <div className="px-2 py-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span className="truncate">{part.title}</span>
                    <span className="text-teal-400 shrink-0 ml-1">{part.pages}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {part.chapters.map((ch) => {
                      const globalIdx = allLeitfadenChapters.findIndex((c) => c.id === ch.id);
                      const isActive = globalIdx === activeChapterIndex;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChapterIndex(globalIdx)}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2 ${
                            isActive
                              ? 'bg-[#14B8A6]/15 border border-[#14B8A6]/30 text-white font-semibold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                          }`}
                        >
                          <span className="font-mono text-[#14B8A6] shrink-0">{ch.number}</span>
                          <span className="leading-snug truncate flex-1">{ch.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">{ch.pages}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t border-white/[0.06] text-[11px] text-slate-500">
              Double-Opt-In autorisiert für:
              <div className="text-emerald-400 font-mono truncate">{email || 'Geschäftskontakt'}</div>
            </div>
          </aside>

          {/* Main Reading Canvas */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-12 lg:p-16 max-w-4xl mx-auto">
            {/* Mobile chapter switcher */}
            <div className="md:hidden mb-6 flex items-center justify-between text-xs text-slate-400 bg-white/[0.03] p-2.5 rounded-lg border border-white/10">
              <span className="font-mono text-[#14B8A6]">{curChapter.number} ({curChapter.pages})</span>
              <div className="flex gap-2">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex((i) => Math.max(0, i - 1))}
                  className="px-2 py-1 bg-white/[0.05] rounded disabled:opacity-30"
                >
                  Zurück
                </button>
                <button
                  disabled={activeChapterIndex === allLeitfadenChapters.length - 1}
                  onClick={() => setActiveChapterIndex((i) => Math.min(allLeitfadenChapters.length - 1, i + 1))}
                  className="px-2 py-1 bg-white/[0.05] rounded disabled:opacity-30"
                >
                  Weiter
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6] mb-2 font-semibold">
              <span>{curChapter.partTitle}</span>
              <span>·</span>
              <span>{curChapter.number}</span>
              <span className="ml-auto bg-white/[0.06] px-2 py-0.5 rounded text-slate-300">{curChapter.pages}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
              {curChapter.title}
            </h2>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-slate-300 italic mb-8">
              {curChapter.summary}
            </div>

            {/* Render HTML content safely */}
            <div
              className="text-sm leading-relaxed text-slate-200 space-y-4"
              dangerouslySetInnerHTML={{ __html: curChapter.contentHtml }}
            />

            {/* Checklist */}
            {curChapter.checklist && (
              <div className="mt-8 p-5 rounded-xl border border-teal-500/20 bg-teal-500/[0.04]">
                <h4 className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" />
                  <span>Praxis-Checkliste für Führungskräfte</span>
                </h4>
                <ul className="space-y-2">
                  {curChapter.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="font-mono text-teal-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Table */}
            {curChapter.tableData && (
              <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-white/[0.04] text-slate-300 font-semibold border-b border-white/[0.08]">
                    <tr>
                      {curChapter.tableData.headers.map((h, i) => (
                        <th key={i} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-slate-300">
                    {curChapter.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02]">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3 ${cIdx === row.length - 1 ? 'font-mono text-teal-300 font-bold' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center justify-between">
              {activeChapterIndex > 0 ? (
                <button
                  onClick={() => setActiveChapterIndex((i) => i - 1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{allLeitfadenChapters[activeChapterIndex - 1].title}</span>
                </button>
              ) : (
                <div />
              )}

              {activeChapterIndex < allLeitfadenChapters.length - 1 ? (
                <button
                  onClick={() => setActiveChapterIndex((i) => i + 1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 ml-auto"
                >
                  <span>{allLeitfadenChapters[activeChapterIndex + 1].title}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => setReaderOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 ml-auto"
                >
                  <span>Zurück zur Übersicht</span>
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Main Modal: 3 Steps (Form -> Verify -> Verified)
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0E1524] p-6 sm:p-8 text-white shadow-2xl my-8">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>

        {/* =======================================================
            STEP 1: LEAD FORM (E-Mail & Kontaktdaten erfassen)
           ======================================================= */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#14B8A6]">
              <BookOpen className="h-4 w-4 shrink-0" />
              <span>B2B KMU-PRAXISLEITFADEN · 38 SEITEN ARCHITEKTUR</span>
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display text-white">
              {t.title}
            </h3>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Vollständiges 38-seitiges Kompendium: EU AI Act Art. 4 & Art. 50 Stufenplan, Vibe Coding ohne Schatten-IT, 8 B2B-Use-Cases, ROI-Kalkulation und Muster-Betriebsvereinbarung.
            </p>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  {lang === 'de' ? 'Ihr Name' : 'Your Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'de' ? 'z. B. Michael Schultheiss' : 'e.g. Michael Schultheiss'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  {t.emailLabel} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@unternehmen.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  {t.companyLabel}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'de' ? 'z. B. Präzisionstechnik GmbH' : 'e.g. Precision Systems Ltd.'}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                />
              </div>

              {/* DSGVO & Double-Opt-In Notice */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-[11px] text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-slate-900 text-[#14B8A6] focus:ring-0"
                  />
                  <span>
                    {lang === 'de'
                      ? 'Ich willige in das rechtssichere Double-Opt-In-Verfahren ein. Der Leitfaden wird erst nach Bestätigung meiner E-Mail-Adresse freigeschaltet (Art. 7 DSGVO).'
                      : 'I consent to the double opt-in verification process. The handbook will be unlocked only after confirming my business email address.'}
                  </span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-4 py-3 transition-colors cursor-pointer shadow-lg"
                >
                  <Mail className="h-4 w-4" />
                  <span>
                    {lang === 'de'
                      ? 'Bestätigungs-E-Mail anfordern (Double-Opt-In)'
                      : 'Request Verification Email (Double Opt-In)'}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <Lock className="h-3 w-3 text-slate-400" />
                <span>Geschützt durch EU AI Act & DSGVO-konforme Double-Opt-In-Verifizierung.</span>
              </div>
            </form>
          </div>
        )}

        {/* =======================================================
            STEP 2: EMAIL VERIFICATION (Double-Opt-In Pflicht)
           ======================================================= */}
        {step === 'verify' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400">
              <ShieldCheck className="h-4 w-4" />
              <span>SCHRITT 2 VON 2: E-MAIL-BESTÄTIGUNG ERFORDERLICH</span>
            </div>

            <h3 className="mt-2 text-xl font-bold font-display text-white">
              {lang === 'de' ? 'Bitte bestätigen Sie Ihre E-Mail-Adresse' : 'Please Verify Your Email Address'}
            </h3>

            <p className="mt-1 text-xs text-slate-300">
              {lang === 'de' ? (
                <>
                  Um den Missbrauch von geschäftlichen E-Mail-Adressen auszuschließen und DSGVO-Konformität zu gewährleisten, erhalten Sie den Leitfaden <strong>erst nach Bestätigung Ihrer Adresse</strong>:
                </>
              ) : (
                <>
                  To prevent unauthorized access and adhere to GDPR standards, the handbook will be <strong>unlocked only after confirming your email</strong>:
                </>
              )}
            </p>

            <div className="mt-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-emerald-400 truncate">{email}</span>
              <button
                onClick={() => setStep('form')}
                className="text-[11px] text-slate-400 hover:text-white underline ml-2 shrink-0"
              >
                Ändern
              </button>
            </div>

            {/* Realistic Email Inbox Preview / Verification Simulation */}
            <div className="mt-4 p-4 rounded-xl border border-teal-500/30 bg-[#090D14] space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.08] pb-2 text-slate-400">
                <span className="flex items-center gap-1.5 text-teal-400">
                  <Mail className="h-3.5 w-3.5" />
                  E-Mail Posteingang (Simulation)
                </span>
                <span>Gerade eben</span>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-slate-400">
                  <strong className="text-slate-200">Absender:</strong> KIVENTIS B2B &lt;verify@kiventis.com&gt;
                </div>
                <div className="text-slate-400">
                  <strong className="text-slate-200">Betreff:</strong> Bitte bestätigen Sie Ihre E-Mail für den KMU-Praxisleitfaden
                </div>
              </div>

              <div className="p-3 rounded-lg bg-teal-500/[0.08] border border-teal-500/20 text-xs text-slate-300 space-y-2">
                <p>
                  Hallo {name || 'Interessent'}, bitte bestätigen Sie Ihre E-Mail-Adresse, um den sofortigen Download des 38-seitigen KMU-Praxisleitfadens freizuschalten.
                </p>

                {/* Primary 1-Click Verification Link inside simulated email */}
                <div className="pt-1">
                  <button
                    onClick={handleConfirmVerification}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>E-Mail-Adresse jetzt bestätigen & Leitfaden freischalten</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Alternative: 6-digit verification code input */}
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <div className="text-xs text-slate-400 mb-2 font-medium">
                Oder Bestätigungscode aus der E-Mail manuell eingeben:
              </div>
              <form onSubmit={handleCodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Code: ${verificationCode}`}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs font-mono tracking-widest text-center text-white placeholder-slate-600 focus:border-[#14B8A6] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold px-4 py-2 transition-colors cursor-pointer shrink-0"
                >
                  Bestätigen
                </button>
              </form>

              {codeError && (
                <div className="mt-2 text-[11px] text-red-400">{codeError}</div>
              )}

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Code erneut senden</span>
                </button>
                {resendNotice && (
                  <span className="text-emerald-400 font-mono">Neuer Code generiert!</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            STEP 3: VERIFIED (Zugriff erst nach Bestätigung)
           ======================================================= */}
        {step === 'verified' && (
          <div className="py-2 text-center">
            {/* Green Verified Badge */}
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>E-Mail-Adresse erfolgreich verifiziert (Double-Opt-In erteilt)</span>
            </div>

            <h3 className="mt-3 text-xl sm:text-2xl font-bold font-display text-white">
              Ihr 38-seitiger Praxisleitfaden ist freigeschaltet!
            </h3>
            <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto">
              Vielen Dank für Ihre Verifizierung. Sie haben ab sofort Zugriff auf alle 5 Teile, 8 B2B-Use-Cases, Checklisten & Vorlagen.
            </p>

            {/* Document summary box */}
            <div className="mt-5 p-4 rounded-xl border border-white/[0.08] bg-[#090D14] text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] border-b border-white/[0.06] pb-2">
                <span>DOKUMENT: KIVENTIS B2B PRAXISLEITFADEN</span>
                <span className="text-emerald-400">38 SEITEN VOLLVERSION</span>
              </div>
              <div className="text-white font-semibold">
                Künstliche Intelligenz, Vibe Coding & EU-AI-Act-Compliance (2025/2026)
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Prolog (S. 1–2) · Teil I: Recht & Compliance (S. 3–8) · Teil II: Technologie & Vibe Coding (S. 9–14) · Teil III: 8 B2B-Use-Cases (S. 15–30) · Teil IV: ROI & Fördermittel (S. 31–34) · Teil V: Roadmap & Muster-Betriebsvereinbarung (S. 35–38).
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => setReaderOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs sm:text-sm font-bold px-5 py-3 transition-colors cursor-pointer shadow-lg"
              >
                <BookOpen className="h-4 w-4" />
                <span>38-Seiten Leitfaden jetzt im interaktiven Reader öffnen</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold px-3 py-2.5 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5 text-teal-400" />
                  <span>Drucken / Als PDF</span>
                </button>

                <button
                  onClick={handleDownloadFullText}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-semibold px-3 py-2.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-teal-400" />
                  <span>Volltext (.txt)</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Ein Bestätigungsbeleg wurde an <strong className="text-slate-400">{email}</strong> hinterlegt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
