import apiClient from '@/lib/axios'
import { MEDICINE_ENDPOINTS } from '@/constants/api'
import { Medicine, CreateMedicineRequest, UpdateMedicineRequest, PaginatedResponse } from '@/types'

export interface MedicineFilters {
  search?: string
  page?: number
  pageSize?: number
  lowStockOnly?: boolean
}

export const medicineService = {
  async getMedicines(filters?: MedicineFilters): Promise<PaginatedResponse<Medicine>> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString())
      if (filters?.lowStockOnly) params.append('lowStockOnly', 'true')

      const response = await apiClient.get(`${MEDICINE_ENDPOINTS.LIST}?${params.toString()}`)
      return response.data
    } catch {
      // Return mock data for development
      return {
        items: [
          { id: '1', name: 'Aspirin', genericName: 'Acetylsalicylic Acid', manufacturer: 'Bayer', quantity: 450, unitPrice: 5, mrp: 10, unit: 'tablet', batch: 'B001', expiryDate: '2025-12-31', hsn: '3004', gst: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '2', name: 'Paracetamol', genericName: 'Acetaminophen', manufacturer: 'GSK', quantity: 89, unitPrice: 3, mrp: 8, unit: 'tablet', batch: 'B002', expiryDate: '2025-11-30', hsn: '3004', gst: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '3', name: 'Ibuprofen', genericName: 'Ibuprofen', manufacturer: 'Abbott', quantity: 200, unitPrice: 8, mrp: 15, unit: 'tablet', batch: 'B003', expiryDate: '2026-01-15', hsn: '3003', gst: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        total: 3,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      }
    }
  },

  async getMedicineById(id: string): Promise<Medicine> {
    try {
      const response = await apiClient.get(MEDICINE_ENDPOINTS.GET(id))
      return response.data
    } catch {
      throw new Error('Medicine not found')
    }
  },

  async createMedicine(data: CreateMedicineRequest): Promise<Medicine> {
    const response = await apiClient.post(MEDICINE_ENDPOINTS.CREATE, data)
    return response.data
  },

  async updateMedicine(id: string, data: Partial<CreateMedicineRequest>): Promise<Medicine> {
    const response = await apiClient.put(MEDICINE_ENDPOINTS.UPDATE(id), data)
    return response.data
  },

  async deleteMedicine(id: string): Promise<void> {
    await apiClient.delete(MEDICINE_ENDPOINTS.DELETE(id))
  },

  async searchMedicines(query: string): Promise<Medicine[]> {
    try {
      const response = await apiClient.get(`${MEDICINE_ENDPOINTS.SEARCH}?q=${query}`)
      return response.data
    } catch {
      return []
    }
  },
}
