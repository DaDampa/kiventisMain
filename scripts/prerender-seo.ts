/**
 * Statisches Prerendering der SEO-/GEO-relevanten Routen.
 *
 * Problem: kiventis.com ist eine reine Client-Side-SPA (Vite + React). Alle Routen
 * liefern dieselbe index.html aus; Inhalte entstehen erst durch JavaScript. KI-Crawler
 * (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) fuehren kein JavaScript aus und
 * sehen daher fuer /beispiele, /ai-act-audit und die Blogartikel weder eigenen Titel
 * noch eigene Inhalte.
 *
 * Loesung: Nach `vite build` kopiert dieses Skript die gebaute index.html pro Route
 * nach dist/<route>/index.html und ersetzt darin:
 *   - <title>, meta description, canonical/hreflang
 *   - OpenGraph- und Twitter-Tags
 *   - den SEO:STATIC-Block (crawlbarer Textinhalt)
 *   - den SEO:ROUTE-JSONLD-Marker (BreadcrumbList + Seitentyp)
 * Die React-App uebernimmt danach unveraendert im Browser (nginx liefert
 * dist/<route>/index.html dank `try_files $uri $uri/ /index.html` aus).
 *
 * Wird ueber `npm run build` (nach vite build) via tsx ausgefuehrt.
 * Das Skript ist fehlertolerant: Probleme einzelner Routen brechen den Build nicht ab,
 * sie werden als Warnung gemeldet.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { articlesDe } from '../src/data/articles';
import type { InsightArticle } from '../src/types';
import { landings } from '../src/data/landings';
import type { LandingSpec } from '../src/data/landings';

const SITE = 'https://www.kiventis.com';
const DIST = resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = join(DIST, 'index.html');
const BUILD_DATE = process.env.SEO_BUILD_DATE ?? new Date().toISOString().slice(0, 10);

interface RouteSpec {
  /** Pfad ohne fuehrenden Slash, z. B. "beispiele/bom-designer" ("" = Startseite) */
  route: string;
  title: string;
  description: string;
  ogType: 'website' | 'article';
  /** Sichtbare Ueberschrift der statischen Ansicht */
  h1: string;
  /** Einleitender Absatz */
  lead: string;
  /** Weitere semantische Bloecke (H2 + Inhalt) */
  blocks: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  /** Zusaetzliches JSON-LD fuer diese Route */
  schema: object;
  /** Brotkrumen fuer sichtbare Navigation + BreadcrumbList */
  breadcrumb: { name: string; item: string }[];
}

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const articleUrl = (id: string): string => `${SITE}/blog/${id}`;

/** Blogartikel -> RouteSpec. Inhalte stammen 1:1 aus src/data/articles.ts (keine Erfindungen). */
function articleRoute(a: InsightArticle): RouteSpec {
  const blocks: RouteSpec['blocks'] = [
    {
      heading: 'Kernaussagen',
      bullets: a.keyTakeaways,
    },
  ];

  for (const section of a.sections ?? []) {
    blocks.push({
      heading: section.heading,
      paragraphs: section.paragraphs,
      bullets: section.callout ? [section.callout] : undefined,
    });
  }

  return {
    route: `blog/${a.id}`,
    title: `${a.title} · KIVENTIS`,
    description: a.excerpt,
    ogType: 'article',
    h1: a.title,
    lead: a.excerpt,
    blocks,
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: 'Insights & Blog', item: `${SITE}/#insights` },
      { name: a.categoryLabel, item: articleUrl(a.id) },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.excerpt,
      inLanguage: 'de-DE',
      datePublished: '2026-09-01T08:00:00+02:00',
      dateModified: `${BUILD_DATE}T00:00:00+02:00`,
      author: {
        '@type': 'Person',
        name: a.author.name,
        jobTitle: a.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'KIVENTIS',
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
      },
      mainEntityOfPage: articleUrl(a.id),
      keywords: a.tags.join(', '),
      citation: a.citation,
    },
  };
}

/** Handgepflegte statische Routen (Seitentypen, die nicht aus articles.ts stammen). */
const staticRoutes: RouteSpec[] = [
  {
    route: 'beispiele',
    title: 'Kunden-Demos & Vibe Coding Werkzeuge (MOK-Daten) · KIVENTIS',
    description:
      'Testen Sie live im Browser operative B2B-Hilfstools (BOM-Designer, Rechnungsprüfer, Zolltarif-Klassifikator), die von Mittelstands-Fachexperten per Vibe Coding gebaut wurden.',
    ogType: 'website',
    h1: 'Interaktive Kunden-Demos & Vibe Coding Werkzeuge',
    lead:
      'Operative B2B-Hilfsanwendungen aus der Praxis, die von Fachbereichen im Mittelstand per Vibe Coding erstellt wurden — direkt im Browser testbar, ohne Installation und ohne Programmierkenntnisse.',
    blocks: [
      {
        heading: 'Verfügbare Werkzeuge',
        bullets: [
          'BOM-Designer Pro — Baukasten- und Stücklistenkalkulation mit OData-REST-Export nach SAP S/4HANA.',
          'ERP-Rechnungsprüfer & Diskrepanz-Radar — 3-Wege-Abgleich von Eingangsrechnungen gegen ERP-Bestellungen mit Toleranzprüfung.',
          'KI-Zolltarif- & Export-Klassifikator — semantische Zuordnung von HS-Zolltarifnummern.',
        ],
      },
      {
        heading: 'Warum diese Beispiele relevant sind',
        paragraphs: [
          'Interne Hilfstools dieser Art ersetzen in der Praxis häufig teure Spezialsoftware oder monatelange Entwicklungsprojekte: Der Fachexperte beschreibt die Logik in natürlicher Sprache, das Modell erzeugt die Anwendung, die IT-Leitung gibt Sicherheitsrahmen (Git-Governance, Docker-Sandbox, Read-Only-ERP-APIs) vor.',
        ],
      },
    ],
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: 'Live-Demos', item: `${SITE}/beispiele` },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kiventis Kunden-Werkzeuge & Vibe Coding Showcases',
      description: 'Operative Kundenanwendungen mit MOK-Daten aus der Praxis.',
      url: `${SITE}/beispiele`,
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
  },
  {
    route: 'beispiele/bom-designer',
    title: 'BOM Designer Pro (Stücklisten & Baugruppen-Editor) · KIVENTIS Showcase',
    description:
      'Interaktive Baukasten- und Stücklistenkalkulation mit MOK-Industriedaten und OData REST ERP-Export nach SAP S/4HANA.',
    ogType: 'website',
    h1: 'BOM Designer Pro — Stücklisten- und Baugruppen-Editor',
    lead:
      'Interaktive Baukasten- und Stücklistenkalkulation mit MOK-Industriedaten und OData-REST-Export nach SAP S/4HANA. Die Anwendung zeigt, wie ein Stücklisten-Konfigurator für Fertigung und Maschinenbau ohne klassisches Entwicklungsprojekt entsteht.',
    blocks: [
      {
        heading: 'Funktionsumfang der Demo',
        bullets: [
          'Strukturierte Baugruppen- und Stücklistenverwaltung mit Mengen- und Positionslogik.',
          'Kalkulation auf Basis industrieller MOK-Datensätze.',
          'Export der Struktur über OData-REST-Schnittstellen in ERP-Systeme wie SAP S/4HANA.',
        ],
      },
      {
        heading: 'Einordnung',
        paragraphs: [
          'Solche Werkzeuge entstehen im Vibe-Coding-Ansatz in Stunden statt Monaten: Der Fachbereich beschreibt Baugruppenlogik und Kalkulationsregeln, das Modell erzeugt Datenmodell, Oberfläche und Schnittstellenanbindung. Die IT-Leitung gibt den Rahmen über Read-Only-ERP-APIs und Sandboxing vor.',
        ],
      },
    ],
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: 'Live-Demos', item: `${SITE}/beispiele` },
      { name: 'BOM Designer Pro', item: `${SITE}/beispiele/bom-designer` },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'BOM Designer Pro',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      description: 'Vibe-Coding Baukasten- und Stücklisten-Editor mit ERP-Export.',
      url: `${SITE}/beispiele/bom-designer`,
      isAccessibleForFree: true,
    },
  },
  {
    route: 'beispiele/rechnungspruefer',
    title: 'ERP Rechnungsprüfer & Diskrepanz-Radar · KIVENTIS Showcase',
    description:
      'Automatisierter 3-Wege-Abgleich von Eingangsrechnungen gegen ERP-Bestellungen mit Toleranzprüfung und Freigabe-Workflow.',
    ogType: 'website',
    h1: 'ERP Rechnungsprüfer & Diskrepanz-Radar',
    lead:
      'Automatisierter 3-Wege-Abgleich von Eingangsrechnungen gegen ERP-Bestellungen mit Toleranzprüfung und Freigabe-Workflow — ein Praxisbeispiel für Prozessautomatisierung im Einkauf.',
    blocks: [
      {
        heading: 'Funktionsumfang der Demo',
        bullets: [
          'Dreistufiger Abgleich: Bestellung, Wareneingang und Eingangsrechnung.',
          'Automatische Toleranzprüfung bei Mengen- und Preisabweichungen.',
          'Geführter Freigabe- und Klärungs-Workflow für Abweichfälle.',
        ],
      },
      {
        heading: 'Einordnung',
        paragraphs: [
          'Der 3-Wege-Abgleich ist ein typischer Kandidat für Prozessautomatisierung im Mittelstand: hohes Volumen, klar beschreibbare Regeln und direkter Bezug zu Kernsystemen wie SAP S/4HANA, Microsoft Dynamics 365, proALPHA, abas oder Infor.',
        ],
      },
    ],
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: 'Live-Demos', item: `${SITE}/beispiele` },
      { name: 'Rechnungsprüfer', item: `${SITE}/beispiele/rechnungspruefer` },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ERP Rechnungsprüfer',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      description: 'Automatisierter Abgleich von Eingangsrechnungen gegen ERP-Bestellungen.',
      url: `${SITE}/beispiele/rechnungspruefer`,
      isAccessibleForFree: true,
    },
  },
  {
    route: 'ai-act-audit',
    title: 'EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner für KMUs · KIVENTIS Audit',
    description:
      'Kostenloser interaktiver Compliance-Check nach Art. 4 Verordnung (EU) 2024/1689. Berechnen Sie das persönliche Geschäftsführer-Haftungsrisiko (§ 43 GmbHG) und behördliche Bußgelder bis zu 15 Mio. €.',
    ogType: 'website',
    h1: 'EU AI Act Art. 4 — Haftungs- und Bußgeld-Rechner für KMUs',
    lead:
      'Kostenloser interaktiver Compliance-Check zur Schulungspflicht nach Artikel 4 der Verordnung (EU) 2024/1689. Der Rechner hilft Geschäftsführung und IT-Leitung, das Haftungsrisiko einzuordnen und den Handlungsbedarf für das eigene Unternehmen zu bestimmen.',
    blocks: [
      {
        heading: 'Rechtlicher Hintergrund',
        paragraphs: [
          'Artikel 4 des EU AI Act (Verordnung (EU) 2024/1689) verpflichtet Anbieter und Betreiber von KI-Systemen seit dem 2. Februar 2025 sicherzustellen, dass ihr Personal über ein ausreichendes Maß an KI-Kompetenz verfügt. Die Pflicht gilt unabhängig von der Unternehmensgröße und trifft damit auch kleine und mittlere Unternehmen, die KI-Werkzeuge gewerblich einsetzen.',
          'Fehlende Nachweise können bei behördlichen Prüfungen oder Datenschutzvorfällen relevant werden. Das Bußgeldrahmenwerk der Verordnung reicht in den schwersten Fällen bis zu 15 Millionen Euro oder 3 % des weltweiten Jahresumsatzes; die Schulungspflicht nach Art. 4 ist davon zu unterscheiden und dient der nachweisbaren Befähigung der Beschäftigten.',
        ],
      },
      {
        heading: 'Was der Rechner abbildet',
        bullets: [
          'Erfassung der im Unternehmen eingesetzten KI-Werkzeuge und Nutzungsarten.',
          'Einordnung der betrieblichen Nutzung in die Risikologik der KI-Verordnung.',
          'Hinweise auf dokumentierte Schulungs- und Nachweispflichten nach Art. 4.',
        ],
      },
    ],
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: 'AI-Act-Audit', item: `${SITE}/ai-act-audit` },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Kiventis EU AI Act Art. 4 Haftungs- & Bußgeld-Rechner',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      description:
        'Interaktiver Compliance- und Haftungs-Rechner nach Art. 4 EU AI Act für den europäischen Mittelstand.',
      url: `${SITE}/ai-act-audit`,
      isAccessibleForFree: true,
      publisher: { '@type': 'Organization', name: 'KIVENTIS', url: SITE },
    },
  },
];

function renderStaticBlock(spec: RouteSpec): string {
  const crumbs = spec.breadcrumb
    .map((c, i) =>
      i === spec.breadcrumb.length - 1
        ? `<span aria-current="page">${esc(c.name)}</span>`
        : `<a href="${esc(c.item)}">${esc(c.name)}</a>`,
    )
    .join(' › ');

  const blocks = spec.blocks
    .map((b) => {
      const paras = (b.paragraphs ?? []).map((p) => `<p>${esc(p)}</p>`).join('\n          ');
      const bullets = (b.bullets ?? []).map((li) => `<li>${esc(li)}</li>`).join('\n            ');
      const ul = bullets ? `<ul>\n            ${bullets}\n          </ul>` : '';
      return `        <h2>${esc(b.heading)}</h2>
          ${paras}${paras && ul ? '\n          ' : ''}${ul}`;
    })
    .join('\n');

  return `<!-- SEO:STATIC -->
      <div id="seo-static">
        <p class="kicker">KIVENTIS · B2B KI-Enablement DACH &amp; APAC</p>
        <p class="nav">${crumbs}</p>
        <h1>${esc(spec.h1)}</h1>
        <p>${esc(spec.lead)}</p>
${blocks}
        <p class="nav">
          <a href="/">Startseite</a> ·
          <a href="/#services">Leistungen</a> ·
          <a href="/#cases">Erfolgsbeispiele</a> ·
          <a href="/#pricing">Preise</a> ·
          <a href="/#faq">FAQ &amp; AI Act</a> ·
          <a href="/beispiele">Live-Demos</a> ·
          <a href="/ai-act-audit">AI-Act-Audit</a> ·
          <a href="mailto:Kontakt@kiventis.com">Kontakt@kiventis.com</a>
        </p>
      </div>
      <!-- /SEO:STATIC -->`;
}

function renderRouteSchema(spec: RouteSpec): string {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: spec.breadcrumb.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
  return `<script type="application/ld+json">\n${JSON.stringify(
    breadcrumbList,
  )}\n    </script>\n    <script type="application/ld+json">\n${JSON.stringify(spec.schema)}\n    </script>`;
}

/** Ersetzt ein Tag-Attribut robust; gibt null zurueck, wenn das Muster fehlt. */
function replaceOnce(html: string, pattern: RegExp, replacement: string): string | null {
  if (!pattern.test(html)) return null;
  return html.replace(pattern, replacement);
}

function buildPage(template: string, spec: RouteSpec): string {
  const url = spec.route === '' ? `${SITE}/` : `${SITE}/${spec.route}`;
  let html = template;
  const warnings: string[] = [];

  const patch = (pattern: RegExp, replacement: string, label: string) => {
    const out = replaceOnce(html, pattern, replacement);
    if (out === null) warnings.push(label);
    else html = out;
  };

  patch(/<title>[\s\S]*?<\/title>/, `<title>${esc(spec.title)}</title>`, 'title');
  patch(
    /<meta name="title" content="[^"]*" \/>/,
    `<meta name="title" content="${esc(spec.title)}" />`,
    'meta:title',
  );
  patch(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${esc(spec.description)}" />`,
    'meta:description',
  );

  // Canonical + hreflang: Unterseiten sind deutschsprachig und selbstkanonisch.
  patch(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical',
  );
  patch(
    /(\n\s*<link rel="alternate" hreflang="de"[\s\S]*?<link rel="alternate" hreflang="x-default" href="[^"]*" \/>)/,
    `\n    <link rel="alternate" hreflang="de" href="${url}" />` +
      `\n    <link rel="alternate" hreflang="de-DE" href="${url}" />` +
      `\n    <link rel="alternate" hreflang="de-AT" href="${url}" />` +
      `\n    <link rel="alternate" hreflang="de-CH" href="${url}" />` +
      `\n    <link rel="alternate" hreflang="x-default" href="${url}" />`,
    'hreflang',
  );

  patch(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  patch(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${spec.ogType}" />`, 'og:type');
  patch(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(spec.title)}" />`,
    'og:title',
  );
  patch(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(spec.description)}" />`,
    'og:description',
  );
  patch(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`, 'twitter:url');
  patch(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(spec.title)}" />`,
    'twitter:title',
  );
  patch(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${esc(spec.description)}" />`,
    'twitter:description',
  );

  // Statischer Inhalt + routenspezifisches JSON-LD
  patch(/<!-- SEO:STATIC -->[\s\S]*?<!-- \/SEO:STATIC -->/, renderStaticBlock(spec), 'SEO:STATIC');
  patch(/<!-- SEO:ROUTE-JSONLD -->/, renderRouteSchema(spec), 'SEO:ROUTE-JSONLD');

  if (warnings.length) {
    console.warn(`  ! ${spec.route || '/'}: Marker nicht gefunden -> ${warnings.join(', ')}`);
  }
  return html;
}

/** Landingpage-Routen aus den Cluster-Content-Specs (DACH-Cluster). */
function landingRoute(l: LandingSpec): RouteSpec {
  const url = `${SITE}/${l.path}`;
  const short = l.h1.de.split(':')[0];
  return {
    route: l.path,
    title: `${l.h1.de} · KIVENTIS`,
    description: l.lead.de,
    ogType: 'website',
    h1: l.h1.de,
    lead: l.lead.de,
    blocks: [
      {
        heading: 'Leistungen',
        bullets: l.benefits.map((b) => `${b.title.de} — ${b.text.de}`),
      },
      {
        heading: 'Warum Kiventis',
        paragraphs: [
          'Kiventis ist ein auf den Mittelstand spezialisiertes Beratungs- und Implementierungshaus für KI und ERP-Automatisierung mit 25 Jahren ERP- & Prozessberatung und über 250 umgesetzten Projekten in DACH & APAC.',
        ],
      },
    ],
    breadcrumb: [
      { name: 'Startseite', item: `${SITE}/` },
      { name: short, item: url },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: l.h1.de,
      description: l.lead.de,
      serviceType: short,
      provider: { '@type': 'Organization', name: 'KIVENTIS', url: SITE },
      areaServed: ['DE', 'AT', 'CH', 'LI'],
      keywords: l.keywords.de,
      url,
    },
  };
}

function main(): void {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender-seo] FEHLER: ${TEMPLATE_PATH} fehlt (vite build zuerst ausfuehren).`);
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE_PATH, 'utf8');
  const specs: RouteSpec[] = [
    ...staticRoutes,
    ...landings.map(landingRoute),
    ...articlesDe.map(articleRoute),
  ];

  let written = 0;
  const seen = new Set<string>();

  for (const spec of specs) {
    if (seen.has(spec.route)) {
      console.warn(`[prerender-seo] doppelte Route uebersprungen: ${spec.route}`);
      continue;
    }
    seen.add(spec.route);

    try {
      const outPath = join(DIST, spec.route, 'index.html');
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, buildPage(template, spec), 'utf8');
      written += 1;
    } catch (err) {
      console.warn(`[prerender-seo] Route ${spec.route} uebersprungen: ${(err as Error).message}`);
    }
  }

  console.log(`[prerender-seo] ${written}/${specs.length} statische Routen erzeugt (Stand ${BUILD_DATE}).`);

  // E3: sitemap.xml automatisch aus allen Specs generieren (ersetzt manuelle Pflege)
  const homepageEntry = [
    '  <url>',
    `    <loc>${SITE}/</loc>`,
    `    <xhtml:link rel="alternate" hreflang="de" href="${SITE}/" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/?lang=en" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `    <lastmod>${BUILD_DATE}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
  ].join('\n');
  const sitemapUrls = specs.map((spec) => {
    const loc = spec.route ? `${SITE}/${spec.route}` : `${SITE}/`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${BUILD_DATE}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.8</priority>',
      '  </url>',
    ].join('\n');
  });
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    homepageEntry,
    ...sitemapUrls,
    '</urlset>',
    '',
  ].join('\n');
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`[prerender-seo] sitemap.xml mit ${sitemapUrls.length + 1} URLs erzeugt.`);
}

main();
