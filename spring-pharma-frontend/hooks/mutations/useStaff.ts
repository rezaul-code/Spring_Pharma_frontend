'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { staffService } from '@/services/staff.service'
import { toast } from 'sonner'
import { CreateStaffInput } from '@/types'

export function useCreateStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateStaffInput) => staffService.createStaff(data),
    onSuccess: () => {
      toast.success('Staff member added successfully')
      queryClient.invalidateQueries({ queryKey: ['staff'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add staff member')
    },
  })
}

export function useUpdateStaff(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<CreateStaffInput>) => staffService.updateStaff(id, data),
    onSuccess: () => {
      toast.success('Staff member updated successfully')
      queryClient.invalidateQueries({ queryKey: ['staff'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update staff member')
    },
  })
}

export function useDeleteStaff() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => staffService.deleteStaff(id),
    onSuccess: () => {
      toast.success('Staff member deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['staff'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete staff member')
    },
  })
}
