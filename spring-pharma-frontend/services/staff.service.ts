'use client'

import { apiClient } from '@/lib/axios'
import { Staff, CreateStaffInput } from '@/types'

export const staffService = {
  // Get all staff
  async getAllStaff(params?: { search?: string; role?: string; page?: number; limit?: number }) {
    const response = await apiClient.get('/staff', { params })
    return response.data.data
  },

  // Get single staff member
  async getStaff(id: string) {
    const response = await apiClient.get(`/staff/${id}`)
    return response.data.data
  },

  // Create staff
  async createStaff(data: CreateStaffInput) {
    const response = await apiClient.post('/staff', data)
    return response.data.data
  },

  // Update staff
  async updateStaff(id: string, data: Partial<CreateStaffInput>) {
    const response = await apiClient.put(`/staff/${id}`, data)
    return response.data.data
  },

  // Delete staff
  async deleteStaff(id: string) {
    const response = await apiClient.delete(`/staff/${id}`)
    return response.data
  },

  // Get roles
  async getRoles() {
    return [
      { id: 'pharmacist', name: 'Pharmacist', permissions: ['view_medicines', 'create_bills', 'manage_inventory'] },
      { id: 'cashier', name: 'Cashier', permissions: ['create_bills', 'view_medicines'] },
      { id: 'manager', name: 'Manager', permissions: ['all'] },
    ]
  }
}
