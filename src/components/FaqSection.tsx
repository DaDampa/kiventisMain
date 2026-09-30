import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HelpCircle, ChevronDown, Search, BookMarked, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = translations[lang].faq;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredItems = t.items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 border-b border-white/[0.06] bg-[#090D14]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#14B8A6] mb-3">
            <HelpCircle className="h-4 w-4 shrink-0 text-[#14B8A6]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {t.subheading}
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mt-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'de' ? 'Thema oder Frage suchen (z. B. "EU AI Act", "Vibe Coding", "ROI")...' : 'Search topics (e.g., "AI Act", "Vibe Coding", "ROI")...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-[#0E1524] pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#14B8A6] transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(t.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === key
                    ? 'bg-[#14B8A6] text-[#090D14] font-semibold'
                    : 'border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Items */}
        <div className="mt-10 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-sm text-slate-400">
              {lang === 'de' ? 'Keine passenden Fragen gefunden.' : 'No matching questions found.'}
            </div>
          ) : (
            filteredItems.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all ${
                    isOpen
                      ? 'border-[#14B8A6]/40 bg-[#0E1524]'
                      : 'border-white/[0.08] bg-[#0E1524]/50 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#14B8A6]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-white/[0.06]">
                      <p className="pt-4">{faq.answer}</p>
                      {faq.citationHint && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#14B8A6]/90 bg-[#14B8A6]/[0.06] p-2.5 rounded-lg border border-[#14B8A6]/20">
                          <BookMarked className="h-3.5 w-3.5 shrink-0" />
                          <span>GEO / Rechtsbezug: {faq.citationHint}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
