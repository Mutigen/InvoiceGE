'use client'

import { FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function EmptyState() {
  const t = useTranslations('dashboard.emptyState')
  const router = useRouter()

  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center">
      <FileText className="h-24 w-24 text-muted-foreground mb-6" />
      <h3 className="text-2xl font-semibold mb-2">{t('title')}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{t('description')}</p>
      <Button onClick={() => router.push('/')} size="lg">
        {t('button')}
      </Button>
    </Card>
  )
}
