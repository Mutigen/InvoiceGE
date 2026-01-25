import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { invoiceData } = body

    if (!invoiceData) {
      return NextResponse.json({ error: 'Missing invoice data' }, { status: 400 })
    }

    // Save to DB
    const { data, error } = await supabase
      .from('invoices')
      .insert({
        user_id: user.id,
        invoice_number: invoiceData.details.invoiceNumber,
        invoice_data: invoiceData,
      })
      .select()
      .single()

    if (error) {
      console.error('Save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, invoice: data }, { status: 200 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
