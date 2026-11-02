import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  Sparkles,
  Info
} from 'lucide-react';
import { Language, RedFlagResult } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { analyzeOfferText, SAMPLE_OFFER_TEMPLATES } from '../utils/redFlagEngine';

interface RedFlagCheckerProps {
  lang: Language;
  onSearchIdentifier: (query: string) => void;
  onOpenReportModal: () => void;
}

export const RedFlagChecker: React.FC<RedFlagCheckerProps> = ({
  lang,
  onSearchIdentifier,
  onOpenReportModal,
}) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<RedFlagResult | null>(null);
  const t = TRANSLATIONS[lang];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    const res = analyzeOfferText(inputText);
    setResult(res);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleApplySample = (sampleText: string) => {
    setInputText(sampleText);
    const res = analyzeOfferText(sampleText);
    setResult(res);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center pt-4 pb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t.checkerTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {t.checkerSubtitle}
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {lang === 'hi' ? 'ऑफ़र का टेक्स्ट यहाँ पेस्ट करें' : 'Paste Offer Message / Email / Chat'}
          </label>
          {inputText && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.clearButton}</span>
            </button>
          )}
        </div>

        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.pastePlaceholder}
          className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-600 transition-colors"
        />

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:hover:bg-teal-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>{t.analyzeButton}</span>
          </button>

          <span className="text-xs text-slate-400 text-center sm:text-right">
            {lang === 'hi' ? '100% प्राइवेट · कोई डेटा सर्वर पर नहीं भेजा जाता' : '100% Private · Zero data sent to servers'}
          </span>
        </div>

        {/* Quick Sample Selector */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            {t.trySampleLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_OFFER_TEMPLATES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleApplySample(sample.text)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                {lang === 'hi' ? sample.titleHi : sample.titleEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Result */}
      {result && (
        <div className="space-y-4">
          
          {/* Risk Level Banner */}
          <div
            className={`rounded-2xl p-6 border transition-colors ${
              result.score === 'high'
                ? 'bg-rose-50/80 dark:bg-rose-950/25 border-rose-200 dark:border-rose-900/40'
                : result.score === 'medium'
                ? 'bg-amber-50/80 dark:bg-amber-950/25 border-amber-200 dark:border-amber-900/40'
                : 'bg-emerald-50/80 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-900/40'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  result.score === 'high'
                    ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
                    : result.score === 'medium'
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                {result.score === 'high' ? (
                  <ShieldAlert className="w-6 h-6" />
                ) : result.score === 'medium' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-xl font-bold ${
                      result.score === 'high'
                        ? 'text-rose-900 dark:text-rose-200'
                        : result.score === 'medium'
                        ? 'text-amber-900 dark:text-amber-200'
                        : 'text-emerald-900 dark:text-emerald-200'
                    }`}
                  >
                    {result.score === 'high'
                      ? t.riskHigh
                      : result.score === 'medium'
                      ? t.riskMedium
                      : t.riskLow}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded font-semibold bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">
                    {result.flags.length} {t.flagsFoundCount}
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    result.score === 'high'
                      ? 'text-rose-800 dark:text-rose-300'
                      : result.score === 'medium'
                      ? 'text-amber-800 dark:text-amber-300'
                      : 'text-emerald-800 dark:text-emerald-300'
                  }`}
                >
                  {lang === 'hi' ? result.summaryHi : result.summaryEn}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Flags List */}
          {result.flags.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {lang === 'hi' ? 'पहचाने गए खतरे और स्पष्टीकरण' : 'Detected Red Flags & Explanations'}
              </h4>

              <div className="space-y-3">
                {result.flags.map((flag, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`w-4 h-4 ${
                            flag.severity === 'high' ? 'text-rose-600' : 'text-amber-600'
                          }`}
                        />
                        <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                          {lang === 'hi' ? flag.nameHi : flag.nameEn}
                        </span>
                      </div>
                      <span
                        className={`text-2xs font-semibold px-2 py-0.5 rounded ${
                          flag.severity === 'high'
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {flag.severity === 'high'
                          ? (lang === 'hi' ? 'उच्च जोखिम' : 'High Severity')
                          : (lang === 'hi' ? 'मध्यम जोखिम' : 'Medium Severity')}
                      </span>
                    </div>

                    {/* Matched snippet */}
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 text-xs font-mono text-slate-700 dark:text-slate-300 break-words">
                      <span className="text-slate-400 block font-sans text-2xs mb-0.5">
                        {t.snippetMatched}
                      </span>
                      &ldquo;{flag.snippetFound}&rdquo;
                    </div>

                    {/* Explanation */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'hi' ? flag.explanationHi : flag.explanationEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action strip */}
          <div className="bg-slate-100/70 dark:bg-slate-850 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-600 shrink-0" />
              {lang === 'hi'
                ? 'संदेश में उल्लिखित फ़ोन नंबर या कंपनी को हमारे डेटाबेस में भी खोजें।'
                : 'Also search the phone number or company mentioned in this offer.'}
            </span>
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              {t.navReport}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
