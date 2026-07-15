'use client'

import { Pill } from 'lucide-react'
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
          <Pill className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">SpringPharma</h1>
        <p className="text-muted-foreground mt-2">Pharmacy Management System</p>
      </div>

      <RegisterForm />
    </div>
  )
}
