import { Language } from '../types';

const STORAGE_KEY = 'kiventis_lang';
const MANUAL_OVERRIDE_KEY = 'kiventis_lang_manual';

/**
 * DACH Country codes:
 * DE = Germany (Deutschland)
 * AT = Austria (Österreich)
 * CH = Switzerland (Schweiz)
 * LI = Liechtenstein
 */
export const DACH_COUNTRIES = ['DE', 'AT', 'CH', 'LI'];

/**
 * Synchronous initial language detection:
 * 1. Checks URL query param (?lang=en or ?lang=de)
 * 2. Checks saved user preference in localStorage
 * 3. Checks browser navigator.language / navigator.languages
 * 4. Checks browser timezone (Intl.DateTimeFormat)
 *
 * If outside DACH (or non-German browser), returns 'en'.
 * Otherwise returns 'de'.
 */
export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'de';
  }

  // 1. URL Query Parameter override (?lang=en or ?lang=de)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang')?.toLowerCase();
    if (paramLang === 'en' || paramLang === 'de') {
      persistLanguage(paramLang as Language, true);
      return paramLang as Language;
    }
  } catch (e) {
    // Ignore URL parsing errors
  }

  // 2. Saved user preference in localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === 'de' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    // LocalStorage might be restricted
  }

  // 3. Browser locale heuristic
  try {
    const userLanguages =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || ''];

    const primaryLang = (userLanguages[0] || '').toLowerCase();
    const isPrimaryGerman = primaryLang.startsWith('de');

    // 4. Timezone heuristic: Europe/Berlin, Europe/Vienna, Europe/Zurich, Europe/Busingen
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const isDachTimeZone =
      timeZone.includes('Berlin') ||
      timeZone.includes('Vienna') ||
      timeZone.includes('Zurich') ||
      timeZone.includes('Busingen');

    // If primary language is clearly NOT German and timezone is NOT in DACH, start with 'en'
    if (!isPrimaryGerman && !isDachTimeZone) {
      return 'en';
    }

    if (isPrimaryGerman) {
      return 'de';
    }
  } catch (e) {
    // Fallback if APIs are restricted
  }

  return 'de';
}

/**
 * Persists the language choice in localStorage.
 * If manual=true, marks it as an explicit user choice that shouldn't be overridden by auto-geo.
 */
export function persistLanguage(lang: Language, manual = true): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
    if (manual) {
      localStorage.setItem(MANUAL_OVERRIDE_KEY, 'true');
    }
  } catch (e) {}
}

/**
 * Asynchronous Geo-IP detection:
 * Fetches the visitor's country from a fast, privacy-friendly geo lookup.
 * If the country is outside DACH (not DE, AT, or CH), automatically switches to 'en'.
 * If within DACH, ensures 'de' is selected.
 * Does not override if user has explicitly chosen a language in the UI.
 */
export async function detectGeoLanguage(
  onLanguageDetected: (lang: Language, countryCode?: string) => void
): Promise<void> {
  if (typeof window === 'undefined') return;

  // If user has already made an explicit manual choice, do not override
  try {
    const isManual = localStorage.getItem(MANUAL_OVERRIDE_KEY);
    if (isManual === 'true') {
      return;
    }
  } catch (e) {}

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch('https://api.country.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const country = (data.country || '').toUpperCase();

      if (country) {
        const isDach = DACH_COUNTRIES.includes(country);
        const resolvedLang: Language = isDach ? 'de' : 'en';

        persistLanguage(resolvedLang, false);
        onLanguageDetected(resolvedLang, country);
      }
    }
  } catch (e) {
    // Graceful fallback if geo API is offline or blocked by ad-blocker
  }
}
