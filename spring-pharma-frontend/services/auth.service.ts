import apiClient from '@/lib/axios'
import { AUTH_ENDPOINTS } from '@/constants/api'
import { User } from '@/types'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  pharmacyName: string
  ownerName: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  newPassword: string
  confirmPassword: string
}

export const authService = {
  async login(credentials: LoginRequest) {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials)
    return response.data
  },

  async register(data: RegisterRequest) {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, data)
    return response.data
  },

  async logout() {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get(AUTH_ENDPOINTS.ME)
    return response.data
  },

  async forgotPassword(email: string) {
    const response = await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email })
    return response.data
  },

  async resetPassword(data: ResetPasswordRequest) {
    const response = await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, data)
    return response.data
  },

  async refreshToken() {
    const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH)
    return response.data
  }
}
