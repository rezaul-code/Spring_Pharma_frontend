'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAnalyticsData } from '@/hooks/queries/useAnalytics'
import { RevenueChart } from '@/components/analytics/revenue-chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AnalyticsPage() {
  const { data: analytics } = useAnalyticsData()

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-2">Sales trends and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{analytics?.billsCount}</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">+12% this month</Badge>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">₹{analytics?.totalRevenue}</p>
            <Badge className="mt-2 bg-blue-500/20 text-blue-400">+8% this month</Badge>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Bill Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-secondary">₹{analytics?.averageBillValue}</p>
            <Badge className="mt-2 bg-purple-500/20 text-purple-400">+5% this month</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      {analytics?.salesByDay && (
        <RevenueChart data={analytics.salesByDay} />
      )}

      {/* Top Selling Medicines */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Top Selling Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.topMedicines}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="quantity" fill="var(--primary)" name="Quantity Sold" />
              <Bar dataKey="revenue" fill="var(--secondary)" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
