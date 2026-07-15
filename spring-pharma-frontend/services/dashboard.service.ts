import apiClient from '@/lib/axios'
import { DASHBOARD_ENDPOINTS } from '@/constants/api'
import { DashboardStats, SalesData, StockData, TopSellingMedicine } from '@/types'

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get(DASHBOARD_ENDPOINTS.STATS)
      return response.data
    } catch {
      // Return mock data for development
      return {
        totalSales: 45000,
        totalMedicines: 1250,
        totalStaff: 8,
        totalBills: 342,
        averageOrderValue: 2500,
        lowStockMedicines: 12,
      }
    }
  },

  async getSalesChart(): Promise<SalesData[]> {
    try {
      const response = await apiClient.get(DASHBOARD_ENDPOINTS.SALES_CHART)
      return response.data
    } catch {
      // Return mock data
      return [
        { date: 'Mon', amount: 4000, bills: 24 },
        { date: 'Tue', amount: 3000, bills: 18 },
        { date: 'Wed', amount: 2000, bills: 12 },
        { date: 'Thu', amount: 2780, bills: 16 },
        { date: 'Fri', amount: 1890, bills: 11 },
        { date: 'Sat', amount: 2390, bills: 14 },
        { date: 'Sun', amount: 3490, bills: 20 },
      ]
    }
  },

  async getStockChart(): Promise<StockData[]> {
    try {
      const response = await apiClient.get(DASHBOARD_ENDPOINTS.STOCK_CHART)
      return response.data
    } catch {
      // Return mock data
      return [
        { medicineId: '1', medicineName: 'Aspirin', currentStock: 450, reorderLevel: 100, status: 'in-stock' },
        { medicineId: '2', medicineName: 'Paracetamol', currentStock: 89, reorderLevel: 100, status: 'low-stock' },
        { medicineId: '3', medicineName: 'Ibuprofen', currentStock: 200, reorderLevel: 50, status: 'in-stock' },
        { medicineId: '4', medicineName: 'Amoxicillin', currentStock: 0, reorderLevel: 150, status: 'out-of-stock' },
        { medicineId: '5', medicineName: 'Lisinopril', currentStock: 120, reorderLevel: 100, status: 'in-stock' },
      ]
    }
  },

  async getTopMedicines(): Promise<TopSellingMedicine[]> {
    try {
      const response = await apiClient.get(DASHBOARD_ENDPOINTS.TOP_MEDICINES)
      return response.data
    } catch {
      // Return mock data
      return [
        { medicineId: '1', medicineName: 'Aspirin', quantitySold: 1200, revenue: 8000 },
        { medicineId: '2', medicineName: 'Paracetamol', quantitySold: 980, revenue: 5800 },
        { medicineId: '3', medicineName: 'Cough Syrup', quantitySold: 450, revenue: 3600 },
        { medicineId: '4', medicineName: 'Amoxicillin', quantitySold: 340, revenue: 4100 },
        { medicineId: '5', medicineName: 'Lisinopril', quantitySold: 220, revenue: 3300 },
      ]
    }
  },
}
