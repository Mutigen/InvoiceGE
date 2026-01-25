/**
 * Format currency amount with locale-specific formatting
 */
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format date with locale-specific formatting
 */
export function formatDate(dateString: string, locale: string): string {
  return new Intl.DateFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}
