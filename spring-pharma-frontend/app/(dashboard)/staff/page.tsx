'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StaffTable } from '@/components/staff/staff-table'
import { StaffForm } from '@/components/staff/staff-form'
import { useAllStaff } from '@/hooks/queries/useStaff'
import { Staff } from '@/types'
import { Plus, X } from 'lucide-react'

export default function StaffPage() {
  const { data: staff, isLoading } = useAllStaff()
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingStaff(null)
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground mt-2">Manage pharmacy staff and roles</p>
        </div>
        <Button
          onClick={() => {
            setEditingStaff(null)
            setShowForm(true)
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <StaffTable
        staff={staff || []}
        isLoading={isLoading}
        onEdit={(staff) => {
          setEditingStaff(staff)
          setShowForm(true)
        }}
      />

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
              </CardTitle>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingStaff(null)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <StaffForm
                staff={editingStaff || undefined}
                onSuccess={handleFormSuccess}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
