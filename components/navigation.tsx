"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  Menu, 
  Bell, 
  User, 
  Home, 
  Calendar, 
  Settings, 
  BarChart3, 
  MapPin, 
  Phone, 
  Shield,
  Users,
  Navigation as NavigationIcon,
  LogOut,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from "next/navigation"
import { toast } from 'sonner'

interface NavigationProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role?: "customer" | "admin"
  }
}

export function Navigation({ user }: NavigationProps) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prefer client session user if available for instant UI updates after sign-in
  const currentUser = (session?.user as any) ?? user ?? null

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/cars", label: "Cars", icon: Car },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  const customerMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home, description: "Main dashboard overview" },
    { href: "/customer-dashboard", label: "My Dashboard", icon: Home, description: "View your bookings and profile" },
    { href: "/customer-dashboard?tab=bookings", label: "My Bookings", icon: Calendar, description: "Manage your reservations" },
    { href: "/customer-dashboard?tab=favorites", label: "Favorites", icon: Car, description: "Your favorite cars" },
    { href: "/customer-dashboard?tab=history", label: "History", icon: Calendar, description: "Booking history" },
    { href: "/customer-dashboard?tab=profile", label: "Profile", icon: User, description: "Account settings" },
  ]

  const adminMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3, description: "Main dashboard overview" },
    { href: "/admin-dashboard", label: "Admin Dashboard", icon: BarChart3, description: "Overview and analytics" },
    { href: "/admin-dashboard?tab=fleet", label: "Fleet Management", icon: Car, description: "Manage vehicles" },
    { href: "/admin-dashboard?tab=bookings", label: "Bookings", icon: Calendar, description: "Manage reservations" },
    { href: "/admin-dashboard?tab=emergency", label: "Emergency Contacts", icon: Shield, description: "Emergency management" },
    { href: "/admin-tracking", label: "GPS Tracking", icon: NavigationIcon, description: "Track vehicles" },
    { href: "/admin-dashboard?tab=analytics", label: "Analytics", icon: BarChart3, description: "Reports and insights" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const getUserMenuItems = () => {
    if (!currentUser) return []
    return currentUser.role === "admin" ? adminMenuItems : customerMenuItems
  }

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">CarRental</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 transition-colors ${
                  isActive(item.href) ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                
                {/* User Menu Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      <AvatarFallback>
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block">{currentUser.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                            <AvatarFallback>
                              {currentUser.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{currentUser.name}</p>
                            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                            <Badge variant="secondary" className="mt-1">
                              {currentUser.role === "admin" ? "Administrator" : "Customer"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="space-y-1">
                          <Link
                            href="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                            }`}
                          >
                            <BarChart3 className="h-5 w-5" />
                            <div className="flex-1">
                              <p className="font-medium">Dashboard</p>
                            </div>
                          </Link>

                          {currentUser?.role === 'admin' && (
                            <Link
                              href="/admin-dashboard"
                              onClick={() => setShowUserMenu(false)}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                isActive('/admin-dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                              }`}
                            >
                              <BarChart3 className="h-5 w-5" />
                              <div className="flex-1">
                                <p className="font-medium">Admin Dashboard</p>
                              </div>
                            </Link>
                          )}

                        </div>

                        <div className="border-t mt-2 pt-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={async () => {
                              try {
                                setShowUserMenu(false)
                                toast.success('Signed out successfully')
                                await signOut({ callbackUrl: '/' })
                              } catch (err) {
                                console.warn('Failed to sign out', err)
                                toast.error('Sign out failed, redirecting home')
                                window.location.href = '/'
                              }
                            }}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* User Info */}
                  {currentUser && (
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                        <AvatarFallback>
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{currentUser.name}</p>
                        <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Links */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 text-lg transition-colors ${
                        isActive(item.href) ? "text-primary font-medium" : "text-foreground hover:text-primary"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  {/* User Dashboard Menu */}
                  {currentUser && (
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        {currentUser.role === "admin" ? "Admin Panel" : "My Account"}
                      </h3>
                      <div className="space-y-2">
                          <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                            }`}
                          >
                            <BarChart3 className="h-5 w-5" />
                            <div className="flex-1">
                              <p className="font-medium">Dashboard</p>
                            </div>
                          </Link>

                          {currentUser?.role === 'admin' && (
                            <Link
                              href="/admin-dashboard"
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                isActive('/admin-dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                              }`}
                            >
                              <BarChart3 className="h-5 w-5" />
                              <div className="flex-1">
                                <p className="font-medium">Admin Dashboard</p>
                              </div>
                            </Link>
                          )}
                        </div>
                    </div>
                  )}

                  {/* Auth Buttons */}
                  {!currentUser && (
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}

                  {currentUser && (
                    <div className="pt-4 border-t">
                      <div className="space-y-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                            isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                          }`}
                        >
                          <BarChart3 className="h-5 w-5" />
                          <div className="flex-1">
                            <p className="font-medium">Dashboard</p>
                          </div>
                        </Link>

                        {currentUser?.role === 'admin' && (
                          <Link
                            href="/admin-dashboard"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive('/admin-dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                            }`}
                          >
                            <BarChart3 className="h-5 w-5" />
                            <div className="flex-1">
                              <p className="font-medium">Admin Dashboard</p>
                            </div>
                          </Link>
                        )}

                        <div>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={async () => {
                              try {
                                setIsOpen(false)
                                toast.success('Signed out successfully')
                                await signOut({ callbackUrl: '/' })
                              } catch (err) {
                                console.warn('Failed to sign out', err)
                                toast.error('Sign out failed, redirecting home')
                                window.location.href = '/'
                              }
                            }}
                          >
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
