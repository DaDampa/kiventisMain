export type Language = 'de' | 'en';
export type Theme = 'dark' | 'sepia';

export interface PersonaContent {
  roleId: 'management' | 'it-compliance' | 'departments';
  roleName: string;
  badge: string;
  headline: string;
  subheadline: string;
  keyBenefits: string[];
  quote: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
  primaryMetric: {
    value: string;
    label: string;
    detail: string;
  };
}

export interface ServiceModule {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  audience: string;
  duration: string;
  roiTimeline: string;
}

export interface CaseStudy {
  id: string;
  industry: string;
  companyName: string;
  location: string;
  employeeCount: string;
  challenge: string;
  solution: string;
  kpis: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface PricingPackage {
  id: string;
  title: string;
  kicker: string;
  priceTag: string;
  priceSub: string;
  duration: string;
  targetAudience: string;
  roiEstimate: string;
  popular?: boolean;
  features: string[];
  deliverableSnippet: string;
}

export interface FaqItem {
  id: string;
  category: 'compliance' | 'vibe-coding' | 'roi' | 'data-privacy' | 'general';
  question: string;
  answer: string;
  citationHint?: string;
}
