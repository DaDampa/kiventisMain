import React, { useState } from 'react';
import { Share2, Shield, Copy, Check, ExternalLink, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, Theme } from '../../types';

interface AuditBadgeGeneratorProps {
  lang: Language;
  theme?: Theme;
  certificateId?: string;
  companyName?: string;
}

export const AuditBadgeGenerator: React.FC<AuditBadgeGeneratorProps> = ({
  lang,
  theme = 'dark',
  certificateId = 'KIV-ACT4-2025-88412-DE',
  companyName = 'Ihr Unternehmen',
}) => {
  const isDe = lang === 'de';
  const isSepia = theme === 'sepia';

  const [copiedBadge, setCopiedBadge] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);
  const [badgeTheme, setBadgeTheme] = useState<'dark' | 'light' | 'warm'>('dark');
  const [badgeStyle, setBadgeStyle] = useState<'standard' | 'minimal'>('standard');

  const verificationUrl = `https://www.kiventis.com/ai-act-audit?verify=${encodeURIComponent(certificateId)}`;

  const linkedInPostText = isDe
    ? `🛡️ Offiziell zertifiziert nach EU AI Act Art. 4 durch KIVENTIS.\n\nSeit dem 2. Februar 2025 gilt die EU-weite Pflicht zur nachweisbaren KI-Kompetenz („AI Literacy“) für alle Unternehmen. Wir haben die Anforderungen für unser Team erfolgreich zertifiziert und damit auch die Enthaftung nach § 43 GmbHG sichergestellt.\n\nPrüfnummer: ${certificateId}\nOffizielle Verifikation: ${verificationUrl}\n\n#EUAIAct #AILiteracy #Kiventis #Compliance #Mittelstand #KuenstlicheIntelligenz`
    : `🛡️ Officially certified according to EU AI Act Art. 4 by KIVENTIS.\n\nAs of February 2, 2025, documented AI literacy is legally mandatory across all EU organizations. Our team has successfully achieved certified compliance, ensuring statutory leadership exculpation.\n\nAudit ID: ${certificateId}\nVerification: ${verificationUrl}\n\n#EUAIAct #AILiteracy #Kiventis #Compliance #EnterpriseAI`;

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=650,height=750');
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

  // Generate embed HTML code with strict rel="nofollow noopener noreferrer"
  const getEmbedHtml = () => {
    const bgStyles = {
      dark: 'background:#0E1524;color:#F8FAFC;border:1px solid rgba(255,255,255,0.15);',
      light: 'background:#FFFFFF;color:#0F172A;border:1px solid #CBD5E1;',
      warm: 'background:#FAF8F5;color:#18130E;border:1px solid #E7DFD3;',
    }[badgeTheme];

    const accentColor = badgeTheme === 'dark' ? '#14B8A6' : '#0D9488';

    if (badgeStyle === 'minimal') {
      return `<!-- Kiventis EU AI Act Art. 4 Trust Badge (rel="nofollow" compliant) -->
<a href="${verificationUrl}" target="_blank" rel="nofollow noopener noreferrer" title="KI-kompetenter Betrieb nach EU AI Act Art. 4 verifiziert durch Kiventis" style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:6px;font-family:system-ui,-apple-system,sans-serif;font-size:11px;text-decoration:none;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,0.08);${bgStyles}">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  <span>KI-kompetenter Betrieb · EU AI Act Art. 4</span>
</a>`;
    }

    return `<!-- Kiventis EU AI Act Art. 4 Official Trust Badge (rel="nofollow" compliant) -->
<a href="${verificationUrl}" target="_blank" rel="nofollow noopener noreferrer" title="KI-kompetenter Betrieb nach EU AI Act Art. 4 · Verifiziert durch Kiventis" style="display:inline-flex;align-items:center;gap:12px;padding:10px 16px;border-radius:8px;font-family:system-ui,-apple-system,sans-serif;font-size:12px;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.08);${bgStyles}">
  <div style="width:32px;height:32px;border-radius:6px;background:${accentColor}20;display:flex;align-items:center;justify-content:center;color:${accentColor};flex-shrink:0;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  </div>
  <div style="line-height:1.25;">
    <div style="font-weight:700;font-size:12px;letter-spacing:-0.01em;">KI-kompetenter Betrieb</div>
    <div style="font-size:10px;opacity:0.8;font-family:monospace;">EU AI Act Art. 4 · KIVENTIS</div>
  </div>
</a>`;
  };

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(getEmbedHtml());
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2500);
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. LinkedIn 1-Click Viral Loop Share */}
      <div
        className={`rounded-2xl border p-6 md:p-8 backdrop-blur-sm transition-colors ${
          isSepia
            ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm'
            : 'border-white/15 bg-[#0E1524] text-white shadow-xl'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase mb-3 ${
                isSepia
                  ? 'border-sky-300 bg-sky-50 text-sky-900'
                  : 'border-sky-500/40 bg-sky-500/20 text-sky-200'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{isDe ? '1-KLICK VIRAL SOCIAL PROOF' : '1-CLICK VIRAL SOCIAL PROOF'}</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
              {isDe
                ? 'LinkedIn-Zertifikat mit 1 Klick teilen & Branchen-Vorsprung demonstrieren'
                : 'Share Verified LinkedIn Certificate & Demonstrate Industry Leadership'}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#2D241C]' : 'text-slate-100 font-normal'}`}>
              {isDe
                ? 'Geschäftspartner und Kunden achten ab 2025 penibel auf EU AI Act Konformität. Zeigen Sie Ihrem Netzwerk, dass Ihr Betrieb geschult, rechtssicher und nach Art. 4 voll zertifiziert ist.'
                : 'Commercial clients and enterprise procurement rigorously demand Article 4 compliance. Demonstrate to your network that your business is verified and fully exculpated.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={handleShareLinkedIn}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0077B5] hover:bg-[#006097] text-white text-xs sm:text-sm font-bold transition-colors shadow-md cursor-pointer whitespace-nowrap"
            >
              <Share2 className="h-4 w-4" />
              <span>{isDe ? 'Auf LinkedIn veröffentlichen' : 'Share on LinkedIn'}</span>
            </button>

            <button
              onClick={handleCopyPost}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                isSepia
                  ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E] hover:bg-[#EFE8DC]'
                  : 'border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.14]'
              }`}
            >
              {copiedPost ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedPost ? (isDe ? 'Text kopiert!' : 'Text copied!') : (isDe ? 'Post-Vorlage kopieren' : 'Copy Post Text')}</span>
            </button>
          </div>
        </div>

        {/* Pre-formatted Post Preview Box */}
        <div
          className={`mt-6 p-4 rounded-xl border font-mono text-xs whitespace-pre-wrap leading-relaxed ${
            isSepia
              ? 'border-[#D6CAB8] bg-[#FAF8F5] text-[#18130E]'
              : 'border-white/15 bg-[#070A12] text-slate-100'
          }`}
        >
          {linkedInPostText}
        </div>
      </div>

      {/* 2. Customer Website Footer Badge Generator */}
      <div
        className={`rounded-2xl border p-6 md:p-8 backdrop-blur-sm transition-colors ${
          isSepia
            ? 'border-[#D6CAB8] bg-white text-[#18130E] shadow-sm'
            : 'border-white/15 bg-[#0E1524] text-white shadow-xl'
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
            <Shield className="h-3.5 w-3.5" />
            <span>{isDe ? 'WEBSITE-BADGE FÜR IHREN FOOTER' : 'WEBSITE TRUST BADGE'}</span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
            {isDe ? 'Offizielles Prüfsiegel für Ihren Webauftritt' : 'Official Trust Badge for Your Website'}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#2D241C]' : 'text-slate-100 font-normal'}`}>
            {isDe
              ? 'Binden Sie das offizielle Kiventis-Siegel im Footer oder Impressum Ihrer Unternehmenswebsite ein. Das Badge signalisiert Kunden, Lieferanten und Auftraggebern sofortige Gesetzeskonformität.'
              : 'Embed the official Kiventis badge in your corporate footer or compliance section. Signals immediate statutory adherence to clients, auditors, and enterprise procurement.'}
          </p>
        </div>

        {/* Style & Theme Selectors */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isSepia ? 'text-[#18130E]' : 'text-slate-200'}`}>
              {isDe ? 'Design:' : 'Format:'}
            </span>
            <div
              className={`inline-flex rounded-lg border p-1 ${
                isSepia ? 'border-[#D6CAB8] bg-[#FAF8F5]' : 'border-white/15 bg-white/[0.04]'
              }`}
            >
              <button
                onClick={() => setBadgeStyle('standard')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  badgeStyle === 'standard'
                    ? 'bg-[#14B8A6] text-[#090D14] font-bold shadow-sm'
                    : isSepia
                    ? 'text-[#4A3E31] hover:text-[#18130E]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {isDe ? 'Ausführlich (mit Schild)' : 'Detailed'}
              </button>
              <button
                onClick={() => setBadgeStyle('minimal')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  badgeStyle === 'minimal'
                    ? 'bg-[#14B8A6] text-[#090D14] font-bold shadow-sm'
                    : isSepia
                    ? 'text-[#4A3E31] hover:text-[#18130E]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {isDe ? 'Kompakt (1 Zeile)' : 'Compact'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isSepia ? 'text-[#18130E]' : 'text-slate-200'}`}>
              {isDe ? 'Farbthema:' : 'Theme:'}
            </span>
            <div
              className={`inline-flex rounded-lg border p-1 ${
                isSepia ? 'border-[#D6CAB8] bg-[#FAF8F5]' : 'border-white/15 bg-white/[0.04]'
              }`}
            >
              <button
                onClick={() => setBadgeTheme('dark')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  badgeTheme === 'dark'
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : isSepia
                    ? 'text-[#4A3E31] hover:text-[#18130E]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Dark Slate
              </button>
              <button
                onClick={() => setBadgeTheme('light')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  badgeTheme === 'light'
                    ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-300'
                    : isSepia
                    ? 'text-[#4A3E31] hover:text-[#18130E]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setBadgeTheme('warm')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  badgeTheme === 'warm'
                    ? 'bg-[#E7DFD3] text-[#18130E] font-bold shadow-sm'
                    : isSepia
                    ? 'text-[#4A3E31] hover:text-[#18130E]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                Sepia
              </button>
            </div>
          </div>
        </div>

        {/* Live Visual Preview of Badge */}
        <div
          className={`mt-6 p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors ${
            isSepia
              ? 'border-[#D6CAB8] bg-[#FAF8F5]'
              : 'border-white/15 bg-[#070A12]'
          }`}
        >
          <div className="flex flex-col items-start gap-2">
            <span
              className={`text-xs font-mono uppercase tracking-wider font-bold ${
                isSepia ? 'text-[#382F26]' : 'text-slate-200'
              }`}
            >
              {isDe ? 'Live-Vorschau auf Ihrer Website:' : 'Live Preview on Your Website:'}
            </span>
            {/* Rendered HTML Preview */}
            <div dangerouslySetInnerHTML={{ __html: getEmbedHtml() }} />
          </div>

          <button
            onClick={handleCopyBadge}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            {copiedBadge ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
            <span>{copiedBadge ? (isDe ? 'HTML-Code kopiert!' : 'HTML Code Copied!') : (isDe ? 'HTML-Snippet kopieren' : 'Copy HTML Snippet')}</span>
          </button>
        </div>

        {/* SEO Governance Note: rel="nofollow" Explanation */}
        <div
          className={`mt-4 p-3.5 rounded-lg border text-xs flex items-start gap-3 transition-colors ${
            isSepia
              ? 'border-teal-300 bg-teal-50 text-teal-950'
              : 'border-teal-500/30 bg-teal-950/40 text-slate-100'
          }`}
        >
          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`} />
          <div>
            <span className={`font-bold block ${isSepia ? 'text-[#0D9488]' : 'text-white'}`}>
              {isDe ? '100% Google SEO-konform (Kein Link-Spam Risiko):' : '100% Google SEO Compliant (Zero Link Penalty Risk):'}
            </span>
            <span className={isSepia ? 'text-teal-900 font-medium' : 'text-slate-200 font-normal'}>
              {isDe
                ? 'Der generierte Embed-Code verwendet vorschriftsmäßig das Attribut rel="nofollow noopener noreferrer". Google bestraft unnatürliche Footer-Widgets nicht – während Sie und Ihre Kunden vollen Klick-Traffic, Vertrauen und transparente Verifikation genießen.'
                : 'The generated embed code strictly includes rel="nofollow noopener noreferrer" per Google Webmaster Guidelines. Protects rankings against widget link penalties while driving direct qualified referral traffic.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
