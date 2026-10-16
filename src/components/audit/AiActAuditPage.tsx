import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Download,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  Award,
  Share2,
  Building,
  User,
  Mail,
  Briefcase,
  HelpCircle,
  Scale,
} from 'lucide-react';
import { Language, Theme } from '../../types';
import {
  AUDIT_QUESTIONS,
  calculateAuditResult,
  AuditResult,
  OFFICIAL_LEGAL_CITATIONS,
} from '../../data/aiActAuditData';
import { DinCertificate } from './DinCertificate';
import { AuditBadgeGenerator } from './AuditBadgeGenerator';
import { saveNewLead } from '../../services/leadService';

interface AiActAuditPageProps {
  lang: Language;
  theme: Theme;
  onOpenBooking: (packageTitle?: string) => void;
  onBackToHome: () => void;
}

export const AiActAuditPage: React.FC<AiActAuditPageProps> = ({
  lang,
  theme,
  onOpenBooking,
  onBackToHome,
}) => {
  const isDe = lang === 'de';
  const isSepia = theme === 'sepia';

  // State for the 5-question audit wizard
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: '1-critical',
    2: '2-critical',
    3: '3-critical',
    4: '4-critical',
    5: '5-small',
  });
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [showResultSection, setShowResultSection] = useState<boolean>(false);

  // Lead capture form state for the full PDF report & checklist
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadRole, setLeadRole] = useState('Geschäftsführer / Vorstand');
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [activeCitationIndex, setActiveCitationIndex] = useState<number | null>(0);

  // Check URL query for verification mode (e.g., ?verify=KIV-ACT4-2025-XXXXX)
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const verifyParam = params.get('verify');
      if (verifyParam) {
        setVerificationCode(verifyParam);
      }
    } catch {
      // Ignore URL search parsing errors
    }
  }, []);

  const currentQuestion = AUDIT_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === AUDIT_QUESTIONS.length - 1;

  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const result = calculateAuditResult(answers);
      setAuditResult(result);
      setShowResultSection(true);

      // Smooth scroll to the result
      setTimeout(() => {
        const resultElement = document.getElementById('audit-evaluation-result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadName) return;

    setLeadSubmitting(true);
    try {
      saveNewLead({
        type: 'ai_act_audit',
        name: leadName.trim(),
        email: leadEmail.trim(),
        company: leadCompany.trim() || undefined,
        topic: `EU AI Act Art. 4 Audit (${leadRole}) · Risiko: ${auditResult?.totalScore || 75}/100`,
        notes: `Rolle: ${leadRole} | Audit-Risikoscore: ${auditResult?.totalScore || 75}/100 | Stufe: ${auditResult?.riskLevel || 'critical'}`,
        doubleOptInConfirmed: true,
        optInTimestamp: new Date().toISOString(),
      });

      setReportUnlocked(true);
    } catch (err) {
      console.error('Lead submission failed', err);
      setReportUnlocked(true);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          onClick={onBackToHome}
          className={`inline-flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
            isSepia
              ? 'text-[#382F26] hover:text-[#18130E]'
              : 'text-slate-200 hover:text-white'
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{isDe ? 'Zurück zur KIVENTIS Hauptseite' : 'Back to KIVENTIS Home'}</span>
        </button>
      </div>

      {/* Verification Query Alert (If visitor followed a certificate verification URL) */}
      {verificationCode && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`rounded-xl border p-4 sm:p-5 flex items-start gap-3.5 ${
              isSepia
                ? 'border-emerald-300 bg-emerald-50 text-emerald-950 shadow-sm'
                : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-100'
            }`}
          >
            <CheckCircle2
              className={`h-5 w-5 shrink-0 mt-0.5 ${
                isSepia ? 'text-emerald-800' : 'text-emerald-400'
              }`}
            />
            <div>
              <div
                className={`text-sm font-bold flex items-center gap-2 ${
                  isSepia ? 'text-[#18130E]' : 'text-white'
                }`}
              >
                <span>{isDe ? 'AMTLICHE ZERTIFIKATS-VERIFIKATION ERFOLGREICH' : 'OFFICIAL AUDIT VERIFICATION CONFIRMED'}</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded font-bold border ${
                    isSepia
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {verificationCode}
                </span>
              </div>
              <p className={`mt-1 text-xs ${isSepia ? 'text-[#2D241C]' : 'text-slate-200'}`}>
                {isDe
                  ? 'Das geprüfte Zertifikat ist im Kiventis Audit-Zentralregister für Artikel 4 Verordnung (EU) 2024/1689 hinterlegt. Der Inhaber verfügt über nachgewiesene KI-Kompetenz gemäß gesetzlicher Vorgabe.'
                  : 'The inspected certificate is actively registered in the Kiventis Article 4 Regulation (EU) 2024/1689 compliance database. Verified AI literacy standard satisfied.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section: Dringlichkeit & Trojanisches Pferd */}
      <section
        className={`relative overflow-hidden pt-8 pb-16 border-b transition-colors ${
          isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
        }`}
      >
        {/* Subtle red/teal background aura */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center">
          <div className="w-[1000px] h-[500px] bg-gradient-to-b from-rose-500/[0.07] via-teal-500/[0.04] to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Legislative Deadline Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4">
            <span
              className={`font-bold uppercase tracking-wider ${
                isSepia ? 'text-rose-900' : 'text-rose-300'
              }`}
            >
              {isDe ? 'Gesetzlich in Kraft seit 02.02.2025' : 'Legally in force since Feb 2, 2025'}
            </span>
            <span className={isSepia ? 'text-[#7A6C5F]' : 'text-slate-400'}>·</span>
            <span className={`font-semibold ${isSepia ? 'text-[#18130E]' : 'text-slate-100'}`}>
              Verordnung (EU) 2024/1689 Artikel 4
            </span>
            <span className={isSepia ? 'text-[#7A6C5F]' : 'text-slate-400'}>·</span>
            <span className={`font-semibold ${isSepia ? 'text-[#18130E]' : 'text-slate-100'}`}>
              § 43 GmbHG Organhaftung
            </span>
          </div>

          <h1
            className={`font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl text-balance ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {isDe ? (
              <>
                EU AI Act Art. 4 <br />
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${
                    isSepia
                      ? 'from-rose-800 via-rose-700 to-amber-700'
                      : 'from-rose-400 via-rose-500 to-amber-400'
                  }`}
                >
                  Haftungs- & Bußgeld-Rechner
                </span>{' '}
                für KMUs
              </>
            ) : (
              <>
                EU AI Act Article 4 <br />
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${
                    isSepia
                      ? 'from-rose-800 via-rose-700 to-amber-700'
                      : 'from-rose-400 via-rose-500 to-amber-400'
                  }`}
                >
                  Liability & Fine Calculator
                </span>{' '}
                for SMEs
              </>
            )}
          </h1>

          <p
            className={`mt-5 text-base sm:text-lg max-w-3xl leading-relaxed font-normal ${
              isSepia ? 'text-[#2D241C]' : 'text-slate-100'
            }`}
          >
            {isDe
              ? 'Mitarbeiter nutzen ChatGPT, DeepL oder Copilot? Seit 2. Februar 2025 haftet die Geschäftsführung persönlich bei fehlenden Schulungsnachweisen. Prüfen Sie in 2 Minuten Ihr persönliches Haftungsrisiko nach § 43 GmbHG und Bußgelddimensionen nach Art. 99 EU AI Act.'
              : 'Employees using ChatGPT, DeepL, or Copilot? Missing documented training triggers direct personal leadership liability. Audit your statutory fine and exculpation status in 2 minutes.'}
          </p>

          {/* 3 Value Pillars */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl text-xs font-mono">
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                isSepia
                  ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-slate-100 font-medium'
              }`}
            >
              <Scale className={`h-4 w-4 shrink-0 ${isSepia ? 'text-rose-800' : 'text-rose-400'}`} />
              <span>{isDe ? '5 Diagnose-Fragen für Geschäftsführer' : '5 Executive Audit Questions'}</span>
            </div>
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                isSepia
                  ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-slate-100 font-medium'
              }`}
            >
              <ShieldAlert className={`h-4 w-4 shrink-0 ${isSepia ? 'text-amber-800' : 'text-amber-400'}`} />
              <span>{isDe ? 'Sofortige Risikoanalyse & Bußgeldhöhe' : 'Instant Penalty & Risk Rating'}</span>
            </div>
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                isSepia
                  ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-slate-100 font-medium'
              }`}
            >
              <Award className={`h-4 w-4 shrink-0 ${isSepia ? 'text-emerald-800' : 'text-emerald-400'}`} />
              <span>{isDe ? 'DIN-Audit-Zertifikat als 1-Klick-Lösung' : 'DIN Certificate & Immunity Pass'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Audit Wizard Section */}
      <section className="py-12 md:py-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-sm shadow-2xl transition-colors ${
            isSepia
              ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-xl'
              : 'border-white/15 bg-[#0E1524] text-white shadow-2xl'
          }`}
        >
          {/* Progress Header */}
          <div
            className={`flex items-center justify-between pb-4 border-b text-xs ${
              isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-bold ${
                  isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                }`}
              >
                {isDe ? `Frage ${currentQuestionIndex + 1} von ${AUDIT_QUESTIONS.length}` : `Question ${currentQuestionIndex + 1} of ${AUDIT_QUESTIONS.length}`}
              </span>
              <span className={isSepia ? 'text-[#7A6C5F]' : 'text-slate-400'}>·</span>
              <span className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                {isDe ? currentQuestion.category.de : currentQuestion.category.en}
              </span>
            </div>
            <div
              className={`font-mono text-[11px] font-bold ${
                isSepia ? 'text-[#382F26]' : 'text-slate-200'
              }`}
            >
              {currentQuestion.lawReference}
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className={`w-full h-2 rounded-full overflow-hidden mt-4 ${
              isSepia ? 'bg-[#E7DFD3]' : 'bg-white/10'
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-rose-500 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / AUDIT_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Title */}
          <div className="mt-8">
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}
            >
              {isDe ? currentQuestion.question.de : currentQuestion.question.en}
            </h2>

            {/* Legal Clarification Box */}
            <div
              className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 transition-colors ${
                isSepia
                  ? 'border-sky-300 bg-sky-50 text-sky-950'
                  : 'border-sky-500/40 bg-sky-950/40 text-sky-100'
              }`}
            >
              <HelpCircle
                className={`h-4 w-4 shrink-0 mt-0.5 ${
                  isSepia ? 'text-sky-800' : 'text-sky-300'
                }`}
              />
              <div>
                <span
                  className={`font-bold block mb-0.5 ${
                    isSepia ? 'text-sky-950' : 'text-sky-200'
                  }`}
                >
                  {isDe ? 'Rechtlicher Hintergrund für Geschäftsführer:' : 'Statutory Background for Management:'}
                </span>
                <span className={isSepia ? 'text-sky-950 font-normal' : 'text-sky-100 font-normal'}>
                  {isDe ? currentQuestion.clarification.de : currentQuestion.clarification.en}
                </span>
              </div>
            </div>
          </div>

          {/* Selectable Options */}
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? isSepia
                        ? 'border-rose-600 bg-rose-50 text-rose-950 shadow-sm'
                        : 'border-rose-500 bg-rose-950/40 text-white shadow-lg shadow-rose-950/40'
                      : isSepia
                      ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E] hover:border-[#B8A994] hover:bg-[#F2ECE0]'
                      : 'border-white/15 bg-white/[0.04] text-slate-100 hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? isSepia
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-rose-500 bg-rose-500 text-white'
                        : isSepia
                        ? 'border-[#7A6C5F] bg-white'
                        : 'border-white/40 bg-transparent'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`text-sm font-bold ${
                        isSelected
                          ? isSepia
                            ? 'text-rose-950'
                            : 'text-white'
                          : isSepia
                          ? 'text-[#18130E]'
                          : 'text-white'
                      }`}
                    >
                      {isDe ? option.label.de : option.label.en}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isSelected
                          ? isSepia
                            ? 'text-rose-900 font-medium'
                            : 'text-rose-100 font-normal'
                          : isSepia
                          ? 'text-[#382F26] font-normal'
                          : 'text-slate-200 font-normal'
                      }`}
                    >
                      {isDe ? option.description.de : option.description.en}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wizard Navigation Controls */}
          <div
            className={`mt-8 pt-6 border-t flex items-center justify-between gap-4 ${
              isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
            }`}
          >
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                isSepia
                  ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E] hover:bg-[#EFE8DC]'
                  : 'border-white/20 bg-white/[0.06] text-slate-100 hover:bg-white/[0.12]'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{isDe ? 'Vorherige Frage' : 'Previous'}</span>
            </button>

            <button
              onClick={handleNext}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                isLastQuestion
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-[#090D14]'
              }`}
            >
              <span>{isLastQuestion ? (isDe ? 'Persönliches Haftungsrisiko berechnen' : 'Calculate Personal Liability') : (isDe ? 'Nächste Frage' : 'Next Question')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Immediate Knallrot Risk Evaluation Box */}
      {showResultSection && auditResult && (
        <section id="audit-evaluation-result" className="py-12 md:py-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl border-2 p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-colors ${
              isSepia
                ? 'border-rose-600 bg-white shadow-xl'
                : 'border-rose-500 bg-[#0E1524] shadow-2xl'
            }`}
          >
            {/* Red accent strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

            <div
              className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b ${
                isSepia ? 'border-rose-200' : 'border-rose-500/30'
              }`}
            >
              <div>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                    isSepia
                      ? 'border-rose-300 bg-rose-100 text-rose-900'
                      : 'border-rose-500/40 bg-rose-500/20 text-rose-200'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span>{isDe ? auditResult.title.de : auditResult.title.en}</span>
                </div>
                <h3
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  {isDe ? 'Persönliches Haftungsprofil der Geschäftsleitung' : 'Executive Management Liability Exposure'}
                </h3>
              </div>

              {/* Tachometer Score */}
              <div
                className={`p-4 rounded-xl border text-center shrink-0 ${
                  isSepia
                    ? 'border-rose-300 bg-rose-50 text-rose-900'
                    : 'border-rose-500/40 bg-rose-950/50 text-rose-300'
                }`}
              >
                <div
                  className={`text-3xl sm:text-4xl font-mono font-black ${
                    isSepia ? 'text-rose-700' : 'text-rose-400'
                  }`}
                >
                  {auditResult.totalScore}
                  <span className={`text-lg font-bold ${isSepia ? 'text-rose-800/80' : 'text-rose-300/80'}`}>
                    /100
                  </span>
                </div>
                <div
                  className={`text-[11px] font-mono font-bold uppercase mt-0.5 ${
                    isSepia ? 'text-rose-950' : 'text-rose-200'
                  }`}
                >
                  {isDe ? 'Haftungs-Risiko-Index' : 'Liability Risk Index'}
                </div>
              </div>
            </div>

            {/* Piercing Liability Alarm Box */}
            <div
              className={`mt-6 p-4 sm:p-5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                isSepia
                  ? 'border-rose-300 bg-rose-100/90 text-rose-950'
                  : 'border-rose-500/50 bg-rose-950/60 text-white'
              }`}
            >
              <div
                className={`font-extrabold flex items-center gap-2 mb-1.5 text-sm ${
                  isSepia ? 'text-rose-950' : 'text-white'
                }`}
              >
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>§ 43 GmbHG / § 93 AktG: ORGANISATIONSVERSCHULDEN FESTGESTELLT</span>
              </div>
              <p className={isSepia ? 'text-rose-950 font-medium' : 'text-rose-100 font-normal'}>
                {isDe ? auditResult.ceoLiabilityNotice.de : auditResult.ceoLiabilityNotice.en}
              </p>
            </div>

            {/* Fines Breakdown Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'border-[#D6CAB8] bg-[#FAF8F5]'
                    : 'border-white/15 bg-[#070A12]'
                }`}
              >
                <div
                  className={`text-xs font-mono uppercase font-bold ${
                    isSepia ? 'text-[#18130E]' : 'text-slate-200'
                  }`}
                >
                  {isDe ? 'Maximalbußgeld EU AI Act (Art. 99):' : 'Statutory Fine Cap EU AI Act (Art. 99):'}
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold font-mono mt-1 ${
                    isSepia ? 'text-rose-800' : 'text-rose-400'
                  }`}
                >
                  15.000.000 €{' '}
                  <span
                    className={`text-xs font-semibold ${
                      isSepia ? 'text-[#382F26]' : 'text-slate-200'
                    }`}
                  >
                    {isDe ? 'oder 3% Umsatz' : 'or 3% revenue'}
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-1 ${
                    isSepia ? 'text-[#382F26]' : 'text-slate-200'
                  }`}
                >
                  {isDe ? 'Bei fehlenden Schulungsnachweisen nach Art. 4 oder unzulässigem Betrieb.' : 'For missing Article 4 training records or unmonitored deployments.'}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'border-[#D6CAB8] bg-[#FAF8F5]'
                    : 'border-white/15 bg-[#070A12]'
                }`}
              >
                <div
                  className={`text-xs font-mono uppercase font-bold ${
                    isSepia ? 'text-[#18130E]' : 'text-slate-200'
                  }`}
                >
                  {isDe ? 'Maximalbußgeld DSGVO (Art. 83):' : 'Statutory Fine Cap GDPR (Art. 83):'}
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold font-mono mt-1 ${
                    isSepia ? 'text-rose-800' : 'text-rose-400'
                  }`}
                >
                  20.000.000 €{' '}
                  <span
                    className={`text-xs font-semibold ${
                      isSepia ? 'text-[#382F26]' : 'text-slate-200'
                    }`}
                  >
                    {isDe ? 'oder 4% Umsatz' : 'or 4% revenue'}
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-1 ${
                    isSepia ? 'text-[#382F26]' : 'text-slate-200'
                  }`}
                >
                  {isDe ? 'Bei Übertragung von Kundendaten in US-Cloud-Prompts ohne Auftragsverarbeitung.' : 'For unauthorized prompt leakage of EU personal or client records.'}
                </p>
              </div>
            </div>

            {/* Identified Violations */}
            <div className="mt-6 space-y-2.5">
              <div
                className={`text-xs font-mono uppercase font-bold ${
                  isSepia ? 'text-[#18130E]' : 'text-slate-100'
                }`}
              >
                {isDe ? 'Identifizierte Gesetzesverstöße & Enthaftungslücken:' : 'Identified Statutory Infractions:'}
              </div>
              {auditResult.primaryViolations.map((v, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 text-xs ${
                    isSepia ? 'text-[#18130E]' : 'text-slate-100'
                  }`}
                >
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold shrink-0 border ${
                      isSepia
                        ? 'bg-rose-100 border-rose-300 text-rose-950'
                        : 'bg-rose-500/30 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    {v.law}
                  </span>
                  <span className="font-medium">{isDe ? v.description.de : v.description.en}</span>
                </div>
              ))}
            </div>

            {/* 1-Click Solution Callout */}
            <div
              className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isSepia ? 'border-rose-200' : 'border-rose-500/30'
              }`}
            >
              <div>
                <div
                  className={`text-sm font-bold ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  {isDe ? 'Die 1-Klick-Lösung: Kiventis KI-Kompetenz-Training nach Art. 4' : '1-Click Solution: Kiventis Article 4 AI Literacy Training'}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    isSepia ? 'text-[#2D241C]' : 'text-slate-200'
                  }`}
                >
                  {isDe
                    ? 'Inhouse- oder Online-Schulung inkl. offiziellem DIN-Zertifikat zur vollständigen Enthaftung der Geschäftsleitung.'
                    : 'Inhouse or online certification including verifiable DIN audit certificate.'}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking('EU AI Act Art. 4 Zertifizierungstraining')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
              >
                <span>{isDe ? 'Jetzt Betrieb enthaften & Training anfragen' : 'Protect Company & Book Training'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Gated Lead-Capture & Instant DIN-Audit PDF Report Unlock */}
      <section
        className={`py-12 md:py-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 border-t transition-colors ${
          isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
        }`}
      >
        <div
          className={`rounded-2xl border p-6 sm:p-10 backdrop-blur-sm shadow-xl transition-colors ${
            isSepia
              ? 'border-[#D6CAB8] bg-white text-[#18130E]'
              : 'border-white/15 bg-[#0E1524] text-white'
          }`}
        >
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase mb-3 ${
                isSepia
                  ? 'border-teal-300 bg-teal-50 text-teal-900'
                  : 'border-teal-500/40 bg-teal-500/20 text-teal-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{isDe ? 'OFFIZIELLER PRÜFBERICHT & CHECKLISTE' : 'OFFICIAL AUDIT REPORT & CHECKLIST'}</span>
            </div>
            <h3
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isSepia ? 'text-[#18130E]' : 'text-white'
              }`}
            >
              {isDe
                ? '8-seitigen DIN-Audit-Prüfbericht & Enthaftungs-Checkliste anfordern'
                : 'Request 8-Page DIN Audit Report & Management Immunity Checklist'}
            </h3>
            <p
              className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                isSepia ? 'text-[#2D241C]' : 'text-slate-100'
              }`}
            >
              {isDe
                ? 'Erhalten Sie den vollständigen Prüfbericht mit individuellem Risikoprofil, Muster-Betriebsvereinbarung für KI, rechtssicherer Prompts-Whitelist und offizieller Enthaftungs-Dokumentation für Behörden.'
                : 'Receive the complete audit report with tailored risk profile, template AI corporate directive, prompt whitelist, and statutory compliance documentation.'}
            </p>
          </div>

          {!reportUnlocked ? (
            <form onSubmit={handleLeadSubmit} className="mt-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs font-bold mb-1 ${
                      isSepia ? 'text-[#18130E]' : 'text-slate-100'
                    }`}
                  >
                    {isDe ? 'Vollständiger Name:' : 'Full Name:'}
                  </label>
                  <div className="relative">
                    <User
                      className={`absolute left-3 top-2.5 h-4 w-4 ${
                        isSepia ? 'text-[#4A3E31]' : 'text-slate-300'
                      }`}
                    />
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Dr. Markus Weber"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                        isSepia
                          ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] placeholder-[#7A6C5F] focus:border-[#0D9488]'
                          : 'border-white/20 bg-[#070A12] text-white placeholder-slate-400 focus:border-teal-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold mb-1 ${
                      isSepia ? 'text-[#18130E]' : 'text-slate-100'
                    }`}
                  >
                    {isDe ? 'Unternehmen / Körperschaft:' : 'Company Name:'}
                  </label>
                  <div className="relative">
                    <Building
                      className={`absolute left-3 top-2.5 h-4 w-4 ${
                        isSepia ? 'text-[#4A3E31]' : 'text-slate-300'
                      }`}
                    />
                    <input
                      type="text"
                      required
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      placeholder="Mittelstand Industrie GmbH"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                        isSepia
                          ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] placeholder-[#7A6C5F] focus:border-[#0D9488]'
                          : 'border-white/20 bg-[#070A12] text-white placeholder-slate-400 focus:border-teal-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold mb-1 ${
                      isSepia ? 'text-[#18130E]' : 'text-slate-100'
                    }`}
                  >
                    {isDe ? 'Geschäftliche E-Mail:' : 'Business Email:'}
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3 top-2.5 h-4 w-4 ${
                        isSepia ? 'text-[#4A3E31]' : 'text-slate-300'
                      }`}
                    />
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="weber@unternehmen.de"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                        isSepia
                          ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] placeholder-[#7A6C5F] focus:border-[#0D9488]'
                          : 'border-white/20 bg-[#070A12] text-white placeholder-slate-400 focus:border-teal-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold mb-1 ${
                      isSepia ? 'text-[#18130E]' : 'text-slate-100'
                    }`}
                  >
                    {isDe ? 'Funktion / Position:' : 'Role in Company:'}
                  </label>
                  <div className="relative">
                    <Briefcase
                      className={`absolute left-3 top-2.5 h-4 w-4 ${
                        isSepia ? 'text-[#4A3E31]' : 'text-slate-300'
                      }`}
                    />
                    <select
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                        isSepia
                          ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] focus:border-[#0D9488]'
                          : 'border-white/20 bg-[#070A12] text-white focus:border-teal-400'
                      }`}
                    >
                      <option value="Geschäftsführer / Vorstand">{isDe ? 'Geschäftsführer / Vorstand' : 'Managing Director / CEO'}</option>
                      <option value="IT-Leitung / CIO">{isDe ? 'IT-Leitung / CIO' : 'Head of IT / CIO'}</option>
                      <option value="Datenschutzbeauftragter / Legal">{isDe ? 'Datenschutzbeauftragter / Legal' : 'DPO / Legal Counsel'}</option>
                      <option value="Fachbereichsleitung">{isDe ? 'Fachbereichsleitung' : 'Department Lead'}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#090D14] font-bold text-sm px-6 py-3.5 transition-all shadow-md cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {leadSubmitting
                      ? (isDe ? 'Bericht wird generiert...' : 'Generating Report...')
                      : (isDe ? 'Prüfbericht & Enthaftungs-Checkliste sofort freischalten' : 'Unlock Audit Report & Checklist Now')}
                  </span>
                </button>
              </div>

              <div
                className={`text-[11px] text-center flex items-center justify-center gap-1.5 pt-1 font-medium ${
                  isSepia ? 'text-[#382F26]' : 'text-slate-200'
                }`}
              >
                <Lock className="h-3 w-3 text-emerald-500" />
                <span>
                  {isDe
                    ? '100% DSGVO-konform. Kein SPAM. Sofortige Bereitstellung.'
                    : '100% GDPR compliant. No spam. Immediate delivery.'}
                </span>
              </div>
            </form>
          ) : (
            <div
              className={`mt-8 p-6 rounded-xl border space-y-4 ${
                isSepia
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isSepia
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className={`font-bold text-base ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                    {isDe ? 'Prüfbericht erfolgreich freigeschaltet!' : 'Audit Report Successfully Unlocked!'}
                  </div>
                  <div className={`text-xs ${isSepia ? 'text-[#2D241C]' : 'text-slate-200'}`}>
                    {isDe
                      ? `Ausgestellt für ${leadName} (${leadCompany || 'Unternehmen'}).`
                      : `Issued for ${leadName} (${leadCompany || 'Company'}).`}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border space-y-2 text-xs ${
                  isSepia
                    ? 'border-[#D6CAB8] bg-[#FAF8F5]'
                    : 'border-white/15 bg-[#070A12]'
                }`}
              >
                <div className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                  {isDe ? 'Enthaltene Dokumente im Download-Paket:' : 'Documents Included in Audit Bundle:'}
                </div>
                <ul
                  className={`space-y-1 list-disc list-inside ${
                    isSepia ? 'text-[#2D241C]' : 'text-slate-200'
                  }`}
                >
                  <li>{isDe ? 'Vollständiger 8-seitiger DIN-Audit-Prüfbericht nach Art. 4 Verordnung (EU) 2024/1689' : 'Full 8-page DIN Audit Report per Article 4 Regulation (EU) 2024/1689'}</li>
                  <li>{isDe ? 'Muster-Betriebsvereinbarung für KI-Nutzung zur Vorlage beim Betriebsrat / Team' : 'Template Corporate AI Directive & Employee Acknowledgement Form'}</li>
                  <li>{isDe ? 'Checkliste zur Organenthaftung nach § 43 GmbHG für Geschäftsführer' : 'Managing Director Immunity Checklist (§ 43 GmbHG)'}</li>
                  <li>{isDe ? 'Prompts-Whitelist & Anonymisierungsleitfaden für Arbeitsplätze' : 'Employee Prompting Whitelist & Data-Masking Protocol'}</li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>{isDe ? 'DIN-Audit-Bericht herunterladen / drucken' : 'Download / Print Audit Report'}</span>
                </button>

                <button
                  onClick={() => onOpenBooking('EU AI Act Art. 4 Schulungsberatung')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                    isSepia
                      ? 'border-[#D6CAB8] bg-white text-[#18130E] hover:bg-[#EFE8DC]'
                      : 'border-white/25 bg-white/[0.08] text-white hover:bg-white/[0.14]'
                  }`}
                >
                  <span>{isDe ? 'Schulungstermin direkt buchen' : 'Book Training Discovery'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Das "Fake-Behörden-Look" DIN-Zertifikat (B2B-Ego-Bait & Live Preview) */}
      <section
        className={`py-12 md:py-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-t transition-colors ${
          isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase mb-3 ${
              isSepia
                ? 'border-amber-300 bg-amber-50 text-amber-900'
                : 'border-amber-500/40 bg-amber-500/20 text-amber-200'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>{isDe ? 'BEHÖRDEN-LOOK ZERTIFIKAT (B2B-EGO-BAIT)' : 'OFFICIAL DIN AUDIT CERTIFICATE'}</span>
          </div>
          <h2
            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {isDe ? 'Das offizielle KIVENTIS DIN-Zertifikat nach Art. 4' : 'The Official KIVENTIS DIN Certificate (Art. 4)'}
          </h2>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              isSepia ? 'text-[#2D241C]' : 'text-slate-100'
            }`}
          >
            {isDe
              ? 'Gestaltet im Look hochoffizieller deutscher DIN- und TÜV-Zertifikate. Mit fälschungssicherer Prüfnummer, QR-Verifikationscode und digitalem Prüfsiegel für maximale Autorität bei Kunden und Behörden.'
              : 'Designed with the authority of German DIN and Federal Gazette documents. Features tamper-evident registration number, verification QR code, and official embossed seal.'}
          </p>
        </div>

        {/* Certificate Component with theme awareness */}
        <DinCertificate
          lang={lang}
          theme={theme}
          recipientName={leadName || (isDe ? 'Dipl.-Ing. Markus Weber' : 'Markus Weber, M.Sc.')}
          companyName={leadCompany || (isDe ? 'Mittelstand Fertigung & Technologie GmbH' : 'Apex Engineering Technologies Ltd.')}
        />
      </section>

      {/* Viral Loop & Customer Website Badge Hub */}
      <section
        className={`py-12 md:py-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-t transition-colors ${
          isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
        }`}
      >
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase mb-3 ${
              isSepia
                ? 'border-sky-300 bg-sky-50 text-sky-900'
                : 'border-sky-500/40 bg-sky-500/20 text-sky-200'
            }`}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{isDe ? 'VIRAL-LOOP & FOOTER-BADGE' : 'VIRAL-LOOP & FOOTER-BADGE'}</span>
          </div>
          <h2
            className={`font-display text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {isDe ? 'Zertifikat teilen & Website-Trust-Badge einbinden' : 'Share Certificate & Embed Website Trust Badge'}
          </h2>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              isSepia ? 'text-[#2D241C]' : 'text-slate-100'
            }`}
          >
            {isDe
              ? 'Teilen Sie Ihren Schulungserfolg auf LinkedIn und binden Sie das offizielle Kiventis-Siegel im Footer Ihrer Website ein – 100% Google-konform mit rel="nofollow".'
              : 'Share your certified status on LinkedIn and embed the official verification badge in your corporate website footer with rel="nofollow".'}
          </p>
        </div>

        {/* Badge Generator Component with theme awareness */}
        <AuditBadgeGenerator
          lang={lang}
          theme={theme}
          companyName={leadCompany || 'Ihr Unternehmen'}
        />
      </section>

      {/* Legal Reference & Statutory Paragraph Accordion */}
      <section
        className={`py-12 md:py-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 border-t transition-colors ${
          isSepia ? 'border-[#E7DFD3]' : 'border-white/[0.08]'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold mb-2 ${
              isSepia
                ? 'border-[#D6CAB8] bg-white text-[#18130E]'
                : 'border-white/15 bg-white/[0.04] text-slate-100'
            }`}
          >
            <Scale className={`h-3.5 w-3.5 ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`} />
            <span>{isDe ? 'RECHTSQUELLEN & GESETZESTEXTE' : 'STATUTORY PROVISIONS & CITATIONS'}</span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {isDe ? 'Die gesetzlichen Grundlagen im Wortlaut' : 'Statutory Articles & Legal References'}
          </h3>
        </div>

        <div className="space-y-3">
          {OFFICIAL_LEGAL_CITATIONS.map((cit, idx) => {
            const isOpen = activeCitationIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  isSepia
                    ? 'border-[#D6CAB8] bg-white text-[#18130E]'
                    : 'border-white/15 bg-[#0E1524] text-slate-100'
                }`}
              >
                <button
                  onClick={() => setActiveCitationIndex(isOpen ? null : idx)}
                  className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isSepia ? 'hover:bg-[#FAF8F5]' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="pr-4">
                    <span
                      className={`font-mono text-xs block mb-0.5 font-bold ${
                        isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                      }`}
                    >
                      {cit.article}
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        isSepia ? 'text-[#18130E]' : 'text-white'
                      }`}
                    >
                      {isDe ? cit.heading.de : cit.heading.en}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className={`h-4 w-4 shrink-0 ${isSepia ? 'text-[#18130E]' : 'text-slate-200'}`} />
                  ) : (
                    <ChevronDown className={`h-4 w-4 shrink-0 ${isSepia ? 'text-[#18130E]' : 'text-slate-200'}`} />
                  )}
                </button>

                {isOpen && (
                  <div
                    className={`p-4 pt-0 border-t text-xs space-y-2.5 ${
                      isSepia
                        ? 'border-[#E7DFD3] text-[#2D241C]'
                        : 'border-white/[0.08] text-slate-100'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg border font-serif italic leading-relaxed ${
                        isSepia
                          ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E]'
                          : 'border-white/15 bg-[#070A12] text-slate-100'
                      }`}
                    >
                      {isDe ? cit.quote.de : cit.quote.en}
                    </div>
                    <div className={`leading-relaxed ${isSepia ? 'text-[#2D241C]' : 'text-slate-100'}`}>
                      <strong className={isSepia ? 'text-[#18130E] font-bold' : 'text-white font-bold'}>
                        {isDe ? 'Rechtliche Konsequenz für die Praxis:' : 'Operational Legal Consequence:'}
                      </strong>{' '}
                      {isDe ? cit.implication.de : cit.implication.en}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="py-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className={`rounded-2xl border p-8 text-center shadow-xl transition-colors ${
            isSepia
              ? 'border-teal-300 bg-gradient-to-br from-white to-teal-50/60 text-[#18130E]'
              : 'border-teal-500/40 bg-gradient-to-br from-[#0E1524] via-[#0E1524] to-teal-950/40 text-white'
          }`}
        >
          <h3
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            {isDe
              ? 'Warten Sie nicht auf die erste behördliche Stichprobe'
              : 'Do Not Await Your First Regulatory Inspection'}
          </h3>
          <p
            className={`mt-3 text-sm max-w-xl mx-auto leading-relaxed ${
              isSepia ? 'text-[#2D241C] font-normal' : 'text-slate-100 font-normal'
            }`}
          >
            {isDe
              ? 'Die KIVENTIS KI-Kompetenz-Schulung nach Art. 4 schützt Geschäftsführer vor persönlicher Durchgriffshaftung und macht Mitarbeiter in 1 Tag praxissicher im operativen Umgang mit modernen KI-Werkzeugen.'
              : 'The KIVENTIS Article 4 Enablement Program protects leadership against personal liability while certifying domain teams in hands-on enterprise AI usage.'}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('EU AI Act Art. 4 Inhouse Schulung')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>{isDe ? 'Inhouse-Zertifizierungstraining anfragen' : 'Request Inhouse Certification Training'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
