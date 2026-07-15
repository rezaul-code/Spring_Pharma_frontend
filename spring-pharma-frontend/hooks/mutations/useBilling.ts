import { useMutation, useQueryClient } from '@tanstack/react-query'
import { billingService } from '@/services/billing.service'
import { CreateBillRequest } from '@/types'
import { toast } from 'sonner'

export function useCreateBill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBillRequest) => billingService.createBill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] })
      toast.success('Bill created successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create bill'
      toast.error(message)
    },
  })
}

export function useDeleteBill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => billingService.deleteBill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] })
      toast.success('Bill deleted successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete bill'
      toast.error(message)
    },
  })
}

export function useGenerateBillPDF() {
  return useMutation({
    mutationFn: (id: string) => billingService.generateBillPDF(id),
    onSuccess: (data, id) => {
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = `bill-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Bill downloaded successfully!')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to generate PDF'
      toast.error(message)
    },
  })
}
