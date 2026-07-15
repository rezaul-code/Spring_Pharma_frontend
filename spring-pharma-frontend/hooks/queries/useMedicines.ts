import { useQuery } from '@tanstack/react-query'
import { medicineService, MedicineFilters } from '@/services/medicine.service'

export function useMedicines(filters?: MedicineFilters) {
  return useQuery({
    queryKey: ['medicines', filters],
    queryFn: () => medicineService.getMedicines(filters),
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

export function useMedicineById(id: string) {
  return useQuery({
    queryKey: ['medicines', id],
    queryFn: () => medicineService.getMedicineById(id),
    staleTime: 5 * 60 * 1000,
  })
}

export function useSearchMedicines(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['medicines', 'search', query],
    queryFn: () => medicineService.searchMedicines(query),
    staleTime: 2 * 60 * 1000,
    enabled: enabled && query.length > 0,
  })
}
