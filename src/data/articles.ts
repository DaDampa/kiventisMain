import { InsightArticle } from '../types';

export const articlesDe: InsightArticle[] = [
  {
    id: 'eu-ai-act-kmu-schulungspflicht-art-4',
    category: 'compliance',
    categoryLabel: 'EU AI Act & Compliance',
    kicker: 'RECHTLICHE RAHMENBEDINGUNGEN 2025/2026',
    title: 'EU AI Act im Mittelstand: Schulungspflicht (Art. 4) & Risikoklassen im Praxis-Check',
    excerpt:
      'Seit dem 2. Februar 2025 gilt für alle Betreiber von KI-Systemen in der EU die gesetzliche Schulungspflicht nach Artikel 4. Erfahren Sie, welche Pflichten KMU treffen, wie Sie Shadow AI verhindern und Audits gelassen begegnen.',
    readTime: '6 Min. Lesezeit',
    publishedDate: 'September 2026',
    author: {
      name: 'Dipl.-Ing. D. Blazinic',
      role: 'Senior Enterprise Architect & KI-Consultant',
    },
    tags: ['EU AI Act', 'Artikel 4 AI Literacy', 'Compliance', 'DSGVO & Governance'],
    citation: 'Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates (EU AI Act), Art. 4, Art. 5 & Anhang III',
    keyTakeaways: [
      'Artikel 4 verpflichtet jeden gewerblichen Betreiber von KI-Werkzeugen (unabhängig von der Mitarbeiterzahl), dass Beschäftigte über nachweisbare KI-Kompetenz verfügen.',
      'Unkontrolliertes Copy-Paste sensibler Kunden- oder Konstruktionsdaten in öffentliche Consumer-Modelle stellt ein akutes DSGVO- und Haftungsrisiko dar.',
      'Die Einstufung als Hochrisikosystem (Anhang III) droht primär bei KI-Einsatz im Personalwesen (Recruiting, Leistungsüberwachung) oder kritischer Infrastruktur.',
      'Mit modularen Inhouse-Schulungen, klaren Betriebsvereinbarungen und Zero-Retention-APIs erfüllen KMU die Anforderungen nachweisbar.',
    ],
    sections: [
      {
        heading: '1. Der EU AI Act Stufenplan: Was gilt wann?',
        paragraphs: [
          'Die europäische KI-Verordnung (EU AI Act, Verordnung (EU) 2024/1689) ist das weltweit erste umfassende Gesetzeswerk zur Regulierung von künstlicher Intelligenz. Während die Medien oft über Milliardenstrafen für Tech-Konzerne berichten, übersehen viele mittelständische Geschäftsführer, dass wesentliche Pflichten bereits 2025 und 2026 in Kraft treten.',
          'Der Stufenplan gliedert sich in vier zentrale Meilensteine: Seit dem 2. Februar 2025 sind unzulässige KI-Praktiken (Art. 5) strikt untersagt und die systematische Schulungspflicht zur KI-Kompetenz (Art. 4 AI Literacy) ist bereits rechtsverbindlich in Kraft. Ab dem 2. August 2025 greifen die Bestimmungen für General-Purpose-AI-Modelle (GPAI). Ab August 2026 greifen die vollumfänglichen Dokumentations-, Risikomanagement- und CE-Kennzeichnungspflichten für Hochrisikosysteme gemäß Anhang III.',
        ],
        callout:
          'Wichtig für Geschäftsführer: Die Schulungspflicht (Artikel 4) unterscheidet nicht zwischen Großkonzernen und Handwerksbetrieben. Wer seinen Mitarbeitern Copilots, ChatGPT oder generative Tools zur Verfügung stellt, muss nachweisen können, dass diese geschult wurden.',
      },
      {
        heading: '2. Artikel 4: Die oft übersehene „AI Literacy“-Pflicht',
        paragraphs: [
          'Artikel 4 des EU AI Act besagt unmissverständlich: Bereitsteller und Betreiber von KI-Systemen müssen Maßnahmen ergreifen, um nach besten Kräften sicherzustellen, dass ihr Personal über ein ausreichendes Maß an KI-Kompetenz verfügt. Dies muss unter Berücksichtigung der technischen Kenntnisse, der Erfahrung, der Ausbildung und des Kontexts der KI-Systeme geschehen.',
          'In der Praxis bedeutet das: Ein bloßer Passus im Arbeitsvertrag oder ein fünfminütiges Informationsblatt genügen bei einer behördlichen Prüfung oder einem Datenschutzvorfall nicht. Unternehmen müssen dokumentieren, wer wann zu welchen Themen (Halluzinationserkennung, Urheberrecht, Datensensibilität, Prompting-Grenzen) geschult wurde.',
        ],
      },
      {
        heading: '3. Shadow AI: Das unsichtbare Risiko im Betriebsalltag',
        paragraphs: [
          'In über 80 % der von uns analysierten Mittelstandsbetriebe nutzen Mitarbeiter bereits KI-Tools – allerdings unreguliert über private Accounts („Shadow AI“). Aus Bequemlichkeit werden Vertriebsangebote, Bilanzen, Quellcode oder juristische Verträge in Browser-Fenster kopiert.',
          'Wird dabei ein kostenloses Consumer-Modell verwendet, fließen diese Daten in den Trainingskorpus der Betreiber ab. Dies verletzt nicht nur die DSGVO (Art. 28 Auftragsverarbeitung), sondern gefährdet Geschäftsgeheimnisse und verstößt gegen die Grundsätze der KI-Verordnung.',
        ],
      },
      {
        heading: '4. Handlungsempfehlung: Der 3-Schritte-Compliance-Fahrplan',
        paragraphs: [
          'Schritt 1 – Inventur & Risikoklassifizierung: Erfassen Sie in einer internen Matrix alle verwendeten KI-Assistenten und stufen Sie diese ein (Minimales Risiko vs. Spezifisches Transparenzrisiko vs. Hochrisiko).',
          'Schritt 2 – Klare Nutzungsrichtlinien & Enterprise-Zugänge: Ersetzen Sie unregulierte Privat-Accounts durch datenschutzkonforme Unternehmens-Lizenzen mit vertraglich garantiertem Zero-Data-Retention.',
          'Schritt 3 – Zertifizierte Mitarbeiterschulung: Führen Sie strukturierte Trainings durch, die nicht nur theoretische Paragrafen behandeln, sondern den konkreten, fehlerfreien Workflow der jeweiligen Fachabteilung festigen.',
        ],
      },
    ],
  },
  {
    id: 'vibe-coding-im-mittelstand-citizen-developer',
    category: 'vibe-coding',
    categoryLabel: 'Vibe Coding & Tooling',
    kicker: 'PRODUKTIVITÄTSREVOLUTION 2026',
    title: 'Vibe Coding im Unternehmen: Wie Fachbereiche interne Tools in 48 Stunden statt 6 Monaten bauen',
    excerpt:
      'Andrej Karpathys Konzept des "Vibe Coding" revolutioniert den Mittelstand: Nicht-technische Fachabteilungen erstellen maßgeschneiderte Webanwendungen und Automatisierungen per natürlicher Sprache – ohne zehntausende Euro für externe Agenturen.',
    readTime: '5 Min. Lesezeit',
    publishedDate: 'September 2026',
    author: {
      name: 'Kiventis Engineering Team',
      role: 'Praxis-Unit Software & Automatisierung',
    },
    tags: ['Vibe Coding', 'Citizen Developer', 'Interne Tools', 'Kostenarbitrage'],
    citation: 'Karpathy Paradigm (2025): Natural Language Specifications and Autonomous Agentic Code Generation in Production',
    keyTakeaways: [
      'Vibe Coding bedeutet: Der Fachexperte formuliert die geschäftliche Logik und das Problem in natürlicher Sprache, während KI-Engines den fehlerfreien Code und Container erstellen.',
      'Fachabteilungen (Einkauf, Logistik, Disposition) müssen nicht monatelang auf überlastete IT-Abteilungen oder teure Softwarehäuser warten.',
      'Typische interne Hilfsmittel wie Zoll-Klassifikatoren, Retouren-Prüfer oder ERP-Datenfilter entstehen in 24 bis 48 Stunden.',
      'Sicherheit und Stabilität bleiben gewahrt, wenn IT-Leiter den Rahmen vorgeben (Git-Governance, Docker-Sandbox, Read-Only-ERP-APIs).',
    ],
    sections: [
      {
        heading: '1. Was bedeutet "Vibe Coding" wirklich für ein Unternehmen?',
        paragraphs: [
          'Der Begriff "Vibe Coding", geprägt vom renommierten KI-Forscher Andrej Karpathy, beschreibt den fundamentalen Wandel der Softwareentwicklung: Der Mensch programmiert nicht mehr syntaktisch Zeile für Zeile in TypeScript, Python oder SQL, sondern steuert, verfeinert und auditiert als Domänen-Architekt („Vibe Director“).',
          'Für den industriellen Mittelstand bedeutet dies eine tektonische Verschiebung. Bislang scheiterten unzählige sinnvolle Automatisierungsideen an zwei Hürden: Die interne IT war mit ERP-Wartung ausgelastet, und externe Agenturen verlangten für jedes kleine Tool 25.000 bis 60.000 Euro Projektbudget.',
        ],
        callout:
          'Der Paradigmenwechsel: Früher brauchte man Software-Ingenieure, um Geschäftslogik in Maschinencode zu übersetzen. Heute übersetzen Fachexperten ihre Geschäftsprobleme direkt per Prompting in lauffähige Software.',
      },
      {
        heading: '2. Praxisfall: Vom zähen Excel-Chaos zum 48-Stunden-Webtool',
        paragraphs: [
          'Ein konkretes Kundenbeispiel aus dem Maschinenbau: Die Einkaufsabteilung musste wöchentlich Hunderte Lieferanten-PDFs mit tagesaktuellen Rohstoffpreisen abgleichen. Das bisherige Vorgehen: Manuelle Eingabe in unübersichtliche Tabellen, Fehlerquote ca. 4 %, Bearbeitungszeit 18 Stunden pro Woche.',
          'Im Rahmen eines 2-tägigen Kiventis-Trainings baute die Einkäuferin – die vor dem Kurs noch nie eine Codezeile geschrieben hatte – per Vibe Coding ein interaktives Webtool. PDF hochladen, KI extrahiert die Positionen, gleicht sie mit Grenzwerten ab und erzeugt den fertigen ERP-Importbeleg. Projektdauer: 2 Nachmittage.',
        ],
      },
      {
        heading: '3. Die Spielregeln: Wie IT-Leiter Vibe Coding sicher einbetten',
        paragraphs: [
          'Kein verantwortungsvoller IT-Leiter möchte ungetesteten Wildwuchs im Firmennetzwerk. Genau deshalb lehrt Kiventis einen strukturierten Rahmen:',
          'Erstens: Isolierte Umgebungen. Jedes Tool läuft in einem schlanken Docker-Container ohne direkten Schreibzugriff auf sensible Datenbanken.',
          'Zweitens: Saubere Versionskontrolle per GitHub / GitLab. Code wird automatisch validiert, gelintet und versioniert.',
          'Drittens: Read-Only APIs für ERP und CRM. So kann das Fachbereichs-Tool Daten abfragen, ohne Gefahr zu laufen, Stammbestände zu beschädigen.',
        ],
      },
    ],
  },
  {
    id: 'erp-schnittstellen-ohne-50k-budget-sap-business-central',
    category: 'erp',
    categoryLabel: 'ERP & Systemintegration',
    kicker: 'SYSTEMARCHITEKTUR & SCHNITTSTELLEN',
    title: 'ERP-Schnittstellen ohne 50.000 € Budget: SAP, Business Central & Navision per KI anbinden',
    excerpt:
      'Warum scheitern klassische ERP-Schnittstellenprojekte an astronomischen Tagessätzen? Wie mittelständische Unternehmen ihre Kernsysteme heute per REST, OData und Vibe Coding intelligent vernetzen.',
    readTime: '7 Min. Lesezeit',
    publishedDate: 'August 2026',
    author: {
      name: 'Dipl.-Ing. D. Blazinic',
      role: '25 Jahre ERP- & Prozessberatung',
    },
    tags: ['ERP Integration', 'SAP & Navision', 'OData & REST', 'Business Central'],
    citation: 'Kiventis Enterprise Practice: 250+ realisierte ERP-Rollouts und Workflow-Architekturen',
    keyTakeaways: [
      'Herkömmliche ERP-Anpassungen scheitern oft an monolithischen Release-Zyklen und Beratertagessätzen von 1.800 € bis 2.400 €.',
      'Über standardisierte OData- und REST-Endpunkte können moderne Microservices sicher und entkoppelt an das ERP angebunden werden.',
      'KI fungiert als intelligenter Transformations-Layer, der unstrukturierte E-Mails, Lieferscheine und EDI-Dateien in exakte ERP-Tabellenstrukturen überführt.',
      '25 Jahre Prozesserfahrung verhindern typische Fallstricke wie fehlerhafte Buchungsperioden, abweichende Währungsumrechnungen oder inkonsistente Debitorenstämme.',
    ],
    sections: [
      {
        heading: '1. Das ewige Dilemma monolithischer ERP-Landschaften',
        paragraphs: [
          'Ob SAP S/4HANA, Microsoft Dynamics 365 Business Central, proALPHA oder Infor: ERP-Systeme sind das Rückgrat jedes produzierenden Unternehmens. Doch jede noch so kleine Anpassung – etwa ein neuer Freigabeworkflow oder ein mobiler Scanner für den Warenausgang – artet schnell in ein sechsmonatiges Consulting-Projekt aus.',
          'Das Ergebnis: Fachabteilungen behelfen sich mit improvisierten Insellösungen, Zetteln oder fehleranfälligen Makros. Der Informationsfluss stockt, und die Datenqualität sinkt.',
        ],
      },
      {
        heading: '2. Der moderne Ansatz: Der entkoppelte KI-Microservice',
        paragraphs: [
          'Statt das ERP-System selbst mit teuren Sonderprogrammierungen (ABAP, AL) zu überfrachten, setzen wir auf entkoppelte Microservices. Über offizielle, geschützte Schnittstellen (OData v4, Webhooks, REST) liest und schreibt der Microservice genau die Daten, die für den jeweiligen Prozessschritt nötig sind.',
          'Ein intelligentes Sprachmodell übernimmt dabei die Transformation: Es versteht Freitexte aus Kundenmails, gleicht Artikelnummern mit Toleranzen ab und validiert Pflichtfelder, bevor der Datensatz als strukturierter Entwurf an das ERP übergeben wird.',
        ],
      },
      {
        heading: '3. Warum reine KI-Agenturen ohne ERP-Verständnis scheitern',
        paragraphs: [
          'Eine KI kann hervorragend Python-Code schreiben. Doch sie weiß ohne Domänenwissen nicht, wie eine Umsatzsteuer-Voranmeldung funktioniert, warum eine retrograde Materialentnahme anders verbucht werden muss als ein direkter Warenausgang, oder wie Buchungssperren in Navision behandelt werden müssen.',
          'Aus unserer 25-jährigen Historie mit über 250 ERP-Projekten wissen wir: Der Schlüssel zum Erfolg ist nicht das größte Sprachmodell, sondern das präzise Zusammenspiel aus betriebswirtschaftlicher Prozesslogik und moderner KI-Automatisierung.',
        ],
      },
    ],
  },
  {
    id: 'saas-kosten-senken-interne-micro-apps-kmu',
    category: 'roi',
    categoryLabel: 'Kosten & ROI',
    kicker: 'LIZENZ-OPTIMIERUNG & SAAS-DIÄT',
    title: 'Schluss mit 50 €/User-Abonnements: Wie KMU ihre Lizenzkosten durch eigene Micro-Tools halbieren',
    excerpt:
      'SaaS-Sprawl frisst Budgets: Für jedes kleine Problem schließt der Mittelstand monatliche Abos ab. Warum 2026 maßgeschneiderte Inhouse-Apps die wirtschaftlichere und unabhängigere Alternative sind.',
    readTime: '4 Min. Lesezeit',
    publishedDate: 'Juli 2026',
    author: {
      name: 'Kiventis Strategy Group',
      role: 'B2B Business & Tech Analysts',
    },
    tags: ['SaaS Diät', 'Lizenzkosten', 'ROI Analyse', 'Unabhängigkeit'],
    citation: 'Gartner & Kiventis Market Benchmark 2026: The Rise of Citizen-Engineered Internal Micro-Apps in Mittelstand',
    keyTakeaways: [
      'Ein typischer Betrieb mit 50 Mitarbeitern zahlt oft für 15 bis 25 separate SaaS-Dienste – viele davon nur zu 10 % ihrer Feature-Tiefe genutzt.',
      'SaaS-Preise steigen jährlich um 8–15 %, während Kündigungsfristen und Lock-in-Effekte Unternehmen binden.',
      'Mit Vibe Coding können 2 bis 3 dieser Einzweck-Tools (Formulare, Freigaben, Dokumentenkonverter) dauerhaft durch eigene Apps ersetzt werden.',
      'Amortisation: Ein internes Enablement rechnet sich häufig bereits im ersten Halbjahr allein durch eingesparte Lizenzgebühren.',
    ],
    sections: [
      {
        heading: '1. Die versteckte Kostenfalle der Abonnement-Wirtschaft',
        paragraphs: [
          'Vor zehn Jahren kaufte man Software einmalig. Heute verlangt jeder Anbieter monatliche Gebühren pro Benutzer. Was mit 19 Euro pro Monat beginnt, summiert sich bei 30 Mitarbeitern und 8 Spezial-Tools schnell auf 30.000 bis 50.000 Euro wiederkehrende Kosten jedes Jahr.',
          'Hinzu kommt: Die meisten SaaS-Plattformen sind für den Weltmarkt konzipiert. Sie enthalten hunderte Schalter und Menüs, die ein mittelständischer Betrieb in Deutschland gar nicht benötigt, während die spezifischen Eigenheiten des eigenen Betriebs fehlen.',
        ],
      },
      {
        heading: '2. Eigene Micro-Tools: 100 % passgenau, null monatliche Lizenzgebühr',
        paragraphs: [
          'Dank moderner Frameworks (React, Vite, Node) und KI-gestütztem Vibe Coding erfordert die Erstellung eines eigenen internen Tools kein sechsköpfiges Softwareteam mehr. Ein geschulter Mitarbeiter baut das Tool exakt für den betrieblichen Workflow.',
          'Der Container wird einmalig auf dem eigenen Server oder bei einem europäischen Cloud-Hoster (wie Hetzner oder Hostinger VPS) gestartet – für monatliche Serverkosten von unter 20 Euro für das gesamte Unternehmen. Keine Benutzerlizenzen, keine Preiserhöhungen, volle Datenhoheit.',
        ],
      },
    ],
  },
];

export const articlesEn: InsightArticle[] = [
  {
    id: 'eu-ai-act-kmu-schulungspflicht-art-4',
    category: 'compliance',
    categoryLabel: 'EU AI Act & Compliance',
    kicker: 'LEGAL FRAMEWORK 2025/2026',
    title: 'EU AI Act for SMEs: Training Mandate (Art. 4) & Risk Classes in Practice',
    excerpt:
      'Since February 2, 2025, Article 4 of the EU AI Act mandates verifiable AI literacy for all organizations deploying AI tools. Learn what obligations apply to SMEs, how to prevent Shadow AI, and how to pass audits with confidence.',
    readTime: '6 min read',
    publishedDate: 'September 2026',
    author: {
      name: 'Dipl.-Ing. D. Blazinic',
      role: 'Senior Enterprise Architect & AI Consultant',
    },
    tags: ['EU AI Act', 'Article 4 AI Literacy', 'Compliance', 'GDPR & Governance'],
    citation: 'Regulation (EU) 2024/1689 of the European Parliament and of the Council (EU AI Act), Art. 4, Art. 5 & Annex III',
    keyTakeaways: [
      'Article 4 obligates every commercial operator of AI systems (regardless of head count) to ensure staff have sufficient AI literacy.',
      'Uncontrolled copying of confidential customer or CAD data into public consumer models creates acute GDPR and liability risks.',
      'High-risk classification (Annex III) applies primarily to AI in HR (recruitment, performance tracking) and critical operations.',
      'With modular in-house training, clear corporate guidelines, and zero-retention APIs, SMEs achieve provable compliance.',
    ],
    sections: [
      {
        heading: '1. The EU AI Act Phased Roadmap: What Applies When?',
        paragraphs: [
          'The European Artificial Intelligence Act (Regulation (EU) 2024/1689) is the world’s first comprehensive horizontal legal framework for AI. While headlines focus on penalties for tech giants, many SME managing directors overlook that binding obligations take effect throughout 2025 and 2026.',
          'The roadmap comprises four key stages: Prohibited practices (Article 5) and the binding mandate for personnel AI literacy (Article 4) took effect on February 2, 2025. Rules for General-Purpose AI (GPAI) take effect on August 2, 2025. Full compliance for High-Risk AI systems under Annex III takes effect in August 2026.',
        ],
        callout:
          'Critical for leadership: Article 4 makes no distinction between Fortune 500 corporations and 40-person Mittelstand suppliers. If your employees utilize AI copilots or generative models, you must prove they are trained.',
      },
      {
        heading: '2. Article 4: The Overlooked AI Literacy Requirement',
        paragraphs: [
          'Article 4 explicitly mandates that deployers take measures to ensure to their best extent that personnel have an adequate level of AI literacy, considering their technical background, training, and the context in which AI is operated.',
          'In practice, a one-page memo or generic disclaimer in the employment handbook is insufficient during regulatory audits. Companies must document training curricula, participants, and operational verification.',
        ],
      },
      {
        heading: '3. Shadow AI: The Invisible Operational Risk',
        paragraphs: [
          'In more than 80% of companies we audit, employees already use AI tools via personal unmanaged accounts. Confidential RFPs, financial sheets, and proprietary code are routinely pasted into third-party browser interfaces.',
          'When free consumer tiers are used, this data is ingested into model training pools, triggering severe GDPR infractions and compromising enterprise trade secrets.',
        ],
      },
      {
        heading: '4. Concrete Roadmap: 3 Steps to SME Compliance',
        paragraphs: [
          'Step 1 – Inventory & Classification: Map all active AI tools in an internal matrix (Minimal Risk vs. Transparency Risk vs. High Risk).',
          'Step 2 – Guidelines & Enterprise Access: Eliminate unmonitored personal accounts with corporate licenses guaranteeing Zero-Data-Retention.',
          'Step 3 – Certified Training: Deliver structured workflows that educate teams on hallucination detection, prompt discipline, and legal boundaries.',
        ],
      },
    ],
  },
  {
    id: 'vibe-coding-im-mittelstand-citizen-developer',
    category: 'vibe-coding',
    categoryLabel: 'Vibe Coding & Tooling',
    kicker: 'PRODUCTIVITY REVOLUTION 2026',
    title: 'Vibe Coding in the Enterprise: How Domain Experts Build Internal Tools in 48 Hours',
    excerpt:
      'Andrej Karpathy’s paradigm of "Vibe Coding" is reshaping the Mittelstand: Non-technical domain teams engineer tailored web applications and automated workflows using natural language – without paying €50k to software agencies.',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    author: {
      name: 'Kiventis Engineering Team',
      role: 'Software & Automation Unit',
    },
    tags: ['Vibe Coding', 'Citizen Developer', 'Internal Tools', 'Cost Arbitrage'],
    citation: 'Karpathy Paradigm (2025): Natural Language Specifications and Autonomous Agentic Code Generation in Production',
    keyTakeaways: [
      'Vibe Coding empowers domain experts to specify business rules in plain German/English while AI engines generate clean, tested code and containers.',
      'Departments like purchasing, logistics, and quality assurance bypass 6-month agency backlogs.',
      'Targeted internal micro-tools (custom tariff calculators, RMA auditors, ERP filters) are built and deployed within 24 to 48 hours.',
      'Security and stability remain rock-solid when IT directors establish guardrails: Git versioning, Docker isolation, and read-only ERP APIs.',
    ],
    sections: [
      {
        heading: '1. What Does "Vibe Coding" Really Mean for Business?',
        paragraphs: [
          'The concept of Vibe Coding describes a profound shift: Humans no longer write syntax character by character in TypeScript or Python. Instead, they act as domain directors and system architects, defining specifications and auditing outcomes.',
          'For industrial SMEs, this unlocks massive innovation. Previously, internal IT was bogged down maintaining infrastructure, and external agencies charged €30k to €70k per bespoke tool.',
        ],
        callout:
          'The paradigm shift: Software engineers used to translate business requirements into code. Today, domain experts turn their business problems directly into working software using AI.',
      },
      {
        heading: '2. Real-World Case: From Excel Drag to a 48-Hour Web App',
        paragraphs: [
          'A manufacturing client’s procurement team spent 18 hours every week cross-referencing supplier PDF price lists against spot commodity markets in unstable spreadsheets with a 4% error rate.',
          'During a 2-day Kiventis enablement program, a procurement specialist with zero prior coding experience built an interactive web app via Vibe Coding. Upload PDF, extract items, benchmark against tolerance bands, and generate ERP booking batches. Total project duration: two afternoons.',
        ],
      },
      {
        heading: '3. IT Governance: Sandboxing Vibe Coding Safely',
        paragraphs: [
          'Responsible CIOs do not ban Vibe Coding; they provide safe rails. First: Containerized sandboxing via Docker. Second: Version control with automated linting on GitHub/GitLab. Third: Read-only API tokens for ERP and CRM databases.',
        ],
      },
    ],
  },
  {
    id: 'erp-schnittstellen-ohne-50k-budget-sap-business-central',
    category: 'erp',
    categoryLabel: 'ERP & Integration',
    kicker: 'ENTERPRISE SYSTEM ARCHITECTURE',
    title: 'Connecting ERP Systems Without €50k Project Budgets: SAP & Business Central AI Pipelines',
    excerpt:
      'Why traditional ERP interface projects cost fortunes in consultant fees, and how modern Mittelstand companies connect core business systems cleanly via OData, REST, and Vibe Coding.',
    readTime: '7 min read',
    publishedDate: 'August 2026',
    author: {
      name: 'Dipl.-Ing. D. Blazinic',
      role: '25 Years ERP & Process Consulting',
    },
    tags: ['ERP Integration', 'SAP & Navision', 'OData & REST', 'Business Central'],
    citation: 'Kiventis Enterprise Practice: 250+ executed ERP rollouts and workflow architectures',
    keyTakeaways: [
      'Standard ERP customizations suffer from rigid release cycles and daily consulting rates of €1,800 to €2,400.',
      'Decoupled microservices connect safely via official OData v4 and REST endpoints without modifying core ERP codebase.',
      'AI acts as an intelligent transformation layer converting messy emails, shipping notes, and EDI files into clean tabular ERP entries.',
      '25 years of ERP experience safeguard against edge cases like fiscal period locks, multi-currency discrepancies, and customer master integrity.',
    ],
    sections: [
      {
        heading: '1. The Monolith Problem: Why ERP Changes Are Painful',
        paragraphs: [
          'Whether running SAP S/4HANA, Microsoft Dynamics 365 Business Central, proALPHA, or Infor, your ERP is the operational backbone. Yet any small enhancement – like a mobile barcode scanner or dispatch approval – quickly morphs into a six-month external project.',
          'The inevitable consequence: Teams fall back on paper forms, email ping-pong, and brittle macros.',
        ],
      },
      {
        heading: '2. The Modern Approach: Decoupled AI Microservices',
        paragraphs: [
          'Rather than modifying core ERP code with expensive proprietary languages (ABAP, AL), we deploy lightweight microservices. They query and write strictly the required records over standard, authenticated REST or OData protocols.',
          'Language models handle data reconciliation: They parse free-form emails, match item numbers with phonetic fuzzy search, and validate VAT IDs before passing clean payloads to the ERP queue.',
        ],
      },
      {
        heading: '3. Why Pure AI Agnostic Agencies Stumble on ERP',
        paragraphs: [
          'AI can write functional code in seconds. But without deep domain knowledge, it has no understanding of fiscal cutoff dates, consignment stock accounting, or currency revaluations. Our quarter-century track record bridging 250+ ERP projects ensures zero risk to your ledger.',
        ],
      },
    ],
  },
  {
    id: 'saas-kosten-senken-interne-micro-apps-kmu',
    category: 'roi',
    categoryLabel: 'Cost & ROI',
    kicker: 'LICENSE OPTIMIZATION & SAAS DIET',
    title: 'Slashing SaaS Spend: Why SMEs Are Building Custom Micro-Tools in 2026 Instead of Subscriptions',
    excerpt:
      'SaaS sprawl drains budgets. For every small operational friction, companies subscribe to yet another €50/user monthly tool. How in-house apps deliver superior ROI and total data independence.',
    readTime: '4 min read',
    publishedDate: 'July 2026',
    author: {
      name: 'Kiventis Strategy Group',
      role: 'B2B Business & Tech Analysts',
    },
    tags: ['SaaS Diet', 'License Costs', 'ROI Analysis', 'Independence'],
    citation: 'Gartner & Kiventis Market Benchmark 2026: The Rise of Citizen-Engineered Internal Micro-Apps in Mittelstand',
    keyTakeaways: [
      'A typical 50-person firm pays for 15 to 25 separate cloud subscriptions – utilizing less than 15% of their feature set.',
      'Cloud SaaS prices increase by 8–15% annually, compounded by vendor lock-in.',
      'With Vibe Coding, 2 to 3 single-purpose SaaS tools can be permanently replaced by custom internal apps.',
      'ROI timeline: In-house enablement amortizes within the first six months purely on software license savings.',
    ],
    sections: [
      {
        heading: '1. The Hidden Trap of Subscription Economics',
        paragraphs: [
          'A decade ago, software was a one-time capital expense. Today, every vendor demands recurring monthly seat licenses. What starts as €25/user quickly balloons to €30,000–€50,000 annually across fragmented tools.',
          'Furthermore, generic cloud tools are designed for broad mass markets; they lack the specific nuances of your proprietary workflows.',
        ],
      },
      {
        heading: '2. Custom Micro-Tools: 100% Tailored, Zero Recurring Seat Fees',
        paragraphs: [
          'Using modern web tooling and Vibe Coding, building a specialized internal portal no longer demands an agency army. A trained internal employee builds the tool in days.',
          'The application runs in a lightweight Docker container on your own server or European VPS (such as Hetzner or Hostinger) for less than €20/month total infrastructure overhead. No user licensing tiers, no price hikes, complete data sovereignty.',
        ],
      },
    ],
  },
];
