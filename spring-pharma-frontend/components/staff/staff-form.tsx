'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form'
import { useCreateStaff, useUpdateStaff } from '@/hooks/mutations/useStaff'
import { Staff } from '@/types'
import { z } from 'zod'

const staffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  role: z.enum(['pharmacist', 'cashier', 'manager']),
  joinDate: z.string(),
})

type StaffFormData = z.infer<typeof staffSchema>

interface StaffFormProps {
  staff?: Staff
  onSuccess: () => void
}

export function StaffForm({ staff, onSuccess }: StaffFormProps) {
  const createStaff = useCreateStaff()
  const updateStaff = useUpdateStaff(staff?.id || '')
  const [roles, setRoles] = useState<Array<{ id: string; name: string }>>([])

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: staff ? {
      name: staff.name,
      email: staff.email || '',
      phone: staff.phone || '',
      role: staff.role as 'pharmacist' | 'cashier' | 'manager',
      joinDate: staff.joinDate || new Date().toISOString().split('T')[0],
    } : {
      name: '',
      email: '',
      phone: '',
      role: 'cashier',
      joinDate: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    setRoles([
      { id: 'pharmacist', name: 'Pharmacist' },
      { id: 'cashier', name: 'Cashier' },
      { id: 'manager', name: 'Manager' },
    ])
  }, [])

  async function onSubmit(data: StaffFormData) {
    try {
      if (staff) {
        await updateStaff.mutateAsync(data)
      } else {
        await createStaff.mutateAsync(data)
      }
      onSuccess()
    } catch (error) {
      console.error('[v0] Form submission error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  disabled={createStaff.isPending || updateStaff.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@pharmacy.com"
                  disabled={createStaff.isPending || updateStaff.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+91 9876543210"
                  disabled={createStaff.isPending || updateStaff.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select
                  {...field}
                  disabled={createStaff.isPending || updateStaff.isPending}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="joinDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  disabled={createStaff.isPending || updateStaff.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={createStaff.isPending || updateStaff.isPending}
        >
          {createStaff.isPending || updateStaff.isPending ? 'Saving...' : staff ? 'Update Staff' : 'Add Staff'}
        </Button>
      </form>
    </Form>
  )
}
