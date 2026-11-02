import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  PhoneCall, 
  Globe, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { IdentifierType, Language, ReportItem, ScamCategory } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { normalizeIdentifier } from '../utils/normalizer';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddReport: (report: ReportItem) => void;
  initialIdentifier?: string;
  onViewReport: (identifier: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  lang,
  onAddReport,
  initialIdentifier = '',
  onViewReport,
}) => {
  const t = TRANSLATIONS[lang];

  const [identifierType, setIdentifierType] = useState<IdentifierType>('phone');
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [scamType, setScamType] = useState('Fake Job Offer / Direct Selection');
  const [description, setDescription] = useState('');
  const [amountLost, setAmountLost] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [copiedComplaint, setCopiedComplaint] = useState(false);

  // Sync initialIdentifier when modal opens
  React.useEffect(() => {
    if (initialIdentifier) {
      setIdentifier(initialIdentifier);
      if (initialIdentifier.includes('@')) {
        setIdentifierType('upi');
      } else if (initialIdentifier.startsWith('http') || initialIdentifier.includes('.com') || initialIdentifier.includes('.org') || initialIdentifier.includes('.in')) {
        setIdentifierType('website');
      } else if (/^\+?91|^\d{10}$/.test(initialIdentifier.replace(/[\s-]/g, ''))) {
        setIdentifierType('phone');
      } else {
        setIdentifierType('company');
      }
    }
  }, [initialIdentifier, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !description.trim()) return;

    // Map scam type to category
    let scamCategory: ScamCategory = 'fake_job';
    if (scamType.includes('Task') || scamType.includes('YouTube')) scamCategory = 'part_time_task';
    else if (scamType.includes('Internship')) scamCategory = 'fake_internship';
    else if (scamType.includes('Fee') || scamType.includes('Advance')) scamCategory = 'advance_fee';
    else if (scamType.includes('UPI') || scamType.includes('QR')) scamCategory = 'upi_payment_fraud';
    else if (scamType.includes('HR') || scamType.includes('Impersonation')) scamCategory = 'fake_hr_impersonation';

    const cleanType = (identifierType === 'all' ? 'phone' : identifierType) as 'phone' | 'upi' | 'company' | 'website';

    const newReport: ReportItem = {
      id: 'user-' + Date.now(),
      identifier: identifier.trim(),
      normalizedIdentifier: normalizeIdentifier(identifier.trim(), cleanType),
      type: cleanType,
      scamCategory,
      scamType,
      description: description.trim(),
      amountLost: amountLost ? parseFloat(amountLost) : 0,
      date: new Date().toISOString().split('T')[0],
      city: city.trim() || undefined,
      isDemo: false,
    };

    onAddReport(newReport);
    setLastSubmittedId(newReport.identifier);
    setIsSubmitted(true);
  };

  const generateComplaintText = () => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `FORMAL CYBERCRIME COMPLAINT DRAFT
(For filing on National Cyber Crime Portal cybercrime.gov.in or calling Helpline 1930)

Date: ${today}
To: The Cyber Crime Cell / National Cyber Crime Reporting Portal

Subject: Complaint regarding suspected fraudulent activity / cyber employment scam

I wish to report a suspected cyber fraud incident with the following specific details:

1. Suspected Identifier / Channel: ${identifier} (Type: ${identifierType.toUpperCase()})
2. Category of Scam: ${scamType}
3. Location / City: ${city || 'Not specified'}
4. Financial Amount Lost: ₹${amountLost ? parseFloat(amountLost).toLocaleString('en-IN') : '0 (Prevented/No money paid)'}
5. Summary of Incident:
"${description}"

I request the authorities to register this matter, freeze associated accounts if applicable, and take preventive action to protect other citizens from this entity.

Submitted for appropriate action.`;
  };

  const handleCopyComplaint = () => {
    navigator.clipboard.writeText(generateComplaintText());
    setCopiedComplaint(true);
    setTimeout(() => setCopiedComplaint(false), 2500);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setIdentifier('');
    setDescription('');
    setAmountLost('');
    setCity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* Report Submission Form */
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.reportTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              {t.reportSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Identifier Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fieldIdentifierType} *
                  </label>
                  <select
                    value={identifierType}
                    onChange={(e) => setIdentifierType(e.target.value as IdentifierType)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="phone">{t.typePhone}</option>
                    <option value="upi">{t.typeUPI}</option>
                    <option value="company">{t.typeCompany}</option>
                    <option value="website">{t.typeWebsite}</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fieldIdentifier} *
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={t.fieldIdentifierPlaceholder}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Scam Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.fieldScamType} *
                </label>
                <select
                  value={scamType}
                  onChange={(e) => setScamType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Fake Job Offer / Direct Selection">Fake Job Offer / Direct Selection</option>
                  <option value="Part-time YouTube / Review Task Scam">Part-time YouTube / Review Task Scam</option>
                  <option value="Unpaid / Fee-charging Fake Internship">Unpaid / Fee-charging Fake Internship</option>
                  <option value="Advance Laptop / Uniform / ID Kit Deposit">Advance Laptop / Uniform / ID Kit Deposit</option>
                  <option value="UPI QR Code / Payment Refund Fraud">UPI QR Code / Payment Refund Fraud</option>
                  <option value="Fake HR Impersonation (@gmail address)">Fake HR Impersonation (@gmail address)</option>
                  <option value="Other Suspicious Online Fraud">Other Suspicious Online Fraud</option>
                </select>
              </div>

              {/* What happened */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.fieldDescription} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.fieldDescriptionPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Optional Amount Lost & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fieldAmountLost}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={amountLost}
                    onChange={(e) => setAmountLost(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fieldCity}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.fieldCityPlaceholder}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Anonymous reassurance */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
                <Lock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.anonNotice}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitReportButton}</span>
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE: Helpline 1930 + Ready-to-copy complaint */
          <div className="space-y-5 text-left py-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.reportSuccessTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {t.reportSuccessMessage}
                </p>
              </div>
            </div>

            {/* Official Indian Cybercrime Help Box */}
            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 space-y-2.5">
              <h4 className="text-sm font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                {t.helplineTitle}
              </h4>
              <div className="space-y-1.5 text-xs sm:text-sm text-teal-900 dark:text-teal-300">
                <div className="flex items-center gap-2 font-semibold">
                  <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{t.helplineNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-700 shrink-0" />
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-teal-600"
                  >
                    {t.helplinePortal}
                  </a>
                </div>
              </div>
            </div>

            {/* Ready to copy complaint draft */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {lang === 'hi' ? 'तैयार साइबर सेल शिकायत ड्राफ्ट' : 'Ready-to-File Cyber Complaint Draft'}
                </span>
                <span className="text-2xs text-slate-400">
                  {lang === 'hi' ? '1930 पर या पोर्टल पर उपयोग हेतु' : 'For 1930 / cybercrime.gov.in'}
                </span>
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 max-h-40 overflow-y-auto whitespace-pre-line leading-relaxed">
                {generateComplaintText()}
              </div>

              <button
                onClick={handleCopyComplaint}
                className="w-full py-2.5 rounded-xl border border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedComplaint ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">{t.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyComplaintBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* View Updated Report in Search */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  onViewReport(lastSubmittedId);
                  handleResetAndClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.viewUpdatedReportBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {t.closeModal}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
