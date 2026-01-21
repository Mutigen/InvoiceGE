/**
 * Invoice Numbering System
 * Generates sequential invoice numbers in format: PREFIX + YEAR + SEQUENCE
 * Example: SO25-000001, SO25-000002, etc.
 *
 * Storage: localStorage with key "invoiceCounters"
 * Structure: { "SO25": 5, "SO26": 12 } - tracks last number per prefix+year
 */

const COUNTER_STORAGE_KEY = "invoiceCounters";

interface InvoiceCounters {
  [prefixYear: string]: number;
}

/**
 * Get current year in 2-digit format (e.g., 25 for 2025)
 */
function getCurrentYear(): string {
  return new Date().getFullYear().toString().slice(-2);
}

/**
 * Load counters from localStorage
 */
function loadCounters(): InvoiceCounters {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(COUNTER_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

/**
 * Save counters to localStorage
 */
function saveCounters(counters: InvoiceCounters): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(COUNTER_STORAGE_KEY, JSON.stringify(counters));
}

/**
 * Generate next invoice number
 * @param prefix - Invoice prefix (default: "SO")
 * @returns Invoice number in format PREFIX+YY-NNNNNN (e.g., SO25-000001)
 */
export function generateInvoiceNumber(prefix: string = "SO"): string {
  const year = getCurrentYear();
  const prefixYear = `${prefix}${year}`;

  // Load existing counters
  const counters = loadCounters();

  // Get current counter for this prefix+year (default to 0)
  const currentNumber = counters[prefixYear] || 0;

  // Increment counter
  const nextNumber = currentNumber + 1;

  // Update and save counters
  counters[prefixYear] = nextNumber;
  saveCounters(counters);

  // Format number with leading zeros (6 digits)
  const formattedNumber = String(nextNumber).padStart(6, "0");

  return `${prefixYear}-${formattedNumber}`;
}

/**
 * Get the last used invoice number for current year
 * @param prefix - Invoice prefix (default: "SO")
 * @returns Last invoice number or null if none exists
 */
export function getLastInvoiceNumber(prefix: string = "SO"): string | null {
  const year = getCurrentYear();
  const prefixYear = `${prefix}${year}`;

  const counters = loadCounters();
  const currentNumber = counters[prefixYear];

  if (!currentNumber) return null;

  const formattedNumber = String(currentNumber).padStart(6, "0");
  return `${prefixYear}-${formattedNumber}`;
}

/**
 * Reset counter for current year (use with caution!)
 * @param prefix - Invoice prefix (default: "SO")
 */
export function resetInvoiceCounter(prefix: string = "SO"): void {
  const year = getCurrentYear();
  const prefixYear = `${prefix}${year}`;

  const counters = loadCounters();
  delete counters[prefixYear];
  saveCounters(counters);
}

/**
 * Get next invoice number preview without incrementing
 * @param prefix - Invoice prefix (default: "SO")
 * @returns Next invoice number that would be generated
 */
export function previewNextInvoiceNumber(prefix: string = "SO"): string {
  const year = getCurrentYear();
  const prefixYear = `${prefix}${year}`;

  const counters = loadCounters();
  const currentNumber = counters[prefixYear] || 0;
  const nextNumber = currentNumber + 1;

  const formattedNumber = String(nextNumber).padStart(6, "0");
  return `${prefixYear}-${formattedNumber}`;
}
