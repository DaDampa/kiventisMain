export interface LeitfadenChapter {
  id: string;
  part: string;
  partTitle: string;
  number: string;
  title: string;
  pages: string;
  summary: string;
  contentHtml: string;
  checklist?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LeitfadenData {
  title: string;
  subtitle: string;
  version: string;
  pagesCount: number;
  publisher: string;
  contactEmail: string;
  parts: {
    id: string;
    title: string;
    pages: string;
    chapters: LeitfadenChapter[];
  }[];
}

export const kmuLeitfadenDe: LeitfadenData = {
  title: 'KMU-Praxisleitfaden: Künstliche Intelligenz, Vibe Coding & EU-AI-Act-Compliance',
  subtitle: 'Der pragmatische Handlungsleitfaden für Geschäftsführer, Vorstände, CIOs/IT-Leiter & Abteilungsverantwortliche im B2B-Mittelstand',
  version: 'Offizielle B2B-Ausgabe 2025/2026 · Stand: Februar 2025',
  pagesCount: 38,
  publisher: 'KIVENTIS · ERP and Marketing Solutions LLC',
  contactEmail: 'Kontakt@kiventis.com',
  parts: [
    {
      id: 'prolog',
      title: 'Prolog & Management Summary',
      pages: 'S. 1–2',
      chapters: [
        {
          id: 'prolog-1',
          part: 'Prolog',
          partTitle: 'Prolog & Management Summary',
          number: 'Kapitel 0',
          title: 'Management Summary: Vom KI-Hype zur auditierbaren Wertschöpfung',
          pages: 'S. 1–2',
          summary: 'Status Quo 2025/2026: Warum unkontrolliertes Experimentieren vorbei ist und wie der Mittelstand die Produktivitätslücke schließt.',
          contentHtml: `
            <p class="mb-4">
              Die Phase des unverbindlichen Experimentierens mit generativer künstlicher Intelligenz ist im europäischen Mittelstand endgültig abgeschlossen. Während in den Jahren 2023 und 2024 viele Mitarbeiter ChatGPT oder Claude privat auf Dienstgeräten nutzten, stehen Geschäftsführungen und IT-Leitungen heute vor zwei unausweichlichen Realitäten:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                <span class="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">Rechtliche Verbindlichkeit</span>
                <p class="text-xs text-slate-300">
                  Seit dem <strong>2. Februar 2025</strong> greift Artikel 4 der EU-KI-Verordnung (EU AI Act). Jedes Unternehmen, das KI gewerblich betreibt oder anwendet, muss nachweisbare KI-Kompetenz (<em>AI Literacy</em>) im Personal belegen können. Bei Schadensfällen droht persönliche Organhaftung wegen Organisationsverschuldens.
                </p>
              </div>
              <div class="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                <span class="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">Operativer Produktivitätsabstand</span>
                <p class="text-xs text-slate-300">
                  Unternehmen, die "Vibe Coding" und domänenspezifische RAG-Workflows strukturiert eingeführt haben, bearbeiten Ausschreibungen, Reklamationen und ERP-Belege bis zu viermal schneller als konventionelle Marktbegleiter.
                </p>
              </div>
            </div>
            <p class="mb-4">
              Dieser Leitfaden destilliert die Erfahrung aus über 65 B2B-Projekten in der DACH-Region. Er fungiert als strategisches und operatives Nachschlagewerk für Entscheider: von der rechtssicheren Betriebsvereinbarung bis zum einsatzbereiten Enterprise-RAG-System.
            </p>
          `,
          checklist: [
            'Erfassung aller inoffiziell genutzten KI-Werkzeuge im Unternehmen (Schatten-IT-Audit)',
            'Benennung eines internen KI-Koordinators mit direktem Berichtsweg zur Geschäftsführung',
            'Festlegung von 3 Pilotprozessen mit messbarem ROI innerhalb der ersten 30 Tage',
          ],
        },
      ],
    },
    {
      id: 'teil-1',
      title: 'Teil I: Rechtliche Rahmenbedingungen, EU AI Act & DSGVO',
      pages: 'S. 3–8',
      chapters: [
        {
          id: 'recht-stufenplan',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 1',
          title: 'Der Stufenplan des EU AI Act (VO 2024/1689)',
          pages: 'S. 3',
          summary: 'Die zentralen Stichtage: Art. 4 & 5 seit Februar 2025, Art. 50 ab August 2026 sowie Hochrisiko-Klassifizierungen und Bußgeldrahmen.',
          contentHtml: `
            <p class="mb-4">
              Mit der Verordnung (EU) 2024/1689 hat die Europäische Union das weltweit erste umfassende Regelwerk für künstliche Intelligenz geschaffen. Der europäische Mittelstand fällt fast ausnahmslos in die Kategorie der <strong>„Deployer“ (Betreiber/Anwender)</strong>.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Die maßgeblichen Stichtage für KMUs:</h4>
            <ul class="list-disc pl-6 space-y-2 mb-4 text-slate-300 text-xs sm:text-sm">
              <li><strong>2. Februar 2025 (In Kraft getreten):</strong> Art. 4 (Pflicht zur KI-Kompetenz/AI Literacy) und Art. 5 (Verbotene Praktiken wie Social Scoring, biometrische Fernidentifikation im öffentlichen Raum oder Emotionserkennung am Arbeitsplatz).</li>
              <li><strong>2. Mai 2025:</strong> Verhaltenskodizes für Allzweck-KI-Modelle (GPAI).</li>
              <li><strong>2. August 2026:</strong> Umfassende Transparenz- und Kennzeichnungspflichten nach Art. 50 (Watermarking von KI-Inhalten, Transparenz bei Chatbots).</li>
              <li><strong>2. August 2027:</strong> Volle Anwendbarkeit für Hochrisiko-Systeme nach Anhang I (z. B. als Sicherheitsbauteile in regulierten Produkten).</li>
            </ul>
            <div class="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-4">
              <strong>Bußgeldrisiken nach Art. 99:</strong> Verstöße gegen verbotene Praktiken werden mit bis zu 35 Mio. € oder 7 % des weltweiten Jahresumsatzes geahndet. Pflichtverletzungen bei Betreiberpflichten drohen mit bis zu 15 Mio. € bzw. 3 % des weltweiten Jahresumsatzes.
            </div>
          `,
          checklist: [
            'Audit: Sicherstellen, dass keine verbotenen Praktiken nach Art. 5 (z. B. emotionale Leistungsüberwachung) eingesetzt werden',
            'Prüfung der Fristen im Compliance-Kalender der Rechts- und IT-Abteilung',
          ],
        },
        {
          id: 'recht-schulungspflicht',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 2',
          title: 'Rechtssichere Umsetzung von Art. 4 (Schulungspflicht)',
          pages: 'S. 4',
          summary: 'Definition von AI Literacy, Beweislast im Haftungsfall und Mindestanforderungen an Schulungscurricula.',
          contentHtml: `
            <p class="mb-4">
              Artikel 4 EU AI Act verpflichtet Unternehmen dazu, nachweisbar sicherzustellen, dass ihr Personal über ausreichende Fachkunde verfügt. Das Gesetz differenziert dabei nach technischem Vorwissen, Rolle und betrieblichem Einsatzkontext.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Beweislast und Organhaftung:</h4>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Verursacht ein Mitarbeiter durch unvorsichtigen KI-Einsatz einen DSGVO-Vorfall (z. B. Eingabe vertraulicher Kundendaten in ein öffentliches Cloud-Modell) oder eine Schutzrechtsverletzung, kehrt sich die zivilrechtliche Argumentation um: Die Geschäftsleitung muss im Rahmen des <em>Organisationsverschuldens</em> beweisen, dass der Mitarbeiter nachweislich unterwiesen wurde. Liegt kein Schulungsnachweis vor, haften Organe (§ 43 GmbHG / § 93 AktG) potenziell persönlich für Folgeschäden.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Die 4 Pflicht-Module des KIVENTIS Curriculums:</h4>
            <div class="space-y-2 text-xs font-mono text-slate-300 mb-4">
              <div class="p-2 rounded bg-white/[0.03] border border-white/10">Modul 1: Grundlagen, Prompting-Mechanik & Halluzinationsgrenzen</div>
              <div class="p-2 rounded bg-white/[0.03] border border-white/10">Modul 2: Datenschutz (DSGVO), Zero-Data-Retention & Geschäftsgeheimnisschutz</div>
              <div class="p-2 rounded bg-white/[0.03] border border-white/10">Modul 3: Vibe Coding & sichere Fachbereichs-Tools in Sandboxes</div>
              <div class="p-2 rounded bg-white/[0.03] border border-white/10">Modul 4: Human-in-the-Loop Freigabeprozesse & Dokumentationspflichten</div>
            </div>
          `,
          checklist: [
            'Erfassung aller Mitarbeiter mit Zugang zu generativen Tools',
            'Ausstellung personengebundener Zertifikate mit Curriculum und Prüfungsdatum',
            'Ablage der Zertifikate in der HR-Personalakte für behördliche Audits',
          ],
        },
        {
          id: 'recht-transparenz',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 3',
          title: 'Transparenz- und Kennzeichnungspflichten nach Art. 50',
          pages: 'S. 5',
          summary: 'Kennzeichnungspflicht für KI-Chatbots, Digital Watermarking und die Human-in-the-Loop-Ausnahme.',
          contentHtml: `
            <p class="mb-4">
              Ab August 2026 greifen die Transparenzpflichten nach Artikel 50 für alle KI-Systeme, die mit Menschen interagieren oder synthetische Inhalte erzeugen.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Drei Kernanforderungen für mittelständische Betriebe:</h4>
            <ol class="list-decimal pl-6 space-y-2 mb-4 text-xs sm:text-sm text-slate-300">
              <li><strong>Interaktive Kundensysteme (B2B-Chatbots):</strong> Nutzer müssen vor oder zu Beginn der Interaktion unmissverständlich informiert werden, dass sie mit einem KI-System kommunizieren (Ausnahme: Es ist aus dem Kontext für einen durchschnittlich verständigen Nutzer offensichtlich).</li>
              <li><strong>Synthetische Medien & Dokumente:</strong> KI-generierte Bilder, Tonaufnahmen oder umfangreiche Texte müssen maschinenlesbar gekennzeichnet werden (z. B. C2PA-Metadaten oder Digital Watermarks).</li>
              <li><strong>Die Human-in-the-Loop-Ausnahme:</strong> Wurde ein Text zwar von einer KI entworfen, jedoch von einem qualifizierten Mitarbeiter substanziell geprüft, redigiert und freigegeben, entfällt in den meisten B2B-Korrespondenzkontexten die Pflicht zum Brandmarken, da die menschliche Urheberschaft überwiegt.</li>
            </ol>
          `,
          checklist: [
            'Einbindung eines Hinweises bei allen externen KI-Chatbots („Sie sprechen mit einem KI-Assistenten“)',
            'Etablierung eines standardisierten Prüfstempels für redaktionell freigegebene KI-Texte',
          ],
        },
        {
          id: 'recht-hr-betriebsrat',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 4',
          title: 'Hochrisiko im HR-Bereich (Anhang III) & Betriebsrat',
          pages: 'S. 6',
          summary: 'Einstufung von Recruiting- und Personal-Tools, Diskriminierungsrisiken und Mitbestimmungsrechte nach § 87 Abs. 1 Nr. 6 BetrVG.',
          contentHtml: `
            <p class="mb-4">
              Besondere Vorsicht gilt bei Werkzeugen im Personalbereich. Gemäß <strong>Anhang III Nr. 4 des EU AI Act</strong> gelten KI-Systeme, die zur Stellenanzeigenschaltung, Bewerbervorauswahl, CV-Filterung oder Leistungsbeurteilung eingesetzt werden, als <strong>Hochrisiko-Systeme</strong>.
            </p>
            <div class="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs mb-4">
              <strong>Strikte Vorgaben für Hochrisiko-HR:</strong> Risikomanagementsystem, Daten-Governance (Ausschluss biometrischer und geschlechtsspezifischer Verzerrungen), lückenlose automatische Protokollierung (Logging) und garantierte menschliche Letztentscheidung.
            </div>
            <h4 class="font-bold text-white text-sm mb-2">Mitbestimmung des Betriebsrats nach § 87 BetrVG:</h4>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Nach § 87 Abs. 1 Nr. 6 BetrVG hat der Betriebsrat ein zwingendes Mitbestimmungsrecht bei der Einführung von Systemen, die dazu bestimmt oder geeignet sind, das Verhalten oder die Leistung der Arbeitnehmer zu überwachen. Ein KI-Tool, das Code-Commits zählt oder Antwortzeiten von Support-Mitarbeitern bewertet, erfordert zwingend eine Betriebsvereinbarung vor Rollout.
            </p>
          `,
          checklist: [
            'Keine automatisierten Ablehnungen von Bewerbern ohne menschliche Verifikation',
            'Frühzeitige Einbindung des Betriebsrats über eine Rahmenbetriebsvereinbarung',
          ],
        },
        {
          id: 'recht-dsgvo-cloud',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 5',
          title: 'DSGVO, Datensouveränität & Zero-Data-Retention',
          pages: 'S. 7',
          summary: 'Consumer-KI vs. Enterprise-Lizenzen, AVVs nach Art. 28 DSGVO und Drittlandtransfers (EU-US Data Privacy Framework).',
          contentHtml: `
            <p class="mb-4">
              Die größte rechtliche Falle im Mittelstand ist die Nutzung von Consumer-Gratis-Accounts (wie dem kostenlosen ChatGPT oder Claude). Bei Gratis-Diensten behalten sich Anbieter in der Regel das Recht vor, eingegebene Prompts und Dokumente zum Nachtrainieren öffentlicher Modelle zu verwenden.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Das Zero-Data-Retention-Prinzip:</h4>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              KIVENTIS setzt ausschließlich auf professionelle Enterprise-Architekturen oder kommerzielle API-Zugänge (OpenAI API / Azure OpenAI, Anthropic Commercial, Google Vertex AI). Hierbei gilt vertraglich garantiert:
            </p>
            <ul class="list-disc pl-6 space-y-1 mb-4 text-xs sm:text-sm text-slate-300">
              <li>Keine Speicherung der Prompts zur Modellverbesserung.</li>
              <li>Strikte Löschfristen (in der Regel 0 bis maximal 30 Tage zu Missbrauchserkennungszwecken).</li>
              <li>Abschluss eines DSGVO-konformen Auftragsverarbeitungsvertrags (AVV) nach Art. 28 DSGVO inklusive EU-Standardvertragsklauseln (SCCs).</li>
            </ul>
          `,
          checklist: [
            'Vollständiges Verbot privater KI-Accounts für dienstliche Angelegenheiten',
            'Dokumentation der AVVs aller KI-Dienstleister im Datenschutzverzeichnis',
          ],
        },
        {
          id: 'recht-systemverzeichnis',
          part: 'Teil I',
          partTitle: 'Recht, Compliance & EU AI Act',
          number: 'Kapitel 6',
          title: 'Das interne KI-Systemverzeichnis & Governance-Rollen',
          pages: 'S. 8',
          summary: 'Aufbau eines revisionssicheren Verzeichnisses, Aufgaben des KI-Koordinators und operative Prüfprozesse.',
          contentHtml: `
            <p class="mb-4">
              Jedes Unternehmen benötigt ein zentrales <strong>KI-Systemverzeichnis</strong>, analog zum Verzeichnis von Verarbeitungstätigkeiten (VVT) nach Art. 30 DSGVO. Dieses Verzeichnis ist die erste Anforderung externer Wirtschaftsprüfer und Aufsichtsbehörden.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Muster-Gliederung des Verzeichnisses:</h4>
            <div class="overflow-x-auto rounded-lg border border-white/10 mb-4 text-xs font-mono">
              <table class="w-full text-left">
                <thead class="bg-white/[0.05] text-teal-400">
                  <tr><th class="p-2">Spalte</th><th class="p-2">Inhalt & Beispiel</th></tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-slate-300">
                  <tr><td class="p-2 font-bold">Tool & Version</td><td class="p-2">Claude 3.7 Sonnet via Anthropic Commercial API</td></tr>
                  <tr><td class="p-2 font-bold">Einsatzzweck</td><td class="p-2">Analyse technischer Ausschreibungen und Pflichtenhefte</td></tr>
                  <tr><td class="p-2 font-bold">Verarbeitete Daten</td><td class="p-2">Kundenspezifikationen, keine personenbezogenen Mitarbeiterdaten</td></tr>
                  <tr><td class="p-2 font-bold">Risikoklasse (AI Act)</td><td class="p-2">Minimales / Spezifisches Transparenzrisiko (kein Hochrisiko)</td></tr>
                  <tr><td class="p-2 font-bold">Fachverantwortlicher</td><td class="p-2">Leiter Vertrieb / Engineering</td></tr>
                </tbody>
              </table>
            </div>
          `,
          checklist: [
            'Erstellung der zentralen Excel-/Confluence-Liste für alle KI-Systeme',
            'Halbjährliches Review mit dem Datenschutzbeauftragten (DSB)',
          ],
        },
      ],
    },
    {
      id: 'teil-2',
      title: 'Teil II: Systemarchitektur, Datensouveränität & Vibe Coding',
      pages: 'S. 9–14',
      chapters: [
        {
          id: 'tech-cloud-onprem',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 7',
          title: 'Technologievergleich: Cloud-LLMs vs. Lokale On-Premise-Modelle',
          pages: 'S. 9',
          summary: 'Kriterienmatrix für Entscheider: Datenschutz, Latenz, Betriebskosten (TCO) und Vendor Lock-in.',
          contentHtml: `
            <p class="mb-4">
              Die zentrale Weichenstellung lautet: <strong>Moderne Cloud-APIs oder eigener On-Premise-GPU-Server?</strong>
            </p>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Während Cloud-Modelle (Claude 3.7, GPT-4o) unschlagbare Reasoning-Leistung bei minimalen Initialkosten bieten, ermöglichen lokale Open-Source-Modelle (Llama 3.3, Mistral Large, DeepSeek R1) absolute Datensouveränität und Unabhängigkeit vom Internet.
            </p>
          `,
          tableData: {
            headers: ['Kriterium', 'Cloud-APIs (Zero-Retention)', 'Lokale On-Premise-Modelle (Ollama/vLLM)'],
            rows: [
              ['Datenschutz & Souveränität', 'Hoch (vertraglich via AVV)', 'Maximal (Daten verlassen nie das LAN)'],
              ['Reasoning & Code-Qualität', 'Führend (State-of-the-Art)', 'Sehr gut für Standard-Aufgaben'],
              ['Initialinvestition', '0 € (Pay-as-you-go)', '8.000 € – 25.000 € für GPU-Hardware'],
              ['Wartungsaufwand', 'Keiner (Managed Service)', 'Mittel (Treiber, Updates, OS-Härtung)'],
              ['Internetausfall', 'Keine Funktion', '100 % autark funktionsfähig'],
            ],
          },
        },
        {
          id: 'tech-rag-pipeline',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 8',
          title: 'Enterprise RAG-Architektur (Retrieval-Augmented Generation)',
          pages: 'S. 10',
          summary: 'Funktionsweise, Chunking-Strategien, Vektordatenbanken (pgvector, Qdrant) und Zugriffskontrolle auf Dokumentenebene.',
          contentHtml: `
            <p class="mb-4">
              Warum trainieren erfolgreiche Mittelständler keine eigenen Modelle? Weil <em>Feintuning</em> teuer, statisch und fehleranfällig ist. <strong>RAG (Retrieval-Augmented Generation)</strong> ist der bewährte Standard:
            </p>
            <div class="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-slate-300 mb-4 space-y-1">
              <div class="text-teal-400 font-bold">[1. Ingestion]</div>
              <div>PDFs, Word, SAP-Exporte & Wiki-Seiten werden eingelesen & bereinigt.</div>
              <div class="text-teal-400 font-bold mt-2">[2. Chunking & Embeddings]</div>
              <div>Texte werden in logische Abschnitte (500–1000 Tokens) zerlegt und in hochdimensionale Vektoren übersetzt.</div>
              <div class="text-teal-400 font-bold mt-2">[3. Vektor-Suche]</div>
              <div>Nutzerfrage wird vektorisiert -> Semantische Ähnlichkeitssuche in pgvector/Qdrant.</div>
              <div class="text-teal-400 font-bold mt-2">[4. Kontext-Übergabe]</div>
              <div>Nur die exakten Fundstellen werden als Referenz an das LLM übergeben -> 0 % Halluzination.</div>
            </div>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              <strong>Sicherheitskonzept (ACLs):</strong> Jeder Dokumenten-Chunk erbt die Berechtigungen aus dem Quellsystem (z. B. Active Directory). Ein Mitarbeiter im Einkauf sieht nur Einkaufsbelege, keine Vorstandsgehälter.
            </p>
          `,
          checklist: [
            'Festlegung der Dokumentenquellen (Netzlaufwerke, Confluence, ERP-Archiv)',
            'Auswahl einer zukunftssicheren Vektor-Engine (z. B. PostgreSQL mit pgvector)',
          ],
        },
        {
          id: 'tech-erp-integration',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 9',
          title: 'Sichere ERP- und Datenbank-Integration (Read-Only)',
          pages: 'S. 11',
          summary: 'Die goldene Regel: Kein direkter Schreibzugriff auf SAP oder Navision. Middleware- und Staging-Architekturen.',
          contentHtml: `
            <p class="mb-4">
              Die größte Sorge von CIOs ist der Schutz der Transaktionsintegrität im ERP-System. KIVENTIS verfolgt das strikte <strong>Read-Only-Prinzip</strong>:
            </p>
            <ul class="list-disc pl-6 space-y-2 mb-4 text-xs sm:text-sm text-slate-300">
              <li><strong>Entkopplung durch Staging-Tabellen:</strong> Das KI-System liest Stammdaten und Buchungsstände über gesicherte REST-APIs oder schreibgeschützte Views aus.</li>
              <li><strong>Vorschlags- statt Buchungslogik:</strong> Die KI erzeugt Buchungsvorschläge, Auftragsentwürfe oder Reklamationsakten in einer isolierten Sandbox-Zwischentabelle.</li>
              <li><strong>Menschliches 4-Augen-Release:</strong> Der Sachbearbeiter prüft den Vorschlag im gewohnten ERP-Interface und gibt die Verbuchung per Klick final frei.</li>
            </ul>
          `,
          checklist: [
            'Einrichtung eines dedizierten Lese-Nutzers mit restriktiven Rechten im ERP',
            'Architektur einer Staging-Zwischenschicht für alle KI-generierten Datensätze',
          ],
        },
        {
          id: 'tech-vibe-coding',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 10',
          title: 'Vibe Coding & Citizen Development für Fachbereiche',
          pages: 'S. 12',
          summary: 'Paradigmenwechsel nach Karpathy: Fachanwender bauen produktive Micro-Tools mit Cursor, Claude und Lovable.',
          contentHtml: `
            <p class="mb-4">
              <strong>Vibe Coding</strong> bedeutet: Die Fachkompetenz steuert das System in natürlicher Sprache, während das LLM den Quellcode syntaktisch fehlerfrei implementiert.
            </p>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Fachanwender in Logistik, Einkauf oder QM müssen keine Programmiersprachen lernen. Sie formulieren präzise Anforderungen: <em>„Lies diese 10 Lieferanten-PDFs ein, extrahiere Artikelnummer, Bruttopreis und Lieferdatum und erzeuge mir eine Gegenüberstellung als interaktive Web-Tabelle mit Farbmarkierung bei Preisabweichungen > 5 %.“</em>
            </p>
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Ergebnis: Was früher Monate in der internen IT-Warteschlange verbrachte, löst die Fachabteilung an einem Nachmittag selbstständig.
            </p>
          `,
          checklist: [
            'Bereitstellung genehmigter Entwicklungsumgebungen (z. B. Cursor oder browserbasierte Sandboxes)',
            'Schulung im Verfassen strukturierter Systemspezifikationen',
          ],
        },
        {
          id: 'tech-governance-audit',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 11',
          title: 'Enterprise-Governance für Vibe Coding & Agentic Code',
          pages: 'S. 13',
          summary: 'Review-Gates, automatisiertes Linting, Security-Scans und lückenlose Audit-Trails für generierten Code.',
          contentHtml: `
            <p class="mb-4">
              Damit Citizen Development nicht im Chaos endet, bedarf es klarer technischer Leitplanken:
            </p>
            <ol class="list-decimal pl-6 space-y-2 mb-4 text-xs sm:text-sm text-slate-300">
              <li><strong>Spezifikation vor Generierung:</strong> Jedes Micro-Tool beginnt mit einem verbindlichen Anforderungsdokument (Product Spec).</li>
              <li><strong>Automatisierte Code-Gates:</strong> TypeScript-Typprüfung, ESLint und statische Sicherheits-Scans (z. B. Prüfung auf hardcodierte Passwörter oder unsichere SQL-Injektions-Pfade) müssen vor Freigabe grün sein.</li>
              <li><strong>Revisionssicherer Audit-Trail:</strong> Prompt-Historie, verwendetes Modell und der freigebende Fachmitarbeiter werden revisionssicher protokolliert.</li>
            </ol>
          `,
          checklist: [
            'Etablierung eines zentralen Git-Repositories für alle internen Fachbereichs-Tools',
            'Automatisierte CI/CD-Pipelines mit Sicherheitsprüfung',
          ],
        },
        {
          id: 'tech-hardware-sizing',
          part: 'Teil II',
          partTitle: 'Technologie & Governance',
          number: 'Kapitel 12',
          title: 'Hardware-Dimensionierung & On-Premise Infrastruktur',
          pages: 'S. 14',
          summary: 'VRAM-Bedarf, Quantisierung (4-Bit/8-Bit) und Bereitstellungskonzepte im ISO-27001-Rechenzentrum.',
          contentHtml: `
            <p class="mb-4">
              Für Unternehmen, die eigene Hardware beschaffen möchten, gibt KIVENTIS klare Richtwerte:
            </p>
            <div class="overflow-x-auto rounded-lg border border-white/10 mb-4 text-xs font-mono">
              <table class="w-full text-left">
                <thead class="bg-white/[0.05] text-teal-400">
                  <tr><th class="p-2">Modellgröße</th><th class="p-2">Min. VRAM</th><th class="p-2">Empfohlene Hardware</th><th class="p-2">Investition ca.</th></tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-slate-300">
                  <tr><td class="p-2">8B Parameter (Llama 3.3)</td><td class="p-2">16–24 GB</td><td class="p-2">1x NVIDIA RTX 4090 / A5000</td><td class="p-2">4.500 € – 6.500 €</td></tr>
                  <tr><td class="p-2">70B Parameter (Llama 70B 4-Bit)</td><td class="p-2">48–80 GB</td><td class="p-2">2x RTX 4090 / 1x NVIDIA A100</td><td class="p-2">12.000 € – 22.000 €</td></tr>
                  <tr><td class="p-2">Prototyping / Entwickler</td><td class="p-2">36–64 GB Unified</td><td class="p-2">Apple Mac Studio (M2/M3 Max)</td><td class="p-2">3.800 € – 5.200 €</td></tr>
                </tbody>
              </table>
            </div>
          `,
          checklist: [
            'Entscheidung: Eigener Serverraum vs. Colocation im deutschen Rechenzentrum',
            'Einrichtung von Ollama oder vLLM als performante Server-Infrastruktur',
          ],
        },
      ],
    },
    {
      id: 'teil-3',
      title: 'Teil III: Das 8-Use-Case-Praxis-Kompendium',
      pages: 'S. 15–30',
      chapters: [
        {
          id: 'case-1-rag-wissen',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 1',
          title: 'Intelligente RAG-Wissensdatenbank für Montage & Normen',
          pages: 'S. 15–16',
          summary: 'Semantische Suche über 15.000 Seiten CAD-Dokumentation, DIN-Normen und Serviceberichte im Maschinenbau.',
          contentHtml: `
            <h4 class="font-bold text-white text-sm mb-1">1. Problemstellung & Lösung:</h4>
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Servicetechniker und Konstrukteure verbrachten im Schnitt 45 Minuten pro Tag mit der Suche nach Montageanweisungen, Toleranztabellen und DIN-Normen in unstrukturierten Ordnern. Die semantische RAG-Pipeline liefert präzise Antworten inklusive Quellseitenverweis in 3 Sekunden.
            </p>
            <h4 class="font-bold text-white text-sm mb-1">2. Business Impact & ROI:</h4>
            <p class="text-xs sm:text-sm text-teal-300 font-mono mb-3">
              Zeitersparnis: 3,5 Std./Woche pro Techniker · Bei 25 Mitarbeitern = 3.500 Std./Jahr freigesetzt · Amortisation nach 48 Tagen.
            </p>
            <h4 class="font-bold text-white text-sm mb-1">3. Technische Architektur:</h4>
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              PostgreSQL mit pgvector, Text-Embedding-3-Large, Claude 3.7 Sonnet API (Zero-Retention) oder lokales Llama 3 70B, Frontend als schlanke React-PWA für Tablets.
            </p>
          `,
          checklist: ['Bereinigung alter PDF-Bestände', 'Definition von Nutzerberechtigungen nach Standorten'],
        },
        {
          id: 'case-2-ocr-rechnung',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 2',
          title: 'Automatisierte Eingangsrechnungsverarbeitung & ERP-Übergabe',
          pages: 'S. 17–18',
          summary: 'Fehlerfreie Extraktion von Kopf- und Positionsdaten aus Lieferantenrechnungen ohne teure Spezialsoftware.',
          contentHtml: `
            <h4 class="font-bold text-white text-sm mb-1">1. Problemstellung & Lösung:</h4>
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Manuelle Erfassung von 800 monatlichen Eingangsrechnungen in der Finanzbuchhaltung. Multimodale LLMs lesen Tabellen, USt-IDs, IBANs und Skontobedingungen fehlerfrei aus und gleichen sie mit der Bestellung ab.
            </p>
            <h4 class="font-bold text-white text-sm mb-1">2. Business Impact & ROI:</h4>
            <p class="text-xs sm:text-sm text-teal-300 font-mono mb-3">
              Durchlaufzeit pro Beleg von 9 Minuten auf 45 Sekunden gesenkt · Fehlerquote unter 0,2 % · Ersparnis: 28.000 € jährlich in der Buchhaltung.
            </p>
          `,
          checklist: ['Definition der ERP-Staging-Schnittstelle', 'Human-in-the-Loop Freigabe bei Beträgen über 5.000 €'],
        },
        {
          id: 'case-3-pflichtenheft',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 3',
          title: 'Pflichtenheft- und Ausschreibungsanalyse im Maschinenbau',
          pages: 'S. 19–20',
          summary: 'Fallstudie Schultheiss Präzisionstechnik: 150 Seiten Automobil-Anforderungen in 30 Minuten analysiert.',
          contentHtml: `
            <h4 class="font-bold text-white text-sm mb-1">1. Ausgangslage & KIVENTIS Lösung:</h4>
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Senior-Ingenieure verbrachten 2 Tage mit dem manuellen Abgleich von Kunden-Pflichtenheften gegen eigene Fertigungskapazitäten. Ein maßgeschneidertes RAG-System extrahiert Risikoklauseln und erstellt die Machbarkeitsmatrix automatisch.
            </p>
            <h4 class="font-bold text-white text-sm mb-1">2. Messbarer Erfolg:</h4>
            <p class="text-xs sm:text-sm text-teal-300 font-mono mb-3">
              Angebotsabgabe viermal schneller · Kein Übersehen von Pönalen oder Sonderwerkstoffen · Break-Even nach genau 72 Tagen.
            </p>
          `,
          checklist: ['Erstellung einer Standard-Risikomatrix für Ausschreibungen', 'Schulung des Vertriebsingenieur-Teams'],
        },
        {
          id: 'case-4-reklamation',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 4',
          title: 'Automatisierte Reklamationsbearbeitung im Großhandel',
          pages: 'S. 21–22',
          summary: 'Fallstudie Baustoffhandel: 1.200 monatliche E-Mail-Reklamationen mit Lieferscheinabgleich.',
          contentHtml: `
            <h4 class="font-bold text-white text-sm mb-1">1. Lösung:</h4>
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              E-Mails von Handwerkern (inkl. Fotos von Bruchware) werden automatisiert triagiert, Belegnummern im ERP gesucht und Gutschriftvorschläge mit passendem Textentwurf vorbereitet.
            </p>
            <h4 class="font-bold text-white text-sm mb-1">2. ROI-Kennzahl:</h4>
            <p class="text-xs sm:text-sm text-teal-300 font-mono mb-3">
              87 % schnellere Reklamationsabwicklung · Kundenzufriedenheit (NPS) um 24 Punkte gesteigert · 32.000 € Ersparnis/Jahr.
            </p>
          `,
          checklist: ['Anbindung an zentrales Ticket-/Mailpostfach', 'Sicherheitsfilter gegen unberechtigte Reklamationen'],
        },
        {
          id: 'case-5-lead-scoring',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 5',
          title: 'B2B Lead-Scoring & RFQ-Extraktion aus Kunden-E-Mails',
          pages: 'S. 23–24',
          summary: 'Automatische Klassifizierung von Preisanfragen und Entwurf personalisierter Angebote.',
          contentHtml: `
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Anfragen werden nach Dringlichkeit, Margenpotenzial und Bonität bewertet. Der Vertriebsinnendienst erhält vorformulierte Angebotsentwürfe direkt in seinem CRM.
            </p>
          `,
          checklist: ['Definition von Scoringschwellen', 'CRM-Webhook zur Übernahme qualifizierter Leads'],
        },
        {
          id: 'case-6-micro-apps',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 6',
          title: 'Vibe-Coding Micro-Apps für QM & Lagerlogistik',
          pages: 'S. 25–26',
          summary: 'Citizen Developer bauen Barcode-Scanner-Tools und Prüfberichte ohne externe Agentur.',
          contentHtml: `
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Ein Schichtleiter im Lager entwickelte in 3 Tagen eine mobile Web-App zur Wareneingangserfassung mit Kamera-Scanner. Entwicklungszeit: 3 Tage statt 4 Monate Warten auf IT.
            </p>
          `,
          checklist: ['Sandbox-Container-Freigabe', 'Code-Review durch leitenden Systemadministrator'],
        },
        {
          id: 'case-7-hr-talent',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 7',
          title: 'HR-Bewerber-Vorauswahl & KI-Onboarding (konform zu Anhang III)',
          pages: 'S. 27–28',
          summary: 'Rechtskonformes CV-Parsing, Skill-Matching und interaktiver Onboarding-Bot für neue Mitarbeiter.',
          contentHtml: `
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              Zusammenfassung von Lebensläufen gegen Anforderungsprofile ohne automatisierte Ausschlussentscheidung (Human-in-the-Loop gewährleistet). Onboarding-Bot beantwortet interne Fragen zu Urlaubsanträgen und IT-Setups.
            </p>
          `,
          checklist: ['Prüfung auf diskriminierungsfreie Kriterien', 'Schulung des HR-Teams nach Art. 4 AI Act'],
        },
        {
          id: 'case-8-scm-planung',
          part: 'Teil III',
          partTitle: 'Praxis-Kompendium',
          number: 'Use Case 8',
          title: 'Produktionsfeinplanung & Materialbedarfsoptimierung',
          pages: 'S. 29–30',
          summary: 'Prognose von Lieferverzögerungen und adaptive Rüstzeitenoptimierung im Fertigungsbetrieb.',
          contentHtml: `
            <p class="text-xs sm:text-sm text-slate-300 mb-3">
              KI analysiert historische Maschinendaten und Lieferanten-Lieferzeiten. Rüstzeiten wurden um 18 % gesenkt, Sicherheitsbestände um 14 % optimiert.
            </p>
          `,
          checklist: ['Historische Datenaufbereitung aus dem ERP', 'Pilotlauf auf einer Fertigungslinie'],
        },
      ],
    },
    {
      id: 'teil-4',
      title: 'Teil IV: Wirtschaftlichkeit, ROI & Fördermittel',
      pages: 'S. 31–34',
      chapters: [
        {
          id: 'roi-kalkulation',
          part: 'Teil IV',
          partTitle: 'Wirtschaftlichkeit & Finanzen',
          number: 'Kapitel 13',
          title: 'Der B2B-ROI-Kalkulationsrahmen für den Mittelstand',
          pages: 'S. 31',
          summary: 'Die konservative KIVENTIS-Formel für 3 Betriebsgrößen bei 40 Netto-Arbeitswochen/Jahr.',
          contentHtml: `
            <p class="mb-4">
              Zur Vorlage bei Geschäftsleitung, Beirat oder Bank empfiehlt KIVENTIS folgende Standardformel:
            </p>
            <div class="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-emerald-400 mb-4">
              Netto-Jahresersparnis = Mitarbeiter × Zeitersparnis (Std./Woche) × 40 Netto-Wochen × Vollkosten-Stundensatz
            </div>
          `,
          tableData: {
            headers: ['Unternehmensgröße', 'Relevante Mitarbeiter', 'Ersparnis / Woche', 'Stundensatz', 'Jahresersparnis', 'Break-Even'],
            rows: [
              ['Kleinbetrieb', '10 Mitarbeiter', '1,5 Std.', '45 €/Std.', '27.000 €', '32 Tage'],
              ['Mittelstand A', '20 Mitarbeiter', '2,0 Std.', '50 €/Std.', '80.000 €', '42 Tage'],
              ['Mittelstand B', '50 Mitarbeiter', '2,5 Std.', '65 €/Std.', '325.000 €', '28 Tage'],
            ],
          },
        },
        {
          id: 'roi-tco-vergleich',
          part: 'Teil IV',
          partTitle: 'Wirtschaftlichkeit & Finanzen',
          number: 'Kapitel 14',
          title: 'Total Cost of Ownership (TCO): Cloud SaaS vs. On-Premise',
          pages: 'S. 32',
          summary: '36-Monats-Kostenvergleich, Strom, Wartung und der Tipping Point für eigene GPU-Server.',
          contentHtml: `
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              <strong>Der Tipping Point:</strong> Bei unter 100.000 Token-Abfragen pro Tag sind Cloud-APIs (ca. 120–350 €/Monat) wirtschaftlich unschlagbar. Ab ca. 1,5 Mio. täglichen Tokens und bei strengsten Vertraulichkeitsanforderungen (CAD, Verträge) amortisiert sich ein eigener On-Premise-Server innerhalb von 14 Monaten.
            </p>
          `,
          checklist: ['Kalkulation der monatlichen API-Tokenkosten', 'Berücksichtigung interner Administrationskosten bei On-Premise'],
        },
        {
          id: 'roi-foerdermittel',
          part: 'Teil IV',
          partTitle: 'Wirtschaftlichkeit & Finanzen',
          number: 'Kapitel 15',
          title: 'Staatliche Fördermittel für KI-Investitionen & Weiterbildung',
          pages: 'S. 33',
          summary: 'Zuschüsse für Digitalisierung und KI-Trainings (z. B. Digitaler Mittelstand Bremen bis 17.000 €, De-minimis).',
          contentHtml: `
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Viele Bundesländer und der Bund bezuschussen KI-Beratung und Mitarbeiterschulungen mit <strong>30 % bis 50 % nicht rückzahlbaren Zuschüssen</strong>.
            </p>
            <ul class="list-disc pl-6 space-y-1 mb-4 text-xs sm:text-sm text-slate-300">
              <li><strong>Förderfähig:</strong> Externe Beratung, Qualifizierung des Personals nach Art. 4 AI Act, Implementierung von Sicherheitskonzepten.</li>
              <li><strong>Nicht förderfähig:</strong> Reine Standard-Hardware ohne Prozessbezug, laufende Lizenzgebühren.</li>
            </ul>
          `,
          checklist: ['Prüfung des regionalen Förderprogramms vor Projektstart', 'Einreichung des Antrags vor verbindlicher Beauftragung'],
        },
        {
          id: 'roi-kpi-dashboard',
          part: 'Teil IV',
          partTitle: 'Wirtschaftlichkeit & Finanzen',
          number: 'Kapitel 16',
          title: 'KPI-Dashboard & Kontinuierliches KI-Controlling',
          pages: 'S. 34',
          summary: 'Messung von Adoption Rate, Durchlaufzeiten und monatliche Reviews mit der Geschäftsführung.',
          contentHtml: `
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Erfolgsmessung erfolgt über drei Säulen: <strong>1. Operative Zeitersparnis</strong> (Durchlaufzeit von Belegen), <strong>2. Qualitätsmetriken</strong> (Fehlerquoten) und <strong>3. Nutzungsquote</strong> (Adoption Rate > 80 % im Kernteam).
            </p>
          `,
          checklist: ['Monatlicher Review im Führungskreis', 'Anpassung von Prompts bei veränderten Prozessen'],
        },
      ],
    },
    {
      id: 'teil-5',
      title: 'Teil V: Implementierung & Governance-Toolkit',
      pages: 'S. 35–38',
      chapters: [
        {
          id: 'toolkit-roadmap',
          part: 'Teil V',
          partTitle: 'Implementierung & Governance',
          number: 'Kapitel 17',
          title: 'Die 30-Tage-Implementierungs-Roadmap',
          pages: 'S. 35',
          summary: 'Vom Beschluss zum ersten produktiven Workflow in 4 strukturierten Wochen.',
          contentHtml: `
            <div class="space-y-3 font-mono text-xs">
              <div class="p-3 rounded-lg border border-teal-500/20 bg-teal-500/5">
                <span class="text-teal-400 font-bold">Woche 1: Opportunity-Scan & Schatten-IT-Audit</span><br />
                Erfassung der genutzten Tools, Definition von 3 Quick-Wins, Klärung der AVVs.
              </div>
              <div class="p-3 rounded-lg border border-teal-500/20 bg-teal-500/5">
                <span class="text-teal-400 font-bold">Woche 2: Compliance-Framework & Richtlinienerlass</span><br />
                Verabschiedung der KI-Betriebsvereinbarung, Freigabe der Sandbox-Entwicklungsumgebung.
              </div>
              <div class="p-3 rounded-lg border border-teal-500/20 bg-teal-500/5">
                <span class="text-teal-400 font-bold">Woche 3: Team-Enablement (Art. 4 AI Act) & MVP-Bau</span><br />
                Durchführung des KIVENTIS Online-Intensivkurses, Bau des 1. internen RAG-Tools.
              </div>
              <div class="p-3 rounded-lg border border-teal-500/20 bg-teal-500/5">
                <span class="text-teal-400 font-bold">Woche 4: Produktivschaltung & Zertifikatsübergabe</span><br />
                Live-Gang des Pilot-Workflows, Übergabe der Teilnahmezertifikate für die HR-Akte.
              </div>
            </div>
          `,
          checklist: ['Kick-off mit Kernteam', 'Feedback-Runde nach Tag 30'],
        },
        {
          id: 'toolkit-betriebsvereinbarung',
          part: 'Teil V',
          partTitle: 'Implementierung & Governance',
          number: 'Kapitel 18',
          title: 'Vollständige Muster-Betriebsvereinbarung / KI-Richtlinie',
          pages: 'S. 36',
          summary: 'Anwaltlich fundierter Rechtstext (§§ 1–7) zur sofortigen Anpassung im Unternehmen.',
          contentHtml: `
            <div class="p-4 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 space-y-2 leading-relaxed">
              <div><strong>§ 1 Geltungsbereich und Zweck:</strong> Diese Richtlinie regelt den verbindlichen Einsatz aller KI-Werkzeuge bei [Unternehmensname] zum Schutz von Betriebsgeheimnissen und zur Einhaltung der Verordnung (EU) 2024/1689.</div>
              <div><strong>§ 2 Freigegebene Werkzeuge (Positivliste):</strong> Es dürfen ausschließlich durch die IT autorisierte Enterprise-Lizenzen mit garantierter Zero-Data-Retention eingesetzt werden.</div>
              <div><strong>§ 3 Verbot privater Accounts:</strong> Die geschäftliche Nutzung privater Gratis-Accounts ist untersagt. Das Hochladen von Kundendaten oder Konstruktionsplänen in ungesicherte Systeme stellt eine Dienstpflichtverletzung dar.</div>
              <div><strong>§ 4 Vier-Augen-Prinzip & Human-in-the-Loop:</strong> KI-Ergebnisse sind Entwürfe. Vor Verwendung in Kundenkorrespondenz, Software-Builds oder behördlichen Dokumenten ist eine fachliche Prüfung durch den zuständigen Mitarbeiter zwingend.</div>
              <div><strong>§ 5 Kennzeichnungspflicht:</strong> Bei direkter Kundeninteraktion (z. B. Support-Chat) ist die KI-Natur offenzulegen (Art. 50 EU AI Act).</div>
              <div><strong>§ 6 Qualifizierungspflicht:</strong> Alle anwendenden Mitarbeiter nehmen jährlich an den Schulungsmaßnahmen gemäß Art. 4 EU AI Act teil.</div>
              <div><strong>§ 7 Inkrafttreten:</strong> Diese Richtlinie tritt am [Datum] mit Unterzeichnung durch die Geschäftsführung in Kraft.</div>
            </div>
          `,
          checklist: ['Anpassung der Platzhalter an die eigene Firmenstruktur', 'Unterzeichnung durch Geschäftsführung & Betriebsrat'],
        },
        {
          id: 'toolkit-audit-checklist',
          part: 'Teil V',
          partTitle: 'Implementierung & Governance',
          number: 'Kapitel 19',
          title: '20-Punkte Audit- und Readiness-Checkliste',
          pages: 'S. 37',
          summary: 'Prüfmatrix für Geschäftsführung, CISO und externe Wirtschaftsprüfer.',
          contentHtml: `
            <p class="mb-3 text-xs sm:text-sm text-slate-300">
              Mit dieser 20-Punkte-Checkliste auditieren Sie Ihr Unternehmen vor internen Revisionen oder Behördenprüfungen:
            </p>
          `,
          checklist: [
            '1. Liegt ein zentrales Verzeichnis aller genutzten KI-Werkzeuge vor?',
            '2. Wurde Artikel 4 AI Act geschult und sind personengebundene Zertifikate in der HR-Akte archiviert?',
            '3. Existiert eine unterzeichnete KI-Nutzungsrichtlinie für alle Mitarbeiter?',
            '4. Sind alle verbotenen Praktiken nach Art. 5 (z. B. Emotionserkennung) technisch und organisatorisch ausgeschlossen?',
            '5. Liegen für alle externen Cloud-LLMs wirksame AVVs mit Zero-Data-Retention vor?',
            '6. Werden keine sensiblen personenbezogenen Daten ohne Rechtsgrundlage verarbeitet?',
            '7. Ist die Datenübermittlung in Drittstaaten über EU-Standardvertragsklauseln abgesichert?',
            '8. Greifen RAG-Systeme nur mit dokumentierter Zugriffskontrolle (ACLs) auf Dateien zu?',
            '9. Erfolgt der Zugriff auf ERP-Kerne ausschließlich lesend (Read-Only)?',
            '10. Werden KI-generierte Buchungsvorschläge vor Verbuchung durch Menschen freigegeben?',
            '11. Existiert ein Code-Review-Gate für Vibe-Coding-Micro-Tools?',
            '12. Werden generierte Software-Tools vor Produktivbetrieb auf Sicherheitslücken gescannt?',
            '13. Sind externe Kunden-Chatbots transparent als KI gekennzeichnet (Art. 50)?',
            '14. Wurde der Betriebsrat gemäß § 87 Abs. 1 Nr. 6 BetrVG ordnungsgemäß beteiligt?',
            '15. Sind HR-Systeme frei von unkontrollierter automatisierter Ablehnung von Bewerbern?',
            '16. Ist eine Incident-Response-Prozedur für fehlerhafte KI-Ausgaben definiert?',
            '17. Werden Prompt-Verläufe für kritische Unternehmensentscheidungen revisionssicher protokolliert?',
            '18. Wurde ein interner KI-Koordinator als Ansprechpartner benannt?',
            '19. Werden Förderanträge vor Beginn von Beratungs- und Trainingsmaßnahmen geprüft?',
            '20. Erfolgt ein halbjährliches Management-Review des KI-Verzeichnisses und der ROI-Kennzahlen?',
          ],
        },
        {
          id: 'toolkit-fazit-kontakt',
          part: 'Teil V',
          partTitle: 'Implementierung & Governance',
          number: 'Kapitel 20',
          title: 'Fazit, Glossar & Autorenkontakt',
          pages: 'S. 38',
          summary: 'Der Schritt zum AI-First-Mittelständler, Begriffserläuterungen und KIVENTIS Ansprechpartner.',
          contentHtml: `
            <p class="mb-4 text-xs sm:text-sm text-slate-300">
              Der Übergang zum <strong>„AI-First KMU“</strong> ist kein monolithisches IT-Großprojekt, sondern eine Abfolge konkreter, pragmatischer Schritte. Unternehmen, die jetzt Mitarbeiter befähigen, Governance etablieren und Prozesse modular automatisieren, sichern sich auf Jahre hinaus operative Kosten- und Geschwindigkeitsvorteile.
            </p>
            <h4 class="font-bold text-white text-sm mb-2">Herausgeber &amp; Umsetzungsbegleitung:</h4>
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-1.5">
              <div class="text-white font-bold text-sm">KIVENTIS · ERP and Marketing Solutions LLC</div>
              <div class="text-teal-300 font-mono text-[11px]">25 Jahre Business &amp; ERP Prozess Consulting · Über 250 erfolgreich umgesetzte ERP-Projekte</div>
              <div class="text-slate-400">Kunden aus 40 Branchen in Europa und Southeast Asia · Spezialisiert auf Workflowanbindung inklusive CRM, Supply Chain und Produktion.</div>
              <div class="pt-1">Web: <a href="https://kiventis.com" class="text-teal-400 underline" target="_blank" rel="noopener noreferrer">kiventis.com</a> · E-Mail: <a href="mailto:Kontakt@kiventis.com" class="text-teal-400 underline">Kontakt@kiventis.com</a></div>
            </div>
          `,
        },
      ],
    },
  ],
};

// Flat list of all 21 chapters for easy reader indexing
export const allLeitfadenChapters: LeitfadenChapter[] = kmuLeitfadenDe.parts.flatMap((p) => p.chapters);
