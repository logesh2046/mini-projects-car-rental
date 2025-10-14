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
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  MapPin,
  Settings,
  Fuel,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  PhoneCall,
  UserPlus,
  Shield,
  Map,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import LeafletMap from "@/components/leaflet-map"

// Mock data for admin dashboard
const stats = [
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
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    status: "confirmed",
    amount: "₹267"
  },
  {
    id: "BK002",
    customer: "Jane Smith",
    car: "Toyota Camry",
    startDate: "2024-01-16",
    endDate: "2024-01-20",
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
  },
  {
    id: "BK004",
    customer: "Sarah Wilson",
    car: "Honda Civic",
    startDate: "2024-01-18",
    endDate: "2024-01-21",
    status: "cancelled",
    amount: "₹135"
  }
]

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
  },
  {
    id: 3,
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43214",
    emergencyContact: "Priya Kumar (Sister)",
    emergencyPhone: "+91 98765 43215",
    relationship: "Sibling",
    lastUpdated: "2024-01-13",
    status: "inactive"
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
  },
  {
    id: "BK002",
    customerName: "Sarah Wilson",
    customerPhone: "+91 98765 43212",
    carName: "Toyota Camry",
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    currentLocation: "Airport Terminal",
    gpsCoordinates: { lat: 28.5562, lng: 77.1000 },
    status: "active",
    emergencyContact: "Mike Wilson",
    emergencyPhone: "+91 98765 43213"
  }
]

const fleetData = [
  {
    id: 1,
    name: "BMW 3 Series",
    type: "Luxury Sedan",
    price: 89,
    status: "available",
    location: "Downtown",
    lastService: "2024-01-10",
    mileage: "15,230 km",
    rating: 4.8,
    bookings: 24
  },
  {
    id: 2,
    name: "Toyota Camry",
    type: "Midsize Sedan",
    price: 59,
    status: "rented",
    location: "Airport",
    lastService: "2024-01-05",
    mileage: "22,150 km",
    rating: 4.6,
    bookings: 18
  },
  {
    id: 3,
    name: "Range Rover Sport",
    type: "Luxury SUV",
    price: 149,
    status: "maintenance",
    location: "Downtown",
    lastService: "2024-01-12",
    mileage: "8,900 km",
    rating: 4.9,
    bookings: 12
  },
  {
    id: 4,
    name: "Honda Civic",
    type: "Compact Car",
    price: 45,
    status: "available",
    location: "City Center",
    lastService: "2024-01-08",
    mileage: "18,750 km",
    rating: 4.4,
    bookings: 31
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Available</Badge>
    case "rented":
      return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Rented</Badge>
    case "maintenance":
      return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Maintenance</Badge>
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

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [emergencyForm, setEmergencyForm] = useState({
    customerName: "",
    customerPhone: "",
    emergencyContact: "",
    emergencyPhone: "",
    relationship: ""
  })

  const handleEmergencyCall = (booking: any) => {
    setSelectedBooking(booking)
    setShowEmergencyModal(true)
  }

  const handleEmergencySubmit = () => {
    // Handle emergency contact submission
    console.log("Emergency contact submitted:", emergencyForm)
    setShowEmergencyModal(false)
    setEmergencyForm({
      customerName: "",
      customerPhone: "",
      emergencyContact: "",
      emergencyPhone: "",
      relationship: ""
    })
  }

  return (
    <>
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your car rental business</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
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
                          <div className="text-right space-y-1">
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
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Car
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      View All Customers
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Manage Bookings
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fleet Management Tab */}
            <TabsContent value="fleet" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cars..."
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
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Car
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fleetData.map((car) => (
                  <Card key={car.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{car.name}</h3>
                            <p className="text-muted-foreground">{car.type}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">₹{car.price}</span>
                            <span className="text-muted-foreground">/day</span>
                          </div>
                          {getStatusBadge(car.status)}
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {car.location}
                          </div>
                          <div className="flex items-center">
                            <Fuel className="h-4 w-4 mr-2" />
                            {car.mileage}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            {car.rating} ({car.bookings} bookings)
                          </div>
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-2" />
                            Last service: {car.lastService}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Edit Details
                          </Button>
                          <Button size="sm" variant="outline">
                            View Bookings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
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
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Contacts Tab */}
            <TabsContent value="emergency" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Emergency Contact
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Contacts List */}
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
                            <p className="text-sm text-muted-foreground">
                              Emergency: {contact.emergencyContact} ({contact.relationship})
                            </p>
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

                {/* Active Bookings with Emergency Info */}
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
                            <Button 
                              size="sm" 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleEmergencyCall(booking)}
                            >
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

            {/* GPS Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">GPS Tracking</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map View */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Tracking Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Replaced placeholder with Leaflet map */}
                      <div className="h-96">
                        {/* @ts-ignore */}
                        <LeafletMap bookings={activeBookings} height="24rem" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Vehicle List */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Vehicles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeBookings.map((booking) => (
                          <div key={booking.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium text-sm">{booking.carName}</p>
                                <p className="text-xs text-muted-foreground">{booking.customerName}</p>
                              </div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {booking.currentLocation}
                            </p>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                Navigate
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                        <p>Revenue chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Cars</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {fleetData.slice(0, 3).map((car, index) => (
                        <div key={car.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{car.name}</p>
                              <p className="text-sm text-muted-foreground">{car.bookings} bookings</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{car.price}</p>
                            <p className="text-sm text-muted-foreground">/day</p>
                          </div>
                        </div>
                      ))}
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
