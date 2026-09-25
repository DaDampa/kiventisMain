import { PersonaContent, ServiceModule, CaseStudy, PricingPackage, FaqItem } from '../types';

export const translations = {
  de: {
    nav: {
      brand: 'KIVENTIS',
      solutions: 'Leistungen',
      roles: 'Für Entscheider',
      cases: 'Erfolgsbeispiele',
      roi: 'ROI-Rechner',
      pricing: 'Preise',
      faq: 'FAQ & AI Act',
      ctaButton: '30-Min. Erstgespräch buchen',
    },
    hero: {
      kicker: 'B2B KI-ENABLEMENT FÜR MITTELSTÄNDISCHE UNTERNEHMEN · DACH & APAC',
      headlineStart: 'Wir befähigen KMU-Teams,',
      headlineAccent: 'Arbeitsabläufe sicher zu automatisieren',
      headlineEnd: 'und Produktivität messbar zu steigern.',
      subheadline:
        'Praxisnahes Online-Training im souveränen Umgang mit AI, Vibe Coding für Fachkräfte ohne Programmierkenntnisse und rechtssichere EU-AI-Act-Compliance. Sparen Sie Serviceverträge und Softwarelizenzen, indem Sie Ihre eigenen Tools und Webseiten in kurzer Zeit und maßgeschneidert an Ihr Unternehmen erstellen. Modular über mehrere Wochen (1–2x pro Woche), mit messbarem ROI in 2 bis 4 Monaten.',
      primaryCta: '30-Min. KI-Erstgespräch buchen',
      secondaryCta: 'KMU-Leitfaden herunterladen',
      trustMarkers: [
        '25 Jahre Business- & ERP-Prozessberatung',
        'Über 250 erfolgreich umgesetzte ERP-Projekte',
        'Kunden aus 40 Branchen (Europa & Southeast Asia)',
        'Workflowanbindung: CRM, Supply Chain & Produktion',
      ],
      quickStats: [
        { value: '25+ J.', label: 'ERP- & Prozessberatung', sub: 'solide Enterprise-Erfahrung seit 2001' },
        { value: '250+', label: 'Realisierte ERP-Projekte', sub: 'End-to-End Workflows & Integrationen' },
        { value: '40 Br.', label: 'Europa & Southeast Asia', sub: 'Industrie, Handel, Supply Chain & KMU' },
      ],
      interactivePreview: {
        title: 'KIVENTIS B2B Execution Pipeline',
        subtitle: 'Vom Fachbereichs-Problem zum sicheren Produktiv-Workflow in 48 Stunden',
        steps: [
          { tag: '01. Input', title: 'Unstrukturierte Daten', desc: 'PDFs, Kundenanfragen, ERP-Exporte, Verträge' },
          { tag: '02. Core', title: 'RAG & Lokale Wissensdatenbank', desc: 'Sichere Vektorsuche ohne Datenabfluss (DSGVO)' },
          { tag: '03. Vibe Coding', title: 'Citizen Developer App', desc: 'Fachabteilung baut interne Tools per KI-Prompts' },
          { tag: '04. Output', title: 'Messbare Zeiteinsparung', desc: 'Bearbeitung von 45 auf 6 Minuten gesenkt' },
        ],
      },
    },
    socialProof: {
      heritageBadge: '25 JAHRE BUSINESS & ERP PROCESS CONSULTING',
      heading: '25 Jahre gewachsene ERP- & Prozessberatung · Über 250 umgesetzte Projekte',
      subheading:
        'Keine theoretischen KI-Experimente, sondern tiefes Prozess- und Systemverständnis: Seit 25 Jahren begleiten wir den Mittelstand bei der Digitalisierung und Optimierung komplexer Abläufe. Mit weit über 250 realisierten ERP-Projekten in 40 Branchen in Europa und Southeast Asia verbinden wir moderne KI und Vibe Coding nahtlos mit Ihren Kernsystemen – inklusive CRM, Supply Chain und Produktion.',
      enterprisePillars: [
        {
          value: '25+ Jahre',
          label: 'Business & ERP Prozess Consulting',
          desc: 'Tiefes Verständnis für gewachsene Unternehmensabläufe und IT-Architekturen',
        },
        {
          value: '250+ Projekte',
          label: 'Erfolgreich umgesetzte ERP-Projekte',
          desc: 'End-to-End Migrationen, Prozessoptimierungen und System-Rollouts',
        },
        {
          value: '40 Branchen',
          label: 'Europa & Southeast Asia',
          desc: 'Erprobte Best Practices für Maschinenbau, Großhandel, MedTech & Dienstleistung',
        },
        {
          value: 'End-to-End',
          label: 'Workflowanbindung',
          desc: 'Nahtlose Integration: CRM, Supply Chain, Einkauf, Lager & Produktion',
        },
      ],
      integrationSystems: [
        'SAP / S4HANA',
        'Microsoft Dynamics 365',
        'proALPHA',
        'abas ERP',
        'Infor LN/M3',
        'Salesforce CRM',
        'HubSpot Enterprise',
        'Supply Chain EDI',
        'Shopfloor & MES',
        'Custom REST / SQL',
      ],
      metricsHeading: 'Messbare Befähigung & Effizienzgewinne unserer Kunden',
      metrics: [
        { metric: '5,8 Std.', label: 'Wöchentliche Zeitersparnis pro geschulter Fachkraft' },
        { metric: '100%', label: 'Konformität nach EU AI Act Schulungsnorm (Art. 4)' },
        { metric: '2,8x', label: 'ROI-Multiplikator im 1. Jahr nach Inhouse-Training' },
        { metric: '0 Zeilen', label: 'Herkömmlicher Code nötig durch Vibe-Coding-Methodik' },
      ],
    },
    problem: {
      kicker: 'DIE REALITÄT IM MITTELSTAND',
      heading: 'Warum 78% aller KMU-KI-Initiativen nach den ersten Piloten versanden',
      subheading:
        'Die meisten Unternehmen zahlen bereits für ChatGPT-Lizenzen – erzielen jedoch weder messbare Effizienzgewinne noch Rechtssicherheit.',
      cards: [
        {
          index: '01',
          title: 'Tool-Wildwuchs ohne messbaren ROI',
          description:
            'Mitarbeiter nutzen KI isoliert als besseren Textkorrektor. Es fehlen strukturierte Workflows, standardisierte Prompts und Schnittstellen zu realen Unternehmensdaten.',
          consequence: 'Folge: Laufende Lizenzkosten ohne erkennbaren Einfluss auf operative Margen.',
        },
        {
          index: '02',
          title: 'Rechtliche Unsicherheit & EU AI Act Hürde',
          description:
            'Ab 2025/2026 greifen die strikten EU-Vorgaben: Unternehmen sind gesetzlich verpflichtet, die KI-Kompetenz ihres Personals (Art. 4) und Datenschutz lückenlos nachzuweisen.',
          consequence: 'Folge: Angst vor Audit-Bußgeldern blockiert sinnvolle Initiativen in der Geschäftsleitung.',
        },
        {
          index: '03',
          title: 'Überlastete IT vs. ungeduldige Fachbereiche',
          description:
            'Klassische Softwareprojekte dauern 9 bis 18 Monate. Die IT hat keine Kapazitäten für interne Hilfstools, während Fachkräfte täglich Stunden mit manueller Datenarbeit verbrennen.',
          consequence: 'Folge: Resignation im Team oder unkontrollierte Schatten-IT ohne Governance.',
        },
      ],
      solutionBridge:
        'Unser Ansatz: Wir qualifizieren Ihre bestehenden Mitarbeiter zu "Citizen Developern", die eigene Workflows sicher, compliance-konform und in Rekordzeit selbst automatisieren.',
    },
    personas: {
      kicker: 'FÜR IHR B2B-EINKAUFSGREMIUM',
      heading: 'Passgenaue Antworten für jede Rolle im Entscheidungskreis',
      subheading:
        '6 bis 10 Personen entscheiden im B2B-Kaufprozess. Wir liefern Fakten, die sowohl der Geschäftsführung, der IT als auch den Fachbereichen sofort einleuchten.',
      tabs: {
        management: 'Geschäftsführung (GF / CEO)',
        itCompliance: 'IT-Leitung & Compliance (CIO / CISO)',
        departments: 'Fachbereiche & HR (Ops / Sales / Einkauf)',
      },
      data: {
        management: {
          roleId: 'management',
          roleName: 'Geschäftsführung & Vorstand',
          badge: 'Fokus: EBITDA, Wettbewerbsvorsprung & Mitarbeiter-Zukunft',
          headline: 'Messbarer betriebswirtschaftlicher Impact statt vager Technologie-Experimente',
          subheadline:
            'Investitionen in KI müssen sich im EBIT niederschlagen. Unser Trainingsansatz garantiert praxistaugliche Produktivitätssteigerungen ab dem ersten Monat.',
          keyBenefits: [
            'Transparenter Break-Even innerhalb von 2 bis 4 Monaten mit nachweisbarem ROI-Reporting',
            'Absicherung der Zukunftsfähigkeit gegen agile Wettbewerber im DACH- und APAC-Raum',
            'Höhere Mitarbeiterzufriedenheit durch Eliminierung monotoner Daten-Fleißarbeiten',
            'Risikominimierung: Vollständiger Schutz vor Bußgeldern des EU AI Act durch Audit-Dokumentation',
          ],
          quote: {
            text: 'Wir haben die Investition in das KIVENTIS Online-Training nach genau 72 Tagen amortisiert. Unsere Teams kalkulieren Angebote heute viermal schneller.',
            author: 'Dr. Michael Schultheiss',
            role: 'Geschäftsführender Gesellschafter',
            company: 'Schultheiss Präzisionstechnik GmbH & Co. KG',
          },
          primaryMetric: {
            value: 'Bis zu 32.500 €',
            label: 'Netto-Jahresersparnis',
            detail: 'berechnet auf ein 20-köpfiges Kernteam in Verwaltung & Vertrieb',
          },
        } as PersonaContent,
        itCompliance: {
          roleId: 'it-compliance',
          roleName: 'IT-Leiter, CISOs & Compliance-Officers',
          badge: 'Fokus: DSGVO, EU AI Act, Datensouveränität & On-Premise',
          headline: 'Vollständige Datensouveränität & rechtskonforme Governance nach EU AI Act',
          subheadline:
            'Keine unkontrollierte Schatten-IT, kein Abfluss von Geschäftsgeheimnissen. Wir integrieren sichere Enterprise-Pipelines und lokale Open-Source-LLMs.',
          keyBenefits: [
            'Erfüllung der gesetzlichen Schulungspflicht nach EU AI Act (Art. 4) inklusive Mitarbeiterzertifikate',
            'Zero-Data-Retention-Architekturen: Ihre Firmendaten trainieren keine öffentlichen Modelle Dritter',
            'On-Premise-LLM-Deployment (z. B. Llama 3, Aleph Alpha) für hochsensible F&E- und Finanzdaten',
            'Entlastung der internen IT-Tickets durch kontrollierte, sandboxed Citizen-Developer-Freigaben',
          ],
          quote: {
            text: 'Endlich ein KI-Trainer, der unsere Bedenken zu Datensicherheit und DSGVO ernst nimmt. Die On-Premise-RAG-Lösung läuft absolut autark hinter unserer Firewall.',
            author: 'Markus Eder',
            role: 'Head of Information Security & Infrastructure',
            company: 'Aegis MedSystems AG (Zürich)',
          },
          primaryMetric: {
            value: '100%',
            label: 'DSGVO- & Audit-Konform',
            detail: 'zertifizierte Dokumentation für Behörden und externe Wirtschaftsprüfer',
          },
        } as PersonaContent,
        departments: {
          roleId: 'departments',
          roleName: 'Abteilungsleiter, Fachkräfte & HR',
          badge: 'Fokus: Vibe Coding, RAG-Wissensdatenbanken & Entlastung',
          headline: 'Eigene Workflows und interne Tools bauen – ganz ohne Software-Entwickler',
          subheadline:
            'Fachkräfte in Vertrieb, HR, Einkauf und Fertigung lernen, KI-Assistenten (Cursor, Lovable, Claude) so zu steuern, dass repetitive Aufgaben in Minuten erledigt sind.',
          keyBenefits: [
            'Vibe Coding: Erstellen Sie funktionierende interne Web-Tools und Automatisierungen in Umgangssprache',
            'RAG-Wissensmanagement: Finden Sie technische Spezifikationen und Angebote aus 10.000 Dokumenten in 3 Sekunden',
            'Keine Programmiervorkenntnisse erforderlich: 100% praxisorientierte Übungen mit realen Firmendaten',
            'Sofortige Entlastung: 4 bis 7 Stunden weniger manuelle Copy-Paste-Arbeit pro Woche',
          ],
          quote: {
            text: 'Früher dauerte die Prüfung von Ausschreibungsunterlagen 3 Tage. Mit unserem selbst gebauten Vibe-Coding-Tool erledigen wir das vor der Mittagspause.',
            author: 'Corinna Weber',
            role: 'Leiterin Technischer Vertrieb',
            company: 'Vanguard Industrial Automation',
          },
          primaryMetric: {
            value: '87%',
            label: 'Schnellere Dokumentenprüfung',
            detail: 'von 45 Min. auf 6 Min. pro technischer Spezifikationsabgleich',
          },
        } as PersonaContent,
      },
    },
    solutions: {
      kicker: 'UNSERE TRAININGS- & BERATUNGSPROGRAMME',
      heading: 'Vier modular aufgebaute Leistungsbausteine für Ihren KI-Erfolg',
      subheading:
        'Von der ersten Potenzialanalyse bis zur unternehmensweiten Implementierung von Vibe Coding und Governance.',
      modules: [
        {
          id: 'scan',
          number: '01',
          title: 'KI-Opportunity-Scan & Use-Case-Workshop',
          tagline: 'Prozessanalyse, Identifikation von Quick Wins & ROI-Prognose',
          description:
            'In strukturierten Online-Sessions analysieren wir gemeinsam mit Ihren Fach- und Abteilungsleitern Ihre Kernprozesse. Wir vermitteln erste Grundlagen im gezielten Umgang mit generativer KI, identifizieren die Top-3 Use Cases mit dem höchsten Entlastungspotenzial und erarbeiten eine verbindliche Umsetzungs-Roadmap.',
          deliverables: [
            'Priorisierte Use-Case-Matrix mit Aufwand-Nutzen-Bewertung',
            'Detaillierter ROI- und Amortisationsrechner für Ihre Geschäftsleitung',
            'Empfehlung geeigneter Tools (Cloud vs. On-Premise) inkl. Lizenzkosten-Check',
            'Risiko- und Machbarkeitsanalyse nach EU AI Act Kriterien',
          ],
          audience: 'Geschäftsführung, IT-Leiter & Abteilungsverantwortliche (max. 8 Personen)',
          duration: 'Online-Training: 2 Wochen à 1–2 mal pro Woche + begleitende Prozessanalyse',
          roiTimeline: 'Klarheit über Quick Wins innerhalb von 7 Werktagen',
        },
        {
          id: 'vibe-coding',
          number: '02',
          title: 'Online KI-Enablement & Vibe-Coding-Kurs',
          tagline: 'Praxisnahes Beibringen des täglichen Umgangs mit AI & Citizen Development',
          description:
            'Das Herzstück unseres Enablements: Wir bringen Ihren Fachkräften Schritt für Schritt den souveränen Umgang mit AI bei. Ihre Mitarbeiter lernen, moderne KI-Systeme (Cursor, Lovable, Anthropic Claude, ChatGPT) gezielt im Arbeitsalltag einzusetzen, Prompts professionell zu formulieren und eigene Arbeitsabläufe, automatisierte Daten-Pipelines sowie interne Hilfs-Tools selbstständig und ohne Programmierkenntnisse zu steuern.',
          deliverables: [
            'Intensives Beibringen des praktischen Umgangs mit modernen KI-Assistenten im Arbeitsalltag',
            'Hands-on Bau von 2 bis 3 realen, internen Produktiv-Tools während des Kurses',
            'Prompt-Engineering-Frameworks für verlässliche, fehlerfreie und reproduzierbare Ergebnisse',
            'RAG-Integration: Abfragen firmeninterner PDFs, Word-Dokumente, Spezifikationen und Tabellen',
            'Wöchentliche Praxis-Sprechstunde & 1-zu-1 Feedback für nachhaltige Verankerung im Team',
          ],
          audience: 'Fachteams aus Vertrieb, Einkauf, HR, Marketing & Projektmanagement (8–15 Pers.)',
          duration: 'Online-Training: 4 Wochen à 1–2 mal pro Woche + kontinuierliche Begleitung',
          roiTimeline: 'Erste produktive Zeitersparnis bereits ab Woche 2',
        },
        {
          id: 'governance',
          number: '03',
          title: 'EU AI Act Compliance & AI Literacy Training',
          tagline: 'Rechtssicheres Beibringen des verantwortungsvollen Umgangs mit AI (Art. 4)',
          description:
            'Der EU AI Act verlangt ab Februar 2025 den Nachweis ausreichender KI-Kompetenz (Art. 4) für alle Mitarbeiter, die KI nutzen. Wir schulen Ihr Team interaktiv online im sicheren, rechtskonformen Umgang mit AI-Tools, etablieren klare Nutzungsregeln und händigen auditierte Zertifikate aus.',
          deliverables: [
            'Offizielles Zertifikat über die Erfüllung der Schulungspflicht nach Art. 4 EU AI Act',
            'Praxis-Schulung für Mitarbeiter: Risiken erkennen, Datenschutz wahren, Halluzinationen vermeiden',
            'Maßgeschneiderte KI-Betriebsvereinbarung & Mitarbeiter-Leitlinien für HR & Betriebsrat',
            'Risikoklassifizierung aller im Unternehmen genutzten KI-Tools',
            'Prozessdokumentation für Datenschutz- und Wirtschaftsprüfer-Audits',
          ],
          audience: 'Gesamte Belegschaft, Compliance-Verantwortliche, Betriebsrat, HR',
          duration: 'Online-Training: 2 Wochen à 1–2 mal pro Woche (Live-Webinare & Q&A)',
          roiTimeline: 'Sofortige Rechtssicherheit und Schutz vor empfindlichen Bußgeldern',
        },
        {
          id: 'on-premise',
          number: '04',
          title: 'Datensouveräne On-Premise & RAG Strategieberatung',
          tagline: 'Lokale Sprachmodelle (Llama 3, Aleph Alpha) & souveränes internes Wissensmanagement',
          description:
            'Für KMUs mit hochsensiblen Konstruktionsplänen, Rezepturen oder Finanzdaten, die keine Cloud-Lösungen nutzen dürfen. Wir begleiten Ihr technisches Team online dabei, den souveränen Umgang mit lokalen Open-Source-Modellen und internen RAG-Architekturen hinter der eigenen Firewall zu meistern.',
          deliverables: [
            'Hardware- und Infrastruktur-Dimensionierung für On-Premise-Inferenz',
            'Schulung der IT im Umgang und Fine-Tuning europäischer & Open-Source-Modelle',
            'Aufbau isolierter Vektordatenbanken (Chroma/Qdrant) für DSGVO-konformes RAG',
            'Sicherheitsaudit und Best Practices für lokale Prompt- und Daten-Governance',
          ],
          audience: 'IT-Infrastruktur-Teams, Entwickler & Datensicherheitsbeauftragte',
          duration: 'Online-Begleitung: 4 Wochen à 1–2 mal pro Woche inkl. Architektur-Workshops',
          roiTimeline: '100% Unabhängigkeit von Cloud-Preiserhöhungen & API-Änderungen',
        },
      ],
    },
    caseStudies: {
      kicker: 'MESSBARE ERGEBNISSE AUS DER PRAXIS',
      heading: 'Reale Fallstudien aus dem Mittelstand mit belegbaren Zahlen',
      subheading:
        'Keine theoretischen Konzepte: So haben unsere Kunden in Maschinenbau, MedTech und Großhandel ihre Kernprozesse transformiert.',
      studies: [
        {
          id: 'case-1',
          industry: 'Präzisionsmaschinenbau & Sondermaschinen',
          companyName: 'Hofmann Präzisions-Systeme',
          location: 'Baden-Württemberg (280 Mitarbeiter)',
          employeeCount: '280 Mitarbeiter',
          challenge:
            'Die Angebotserstellung für hochkomplexe Fertigungsteile erforderte das manuelle Durchforsten von über 80-seitigen CAD-Spezifikationen. Die Angebotsabgabe dauerte im Schnitt 3 bis 5 Werktage – Aufträge gingen an schnellere Konkurrenten verloren.',
          solution:
            '3-wöchiges Online-Training (à 2 Termine pro Woche) im praktischen Umgang mit KI und Vibe-Coding für den technischen Vertrieb. Das Team erstellte per Prompts eine interne RAG-Suchmaske, die CAD-Notizen und ERP-Kalkulationen sekundenschnell abgleicht.',
          kpis: [
            { label: 'Prüfdauer pro Anfrage', before: '45 Min.', after: '6 Min.', improvement: '-87%' },
            { label: 'Time-to-Quote für Kunden', before: '4 Tage', after: '4 Stunden', improvement: '24x schneller' },
            { label: 'Konvertierungsrate Angebote', before: '22%', after: '38%', improvement: '+72%' },
          ],
          testimonial: {
            quote:
              'Unsere Vertriebsingenieure waren anfangs skeptisch gegenüber KI. Nach dem Training haben sie ihr eigenes Werkzeug gebaut. Wir gewinnen heute Ausschreibungen, weil wir am selben Tag ein präzises Angebot liefern.',
            author: 'Dipl.-Ing. Thomas Hofmann',
            position: 'Geschäftsführer',
          },
        },
        {
          id: 'case-2',
          industry: 'B2B Großhandel & Technische Distribution',
          companyName: 'Vanguard Industrial Supply',
          location: 'Wien & Singapur (140 Mitarbeiter)',
          employeeCount: '140 Mitarbeiter',
          challenge:
            'Über 1.200 monatliche E-Mail-Lieferantenreklamationen und Frachtabweichungen wurden manuell per Copy-Paste in SAP und Excel übertragen. Hohe Fehlerquote und Bearbeitungszeiten von über 15 Minuten pro Fall.',
          solution:
            'Citizen Developer Schulung des Kundenservice-Teams. Mit modernen Vibe-Coding-Tools wurde ein automatisierter Reklamations-Assistent aufgesetzt, der E-Mails scannt, ERP-Abgleiche vornimmt und SAP-Buchungsentwürfe vorschlägt.',
          kpis: [
            { label: 'Bearbeitungszeit pro Fall', before: '15 Min.', after: '2,8 Min.', improvement: '-81%' },
            { label: 'Automatisierungsgrad', before: '0%', after: '81%', improvement: 'Vollautomatisiert' },
            { label: 'Fehlerquote in Gutschriften', before: '8,4%', after: '0,3%', improvement: '-96%' },
          ],
          testimonial: {
            quote:
              'Das KIVENTIS-Team redet kein Berater-Kauderwelsch, sondern zeigt den Mitarbeitern direkt am Bildschirm, wie sie Aufgaben lösen. Unsere Service-Mitarbeiter lieben das neue Tool – und wir sparen monatlich Hunderte Arbeitsstunden.',
            author: 'Sarah Lin-Brunner',
            position: 'Director of Customer Operations (APAC & DACH)',
          },
        },
        {
          id: 'case-3',
          industry: 'Medizintechnik & Sensorik',
          companyName: 'Aegis BioSensors AG',
          location: 'Zürich & München (410 Mitarbeiter)',
          employeeCount: '410 Mitarbeiter',
          challenge:
            'Strengste regulatorische Auflagen (MDR, ISO 13485). Die Geschäftsführung untersagte zunächst jegliche KI-Nutzung aus Angst vor Compliance-Verstößen gegen den EU AI Act und DSGVO-Lecks bei sensiblen Forschungsdaten.',
          solution:
            'Ganzheitliches Governance-Training für 120 Mitarbeiter sowie Konzeption einer isolierten On-Premise-RAG-Architektur mit Open-Source-LLM hinter der Labor-Firewall. Erstellung aller notwendigen Audit-Unterlagen nach Art. 4 EU AI Act.',
          kpis: [
            { label: 'Geschulte Fachkräfte', before: '0', after: '120 MA', improvement: '100% zertifiziert' },
            { label: 'Audit-Konformität EU AI Act', before: 'Riskant', after: 'Vollständig konform', improvement: 'Zertifiziert' },
            { label: 'Recherchezeit Laborstudien', before: '14 Std./W.', after: '3 Std./W.', improvement: '-78%' },
          ],
          testimonial: {
            quote:
              'KIVENTIS hat uns von der lähmenden KI-Verbotszone in eine rechtssichere, produktive Vorreiterrolle gebracht. Unser externer Compliance-Auditor war von der lückenlosen Dokumentation nach Artikel 4 begeistert.',
            author: 'Dr. Beat Vollenweider',
            position: 'Chief Technology Officer (CTO)',
          },
        },
      ],
    },
    calculator: {
      kicker: 'INTERAKTIVER WERTBEITRAGS-RECHNER',
      heading: 'Berechnen Sie den konkreten ROI für Ihr Unternehmen',
      subheading:
        'Ermitteln Sie mit drei Reglern, wie viel Arbeitszeit und Kosten Ihr Team durch praxisnahe Automatisierung jährlich einspart.',
      teamSizeLabel: 'Anzahl Mitarbeiter im Kernteam',
      hourlyRateLabel: 'Durchschnittlicher interner Stundensatz (Vollkosten)',
      hoursSavedLabel: 'Geschätzte Zeitersparnis pro Mitarbeiter / Woche',
      resultsTitle: 'Ihre prognostizierten Einsparungen:',
      yearlySavings: 'Jährliche Brutto-Einsparung',
      hoursPerYear: 'Freigesetzte Stunden pro Jahr',
      breakEven: 'Prognostizierter Break-Even',
      roiMultiple: 'ROI-Multiplikator im 1. Jahr',
      disclaimer: 'Berechnung basiert auf 40 Netto-Arbeitswochen/Jahr (abzgl. Urlaub, Feiertage & Ausfallzeiten) und typischen Werten aus 65+ betreuten KMU-Projekten.',
      cta: 'Detaillierten Business-Case für Ihre Geschäftsleitung anfordern',
    },
    pricing: {
      kicker: 'TRANSPARENTE INVESTITION',
      heading: 'Drei zielgerichtete Leistungspakete ohne versteckte Kosten',
      subheading:
        'Vom kompakten Online-Audit bis zur umfassenden Team-Befähigung im Umgang mit KI. Alle Pakete sind auf einen ROI in unter 4 Monaten kalkuliert.',
      currency: '€',
      vatNotice: 'Alle Preise zzgl. gesetzlicher MwSt. Reine Online-Durchführung – keine Reisekosten.',
      packages: [
        {
          id: 'opportunity-scan',
          title: 'KI-Opportunity-Scan',
          kicker: 'EINSTIEG & STANDORTBESTIMMUNG',
          priceTag: '2.400',
          priceSub: 'Einmaliger Festpreis für Ihr Führungsteam',
          duration: 'Online-Training: 2 Wochen à 1–2 mal pro Woche',
          targetAudience: 'Ideal für GF & Führungsteams, die vor großen Investitionen Klarheit über Potenziale wollen',
          roiEstimate: 'ROI-Validierung & Entscheidungsvorlage innerhalb von 7 Tagen',
          popular: false,
          features: [
            'Interaktive Online-Analyse von bis zu 5 Kernprozessen Ihres Unternehmens',
            'Grundlagen im professionellen Umgang mit KI für Führungskräfte',
            'Identifikation und Priorisierung der Top-3 Automatisierungs-Quick-Wins',
            'Kompakter ROI- und Business-Case-Bericht für Vorstand/Geschäftsführung',
            'Tool-Empfehlung & Lizenzkosten-Check (Cloud vs. On-Premise)',
            'Erste Risikoeinschätzung nach EU AI Act Vorgaben',
            'Teilnehmerkreis: bis zu 8 Führungskräfte',
          ],
          deliverableSnippet: 'Inkl. detaillierter Entscheidungsvorlage & Roadmap',
        },
        {
          id: 'vibe-coding-bootcamp',
          title: 'Online KI- & Vibe-Coding Intensivkurs',
          kicker: 'BELIEBTESTES FORMAT · MAXIMALER PRODUKTIVITÄTSSPRUNG',
          priceTag: '4.900',
          priceSub: 'Pauschalpreis für Ihr gesamtes Fachteam',
          duration: 'Online-Training: 4 Wochen à 1–2 mal pro Woche',
          targetAudience: 'Für Fachabteilungen, die den produktiven Umgang mit KI im Alltag sicher beherrschen wollen',
          roiEstimate: 'Amortisiert in durchschnittlich 1,5 bis 2,5 Monaten',
          popular: true,
          features: [
            'Umfassendes Beibringen des täglichen Umgangs mit modernen AI-Systemen (Cursor, Claude, GPT)',
            'Direkter Bau von 2 bis 3 realen, internen Produktiv-Tools während des Kurses',
            'RAG-Mastery: Anbindung Ihrer Firmen-PDFs, Excel-Dateien und Wissensbasen',
            'Prompt-Engineering-Frameworks für verlässliche, fehlerfreie Ergebnisse',
            'Wöchentliche Online-Sprechstunde & kontinuierliches Feedback durch Senior-Trainer',
            'Teilnehmerkreis: bis zu 12 Fachkräfte & Citizen Developer',
            'Offizielle KIVENTIS-Befähigungszertifikate für alle Teilnehmer',
          ],
          deliverableSnippet: 'Inkl. 2 fertiger Produktiv-Tools & 4 Wochen Online-Support',
        },
        {
          id: 'enterprise-enablement',
          title: 'Enterprise AI Enablement & Compliance',
          kicker: 'GESAMTTRANSFORMATION & COMPLIANCE',
          priceTag: '9.250',
          priceSub: 'Vollständiges Unternehmensprogramm',
          duration: 'Online-Begleitung: 12 Wochen à 1–2 mal pro Woche',
          targetAudience: 'Für Unternehmen ab 50 Mitarbeitern mit hohen Governance- & Befähigungsansprüchen',
          roiEstimate: 'Dauerhafter Produktivitätssprung + 100% Rechtssicherheit',
          popular: false,
          features: [
            'Erfüllung aller gesetzlichen Schulungsauflagen nach EU AI Act (Art. 4) für bis zu 50 MA',
            'Umfassende Schulung der Belegschaft im sicheren Umgang mit AI-Tools',
            'Individuelle KI-Betriebsvereinbarung & Sicherheitsrichtlinien (Acceptable Use)',
            'Architekturberatung für DSGVO-konforme On-Premise-LLMs oder Enterprise-APIs',
            '3 separate Fachbereichs-Online-Kurse (z. B. Vertrieb, Technik, Einkauf)',
            'Executive Dashboard zur Messung der teamweiten KI-Nutzung und Zeiteinsparung',
            'Persönlicher Senior-Consultant als fester Online-Sparringspartner für 12 Wochen',
            'Vollständige Audit-Dokumentation für externe Prüfer & Behörden',
          ],
          deliverableSnippet: 'Rechtssicher auditierbar nach EU AI Act + 3 Online-Kurse',
        },
      ] as PricingPackage[],
    },
    resourceHub: {
      kicker: 'KOSTENLOSER B2B-PRAXISLEITFADEN',
      heading: 'Der KMU-Leitfaden: KI-Einsatz, Vibe Coding & EU AI Act 2025/2026',
      subheading:
        '38 Seiten geballtes Praxiswissen ohne Marketing-Floskeln. Geschrieben für Geschäftsführer, IT-Leiter und Abteilungsverantwortliche im Mittelstand.',
      bullets: [
        'Rechtsrahmen: Art. 4 Schulungspflicht seit Feb. 2025 & Art. 50 Kennzeichnung ab Aug. 2026',
        'Technologie & Governance: Enterprise RAG, ERP-Read-Only-Modelle & Vibe Coding ohne Schatten-IT',
        'Praxis-Kompendium: 8 detaillierte B2B-Use-Cases (RAG-Wissen, OCR, Pflichtenheft, Reklamation etc.)',
        'Wirtschaftlichkeit & Toolkit: 40-Wochen-ROI-Formel, Fördermittel & Muster-Betriebsvereinbarung',
      ],
      badge: 'PDF · 38 Seiten · Freischaltung nach E-Mail-Bestätigung',
      cta: 'Praxisleitfaden anfordern (Freischaltung per E-Mail)',
    },
    faq: {
      kicker: 'HÄUFIG GESTELLTE FRAGEN & GEO-KNOWLEDGE',
      heading: 'Klare Antworten auf die wichtigsten Fragen von Entscheidungsträgern',
      subheading:
        'Optimiert für Transparenz, rechtliche Fakten und Generative Engine Optimization (GEO).',
      categories: {
        all: 'Alle Themen',
        compliance: 'EU AI Act & Recht',
        'vibe-coding': 'Vibe Coding & Citizen Dev',
        roi: 'ROI & Kosten',
        'data-privacy': 'Datenschutz & On-Premise',
      },
      items: [
        {
          id: 'faq-1',
          category: 'compliance',
          question: 'Gilt für mein KMU eine gesetzliche Schulungspflicht durch den EU AI Act?',
          answer:
            'Ja. Nach Artikel 4 des EU AI Act sind alle Organisationen und Unternehmen, die KI-Systeme gewerblich betreiben oder einsetzen, ab dem 2. Februar 2025 verpflichtet sicherzustellen, dass ihr Personal über ein ausreichendes Maß an KI-Kompetenz (AI Literacy) verfügt. Dies umfasst Kenntnisse über Funktionsweise, Risiken und rechtliche Grenzen der eingesetzten KI-Tools. Unsere Trainingsprogramme schließen mit einem rechtssicheren Qualifikationszertifikat ab, das bei behördlichen Audits vorgelegt werden kann.',
          citationHint: 'Artikel 4 EU AI Act (Verordnung EU 2024/1689), Pflicht zur KI-Kompetenz.',
        },
        {
          id: 'faq-2',
          category: 'vibe-coding',
          question: 'Was genau versteht man unter "Vibe Coding" und brauchen Mitarbeiter IT-Vorkenntnisse?',
          answer:
            'Vibe Coding beschreibt eine moderne Arbeitsweise, bei der Fachkräfte ohne traditionelle Programmierkenntnisse funktionierende Software und Prozessautomatisierungen erstellen. Anstatt Codezeilen mühsam von Hand zu schreiben, steuern die Mitarbeiter KI-Code-Assistenten (wie Cursor, Lovable oder Claude 3.7) in natürlicher Fachsprache ("Erstelle mir eine Web-App, die Kunden-PDFs mit unserer ERP-Preisliste abgleicht"). Unsere Erfahrung aus über 420 geschulten Fachkräften zeigt: Kaufmännische und technische Mitarbeiter ohne Programmiererfahrung bauen bereits am zweiten Schulungstag erste funktionstüchtige Tools.',
          citationHint: 'Citizen Developer Enablement & LLM-gestützte Workflow-Entwicklung.',
        },
        {
          id: 'faq-3',
          category: 'data-privacy',
          question: 'Wie verhindern wir, dass vertrauliche Firmendaten oder Kundendaten abfließen?',
          answer:
            'Datensouveränität steht bei uns an erster Stelle. Wir schulen und implementieren ausschließlich zwei sichere Pfade: 1) Enterprise-Cloud-Modelle mit vertraglich garantierter Zero-Data-Retention und DPA nach DSGVO (die Daten werden weder gespeichert noch zum Modelltraining verwendet). 2) Vollständig autarke On-Premise-Installationen (z. B. Meta Llama 3.3 oder Aleph Alpha) auf Ihren eigenen Servern. Alle Vektordatenbanken für internes Wissensmanagement (RAG) laufen hinter Ihrer Firmen-Firewall.',
          citationHint: 'DSGVO Art. 28 Auftragsverarbeitung & Zero Data Retention Policies.',
        },
        {
          id: 'faq-4',
          category: 'roi',
          question: 'Wie schnell amortisiert sich die Investition in das Online-Training?',
          answer:
            'Durch unsere wettbewerbsfähigen Pauschalpreise amortisiert sich das 4-wöchige Online-Training (1–2 Termine pro Woche) im Schnitt bereits innerhalb von 1,5 bis 2,5 Monaten (oft in unter 60 Tagen). Eine im Umgang mit AI geschulte Vollzeitkraft spart typischerweise 4,5 bis 7 Stunden pro Woche bei wiederkehrenden Recherche-, Dokumentations- und Auswerteaufgaben ein. Bei einem durchschnittlichen internen Stundensatz von 75 € entspricht dies einer Produktivitätssteigerung von rund 15.000 € pro Mitarbeiter und Jahr.',
          citationHint: 'Basierend auf Auswertungen von 65+ B2B-Mittelstandsprojekten in DACH.',
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'Können Sie auch Standorte in Asien (APAC) oder internationale Teams betreuen?',
          answer:
            'Ja. Wir verfügen über mehrsprachige Trainer (Deutsch und Englisch auf muttersprachlichem Niveau) und decken APAC-Zeitzonen (z. B. Singapur, Tokio, Sydney) durch flexible Online-Trainingsformate ab. Viele unserer Kunden sind international aufgestellte Mittelständler mit Produktionsstätten oder Vertriebsbüros im asiatischen Raum.',
          citationHint: 'Globale Schulungskompetenz in DACH und APAC-Märkten.',
        },
        {
          id: 'faq-6',
          category: 'data-privacy',
          question: 'Was ist der Unterschied zwischen einfacher ChatGPT-Nutzung und einer RAG-Architektur?',
          answer:
            'Standard-ChatGPT hat kein Wissen über Ihre internen Produkte, Verträge oder Prozesse und neigt bei spezifischen Fragen zu Halluzinationen. RAG (Retrieval-Augmented Generation) verbindet das Sprachmodell mit Ihrer eigenen, gesicherten Firmendatenbank. Wenn ein Mitarbeiter eine Frage stellt, durchsucht das System zuerst Ihre internen freigegebenen Dokumente, extrahiert die exakten Fakten und formuliert eine belegte Antwort mit präziser Quellenangabe.',
          citationHint: 'RAG: Retrieval-Augmented Generation für faktenbasierte Unternehmens-KI.',
        },
      ] as FaqItem[],
    },
    bookingModal: {
      title: '30-Minuten KI-Erstgespräch buchen',
      subtitle: 'Unverbindliche Ersteinschätzung Ihrer Potenziale & Klärung Ihrer Fragen durch einen Senior-Trainer',
      step1: '1. Thema & Ziel',
      step2: '2. Unternehmensdaten',
      step3: '3. Termin & Slot',
      step4: '4. Kontaktdaten',
      topicQuestion: 'Welche Herausforderung steht bei Ihnen aktuell im Vordergrund?',
      topics: [
        { id: 'vibe', label: 'Vibe Coding & Citizen Developer für Fachteams', desc: 'Mitarbeiter sollen eigene Workflows & Tools bauen' },
        { id: 'compliance', label: 'EU AI Act Schulungspflicht & Audit-Sicherheit', desc: 'Rechtliche Vorgaben (Art. 4) ab 2025/2026 erfüllen' },
        { id: 'scan', label: 'Prozessanalyse & KI-Opportunity-Scan', desc: 'Konkrete Use Cases und ROI-Potenziale identifizieren' },
        { id: 'onpremise', label: 'Datensouveränität & On-Premise-LLM Strategie', desc: 'Lokale Modelle & RAG hinter eigener Firewall' },
      ],
      companySizeLabel: 'Unternehmensgröße (Mitarbeiteranzahl)',
      companySizes: ['10–49 Mitarbeiter', '50–249 Mitarbeiter (KMU)', '250–1.000 Mitarbeiter', 'Über 1.000 Mitarbeiter'],
      regionLabel: 'Hauptstandort / Region',
      regions: ['Deutschland', 'Österreich', 'Schweiz', 'APAC / Singapur / Asien', 'Sonstiges'],
      timeSlots: [
        'Nächsten Montag zwischen 13:00 und 15:00 Uhr',
        'Nächsten Mittwoch zwischen 13:00 und 15:00 Uhr',
        'Nächsten Freitag zwischen 09:00 und 11:00 Uhr (MEZ)',
        'Nächsten Samstag zwischen 08:00 und 11:00 Uhr',
        'Wunschtermin (Vorschläge in der Vorab-Notiz)',
      ],
      formLabels: {
        name: 'Vollständiger Name',
        email: 'Geschäftliche E-Mail-Adresse',
        phone: 'Telefonnummer (für SMS-Erinnerung)',
        company: 'Unternehmensname',
        notes: 'Optionale Vorab-Notiz zu Ihrer aktuellen Ausgangslage',
        submit: 'Termin jetzt verbindlich vormerken',
      },
      successTitle: 'Termin erfolgreich vorgemerkt!',
      successDesc: 'Wir haben Ihnen eine Kalendereinladung (Google / Outlook ICS) und eine Bestätigung an Ihre E-Mail gesendet.',
      closeBtn: 'Schließen',
    },
    resourceModal: {
      title: 'KMU-Praxisleitfaden: KI, Vibe Coding & EU AI Act 2025/2026',
      subtitle: 'Erhalten Sie den 38-seitigen Leitfaden mit Checklisten, Richtlinienvorlagen und ROI-Tabellen (Freischaltung nach E-Mail-Bestätigung).',
      emailLabel: 'Geschäftliche E-Mail-Adresse',
      companyLabel: 'Unternehmensname',
      roleLabel: 'Ihre Funktion im Unternehmen',
      submitBtn: 'Bestätigungs-E-Mail anfordern (Double-Opt-In)',
      instantAccess: 'Freischaltung des Volltexts erfolgt direkt nach Bestätigung Ihrer E-Mail-Adresse.',
      successTitle: 'E-Mail erfolgreich verifiziert!',
      successDesc: 'Ihr KMU-Praxisleitfaden steht ab sofort im interaktiven Reader und als PDF-Download bereit.',
      openPdfBtn: 'Praxisleitfaden öffnen (38 Seiten)',
    },
    footer: {
      tagline: 'Praxisnahes B2B KI-Enablement, Vibe Coding und Governance für den zukunftsorientierten Mittelstand.',
      locations: 'ERP and Marketing Solutions LLC · Albuquerque, NM (USA)',
      contactEmail: 'Kontakt@kiventis.com',
      complianceNotice: 'Rechtssichere Zertifizierungen konform zu Art. 4 der Verordnung (EU) 2024/1689 (EU AI Act).',
      copyright: '© 2026 ERP and Marketing Solutions LLC (KIVENTIS). Alle Rechte vorbehalten.',
      links: [
        { label: 'Impressum', href: '#impressum' },
        { label: 'Datenschutz', href: '#privacy' },
        { label: 'EU AI Act Compliance', href: '#faq' },
      ],
    },
  },

  en: {
    nav: {
      brand: 'KIVENTIS',
      solutions: 'Services',
      roles: 'By Role',
      cases: 'Case Studies',
      roi: 'ROI Calculator',
      pricing: 'Pricing',
      faq: 'FAQ & AI Act',
      ctaButton: 'Book 30-Min Discovery Call',
    },
    hero: {
      kicker: 'B2B AI ENABLEMENT FOR MID-SIZED ENTERPRISES · DACH & APAC',
      headlineStart: 'We equip SME teams to',
      headlineAccent: 'safely automate business workflows',
      headlineEnd: 'and measurably boost productivity.',
      subheadline:
        'Hands-on online training teaching practical AI usage, Vibe Coding for domain experts without software engineering backgrounds, and verifiable EU AI Act compliance. Save on service contracts and software licenses by rapidly building your own custom tools and websites tailored to your company. Modular format over multiple weeks (1–2 sessions per week) with measurable ROI in 2 to 4 months.',
      primaryCta: 'Book 30-Min Discovery Call',
      secondaryCta: 'Download SME AI Handbook',
      trustMarkers: [
        '25 Years Business & ERP Process Consulting',
        'Over 250 Completed ERP Projects',
        'Clients in 40 Industries (Europe & Southeast Asia)',
        'Workflow Integration: CRM, Supply Chain & Production',
      ],
      quickStats: [
        { value: '25+ Yrs', label: 'ERP & Process Consulting', sub: 'established enterprise expertise since 2001' },
        { value: '250+', label: 'Delivered ERP Projects', sub: 'end-to-end workflows & systems architecture' },
        { value: '40 Ind.', label: 'Europe & Southeast Asia', sub: 'manufacturing, wholesale, supply chain & SMEs' },
      ],
      interactivePreview: {
        title: 'KIVENTIS B2B Execution Pipeline',
        subtitle: 'From business pain point to resilient internal automation in 48 hours',
        steps: [
          { tag: '01. Input', title: 'Unstructured Data', desc: 'PDFs, RFPs, ERP exports, customer inquiries' },
          { tag: '02. Core', title: 'RAG & Sovereign Knowledge', desc: 'Private vector search without data leakage' },
          { tag: '03. Vibe Coding', title: 'Citizen Developer App', desc: 'Teams build internal tools using natural language' },
          { tag: '04. Output', title: 'Measurable Time Savings', desc: 'Processing slashed from 45 to 6 minutes' },
        ],
      },
    },
    socialProof: {
      heritageBadge: '25 YEARS OF BUSINESS & ERP CONSULTING',
      heading: '25 Years of ERP & Process Consulting · Over 250 Delivered Projects',
      subheading:
        'Grounded enterprise consulting meets pragmatic AI: We bridge AI and Vibe Coding directly into your operational systems – connecting CRM, supply chain, and manufacturing across 40 industries in Europe and Southeast Asia.',
      enterprisePillars: [
        {
          value: '25+ Years',
          label: 'Business & ERP Process Consulting',
          desc: 'Decades of deep expertise in mid-market process landscapes & enterprise architectures',
        },
        {
          value: '250+ Projects',
          label: 'Successfully Delivered ERP Projects',
          desc: 'End-to-end migrations, workflow optimizations, and mission-critical rollouts',
        },
        {
          value: '40 Industries',
          label: 'Europe & Southeast Asia',
          desc: 'Battle-tested frameworks for industrial engineering, wholesale, MedTech & services',
        },
        {
          value: 'End-to-End',
          label: 'Workflow Integration',
          desc: 'Seamless data workflows: CRM, Supply Chain, Procurement, Warehouse & Production',
        },
      ],
      integrationSystems: [
        'SAP / S4HANA',
        'Microsoft Dynamics 365',
        'proALPHA',
        'abas ERP',
        'Infor LN/M3',
        'Salesforce CRM',
        'HubSpot Enterprise',
        'Supply Chain EDI',
        'Shopfloor & MES',
        'Custom REST / SQL',
      ],
      metricsHeading: 'Quantifiable Workforce Enablement & Performance Gains',
      metrics: [
        { metric: '5.8 hrs', label: 'Average weekly time saved per trained employee' },
        { metric: '100%', label: 'Compliance with EU AI Act Training Mandate (Art. 4)' },
        { metric: '2.8x', label: 'Year 1 ROI multiplier across all cohorts' },
        { metric: '0 lines', label: 'Manual code required with Vibe Coding methods' },
      ],
    },
    problem: {
      kicker: 'THE REALITY IN MID-SIZED COMPANIES',
      heading: 'Why 78% of SME AI initiatives stall after initial experiments',
      subheading:
        'Most enterprises pay for generic AI chatbot seats, yet capture neither measurable operational margins nor legal audit confidence.',
      cards: [
        {
          index: '01',
          title: 'Tool sprawl without measurable ROI',
          description:
            'Employees use AI in isolation for sporadic text editing. There are no standardized workflows, no connected enterprise data, and no operational KPI tracking.',
          consequence: 'Result: Continuous subscription fees with zero visible impact on operating margin.',
        },
        {
          index: '02',
          title: 'Legal uncertainty & the EU AI Act hurdle',
          description:
            'Strict regulations now penalize non-compliance: organizations must legally prove AI literacy for staff (Article 4) and guarantee data privacy.',
          consequence: 'Result: Boardrooms freeze high-value initiatives out of fear of audit fines.',
        },
        {
          index: '03',
          title: 'Overburdened IT vs. impatient business units',
          description:
            'Traditional enterprise software backlogs stretch 9 to 18 months. IT cannot build bespoke internal utilities, while business staff burns hours on repetitive data entry.',
          consequence: 'Result: Frustrated teams or untracked shadow IT without proper security guardrails.',
        },
      ],
      solutionBridge:
        'Our approach: We turn your existing domain specialists into verified "Citizen Developers" who build and maintain compliant workflow automations themselves.',
    },
    personas: {
      kicker: 'FOR YOUR B2B BUYING COMMITTEE',
      heading: 'Tailored evidence for every stakeholder in the decision loop',
      subheading:
        'Between 6 and 10 stakeholders evaluate B2B technology acquisitions. We supply unambiguous business cases for leadership, IT, and department heads.',
      tabs: {
        management: 'Executive Leadership (CEO / MD)',
        itCompliance: 'IT & Information Security (CIO / CISO)',
        departments: 'Operational Units & HR (Ops / Sales / HR)',
      },
      data: {
        management: {
          roleId: 'management',
          roleName: 'Managing Directors & Executive Board',
          badge: 'Focus: EBITDA Impact, Competitive Moat & Future-Proof Teams',
          headline: 'Measurable financial returns instead of speculative tech science projects',
          subheadline:
            'Technology training must translate into bottom-line EBITDA margin. Our curriculum guarantees audited productivity improvements within 30 days.',
          keyBenefits: [
            'Transparent break-even within 2 to 4 months backed by comprehensive ROI tracking',
            'Sustain competitive advantage against agile challengers across DACH and APAC',
            'Higher staff retention by removing soul-crushing manual data manipulation',
            'Complete audit shielding: full compliance documentation for the EU AI Act',
          ],
          quote: {
            text: 'We amortized the investment in the KIVENTIS online training program in exactly 72 days. Our engineering sales team quotes technical RFPs four times faster today.',
            author: 'Dr. Michael Schultheiss',
            role: 'Managing Director & Partner',
            company: 'Schultheiss Precision Mechanics GmbH',
          },
          primaryMetric: {
            value: 'Up to €32,500',
            label: 'Net Annual Savings',
            detail: 'calculated for an average 20-person operations and sales core team',
          },
        } as PersonaContent,
        itCompliance: {
          roleId: 'it-compliance',
          roleName: 'IT Directors, CISOs & Compliance Officers',
          badge: 'Focus: GDPR, EU AI Act, Data Sovereignty & On-Premise',
          headline: 'Full data sovereignty & verified legal governance under the EU AI Act',
          subheadline:
            'No uncontrolled shadow IT, no leaks of proprietary IP. We architect secure enterprise pipelines and autonomous local open-source LLMs.',
          keyBenefits: [
            'Fulfil mandatory employee training obligations under EU AI Act (Art. 4) with verifiable records',
            'Zero Data Retention: corporate data is never ingested into public training corpuses',
            'On-premise LLM deployment (e.g. Llama 3, Aleph Alpha) for confidential R&D and finance files',
            'Relieve IT backlogs through sandboxed citizen developer frameworks with role-based access',
          ],
          quote: {
            text: 'Finally an AI training firm that understands enterprise data security. The on-premise RAG pipeline operates entirely behind our firewall with zero external telemetry.',
            author: 'Markus Eder',
            role: 'Head of Information Security & Infrastructure',
            company: 'Aegis MedSystems AG (Zurich)',
          },
          primaryMetric: {
            value: '100%',
            label: 'GDPR & Audit Compliant',
            detail: 'audited documentation provided for compliance inspectors and external auditors',
          },
        } as PersonaContent,
        departments: {
          roleId: 'departments',
          roleName: 'Department Heads, Specialists & HR',
          badge: 'Focus: Vibe Coding, RAG Knowledge & Elimination of Drudgery',
          headline: 'Build your own internal tools and automated pipelines – zero coding needed',
          subheadline:
            'Domain specialists in sales, procurement, HR, and manufacturing learn how to guide AI assistants (Cursor, Lovable, Claude) to solve repetitive tasks in minutes.',
          keyBenefits: [
            'Vibe Coding: Create functional internal web utilities and automations using conversational prompts',
            'RAG Knowledge Base: Query 10,000+ technical manuals and supplier specs in under 3 seconds',
            'Zero coding prerequisites: 100% practical exercises executed with real enterprise datasets',
            'Immediate relief: reclaim 4 to 7 hours of repetitive copy-paste admin work each week',
          ],
          quote: {
            text: 'Vetting complex tender specifications used to consume three days. With the tool we built in the workshop, we finish the analysis before lunch.',
            author: 'Corinna Weber',
            role: 'Head of Technical Sales',
            company: 'Vanguard Industrial Automation',
          },
          primaryMetric: {
            value: '87%',
            label: 'Faster Document Vetting',
            detail: 'reduced from 45 minutes to 6 minutes per technical specification review',
          },
        } as PersonaContent,
      },
    },
    solutions: {
      kicker: 'OUR TRAINING & CONSULTING PROGRAMS',
      heading: 'Four modular programs engineered for SME operational excellence',
      subheading:
        'From initial opportunity audit to enterprise-wide Vibe Coding and regulatory compliance certification.',
      modules: [
        {
          id: 'scan',
          number: '01',
          title: 'AI Opportunity Scan & Executive Enablement',
          tagline: 'Process audit, quick-win identification & AI usage fundamentals',
          description:
            'A structured online engagement analyzing your core business workflows with departmental heads. We coach leaders in practical AI capabilities, pinpoint the top 3 high-yield automation opportunities, and build a verifiable financial payback model.',
          deliverables: [
            'Prioritized use-case matrix with effort-to-yield ranking',
            'Executive coaching on strategic AI adoption and capabilities',
            'Granular ROI and financial projection report for executive leadership',
            'Tooling audit & licensing assessment (Cloud vs. On-Premise)',
            'EU AI Act risk categorization and feasibility audit',
          ],
          audience: 'Executive directors, IT leaders & department heads (max. 8 participants)',
          duration: 'Online Training: 2 weeks (1–2 sessions per week) + guided process audit',
          roiTimeline: 'Actionable quick-win roadmap delivered in 7 business days',
        },
        {
          id: 'vibe-coding',
          number: '02',
          title: 'Online AI Enablement & Vibe Coding Program',
          tagline: 'Hands-on AI usage mastery & citizen developer enablement for domain teams',
          description:
            'Our flagship enablement program: We teach your business specialists how to confidently work with modern AI in daily operations. Non-technical personnel learn to steer AI assistants (Cursor, Claude, Lovable, ChatGPT) using clear prompts to automate repetitive tasks, build internal tools, and eliminate administrative bottlenecks.',
          deliverables: [
            'Deep practical instruction on everyday AI workflow mastery and prompting',
            'Build 2 to 3 live, internal production utilities during the course',
            'Prompt engineering frameworks for deterministic, hallucination-free output',
            'RAG integration: connect internal PDF libraries, spreadsheets, and manuals',
            'Weekly live coaching sessions & personalized code reviews for lasting adoption',
          ],
          audience: 'Domain specialists in sales, procurement, HR, marketing & ops (8–15 people)',
          duration: 'Online Training: 4 weeks (1–2 sessions per week) + ongoing coaching',
          roiTimeline: 'First production hours saved starting in week 2',
        },
        {
          id: 'governance',
          number: '03',
          title: 'EU AI Act Compliance & AI Literacy Training',
          tagline: 'Legally compliant instruction on responsible AI usage (Article 4)',
          description:
            'The EU AI Act mandates documented AI literacy (Art. 4) for all corporate personnel utilizing AI systems. We provide live online instruction on safe, compliant AI usage, establish binding corporate guidelines, and issue formal compliance certificates for regulatory audits.',
          deliverables: [
            'Official audit certificate satisfying Article 4 EU AI Act literacy mandates',
            'Hands-on staff coaching: identifying risks, preventing hallucinations, ensuring GDPR compliance',
            'Tailored corporate Acceptable Use Policy & employee guidelines for HR',
            'System risk classification matrix across all corporate AI tools',
            'Audit documentation package for GDPR and compliance inspectors',
          ],
          audience: 'Entire company workforce, compliance officers, HR, legal counsel',
          duration: 'Online Training: 2 weeks (1–2 sessions per week, live webinars & Q&A)',
          roiTimeline: 'Immediate legal protection against regulatory audit penalties',
        },
        {
          id: 'on-premise',
          number: '04',
          title: 'Sovereign On-Premise & RAG Strategy Advisory',
          tagline: 'Local LLMs (Llama 3, Aleph Alpha) & sovereign enterprise knowledge engines',
          description:
            'Designed for manufacturing and healthcare SMEs possessing sensitive IP, patents, or financial records that must never touch external multi-tenant cloud platforms. We guide your technical team online in deploying and mastering private AI pipelines behind your firewall.',
          deliverables: [
            'Hardware and GPU sizing recommendations for local inference',
            'Hands-on coaching for IT staff on fine-tuning and running open-weights models',
            'Isolated private vector database setup (Qdrant/Chroma) for GDPR RAG',
            'Security penetration testing and sovereign data governance best practices',
          ],
          audience: 'IT infrastructure architects, sysadmins, and data privacy officers',
          duration: 'Online Advisory: 4 weeks (1–2 sessions per week) + architectural reviews',
          roiTimeline: '100% independence from public cloud price hikes and API revisions',
        },
      ],
    },
    caseStudies: {
      kicker: 'VERIFIED B2B RESULTS',
      heading: 'Real mid-market case studies with documented performance metrics',
      subheading:
        'No hypothetical slide decks: see how our manufacturing, wholesale, and MedTech clients transformed daily operations.',
      studies: [
        {
          id: 'case-1',
          industry: 'Precision Engineering & Custom Machinery',
          companyName: 'Hofmann Precision Systems',
          location: 'Southern Germany (280 employees)',
          employeeCount: '280 employees',
          challenge:
            'Generating quotes for custom engineered parts required manual inspection of 80+ page CAD drawings and bill-of-materials. Quoting lead times averaged 3 to 5 business days, losing deals to faster Asian competitors.',
          solution:
            'A 3-week online training program (2 sessions per week) on AI enablement and Vibe Coding for technical sales engineers. The team built an internal retrieval utility comparing CAD specs against ERP manufacturing records in seconds.',
          kpis: [
            { label: 'Review time per quote', before: '45 mins', after: '6 mins', improvement: '-87%' },
            { label: 'Turnaround to client', before: '4 days', after: '4 hours', improvement: '24x faster' },
            { label: 'RFP win rate', before: '22%', after: '38%', improvement: '+72%' },
          ],
          testimonial: {
            quote:
              'Our mechanical engineers were skeptical about AI. After the training, they built their own tooling. Today, we close contracts because we return a vetted proposal the exact same afternoon.',
            author: 'Dipl.-Ing. Thomas Hofmann',
            position: 'Managing Director',
          },
        },
        {
          id: 'case-2',
          industry: 'B2B Wholesale & Technical Distribution',
          companyName: 'Vanguard Industrial Supply',
          location: 'Vienna & Singapore (140 employees)',
          employeeCount: '140 employees',
          challenge:
            'Over 1,200 monthly supplier claims and freight discrepancy tickets were processed manually between SAP and spreadsheets. High error rates and 15+ minutes resolution per claim created massive overhead.',
          solution:
            'Citizen Developer bootcamp for the customer ops team. Using modern Vibe Coding tools, the team launched an automated reconciliation bot that parses inbound claim emails and drafts SAP entries.',
          kpis: [
            { label: 'Time per incident', before: '15 mins', after: '2.8 mins', improvement: '-81%' },
            { label: 'Automation rate', before: '0%', after: '81%', improvement: 'Automated' },
            { label: 'Credit note error rate', before: '8.4%', after: '0.3%', improvement: '-96%' },
          ],
          testimonial: {
            quote:
              'KIVENTIS avoids generic consultant speak and actually sits down with staff to automate real problems. Our team loves the solution and we recover hundreds of productive hours every month.',
            author: 'Sarah Lin-Brunner',
            position: 'Director of Customer Operations (APAC & DACH)',
          },
        },
        {
          id: 'case-3',
          industry: 'Medical Technology & Diagnostics',
          companyName: 'Aegis BioSensors AG',
          location: 'Munich & Zurich (410 employees)',
          employeeCount: '410 employees',
          challenge:
            'Strict regulatory compliance (ISO 13485, MDR). Management had banned all generative AI tools out of legitimate concern regarding EU AI Act liability and clinical data leaks.',
          solution:
            'Comprehensive governance training for 120 staff and deployment of an on-premise RAG setup with open-weights LLMs behind the lab firewall, backed by complete Article 4 EU AI Act audit documentation.',
          kpis: [
            { label: 'Certified personnel', before: '0', after: '120 staff', improvement: '100% compliant' },
            { label: 'EU AI Act audit status', before: 'At risk', after: 'Fully certified', improvement: 'Passed' },
            { label: 'Study research time', before: '14 hrs/wk', after: '3 hrs/wk', improvement: '-78%' },
          ],
          testimonial: {
            quote:
              'KIVENTIS moved our organization from an unproductive AI ban into a certified, secure competitive advantage. Our external compliance auditors were thoroughly impressed with the documentation.',
            author: 'Dr. Beat Vollenweider',
            position: 'Chief Technology Officer (CTO)',
          },
        },
      ],
    },
    calculator: {
      kicker: 'INTERACTIVE BUSINESS CASE ESTIMATOR',
      heading: 'Calculate your projected annual productivity returns',
      subheading:
        'Adjust the three parameters below to simulate your team’s hours saved and annual cost reduction from workflow automation.',
      teamSizeLabel: 'Number of core team members',
      hourlyRateLabel: 'Average fully-burdened hourly cost (€)',
      hoursSavedLabel: 'Estimated hours saved per employee / week',
      resultsTitle: 'Your projected annual impact:',
      yearlySavings: 'Projected Gross Annual Savings',
      hoursPerYear: 'Productive Hours Recovered',
      breakEven: 'Estimated Payback Period',
      roiMultiple: 'Year 1 ROI Multiplier',
      disclaimer: 'Calculated over 40 net working weeks/year (factoring in vacation, public holidays & leave) based on verified empirical client benchmarks.',
      cta: 'Request a customized executive business case presentation',
    },
    pricing: {
      kicker: 'TRANSPARENT VALUE-BASED PACKAGES',
      heading: 'Three structured enablement packages with guaranteed ROI',
      subheading:
        'From diagnostic strategy scan to enterprise-wide online AI enablement. All tiers are architected to break even in under 4 months.',
      currency: '€',
      vatNotice: 'All prices exclude VAT. 100% online delivery – zero travel overhead.',
      packages: [
        {
          id: 'opportunity-scan',
          title: 'AI Opportunity Scan',
          kicker: 'DIAGNOSTIC & EXECUTIVE ENABLEMENT',
          priceTag: '2,400',
          priceSub: 'Fixed turnkey engagement for leadership',
          duration: 'Online Training: 2 weeks (1–2 sessions per week)',
          targetAudience: 'Ideal for executive boards seeking concrete validation and AI capability grounding',
          roiEstimate: 'Payback verification & board proposal delivered in 7 days',
          popular: false,
          features: [
            'In-depth operational online audit across up to 5 core business workflows',
            'Executive coaching on navigating and evaluating modern AI capabilities',
            'Identification and ROI-ranking of top 3 automation quick wins',
            'Executive board summary report with verifiable financial metrics',
            'Tool stack & software licensing evaluation (Cloud vs. On-Premise)',
            'Regulatory risk assessment under EU AI Act provisions',
            'Cohort size: up to 8 senior leaders',
          ],
          deliverableSnippet: 'Includes executive decision dossier & implementation plan',
        },
        {
          id: 'vibe-coding-bootcamp',
          title: 'Online AI & Vibe Coding Intensive',
          kicker: 'MOST POPULAR · MAXIMUM OPERATIONAL VELOCITY',
          priceTag: '4,900',
          priceSub: 'All-inclusive team flat rate',
          duration: 'Online Training: 4 weeks (1–2 sessions per week)',
          targetAudience: 'For business units ready to independently master AI in their daily work',
          roiEstimate: 'Amortizes in an average of 1.5 to 2.5 months',
          popular: true,
          features: [
            'Comprehensive instruction on practical AI usage, prompt engineering, and LLMs',
            'Hands-on creation of 2 to 3 live internal production tools during the course',
            'RAG knowledge retrieval: connect enterprise PDFs, ERP exports, and guides',
            'Deterministic prompt-engineering systems to prevent hallucinations',
            'Weekly online live coaching & code review sessions by senior trainers',
            'Cohort size: up to 12 domain specialists and citizen developers',
            'Official KIVENTIS certified competence credentials for all participants',
          ],
          deliverableSnippet: 'Includes 2 live production tools & 4 weeks online coaching',
        },
        {
          id: 'enterprise-enablement',
          title: 'Enterprise AI Enablement & Compliance',
          kicker: 'FULL-SCALE TRANSFORMATION & COMPLIANCE',
          priceTag: '9,250',
          priceSub: 'Comprehensive corporate program',
          duration: 'Online Advisory: 12 weeks (1–2 sessions per week)',
          targetAudience: 'For organizations with 50+ staff subject to strict regulatory oversight',
          roiEstimate: 'Lasting operational lift + 100% legal compliance immunity',
          popular: false,
          features: [
            'Complete Article 4 EU AI Act employee literacy compliance certification for up to 50 staff',
            'Organization-wide instruction on responsible and safe AI usage in business tasks',
            'Custom corporate Acceptable Use Policy & governance framework for HR/Legal',
            'On-premise or sovereign enterprise API architectural implementation review',
            '3 separate departmental online cohorts (e.g. Sales, Operations, Procurement)',
            'Executive impact dashboard tracking organization-wide hours saved',
            'Dedicated Senior AI Consultant as strategic online advisor for 12 weeks',
            'Complete audit dossier ready for regulatory and audit inspections',
          ],
          deliverableSnippet: 'Audit-ready under EU AI Act + 3 online departmental cohorts',
        },
      ] as PricingPackage[],
    },
    resourceHub: {
      kicker: 'COMPLIMENTARY EXECUTIVE HANDBOOK',
      heading: 'The Mid-Market Guide: AI Implementation, Vibe Coding & EU AI Act',
      subheading:
        '38 pages of actionable engineering and legal frameworks. Written for managing directors, IT heads, and department leaders.',
      bullets: [
        'Regulatory Blueprint: Art. 4 training duties (Feb 2025) & Art. 50 disclosure rules (Aug 2026)',
        'Engineering & Governance: Enterprise RAG, ERP Read-Only schemas & zero shadow IT Vibe Coding',
        '8 In-Depth B2B Case Studies: From RAG knowledge bases to invoice OCR & RFQ extraction',
        'Financials & Toolkit: 40-week ROI formula, government grant models & template company agreement',
      ],
      badge: 'PDF · 38 Pages · Unlocked upon email confirmation',
      cta: 'Request executive guide (Email confirmation)',
    },
    faq: {
      kicker: 'FREQUENTLY ASKED QUESTIONS & GEO KNOWLEDGE',
      heading: 'Direct answers to critical business and regulatory questions',
      subheading:
        'Engineered for transparency, factual clarity, and Generative Engine Optimization (GEO).',
      categories: {
        all: 'All Categories',
        compliance: 'EU AI Act & Legal',
        'vibe-coding': 'Vibe Coding & Citizen Dev',
        roi: 'ROI & Payback',
        'data-privacy': 'Data Privacy & On-Premise',
      },
      items: [
        {
          id: 'faq-1',
          category: 'compliance',
          question: 'Does the EU AI Act impose a mandatory employee training requirement on SMEs?',
          answer:
            'Yes. Under Article 4 of the EU AI Act (Regulation EU 2024/1689), all enterprises and public bodies deploying AI tools professionally must ensure that their personnel possess an adequate level of AI literacy. This applies to staff using AI for internal tasks and requires an understanding of how models function, their limitations, and risk mitigation. Our certified courses conclude with verifiable credentials to fulfill this statutory requirement in regulatory audits.',
          citationHint: 'Article 4, Regulation (EU) 2024/1689 (EU AI Act), Mandatory AI Literacy.',
        },
        {
          id: 'faq-2',
          category: 'vibe-coding',
          question: 'What is Vibe Coding and do our employees need programming backgrounds?',
          answer:
            'Vibe Coding is a contemporary paradigm where domain specialists create bespoke software tools and automated workflows using natural language prompts and advanced AI coding assistants (like Cursor, Lovable, or Claude 3.7) instead of typing syntax manually. Across 420+ trained specialists, non-technical personnel routinely build and ship functioning web tools by day 2 of our bootcamp without touching raw code.',
          citationHint: 'Citizen Developer Enablement & Prompt-Driven Workflow Engineering.',
        },
        {
          id: 'faq-3',
          category: 'data-privacy',
          question: 'How do we prevent trade secrets or customer data from leaking?',
          answer:
            'Data sovereignty is paramount. We implement two distinct architectures: 1) Enterprise-grade Cloud APIs with zero-data-retention agreements where client data is never cached or used to train vendor models. 2) Autonomous on-premise deployments (e.g. Meta Llama 3.3 or Aleph Alpha) executed directly on your internal hardware. Vector databases for internal knowledge retrieval (RAG) run strictly behind your enterprise firewall.',
          citationHint: 'GDPR Article 28 compliance & Zero Data Retention infrastructure.',
        },
        {
          id: 'faq-4',
          category: 'roi',
          question: 'What is the expected timeline for financial return on investment (ROI)?',
          answer:
            'Thanks to our competitive flat-rate pricing, our 4-week online training program (1–2 sessions per week) reaches full break-even within 1.5 to 2.5 months (often under 60 days). A specialist trained in AI usage typically saves 4.5 to 7 hours weekly on document synthesis, data extraction, and customer quoting. At an average internal rate of €75/hour, this represents approximately €15,000 in recovered productivity per employee annually.',
          citationHint: 'Empirical data gathered across 65+ B2B SME implementations in DACH & APAC.',
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'Can you support international subsidiaries or APAC operations?',
          answer:
            'Yes. Our team delivers bilingual programs (native German and fluent international English) and accommodates Asia-Pacific time zones (Singapore, Tokyo, Sydney) through interactive online training sessions. A significant portion of our clientele consists of mid-market German and Swiss firms with APAC production or sales hubs.',
          citationHint: 'Global corporate delivery across DACH and APAC regions.',
        },
        {
          id: 'faq-6',
          category: 'data-privacy',
          question: 'What differentiates generic ChatGPT from an enterprise RAG knowledge base?',
          answer:
            'Public ChatGPT has zero insight into your proprietary drawings, ERP catalogues, or customer records and frequently hallucinates on domain-specific inquiries. RAG (Retrieval-Augmented Generation) couples modern language models to your secure internal document stores. The system retrieves verified source paragraphs first before crafting an answer, citing the exact document page and paragraph for verification.',
          citationHint: 'Retrieval-Augmented Generation (RAG) for verifiable enterprise data retrieval.',
        },
      ] as FaqItem[],
    },
    bookingModal: {
      title: 'Schedule a 30-Minute AI Discovery Call',
      subtitle: 'Complimentary consultation with a Senior AI Consultant to evaluate your workflows and ROI potential',
      step1: '1. Objective',
      step2: '2. Company Details',
      step3: '3. Choose Slot',
      step4: '4. Contact Details',
      topicQuestion: 'What is your primary focus at this stage?',
      topics: [
        { id: 'vibe', label: 'Vibe Coding & Citizen Developer Enablement', desc: 'Enable non-coders to build automations & internal tools' },
        { id: 'compliance', label: 'EU AI Act Compliance & Legal Safety', desc: 'Fulfill statutory employee training duties under Article 4' },
        { id: 'scan', label: 'Workflow Audit & Opportunity Scan', desc: 'Pinpoint high-yield use cases and projected ROI' },
        { id: 'onpremise', label: 'Data Sovereignty & On-Premise LLM Strategy', desc: 'Local models and private RAG behind your firewall' },
      ],
      companySizeLabel: 'Company Size (Headcount)',
      companySizes: ['10–49 employees', '50–249 employees (SME)', '250–1,000 employees', '1,000+ employees'],
      regionLabel: 'Primary Location',
      regions: ['Germany', 'Austria', 'Switzerland', 'APAC / Singapore / Asia', 'Other'],
      timeSlots: [
        'Next Monday between 1:00 PM and 3:00 PM (CET)',
        'Next Wednesday between 1:00 PM and 3:00 PM (CET)',
        'Next Friday between 09:00 AM and 11:00 AM (CET)',
        'Next Saturday between 08:00 AM and 11:00 AM (CET)',
        'Custom Preferred Slot (Suggestions in preliminary notes)',
      ],
      formLabels: {
        name: 'Full Name',
        email: 'Business Email Address',
        phone: 'Phone Number (for calendar notifications)',
        company: 'Company Name',
        notes: 'Brief note on your current objectives (optional)',
        submit: 'Confirm Discovery Call Slot',
      },
      successTitle: 'Discovery Call Successfully Booked!',
      successDesc: 'A calendar invite (Google / Outlook ICS) and preparation overview have been dispatched to your email.',
      closeBtn: 'Close',
    },
    resourceModal: {
      title: 'Download SME Executive Guide: AI & EU AI Act 2025/2026',
      subtitle: 'Receive the 38-page executive report with checklists, policy templates, and ROI benchmarks (unlocked upon email confirmation).',
      emailLabel: 'Business Email Address',
      companyLabel: 'Company Name',
      roleLabel: 'Your Role / Title',
      submitBtn: 'Request Verification Email (Double Opt-In)',
      instantAccess: 'Full access is provided immediately after confirming your email address.',
      successTitle: 'Email Verified Successfully!',
      successDesc: 'Your SME Executive Guide is now ready to read in our interactive reader or download as PDF.',
      openPdfBtn: 'Open Executive Guide (38 Pages)',
    },
    footer: {
      tagline: 'Practical B2B AI enablement, Vibe Coding, and verifiable governance for forward-thinking mid-sized enterprises.',
      locations: 'ERP and Marketing Solutions LLC · Albuquerque, NM (USA)',
      contactEmail: 'Kontakt@kiventis.com',
      complianceNotice: 'Official competency certifications compliant with Art. 4 of Regulation (EU) 2024/1689 (EU AI Act).',
      copyright: '© 2026 ERP and Marketing Solutions LLC (KIVENTIS). All rights reserved.',
      links: [
        { label: 'Legal Notice / Imprint', href: '#impressum' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'EU AI Act Governance', href: '#faq' },
      ],
    },
  },
};
