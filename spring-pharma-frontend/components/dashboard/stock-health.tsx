'use client'

import { useStockChart } from '@/hooks/queries/useDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertTriangle } from 'lucide-react'

export function StockHealth() {
  const { data, isLoading } = useStockChart()

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Stock Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Stock Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data?.map((item) => {
          const statusColor = {
            'in-stock': 'bg-green-500/20 text-green-400 border-green-500/30',
            'low-stock': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            'out-of-stock': 'bg-red-500/20 text-red-400 border-red-500/30',
          }
          const badgeVariant = statusColor[item.status as keyof typeof statusColor]

          return (
            <div key={item.medicineId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.medicineName}</p>
                <p className="text-xs text-muted-foreground">
                  Stock: {item.currentStock} | Min: {item.reorderLevel}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {item.status === 'low-stock' && (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
                {item.status === 'out-of-stock' && (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <Badge className={`${badgeVariant} border`}>
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
