import React, { useState } from 'react';
import { 
  Building, 
  Briefcase, 
  PhoneCall, 
  Mail, 
  ShieldX, 
  CheckCircle2, 
  ExternalLink,
  CheckSquare,
  Square,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface VerifyGuideProps {
  lang: Language;
  onOpenReportModal: () => void;
  onSearchCompany: (name: string) => void;
}

export const VerifyGuide: React.FC<VerifyGuideProps> = ({
  lang,
  onOpenReportModal,
  onSearchCompany,
}) => {
  const t = TRANSLATIONS[lang];

  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleCheck = (stepId: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const steps = [
    {
      id: 1,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: <Building className="w-6 h-6 text-teal-700 dark:text-teal-400" />,
      actionText: t.step1Action,
      actionUrl: 'https://www.mca.gov.in/mcafoportal/companyLLPMasterData.do',
      tipEn: 'Search the CIN (Corporate Identification Number) or exact company name. Ensure the company status is "Active", registered with RoC, and not strike-off.',
      tipHi: 'कंपनी का नाम या CIN दर्ज करें। सुनिश्चित करें कि कंपनी की स्थिति "Active" है और RoC के साथ पंजीकृत है।',
    },
    {
      id: 2,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: <Briefcase className="w-6 h-6 text-teal-700 dark:text-teal-400" />,
      actionText: t.step2Action,
      tipEn: 'Type the company domain directly into your browser (e.g. company.com/careers). Search the exact Job ID. If the vacancy is not listed on their official portal, do not trust WhatsApp recruiters.',
      tipHi: 'ब्राउज़र में सीधे कंपनी की आधिकारिक वेबसाइट (company.com/careers) खोलें और जॉब आईडी खोजें। अगर पद वहाँ नहीं है, तो व्हाट्सएप पर विश्वास न करें।',
    },
    {
      id: 3,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: <PhoneCall className="w-6 h-6 text-teal-700 dark:text-teal-400" />,
      actionText: t.step3Action,
      tipEn: 'Scammers use disposable SIM cards. Find the official corporate landline or headquarters number from the official website footer, call reception, and ask: "Is [Recruiter Name] an authorized employee in your HR team?"',
      tipHi: 'आधिकारिक वेबसाइट पर दिए गए रिसेप्शन या बोर्ड नंबर पर कॉल करें और पूछें कि क्या यह व्यक्ति वास्तव में उनकी एचआर टीम में कार्यरत है।',
    },
    {
      id: 4,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: <Mail className="w-6 h-6 text-teal-700 dark:text-teal-400" />,
      actionText: t.step4Action,
      tipEn: 'No Fortune 500 or verified Indian IT firm recruits through @gmail.com or @outlook.com. Beware of lookalike domains (e.g. @infosys-careers.org instead of @infosys.com).',
      tipHi: 'कोई भी प्रतिष्ठित कंपनी कभी @gmail.com या @yahoo.com से ऑफ़र लेटर नहीं भेजती। मिलते-जुलते फ़र्ज़ी डोमेन नामों से सावधान रहें।',
    },
    {
      id: 5,
      title: t.step5Title,
      desc: t.step5Desc,
      icon: <ShieldX className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      actionText: t.step5Action,
      tipEn: 'Golden Rule of Indian Hiring: Employers pay YOU, you never pay the employer. Never pay laptop security deposits, medical certificate fees, or background verification charges. You NEVER enter a UPI PIN to receive money.',
      tipHi: 'भारतीय भर्ती का स्वर्णिम नियम: कंपनी आपको वेतन देती है, आप कंपनी को पैसे नहीं देते। पैसे पाने के लिए कभी यूपीआई पिन दर्ज न करें।',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center pt-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t.guideTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {t.guideSubtitle}
        </p>
      </div>

      {/* Interactive Verification Checklist Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <span>{t.interactiveChecklistTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.interactiveChecklistSubtitle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {checkedCount} of 5 verified
            </span>
          </div>
        </div>

        {/* 5 checklist rows */}
        <div className="space-y-2">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => toggleCheck(step.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                checkedItems[step.id]
                  ? 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900/60 text-teal-950 dark:text-teal-200'
                  : 'bg-slate-50/50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800'
              }`}
            >
              {checkedItems[step.id] ? (
                <CheckSquare className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-medium">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Score indicator */}
        <div className="pt-2">
          {checkedCount === 5 ? (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.checklistResultSafe}</span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.checklistResultWarning}</span>
            </div>
          )}
        </div>
      </div>

      {/* The 5 Detailed Step Cards */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3 transition-shadow hover:shadow-xs"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Pro Tip Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-750 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {lang === 'hi' ? 'महत्वपूर्ण सुझाव: ' : 'Verification Rule: '}
                </span>
                <span>{lang === 'hi' ? step.tipHi : step.tipEn}</span>
              </div>
            </div>

            {/* Step Action Button */}
            <div className="pt-1 flex items-center justify-between">
              {step.actionUrl ? (
                <a
                  href={step.actionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
                >
                  <span>{step.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-2xs uppercase tracking-wider font-semibold text-slate-400">
                  {step.actionText}
                </span>
              )}

              <button
                onClick={() => toggleCheck(step.id)}
                className="text-xs text-teal-700 dark:text-teal-400 hover:underline cursor-pointer font-medium"
              >
                {checkedItems[step.id]
                  ? (lang === 'hi' ? 'सत्यापित चिन्हित' : 'Marked Verified')
                  : (lang === 'hi' ? 'सत्यापित मार्क करें' : 'Mark as Verified')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to report */}
      <div className="bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 rounded-2xl p-6 text-center space-y-3">
        <h4 className="text-base font-bold text-teal-950 dark:text-teal-200">
          {lang === 'hi' ? 'क्या आपने किसी धोखाधड़ी को पकड़ा?' : 'Encountered a suspicious recruiter or fake company?'}
        </h4>
        <p className="text-xs sm:text-sm text-teal-800 dark:text-teal-300 max-w-lg mx-auto">
          {lang === 'hi'
            ? 'अपनी जानकारी दर्ज करें ताकि अन्य छात्रों और नौकरी चाहने वालों को बचाया जा सके। सबमिशन पूरी तरह गुमनाम है।'
            : 'Log the phone number, UPI ID, or company in CheckFirst. Your anonymous report alerts the next job seeker.'}
        </p>
        <button
          onClick={onOpenReportModal}
          className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <span>{t.navReport}</span>
        </button>
      </div>

    </div>
  );
};
