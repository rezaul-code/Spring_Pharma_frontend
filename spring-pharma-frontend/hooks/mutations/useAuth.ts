import { useMutation } from '@tanstack/react-query'
import { authService, LoginRequest, RegisterRequest } from '@/services/auth.service'
import { toast } from 'sonner'

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
    },
    onSuccess: () => {
      toast.success('Login successful!')
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
    },
    onSuccess: () => {
      toast.success('Registration successful! Please log in.')
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send reset email'
      toast.error(message)
    },
    onSuccess: () => {
      toast.success('Reset link sent to your email!')
    },
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: () => authService.logout(),
    onError: () => {
      toast.error('Logout failed')
    },
    onSuccess: () => {
      toast.success('Logged out successfully')
    },
  })
}
