'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lock, Building2, User } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    alert('Password changed successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowPasswordForm(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage pharmacy and account settings</p>
      </div>

      {/* Pharmacy Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <CardTitle>Pharmacy Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Pharmacy Name</Label>
            <Input
              type="text"
              placeholder="SpringPharma"
              className="mt-2"
              defaultValue={user?.pharmacy?.name || ''}
            />
          </div>
          <div>
            <Label>License Number</Label>
            <Input
              type="text"
              placeholder="PH-2024-001"
              className="mt-2"
              defaultValue={user?.pharmacy?.licenseNumber || ''}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              placeholder="123 Pharmacy Street"
              className="mt-2"
              defaultValue={user?.pharmacy?.address || ''}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Pharmacy Settings</Button>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle>Account Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" className="mt-2" defaultValue={user?.name || ''} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" className="mt-2" defaultValue={user?.email || ''} />
          </div>
          <div>
            <Label>Role</Label>
            <div className="mt-2">
              <Badge className="bg-purple-500/20 text-purple-400 capitalize">
                {user?.role || 'User'}
              </Badge>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Update Account</Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showPasswordForm ? (
            <Button
              variant="outline"
              onClick={() => setShowPasswordForm(true)}
              className="border-border hover:bg-muted"
            >
              Change Password
            </Button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  className="mt-2"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  className="mt-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  className="mt-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPasswordForm(false)}
                  className="border-border hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
