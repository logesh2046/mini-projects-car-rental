"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Navigation,
  RefreshCw,
  Eye,
  Phone,
  Clock,
  Car,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Settings,
  Users,
  Calendar,
  Shield,
  PhoneCall,
  MessageSquare,
  History,
  TrendingUp
} from "lucide-react"
// ...existing code...
import { Footer } from "@/components/footer"
import { GPSTracking } from "@/components/gps-tracking"

// Mock data for tracking
const trackingVehicles = [
  {
    id: "VH001",
    name: "BMW 3 Series",
    customerName: "John Doe",
    customerPhone: "+91 98765 43210",
    currentLocation: "Downtown Office",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    status: "active" as const,
    lastUpdate: "2 minutes ago",
    speed: 45,
    direction: "North",
    batteryLevel: 85,
    fuelLevel: 70,
    emergencyContact: "Jane Doe",
    emergencyPhone: "+91 98765 43211"
  },
  {
    id: "VH002",
    name: "Toyota Camry",
    customerName: "Sarah Wilson",
    customerPhone: "+91 98765 43212",
    currentLocation: "Airport Terminal",
    coordinates: { lat: 28.5562, lng: 77.1000 },
    status: "idle" as const,
    lastUpdate: "5 minutes ago",
    speed: 0,
    direction: "Stationary",
    batteryLevel: 90,
    fuelLevel: 60,
    emergencyContact: "Mike Wilson",
    emergencyPhone: "+91 98765 43213"
  },
  {
    id: "VH003",
    name: "Range Rover Sport",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43214",
    currentLocation: "Highway 1",
    coordinates: { lat: 28.5000, lng: 77.0500 },
    status: "emergency" as const,
    lastUpdate: "1 minute ago",
    speed: 0,
    direction: "Stopped",
    batteryLevel: 75,
    fuelLevel: 40,
    emergencyContact: "Priya Kumar",
    emergencyPhone: "+91 98765 43215"
  }
]

const trackingHistory = [
  {
    id: "TH001",
    vehicleId: "VH001",
    customerName: "John Doe",
    location: "Downtown Office",
    timestamp: "2024-01-20 14:30:00",
    speed: 45,
    status: "active"
  },
  {
    id: "TH002",
    vehicleId: "VH001",
    customerName: "John Doe",
    location: "Main Street",
    timestamp: "2024-01-20 14:25:00",
    speed: 35,
    status: "active"
  },
  {
    id: "TH003",
    vehicleId: "VH002",
    customerName: "Sarah Wilson",
    location: "Airport Terminal",
    timestamp: "2024-01-20 14:20:00",
    speed: 0,
    status: "idle"
  }
]

const emergencyAlerts = [
  {
    id: "EA001",
    vehicleId: "VH003",
    customerName: "Rajesh Kumar",
    alertType: "Emergency Stop",
    location: "Highway 1",
    timestamp: "2024-01-20 14:35:00",
    status: "active",
    priority: "high"
  },
  {
    id: "EA002",
    vehicleId: "VH001",
    customerName: "John Doe",
    alertType: "Speed Violation",
    location: "Downtown Office",
    timestamp: "2024-01-20 14:30:00",
    status: "resolved",
    priority: "medium"
  }
]

export default function AdminTrackingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle)
  }

  const handleEmergencyCall = (vehicle: any) => {
    console.log("Emergency call initiated for:", vehicle)
    // Implement emergency call functionality
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>
      case "idle":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Idle</Badge>
      case "emergency":
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Emergency</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Customer Tracking</h1>
            <p className="text-muted-foreground">Monitor and track all active vehicle rentals in real-time</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Vehicles</p>
                    <p className="text-2xl font-bold text-foreground">{trackingVehicles.length}</p>
                    <p className="text-xs text-green-600">+2 this hour</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-green-600">
                    <Car className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Emergency Alerts</p>
                    <p className="text-2xl font-bold text-foreground">{emergencyAlerts.filter(a => a.status === "active").length}</p>
                    <p className="text-xs text-red-600">Requires attention</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-blue-600">+8 this week</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold text-foreground">2.5 min</p>
                    <p className="text-xs text-green-600">-0.5 min</p>
                  </div>
                  <div className="p-3 rounded-full bg-muted text-purple-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="tracking" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
              <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
              <TabsTrigger value="history">Tracking History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Live Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <GPSTracking
                vehicles={trackingVehicles}
                onVehicleSelect={handleVehicleSelect}
                onEmergencyCall={handleEmergencyCall}
              />
            </TabsContent>

            {/* Emergency Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Emergency Alerts</h2>
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

              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <Card key={alert.id} className={alert.status === "active" ? "border-red-200 bg-red-50" : ""}>
                    <CardContent className="p-6">
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
                            Vehicle: {alert.vehicleId} | Customer: {alert.customerName}
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
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Emergency Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            <Navigation className="h-4 w-4 mr-2" />
                            Navigate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tracking History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Tracking History</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search history..." className="w-64" />
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Movement History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingHistory.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Car className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{entry.customerName}</p>
                            <p className="text-sm text-muted-foreground">Vehicle: {entry.vehicleId}</p>
                            <p className="text-sm text-muted-foreground">Location: {entry.location}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-medium">{entry.timestamp}</p>
                          <p className="text-sm text-muted-foreground">Speed: {entry.speed} km/h</p>
                          {getStatusBadge(entry.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Usage Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                        <p>Usage analytics chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Response Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Response Time</span>
                        <span className="font-semibold">2.5 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Emergency Calls Today</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Resolved Alerts</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Alerts</span>
                        <span className="font-semibold text-red-600">1</span>
                      </div>
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
