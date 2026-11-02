import { DetectedFlag, RedFlagResult } from '../types';

interface RuleDefinition {
  id: string;
  nameEn: string;
  nameHi: string;
  severity: 'high' | 'medium';
  regex: RegExp;
  extractSnippet: (text: string, match: RegExpExecArray) => string;
  explanationEn: string;
  explanationHi: string;
}

const RULES: RuleDefinition[] = [
  {
    id: 'fee_asked',
    nameEn: 'Upfront Fee or Deposit Demanded',
    nameHi: 'अग्रिम शुल्क या डिपॉजिट की मांग',
    severity: 'high',
    regex: /(registration|training|security|document|laptop|uniform|gate\s*pass|hall\s*ticket|induction|kit|id\s*card|processing|application|joining)\s*(fee|fees|charges?|deposit|amount|cost)|(pay|transfer|deposit|send)\s*(first|advance|upfront|rs\.?|₹|\d{3,5})|refundable\s*(fee|deposit|security)|(pay\s*(₹|rs\.?)\s*\d+)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Legitimate employers and verified companies NEVER ask candidates to pay for training, laptop deposits, uniforms, document verification, or joining kits.',
    explanationHi: 'वैध कंपनियाँ और असली एम्प्लॉयर ट्रेनिंग, लैपटॉप सुरक्षा, यूनिफ़ॉर्म या जॉइनिंग किट के नाम पर कभी भी उम्मीदवारों से पैसे नहीं मांगते।',
  },
  {
    id: 'unverified_recruiter_channel',
    nameEn: 'Free Email / Telegram-Only Recruiter',
    nameHi: 'फ़्री ईमेल या केवल टेलीग्राम/व्हाट्सएप रिक्रूटर',
    severity: 'high',
    regex: /@(?:gmail|yahoo|hotmail|outlook|ymail|rediffmail)\.com|(?:t\.me\/|wa\.me\/|contact\s*me\s*on\s*telegram|telegram\s*(?:id|group|channel)|contact\s*hr\s*on\s*whatsapp|whatsapp\s*only)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Official HR recruiters write from corporate domain addresses (e.g. @company.com). Scammers operate almost exclusively via personal Gmail accounts or Telegram channels to conceal their identity.',
    explanationHi: 'असली कॉर्पोरेट रिक्रूटर हमेशा कंपनी के आधिकारिक डोमेन ईमेल (@company.com) से संपर्क करते हैं, न कि पर्सनल जीमेल या गुमनाम टेलीग्राम ग्रुप से।',
  },
  {
    id: 'pay_and_earn_tasks',
    nameEn: 'Pay-and-Earn / Micro-Task Scheme',
    nameHi: '"टास्क करो पैसे कमाओ" / रेटिंग योजना',
    severity: 'high',
    regex: /(?:like|subscribe)\s*(?:youtube|channel|video|insta|instagram)|(?:rate|review)\s*(?:hotels?|movies?|google\s*maps?|places?|amazon|products?)|(?:daily\s*task|merchant\s*task|prepaid\s*task|complete\s*\d+\s*tasks?)|(?:crypto\s*recharge|wallet\s*recharge|recharge\s*account)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Paying small sums (₹150) for simple actions (liking YouTube videos, reviewing hotels) is the hallmark bait of the Task/Prepaid merchant fraud ring. They freeze funds once you deposit larger amounts.',
    explanationHi: 'यूट्यूब वीडियो लाइक करने या होटल रिव्यू करने के नाम पर छोटा भुगतान देना साइबर ठगों का मुख्य जाल है। बड़ा पैसा जमा कराते ही वे अकाउंट ब्लॉक कर देते हैं।',
  },
  {
    id: 'unrealistic_compensation',
    nameEn: 'Unrealistic Earnings for Basic Work',
    nameHi: 'साधारण काम के लिए अवास्तविक वेतन',
    severity: 'medium',
    regex: /(?:₹|rs\.?)\s*(?:[2-9]\d{3,4}|1[0-9]{4})\s*(?:per\s*day|\/day|daily)|(?:work|spend)\s*(?:10|15|20|30|1|2)\s*(?:mins?|minutes?|hours?)\s*(?:daily)?\s*(?:and|to)?\s*earn\s*(?:₹|rs\.?)?\s*[0-9]+|(?:50000|60000|70000|80000|100000)\s*(?:per\s*month|\/month)\s*for\s*(?:freshers?|students?|part[\s-]?time|typing|data\s*entry)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Offers promising ₹3,000–₹8,000 daily for 1–2 hours of data entry, typing, or part-time student work are fabricated to exploit eager job seekers.',
    explanationHi: 'प्रतिदिन 1-2 घंटे के टाइपिंग या डेटा एंट्री काम के लिए ₹3,000-₹8,000 दैनिक आय का वादा केवल शिकार फँसाने के लिए किया जाता है।',
  },
  {
    id: 'urgency_pressure',
    nameEn: 'High Pressure / Urgency Tactics',
    nameHi: 'जल्दबाज़ी और सीमित सीटों का दबाव',
    severity: 'medium',
    regex: /(?:urgent\s*requirement|urgently\s*hiring|immediate\s*joining\s*today)|(?:only\s*\d+\s*(?:slots?|seats?|positions?)\s*(?:left|available))|(?:valid\s*(?:only\s*)?today|within\s*(?:1|2|3|24)\s*hours?|act\s*fast|hurry\s*up|last\s*chance)|(?:offer\s*expires\s*in)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Scammers manufacture artificial panic ("only 2 seats remaining", "valid today only") so victims transfer money before critically verifying credentials.',
    explanationHi: 'ठग जानबूझकर कृत्रिम डर पैदा करते हैं ("केवल 2 सीटें बची हैं", "आज ही वैध") ताकि पीड़ित बिना जाँच किए पैसे ट्रांसफर कर दे।',
  },
  {
    id: 'sensitive_data_request',
    nameEn: 'OTP / UPI PIN / Financial Credentials Requested',
    nameHi: 'ओटीपी / यूपीआई पिन या गोपनीय विवरण की मांग',
    severity: 'high',
    regex: /\b(?:otp|one\s*time\s*password)\b|(?:share|send|enter|provide)\s*(?:your)?\s*(?:aadhaar|adhar|pan\s*card|bank\s*details|atm\s*pin|cvv|debit\s*card|credit\s*card|upi\s*pin)|(?:upi\s*pin\s*to\s*receive|scan\s*qr\s*(?:code\s*)?to\s*receive)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'CRITICAL: You NEVER enter a UPI PIN or share an OTP to receive money. Any message asking for an OTP, ATM PIN, or UPI PIN is an active financial compromise attempt.',
    explanationHi: 'सावधान: पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन डालने या ओटीपी साझा करने की आवश्यकता नहीं होती। ऐसा संदेश सीधा आर्थिक हमला है।',
  },
  {
    id: 'no_interview_direct_selection',
    nameEn: 'Direct Selection Without Assessment',
    nameHi: 'बिना इंटरव्यू या टेस्ट के सीधा चयन',
    severity: 'medium',
    regex: /(?:direct\s*selection|selected\s*without\s*(?:any\s*)?interview)|(?:no\s*interview|no\s*test|no\s*exam)|(?:offer\s*letter\s*attached\s*directly|immediate\s*offer\s*letter)|(?:congratulations!?\s*you\s*(?:have\s*been|are)\s*selected\s*for)/i,
    extractSnippet: (_text, match) => match[0],
    explanationEn: 'Standard hiring processes require interviews, skill tests, or identity checks. "Direct selection" letters sent out of nowhere are almost universally accompanied by a downstream fee demand.',
    explanationHi: 'असली नौकरी में हमेशा साक्षात्कार या कौशल परीक्षण होता है। बिना इंटरव्यू सीधा "चयन पत्र" भेजना आगे चलकर पैसे ऐंठने का जरिया होता है।',
  },
];

export function analyzeOfferText(text: string): RedFlagResult {
  if (!text || text.trim().length === 0) {
    return {
      score: 'low',
      flags: [],
      summaryEn: 'Paste a job offer message, SMS, WhatsApp text, or email above to check for known scam patterns.',
      summaryHi: 'जाँच के लिए ऊपर कोई भी नौकरी का ऑफ़र, व्हाट्सएप मैसेज या ईमेल पेस्ट करें।',
    };
  }

  const detectedFlags: DetectedFlag[] = [];

  for (const rule of RULES) {
    const match = rule.regex.exec(text);
    if (match) {
      detectedFlags.push({
        id: rule.id,
        nameEn: rule.nameEn,
        nameHi: rule.nameHi,
        severity: rule.severity,
        snippetFound: rule.extractSnippet(text, match),
        explanationEn: rule.explanationEn,
        explanationHi: rule.explanationHi,
      });
    }
  }

  // Calculate risk score
  const highSeverityCount = detectedFlags.filter(f => f.severity === 'high').length;
  let score: 'low' | 'medium' | 'high' = 'low';

  if (detectedFlags.length >= 3 || highSeverityCount >= 2) {
    score = 'high';
  } else if (detectedFlags.length >= 1) {
    score = 'medium';
  } else {
    score = 'low';
  }

  let summaryEn = '';
  let summaryHi = '';

  if (score === 'high') {
    summaryEn = `High risk detected (${detectedFlags.length} flags found). This message exhibits critical signatures of common employment or advance-fee scams. Do NOT transfer money or share documents.`;
    summaryHi = `उच्च जोखिम पाया गया (${detectedFlags.length} लाल झंडे मिले)। इस संदेश में सामान्य भर्ती या अग्रिम-शुल्क धोखाधड़ी के स्पष्ट संकेत हैं। पैसे न भेजें।`;
  } else if (score === 'medium') {
    summaryEn = `Caution advised (${detectedFlags.length} flag found). While not all indicators are present, certain elements match deceptive recruitment practices. Verify through official websites.`;
    summaryHi = `सावधानी बरतें (${detectedFlags.length} चेतावनी मिली)। कुछ तत्व भ्रामक भर्ती प्रक्रियाओं से मेल खाते हैं। आधिकारिक वेबसाइट से पुष्टि करें।`;
  } else {
    summaryEn = 'No obvious automated red flags detected in this text. However, this does NOT guarantee the offer is genuine. Always verify through the company\'s official website.';
    summaryHi = 'इस टेक्स्ट में कोई प्रत्यक्ष लाल झंडा नहीं मिला। फिर भी यह गारंटी नहीं है कि ऑफ़र असली है। हमेशा आधिकारिक वेबसाइट से पुष्टि करें।';
  }

  return {
    score,
    flags: detectedFlags,
    summaryEn,
    summaryHi,
  };
}

export const SAMPLE_OFFER_TEMPLATES = [
  {
    titleEn: 'YouTube Task Scam (WhatsApp)',
    titleHi: 'यूट्यूब टास्क धोखाधड़ी (व्हाट्सएप)',
    text: `Hello! I am Priyanka from Global Media Talent HR. We are urgently hiring part-time freelancers. 
Earn ₹3500 per day by simply liking YouTube videos and rating hotels on Google Maps! 
Work 30 mins daily from mobile. 
Only 5 slots left today! 
To start your demo task, join our Telegram manager: https://t.me/quickpay_task_manager. Initial registration fee ₹200 (100% refundable).`,
  },
  {
    titleEn: 'Direct Selection Laptop Deposit',
    titleHi: 'डायरेक्ट सिलेक्शन लैपटॉप डिपॉजिट',
    text: `CONGRATULATIONS! You are directly selected for the post of Junior Executive at Premier LogiTech India without interview. 
Monthly salary: ₹58,000 + WFH allowance. 
To process your joining kit and issue company MacBook, deposit ₹4,500 refundable security fee to our verification account within 2 hours. 
Send payment screenshot to hr.careerdesk2026@gmail.com immediately.`,
  },
  {
    titleEn: 'UPI QR Salary Clearance Scam',
    titleHi: 'यूपीआई क्यूआर पेमेंट धोखाधड़ी',
    text: `Dear Candidate, your internship stipend of ₹15,000 has been sanctioned. 
To receive money in your account, scan this QR code and enter your UPI PIN on your phone. 
Also send front and back photo of your Aadhaar card and PAN card urgently for verification.`,
  },
  {
    titleEn: 'Legitimate Corporate Interview (Clean)',
    titleHi: 'प्रामाणिक कॉर्पोरेट साक्षात्कार (स्वच्छ)',
    text: `Dear Applicant, thank you for applying for the Frontend Developer role at Infosys Ltd via our careers portal (Job ID: INF-2026-904). 
We would like to invite you for a 45-minute technical discussion on Google Meet with our engineering lead next Tuesday at 3:00 PM IST. 
No payment or financial information is ever requested at any stage of our hiring. 
You can track your application status at https://career.infosys.com/joblist.`,
  },
];
