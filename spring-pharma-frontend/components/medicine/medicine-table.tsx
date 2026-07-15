'use client'

import { useMedicines } from '@/hooks/queries/useMedicines'
import { useDeleteMedicine } from '@/hooks/mutations/useMedicines'
import { Medicine } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit2, Trash2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface MedicineTableProps {
  page?: number
  searchQuery?: string
  onEdit?: (medicine: Medicine) => void
}

export function MedicineTable({ page = 1, searchQuery = '', onEdit }: MedicineTableProps) {
  const { data, isLoading } = useMedicines({ page, search: searchQuery })
  const deleteMutation = useDeleteMedicine()
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const getStockStatus = (quantity: number, reorderLevel: number = 100) => {
    if (quantity === 0) return { status: 'out-of-stock', color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Out of Stock' }
    if (quantity <= reorderLevel) return { status: 'low-stock', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Low Stock' }
    return { status: 'in-stock', color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'In Stock' }
  }

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Medicines</CardTitle>
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
        <CardTitle>Medicines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Generic Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Qty</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Unit Price</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">MRP</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((medicine) => {
                const stockStatus = getStockStatus(medicine.quantity, 100)
                return (
                  <tr key={medicine.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{medicine.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{medicine.genericName || '-'}</td>
                    <td className="py-3 px-4 text-foreground">
                      <div className="flex items-center gap-2">
                        {medicine.quantity}
                        {medicine.quantity <= 100 && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">₹{medicine.unitPrice}</td>
                    <td className="py-3 px-4 text-foreground">₹{medicine.mrp}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${stockStatus.color} border`}>
                        {stockStatus.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit?.(medicine)}
                          className="h-8"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        {deleteConfirm === medicine.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                deleteMutation.mutate(medicine.id)
                                setDeleteConfirm(null)
                              }}
                              disabled={deleteMutation.isPending}
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
                            onClick={() => setDeleteConfirm(medicine.id)}
                            className="h-8 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
