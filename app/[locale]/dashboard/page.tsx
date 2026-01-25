import { useTranslations } from 'next-intl'
import { InvoiceList } from '@/app/components/dashboard/InvoiceList'

export default function DashboardPage() {
  const t = useTranslations('dashboard')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
      </div>

      <InvoiceList />
    </div>
  )
}
