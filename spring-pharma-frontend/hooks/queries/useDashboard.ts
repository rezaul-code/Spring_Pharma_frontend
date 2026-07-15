import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000,
  })
}

export function useSalesChart() {
  return useQuery({
    queryKey: ['dashboard', 'sales-chart'],
    queryFn: () => dashboardService.getSalesChart(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}

export function useStockChart() {
  return useQuery({
    queryKey: ['dashboard', 'stock-chart'],
    queryFn: () => dashboardService.getStockChart(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}

export function useTopMedicines() {
  return useQuery({
    queryKey: ['dashboard', 'top-medicines'],
    queryFn: () => dashboardService.getTopMedicines(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}
