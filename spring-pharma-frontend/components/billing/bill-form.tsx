'use client'

import { useState } from 'react'
import { useSearchMedicines } from '@/hooks/queries/useMedicines'
import { useCreateBill } from '@/hooks/mutations/useBilling'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface BillItem {
  medicineId: string
  medicineName: string
  quantity: number
  unitPrice: number
  gst: number
  total: number
}

export function BillForm() {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi' | 'cheque'>('cash')
  const [searchQuery, setSearchQuery] = useState('')
  const [billItems, setBillItems] = useState<BillItem[]>([])
  const [notes, setNotes] = useState('')

  const { data: searchResults } = useSearchMedicines(searchQuery, searchQuery.length > 0)
  const createBill = useCreateBill()

  const calculateSubtotal = () => billItems.reduce((sum, item) => sum + item.total, 0)
  const calculateTax = () => {
    return billItems.reduce((sum, item) => {
      return sum + (item.total * item.gst) / 100
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const tax = calculateTax()
  const total = subtotal + tax

  const handleAddItem = (medicine: any) => {
    const existingItem = billItems.find((item) => item.medicineId === medicine.id)

    if (existingItem) {
      const updatedItems = billItems.map((item) =>
        item.medicineId === medicine.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.unitPrice }
          : item
      )
      setBillItems(updatedItems)
    } else {
      setBillItems([
        ...billItems,
        {
          medicineId: medicine.id,
          medicineName: medicine.name,
          quantity: 1,
          unitPrice: medicine.unitPrice,
          gst: medicine.gst || 5,
          total: medicine.unitPrice,
        },
      ])
    }
    setSearchQuery('')
    toast.success(`${medicine.name} added to bill`)
  }

  const handleUpdateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      setBillItems(billItems.filter((item) => item.medicineId !== medicineId))
    } else {
      setBillItems(
        billItems.map((item) =>
          item.medicineId === medicineId
            ? { ...item, quantity, total: quantity * item.unitPrice }
            : item
        )
      )
    }
  }

  const handleRemoveItem = (medicineId: string) => {
    setBillItems(billItems.filter((item) => item.medicineId !== medicineId))
  }

  const handleSubmit = async () => {
    if (billItems.length === 0) {
      toast.error('Please add at least one item to the bill')
      return
    }

    try {
      await createBill.mutateAsync({
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        items: billItems.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          gst: item.gst,
        })),
        paymentMethod,
        notes: notes || undefined,
      })

      // Reset form
      setCustomerName('')
      setCustomerPhone('')
      setPaymentMethod('cash')
      setBillItems([])
      setNotes('')
    } catch (error) {
      console.error('Bill error:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Bill Header */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Customer Name (Optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Input
              placeholder="Customer Phone (Optional)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Payment Method</label>
            <div className="flex gap-2 mt-2">
              {(['cash', 'card', 'upi', 'cheque'] as const).map((method) => (
                <Button
                  key={method}
                  variant={paymentMethod === method ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod(method)}
                  className="capitalize"
                >
                  {method}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Items */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Add Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                {searchResults.map((medicine) => (
                  <button
                    key={medicine.id}
                    onClick={() => handleAddItem(medicine)}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{medicine.unitPrice} | Stock: {medicine.quantity}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bill Items */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Bill Items</CardTitle>
        </CardHeader>
        <CardContent>
          {billItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No items added yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 px-2">Medicine</th>
                    <th className="text-right py-2 px-2">Qty</th>
                    <th className="text-right py-2 px-2">Price</th>
                    <th className="text-right py-2 px-2">GST %</th>
                    <th className="text-right py-2 px-2">Total</th>
                    <th className="text-center py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item) => (
                    <tr key={item.medicineId} className="border-b border-border/50">
                      <td className="py-2 px-2">{item.medicineName}</td>
                      <td className="text-right py-2 px-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(item.medicineId, parseInt(e.target.value) || 0)
                          }
                          className="w-12 px-2 py-1 bg-muted rounded text-right"
                        />
                      </td>
                      <td className="text-right py-2 px-2">₹{item.unitPrice}</td>
                      <td className="text-right py-2 px-2">{item.gst}%</td>
                      <td className="text-right py-2 px-2 font-semibold">₹{item.total.toFixed(2)}</td>
                      <td className="text-center py-2 px-2">
                        <button
                          onClick={() => handleRemoveItem(item.medicineId)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bill Summary */}
      <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Tax:</span>
            <span className="font-semibold text-orange-400">₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-border/50 pt-3 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <textarea
        placeholder="Add notes for this bill (Optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full min-h-20 px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={createBill.isPending || billItems.length === 0}
        className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
      >
        {createBill.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Bill...
          </>
        ) : (
          'Create Bill'
        )}
      </Button>
    </div>
  )
}
