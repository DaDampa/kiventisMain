/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Theme } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { ProblemSection } from './components/ProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { CaseStudies } from './components/CaseStudies';
import { RoiCalculator } from './components/RoiCalculator';
import { CustomerDemos } from './components/CustomerDemos';
import { PricingSection } from './components/PricingSection';
import { ResourceHub } from './components/ResourceHub';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { TechnologyBlueprints } from './components/TechnologyBlueprints';
import { SecuritySection } from './components/SecuritySection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { BookingModal } from './components/BookingModal';
import { ResourceModal } from './components/ResourceModal';
import { ImpressumModal } from './components/ImpressumModal';
import { AdminLeadModal } from './components/AdminLeadModal';
import { LlmsTxtModal } from './components/LlmsTxtModal';
const BomDesignerApp = React.lazy(() =>
  import('./components/demos/BomDesignerApp').then((m) => ({
    default: m.BomDesignerApp,
  })),
);
const InvoiceAuditorApp = React.lazy(() =>
  import('./components/demos/InvoiceAuditorApp').then((m) => ({
    default: m.InvoiceAuditorApp,
  })),
);
const AiActAuditPage = React.lazy(() =>
  import('./components/audit/AiActAuditPage').then((m) => ({
    default: m.AiActAuditPage,
  })),
);
import { updatePageMeta } from './utils/seo';
import {
  getInitialThemeState,
  getScheduledTheme,
  persistThemeState,
  ThemeMode,
} from './utils/theme';
import {
  getInitialLanguage,
  detectGeoLanguage,
  persistLanguage,
} from './utils/language';

import { LandingPage } from './components/LandingPage';
import { landingById, type LandingId } from './data/landings';
import { articlesDe, articlesEn } from './data/articles';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import type { InsightArticle } from './types';

const SectionFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="font-mono text-[11px] tracking-[0.3em] text-slate-500 uppercase">
      KIVENTIS · Loading
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [themeState, setThemeState] = useState<{ theme: Theme; mode: ThemeMode }>(getInitialThemeState);
  const { theme, mode: themeMode } = themeState;

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState<boolean>(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState<boolean>(false);
  const [isLlmsTxtOpen, setIsLlmsTxtOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);
  const [standaloneDemo, setStandaloneDemo] = useState<'none' | 'bom-designer' | 'rechnungspruefer' | 'ai-act-audit'>('none');
  const [landing, setLanding] = useState<LandingId | 'none'>('none');
  // Synchroner Initialwert beim Direktaufruf /blog/<id> (bzw. /en/blog/<id>):
  // Der Early-Return greift ab dem ersten Render — kein Flickern der Startseite.
  const [directArticle, setDirectArticle] = useState<InsightArticle | null>(() => {
    try {
      const raw = window.location.pathname;
      const clean = raw.replace(/^\/en\b/, '') || '/';
      const m = clean.match(/^\/blog\/([a-z0-9-]+)\/?$/);
      if (m) {
        const id = m[1];
        return (
          (lang === 'en' ? articlesEn : articlesDe).find((a) => a.id === id) ??
          articlesDe.find((a) => a.id === id) ??
          null
        );
      }
    } catch {
      // Ignore (z.B. SSR/Prerender ohne window)
    }
    return null;
  });

  // Sync theme with document attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    persistThemeState(theme, themeMode);
  }, [theme, themeMode]);

  // Periodic and visibility-based check to automatically switch theme when schedule changes (e.g. crossing 20:00 or 07:00)
  useEffect(() => {
    const evaluateSchedule = () => {
      if (themeMode === 'auto') {
        const scheduled = getScheduledTheme();
        setThemeState((prev) => {
          if (prev.mode === 'auto' && prev.theme !== scheduled) {
            return { theme: scheduled, mode: 'auto' };
          }
          return prev;
        });
      }
    };

    // Run immediate check
    evaluateSchedule();

    const interval = setInterval(evaluateSchedule, 30000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        evaluateSchedule();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [themeMode]);

  // Sync document lang attribute and dynamic metadata when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    if (standaloneDemo === 'none' && landing === 'none') {
      updatePageMeta({
        title:
          lang === 'de'
            ? 'KIVENTIS · B2B KI-Trainings, Vibe Coding & EU AI Act (DACH)'
            : 'KIVENTIS · B2B AI Training, Vibe Coding & EU AI Act Compliance',
        description:
          lang === 'de'
            ? 'Praxisnahes KI-Enablement, Vibe Coding & rechtssichere Zertifikate nach Art. 4 EU AI Act für den B2B-Mittelstand. Messbarer ROI in 2 bis 4 Monaten.'
            : 'Hands-on AI enablement, Vibe Coding for domain teams & verifiable EU AI Act compliance for mid-sized enterprises. Measurable ROI in 2 to 4 months.',
        canonical: lang === 'de' ? 'https://www.kiventis.com/' : 'https://www.kiventis.com/?lang=en',
      });
    }
  }, [lang, standaloneDemo, landing]);

  // Background Geo-IP detection: Automatically selects English for visitors outside DACH (Germany, Austria, Switzerland)
  useEffect(() => {
    detectGeoLanguage((detectedLang) => {
      setLang(detectedLang);
    });
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    persistLanguage(newLang, true);
  };

  // Handle Clean URL Route for /beispiele and standalone apps
  useEffect(() => {
    const handleRoute = () => {
      // /en/... Pfadvariante: Sprache erzwingen und Prefix entfernen
      const rawPath = window.location.pathname;
      const enPath = rawPath === '/en' || rawPath.startsWith('/en/');
      const path = enPath ? rawPath.replace(/^\/en/, '') || '/' : rawPath;

      if (enPath && lang !== 'en') {
        setLang('en');
        persistLanguage('en', true);
      }

      // Direkter Artikel-Aufruf /blog/<id> (bzw. /en/blog/<id>):
      // Nur den Artikel rendern, ohne die Startseite dahinter (einzelner H1).
      const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)\/?$/);
      if (blogMatch) {
        const articleId = blogMatch[1];
        const pool = lang === 'en' ? articlesEn : articlesDe;
        const found =
          pool.find((a) => a.id === articleId) ??
          articlesDe.find((a) => a.id === articleId);
        if (found) {
          setDirectArticle(found);
          setLanding('none');
          setStandaloneDemo('none');
          updatePageMeta({
            title: `${found.title} · KIVENTIS`,
            description: found.excerpt,
            canonical: `https://www.kiventis.com${enPath ? '/en' : ''}/blog/${found.id}`,
            ogType: 'article',
            publishedTime: found.publishedDate,
            schema: {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: found.title,
              description: found.excerpt,
              inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
              datePublished: '2026-09-01T08:00:00+02:00',
              author: {
                '@type': 'Person',
                name: found.author.name,
                jobTitle: found.author.role,
              },
              publisher: {
                '@type': 'Organization',
                name: 'KIVENTIS',
                url: 'https://www.kiventis.com',
              },
              mainEntityOfPage: `https://www.kiventis.com${enPath ? '/en' : ''}/blog/${found.id}`,
              keywords: found.tags.join(', '),
            },
          });
          return;
        }
      } else {
        setDirectArticle(null);
      }

      // Hidden admin entry (?admin=1) — keeps the lead manager reachable
      // without a public footer button.
      try {
        if (new URLSearchParams(window.location.search).get('admin') === '1') {
          setIsAdminLeadsOpen(true);
        }
      } catch {
        /* ignore malformed URLs */
      }

      if (path === '/beispiele/bom-designer' || path === '/demos/bom-designer') {
        setStandaloneDemo('bom-designer');
        updatePageMeta({
          title: 'BOM Designer Pro (Stücklisten & Baugruppen-Editor) · KIVENTIS Showcase',
          description: 'Interaktive Baukasten- und Stücklistenkalkulation mit MOK-Industriedaten und OData REST ERP-Export nach SAP S/4HANA.',
          canonical: 'https://www.kiventis.com/beispiele/bom-designer',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BOM Designer Pro',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            description: 'Vibe-Coding Baukasten- und Stücklisten-Editor mit ERP-Export.',
          },
        });
        return;
      }

      if (path === '/beispiele/rechnungspruefer' || path === '/demos/rechnungspruefer') {
        setStandaloneDemo('rechnungspruefer');
        updatePageMeta({
          title: 'ERP Rechnungsprüfer & Diskrepanz-Radar · KIVENTIS Showcase',
          description: 'Automatisierter 3-Wege-Abgleich von Eingangsrechnungen gegen ERP-Bestellungen mit Toleranzprüfung und Freigabe-Workflow.',
          canonical: 'https://www.kiventis.com/beispiele/rechnungspruefer',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ERP Rechnungsprüfer',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            description: 'Automatisierter Abgleich von Eingangsrechnungen gegen ERP-Bestellungen.',
          },
        });
        return;
      }

      if (
        path === '/ai-act-audit' ||
        path === '/ai-act-audit/' ||
        window.location.hash === '#ai-act-audit'
      ) {
        setStandaloneDemo('ai-act-audit');
        updatePageMeta({
          title:
            lang === 'de'
              ? 'EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner für KMUs · KIVENTIS Audit'
              : 'EU AI Act Art. 4 Liability & Fine Calculator for SMEs · KIVENTIS Audit',
          description:
            lang === 'de'
              ? 'Kostenloser interaktiver Compliance-Check nach Art. 4 Verordnung (EU) 2024/1689. Berechnen Sie das persönliche Geschäftsführer-Haftungsrisiko (§ 43 GmbHG) und behördliche Bußgelder bis zu 15 Mio. €.'
              : 'Free interactive SME compliance audit under Article 4 Regulation (EU) 2024/1689. Calculate personal managerial liability and statutory penalty exposure.',
          canonical: 'https://www.kiventis.com/ai-act-audit',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Kiventis EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            description: 'Interaktiver Compliance- und Haftungs-Rechner nach Art. 4 EU AI Act für den europäischen Mittelstand.',
          },
        });
        return;
      }

      if (path === '/ki-beratung-kmu' || path === '/ki-beratung-kmu/') {
        setLanding('ki-beratung-kmu');
        setStandaloneDemo('none');
        window.history.pushState(null, '', '/ki-beratung-kmu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updatePageMeta({
          title:
            lang === 'de'
              ? 'KI-Beratung für KMU: Strategisch beraten, Prozesse automatisieren · KIVENTIS'
              : 'AI consulting for SMEs: strategic advice, automated processes · KIVENTIS',
          description:
            lang === 'de'
              ? 'Kiventis ist Ihr Partner für KI-Beratung KMU, ERP Prozessautomatisierung und KI Agenten im Mittelstand — von der Strategie über die ERP Schnittstellen Programmierung bis zur E-Rechnung und Workflow Automatisierung.'
              : 'Kiventis is your partner for AI consulting for SMEs, ERP process automation and AI agents for the mid-market — from strategy and ERP interface programming to e-invoicing and workflow automation.',
          canonical:
            lang === 'de'
              ? 'https://www.kiventis.com/ki-beratung-kmu'
              : 'https://www.kiventis.com/en/ki-beratung-kmu',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'KI-Beratung KMU',
            provider: { '@type': 'Organization', name: 'KIVENTIS', url: 'https://www.kiventis.com' },
            areaServed: ['DE', 'AT', 'CH', 'LI'],
            keywords:
              'KI Beratung KMU, ERP Prozessautomatisierung, KI Agenten Mittelstand, ERP Schnittstellen Programmierung, E-Rechnung, Workflow Automatisierung',
          },
        });
        return;
      }

      if (path === '/erp-prozessautomatisierung' || path === '/erp-prozessautomatisierung/') {
        setLanding('erp-prozessautomatisierung');
        setStandaloneDemo('none');
        window.history.pushState(null, '', '/erp-prozessautomatisierung');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updatePageMeta({
          title:
            lang === 'de'
              ? 'ERP-Prozessautomatisierung: Bestehende Workflows end-to-end automatisieren · KIVENTIS'
              : 'ERP process automation: automate existing workflows end-to-end · KIVENTIS',
          description:
            lang === 'de'
              ? 'Kiventis automatisiert Ihre ERP-Prozesse — von der Schnittstellen-Programmierung über KI Agenten bis zur E-Rechnung. 25 Jahre ERP- & Prozessberatung, über 250 umgesetzte Projekte.'
              : 'Kiventis automates your ERP processes — from interface programming and AI agents to e-invoicing. 25 years of ERP & process consulting, over 250 delivered projects.',
          canonical:
            lang === 'de'
              ? 'https://www.kiventis.com/erp-prozessautomatisierung'
              : 'https://www.kiventis.com/en/erp-prozessautomatisierung',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'ERP Prozessautomatisierung',
            provider: { '@type': 'Organization', name: 'KIVENTIS', url: 'https://www.kiventis.com' },
            areaServed: ['DE', 'AT', 'CH', 'LI'],
            keywords:
              'ERP Prozessautomatisierung, ERP Schnittstellen Programmierung, KI Agenten Mittelstand, E-Rechnung, Workflow Automatisierung, KI Beratung KMU',
          },
        });
        return;
      }

      setStandaloneDemo('none');
      setLanding('none');

      if (path === '/beispiele' || path === '/beispiele/') {
        updatePageMeta({
          title:
            lang === 'de'
              ? 'Kunden-Demos & Vibe Coding Werkzeuge (MOK-Daten) · KIVENTIS'
              : 'Interactive Customer Demos & Vibe Coding Tools (MOK Data) · KIVENTIS',
          description:
            lang === 'de'
              ? 'Testen Sie live im Browser operative B2B-Hilfstools (BOM-Designer, Rechnungsprüfer, Zolltarif-Klassifikator), die von Mittelstands-Fachexperten per Vibe Coding gebaut wurden.'
              : 'Test live in-browser production micro-apps (BOM Designer, Invoice Auditor, Customs Classifier) built by domain specialists via Vibe Coding.',
          canonical: 'https://www.kiventis.com/beispiele',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kiventis Kunden-Werkzeuge & Vibe Coding Showcases',
            description: 'Operative Kundenanwendungen mit MOK-Daten aus der Praxis.',
            url: 'https://www.kiventis.com/beispiele',
            hasPart: [
              {
                '@type': 'SoftwareApplication',
                name: 'BOM-Designer & Stücklisten-Kalkulator',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web Browser',
                description: 'Baukasten- und Stücklistenkalkulator für Fertigung und Maschinenbau.',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'Rechnungsprüfer & Diskrepanz-Radar',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web Browser',
                description: 'Automatisierter Abgleich von Eingangsrechnungen gegen ERP-Bestellungen.',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'KI-Zolltarif- & Export-Klassifikator',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web Browser',
                description: 'Semantische Zuordnung von HS-Zolltarifnummern.',
              },
            ],
          },
        });

        // Scroll to the demos section
        const el = document.getElementById('beispiele');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, [lang]);

  const handleToggleTheme = () => {
    // Manually toggling locks into manual mode
    const nextTheme: Theme = theme === 'dark' ? 'sepia' : 'dark';
    setThemeState({
      theme: nextTheme,
      mode: 'manual',
    });
  };

  const handleResetToAutoTheme = () => {
    // Return to the automatic time schedule
    const scheduled = getScheduledTheme();
    setThemeState({
      theme: scheduled,
      mode: 'auto',
    });
  };

  const handleOpenBooking = (packageTitle?: string) => {
    setPreselectedPackage(packageTitle);
    setIsBookingOpen(true);
  };

  const handleOpenResource = () => {
    setIsResourceOpen(true);
  };

  const handleLaunchStandalone = (demoId: 'bom-designer' | 'rechnungspruefer') => {
    setStandaloneDemo(demoId);
    window.history.pushState(null, '', `/beispiele/${demoId}`);
  };

  const handleBackFromStandalone = () => {
    setStandaloneDemo('none');
    window.history.pushState(null, '', '/#beispiele');
    updatePageMeta({
      title: 'KIVENTIS · B2B KI-Trainings, Vibe Coding & EU AI Act (DACH)',
      description:
        'Praxisnahes KI-Enablement, Vibe Coding & rechtssichere Zertifikate nach Art. 4 EU AI Act für den B2B-Mittelstand. Messbarer ROI in 2 bis 4 Monaten.',
      canonical: 'https://www.kiventis.com/',
    });
  };

  const handleLaunchAudit = () => {
    setStandaloneDemo('ai-act-audit');
    window.history.pushState(null, '', '/ai-act-audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageMeta({
      title:
        lang === 'de'
          ? 'EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner für KMUs · KIVENTIS Audit'
          : 'EU AI Act Art. 4 Liability & Fine Calculator for SMEs · KIVENTIS Audit',
      description:
        lang === 'de'
          ? 'Kostenloser interaktiver Compliance-Check nach Art. 4 Verordnung (EU) 2024/1689. Berechnen Sie das persönliche Geschäftsführer-Haftungsrisiko (§ 43 GmbHG) und behördliche Bußgelder bis zu 15 Mio. €.'
          : 'Free interactive SME compliance audit under Article 4 Regulation (EU) 2024/1689. Calculate personal managerial liability and statutory penalty exposure.',
      canonical: 'https://www.kiventis.com/ai-act-audit',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Kiventis EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        description: 'Interaktiver Compliance- und Haftungs-Rechner nach Art. 4 EU AI Act für den europäischen Mittelstand.',
      },
    });
  };

  const handleBackFromAudit = () => {
    setStandaloneDemo('none');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageMeta({
      title:
        lang === 'de'
          ? 'KIVENTIS · B2B KI-Trainings, Vibe Coding & EU AI Act (DACH)'
          : 'KIVENTIS · B2B AI Training, Vibe Coding & EU AI Act Compliance',
      description:
        lang === 'de'
          ? 'Praxisnahes KI-Enablement, Vibe Coding & rechtssichere Zertifikate nach Art. 4 EU AI Act für den B2B-Mittelstand. Messbarer ROI in 2 bis 4 Monaten.'
          : 'Hands-on AI enablement, Vibe Coding for domain teams & verifiable EU AI Act compliance for mid-sized enterprises. Measurable ROI in 2 to 4 months.',
      canonical: lang === 'de' ? 'https://www.kiventis.com/' : 'https://www.kiventis.com/?lang=en',
    });
  };

  const handleBackFromLanding = () => {
    setLanding('none');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updatePageMeta({
      title:
        lang === 'de'
          ? 'KIVENTIS · B2B KI-Trainings, Vibe Coding & EU AI Act (DACH)'
          : 'KIVENTIS · B2B AI Training, Vibe Coding & EU AI Act Compliance',
      description:
        lang === 'de'
          ? 'Praxisnahes KI-Enablement, Vibe Coding & rechtssichere Zertifikate nach Art. 4 EU AI Act für den B2B-Mittelstand. Messbarer ROI in 2 bis 4 Monaten.'
          : 'Hands-on AI enablement, Vibe Coding for domain teams & verifiable EU AI Act compliance for mid-sized enterprises. Measurable ROI in 2 to 4 months.',
      canonical: lang === 'de' ? 'https://www.kiventis.com/' : 'https://www.kiventis.com/?lang=en',
    });
  };

  // Direkter Artikel-Aufruf: nur der Artikel (einzelner H1, keine Startseite dahinter)
  if (directArticle) {
    return (
      <>
        <ArticleDetailModal
          article={directArticle}
          lang={lang}
          asH1
          onClose={() => {
            window.location.href = '/#insights';
          }}
          onOpenBooking={() => handleOpenBooking()}
        />
        <BookingModal
          lang={lang}
          isOpen={isBookingOpen}
          preselectedPackage={preselectedPackage}
          onClose={() => setIsBookingOpen(false)}
        />
      </>
    );
  }

  // If user navigated to a dedicated standalone application page, render it full-screen in its original application UI
  if (standaloneDemo === 'bom-designer') {
    return (
      <React.Suspense fallback={<SectionFallback />}>
        <BomDesignerApp theme={theme} onBack={handleBackFromStandalone} lang={lang} />
      </React.Suspense>
    );
  }

  if (standaloneDemo === 'rechnungspruefer') {
    return (
      <React.Suspense fallback={<SectionFallback />}>
        <InvoiceAuditorApp theme={theme} onBack={handleBackFromStandalone} lang={lang} />
      </React.Suspense>
    );
  }

  // Landingpages der DACH-Cluster (/ki-beratung-kmu, /erp-prozessautomatisierung)
  if (landing !== 'none') {
    const spec = landingById(landing);
    return (
      <LandingPage
        spec={spec}
        lang={lang}
        theme={theme}
        onOpenBooking={() => handleOpenBooking()}
        onBackToHome={handleBackFromLanding}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'sepia'
          ? 'bg-[#FAF8F5] text-[#18130E] selection:bg-[#0F766E] selection:text-white'
          : 'bg-[#090D14] text-slate-200 selection:bg-[#14B8A6] selection:text-[#090D14]'
      }`}
    >
      {/* 3-Zone Top Bar Navigation with Theme & Language Actions */}
      <Navbar
        lang={lang}
        theme={theme}
        themeMode={themeMode}
        onLanguageChange={handleLanguageChange}
        onToggleTheme={handleToggleTheme}
        onResetToAutoTheme={handleResetToAutoTheme}
        onOpenBooking={() => handleOpenBooking()}
        onNavigateAudit={handleLaunchAudit}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {standaloneDemo === 'ai-act-audit' ? (
          <React.Suspense fallback={<SectionFallback />}>
            <AiActAuditPage
              lang={lang}
              theme={theme}
              onOpenBooking={(packageTitle) => handleOpenBooking(packageTitle)}
              onBackToHome={handleBackFromAudit}
            />
          </React.Suspense>
        ) : (
          <>
            {/* 1. Hero Section (Next-Level High-Craft & Interactive Dataflow Pipeline) */}
            <Hero
              lang={lang}
              theme={theme}
              onOpenBooking={() => handleOpenBooking()}
              onOpenResource={handleOpenResource}
            />

            {/* 2. Technology Blueprints (Asymmetric Bento Grid with Live Code & Micro-Metrics) */}
            <TechnologyBlueprints
              lang={lang}
              theme={theme}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 3. Interactive ROI & Automation Potential Calculator */}
            <RoiCalculator
              lang={lang}
              theme={theme}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 4. Sovereign AI & Enterprise Security (Local LLMs, DSGVO, Air-Gap & EU AI Act Art. 4) */}
            <SecuritySection
              lang={lang}
              theme={theme}
              onOpenBooking={() => handleOpenBooking()}
              onNavigateAudit={handleLaunchAudit}
            />

            {/* 5. Process Roadmap (4-Schritte-Fahrplan: Vom Erstkontakt zum Live-System) */}
            <ProcessTimeline
              lang={lang}
              theme={theme}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 6. Social Proof & B2B Metrics */}
            <SocialProof lang={lang} />

            {/* 7. Problem & Context Section (Why SME AI pilots stall) */}
            <ProblemSection lang={lang} />

            {/* 8. Solutions & Segmented Persona Offerings (GF, IT, Departments) */}
            <SolutionsSection
              lang={lang}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 9. Case Studies with Verifiable KPIs & Testimonials */}
            <CaseStudies
              lang={lang}
              onOpenBooking={() => handleOpenBooking()}
            />

        {/* 7. Interactive Customer Demos & Vibe Coding Production Tools */}
        <CustomerDemos
          lang={lang}
          theme={theme}
          onOpenBooking={(title) => handleOpenBooking(title)}
          onLaunchStandalone={handleLaunchStandalone}
        />

        {/* 8. Transparent Pricing & ROI-Signal Packages */}
        <PricingSection
          lang={lang}
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 8. Secondary CTA & Resource Hub (SME Guide 2025/2026) */}
        <ResourceHub
          lang={lang}
          onOpenResource={handleOpenResource}
        />

        {/* 9. FAQ Section (SEO & Generative Engine Optimization / GEO) */}
        <FaqSection lang={lang} />

        {/* 10. Industry Insights: EU AI Act & Vibe Coding Knowledge Hub */}
        <BlogSection
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
          onOpenResource={handleOpenResource}
        />
          </>
        )}
      </main>

      {/* 11. Quiet B2B Footer */}
      <Footer
        lang={lang}
        theme={theme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenResource={handleOpenResource}
        onOpenImpressum={() => setIsImpressumOpen(true)}
        onOpenAdminLeads={() => setIsAdminLeadsOpen(true)}
        onNavigateAudit={handleLaunchAudit}
        onOpenLlmsTxt={() => setIsLlmsTxtOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        lang={lang}
        isOpen={isBookingOpen}
        preselectedPackage={preselectedPackage}
        onClose={() => setIsBookingOpen(false)}
      />

      <ResourceModal
        lang={lang}
        isOpen={isResourceOpen}
        onClose={() => setIsResourceOpen(false)}
      />

      <ImpressumModal
        lang={lang}
        isOpen={isImpressumOpen}
        onClose={() => setIsImpressumOpen(false)}
      />

      <AdminLeadModal
        isOpen={isAdminLeadsOpen}
        onClose={() => setIsAdminLeadsOpen(false)}
        lang={lang}
      />

      <LlmsTxtModal
        lang={lang}
        theme={theme}
        isOpen={isLlmsTxtOpen}
        onClose={() => setIsLlmsTxtOpen(false)}
      />
    </div>
  );
}
