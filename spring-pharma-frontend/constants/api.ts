// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
}

// Medicine Endpoints
export const MEDICINE_ENDPOINTS = {
  LIST: '/api/medicines',
  GET: (id: string) => `/api/medicines/${id}`,
  CREATE: '/api/medicines',
  UPDATE: (id: string) => `/api/medicines/${id}`,
  DELETE: (id: string) => `/api/medicines/${id}`,
  SEARCH: '/api/medicines/search',
}

// Billing Endpoints
export const BILLING_ENDPOINTS = {
  LIST: '/api/bills',
  GET: (id: string) => `/api/bills/${id}`,
  CREATE: '/api/bills',
  UPDATE: (id: string) => `/api/bills/${id}`,
  DELETE: (id: string) => `/api/bills/${id}`,
  GENERATE_PDF: (id: string) => `/api/bills/${id}/pdf`,
}

// Dashboard Endpoints
export const DASHBOARD_ENDPOINTS = {
  STATS: '/api/dashboard/stats',
  SALES_CHART: '/api/dashboard/sales-chart',
  STOCK_CHART: '/api/dashboard/stock-chart',
  TOP_MEDICINES: '/api/dashboard/top-medicines',
}

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
  REVENUE: '/api/analytics/revenue',
  SALES: '/api/analytics/sales',
  INVENTORY: '/api/analytics/inventory',
  TOP_SELLING: '/api/analytics/top-selling',
}

// Staff Endpoints
export const STAFF_ENDPOINTS = {
  LIST: '/api/staff',
  GET: (id: string) => `/api/staff/${id}`,
  CREATE: '/api/staff',
  UPDATE: (id: string) => `/api/staff/${id}`,
  DELETE: (id: string) => `/api/staff/${id}`,
}

// Settings Endpoints
export const SETTINGS_ENDPOINTS = {
  GET: '/api/settings',
  UPDATE: '/api/settings',
  GET_PHARMACY: '/api/settings/pharmacy',
  UPDATE_PHARMACY: '/api/settings/pharmacy',
  CHANGE_PASSWORD: '/api/settings/change-password',
}
