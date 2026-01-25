'use client'

import { useState } from 'react'
import { Eye, Download, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { SupabaseInvoice } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'
import { generatePdfFromInvoiceData, downloadPdf, previewPdf } from '@/lib/utils/invoiceHelpers'
import { useToast } from '@/components/ui/use-toast'

interface InvoiceCardProps {
  invoice: SupabaseInvoice
  onDelete: (id: string, invoiceNumber: string) => void
  onPaidStatusChange: (id: string, newStatus: boolean) => void
}

export function InvoiceCard({ invoice, onDelete, onPaidStatusChange }: InvoiceCardProps) {
  const t = useTranslations('dashboard.invoice')
  const locale = useLocale()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPaidOptimistic, setIsPaidOptimistic] = useState(invoice.paid_status)

  const invoiceData = invoice.invoice_data
  const customerName = invoiceData.receiver.name || 'N/A'

  // Calculate total amount from details
  const total = invoiceData.details.totalAmount
  const currency = invoiceData.details.currency || 'USD'

  const handlePaidToggle = async (checked: boolean) => {
    // Optimistic update
    setIsPaidOptimistic(checked)

    try {
      const response = await fetch('/api/invoice/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          paidStatus: checked,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update paid status')
      }

      onPaidStatusChange(invoice.id, checked)
    } catch (error) {
      // Revert optimistic update on error
      setIsPaidOptimistic(!checked)
      toast({
        title: 'Error',
        description: 'Failed to update paid status',
        variant: 'destructive',
      })
    }
  }

  const handlePreview = async () => {
    setIsGenerating(true)
    try {
      const blob = await generatePdfFromInvoiceData(invoiceData)
      previewPdf(blob)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF preview',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const blob = await generatePdfFromInvoiceData(invoiceData)
      downloadPdf(blob, `invoice-${invoice.invoice_number}.pdf`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download PDF',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {t('number')} #{invoice.invoice_number}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('customer')}: {customerName}
            </p>
          </div>
          <Badge variant={isPaidOptimistic ? 'default' : 'secondary'}>
            {isPaidOptimistic ? t('paid') : t('unpaid')}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('amount')}:</span>
            <span className="font-semibold">{formatCurrency(total, currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('date')}:</span>
            <span>{formatDate(invoice.created_at, locale)}</span>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id={`paid-${invoice.id}`}
              checked={isPaidOptimistic}
              onCheckedChange={handlePaidToggle}
            />
            <label
              htmlFor={`paid-${invoice.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('paid')}
            </label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          disabled={isGenerating}
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          {t('preview')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          {t('download')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(invoice.id, invoice.invoice_number)}
          className="flex-1"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t('delete')}
        </Button>
      </CardFooter>
    </Card>
  )
}
