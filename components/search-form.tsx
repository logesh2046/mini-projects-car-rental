"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import LocationAutocomplete from "./location-autocomplete"
import { useRouter } from "next/navigation"

export default function SearchForm() {
  const [location, setLocation] = useState("")
  const [pickedPlace, setPickedPlace] = useState<{ display_name: string; lat?: string; lon?: string } | null>(null)
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [carType, setCarType] = useState("")
  const router = useRouter()

  const suggestions = ["Airport", "Downtown", "City Center", "Train Station", "Hotel Plaza"]

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set("pickup", location)
    if (pickedPlace?.lat && pickedPlace?.lon) {
      params.set("pickupLat", pickedPlace.lat)
      params.set("pickupLon", pickedPlace.lon)
    }
    if (pickupDate) params.set("pickupDate", pickupDate)
    if (returnDate) params.set("returnDate", returnDate)
    if (carType && carType !== "any") params.set("carType", carType)
    router.push(`/cars?${params.toString()}`)
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-1">Pick-up Location</label>
            <LocationAutocomplete
              value={location}
              onChange={(v) => { setLocation(v); setPickedPlace(null) }}
              onSelect={(place) => { setPickedPlace(place) }}
              suggestions={suggestions}
              size="lg"
            />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-1">Pick-up Date</label>
            <Input uiSize="lg" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-1">Return Date</label>
            <Input uiSize="lg" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-1">Car Type</label>
            <Select onValueChange={setCarType}>
              <SelectTrigger size="lg" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Compact">Compact</SelectItem>
                <SelectItem value="Midsize">Midsize</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Button size="lg" className="w-full" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}