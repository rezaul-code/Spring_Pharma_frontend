'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateMedicine, useUpdateMedicine } from '@/hooks/mutations/useMedicines'
import { Medicine, CreateMedicineRequest } from '@/types'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/common/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const medicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  genericName: z.string().optional(),
  manufacturer: z.string().optional(),
  quantity: z.coerce.number().min(0, 'Quantity must be >= 0'),
  unitPrice: z.coerce.number().min(0, 'Unit price must be >= 0'),
  mrp: z.coerce.number().min(0, 'MRP must be >= 0'),
  unit: z.string().optional(),
  batch: z.string().optional(),
  expiryDate: z.string().optional(),
  hsn: z.string().optional(),
  gst: z.coerce.number().optional(),
  description: z.string().optional(),
})

type MedicineFormData = z.infer<typeof medicineSchema>

interface MedicineFormProps {
  medicine?: Medicine
  onSuccess?: () => void
}

export function MedicineForm({ medicine, onSuccess }: MedicineFormProps) {
  const createMutation = useCreateMedicine()
  const updateMutation = useUpdateMedicine()
  const isLoading = createMutation.isPending || updateMutation.isPending

  const form = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: medicine ? {
      name: medicine.name,
      genericName: medicine.genericName,
      manufacturer: medicine.manufacturer,
      quantity: medicine.quantity,
      unitPrice: medicine.unitPrice,
      mrp: medicine.mrp,
      unit: medicine.unit,
      batch: medicine.batch,
      expiryDate: medicine.expiryDate,
      hsn: medicine.hsn,
      gst: medicine.gst,
      description: medicine.description,
    } : {
      quantity: 0,
      unitPrice: 0,
      mrp: 0,
    },
  })

  async function onSubmit(values: MedicineFormData) {
    try {
      if (medicine) {
        await updateMutation.mutateAsync({
          id: medicine.id,
          data: values as Partial<CreateMedicineRequest>,
        })
      } else {
        await createMutation.mutateAsync(values as CreateMedicineRequest)
      }
      onSuccess?.()
    } catch (error) {
      console.error('Form error:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicine Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Aspirin" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genericName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generic Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Acetylsalicylic Acid" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bayer" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., B001" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., tablet" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price (₹) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mrp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP (₹) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hsn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HSN Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3004" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST %</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Additional details..."
                  disabled={isLoading}
                  className="min-h-20 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {medicine ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            medicine ? 'Update Medicine' : 'Add Medicine'
          )}
        </Button>
      </form>
    </Form>
  )
}
