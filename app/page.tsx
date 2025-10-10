import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Star, Shield, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                    Find Your Perfect <span className="text-primary">Rental Car</span>
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty">
                    Discover the best car rental deals with our premium fleet. Book now and drive with confidence.
                  </p>
                </div>

                {/* Search Form */}
                <Card className="p-6 shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Pick-up Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter location" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Pick-up Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Return Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="date" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Car Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="midsize">Midsize</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="lg">
                      Search Available Cars
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    src="/modern-luxury-car-side-view-silver.jpg"
                    alt="Luxury rental car"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Featured Vehicles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our premium selection of well-maintained vehicles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "BMW 3 Series",
                  type: "Luxury Sedan",
                  price: "89",
                  image: "/bmw-3-series-luxury-sedan.jpg",
                  features: ["Automatic", "5 Seats", "Premium Audio"],
                },
                {
                  name: "Toyota Camry",
                  type: "Midsize Sedan",
                  price: "59",
                  image: "/toyota-camry-midsize-sedan.jpg",
                  features: ["Automatic", "5 Seats", "Fuel Efficient"],
                },
                {
                  name: "Range Rover Sport",
                  type: "Luxury SUV",
                  price: "149",
                  image: "/range-rover-sport-luxury-suv.jpg",
                  features: ["AWD", "7 Seats", "Premium Interior"],
                },
              ].map((car, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{car.name}</h3>
                        <p className="text-muted-foreground">{car.type}</p>
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
                        <Button asChild>
                          <Link href={`/cars/${index + 1}`}>Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose CarRental?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide the best car rental experience with premium service and competitive prices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Fully Insured",
                  description: "All our vehicles come with comprehensive insurance coverage for your peace of mind.",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Round-the-clock customer support to assist you whenever you need help.",
                },
                {
                  icon: Users,
                  title: "Best Prices",
                  description: "Competitive pricing with no hidden fees. Get the best value for your money.",
                },
              ].map((feature, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
