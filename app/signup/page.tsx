"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    userType: "customer",
    agreeToTerms: false,
    agreeToMarketing: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const today = new Date()
      const birthDate = new Date(formData.dateOfBirth)
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old"
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Handle form submission here
      console.log("Form submitted:", formData)
      // You can add API call here to register the user
      alert("Account created successfully! Please check your email for verification.")
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Create Your Account
              </h1>
              <p className="text-muted-foreground">
                Join CarRental and start your journey with us
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="userType">Account Type</Label>
                    <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          className="pl-10"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          className="pl-10"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        className="pl-10"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Enter your street address"
                          className="pl-10"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-500">{errors.state}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          type="text"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        />
                        {errors.zipCode && (
                          <p className="text-sm text-red-500">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </div>

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

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToMarketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                      />
                      <Label htmlFor="agreeToMarketing" className="text-sm">
                        I would like to receive marketing communications and updates
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Create Account
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/login" className="text-primary hover:underline font-medium">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
