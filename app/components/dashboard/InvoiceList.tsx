'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { SupabaseInvoice } from '@/types'
import { InvoiceCard } from './InvoiceCard'
import { SearchBar } from './SearchBar'
import { EmptyState } from './EmptyState'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import { DashboardHeader } from './DashboardHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

export function InvoiceList() {
  const t = useTranslations('dashboard')
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<SupabaseInvoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<SupabaseInvoice[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    invoiceId: string | null
    invoiceNumber: string | null
  }>({
    isOpen: false,
    invoiceId: null,
    invoiceNumber: null,
  })

  // Fetch invoices on mount
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoice/load')
        if (!response.ok) {
          throw new Error('Failed to load invoices')
        }
        const data = await response.json()
        setInvoices(data.invoices || [])
        setFilteredInvoices(data.invoices || [])
      } catch (error) {
        toast({
          title: 'Error',
          description: t('error'),
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [t, toast])

  // Filter invoices based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredInvoices(invoices)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = invoices.filter((invoice) => {
      const invoiceNumber = invoice.invoice_number.toLowerCase()
      const senderName = invoice.invoice_data.sender.name.toLowerCase()
      const receiverName = invoice.invoice_data.receiver.name.toLowerCase()

      return (
        invoiceNumber.includes(query) ||
        senderName.includes(query) ||
        receiverName.includes(query)
      )
    })

    setFilteredInvoices(filtered)
  }, [searchQuery, invoices])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleDeleteClick = (id: string, invoiceNumber: string) => {
    setDeleteModal({
      isOpen: true,
      invoiceId: id,
      invoiceNumber,
    })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.invoiceId) return

    try {
      const response = await fetch(
        `/api/invoice/delete?id=${deleteModal.invoiceId}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete invoice')
      }

      // Update local state
      setInvoices((prev) => prev.filter((inv) => inv.id !== deleteModal.invoiceId))
      toast({
        title: 'Success',
        description: 'Invoice deleted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete invoice',
        variant: 'destructive',
      })
    } finally {
      setDeleteModal({ isOpen: false, invoiceId: null, invoiceNumber: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, invoiceId: null, invoiceNumber: null })
  }

  const handlePaidStatusChange = (id: string, newStatus: boolean) => {
    // Update local state immediately (already optimistically updated in InvoiceCard)
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, paid_status: newStatus } : inv))
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-24 flex-1" />
          <Skeleton className="h-12 w-full sm:w-40" />
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader totalInvoices={invoices.length} />

      {invoices.length > 0 && (
        <div className="flex justify-center sm:justify-start">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      {filteredInvoices.length === 0 && invoices.length === 0 ? (
        <EmptyState />
      ) : filteredInvoices.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No invoices found matching your search.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onDelete={handleDeleteClick}
              onPaidStatusChange={handlePaidStatusChange}
            />
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        invoiceNumber={deleteModal.invoiceNumber || ''}
      />
    </div>
  )
}
