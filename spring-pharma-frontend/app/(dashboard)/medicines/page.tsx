'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedicineTable } from '@/components/medicine/medicine-table'
import { MedicineForm } from '@/components/medicine/medicine-form'
import { Medicine } from '@/types'
import { Plus, X } from 'lucide-react'

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)

  const handleAddClick = () => {
    setEditingMedicine(null)
    setShowForm(true)
  }

  const handleEditClick = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingMedicine(null)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Medicines</h1>
        <p className="text-muted-foreground mt-2">Manage your pharmacy inventory</p>
      </div>

      {/* Search and Add */}
      <div className="flex gap-4">
        <Input
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleAddClick}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      {/* Medicine Table */}
      <MedicineTable
        searchQuery={searchQuery}
        onEdit={handleEditClick}
      />

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl border-border/50 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </CardTitle>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingMedicine(null)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent>
              <MedicineForm
                medicine={editingMedicine || undefined}
                onSuccess={handleFormSuccess}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
