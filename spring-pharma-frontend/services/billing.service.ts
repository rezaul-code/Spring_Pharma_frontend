import apiClient from '@/lib/axios'
import { BILLING_ENDPOINTS } from '@/constants/api'
import { Bill, CreateBillRequest, PaginatedResponse } from '@/types'

export interface BillFilters {
  search?: string
  page?: number
  pageSize?: number
  startDate?: string
  endDate?: string
}

export const billingService = {
  async getBills(filters?: BillFilters): Promise<PaginatedResponse<Bill>> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString())
      if (filters?.startDate) params.append('startDate', filters.startDate)
      if (filters?.endDate) params.append('endDate', filters.endDate)

      const response = await apiClient.get(`${BILLING_ENDPOINTS.LIST}?${params.toString()}`)
      return response.data
    } catch {
      // Return mock data for development
      return {
        items: [
          {
            id: '1',
            billNumber: 'INV-001',
            date: new Date().toISOString(),
            customerName: 'John Doe',
            customerPhone: '9876543210',
            items: [
              { medicineId: '1', medicineName: 'Aspirin', quantity: 2, unitPrice: 10, mrp: 10, gst: 5, total: 20 }
            ],
            subtotal: 20,
            taxAmount: 1,
            totalAmount: 21,
            paymentMethod: 'cash',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      }
    }
  },

  async getBillById(id: string): Promise<Bill> {
    try {
      const response = await apiClient.get(BILLING_ENDPOINTS.GET(id))
      return response.data
    } catch {
      throw new Error('Bill not found')
    }
  },

  async createBill(data: CreateBillRequest): Promise<Bill> {
    const response = await apiClient.post(BILLING_ENDPOINTS.CREATE, data)
    return response.data
  },

  async updateBill(id: string, data: Partial<CreateBillRequest>): Promise<Bill> {
    const response = await apiClient.put(BILLING_ENDPOINTS.UPDATE(id), data)
    return response.data
  },

  async deleteBill(id: string): Promise<void> {
    await apiClient.delete(BILLING_ENDPOINTS.DELETE(id))
  },

  async generateBillPDF(id: string): Promise<Blob> {
    const response = await apiClient.get(BILLING_ENDPOINTS.GENERATE_PDF(id), {
      responseType: 'blob',
    })
    return response.data
  },
}
