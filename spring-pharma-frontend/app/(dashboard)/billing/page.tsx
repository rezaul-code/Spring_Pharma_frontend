'use client'

import { BillForm } from '@/components/billing/bill-form'

export default function BillingPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Point of Sale</h1>
        <p className="text-muted-foreground mt-2">Create new bills and manage sales</p>
      </div>

      <BillForm />
    </div>
  )
}
