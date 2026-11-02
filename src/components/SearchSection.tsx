import React, { useState } from 'react';
import { Search, Phone, CreditCard, Building2, Globe, Shield, ArrowRight } from 'lucide-react';
import { IdentifierType, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SearchSectionProps {
  onSearch: (query: string, type: IdentifierType) => void;
  lang: Language;
  initialQuery?: string;
  initialType?: IdentifierType;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  lang,
  initialQuery = '',
  initialType = 'all',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<IdentifierType>(initialType);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), selectedType);
    }
  };

  const handleQuickDemo = (demoQuery: string, type: IdentifierType) => {
    setQuery(demoQuery);
    setSelectedType(type);
    onSearch(demoQuery, type);
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-8 md:pt-10 md:pb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
          {t.heroHeadline}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubhead}
        </p>
      </div>

      {/* Main Search Box */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 sm:p-2.5 transition-shadow hover:shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          {/* Dropdown Type Select */}
          <div className="relative shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as IdentifierType)}
              className="w-full sm:w-auto appearance-none bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-xl px-4 py-3 pr-8 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-colors cursor-pointer"
            >
              <option value="all">{t.typeAll}</option>
              <option value="phone">{t.typePhone}</option>
              <option value="upi">{t.typeUPI}</option>
              <option value="company">{t.typeCompany}</option>
              <option value="website">{t.typeWebsite}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Text Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm sm:text-base rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>{t.searchButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Demo sample search recommendations */}
      <div className="max-w-3xl mx-auto mt-4 px-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-teal-600" />
          {t.popularSearches}
        </span>
        <button
          onClick={() => handleQuickDemo('+91 99990 00011', 'phone')}
          className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline cursor-pointer transition-colors"
        >
          +91 99990 00011 (High Risk)
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => handleQuickDemo('quickearn.rewards88@fakepay', 'upi')}
          className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline cursor-pointer transition-colors"
        >
          quickearn.rewards88@fakepay
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => handleQuickDemo('NovaSphere Global', 'company')}
          className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline cursor-pointer transition-colors"
        >
          NovaSphere (Fake Ltd)
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => handleQuickDemo('9888000022', 'phone')}
          className="hover:text-teal-700 dark:hover:text-teal-400 hover:underline cursor-pointer transition-colors"
        >
          9888000022 (1 report)
        </button>
      </div>
    </div>
  );
};
