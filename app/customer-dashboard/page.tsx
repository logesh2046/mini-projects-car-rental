"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Car,
  Calendar,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Eye,
  Download,
  Phone,
  Mail,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Navigation,
  Fuel,
  Settings,
  CreditCard,
  FileText,
  Heart,
  Share2,
  UserPlus,
  Map,
  PhoneCall
} from "lucide-react"
// ...existing code...
import { Footer } from "@/components/footer"
import Link from "next/link"

// Mock data for customer dashboard
const userStats = {
  totalBookings: 8,
  totalSpent: "₹12,450",
  favoriteCar: "BMW 3 Series",
  memberSince: "2023-06-15"
}

const currentBookings = [
  {
    id: "BK001",
    car: "BMW 3 Series",
    image: "/bmw-3-series-luxury-sedan.jpg",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    pickupLocation: "Downtown Office",
    returnLocation: "Downtown Office",
    status: "confirmed",
    amount: "₹445",
    bookingDate: "2024-01-15"
  },
  {
    id: "BK002",
    car: "Toyota Camry",
    image: "/toyota-camry-midsize-sedan.jpg",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    pickupLocation: "Airport Terminal",
    returnLocation: "Airport Terminal",
    status: "pending",
    amount: "₹236",
    bookingDate: "2024-01-18"
  }
]

const bookingHistory = [
  {
    id: "BK003",
    car: "Range Rover Sport",
    image: "/range-rover-sport-luxury-suv.jpg",
    startDate: "2023-12-15",
    endDate: "2023-12-20",
    status: "completed",
    amount: "₹745",
    rating: 5,
    review: "Excellent car! Very comfortable and smooth ride."
  },
  {
    id: "BK004",
    car: "Honda Civic",
    image: "/honda-civic-compact-car.png",
    startDate: "2023-11-10",
    endDate: "2023-11-12",
    status: "completed",
    amount: "₹90",
    rating: 4,
    review: "Good car for city driving, fuel efficient."
  },
  {
    id: "BK005",
    car: "Mercedes C-Class",
    image: "/mercedes-c-class-luxury-sedan.jpg",
    startDate: "2023-10-05",
    endDate: "2023-10-08",
    status: "cancelled",
    amount: "₹285",
    rating: null,
    review: null
  }
]

const favoriteCars = [
  {
    id: 1,
    name: "BMW 3 Series",
    type: "Luxury Sedan",
    price: 89,
    image: "/bmw-3-series-luxury-sedan.jpg",
    rating: 4.8,
    features: ["Automatic", "5 Seats", "Premium Audio"],
    isFavorite: true
  },
  {
    id: 2,
    name: "Mercedes C-Class",
    type: "Luxury Sedan",
    price: 95,
    image: "/mercedes-c-class-luxury-sedan.jpg",
    rating: 4.7,
    features: ["Automatic", "5 Seats", "Leather Interior"],
    isFavorite: true
  }
]

// Emergency mock data (mirrors admin dashboard emergency UI)
const emergencyContacts = [
  {
    id: 1,
    customerName: "John Doe",
    customerPhone: "+91 98765 43210",
    emergencyContact: "Jane Doe (Wife)",
    emergencyPhone: "+91 98765 43211",
    relationship: "Spouse",
    lastUpdated: "2024-01-15",
    status: "active"
  },
  {
    id: 2,
    customerName: "Sarah Wilson",
    customerPhone: "+91 98765 43212",
    emergencyContact: "Mike Wilson (Brother)",
    emergencyPhone: "+91 98765 43213",
    relationship: "Sibling",
    lastUpdated: "2024-01-14",
    status: "active"
  }
]

const activeBookings = [
  {
    id: "BK001",
    customerName: "John Doe",
    customerPhone: "+91 98765 43210",
    carName: "BMW 3 Series",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    currentLocation: "Downtown Office",
    gpsCoordinates: { lat: 28.4595, lng: 77.0266 },
    status: "active",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+91 98765 43211"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    case "completed":
      return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <>
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your rental activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{userStats.totalBookings}</p>
                    <p className="text-xs text-green-600">+2 this month</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-foreground">{userStats.totalSpent}</p>
                    <p className="text-xs text-green-600">+15% this month</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-green-600">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Favorite Car</p>
                    <p className="text-lg font-bold text-foreground">{userStats.favoriteCar}</p>
                    <p className="text-xs text-muted-foreground">Most booked</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-purple-600">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <p className="text-lg font-bold text-foreground">June 2023</p>
                    <p className="text-xs text-muted-foreground">7 months</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-orange-600">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            {/* My Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="lg:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {currentBookings.map((booking) => (
                  <Card key={booking.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                          <img
                            src={booking.image}
                            alt={booking.car}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{booking.car}</h3>
                              <p className="text-muted-foreground">Booking ID: {booking.id}</p>
                            </div>
                            <div className="text-right space-y-2">
                              {getStatusBadge(booking.status)}
                              <p className="text-2xl font-bold text-primary">{booking.amount}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Pickup: {booking.startDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Return: {booking.endDate}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{booking.pickupLocation}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{booking.returnLocation}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Button>
                            {booking.status === "pending" && (
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Modify
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car) => (
                  <Card key={car.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur">
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{car.name}</h3>
                          <p className="text-muted-foreground">{car.type}</p>
                        </div>

                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{car.rating}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary">₹{car.price}</span>
                            <span className="text-muted-foreground">/day</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <Card key={booking.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden">
                          <img
                            src={booking.image}
                            alt={booking.car}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{booking.car}</h3>
                              <p className="text-muted-foreground">Booking ID: {booking.id}</p>
                              <p className="text-sm text-muted-foreground">{booking.startDate} - {booking.endDate}</p>
                            </div>
                            <div className="text-right space-y-2">
                              {getStatusBadge(booking.status)}
                              <p className="text-2xl font-bold text-primary">{booking.amount}</p>
                            </div>
                          </div>

                          {booking.rating && (
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="text-sm font-medium">Your Rating:</span>
                                <div className="flex ml-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              {booking.review && (
                                <p className="text-sm text-muted-foreground italic">"{booking.review}"</p>
                              )}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                            {booking.status === "completed" && (
                              <Button size="sm" variant="outline">
                                <Star className="h-4 w-4 mr-2" />
                                Rate Again
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Emergency Tab */}
            <TabsContent value="emergency" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Emergency Contact
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{contact.customerName}</p>
                            <p className="text-sm text-muted-foreground">{contact.customerPhone}</p>
                            <p className="text-sm text-muted-foreground">Emergency: {contact.emergencyContact} ({contact.relationship})</p>
                            <p className="text-xs text-muted-foreground">{contact.emergencyPhone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeBookings.map((booking) => (
                        <div key={booking.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{booking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{booking.carName}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Location: {booking.currentLocation}</p>
                            <p>Period: {booking.startDate} - {booking.endDate}</p>
                            <p>Emergency: {booking.emergencyContact} ({booking.emergencyPhone})</p>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Map className="h-4 w-4 mr-1" />
                              Track
                            </Button>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600">
                              <PhoneCall className="h-4 w-4 mr-1" />
                              Emergency
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input type="date" defaultValue="1990-01-01" />
                    </div>
                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Book New Car
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Methods
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Documents
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
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
