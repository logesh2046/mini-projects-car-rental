"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
  Star,
  Users,
  Fuel,
  Settings,
  Gauge,
  Upload,
  FileText,
  Image,
  X,
  GraduationCap,
  CreditCard as CardIcon,
  FileCheck
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// Mock car data - in a real app, this would come from an API
const carData = {
  1: {
    id: 1,
    name: "BMW 3 Series",
    type: "Luxury Sedan",
    price: 89,
    originalPrice: 99,
    image: "/bmw-3-series-luxury-sedan.jpg",
    rating: 4.8,
    reviews: 124,
    location: "Downtown",
    available: true,
    specifications: {
      seats: 5,
      transmission: "8-Speed Automatic",
      fuelType: "Petrol",
      year: "2023",
    },
  },
  2: {
    id: 2,
    name: "Toyota Camry",
    type: "Midsize Sedan",
    price: 59,
    originalPrice: 69,
    image: "/toyota-camry-midsize-sedan.jpg",
    rating: 4.6,
    reviews: 89,
    location: "Airport",
    available: true,
    specifications: {
      seats: 5,
      transmission: "CVT Automatic",
      fuelType: "Hybrid",
      year: "2023",
    },
  },
  3: {
    id: 3,
    name: "Range Rover Sport",
    type: "Luxury SUV",
    price: 149,
    originalPrice: 169,
    image: "/range-rover-sport-luxury-suv.jpg",
    rating: 4.9,
    reviews: 156,
    location: "Downtown",
    available: true,
    specifications: {
      seats: 7,
      transmission: "8-Speed Automatic",
      fuelType: "Petrol",
      year: "2023",
    },
  },
  4: {
    id: 4,
    name: "Honda Civic",
    type: "Compact Car",
    price: 45,
    originalPrice: 55,
    image: "/honda-civic-compact-car.png",
    rating: 4.4,
    reviews: 67,
    location: "City Center",
    available: true,
    specifications: {
      seats: 5,
      transmission: "6-Speed Manual",
      fuelType: "Petrol",
      year: "2023",
    },
  },
  5: {
    id: 5,
    name: "Mercedes C-Class",
    type: "Luxury Sedan",
    price: 95,
    originalPrice: 110,
    image: "/mercedes-c-class-luxury-sedan.jpg",
    rating: 4.7,
    reviews: 98,
    location: "Airport",
    available: false,
    specifications: {
      seats: 5,
      transmission: "9-Speed Automatic",
      fuelType: "Petrol",
      year: "2023",
    },
  },
  6: {
    id: 6,
    name: "Ford Explorer",
    type: "SUV",
    price: 79,
    originalPrice: 89,
    image: "/ford-explorer-suv.png",
    rating: 4.5,
    reviews: 112,
    location: "Downtown",
    available: true,
    specifications: {
      seats: 7,
      transmission: "10-Speed Automatic",
      fuelType: "Petrol",
      year: "2023",
    },
  },
}

export default function BookingPage() {
  const params = useParams()
  const carId = params.id as string
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    returnTime: "",
    pickupLocation: "",
    returnLocation: "",
    driverAge: "",
    additionalDriver: false,
    insurance: "basic",
    paymentMethod: "card",
    agreeToTerms: false,
    userType: "professional", // professional, student, business
    // Odometer readings (km) and per-km rate
    pickupOdometer: "",
    returnOdometer: "",
    perKmRate: "10", // ₹ per km
    documents: {
      aadhar: null as File | null,
      drivingLicense: null as File | null,
      panCard: null as File | null,
      studentId: null as File | null,
      businessLicense: null as File | null
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const car = carData[parseInt(carId) as keyof typeof carData] || carData[1]

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Car not found</h2>
          <p className="text-muted-foreground mb-4">The car you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/cars">Browse All Cars</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (documentType: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }))
    // Clear any existing error for this document
    if (errors[documentType]) {
      setErrors(prev => ({ ...prev, [documentType]: "" }))
    }
  }

  const removeFile = (documentType: string) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: null
      }
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Pickup date is required"
    }

    if (!formData.returnDate) {
      newErrors.returnDate = "Return date is required"
    } else if (formData.pickupDate && new Date(formData.returnDate) <= new Date(formData.pickupDate)) {
      newErrors.returnDate = "Return date must be after pickup date"
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = "Pickup time is required"
    }

    if (!formData.returnTime) {
      newErrors.returnTime = "Return time is required"
    }

    if (!formData.pickupLocation) {
      newErrors.pickupLocation = "Pickup location is required"
    }

    if (!formData.returnLocation) {
      newErrors.returnLocation = "Return location is required"
    }

    if (!formData.driverAge) {
      newErrors.driverAge = "Driver age is required"
    } else if (parseInt(formData.driverAge) < 21) {
      newErrors.driverAge = "Driver must be at least 21 years old"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    // Odometer validations (optional but validated if provided)
    const pickupKm = formData.pickupOdometer ? parseFloat(formData.pickupOdometer) : undefined
    const returnKm = formData.returnOdometer ? parseFloat(formData.returnOdometer) : undefined
    const perKm = formData.perKmRate ? parseFloat(formData.perKmRate) : undefined

    if (perKm !== undefined && (isNaN(perKm) || perKm < 0)) {
      newErrors.perKmRate = "Per-km rate must be a non-negative number"
    }
    if (pickupKm !== undefined && isNaN(pickupKm)) {
      newErrors.pickupOdometer = "Enter a valid pickup odometer reading"
    }
    if (returnKm !== undefined && isNaN(returnKm)) {
      newErrors.returnOdometer = "Enter a valid return odometer reading"
    }
    if (
      pickupKm !== undefined &&
      returnKm !== undefined &&
      !isNaN(pickupKm) &&
      !isNaN(returnKm) &&
      returnKm < pickupKm
    ) {
      newErrors.returnOdometer = "Return km cannot be less than pickup km"
    }

    // Document validation based on user type
    if (formData.userType === "student") {
      if (!formData.documents.studentId) {
        newErrors.studentId = "Student ID is required for students"
      }
    } else if (formData.userType === "business") {
      if (!formData.documents.businessLicense) {
        newErrors.businessLicense = "Business license is required for business accounts"
      }
    }

    // Required documents for all users
    if (!formData.documents.aadhar) {
      newErrors.aadhar = "Aadhar card is required"
    }
    if (!formData.documents.drivingLicense) {
      newErrors.drivingLicense = "Driving license is required"
    }
    if (!formData.documents.panCard) {
      newErrors.panCard = "PAN card is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Handle booking submission
      console.log("Booking submitted:", formData)
      alert("Booking confirmed! You will receive a confirmation email shortly.")
    }
  }

  // Calculate rental days and total cost
  const calculateRentalDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate)
      const returnDate = new Date(formData.returnDate)
      const diffTime = Math.abs(returnDate.getTime() - pickup.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  const rentalDays = calculateRentalDays()
  const basePrice = car.price * rentalDays
  const insuranceCost = formData.insurance === "premium" ? 15 * rentalDays : 0
  const pickupKmCalc = parseFloat(formData.pickupOdometer || "0")
  const returnKmCalc = parseFloat(formData.returnOdometer || "0")
  const perKmCalc = parseFloat(formData.perKmRate || "0")
  const distanceKm = Math.max(0, isNaN(returnKmCalc - pickupKmCalc) ? 0 : (returnKmCalc - pickupKmCalc))
  const distanceCost = Math.max(0, isNaN(distanceKm * perKmCalc) ? 0 : distanceKm * perKmCalc)
  const totalCost = basePrice + insuranceCost + distanceCost

  return (
    <>
      <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/cars" className="hover:text-primary flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Cars
              </Link>
            <span>/</span>
            <Link href={`/cars/${carId}`} className="hover:text-primary">Car Details</Link>
              <span>/</span>
              <span>Booking</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
                  <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                  <CardTitle>Complete Your Booking</CardTitle>
                        </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rental Dates */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Rental Dates & Times</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                          <Label htmlFor="pickupDate">Pickup Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="pickupDate"
                                type="date"
                              className="pl-10"
                              value={formData.pickupDate}
                                onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                              />
                            </div>
                          {errors.pickupDate && (
                            <p className="text-sm text-red-500">{errors.pickupDate}</p>
                          )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="returnDate">Return Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="returnDate"
                                type="date"
                              className="pl-10"
                              value={formData.returnDate}
                                onChange={(e) => handleInputChange("returnDate", e.target.value)}
                              />
                            </div>
                          {errors.returnDate && (
                            <p className="text-sm text-red-500">{errors.returnDate}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupTime">Pickup Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="pickupTime"
                              type="time"
                              className="pl-10"
                              value={formData.pickupTime}
                              onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                            />
                          </div>
                          {errors.pickupTime && (
                            <p className="text-sm text-red-500">{errors.pickupTime}</p>
                          )}
                        </div>

                            <div className="space-y-2">
                              <Label htmlFor="returnTime">Return Time</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="returnTime"
                              type="time"
                              className="pl-10"
                              value={formData.returnTime}
                              onChange={(e) => handleInputChange("returnTime", e.target.value)}
                            />
                          </div>
                          {errors.returnTime && (
                            <p className="text-sm text-red-500">{errors.returnTime}</p>
                          )}
                        </div>
                            </div>
                          </div>

                    <Separator />

                    {/* Locations */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Pickup & Return Locations</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                          <Label htmlFor="pickupLocation">Pickup Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Select value={formData.pickupLocation} onValueChange={(value) => handleInputChange("pickupLocation", value)}>
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select pickup location" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="downtown">Downtown Office</SelectItem>
                                <SelectItem value="airport">Airport Terminal</SelectItem>
                                <SelectItem value="city-center">City Center</SelectItem>
                                <SelectItem value="hotel">Hotel Delivery</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          {errors.pickupLocation && (
                            <p className="text-sm text-red-500">{errors.pickupLocation}</p>
                          )}
                        </div>

                            <div className="space-y-2">
                              <Label htmlFor="returnLocation">Return Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Select value={formData.returnLocation} onValueChange={(value) => handleInputChange("returnLocation", value)}>
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select return location" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="downtown">Downtown Office</SelectItem>
                                <SelectItem value="airport">Airport Terminal</SelectItem>
                                <SelectItem value="city-center">City Center</SelectItem>
                                <SelectItem value="hotel">Hotel Pickup</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          {errors.returnLocation && (
                            <p className="text-sm text-red-500">{errors.returnLocation}</p>
                          )}
                          </div>
                          </div>
                    </div>

                    <Separator />

                    {/* Odometer Readings (Speedometer) */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Odometer Readings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupOdometer">Pickup Km</Label>
                          <div className="relative">
                            <Gauge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="pickupOdometer"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.1"
                              placeholder="e.g. 12,345.6"
                              className="pl-10"
                              value={formData.pickupOdometer}
                              onChange={(e) => handleInputChange("pickupOdometer", e.target.value)}
                            />
                          </div>
                          {errors.pickupOdometer && (
                            <p className="text-sm text-red-500">{errors.pickupOdometer}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="returnOdometer">Return Km</Label>
                          <div className="relative">
                            <Gauge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="returnOdometer"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.1"
                              placeholder="e.g. 12,980.0"
                              className="pl-10"
                              value={formData.returnOdometer}
                              onChange={(e) => handleInputChange("returnOdometer", e.target.value)}
                            />
                          </div>
                          {errors.returnOdometer && (
                            <p className="text-sm text-red-500">{errors.returnOdometer}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="perKmRate">Per Km Rate (₹)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="perKmRate"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.5"
                              placeholder="e.g. 10"
                              className="pl-10"
                              value={formData.perKmRate}
                              onChange={(e) => handleInputChange("perKmRate", e.target.value)}
                            />
                          </div>
                          {errors.perKmRate && (
                            <p className="text-sm text-red-500">{errors.perKmRate}</p>
                          )}
                        </div>
                      </div>
                      {formData.pickupOdometer && formData.returnOdometer && (
                        <p className="text-sm text-muted-foreground">Distance: {distanceKm} km</p>
                      )}
                    </div>

                    {/* Driver Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Driver Information</h3>
                            <div className="space-y-2">
                        <Label htmlFor="driverAge">Driver Age</Label>
                              <Input
                          id="driverAge"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.driverAge}
                          onChange={(e) => handleInputChange("driverAge", e.target.value)}
                        />
                        {errors.driverAge && (
                          <p className="text-sm text-red-500">{errors.driverAge}</p>
                        )}
                            </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="additionalDriver"
                          checked={formData.additionalDriver}
                          onCheckedChange={(checked) => handleInputChange("additionalDriver", checked as boolean)}
                        />
                        <Label htmlFor="additionalDriver">Add additional driver (+₹10/day)</Label>
                            </div>
                    </div>

                    <Separator />

                    {/* User Type Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">User Type</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="professional"
                            name="userType"
                            value="professional"
                            checked={formData.userType === "professional"}
                            onChange={(e) => handleInputChange("userType", e.target.value)}
                          />
                          <Label htmlFor="professional" className="flex-1">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Professional</p>
                                <p className="text-sm text-muted-foreground">Working professional</p>
                            </div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="student"
                            name="userType"
                            value="student"
                            checked={formData.userType === "student"}
                            onChange={(e) => handleInputChange("userType", e.target.value)}
                          />
                          <Label htmlFor="student" className="flex-1">
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Student</p>
                                <p className="text-sm text-muted-foreground">College/University student</p>
                            </div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="business"
                            name="userType"
                            value="business"
                            checked={formData.userType === "business"}
                            onChange={(e) => handleInputChange("userType", e.target.value)}
                          />
                          <Label htmlFor="business" className="flex-1">
                            <div className="flex items-center">
                              <CardIcon className="h-4 w-4 mr-2" />
                              <div>
                                <p className="font-medium">Business</p>
                                <p className="text-sm text-muted-foreground">Business account</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                            </div>
                          </div>

                          <Separator />

                    {/* Document Upload */}
                          <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Required Documents</h3>
                      <p className="text-sm text-muted-foreground">
                        Please upload clear, readable images of your documents. All documents must be valid and not expired.
                      </p>

                      {/* Aadhar Card */}
                              <div className="space-y-2">
                        <Label htmlFor="aadhar">Aadhar Card *</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          {formData.documents.aadhar ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">{formData.documents.aadhar.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {(formData.documents.aadhar.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                              </div>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile("aadhar")}
                              >
                                <X className="h-4 w-4" />
                            </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Click to upload Aadhar card (Front & Back)
                              </p>
                              <input
                                type="file"
                                id="aadhar"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleFileUpload("aadhar", file)
                                }}
                                className="hidden"
                              />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("aadhar")?.click()}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Aadhar
                            </Button>
                          </div>
                          )}
                        </div>
                        {errors.aadhar && (
                          <p className="text-sm text-red-500">{errors.aadhar}</p>
                        )}
                      </div>

                      {/* Driving License */}
                      <div className="space-y-2">
                        <Label htmlFor="drivingLicense">Driving License *</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          {formData.documents.drivingLicense ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">{formData.documents.drivingLicense.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {(formData.documents.drivingLicense.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile("drivingLicense")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Click to upload Driving License (Front & Back)
                              </p>
                              <input
                                type="file"
                                id="drivingLicense"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleFileUpload("drivingLicense", file)
                                }}
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("drivingLicense")?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload License
                              </Button>
                                </div>
                          )}
                              </div>
                        {errors.drivingLicense && (
                          <p className="text-sm text-red-500">{errors.drivingLicense}</p>
                        )}
                            </div>

                      {/* PAN Card */}
                      <div className="space-y-2">
                        <Label htmlFor="panCard">PAN Card *</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          {formData.documents.panCard ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">{formData.documents.panCard.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {(formData.documents.panCard.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile("panCard")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Click to upload PAN Card
                              </p>
                              <input
                                type="file"
                                id="panCard"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) handleFileUpload("panCard", file)
                                }}
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById("panCard")?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload PAN Card
                              </Button>
                                </div>
                          )}
                              </div>
                        {errors.panCard && (
                          <p className="text-sm text-red-500">{errors.panCard}</p>
                        )}
                          </div>

                      {/* Student ID (if student) */}
                      {formData.userType === "student" && (
                          <div className="space-y-2">
                          <Label htmlFor="studentId">Student ID Card *</Label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            {formData.documents.studentId ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <GraduationCap className="h-8 w-8 text-primary" />
                                  <div>
                                    <p className="font-medium">{formData.documents.studentId.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {(formData.documents.studentId.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                          </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFile("studentId")}
                                >
                                  <X className="h-4 w-4" />
                            </Button>
                          </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Click to upload Student ID Card
                                </p>
                                <input
                                  type="file"
                                  id="studentId"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleFileUpload("studentId", file)
                                  }}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById("studentId")?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Student ID
                                </Button>
                              </div>
                            )}
                          </div>
                          {errors.studentId && (
                            <p className="text-sm text-red-500">{errors.studentId}</p>
                          )}
                        </div>
                      )}

                      {/* Business License (if business) */}
                      {formData.userType === "business" && (
                            <div className="space-y-2">
                          <Label htmlFor="businessLicense">Business License *</Label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            {formData.documents.businessLicense ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <CardIcon className="h-8 w-8 text-primary" />
                                  <div>
                                    <p className="font-medium">{formData.documents.businessLicense.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {(formData.documents.businessLicense.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                            </div>
                            </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFile("businessLicense")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Click to upload Business License
                                </p>
                                <input
                                  type="file"
                                  id="businessLicense"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) handleFileUpload("businessLicense", file)
                                  }}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById("businessLicense")?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Business License
                                </Button>
                              </div>
                            )}
                            </div>
                          {errors.businessLicense && (
                            <p className="text-sm text-red-500">{errors.businessLicense}</p>
                          )}
                        </div>
                      )}
                          </div>

                          <Separator />

                    {/* Insurance */}
                          <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Insurance Coverage</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="basicInsurance"
                            name="insurance"
                            value="basic"
                            checked={formData.insurance === "basic"}
                            onChange={(e) => handleInputChange("insurance", e.target.value)}
                          />
                          <Label htmlFor="basicInsurance" className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Basic Coverage (Included)</p>
                                <p className="text-sm text-muted-foreground">Standard liability coverage</p>
                            </div>
                              <span className="text-green-600 font-semibold">Free</span>
                              </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="premiumInsurance"
                            name="insurance"
                            value="premium"
                            checked={formData.insurance === "premium"}
                            onChange={(e) => handleInputChange("insurance", e.target.value)}
                          />
                          <Label htmlFor="premiumInsurance" className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Premium Coverage</p>
                                <p className="text-sm text-muted-foreground">Comprehensive coverage with zero deductible</p>
                              </div>
                              <span className="text-primary font-semibold">₹15/day</span>
                            </div>
                          </Label>
                        </div>
                            </div>
                          </div>

                          <Separator />

                    {/* Terms and Conditions */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                  Terms and Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                  Privacy Policy
                                </Link>
                              </Label>
                            </div>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                      )}
                          </div>

                    <Button type="submit" className="w-full" size="lg">
                      Confirm Booking
                            </Button>
                  </form>
                        </CardContent>
                      </Card>
                  </div>

            {/* Right Column - Booking Summary */}
                  <div className="space-y-6">
              {/* Car Summary */}
              <Card>
                      <CardHeader>
                        <CardTitle>Booking Summary</CardTitle>
                      </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                          <img
                        src={car.image}
                            alt={car.name}
                        className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                        <h3 className="font-semibold">{car.name}</h3>
                            <p className="text-sm text-muted-foreground">{car.type}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{car.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({car.reviews})</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {car.specifications.seats} seats
                          </div>
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                        {car.specifications.transmission}
                          </div>
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-2 text-muted-foreground" />
                        {car.specifications.fuelType}
                          </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {car.location}
                        </div>
                          </div>
                            </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                            <div className="flex justify-between">
                      <span>Base rate ({rentalDays} days)</span>
                      <span>₹{basePrice}</span>
                            </div>
                    <div className="flex justify-between">
                      <span>Distance charge ({distanceKm} km @ ₹{isNaN(perKmCalc) ? 0 : perKmCalc}/km)</span>
                      <span>₹{distanceCost}</span>
                    </div>
                    {formData.insurance === "premium" && (
                            <div className="flex justify-between">
                        <span>Premium insurance</span>
                        <span>₹{insuranceCost}</span>
                            </div>
                          )}
                    {formData.additionalDriver && (
                            <div className="flex justify-between">
                        <span>Additional driver</span>
                        <span>₹{rentalDays * 10}</span>
                            </div>
                          )}
                        <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{totalCost}</span>
                        </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Aadhar Card (Front & Back)</span>
                          </div>
                          <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Driving License (Front & Back)</span>
                          </div>
                          <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-blue-600" />
                      <span>PAN Card</span>
                          </div>
                    {formData.userType === "student" && (
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Student ID Card</span>
                        </div>
                    )}
                    {formData.userType === "business" && (
                      <div className="flex items-center">
                        <CardIcon className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Business License</span>
                  </div>
                    )}
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> All documents must be clear, readable, and not expired. 
                        Upload high-quality images for faster verification.
                      </p>
                </div>
                </div>
                </CardContent>
              </Card>

              {/* What's Included */}
                <Card>
                  <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      <span>Comprehensive Insurance</span>
                      </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>24/7 Roadside Assistance</span>
                      </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>Free Cancellation</span>
                      </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <span>Unlimited Mileage</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                    </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}