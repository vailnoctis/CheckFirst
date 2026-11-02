import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  FileSearch, 
  PlusCircle, 
  Calendar, 
  IndianRupee, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Language, ReportItem } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SearchResultViewProps {
  query: string;
  reports: ReportItem[];
  lang: Language;
  onOpenWarningCard: () => void;
  onCheckRedFlags: () => void;
  onReportIdentifier: (identifier: string) => void;
  onOpenVerifyGuide: () => void;
}

export const SearchResultView: React.FC<SearchResultViewProps> = ({
  query,
  reports,
  lang,
  onOpenWarningCard,
  onCheckRedFlags,
  onReportIdentifier,
  onOpenVerifyGuide,
}) => {
  const t = TRANSLATIONS[lang];
  const count = reports.length;

  const latestDate = reports.length > 0 
    ? [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date 
    : null;

  const totalLoss = reports.reduce((acc, curr) => acc + (curr.amountLost || 0), 0);

  const uniqueScamTypes = Array.from(new Set(reports.map(r => r.scamType)));

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-6">
      
      {/* Search Header Target */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            {lang === 'hi' ? 'खोजा गया विवरण' : 'Searched Identifier'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-all">
            {query}
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
            {count} {t.reportsFoundCount}
          </span>
        </div>
      </div>

      {/* RESULT STATE 1: Zero Reports */}
      {count === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-7 h-7 text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.noReportsTitle}
            </h3>
            <p className="text-amber-700 dark:text-amber-400 font-semibold text-sm sm:text-base mt-1 flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.noReportsNotice}</span>
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
            {t.noReportsAdvice}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onCheckRedFlags}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSearch className="w-4 h-4" />
              <span>{t.checkRedFlagsCTA}</span>
            </button>
            <button
              onClick={onOpenVerifyGuide}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.navVerifyGuide}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onReportIdentifier(query)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.reportThisCTA}</span>
            </button>
          </div>
        </div>
      )}

      {/* RESULT STATE 2: 1 Report (Caution / Reported once, be careful) */}
      {count === 1 && (
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-amber-900 dark:text-amber-200">
                  {t.singleReportTitle}
                </span>
              </div>
              <p className="text-amber-800 dark:text-amber-300 text-sm mt-0.5">
                {t.singleReportNotice}
              </p>
              {/* Mandatory disclaimer */}
              <p className="text-xs text-amber-700/90 dark:text-amber-400 font-medium mt-2">
                ⚠️ {t.mandatoryDisclaimer}
              </p>
            </div>
          </div>

          {/* Quick actions for 1 report */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenWarningCard}
              className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadCardCTA}</span>
            </button>
            <button
              onClick={() => onReportIdentifier(query)}
              className="px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-800 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.reportThisCTA}</span>
            </button>
          </div>
        </div>
      )}

      {/* RESULT STATE 3: 2 or More Reports (High risk) */}
      {count >= 2 && (
        <div className="bg-red-50/70 dark:bg-red-950/25 border border-red-200 dark:border-red-900/40 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-red-900 dark:text-red-200">
                  {t.highRiskTitle}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-red-200/80 dark:bg-red-900/60 text-red-800 dark:text-red-200 font-semibold">
                  {count} Reports
                </span>
              </div>
              <p className="text-red-800 dark:text-red-300 text-sm mt-0.5">
                {t.highRiskNotice}
              </p>
              {/* Mandatory disclaimer */}
              <p className="text-xs text-red-700/90 dark:text-red-400 font-semibold mt-2">
                ⚠️ {t.mandatoryDisclaimer}
              </p>
            </div>
          </div>

          {/* Quick actions for high risk */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenWarningCard}
              className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadCardCTA}</span>
            </button>
            <button
              onClick={() => onReportIdentifier(query)}
              className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-800 hover:bg-red-100/60 dark:hover:bg-red-900/30 text-red-900 dark:text-red-200 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.reportThisCTA}</span>
            </button>
          </div>
        </div>
      )}

      {/* Summary strip if reports exist */}
      {count > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{t.latestReported}:</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {latestDate}
            </span>
          </div>

          {totalLoss > 0 && (
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-rose-500" />
              <span>{t.totalLossReported}:</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                ₹{totalLoss.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span>{t.scamTypesInvolved}:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {uniqueScamTypes.join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* Individual Reports Listing */}
      {count > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{t.viewAllReports}</span>
            <span className="text-xs font-normal text-slate-500">
              ({count} {count === 1 ? 'entry' : 'entries'})
            </span>
          </h3>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-2.5 transition-shadow hover:shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{report.date}</span>
                    {report.city && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {report.city}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {report.isDemo && (
                      <span className="text-2xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded font-medium">
                        {t.demoSampleBadge}
                      </span>
                    )}
                    <span className="text-2xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded">
                      {report.scamType}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                  {report.description}
                </p>

                {report.amountLost !== undefined && report.amountLost > 0 && (
                  <div className="pt-1 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="text-rose-600 font-semibold">{t.amountLostLabel}</span>
                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                      ₹{report.amountLost.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer of reports: Always repeat mandatory disclaimer */}
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
            {t.mandatoryDisclaimer}
          </p>
        </div>
      )}

    </div>
  );
};
