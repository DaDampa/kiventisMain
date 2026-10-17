/**
 * Statische Landingpage-Inhalte für die DACH-Cluster-Keywords.
 *
 * Quellen: kiventis_seo/content_drafts/landing_de.md (Cluster-Mapping
 * DACH_DE) und keyword_matrix.json. Keine erfundenen Kundenreferenzen,
 * Projektzahlen oder Zertifikate — alle Angaben stammen aus dem
 * bestehenden Site-Copy (25 Jahre, 250+ Projekte, ERP-Systemliste).
 */

export type LandingId = 'ki-beratung-kmu' | 'erp-prozessautomatisierung';

export interface LocalizedString {
  de: string;
  en: string;
}

export interface LandingBenefit {
  title: LocalizedString;
  text: LocalizedString;
}

export interface LandingSpec {
  id: LandingId;
  /** Pfad ohne fuehrenden Slash */
  path: string;
  kicker: LocalizedString;
  h1: LocalizedString;
  lead: LocalizedString;
  benefits: LandingBenefit[];
  /** Cluster-Keywords fuer Meta + JSON-LD */
  keywords: LocalizedString;
}

export const landings: LandingSpec[] = [
  {
    id: 'ki-beratung-kmu',
    path: 'ki-beratung-kmu',
    kicker: {
      de: 'KI-BERATUNG FÜR KMU · DACH & APAC',
      en: 'AI CONSULTING FOR SMES · DACH & APAC',
    },
    h1: {
      de: 'KI-Beratung für KMU: Strategisch beraten, Prozesse automatisieren',
      en: 'AI consulting for SMEs: strategic advice, automated processes',
    },
    lead: {
      de: 'Kiventis ist Ihr Partner für KI-Beratung KMU, ERP Prozessautomatisierung und KI Agenten im Mittelstand — von der Strategie über die ERP Schnittstellen Programmierung bis zur E-Rechnung und Workflow Automatisierung.',
      en: 'Kiventis is your partner for AI consulting for SMEs, ERP process automation and AI agents for the mid-market — from strategy and ERP interface programming to e-invoicing and workflow automation.',
    },
    benefits: [
      {
        title: { de: 'KI Beratung KMU', en: 'AI consulting for SMEs' },
        text: {
          de: 'Strategie, Tool-Auswahl und ROI-Planung für den Mittelstand — von der Potenzialanalyse bis zum Fahrplan.',
          en: 'Strategy, tool selection and ROI planning for the mid-market — from potential analysis to roadmap.',
        },
      },
      {
        title: { de: 'ERP Prozessautomatisierung', en: 'ERP process automation' },
        text: {
          de: 'End-to-End-Automatisierung bestehender ERP-Workflows ohne Systemwechsel.',
          en: 'End-to-end automation of existing ERP workflows without switching systems.',
        },
      },
      {
        title: { de: 'KI Agenten Mittelstand', en: 'AI agents for the mid-market' },
        text: {
          de: 'Autonome Agenten für Kundenservice, Beschaffung und Controlling — mit Audit-Trail.',
          en: 'Autonomous agents for customer service, procurement and controlling — with audit trail.',
        },
      },
      {
        title: { de: 'ERP Schnittstellen Programmierung', en: 'ERP interface programming' },
        text: {
          de: 'Individuelle Middleware und API-Integrationen für SAP S/4HANA & ECC, Microsoft Dynamics 365, Mesonic WinLine, proALPHA, abas, Infor und Sage.',
          en: 'Custom middleware and API integrations for SAP S/4HANA & ECC, Microsoft Dynamics 365, Mesonic WinLine, proALPHA, abas, Infor and Sage.',
        },
      },
      {
        title: { de: 'E-Rechnung & Workflow Automatisierung', en: 'E-invoicing & workflow automation' },
        text: {
          de: 'Compliance-konforme Rechnungsverarbeitung und automatisierte Freigabeworkflows.',
          en: 'Compliant invoice processing and automated approval workflows.',
        },
      },
    ],
    keywords: {
      de: 'KI Beratung KMU, ERP Prozessautomatisierung, KI Agenten Mittelstand, ERP Schnittstellen Programmierung, E-Rechnung, Workflow Automatisierung',
      en: 'AI consulting SME, ERP process automation, AI agents mid-market, ERP interface programming, e-invoicing, workflow automation',
    },
  },
  {
    id: 'erp-prozessautomatisierung',
    path: 'erp-prozessautomatisierung',
    kicker: {
      de: 'ERP-PROZESSAUTOMATISIERUNG · MITTELSTAND',
      en: 'ERP PROCESS AUTOMATION · MID-MARKET',
    },
    h1: {
      de: 'ERP-Prozessautomatisierung: Bestehende Workflows end-to-end automatisieren',
      en: 'ERP process automation: automate existing workflows end-to-end',
    },
    lead: {
      de: 'Kiventis automatisiert Ihre ERP-Prozesse — von der Schnittstellen-Programmierung über KI Agenten bis zur E-Rechnung. 25 Jahre ERP- & Prozessberatung, über 250 umgesetzte Projekte.',
      en: 'Kiventis automates your ERP processes — from interface programming and AI agents to e-invoicing. 25 years of ERP & process consulting, over 250 delivered projects.',
    },
    benefits: [
      {
        title: { de: 'Prozess-Audit', en: 'Process audit' },
        text: {
          de: 'Bestandsaufnahme Ihrer ERP-Landschaft: SAP, Dynamics 365, WinLine, proALPHA, abas, Infor, Sage.',
          en: 'Assessment of your ERP landscape: SAP, Dynamics 365, WinLine, proALPHA, abas, Infor, Sage.',
        },
      },
      {
        title: { de: 'Schnittstellen-Programmierung', en: 'Interface programming' },
        text: {
          de: 'Individuelle Middleware über REST, OData, RFC und Webhooks — ohne kostspielige Individualprogrammierung im ERP-Kern.',
          en: 'Custom middleware via REST, OData, RFC and webhooks — without costly custom development in the ERP core.',
        },
      },
      {
        title: { de: 'KI Agenten für Routineaufgaben', en: 'AI agents for routine tasks' },
        text: {
          de: 'Autonome Agenten für Beschaffung, Controlling und Kundenservice mit granularem RBAC.',
          en: 'Autonomous agents for procurement, controlling and customer service with granular RBAC.',
        },
      },
      {
        title: { de: 'E-Rechnung & Compliance', en: 'E-invoicing & compliance' },
        text: {
          de: 'Art.-4-konforme Schulungsnachweise, KI-Nutzungsrichtlinien und lückenlose Audit-Trails.',
          en: 'Article-4-compliant training records, AI usage policies and complete audit trails.',
        },
      },
      {
        title: { de: 'PoC in 14 Tagen', en: 'PoC in 14 days' },
        text: {
          de: 'Funktionsfähiger Proof of Concept mit messbarem ROI — erstes Ergebnis bereits in 48 Stunden.',
          en: 'Functional proof of concept with measurable ROI — first results within 48 hours.',
        },
      },
    ],
    keywords: {
      de: 'ERP Prozessautomatisierung, ERP Schnittstellen Programmierung, KI Agenten Mittelstand, E-Rechnung, Workflow Automatisierung, KI Beratung KMU',
      en: 'ERP process automation, ERP interface programming, AI agents mid-market, e-invoicing, workflow automation, AI consulting SME',
    },
  },
];

export const landingById = (id: LandingId): LandingSpec =>
  landings.find((l) => l.id === id) ?? landings[0];
