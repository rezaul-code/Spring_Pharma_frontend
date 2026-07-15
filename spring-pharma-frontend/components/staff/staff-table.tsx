'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteStaff } from '@/hooks/mutations/useStaff'
import { Staff } from '@/types'
import { Edit2, Trash2, Mail, Phone } from 'lucide-react'

interface StaffTableProps {
  staff: Staff[]
  isLoading: boolean
  onEdit: (staff: Staff) => void
}

const roleColors: Record<string, string> = {
  pharmacist: 'bg-blue-500/20 text-blue-400',
  cashier: 'bg-green-500/20 text-green-400',
  manager: 'bg-purple-500/20 text-purple-400',
}

export function StaffTable({ staff, isLoading, onEdit }: StaffTableProps) {
  const deleteStaff = useDeleteStaff()

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Staff Members ({staff.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {staff.length === 0 ? (
          <p className="text-muted-foreground">No staff members found</p>
        ) : (
          <div className="space-y-4">
            {staff.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    {member.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                  <Badge className={`mt-2 ${roleColors[member.role] || 'bg-gray-500/20 text-gray-400'}`}>
                    {member.role}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(member)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure?')) {
                        deleteStaff.mutate(member.id)
                      }
                    }}
                    className="text-destructive hover:bg-destructive/10"
                    disabled={deleteStaff.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
