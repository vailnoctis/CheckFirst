export type IdentifierType = 'all' | 'phone' | 'upi' | 'company' | 'website';

export type ScamCategory =
  | 'fake_job'
  | 'part_time_task'
  | 'fake_internship'
  | 'advance_fee'
  | 'upi_payment_fraud'
  | 'fake_hr_impersonation'
  | 'other';

export interface ReportItem {
  id: string;
  identifier: string;
  normalizedIdentifier: string;
  type: 'phone' | 'upi' | 'company' | 'website';
  scamCategory: ScamCategory;
  scamType: string;
  description: string;
  amountLost?: number;
  date: string;
  city?: string;
  isDemo?: boolean;
}

export interface DetectedFlag {
  id: string;
  nameEn: string;
  nameHi: string;
  severity: 'high' | 'medium';
  snippetFound: string;
  explanationEn: string;
  explanationHi: string;
}

export interface RedFlagResult {
  score: 'low' | 'medium' | 'high';
  flags: DetectedFlag[];
  summaryEn: string;
  summaryHi: string;
}

export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';
