"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 98765 43210", "+91 98765 43211"],
    description: "Call us for immediate assistance"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@carrental.com", "bookings@carrental.com"],
    description: "Send us an email anytime"
  },
  {
    icon: MapPin,
    title: "Office Address",
    details: ["123 Business Park, Sector 5", "Gurgaon, Haryana 122001"],
    description: "Visit our main office"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 9:00 AM - 6:00 PM"],
    description: "We're here to help you"
  }
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" }
]

const faqs = [
  {
    question: "How do I book a car?",
    answer: "You can book a car through our website, mobile app, or by calling our customer service. Simply select your dates, choose a vehicle, and complete the booking process."
  },
  {
    question: "What documents do I need?",
    answer: "You'll need a valid driving license, Aadhar card, and PAN card. For students, a student ID is also required. All documents must be clear and not expired."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking up to 24 hours before pickup time. Cancellation fees may apply depending on the timing of your cancellation."
  },
  {
    question: "What if I have an emergency?",
    answer: "We provide 24/7 roadside assistance. In case of emergency, call our emergency helpline at +91 98765 43210 and we'll assist you immediately."
  },
  {
    question: "Do you provide insurance?",
    answer: "Yes, all our vehicles come with comprehensive insurance coverage. You can also opt for premium insurance for additional protection."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. Cash payments are also accepted at select locations."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
    preferredContact: "email"
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select inquiry type"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        inquiryType: "",
        message: "",
        preferredContact: "email"
      })
    }, 3000)
  }

  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're here to help! Reach out to us for any questions, support, or feedback.
                Our team is ready to assist you 24/7.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inquiryType">Inquiry Type *</Label>
                          <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="booking">Booking Support</SelectItem>
                              <SelectItem value="technical">Technical Issue</SelectItem>
                              <SelectItem value="billing">Billing & Payment</SelectItem>
                              <SelectItem value="complaint">Complaint</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.inquiryType && (
                            <p className="text-sm text-red-500">{errors.inquiryType}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          placeholder="Enter message subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                        />
                        {errors.subject && (
                          <p className="text-sm text-red-500">{errors.subject}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500">{errors.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                        <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange("preferredContact", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a href={social.href} aria-label={social.label}>
                          <social.icon className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="mt-20">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Emergency Contact</h3>
                <p className="text-muted-foreground mb-4">
                  For urgent assistance or emergencies, call our 24/7 helpline
                </p>
                <Button size="lg" className="bg-red-500 hover:bg-red-600">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 98765 43210
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
