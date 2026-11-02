import React, { useRef, useEffect } from 'react';
import { Download, X, Copy, Check, ShieldAlert } from 'lucide-react';
import { Language, ReportItem } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface WarningCardModalProps {
  identifier: string;
  reports: ReportItem[];
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const WarningCardModal: React.FC<WarningCardModalProps> = ({
  identifier,
  reports,
  lang,
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = React.useState(false);
  const t = TRANSLATIONS[lang];

  const reportCount = reports.length;
  const latestDate = reports.length > 0 ? reports[0].date : new Date().toISOString().split('T')[0];
  const scamTypes = Array.from(new Set(reports.map(r => r.scamType))).join(', ') || 'Online Job / Payment Fraud';

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set 2x canvas size for retina crispness
    const width = 1000;
    const height = 580;
    canvas.width = width;
    canvas.height = height;

    // Background - soft calm off-white with subtle warm border
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, width, height);

    // Deep teal top banner
    ctx.fillStyle = '#0F766E';
    ctx.fillRect(0, 0, width, 88);

    // Header branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CheckFirst India', 40, 55);

    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#CCFBF1';
    ctx.fillText('Community-Powered Scam & Fraud Checker', width - 420, 55);

    // Card boundary hairline
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Warning Badge
    ctx.fillStyle = reportCount >= 2 ? '#FEF2F2' : '#FFFBEB';
    ctx.fillRect(40, 118, 260, 42);
    ctx.strokeStyle = reportCount >= 2 ? '#FCA5A5' : '#FCD34D';
    ctx.strokeRect(40, 118, 260, 42);

    ctx.fillStyle = reportCount >= 2 ? '#B91C1C' : '#B45309';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    const riskLabel = reportCount >= 2 
      ? (lang === 'hi' ? '● उच्च जोखिम चेतावनी' : '● HIGH RISK WARNING') 
      : (lang === 'hi' ? '● सावधानी बरतें' : '● CAUTION ADVISED');
    ctx.fillText(riskLabel, 55, 145);

    // Main Identifier Heading
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    const displayId = identifier.length > 38 ? identifier.substring(0, 35) + '...' : identifier;
    ctx.fillText(displayId, 40, 205);

    // Reported by N people statement
    ctx.fillStyle = '#334155';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    const reportText = lang === 'hi'
      ? `को कम्युनिटी के ${reportCount} लोगों द्वारा संदिग्ध रिपोर्ट किया गया है`
      : `has been reported by ${reportCount} ${reportCount === 1 ? 'person' : 'people'} in the community`;
    ctx.fillText(reportText, 40, 248);

    // Divider line
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 280);
    ctx.lineTo(width - 40, 280);
    ctx.stroke();

    // Key details block
    ctx.fillStyle = '#64748B';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lang === 'hi' ? 'रिपोर्ट किए गए फ्रॉड प्रकार:' : 'Reported Scam Category:', 40, 318);
    ctx.fillText(lang === 'hi' ? 'नवीनतम रिपोर्ट तिथि:' : 'Latest Report Date:', 40, 354);
    ctx.fillText(lang === 'hi' ? 'सत्यापन स्थिति:' : 'Verification Status:', 40, 390);

    ctx.fillStyle = '#0F172A';
    ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
    const typesText = scamTypes.length > 55 ? scamTypes.substring(0, 52) + '...' : scamTypes;
    ctx.fillText(typesText, 250, 318);
    ctx.fillText(latestDate, 250, 354);

    // Prominent "Reported by users, not verified"
    ctx.fillStyle = '#D97706';
    ctx.fillText(lang === 'hi' ? 'उपयोगकर्ताओं द्वारा रिपोर्ट किया गया, सत्यापित नहीं।' : 'Reported by users, not verified.', 250, 390);

    // National Cyber Crime Box
    ctx.fillStyle = '#F0FDFA';
    ctx.fillRect(40, 428, width - 80, 84);
    ctx.strokeStyle = '#99F6E4';
    ctx.strokeRect(40, 428, width - 80, 84);

    ctx.fillStyle = '#0F766E';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lang === 'hi' ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 (24x7 टोल-फ्री)' : 'National Cyber Crime Helpline: 1930 (24x7 Toll-Free)', 60, 460);

    ctx.fillStyle = '#115E59';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(lang === 'hi' ? 'आधिकारिक शिकायत पोर्टल: cybercrime.gov.in · वित्तीय धोखाधड़ी की तुरंत रिपोर्ट करें' : 'Official Portal: cybercrime.gov.in · Report financial fraud within golden hour', 60, 492);

    // Card footer
    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Generated via CheckFirst India · checkfirst.in · Independent Public Safety Tool', 40, 545);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(drawCard, 50);
    }
  }, [isOpen, identifier, reportCount, lang]);

  if (!isOpen) return null;

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `checkfirst-warning-${identifier.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = url;
    link.click();
  };

  const copyTextAlert = () => {
    const alertMessage = `⚠️ [CheckFirst Safety Alert]
"${identifier}" has been reported by ${reportCount} people in India for potential scam/fraud (${scamTypes}).
Status: Reported by users, not verified.
Before transferring money or sharing OTP/documents, verify through official channels!
If victimized, dial 1930 or visit cybercrime.gov.in`;

    navigator.clipboard.writeText(alertMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg transition-colors"
          aria-label={t.closeModal}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-6 h-6 text-teal-700 dark:text-teal-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.warningCardTitle}
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          {t.warningCardDesc}
        </p>

        {/* Live Canvas Preview */}
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 mb-6 bg-slate-50 dark:bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            style={{ maxHeight: '340px', objectFit: 'contain' }}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={downloadImage}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadPNG}</span>
          </button>

          <button
            onClick={copyTextAlert}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors whitespace-nowrap cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedText : (lang === 'hi' ? 'टेक्स्ट अलर्ट कॉपी करें' : 'Copy Text Alert')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
