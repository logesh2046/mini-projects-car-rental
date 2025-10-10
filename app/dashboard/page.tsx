"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Home,
  Car,
  Calendar,
  Shield,
  Navigation,
  Users,
  Settings,
  Bell,
  TrendingUp,
  MapPin,
  Phone,
  DollarSign,
  Clock,
  Star,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { Footer } from "@/components/footer"
import { DashboardSelector } from "@/components/dashboard-selector"
import Link from "next/link"

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder-user.jpg",
  role: "customer" as "customer" | "admin"
}

// Mock data for customer dashboard
const customerStats = [
  { title: "Total Bookings", value: "8", change: "+2 this month", icon: Calendar, color: "text-blue-600" },
  { title: "Total Spent", value: "₹12,450", change: "+15% this month", icon: DollarSign, color: "text-green-600" },
  { title: "Favorite Car", value: "BMW 3 Series", change: "Most booked", icon: Car, color: "text-purple-600" },
  { title: "Member Since", value: "June 2023", change: "7 months", icon: Star, color: "text-orange-600" },
]

// Mock data for admin dashboard
const adminStats = [
  { title: "Total Cars", value: "24", change: "+2 this month", icon: Car, color: "text-blue-600" },
  { title: "Active Bookings", value: "18", change: "+5 this week", icon: Calendar, color: "text-green-600" },
  { title: "Total Revenue", value: "₹45,230", change: "+12% this month", icon: DollarSign, color: "text-purple-600" },
  { title: "Active Users", value: "156", change: "+8 this week", icon: Users, color: "text-orange-600" },
]

const recentBookings = [
  {
    id: "BK001",
    customer: "John Doe",
    car: "BMW 3 Series",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "confirmed",
    amount: "₹445"
  },
  {
    id: "BK002",
    customer: "Sarah Wilson",
    car: "Toyota Camry",
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    status: "pending",
    amount: "₹236"
  },
  {
    id: "BK003",
    customer: "Mike Johnson",
    car: "Range Rover Sport",
    startDate: "2024-01-17",
    endDate: "2024-01-22",
    status: "completed",
    amount: "₹745"
  }
]

const emergencyAlerts = [
  {
    id: "EA001",
    vehicle: "BMW 3 Series",
    customer: "John Doe",
    alertType: "Emergency Stop",
    location: "Highway 1",
    timestamp: "2024-01-20 14:35:00",
    status: "active",
    priority: "high"
  },
  {
    id: "EA002",
    vehicle: "Toyota Camry",
    customer: "Sarah Wilson",
    alertType: "Speed Violation",
    location: "Downtown Office",
    timestamp: "2024-01-20 14:30:00",
    status: "resolved",
    priority: "medium"
  }
]

export default function DashboardPage() {
  const [user] = useState(mockUser)
  const isAdmin = user.role === "admin"
  const stats = isAdmin ? adminStats : customerStats

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case "active":
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Active</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Selector */}
          <DashboardSelector userRole={user.role} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              {isAdmin && <TabsTrigger value="emergency">Emergency</TabsTrigger>}
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isAdmin ? "Recent Bookings" : "My Recent Bookings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.slice(0, 4).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-sm text-muted-foreground">{booking.car}</p>
                            <p className="text-xs text-muted-foreground">{booking.startDate} - {booking.endDate}</p>
                          </div>
                          <div className="text-right space-y-2">
                            {getStatusBadge(booking.status)}
                            <p className="font-semibold">{booking.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isAdmin ? (
                      <>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/admin-dashboard?tab=fleet">
                            <Car className="h-4 w-4 mr-2" />
                            Manage Fleet
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/admin-dashboard?tab=bookings">
                            <Calendar className="h-4 w-4 mr-2" />
                            Manage Bookings
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/admin-dashboard?tab=emergency">
                            <Shield className="h-4 w-4 mr-2" />
                            Emergency Contacts
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/admin-tracking">
                            <Navigation className="h-4 w-4 mr-2" />
                            GPS Tracking
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/cars">
                            <Car className="h-4 w-4 mr-2" />
                            Browse Cars
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/customer-dashboard?tab=bookings">
                            <Calendar className="h-4 w-4 mr-2" />
                            My Bookings
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/customer-dashboard?tab=favorites">
                            <Star className="h-4 w-4 mr-2" />
                            Favorites
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link href="/contact">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Support
                          </Link>
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isAdmin ? "All Bookings" : "My Bookings"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Car className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-sm text-muted-foreground">{booking.car}</p>
                            <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="font-semibold text-lg">{booking.amount}</p>
                          <p className="text-sm text-muted-foreground">{booking.startDate} - {booking.endDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Tab (Admin only) */}
            {isAdmin && (
              <TabsContent value="emergency" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyAlerts.map((alert) => (
                        <div key={alert.id} className={`p-4 border rounded-lg ${
                          alert.status === "active" ? "border-red-200 bg-red-50" : ""
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <h3 className="font-semibold text-foreground">{alert.alertType}</h3>
                                <Badge className={alert.priority === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                                  {alert.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Vehicle: {alert.vehicle} | Customer: {alert.customer}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Location: {alert.location} | Time: {alert.timestamp}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                Call Customer
                              </Button>
                              <Button size="sm" variant="outline">
                                <Navigation className="h-4 w-4 mr-2" />
                                Navigate
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isAdmin ? "Revenue Overview" : "Spending Overview"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                        <p>Analytics chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isAdmin ? "Popular Cars" : "My Preferences"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {isAdmin ? (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">1</span>
                              </div>
                              <div>
                                <p className="font-medium">BMW 3 Series</p>
                                <p className="text-sm text-muted-foreground">24 bookings</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹89</p>
                              <p className="text-sm text-muted-foreground">/day</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">2</span>
                              </div>
                              <div>
                                <p className="font-medium">Toyota Camry</p>
                                <p className="text-sm text-muted-foreground">18 bookings</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹59</p>
                              <p className="text-sm text-muted-foreground">/day</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">1</span>
                              </div>
                              <div>
                                <p className="font-medium">BMW 3 Series</p>
                                <p className="text-sm text-muted-foreground">Your favorite</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">3 bookings</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">2</span>
                              </div>
                              <div>
                                <p className="font-medium">Toyota Camry</p>
                                <p className="text-sm text-muted-foreground">Frequently booked</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">2 bookings</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  )
}