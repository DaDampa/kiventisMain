import { Theme } from '../types';

export const NIGHT_START_HOUR = 20; // 20:00
export const NIGHT_END_HOUR = 7;    // 07:00

export type ThemeMode = 'auto' | 'manual';

/**
 * Calculates the active theme according to the daily schedule:
 * - Daytime (07:00 to 19:59:59): 'sepia'
 * - Nighttime (20:00 to 06:59:59): 'dark'
 */
export function getScheduledTheme(date: Date = new Date()): Theme {
  const hour = date.getHours();
  if (hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR) {
    return 'dark';
  }
  return 'sepia';
}

/**
 * Initializes the theme state from localStorage, defaulting to the time-based schedule ('auto').
 */
export function getInitialThemeState(): { theme: Theme; mode: ThemeMode } {
  if (typeof window === 'undefined') {
    return { theme: getScheduledTheme(), mode: 'auto' };
  }

  try {
    const savedMode = localStorage.getItem('kiventis_theme_mode') as ThemeMode | null;
    const savedTheme = localStorage.getItem('kiventis_theme') as Theme | null;

    if (savedMode === 'manual' && (savedTheme === 'sepia' || savedTheme === 'dark')) {
      return { theme: savedTheme, mode: 'manual' };
    }
  } catch {
    // Gracefully handle restricted iframe storage policies
  }

  return { theme: getScheduledTheme(), mode: 'auto' };
}

/**
 * Persists user preference to localStorage
 */
export function persistThemeState(theme: Theme, mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('kiventis_theme_mode', mode);
    localStorage.setItem('kiventis_theme', theme);
  } catch {
    // Ignore restricted iframe storage
  }
}
