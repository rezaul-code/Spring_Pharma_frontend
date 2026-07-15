'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Pill, BarChart3, Users, Clock } from 'lucide-react'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SpringPharma</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                onClick={() => router.push('/dashboard')}
                className="bg-primary hover:bg-primary/90"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push('/register')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Manage Your Pharmacy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ease</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                SpringPharma is a modern, intuitive pharmacy management system designed to streamline your operations and boost efficiency.
              </p>
            </div>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <Button
                  onClick={() => router.push('/dashboard')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  Open Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => router.push('/register')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    onClick={() => router.push('/login')}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 border border-border/50 backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-muted rounded-lg animate-pulse"></div>
                    <div className="h-20 bg-muted rounded-lg animate-pulse"></div>
                  </div>
                  <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border/50">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Pill,
              title: 'Medicine Management',
              description: 'Track inventory, stock levels, and expiry dates with ease'
            },
            {
              icon: BarChart3,
              title: 'Sales Analytics',
              description: 'Real-time insights into sales trends and revenue'
            },
            {
              icon: Users,
              title: 'Staff Management',
              description: 'Manage team members and their roles efficiently'
            },
            {
              icon: Clock,
              title: 'Quick Billing',
              description: 'Fast and accurate point-of-sale billing system'
            }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to transform your pharmacy?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Join hundreds of pharmacies already using SpringPharma</p>
          {!isAuthenticated && (
            <Button
              onClick={() => router.push('/register')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Get Started for Free
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 SpringPharma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
