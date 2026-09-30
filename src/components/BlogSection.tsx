import React, { useState, useMemo, useEffect } from 'react';
import { Language, InsightArticle } from '../types';
import { articlesDe, articlesEn } from '../data/articles';
import { updatePageMeta } from '../utils/seo';
import {
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  X,
  Calendar,
  Clock,
  User,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileText,
  Share2,
  Check,
} from 'lucide-react';

interface BlogSectionProps {
  lang: Language;
  onOpenBooking: () => void;
  onOpenResource: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  lang,
  onOpenBooking,
  onOpenResource,
}) => {
  const articles: InsightArticle[] = lang === 'de' ? articlesDe : articlesEn;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Check on mount or URL popstate if a specific article is requested via clean URL /blog/:id
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const articleId = path.replace('/blog/', '').replace(/\/$/, '').trim();
        const found = articles.find((a) => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
        }
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [articles]);

  // Synchronize dynamic Page Meta & Schema.org JSON-LD whenever article opens or closes
  useEffect(() => {
    if (selectedArticle) {
      updatePageMeta({
        title: `${selectedArticle.title} · KIVENTIS`,
        description: selectedArticle.excerpt,
        canonical: `https://www.kiventis.com/blog/${selectedArticle.id}`,
        ogType: 'article',
        publishedTime: selectedArticle.publishedDate,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: selectedArticle.title,
          description: selectedArticle.excerpt,
          inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
          datePublished: '2026-09-01T08:00:00+02:00',
          author: {
            '@type': 'Person',
            name: selectedArticle.author.name,
            jobTitle: selectedArticle.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'KIVENTIS',
            url: 'https://www.kiventis.com',
          },
          mainEntityOfPage: `https://www.kiventis.com/blog/${selectedArticle.id}`,
          keywords: selectedArticle.tags.join(', '),
        },
      });

      if (window.location.pathname !== `/blog/${selectedArticle.id}`) {
        window.history.pushState(null, '', `/blog/${selectedArticle.id}`);
      }
    } else {
      if (window.location.pathname.startsWith('/blog/')) {
        window.history.pushState(null, '', '/#insights');
      }
    }
  }, [selectedArticle, lang]);

  // Close modal on Escape key press and manage scroll locking
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };

    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  // Category filter options
  const categories = useMemo(() => {
    if (lang === 'de') {
      return [
        { id: 'all', label: 'Alle Analysen' },
        { id: 'compliance', label: 'EU AI Act & Compliance' },
        { id: 'vibe-coding', label: 'Vibe Coding & Tools' },
        { id: 'erp', label: 'ERP & Integration' },
        { id: 'roi', label: 'Kosten & ROI' },
      ];
    }
    return [
      { id: 'all', label: 'All Analyses' },
      { id: 'compliance', label: 'EU AI Act & Compliance' },
      { id: 'vibe-coding', label: 'Vibe Coding & Tools' },
      { id: 'erp', label: 'ERP & Integration' },
      { id: 'roi', label: 'Cost & ROI' },
    ];
  }, [lang]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory =
        activeCategory === 'all' || art.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.keyTakeaways.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  const handleShare = (article: InsightArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/blog/${article.id}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section
      id="insights"
      className="py-24 border-b border-white/[0.08] bg-[#070A10] transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <BookOpen className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>
              {lang === 'de'
                ? 'KIVENTIS PRAXIS-INSIGHTS & REGULIERUNGS-RADAR'
                : 'KIVENTIS INDUSTRY INSIGHTS & REGULATORY RADAR'}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'de' ? (
              <>
                EU AI Act & Vibe Coding:{' '}
                <span className="text-[#14B8A6]">Wissen für Entscheider</span>
              </>
            ) : (
              <>
                EU AI Act & Vibe Coding:{' '}
                <span className="text-[#14B8A6]">Executive Insights</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {lang === 'de'
              ? 'Fundierte Fachbeiträge und Handlungsempfehlungen für den Mittelstand: Von den bindenden Fristen der EU-KI-Verordnung über rechtssichere Schulungspflichten (Art. 4) bis hin zu Vibe Coding und ERP-Schnittstellen in der Praxis.'
              : 'Actionable intelligence and strategic guidance for SMEs: From EU AI Act enforcement dates and Article 4 training mandates to agile Vibe Coding and seamless ERP interfaces.'}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          {/* Segmented Control Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#14B8A6] text-[#090D14] font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'de' ? 'Artikel & Themen durchsuchen...' : 'Search insights & topics...'
              }
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-white/[0.1] bg-[#0E1524] text-white placeholder:text-slate-500 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center rounded-xl border border-white/[0.08] bg-[#0E1524] mt-8 p-8">
            <p className="text-slate-400 text-sm">
              {lang === 'de'
                ? 'Keine Beiträge für die gewählte Filterung gefunden.'
                : 'No articles match your search or filter selection.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#14B8A6] hover:underline"
            >
              {lang === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0E1524] p-6 sm:p-7 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-sm relative"
              >
                <div>
                  {/* Clean unboxed metadata per Zero-Pill Constitution */}
                  <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 font-mono mb-3">
                    <span className="text-[#14B8A6] font-semibold">
                      {article.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  {/* Kicker */}
                  <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase font-semibold mb-1">
                    {article.kicker}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#14B8A6] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Key Takeaways snippet */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {lang === 'de' ? 'Kernaussagen:' : 'Key Takeaways:'}
                    </div>
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-300 leading-snug"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Author & Read Action */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    <span className="font-medium text-white">{article.author.name}</span>
                    <span className="block text-[11px] text-slate-500">{article.author.role}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6] group-hover:translate-x-0.5 transition-transform">
                    <span>{lang === 'de' ? 'Vollständige Analyse' : 'Read Full Analysis'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Feature Box: EU AI Act Readiness Check */}
        <div className="mt-12 rounded-xl border border-white/[0.1] bg-gradient-to-r from-[#0C1220] via-[#0E1627] to-[#0A0F1D] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6] font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {lang === 'de'
                  ? 'EU AI ACT READINESS & COMPLIANCE-CHECK'
                  : 'EU AI ACT READINESS & COMPLIANCE AUDIT'}
              </span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
              {lang === 'de'
                ? 'Sind Ihre KI-Workflows und Mitarbeiter ab 2025/2026 rechtskonform geschult?'
                : 'Are your AI workflows and teams compliant with EU AI Act Article 4 requirements?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'de'
                ? 'Wir prüfen in einem unverbindlichen 30-minütigen Gespräch Ihre eingesetzten Tools, identifizieren Shadow AI und erarbeiten einen modularen Schulungsplan für Ihre Fachbereiche.'
                : 'In a complimentary 30-minute consultation, we assess your operational AI stack, evaluate shadow tools, and map a modular enablement path for your teams.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#14B8A6] hover:bg-[#0D9488] text-[#090D14] font-bold text-xs sm:text-sm px-5 py-3 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
            >
              <span>{lang === 'de' ? '30-Min. Erstgespräch buchen' : 'Book 30-Min Discovery Call'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenResource}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm px-5 py-3 transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="h-4 w-4 text-[#14B8A6]" />
              <span>{lang === 'de' ? 'KMU-Leitfaden PDF' : 'Download SME Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Article Reading Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-[#090D14] p-6 sm:p-8 lg:p-10 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-[#14B8A6] font-semibold">
                  {selectedArticle.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.publishedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
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
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Article Header */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                {selectedArticle.kicker}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author & Citation */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#14B8A6]" />
                  <span className="text-white font-medium">{selectedArticle.author.name}</span>
                  <span>— {selectedArticle.author.role}</span>
                </div>
                {selectedArticle.citation && (
                  <div className="text-[11px] font-mono text-slate-400 max-w-md italic">
                    {selectedArticle.citation}
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
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Structured Body */}
            <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedArticle.sections.map((section, idx) => (
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
              {selectedArticle.tags.map((tag, idx) => (
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
                  setSelectedArticle(null);
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
      )}
    </section>
  );
};
