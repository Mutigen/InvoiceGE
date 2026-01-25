'use client'

import { PlusCircle, FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface DashboardHeaderProps {
  totalInvoices: number
}

export function DashboardHeader({ totalInvoices }: DashboardHeaderProps) {
  const t = useTranslations('dashboard.header')
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Card className="flex-1">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t('totalInvoices')}
            </p>
            <h2 className="text-3xl font-bold">{totalInvoices}</h2>
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => router.push('/')} size="lg" className="sm:w-auto">
        <PlusCircle className="mr-2 h-5 w-5" />
        {t('newInvoice')}
      </Button>
    </div>
  )
}
