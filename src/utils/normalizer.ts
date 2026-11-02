import { IdentifierType } from '../types';

/**
 * Normalizes user search input and stored identifiers:
 * - Ignores spaces, dashes, parentheses, dots
 * - Ignores capitals (case-insensitive)
 * - Strips leading +91 or 91 (for 10-digit Indian phone numbers)
 * - Strips protocol (http://, https://) and 'www.' from websites
 */
export function normalizeIdentifier(value: string, type?: IdentifierType): string {
  if (!value) return '';
  let str = value.trim().toLowerCase();

  // If website, strip protocol and www
  str = str.replace(/^(https?:\/\/)?(www\.)?/, '');
  str = str.replace(/\/+$/, ''); // strip trailing slashes

  // If phone or looks like phone:
  // First strip common formatting chars: spaces, dashes, parentheses, plus
  // Check if string contains +91 or starts with 91 followed by 10 digits
  const digitsOnly = str.replace(/\D/g, '');
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    // Has country code 91
    return digitsOnly.slice(2);
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    // Leading 0
    return digitsOnly.slice(1);
  }
  if (type === 'phone' || (/^\+?91[\s-]?\d{10}$/.test(str)) || (/^\d{10}$/.test(digitsOnly) && digitsOnly.length === 10)) {
    return digitsOnly;
  }

  // General normalization for search comparison:
  // remove +91 if preceded by nothing
  str = str.replace(/^\+91[\s-]*/, '');
  // remove internal spaces, dashes, punctuation
  str = str.replace(/[\s\-_()]+/g, '');

  return str;
}

/**
 * Checks if search query matches an item's identifier
 */
export function matchesQuery(itemIdentifier: string, itemType: string, query: string, filterType: IdentifierType): boolean {
  if (!query || query.trim() === '') return false;
  if (filterType !== 'all' && filterType !== itemType) return false;

  const normalizedQuery = normalizeIdentifier(query, filterType);
  const normalizedItem = normalizeIdentifier(itemIdentifier, itemType as IdentifierType);

  if (!normalizedQuery) return false;

  // Exact match on normalized
  if (normalizedItem === normalizedQuery) return true;

  // Phone match: if both are digits and one ends with the other
  const itemDigits = itemIdentifier.replace(/\D/g, '').replace(/^91/, '');
  const queryDigits = query.replace(/\D/g, '').replace(/^91/, '');
  if (itemDigits.length >= 10 && queryDigits.length >= 10 && itemDigits === queryDigits) {
    return true;
  }

  // Substring match for company or website names
  if (normalizedItem.includes(normalizedQuery) || normalizedQuery.includes(normalizedItem)) {
    return true;
  }

  return false;
}
