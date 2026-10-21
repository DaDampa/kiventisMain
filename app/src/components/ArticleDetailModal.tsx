import React, { useState, useEffect } from 'react';
import { Language, InsightArticle } from '../types';
import {
  ArrowRight,
  X,
  User,
  CheckCircle2,
  Share2,
  Check,
  Sparkles,
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: InsightArticle;
  lang: Language;
  onClose: () => void;
  onOpenBooking: () => void;
  /** Direkter Aufruf (/blog/<id>): Artikel-Titel als h1 (einzelnes H1 der Seite) */
  asH1?: boolean;
}

/**
 * Artikel-Detail-Modal. Wird sowohl aus der Blog-Sektion (Klick) als auch
 * als eigenstaendige Ansicht beim Direktaufruf /blog/<id> (bzw. /en/blog/<id>)
 * genutzt. Enhaelt Escape-Handling, Scroll-Lock und Share-Button.
 */
export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  lang,
  onClose,
  onOpenBooking,
  asH1 = false,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const HeadingTag = asH1 ? 'h1' : 'h2';

  // Close modal on Escape key press and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-[#090D14] p-6 sm:p-8 lg:p-10 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[#14B8A6] font-semibold">
              {article.categoryLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title={lang === 'de' ? 'Link kopieren' : 'Copy link'}
              className="p-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              {copiedLink ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
            {article.kicker}
          </div>
          <HeadingTag className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </HeadingTag>

          {/* Author & Citation */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#14B8A6]" />
              <span className="text-white font-medium">{article.author.name}</span>
              <span>— {article.author.role}</span>
            </div>
            {article.citation && (
              <div className="text-[11px] font-mono text-slate-400 max-w-md italic">
                {article.citation}
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="my-6 rounded-xl border border-white/[0.1] bg-[#0E1524] p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#14B8A6] font-semibold mb-3">
            <Sparkles className="h-4 w-4" />
            <span>
              {lang === 'de'
                ? 'Kernaussagen auf einen Blick'
                : 'Executive Summary & Key Takeaways'}
            </span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Structured Body */}
        <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                {section.heading}
              </h3>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="my-4 rounded-lg border-l-4 border-[#14B8A6] bg-[#0E1524] p-4 text-xs sm:text-sm text-slate-200 italic">
                  {section.callout}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags (clean unboxed per constitution) */}
        <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center flex-wrap gap-2 text-xs text-slate-400 font-mono">
          <span className="text-slate-500 font-semibold">
            {lang === 'de' ? 'Themengebiete:' : 'Topics:'}
          </span>
          {article.tags.map((tag, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span aria-hidden="true">·</span>}
              <span className="text-slate-300">{tag}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Modal Bottom CTA */}
        <div className="mt-8 rounded-xl border border-white/[0.1] bg-[#0E1524] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-display text-base font-bold text-white">
              {lang === 'de'
                ? 'Möchten Sie diese Schritte in Ihrem Unternehmen umsetzen?'
                : 'Ready to implement these practices in your organization?'}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {lang === 'de'
                ? 'Buchen Sie ein vertrauliches 30-Minuten-Gespräch mit Dipl.-Ing. D. Blazinic.'
                : 'Schedule a confidential 30-minute consultation with our practice leads.'}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14] font-bold text-xs sm:text-sm px-5 py-3 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span>{lang === 'de' ? 'Erstgespräch buchen' : 'Book Discovery Call'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
