import { useMutation, useQueryClient } from '@tanstack/react-query'
import { medicineService } from '@/services/medicine.service'
import { CreateMedicineRequest } from '@/types'
import { toast } from 'sonner'

export function useCreateMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMedicineRequest) => medicineService.createMedicine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success('Medicine added successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to add medicine'
      toast.error(message)
    },
  })
}

export function useUpdateMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateMedicineRequest> }) =>
      medicineService.updateMedicine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success('Medicine updated successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update medicine'
      toast.error(message)
    },
  })
}

export function useDeleteMedicine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => medicineService.deleteMedicine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success('Medicine deleted successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete medicine'
      toast.error(message)
    },
  })
}
