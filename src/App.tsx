/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
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

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isResourceOpen, setIsResourceOpen] = useState<boolean>(false);
  const [isImpressumOpen, setIsImpressumOpen] = useState<boolean>(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);

  const handleOpenBooking = (packageTitle?: string) => {
    setPreselectedPackage(packageTitle);
    setIsBookingOpen(true);
  };

  const handleOpenResource = () => {
    setIsResourceOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D14] text-slate-200 selection:bg-[#14B8A6] selection:text-[#090D14]">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
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
