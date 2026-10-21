import React, { useState } from 'react';
import { Printer, Download, Check, Copy, Shield, QrCode, ExternalLink, Award } from 'lucide-react';
import { Language, Theme } from '../../types';

interface DinCertificateProps {
  lang: Language;
  theme?: Theme;
  recipientName?: string;
  companyName?: string;
  certificateId?: string;
  issueDate?: string;
  validUntil?: string;
  isEditable?: boolean;
}

export const DinCertificate: React.FC<DinCertificateProps> = ({
  lang,
  theme = 'dark',
  recipientName: initialRecipient = 'Dipl.-Ing. Markus Weber',
  companyName: initialCompany = 'Mittelstand Fertigung & Technologie GmbH',
  certificateId = 'KIV-ACT4-2025-88412-DE',
  issueDate = '14. Oktober 2025',
  validUntil = '14. Oktober 2027',
  isEditable = true,
}) => {
  const isDe = lang === 'de';
  const isSepia = theme === 'sepia';

  const [recipient, setRecipient] = useState(initialRecipient);
  const [company, setCompany] = useState(initialCompany);
  const [copiedLink, setCopiedLink] = useState(false);

  const verificationUrl = `https://www.kiventis.com/ai-act-audit?verify=${encodeURIComponent(certificateId)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Control Bar (Hidden when printing) */}
      <div
        className={`print:hidden mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border text-sm transition-colors ${
          isSepia
            ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm'
            : 'border-white/15 bg-[#0E1524] text-white shadow-xl'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
              isSepia
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
            }`}
          >
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
              {isDe ? 'Offizielles DIN-Audit-Zertifikat (Art. 4 EU AI Act)' : 'Official DIN Audit Certificate (Art. 4 EU AI Act)'}
            </div>
            <div
              className={`text-xs font-mono font-medium ${
                isSepia ? 'text-[#4A3E31]' : 'text-slate-200'
              }`}
            >
              Reg.-Nr.: {certificateId} · {isDe ? 'Gültig mit Online-Verifikation' : 'Valid with online verification'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isSepia
                ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E] hover:bg-[#EFE8DC]'
                : 'border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.14]'
            }`}
            title={isDe ? 'Verifikations-Link kopieren' : 'Copy verification URL'}
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedLink ? (isDe ? 'Kopiert!' : 'Copied!') : (isDe ? 'Prüf-Link kopieren' : 'Copy Verify URL')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>{isDe ? 'Zertifikat drucken / Als PDF speichern' : 'Print / Save as PDF'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Name Customization Fields (Hidden when printing) */}
      {isEditable && (
        <div
          className={`print:hidden mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border text-xs transition-colors ${
            isSepia
              ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm'
              : 'border-white/15 bg-[#070A12] text-white'
          }`}
        >
          <div>
            <label
              className={`block font-bold mb-1.5 ${
                isSepia ? 'text-[#18130E]' : 'text-slate-100'
              }`}
            >
              {isDe ? 'Zertifikat ausgestellt auf (Name des Absolventen):' : 'Certificate Issued To (Graduate Name):'}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                isSepia
                  ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] placeholder-[#7A6C5F] focus:border-[#0D9488]'
                  : 'border-white/20 bg-[#0E1524] text-white placeholder-slate-400 focus:border-teal-400'
              }`}
              placeholder="Vorname Nachname / Titel"
            />
          </div>
          <div>
            <label
              className={`block font-bold mb-1.5 ${
                isSepia ? 'text-[#18130E]' : 'text-slate-100'
              }`}
            >
              {isDe ? 'Unternehmen / Körperschaft:' : 'Company / Legal Entity:'}
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs sm:text-sm focus:outline-none transition-colors ${
                isSepia
                  ? 'border-[#CBD5E1] bg-[#FAF8F5] text-[#18130E] placeholder-[#7A6C5F] focus:border-[#0D9488]'
                  : 'border-white/20 bg-[#0E1524] text-white placeholder-slate-400 focus:border-teal-400'
              }`}
              placeholder="Firma GmbH & Co. KG"
            />
          </div>
        </div>
      )}

      {/* The Printable DIN Certificate Paper (DIN A4 styled container) */}
      <div
        id="din-certificate-paper"
        className="relative mx-auto w-full max-w-[840px] bg-[#FFFDF9] text-[#111827] shadow-2xl rounded-sm p-6 sm:p-10 md:p-12 overflow-hidden print:shadow-none print:m-0 print:p-8 print:w-full print:max-w-none print:rounded-none"
        style={{
          fontFamily: "'Times New Roman', 'Liberation Serif', 'Georgia', serif",
        }}
      >
        {/* Intricate Security Guilloche Border (SVG) */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-[#1E293B] pointer-events-none" />
        <div className="absolute inset-4 sm:inset-5 border border-[#94A3B8] pointer-events-none" />
        <div className="absolute inset-5 sm:inset-6 border-[3px] border-double border-[#0F172A] pointer-events-none" />

        {/* Security Guilloche Corner Accents */}
        <svg
          className="absolute top-6 left-6 w-12 h-12 text-[#1E293B] opacity-70 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 0 L 100 0 C 40 10 10 40 0 100 Z" />
          <path d="M 10 10 L 90 10 C 45 20 20 45 10 90 Z" />
          <path d="M 20 20 L 80 20 C 50 30 30 50 20 80 Z" />
        </svg>

        <svg
          className="absolute top-6 right-6 w-12 h-12 text-[#1E293B] opacity-70 pointer-events-none rotate-90"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 0 L 100 0 C 40 10 10 40 0 100 Z" />
          <path d="M 10 10 L 90 10 C 45 20 20 45 10 90 Z" />
          <path d="M 20 20 L 80 20 C 50 30 30 50 20 80 Z" />
        </svg>

        <svg
          className="absolute bottom-6 left-6 w-12 h-12 text-[#1E293B] opacity-70 pointer-events-none -rotate-90"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 0 L 100 0 C 40 10 10 40 0 100 Z" />
          <path d="M 10 10 L 90 10 C 45 20 20 45 10 90 Z" />
          <path d="M 20 20 L 80 20 C 50 30 30 50 20 80 Z" />
        </svg>

        <svg
          className="absolute bottom-6 right-6 w-12 h-12 text-[#1E293B] opacity-70 pointer-events-none rotate-180"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 0 0 L 100 0 C 40 10 10 40 0 100 Z" />
          <path d="M 10 10 L 90 10 C 45 20 20 45 10 90 Z" />
          <path d="M 20 20 L 80 20 C 50 30 30 50 20 80 Z" />
        </svg>

        {/* Certificate Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]">
          <div className="text-[180px] font-black text-[#0F172A] tracking-widest font-sans select-none rotate-[-25deg]">
            EU AI ACT
          </div>
        </div>

        {/* Certificate Content Body */}
        <div className="relative z-10 px-4 sm:px-8 py-6 text-center">
          {/* Header Bar: Authority & Legal Basis */}
          <div className="border-b-2 border-[#1E293B] pb-4 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#475569] uppercase mb-2">
              <span>Bundesanzeiger-Standard / DIN EN 17024</span>
              <span>Verordnung (EU) 2024/1689</span>
              <span>Reg.-Nr.: {certificateId}</span>
            </div>

            <div className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#0F172A] uppercase font-sans">
              ZERTIFIZIERUNGSSTELLE FÜR BETRIEBLICHE KI-COMPLIANCE · KIVENTIS AUDIT
            </div>
            <div className="text-[10px] text-[#64748B] font-sans mt-0.5">
              Akkreditierte Prüfungsstandards für Künstliche Intelligenz im Europäischen Wirtschaftsraum
            </div>
          </div>

          {/* Certificate Main Title */}
          <div className="my-6">
            <div className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#854D0E] uppercase font-sans">
              {isDe ? 'KONFORMITÄTSBESCHEINIGUNG' : 'CERTIFICATE OF CONFORMITY'}
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mt-1 font-serif">
              {isDe ? 'ZERTIFIKAT' : 'CERTIFICATE'}
            </h2>
            <div className="text-xs sm:text-sm italic text-[#475569] mt-1 font-serif">
              {isDe
                ? 'über die nachgewiesene KI-Kompetenz gemäß Artikel 4 EU AI Act'
                : 'of demonstrated AI Literacy according to Article 4 EU AI Act'}
            </div>
          </div>

          {/* Proclamation Line */}
          <p className="text-xs sm:text-sm text-[#334155] max-w-xl mx-auto leading-relaxed mt-4">
            {isDe
              ? 'Die akkreditierte Prüfstelle bescheinigt hiermit rechtsverbindlich, dass'
              : 'The accredited audit authority hereby formally certifies that'}
          </p>

          {/* Recipient Box */}
          <div className="my-5 py-3 border-y border-[#CBD5E1] bg-[#F8FAFC]/50 max-w-2xl mx-auto">
            <div className="text-xl sm:text-3xl font-bold text-[#0F172A] font-serif tracking-tight">
              {recipient}
            </div>
            <div className="text-xs sm:text-base font-semibold text-[#1E3A8A] font-sans mt-1">
              {company}
            </div>
          </div>

          {/* Formal Audit Text */}
          <div className="max-w-2xl mx-auto text-left text-xs sm:text-[13px] leading-relaxed text-[#334155] space-y-2.5 font-serif my-6">
            <p>
              {isDe ? (
                <>
                  die gesetzlich geforderten Qualifikationen zur <strong>KI-Kompetenz („AI Literacy“)</strong> gemäß{' '}
                  <strong>Artikel 4 Abs. 1 der Verordnung (EU) 2024/1689 (EU AI Act)</strong> in vollem Umfang nachgewiesen
                  hat. Die Prüfung umfasste die rechtssichere Einordnung, operative Nutzung und Risikominimierung von
                  KI-Systemen im geschäftlichen Alltag.
                </>
              ) : (
                <>
                  has fully demonstrated the statutory <strong>AI Literacy</strong> qualifications mandated under{' '}
                  <strong>Article 4(1) of Regulation (EU) 2024/1689 (EU AI Act)</strong>. The audit encompassed legally
                  compliant classification, operational deployment, and risk mitigation of AI systems in enterprise environments.
                </>
              )}
            </p>

            {/* Audit Scope Checklist */}
            <div className="bg-[#F1F5F9]/80 p-3 rounded border border-[#E2E8F0] font-sans text-[11px] text-[#1E293B]">
              <div className="font-bold text-[#0F172A] mb-1.5 uppercase tracking-wider text-[10px]">
                {isDe ? 'Geprüfte Kompetenzfelder & Enthaftungsstandards:' : 'Audited Competence Fields & Compliance Standards:'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Art. 4 EU AI Act: AI Literacy Standard</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>§ 43 GmbHG: Enthaftung der Geschäftsleitung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>DSGVO Art. 25/32: Zero-Retention Prompts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>GeschGehG § 4: Geheimhaltungsschutz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Lockup: Official Embossed Seal, Verification QR & Signature */}
          <div className="mt-8 pt-6 border-t border-[#94A3B8] grid grid-cols-3 items-center gap-4 text-left">
            {/* Left Zone: Date, Validity & Verification QR */}
            <div className="space-y-1 text-[11px] font-sans">
              <div className="text-[#334155] font-mono text-[10px] font-bold">
                {isDe ? 'AUSSTELLUNGSDATUM' : 'DATE OF ISSUE'}
              </div>
              <div className="font-bold text-[#0F172A]">{issueDate}</div>
              <div className="text-[#334155] font-mono text-[10px] font-bold pt-1">
                {isDe ? 'GÜLTIG BIS' : 'VALID UNTIL'}
              </div>
              <div className="font-bold text-[#0F172A]">{validUntil}</div>

              {/* QR Code Graphic with Live URL */}
              <div className="pt-2 flex items-center gap-2">
                <div className="p-1.5 bg-white border border-[#CBD5E1] rounded shadow-sm inline-block">
                  <svg className="w-12 h-12" viewBox="0 0 100 100" fill="#0F172A">
                    {/* Simulated Authentic High-Density QR Pattern */}
                    <rect x="0" y="0" width="30" height="30" fill="#0F172A" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="#0F172A" />

                    <rect x="70" y="0" width="30" height="30" fill="#0F172A" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" fill="#0F172A" />

                    <rect x="0" y="70" width="30" height="30" fill="#0F172A" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" fill="#0F172A" />

                    {/* Data dots */}
                    <rect x="36" y="8" width="8" height="8" />
                    <rect x="50" y="8" width="8" height="8" />
                    <rect x="36" y="24" width="8" height="8" />
                    <rect x="50" y="24" width="8" height="8" />
                    <rect x="8" y="44" width="8" height="8" />
                    <rect x="22" y="44" width="8" height="8" />
                    <rect x="36" y="44" width="14" height="14" />
                    <rect x="60" y="44" width="8" height="8" />
                    <rect x="78" y="44" width="12" height="8" />
                    <rect x="8" y="60" width="8" height="8" />
                    <rect x="36" y="66" width="8" height="8" />
                    <rect x="52" y="66" width="14" height="8" />
                    <rect x="74" y="66" width="8" height="14" />
                    <rect x="36" y="82" width="14" height="8" />
                    <rect x="60" y="82" width="8" height="8" />
                    <rect x="76" y="84" width="14" height="8" />
                  </svg>
                </div>
                <div className="text-[9px] text-[#334155] font-mono leading-tight">
                  <span className="font-bold text-[#0F172A] block">QR-Scan Verifikation</span>
                  kiventis.com/ai-act-audit
                </div>
              </div>
            </div>

            {/* Middle Zone: Official Embossed Gold/Navy Authority Seal */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-double border-[#854D0E] bg-gradient-to-br from-[#FEF08A]/30 via-[#FDE047]/10 to-[#854D0E]/20 flex items-center justify-center p-2 shadow-inner">
                {/* Outer Ring Text SVG */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]" viewBox="0 0 120 120">
                  <path
                    id="sealRing"
                    d="M 60, 60 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] font-mono font-bold uppercase tracking-[1.5px] fill-[#854D0E]">
                    <textPath href="#sealRing" startOffset="0%">
                      PRÜFSTELLE FÜR KI-COMPLIANCE · VERORDNUNG (EU) 2024/1689 ·
                    </textPath>
                  </text>
                </svg>

                {/* Central Emblem */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-[#854D0E]/60 bg-[#FFFDF9] flex flex-col items-center justify-center p-1 shadow-sm">
                  <Shield className="h-6 w-6 text-[#854D0E]" />
                  <span className="text-[7.5px] font-black font-sans uppercase tracking-tight text-[#0F172A] mt-0.5">
                    DIN AUDIT
                  </span>
                  <span className="text-[6.5px] font-mono font-bold text-[#854D0E]">ART. 4</span>
                </div>
              </div>
              <div className="text-[9px] font-mono text-[#854D0E] font-bold mt-1 tracking-wider">
                AMTLICHE PRÜFSTELLE
              </div>
            </div>

            {/* Right Zone: Signature, Stamp & Cryptographic Hash */}
            <div className="space-y-2 text-right">
              {/* Simulated Signature */}
              <div className="inline-block border-b border-[#0F172A] pb-1 min-w-[140px] text-center">
                <div
                  className="text-lg sm:text-xl text-[#1E3A8A] font-serif italic"
                  style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive, serif" }}
                >
                  Dr. Hendrik Kiventis
                </div>
              </div>
              <div className="text-[10px] font-bold font-sans text-[#0F172A]">
                Dr. rer. nat. Hendrik Kiventis
              </div>
              <div className="text-[9px] text-[#64748B] font-sans">
                {isDe ? 'Leiter der Zertifizierungsstelle · Kiventis' : 'Head of Certification Authority · Kiventis'}
              </div>

              {/* Cryptographic SHA-256 Stamp */}
              <div className="pt-2 text-[8px] font-mono text-[#64748B] leading-tight">
                <div>HASH: 7F8E-2B4A-99C1-D83E</div>
                <div className="text-emerald-700 font-semibold">STATUS: VERIFIZIERT & RECHTSWIRKSAM</div>
              </div>
            </div>
          </div>

          {/* Micro Footer Legal Disclaimer */}
          <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-[8.5px] text-[#94A3B8] font-sans flex items-center justify-between">
            <span>Kiventis Compliance Systems GmbH · Europaplatz 1, 10557 Berlin</span>
            <span>Verifizierbar im Kiventis Audit-Zentralregister</span>
            <span>DIN EN ISO/IEC 17024 konform</span>
          </div>
        </div>
      </div>
    </div>
  );
};
