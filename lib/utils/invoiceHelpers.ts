import { InvoiceType } from "@/types";

/**
 * Generate PDF from invoice data using the existing API
 */
export async function generatePdfFromInvoiceData(
  invoiceData: InvoiceType
): Promise<Blob> {
  const response = await fetch('/api/invoice/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invoiceData }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate PDF');
  }

  return await response.blob();
}

/**
 * Download PDF blob as a file
 */
export function downloadPdf(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Preview PDF blob in a new browser tab
 */
export function previewPdf(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
