'use client'

import { useQuery } from '@tanstack/react-query'
import { staffService } from '@/services/staff.service'

export function useAllStaff(search?: string) {
  return useQuery({
    queryKey: ['staff', search],
    queryFn: async () => [
      { id: '1', name: 'Raj Kumar', email: 'raj@pharmacy.com', phone: '+91 9876543210', role: 'pharmacist', joinDate: '2023-01-15' },
      { id: '2', name: 'Priya Singh', email: 'priya@pharmacy.com', phone: '+91 9876543211', role: 'cashier', joinDate: '2023-02-20' },
      { id: '3', name: 'Amit Patel', email: 'amit@pharmacy.com', phone: '+91 9876543212', role: 'manager', joinDate: '2022-06-10' },
    ],
  })
}

export function useStaff(id: string) {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: () => staffService.getStaff(id),
  })
}
