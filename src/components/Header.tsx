import React from 'react';
import { ShieldCheck, Moon, Sun, PlusCircle, Globe } from 'lucide-react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onOpenReportModal,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element, no pills or tickers) */}
        <button
          onClick={() => onTabChange('search')}
          className="flex items-center gap-2.5 text-left text-teal-800 dark:text-teal-400 group cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-800 transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.brandName}
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onTabChange('search')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              currentTab === 'search'
                ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onTabChange('redflags')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              currentTab === 'redflags'
                ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navRedFlags}
          </button>
          <button
            onClick={() => onTabChange('verify')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
              currentTab === 'verify'
                ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navVerifyGuide}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Toggles */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.navReport}</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-xs font-medium">
        <button
          onClick={() => onTabChange('search')}
          className={`px-3 py-1.5 rounded-md cursor-pointer ${
            currentTab === 'search'
              ? 'bg-teal-700 text-white font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.navHome}
        </button>
        <button
          onClick={() => onTabChange('redflags')}
          className={`px-3 py-1.5 rounded-md cursor-pointer ${
            currentTab === 'redflags'
              ? 'bg-teal-700 text-white font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.navRedFlags}
        </button>
        <button
          onClick={() => onTabChange('verify')}
          className={`px-3 py-1.5 rounded-md cursor-pointer ${
            currentTab === 'verify'
              ? 'bg-teal-700 text-white font-semibold'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {t.navVerifyGuide}
        </button>
      </div>
    </header>
  );
};
