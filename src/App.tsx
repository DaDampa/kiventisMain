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
import { PricingSection } from './components/PricingSection';
import { ResourceHub } from './components/ResourceHub';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ResourceModal } from './components/ResourceModal';
import { ImpressumModal } from './components/ImpressumModal';
import { AdminLeadModal } from './components/AdminLeadModal';
import {
  getInitialThemeState,
  getScheduledTheme,
  persistThemeState,
  ThemeMode,
} from './utils/theme';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [themeState, setThemeState] = useState<{ theme: Theme; mode: ThemeMode }>(getInitialThemeState);
  const { theme, mode: themeMode } = themeState;

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState<boolean>(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);

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
        onLanguageChange={setLang}
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

        {/* 7. Transparent Pricing & ROI-Signal Packages */}
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
      </main>

      {/* 10. Quiet B2B Footer */}
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
