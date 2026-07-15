'use client'

import { useQuery } from '@tanstack/react-query'
import { billingService } from '@/services/billing.service'

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => ({
      billsCount: 156,
      totalRevenue: 125400,
      averageBillValue: 804,
      salesByDay: [
        { date: 'Mon', sales: 4000 },
        { date: 'Tue', sales: 3000 },
        { date: 'Wed', sales: 2000 },
        { date: 'Thu', sales: 2780 },
        { date: 'Fri', sales: 1890 },
        { date: 'Sat', sales: 2390 },
        { date: 'Sun', sales: 3490 },
      ],
      topMedicines: [
        { name: 'Aspirin', quantity: 450, revenue: 4500 },
        { name: 'Ibuprofen', quantity: 380, revenue: 5700 },
        { name: 'Paracetamol', quantity: 320, revenue: 3200 },
        { name: 'Amoxicillin', quantity: 280, revenue: 8400 },
        { name: 'Vitamin C', quantity: 450, revenue: 2250 },
      ],
    }),
  })
}
