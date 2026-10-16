export interface AuditQuestionOption {
  id: string;
  label: {
    de: string;
    en: string;
  };
  description: {
    de: string;
    en: string;
  };
  riskPoints: number; // 0 (safe) to 25 (critical risk)
  liabilityFactor: number; // Multiplier or additional penalty
}

export interface AuditQuestion {
  id: number;
  category: {
    de: string;
    en: string;
  };
  lawReference: string; // e.g., 'Art. 4 Abs. 1 Verordnung (EU) 2024/1689'
  question: {
    de: string;
    en: string;
  };
  clarification: {
    de: string;
    en: string;
  };
  options: AuditQuestionOption[];
}

export interface AuditResult {
  totalScore: number; // 0 - 100 (100 = highest risk)
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  title: {
    de: string;
    en: string;
  };
  summary: {
    de: string;
    en: string;
  };
  ceoLiabilityNotice: {
    de: string;
    en: string;
  };
  maxFineEuAiAct: string;
  maxFineGdpr: string;
  primaryViolations: {
    law: string;
    description: {
      de: string;
      en: string;
    };
  }[];
  immediateActions: {
    de: string;
    en: string;
  }[];
}

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    category: {
      de: 'Schatten-KI & Tool-Nutzung',
      en: 'Shadow AI & Tool Adoption',
    },
    lawReference: 'Art. 4 Abs. 1 & Art. 2 Abs. 1 EU AI Act',
    question: {
      de: 'Nutzen Mitarbeiter in Ihrem Betrieb bereits KI-Tools wie ChatGPT, DeepL, Microsoft Copilot oder Claude für Arbeitsaufgaben?',
      en: 'Do employees in your company use AI tools such as ChatGPT, DeepL, Microsoft Copilot, or Claude for work tasks?',
    },
    clarification: {
      de: 'Bereits die gelegentliche Textoptimierung von Kunden-E-Mails oder Tabellenkalkulationen über private oder geschäftliche Accounts gilt rechtlich als betriebliche Nutzung eines KI-Systems.',
      en: 'Even occasional drafting of client emails or spreadsheet formula queries on private or business accounts legally constitutes operational AI deployment.',
    },
    options: [
      {
        id: '1-critical',
        label: {
          de: 'Ja, unreguliert / Jeder nutzt was er möchte (Schatten-KI wahrscheinlich)',
          en: 'Yes, unregulated / Everyone uses what they want (Shadow AI likely)',
        },
        description: {
          de: 'Keine zentrale Erfassung oder Nutzungsübersicht im Betrieb vorhanden.',
          en: 'No central inventory or company-wide usage oversight.',
        },
        riskPoints: 25,
        liabilityFactor: 1.3,
      },
      {
        id: '1-high',
        label: {
          de: 'Ja, offizielle Freigabe einzelner Tools, aber keine Monitoring-Prozesse',
          en: 'Yes, official approval of selected tools, but no continuous monitoring',
        },
        description: {
          de: 'Tools sind bekannt, jedoch ohne technische Sperren für Schatten-KI.',
          en: 'Approved tools exist, but no technical enforcement against rogue tools.',
        },
        riskPoints: 18,
        liabilityFactor: 1.1,
      },
      {
        id: '1-low',
        label: {
          de: 'Strikte Whitelist mit zentralem Single-Sign-On und Enterprise-Lizenzen',
          en: 'Strict whitelist with central enterprise SSO and zero-retention contracts',
        },
        description: {
          de: 'Nur freigegebene Unternehmenslizenzen mit Zero-Data-Retention aktiv.',
          en: 'Only verified enterprise subscriptions with zero-data-retention active.',
        },
        riskPoints: 5,
        liabilityFactor: 0.9,
      },
    ],
  },
  {
    id: 2,
    category: {
      de: 'Gesetzliche Pflicht zur KI-Kompetenz (Art. 4)',
      en: 'Mandatory AI Literacy (Art. 4)',
    },
    lawReference: 'Art. 4 Verordnung (EU) 2024/1689 (in Kraft seit 02.02.2025)',
    question: {
      de: 'Können Sie für alle KI-nutzenden Mitarbeiter personengebundene, nachprüfbare Schulungsnachweise vorlegen?',
      en: 'Can you provide documented, person-specific certificates of AI literacy for all employees utilizing AI tools?',
    },
    clarification: {
      de: 'Artikel 4 EU AI Act verpflichtet jeden Betreiber (auch KMUs), sicherzustellen, dass ihr Personal über ausreichende KI-Kompetenz („AI Literacy“) verfügt. Bei fehlendem Nachweis greift das Organisationsverschulden der Geschäftsführung.',
      en: 'Article 4 EU AI Act mandates all deployers (including SMEs) to ensure staff possess sufficient AI literacy. Absence of documented training triggers personal leadership liability.',
    },
    options: [
      {
        id: '2-critical',
        label: {
          de: 'Nein, es gab bisher keinerlei strukturierte Schulungen oder offizielle Zertifikate',
          en: 'No, there have been zero structured training courses or verifiable certificates',
        },
        description: {
          de: 'Akutes Haftungsrisiko der Geschäftsführung bei jedem Fehlverhalten des Mitarbeiters.',
          en: 'Immediate personal liability of management for any employee AI misconduct.',
        },
        riskPoints: 30,
        liabilityFactor: 1.5,
      },
      {
        id: '2-high',
        label: {
          de: 'Nur informelle Tipps / YouTube-Videos / Selbststudium einzelner Mitarbeiter',
          en: 'Only informal tips / YouTube videos / self-study by individual staff',
        },
        description: {
          de: 'Gilt vor Behörden und Gerichten nicht als rechtswirksamer Befähigungsnachweis.',
          en: 'Not recognized by regulatory bodies or labor courts as formal proof of literacy.',
        },
        riskPoints: 22,
        liabilityFactor: 1.25,
      },
      {
        id: '2-safe',
        label: {
          de: 'Ja, vollständige Schulungsnachweise mit Zertifikaten und Prüfnummern archiviert',
          en: 'Yes, full training records with certificates and audit numbers archived',
        },
        description: {
          de: 'Schulungsnachweis gemäß Art. 4 mit Re-Zertifizierungszyklus implementiert.',
          en: 'Article 4 training protocol with re-certification cycle in place.',
        },
        riskPoints: 0,
        liabilityFactor: 0.8,
      },
    ],
  },
  {
    id: 3,
    category: {
      de: 'Geschäftsgeheimnisse, Sourcecode & DSGVO',
      en: 'Trade Secrets, Source Code & GDPR',
    },
    lawReference: 'GeschGehG § 4 & DSGVO Art. 83 Abs. 5',
    question: {
      de: 'Werden oder wurden Kundendaten, interne Kalkulationen, Verträge oder Quellcode in KI-Prompts eingegeben?',
      en: 'Are confidential client data, cost calculations, contracts, or source code entered into AI prompts?',
    },
    clarification: {
      de: 'Werden schützenswerte Geschäftsdaten in Cloud-Dienste ohne Enterprise-Sicherheitsvertrag eingegeben, erlischt der gesetzliche Schutz nach dem Geschäftsgeheimnisgesetz (GeschGehG) mangels „angemessener Geheimhaltungsmaßnahmen“.',
      en: 'Entering sensitive company data into non-enterprise cloud LLMs forfeits statutory trade secret protection under European law due to lack of reasonable safeguards.',
    },
    options: [
      {
        id: '3-critical',
        label: {
          de: 'Ja oder unklar / Mitarbeiter nutzen reguläre Free- bzw. Plus-Accounts',
          en: 'Yes or unclear / Staff use regular free or individual plus accounts',
        },
        description: {
          de: 'Modelle nutzen Eingaben potenziell zum Nachtrainieren; Verstoß gegen DSGVO und NDA.',
          en: 'Consumer models train on prompts; direct breach of GDPR, NDA, and trade secrecy.',
        },
        riskPoints: 25,
        liabilityFactor: 1.4,
      },
      {
        id: '3-medium',
        label: {
          de: 'Eingabe verboten, aber wir haben keine technischen Datenfilter (DLP) aktiv',
          en: 'Inputs prohibited by word of mouth, but no technical DLP filters enforced',
        },
        description: {
          de: 'Rein organisatorisches Verbot ohne technische Kontrollen oder Durchsetzung.',
          en: 'Pure verbal policy with zero technical safeguards against accidental data leakage.',
        },
        riskPoints: 15,
        liabilityFactor: 1.1,
      },
      {
        id: '3-safe',
        label: {
          de: 'Technisch abgesichert: Zero-Data-Retention Verträge und Anonymisierungs-Filter',
          en: 'Technically secured: Zero-data-retention contracts and automated masking',
        },
        description: {
          de: 'Keine Prompt-Speicherung durch KI-Anbieter; Daten verbleiben im europäischen Rechtsraum.',
          en: 'No prompt logging by vendors; enterprise EU hosting and strict encryption.',
        },
        riskPoints: 2,
        liabilityFactor: 0.85,
      },
    ],
  },
  {
    id: 4,
    category: {
      de: 'Betriebliche KI-Richtlinie (AI Governance)',
      en: 'Corporate AI Policy & Governance',
    },
    lawReference: '§ 43 Abs. 1 GmbHG & § 93 AktG (Sorgfaltspflicht der Geschäftsleitung)',
    question: {
      de: 'Existiert in Ihrem Unternehmen eine schriftliche, von der Geschäftsführung in Kraft gesetzte KI-Betriebsrichtlinie?',
      en: 'Does your company maintain a written AI corporate policy formally signed off by executive management?',
    },
    clarification: {
      de: 'Eine rechtskonforme KI-Richtlinie regelt erlaubte Tools, Urheberrechtskennzeichnung von KI-Inhalten, Anonymisierungspflichten sowie Verifikationsroutinen („Four-Eyes-Principle“) vor der Weitergabe an Kunden.',
      en: 'A legally compliant AI directive regulates permissible tools, copyright attribution of synthetic outputs, anonymization standards, and four-eyes review workflows.',
    },
    options: [
      {
        id: '4-critical',
        label: {
          de: 'Nein, es gibt bisher keinerlei schriftliche Richtlinie oder Betriebsvereinbarung',
          en: 'No written policy or management directive exists at all',
        },
        description: {
          de: 'Unmittelbares Organisationsverschulden bei rechtlichen Streitigkeiten oder Schadensfällen.',
          en: 'Direct managerial organizational culpability in any litigation or audit case.',
        },
        riskPoints: 20,
        liabilityFactor: 1.3,
      },
      {
        id: '4-medium',
        label: {
          de: 'Nur eine kurze informelle E-Mail oder mündliche Anweisung an das Team',
          en: 'Only a brief informal email memo or verbal instruction to the team',
        },
        description: {
          de: 'Rechtlich nicht ausreichend zur Enthaftung der Geschäftsleitung im Schadensfall.',
          en: 'Legally insufficient to discharge managerial liability under German commercial law.',
        },
        riskPoints: 12,
        liabilityFactor: 1.1,
      },
      {
        id: '4-safe',
        label: {
          de: 'Ja, formal verabschiedete KI-Richtlinie mit jährlicher Bestätigung durch Mitarbeiter',
          en: 'Yes, formal signed AI directive with mandatory annual employee re-acknowledgment',
        },
        description: {
          de: 'Gültige Enthaftungsgrundlage mit klar definierten Eskalations- und Freigabewegen.',
          en: 'Enforceable governance framework with clear escalation and sign-off paths.',
        },
        riskPoints: 0,
        liabilityFactor: 0.85,
      },
    ],
  },
  {
    id: 5,
    category: {
      de: 'Exposition & Betriebsgröße',
      en: 'Company Exposure & Headcount',
    },
    lawReference: 'Art. 99 Abs. 3–5 EU AI Act (Bußgeldbemessung nach Unternehmensgröße)',
    question: {
      de: 'Wie viele Mitarbeiter in Ihrem Unternehmen haben regelmäßigen Zugriff auf Rechner oder KI-Dienste?',
      en: 'How many employees in your organization have active computer access or utilize digital AI services?',
    },
    clarification: {
      de: 'Die Bußgeldobergrenzen des EU AI Acts und der DSGVO staffeln sich prozentual am weltweiten Jahresumsatz bzw. an absoluten Beträgen von bis zu 15.000.000 € (bzw. 35 Mio. € bei verbotenen KI-Praktiken). Größere Teams vervielfachen das Entdeckungs- und Abmahnrisiko.',
      en: 'Statutory penalties under the EU AI Act and GDPR scale up to 3% of worldwide turnover or €15,000,000 (up to €35M for prohibited practices). Larger teams multiply inspection exposure.',
    },
    options: [
      {
        id: '5-micro',
        label: {
          de: '1 bis 10 Mitarbeiter (Kleinbetrieb / Start-up)',
          en: '1 to 10 employees (Micro enterprise / Boutique)',
        },
        description: {
          de: 'Geringeres Entdeckungsrisiko, jedoch existenzbedrohende persönliche Haftung des Inhabers.',
          en: 'Lower audit probability, but existential personal liability for the sole managing director.',
        },
        riskPoints: 5,
        liabilityFactor: 1.0,
      },
      {
        id: '5-small',
        label: {
          de: '11 bis 50 Mitarbeiter (Typischer Mittelstand / Dienstleister / Kanzlei)',
          en: '11 to 50 employees (Mid-tier SME / Agency / Professional Services)',
        },
        description: {
          de: 'Hohe Schatten-KI-Wahrscheinlichkeit ohne zentrales Audit; primäres Prüffeld der Behörden.',
          en: 'High shadow AI probability without central audit; prime target for regulatory scrutiny.',
        },
        riskPoints: 10,
        liabilityFactor: 1.25,
      },
      {
        id: '5-medium',
        label: {
          de: '51 bis 250 Mitarbeiter (Gehobener Mittelstand / Industrie / Fertigung)',
          en: '51 to 250 employees (Upper mid-market / Industrial manufacturing / Tech)',
        },
        description: {
          de: 'Empfindliche Bußgeldhöhen (bis zu 3% des Jahresumsatzes) und erhebliche Reputationsschäden.',
          en: 'Heavy fine exposure (up to 3% annual global revenue) and critical supply chain fallout.',
        },
        riskPoints: 15,
        liabilityFactor: 1.5,
      },
      {
        id: '5-large',
        label: {
          de: 'Über 250 Mitarbeiter (Großunternehmen / Konzernbereich)',
          en: 'Over 250 employees (Large enterprise / Corporate unit)',
        },
        description: {
          de: 'Fokus nationaler Aufsichtsbehörden; zwingende Pflicht zur formalen Zertifizierungsdokumentation.',
          en: 'Primary regulatory focus; strict duty of certified Article 4 compliance audit trails.',
        },
        riskPoints: 20,
        liabilityFactor: 1.8,
      },
    ],
  },
];

export function calculateAuditResult(selectedOptionIds: Record<number, string>): AuditResult {
  let rawScore = 0;
  let maxPossibleScore = 120;
  let multiplier = 1.0;

  for (const q of AUDIT_QUESTIONS) {
    const selectedId = selectedOptionIds[q.id];
    const option = q.options.find((o) => o.id === selectedId);
    if (option) {
      rawScore += option.riskPoints;
      multiplier = Math.max(multiplier, option.liabilityFactor);
    }
  }

  // Normalized score 0 - 100
  const normalized = Math.min(100, Math.round((rawScore / maxPossibleScore) * 100 * multiplier));

  if (normalized >= 65) {
    return {
      totalScore: normalized,
      riskLevel: 'critical',
      title: {
        de: 'AKUT HAFTUNGSGEFÄHRDET (HOCHRISIKO)',
        en: 'ACUTE PERSONAL LIABILITY DETECTED (HIGH RISK)',
      },
      summary: {
        de: 'Ihr Betrieb erfüllt zentrale Anforderungen von Art. 4 EU AI Act nicht. Bei Datenschutzpannen, Urheberrechtsverletzungen durch KI oder Aufsichtsverfahren haften Sie als Geschäftsführer persönlich wegen nachweisbarem Organisationsverschulden (§ 43 GmbHG).',
        en: 'Your organization fails key Article 4 EU AI Act requirements. In case of data leaks or copyright disputes, managing directors face direct personal liability due to lack of certified staff training.',
      },
      ceoLiabilityNotice: {
        de: 'DURCHGRIFFSHAFTUNG AKTIV: Die gesetzliche Enthaftung ist mangels dokumentierter Schulungsnachweise und AI-Literacy-Zertifikate unwirksam. Schadensersatzansprüche von Kunden oder Gesellschaftern treffen das Privatvermögen der Geschäftsleitung.',
        en: 'PIERCING LIABILITY ACTIVE: Exculpation is legally void due to missing person-specific Article 4 training certificates. Commercial damages can pierce through to the executive leadership.',
      },
      maxFineEuAiAct: 'Bis zu 15.000.000 € oder 3% des weltweiten Vorjahresumsatzes (Art. 99 EU AI Act)',
      maxFineGdpr: 'Bis zu 20.000.000 € oder 4% des weltweiten Vorjahresumsatzes (Art. 83 DSGVO)',
      primaryViolations: [
        {
          law: 'Art. 4 EU AI Act',
          description: {
            de: 'Fehlende Dokumentation der gesetzlichen KI-Kompetenz für operative Mitarbeiter.',
            en: 'Missing documentation of statutory AI literacy for operational personnel.',
          },
        },
        {
          law: '§ 43 GmbHG / § 93 AktG',
          description: {
            de: 'Verletzung der kaufmännischen Sorgfaltspflicht durch unregulierte Schatten-KI.',
            en: 'Breach of managerial duty of care through unmonitored shadow AI deployments.',
          },
        },
        {
          law: 'GeschGehG § 4',
          description: {
            de: 'Verlust des gesetzlichen Geschäftsgeheimnisschutzes durch ungesicherte Cloud-Prompts.',
            en: 'Loss of statutory trade secret protection due to unshielded third-party cloud prompts.',
          },
        },
      ],
      immediateActions: [
        {
          de: '1. Kiventis Inhouse- oder Online-Schulung nach Art. 4 EU AI Act für alle KI-nutzenden Mitarbeiter durchführen.',
          en: '1. Execute Kiventis Article 4 EU AI Act training for all employees utilizing AI tools.',
        },
        {
          de: '2. Offizielles DIN-Audit-Zertifikat mit Verifikations-Prüfnummer für die Behördenakte hinterlegen.',
          en: '2. Archive official DIN audit certificate with verification ID in company compliance file.',
        },
        {
          de: '3. Enthaftende KI-Betriebsrichtlinie und Prompt-Schutzfilter sofort in Kraft setzen.',
          en: '3. Formally institute enterprise AI guidelines and zero-retention prompt safeguards.',
        },
      ],
    };
  }

  if (normalized >= 40) {
    return {
      totalScore: normalized,
      riskLevel: 'high',
      title: {
        de: 'SIGNIFIKANTES ORGANISATIONSVERSCHULDEN',
        en: 'SIGNIFICANT COMPLIANCE EXPOSURE',
      },
      summary: {
        de: 'Es existieren bereits Teilmaßnahmen, jedoch fehlen rechtsverbindliche personengebundene Schulungsnachweise nach Art. 4. Im Ernstfall können Aufsichtsbehörden empfindliche Bußgelder verhängen.',
        en: 'Initial measures are present, but verified person-specific Article 4 certificates remain absent. Regulatory audits will flag this as organizational deficiency.',
      },
      ceoLiabilityNotice: {
        de: 'TEILWEISE HAFTUNG: Das Risiko ist durch erste Richtlinien gedämpft, aber die Beweislast bei KI-Vorfällen liegt bei Ihnen. Ohne Zertifikate ist der Enthaftungsnachweis vor Gericht lückenhaft.',
        en: 'PARTIAL LIABILITY: Risks are buffered by initial guidelines, but statutory burden of proof remains on management. Missing certificates leave legal defense vulnerable.',
      },
      maxFineEuAiAct: 'Bis zu 7.500.000 € oder 1,5% des Vorjahresumsatzes',
      maxFineGdpr: 'Bis zu 10.000.000 € oder 2% des Vorjahresumsatzes',
      primaryViolations: [
        {
          law: 'Art. 4 EU AI Act',
          description: {
            de: 'Schulungen erfolgten nur informell ohne standardisierte Prüf- und Zertifikatsstandards.',
            en: 'Training took place informally without standardized audit and certificate criteria.',
          },
        },
        {
          law: 'Art. 25 & 32 DSGVO',
          description: {
            de: 'Fehlende technische Durchsetzung von Zero-Data-Retention bei KI-Prompts.',
            en: 'Lack of technically enforced zero-data-retention on employee AI prompts.',
          },
        },
      ],
      immediateActions: [
        {
          de: '1. Offizielles Kiventis Art. 4 Zertifizierungstraining nachholen und Prüfnummern dokumentieren.',
          en: '1. Complete official Kiventis Article 4 certification training and register audit IDs.',
        },
        {
          de: '2. Muster-Betriebsvereinbarung für KI-Nutzung schriftlich im Unternehmen aushängen.',
          en: '2. Enact standardized AI operational agreements across all operational units.',
        },
      ],
    };
  }

  return {
    totalScore: normalized,
    riskLevel: 'medium',
    title: {
      de: 'TEILKONFORM MIT NACHWEISBEDARF',
      en: 'PARTIALLY COMPLIANT · PROOF DEFICIT',
    },
    summary: {
      de: 'Ihr Unternehmen verfügt über ein grundlegendes Risikobewusstsein. Um die lückenlose Enthaftung nach Art. 4 EU AI Act abzuschließen, müssen die Nachweise jetzt in einem zentralen Compliance-Register hinterlegt werden.',
      en: 'Your company demonstrates solid risk awareness. To complete statutory immunity under Article 4 EU AI Act, person-specific audit certificates must now be formally archived.',
    },
    ceoLiabilityNotice: {
      de: 'ENHAFTUNG IN REICHWEITE: Mit der Kiventis-Zertifizierung erlangen Sie vollständige Rechtssicherheit und können das offizielle Verifikations-Badge auf Ihrer Website führen.',
      en: 'LEGAL IMMUNITY WITHIN REACH: Kiventis Article 4 certification completes statutory immunity and unlocks your official verification badge.',
    },
    maxFineEuAiAct: 'Restrisiko bei behördlicher Stichprobenprüfung',
    maxFineGdpr: 'Geringes Restrisiko bei Dokumentationslücken',
    primaryViolations: [
      {
        law: 'Art. 4 EU AI Act',
        description: {
          de: 'Zertifikate müssen auf den aktuellen Stand der Verordnung (EU 2024/1689) gebracht werden.',
          en: 'Certificates must reflect latest Regulation (EU) 2024/1689 requirements.',
        },
      },
    ],
    immediateActions: [
      {
        de: '1. Kiventis KI-Kompetenz-Zertifikate für das Team anfordern.',
        en: '1. Request Kiventis AI Literacy certificates for domain staff.',
      },
      {
        de: '2. Website-Trust-Badge „KI-kompetenter Betrieb nach Art. 4“ in Ihren Web-Footer einbinden.',
        en: '2. Embed official "Certified AI Literacy Deployer" trust badge in your web footer.',
      },
    ],
  };
}

export const OFFICIAL_LEGAL_CITATIONS = [
  {
    article: 'Art. 4 Verordnung (EU) 2024/1689 (EU AI Act)',
    heading: {
      de: 'Pflicht zur KI-Kompetenz („AI Literacy“)',
      en: 'Mandatory AI Literacy Standard',
    },
    quote: {
      de: '„Anbieter und Betreiber von KI-Systemen ergreifen Maßnahmen, um nach besten Kräften sicherzustellen, dass ihr Personal und andere Personen, die in ihrem Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind, über ein ausreichendes Maß an KI-Kompetenz verfügen, wobei ihre technischen Kenntnisse, ihre Erfahrung, ihre Ausbildung und ihre Schulung sowie der Kontext, in dem die KI-Systeme eingesetzt werden sollen, und die Personen oder Personengruppen, bei denen die KI-Systeme eingesetzt werden sollen, zu berücksichtigen sind.“',
      en: '"Providers and deployers of AI systems shall take measures to ensure to their best extent that their staff and other persons dealing with the operation and use of AI systems on their behalf possess a sufficient level of AI literacy, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in."',
    },
    implication: {
      de: 'Gilt seit 2. Februar 2025 unmittelbar für alle Betriebe in der EU. Fehlende Schulungsnachweise stellen einen direkten Verstoß gegen europäisches Primärrecht dar.',
      en: 'Directly in effect since February 2, 2025 across all EU deployers. Missing training evidence represents a direct infraction.',
    },
  },
  {
    article: '§ 43 Abs. 1 & 2 GmbHG (bzw. § 93 AktG)',
    heading: {
      de: 'Sorgfaltspflicht und persönliche Haftung der Geschäftsleitung',
      en: 'Managerial Duty of Care & Personal Liability',
    },
    quote: {
      de: '„Die Geschäftsführer haben in den Angelegenheiten der Gesellschaft die Sorgfalt eines ordentlichen Geschäftsmannes anzuwenden. Geschäftsführer, welche ihre Obliegenheiten verletzen, haften der Gesellschaft solidarisch für den entstandenen Schaden.“',
      en: '"Managing directors must apply the diligence of a prudent businessperson in the affairs of the company. Directors who violate their duties are jointly and severally liable to the company for the resulting damage."',
    },
    implication: {
      de: 'Wer Mitarbeitern KI-Zugriff gewährt, ohne sie nach Art. 4 zu schulen und Richtlinien zu erlassen, haftet bei Bußgeldern oder Rechtsverletzungen persönlich und unbegrenzt mit seinem Privatvermögen.',
      en: 'Deploying AI tools without certified employee training constitutes breach of managerial duty, allowing company damage claims against the director personally.',
    },
  },
  {
    article: 'Art. 99 EU AI Act & Art. 83 DSGVO',
    heading: {
      de: 'Bußgeldbemessung und Sanktionskatalog',
      en: 'Statutory Penalty Scale',
    },
    quote: {
      de: '„Die Sanktionen müssen wirksam, verhältnismäßig und abschreckend sein [...] Geldbußen von bis zu 15 000 000 EUR oder im Fall eines Unternehmens von bis zu 3 % seines gesamten weltweiten Jahresumsatzes des vorangegangenen Geschäftsjahrs.“',
      en: '"Sanctions must be effective, proportionate, and dissuasive [...] administrative fines of up to EUR 15,000,000 or up to 3% of total worldwide annual turnover."',
    },
    implication: {
      de: 'Europäische Behörden haben angekündigt, im Mittelstand stichprobenartig Schulungsnachweise und AI-Governance-Konzepte abzufragen.',
      en: 'European supervisory authorities are executing targeted sample audits targeting SME operational training records.',
    },
  },
];
