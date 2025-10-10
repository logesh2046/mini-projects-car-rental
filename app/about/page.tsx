"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Shield,
  Clock,
  Users,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  TrendingUp,
  Heart,
  Target,
  Lightbulb,
  Zap,
  Globe2
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

const stats = [
  { number: "10,000+", label: "Happy Customers", icon: Users },
  { number: "500+", label: "Fleet Vehicles", icon: Car },
  { number: "50+", label: "Cities Covered", icon: MapPin },
  { number: "99%", label: "Customer Satisfaction", icon: Star },
]

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize the safety of our customers with comprehensive insurance coverage and well-maintained vehicles."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need help, anywhere, anytime."
  },
  {
    icon: Heart,
    title: "Customer-Centric",
    description: "Your satisfaction is our priority. We go the extra mile to ensure you have the best experience."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously innovate to provide cutting-edge technology and seamless booking experiences."
  }
]

const team = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "/placeholder-user.jpg",
    description: "15+ years in automotive industry, passionate about revolutionizing car rental experience."
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    image: "/placeholder-user.jpg",
    description: "Expert in fleet management and customer service with 10+ years of experience."
  },
  {
    name: "Amit Patel",
    position: "Technology Director",
    image: "/placeholder-user.jpg",
    description: "Leading our digital transformation with expertise in mobile and web technologies."
  },
  {
    name: "Sneha Reddy",
    position: "Customer Success Manager",
    image: "/placeholder-user.jpg",
    description: "Dedicated to ensuring every customer has an exceptional rental experience."
  }
]

const achievements = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to make car rental accessible and convenient for everyone."
  },
  {
    year: "2021",
    title: "First 1000 Customers",
    description: "Reached our first milestone of 1000 satisfied customers across major cities."
  },
  {
    year: "2022",
    title: "Fleet Expansion",
    description: "Expanded our fleet to 200+ vehicles including luxury and economy options."
  },
  {
    year: "2023",
    title: "Digital Innovation",
    description: "Launched mobile app and AI-powered booking system for enhanced user experience."
  },
  {
    year: "2024",
    title: "National Presence",
    description: "Expanded to 50+ cities across India with 10,000+ happy customers."
  }
]

export default function AboutPage() {
  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                About <span className="text-primary">CarRental</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're on a mission to revolutionize the car rental industry by providing 
                seamless, affordable, and reliable transportation solutions for everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/cars">Explore Our Fleet</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020, CarRental started as a small local business with a big dream: 
                    to make car rental accessible, affordable, and convenient for everyone in India.
                  </p>
                  <p>
                    What began as a fleet of just 10 cars has grown into a comprehensive car rental 
                    service with 500+ vehicles across 50+ cities. Our journey has been driven by 
                    our commitment to customer satisfaction and innovation.
                  </p>
                  <p>
                    Today, we're proud to serve over 10,000 customers with a 99% satisfaction rate, 
                    offering everything from economy cars for daily commutes to luxury vehicles for 
                    special occasions.
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/cars">Start Your Journey</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/modern-luxury-car-side-view-silver.jpg"
                  alt="Our fleet"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our commitment to excellence
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind CarRental who make everything possible
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our growth and development
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{achievement.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Awards & Recognition</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Recognition for our commitment to excellence and innovation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Best Car Rental Service 2023</h3>
                  <p className="text-muted-foreground">Travel & Tourism Awards</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Customer Choice Award</h3>
                  <p className="text-muted-foreground">India Business Awards 2023</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Fastest Growing Startup</h3>
                  <p className="text-muted-foreground">Startup India Awards 2023</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust CarRental for their transportation needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/cars">Book Your Car Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
