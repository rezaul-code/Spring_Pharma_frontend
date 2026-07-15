'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDashboardStats } from '@/hooks/queries/useDashboard'
import { SalesChart } from '@/components/dashboard/sales-chart'
import { StockHealth } from '@/components/dashboard/stock-health'
import { TopMedicines } from '@/components/dashboard/top-medicines'
import { BarChart3, Pill, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: stats, isLoading } = useDashboardStats()

  const statItems = [
    {
      title: 'Total Medicines',
      value: stats?.totalMedicines,
      icon: Pill,
      color: 'from-primary to-secondary'
    },
    {
      title: 'Sales Today',
      value: `₹${stats?.totalSales || 0}`,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Staff',
      value: stats?.totalStaff,
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Total Bills',
      value: stats?.totalBills,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          {user?.pharmacy?.name || 'Your Pharmacy'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Top Medicines */}
        <TopMedicines />
      </div>

      {/* Stock Health and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockHealth />
        </div>

        {/* Quick Stats Card */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-2xl font-bold text-orange-400">{stats?.lowStockMedicines}</p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold text-primary">₹{stats?.averageOrderValue}</p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Medicines</p>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-2xl font-bold text-secondary">{stats?.totalMedicines}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Create Bill', href: '/dashboard/billing', color: 'text-blue-400' },
              { label: 'Add Medicine', href: '/dashboard/medicines', color: 'text-green-400' },
              { label: 'View Analytics', href: '/dashboard/analytics', color: 'text-purple-400' },
              { label: 'Manage Staff', href: '/dashboard/staff', color: 'text-pink-400' }
            ].map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-center font-medium text-foreground hover:text-primary"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
