import React, { useState, useEffect } from 'react';
import { 
  IdentifierType, 
  Language, 
  ReportItem, 
  Theme 
} from './types';
import { 
  getStoredReports, 
  saveUserReport, 
  getStoredLanguage, 
  setStoredLanguage, 
  getStoredTheme, 
  setStoredTheme 
} from './utils/storage';
import { matchesQuery } from './utils/normalizer';
import { Header } from './components/Header';
import { SearchSection } from './components/SearchSection';
import { SearchResultView } from './components/SearchResultView';
import { RedFlagChecker } from './components/RedFlagChecker';
import { VerifyGuide } from './components/VerifyGuide';
import { ReportModal } from './components/ReportModal';
import { WarningCardModal } from './components/WarningCardModal';
import { Footer } from './components/Footer';
import { ShieldAlert, Users, Award, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from './i18n/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'search' | 'redflags' | 'verify'>('search');
  const [lang, setLang] = useState<Language>(getStoredLanguage);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  // Reports state
  const [reports, setReports] = useState<ReportItem[]>(getStoredReports);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<IdentifierType>('all');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<ReportItem[]>([]);

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalIdentifier, setReportModalIdentifier] = useState('');
  const [isWarningCardOpen, setIsWarningCardOpen] = useState(false);

  // Initialize theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    setStoredLanguage(nextLang);
  };

  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
  };

  const executeSearch = (query: string, type: IdentifierType) => {
    setSearchQuery(query);
    setSearchType(type);
    setCurrentTab('search');

    const matched = reports.filter((item) =>
      matchesQuery(item.identifier, item.type, query, type)
    );

    // Sort by date descending
    matched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setSearchResults(matched);
    setHasSearched(true);
  };

  const handleAddReport = (newReport: ReportItem) => {
    const updated = saveUserReport(newReport);
    setReports(updated);

    // If currently searching this identifier, refresh results immediately
    if (hasSearched && matchesQuery(newReport.identifier, newReport.type, searchQuery, searchType)) {
      const matched = updated.filter((item) =>
        matchesQuery(item.identifier, item.type, searchQuery, searchType)
      );
      matched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSearchResults(matched);
    }
  };

  const handleOpenReportForIdentifier = (identifier: string) => {
    setReportModalIdentifier(identifier);
    setIsReportModalOpen(true);
  };

  const handleViewSubmittedReport = (identifier: string) => {
    executeSearch(identifier, 'all');
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab as any)}
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenReportModal={() => {
          setReportModalIdentifier('');
          setIsReportModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        
        {/* TAB 1: Search Database */}
        {currentTab === 'search' && (
          <div className="space-y-8">
            <SearchSection
              onSearch={executeSearch}
              lang={lang}
              initialQuery={searchQuery}
              initialType={searchType}
            />

            {/* If searched, display result view */}
            {hasSearched && (
              <SearchResultView
                query={searchQuery}
                reports={searchResults}
                lang={lang}
                onOpenWarningCard={() => setIsWarningCardOpen(true)}
                onCheckRedFlags={() => setCurrentTab('redflags')}
                onReportIdentifier={handleOpenReportForIdentifier}
                onOpenVerifyGuide={() => setCurrentTab('verify')}
              />
            )}

            {/* Informative Value Cards Strip (When not searching or below search) */}
            {!hasSearched && (
              <div className="pt-10 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-700 dark:text-teal-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {lang === 'hi' ? 'कम्युनिटी-संचालित डेटाबेस' : 'Community-Powered'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'भारत भर के वास्तविक छात्रों और नागरिकों द्वारा साझा की गई रिपोर्टें। बिना किसी अनुमान के प्रत्यक्ष अनुभव।'
                        : 'Real reports logged by job seekers and students across India. Grounded evidence, not AI guesses.'}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {lang === 'hi' ? 'सटीक खोज सामान्यीकरण' : 'Smart Normalization'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'खोज स्वचालित रूप से +91, स्पेस, डैश और बड़े अक्षरों को नज़रअंदाज़ करती है ताकि कोई भी नंबर न छूटे।'
                        : 'Search automatically strips +91, spaces, dashes, and casing so slight formatting never hides a reported number.'}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {lang === 'hi' ? '100% गुमनाम रिपोर्टिंग' : '100% Anonymous'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'hi'
                        ? 'कोई पंजीकरण आवश्यक नहीं। रिपोर्ट करने के बाद तुरंत 1930 हेतु तैयार शिकायत पत्र प्राप्त करें।'
                        : 'Zero personal data stored. Instantly generates a pre-formatted complaint for 1930 / cybercrime.gov.in.'}
                    </p>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Red Flag Checker */}
        {currentTab === 'redflags' && (
          <RedFlagChecker
            lang={lang}
            onSearchIdentifier={(id) => {
              executeSearch(id, 'all');
            }}
            onOpenReportModal={() => {
              setReportModalIdentifier('');
              setIsReportModalOpen(true);
            }}
          />
        )}

        {/* TAB 3: 5-Step Verify Guide */}
        {currentTab === 'verify' && (
          <VerifyGuide
            lang={lang}
            onOpenReportModal={() => {
              setReportModalIdentifier('');
              setIsReportModalOpen(true);
            }}
            onSearchCompany={(name) => {
              executeSearch(name, 'company');
            }}
          />
        )}

      </main>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        lang={lang}
        onAddReport={handleAddReport}
        initialIdentifier={reportModalIdentifier}
        onViewReport={handleViewSubmittedReport}
      />

      {/* Warning Card Modal */}
      <WarningCardModal
        isOpen={isWarningCardOpen}
        onClose={() => setIsWarningCardOpen(false)}
        identifier={searchQuery}
        reports={searchResults}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />

    </div>
  );
}
