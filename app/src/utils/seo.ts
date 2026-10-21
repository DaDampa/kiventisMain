/**
 * SEO & GEO (Generative Engine Optimization) Manager
 * Handles dynamic Title, Meta Tags, Canonical links, and Schema.org JSON-LD injection
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  schema?: object;
}

export function updatePageMeta(meta: PageMeta) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = meta.title;

  // Meta Description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.description);

  // Canonical Link
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', meta.canonical);

  // OpenGraph Tags
  const setOgTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setOgTag('og:title', meta.title);
  setOgTag('og:description', meta.description);
  setOgTag('og:url', meta.canonical);
  setOgTag('og:type', meta.ogType || 'website');

  // Dynamic Schema.org JSON-LD tag for the current route
  if (meta.schema) {
    let schemaTag = document.getElementById('dynamic-page-schema');
    if (!schemaTag) {
      schemaTag = document.createElement('script');
      schemaTag.setAttribute('type', 'application/ld+json');
      schemaTag.setAttribute('id', 'dynamic-page-schema');
      document.head.appendChild(schemaTag);
    }
    schemaTag.textContent = JSON.stringify(meta.schema);
  }
}
