import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { invoiceId, paidStatus } = body

    if (!invoiceId || typeof paidStatus !== 'boolean') {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 })
    }

    // Update paid status (only for user's own invoices)
    const { error } = await supabase
      .from('invoices')
      .update({ paid_status: paidStatus })
      .eq('id', invoiceId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
