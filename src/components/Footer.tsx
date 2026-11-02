import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* Top Strip: Brand & Helpline 1930 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {t.brandName}
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 ml-2">
                · {t.brandTagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-teal-900 dark:text-teal-200 text-xs sm:text-sm font-semibold">
            <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
            <span>National Cyber Crime Helpline: 1930 (24x7 Toll-Free)</span>
          </div>
        </div>

        {/* Official Resources Links Grid */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
            {t.officialResources}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
            >
              <span className="font-medium">{t.cyberPortalLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://www.mca.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
            >
              <span className="font-medium">{t.mcaLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://sachet.rbi.org.in"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
            >
              <span className="font-medium">{t.rbiSachetLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://sancharsaathi.gov.in"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
            >
              <span className="font-medium">{t.traiChakshuLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Mandatory Legal & Operational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{t.footerDisclaimer}</p>
        </div>

        {/* Copyright */}
        <div className="pt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>{t.copyrightText} · 2026</p>
        </div>

      </div>
    </footer>
  );
};
