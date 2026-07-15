'use client'

import { useQuery } from '@tanstack/react-query'
import { billingService, BillFilters } from '@/services/billing.service'
import { useGenerateBillPDF, useDeleteBill } from '@/hooks/mutations/useBilling'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'

interface BillsHistoryProps {
  filters?: BillFilters
}

export function BillsHistory({ filters }: BillsHistoryProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['bills', filters],
    queryFn: () => billingService.getBills(filters),
    staleTime: 3 * 60 * 1000,
  })

  const generatePDF = useGenerateBillPDF()
  const deleteBill = useDeleteBill()
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const getPaymentBadgeColor = (method: string) => {
    const colors: Record<string, string> = {
      cash: 'bg-green-500/20 text-green-400 border-green-500/30',
      card: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      upi: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      cheque: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    }
    return colors[method] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Bill History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Bill History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold">Bill No.</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Payment</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No bills found
                  </td>
                </tr>
              ) : (
                data?.items.map((bill) => (
                  <tr
                    key={bill.id}
                    className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium">{bill.billNumber}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {format(new Date(bill.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{bill.customerName || 'Walk-in Customer'}</p>
                        {bill.customerPhone && (
                          <p className="text-xs text-muted-foreground">{bill.customerPhone}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      ₹{bill.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${getPaymentBadgeColor(
                          bill.paymentMethod
                        )} border capitalize`}
                      >
                        {bill.paymentMethod}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePDF.mutate(bill.id)}
                          disabled={generatePDF.isPending}
                          className="h-8"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        {deleteConfirm === bill.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                deleteBill.mutate(bill.id)
                                setDeleteConfirm(null)
                              }}
                              disabled={deleteBill.isPending}
                              className="h-8"
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDeleteConfirm(null)}
                              className="h-8"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirm(bill.id)}
                            className="h-8 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
