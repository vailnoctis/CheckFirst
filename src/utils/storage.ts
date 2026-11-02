import { ReportItem, Language, Theme } from '../types';
import { INITIAL_DEMO_REPORTS } from '../data/demoReports';

const REPORTS_KEY = 'checkfirst_user_reports_v1';
const LANG_KEY = 'checkfirst_language';
const THEME_KEY = 'checkfirst_theme';

export function getStoredReports(): ReportItem[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    if (!raw) {
      return INITIAL_DEMO_REPORTS;
    }
    const userReports: ReportItem[] = JSON.parse(raw);
    // Merge user reports with demo reports, user reports first
    return [...userReports, ...INITIAL_DEMO_REPORTS];
  } catch (e) {
    console.error('Failed to read reports from localStorage', e);
    return INITIAL_DEMO_REPORTS;
  }
}

export function saveUserReport(report: ReportItem): ReportItem[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    const existing: ReportItem[] = raw ? JSON.parse(raw) : [];
    const updated = [report, ...existing];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
    return [...updated, ...INITIAL_DEMO_REPORTS];
  } catch (e) {
    console.error('Failed to save report to localStorage', e);
    return [report, ...INITIAL_DEMO_REPORTS];
  }
}

export function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'hi') return stored;
  } catch {}
  return 'en';
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {}
  return 'light';
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {}
}
