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
import { BookingModal } from './components/BookingModal';
import { ResourceModal } from './components/ResourceModal';
import { ImpressumModal } from './components/ImpressumModal';
import { AdminLeadModal } from './components/AdminLeadModal';
import { BomDesignerApp } from './components/demos/BomDesignerApp';
import { InvoiceAuditorApp } from './components/demos/InvoiceAuditorApp';
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

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [themeState, setThemeState] = useState<{ theme: Theme; mode: ThemeMode }>(getInitialThemeState);
  const { theme, mode: themeMode } = themeState;

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState<boolean>(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);
  const [standaloneDemo, setStandaloneDemo] = useState<'none' | 'bom-designer' | 'rechnungspruefer'>('none');

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
    if (standaloneDemo === 'none') {
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
  }, [lang, standaloneDemo]);

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
      const path = window.location.pathname;

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

      setStandaloneDemo('none');

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

  // If user navigated to a dedicated standalone application page, render it full-screen in its original application UI
  if (standaloneDemo === 'bom-designer') {
    return <BomDesignerApp theme={theme} onBack={handleBackFromStandalone} />;
  }

  if (standaloneDemo === 'rechnungspruefer') {
    return <InvoiceAuditorApp theme={theme} onBack={handleBackFromStandalone} />;
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
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section (5-Second Rule, Clear Value Proposition, Primary Action) */}
        <Hero
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
          onOpenResource={handleOpenResource}
        />

        {/* 2. Social Proof & B2B Metrics */}
        <SocialProof lang={lang} />

        {/* 3. Problem & Context Section (Why SME AI pilots stall) */}
        <ProblemSection lang={lang} />

        {/* 4. Solutions & Segmented Persona Offerings (GF, IT, Departments + 4 Modules) */}
        <SolutionsSection
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 5. Case Studies with Verifiable KPIs & Testimonials */}
        <CaseStudies
          lang={lang}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Interactive ROI & Team Hours-Saved Calculator */}
        <RoiCalculator
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
      </main>

      {/* 11. Quiet B2B Footer */}
      <Footer
        lang={lang}
        theme={theme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenResource={handleOpenResource}
        onOpenImpressum={() => setIsImpressumOpen(true)}
        onOpenAdminLeads={() => setIsAdminLeadsOpen(true)}
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
      />
    </div>
  );
}
