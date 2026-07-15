// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'pharmacist' | 'staff'
  pharmacyId: string
}

export interface Pharmacy {
  id: string
  name: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  phone?: string
  gstNumber?: string
  licenseNumber?: string
  logo?: string
}

// Medicine Types
export interface Medicine {
  id: string
  name: string
  genericName?: string
  manufacturer?: string
  quantity: number
  unitPrice: number
  mrp: number
  unit?: string
  batch?: string
  expiryDate?: string
  hsn?: string
  gst?: number
  description?: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface CreateMedicineRequest {
  name: string
  genericName?: string
  manufacturer?: string
  quantity: number
  unitPrice: number
  mrp: number
  unit?: string
  batch?: string
  expiryDate?: string
  hsn?: string
  gst?: number
  description?: string
  image?: string
}

export interface UpdateMedicineRequest extends Partial<CreateMedicineRequest> {
  id: string
}

// Billing Types
export interface BillItem {
  medicineId: string
  medicineName: string
  quantity: number
  unitPrice: number
  mrp?: number
  gst?: number
  total: number
}

export interface Bill {
  id: string
  billNumber: string
  date: string
  customerName?: string
  customerPhone?: string
  items: BillItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  paymentMethod?: 'cash' | 'card' | 'upi' | 'cheque'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateBillRequest {
  customerName?: string
  customerPhone?: string
  items: {
    medicineId: string
    quantity: number
    unitPrice: number
    gst?: number
  }[]
  paymentMethod?: string
  notes?: string
}

// Staff Types
export interface Staff {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'pharmacist' | 'staff'
  address?: string
  joinDate?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface CreateStaffRequest {
  name: string
  email: string
  phone?: string
  role: 'admin' | 'pharmacist' | 'staff'
  address?: string
}

// Dashboard Types
export interface DashboardStats {
  totalSales: number
  totalMedicines: number
  totalStaff: number
  totalBills: number
  averageOrderValue: number
  lowStockMedicines: number
}

export interface SalesData {
  date: string
  amount: number
  bills: number
}

export interface StockData {
  medicineId: string
  medicineName: string
  currentStock: number
  reorderLevel: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

// Analytics Types
export interface RevenueAnalytics {
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
}

export interface TopSellingMedicine {
  medicineId: string
  medicineName: string
  quantitySold: number
  revenue: number
}
