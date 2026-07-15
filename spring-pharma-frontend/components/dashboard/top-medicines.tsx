'use client'

import { useTopMedicines } from '@/hooks/queries/useDashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp } from 'lucide-react'

export function TopMedicines() {
  const { data, isLoading } = useTopMedicines()

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Selling Medicines
          </CardTitle>
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
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Top Selling Medicines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data?.map((item, index) => (
          <div
            key={item.medicineId}
            className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-foreground">{item.medicineName}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantitySold} units sold
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">₹{item.revenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
