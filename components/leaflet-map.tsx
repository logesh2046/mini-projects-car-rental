"use client"

import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
// Optional marker cluster CSS will be referenced in README; plugin package required if cluster option is used.

// Fix default icon paths for Leaflet in some bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface Booking {
  id: string
  customerName: string
  carName: string
  gpsCoordinates: { lat: number; lng: number }
  currentLocation?: string
}

interface Props {
  bookings: Booking[]
  height?: string
  cluster?: boolean
  showLegend?: boolean
}

function ClusterLayer({ bookings }: { bookings: Booking[] }) {
  const map = useMap()

  useEffect(() => {
    // lazy-require the markercluster plugin (must be installed by the developer)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let markerCluster: any
    try {
      // This requires the 'leaflet.markercluster' package be installed
      // and its CSS imported (see README). We use require so build won't fail
      // until the developer adds the dependency.
      // @ts-ignore
      markerCluster = (L as any).markerClusterGroup || require('leaflet.markercluster')
    } catch (err) {
      console.warn('MarkerCluster plugin is not installed. Falling back to single markers.')
      return
    }

    const group = (L as any).markerClusterGroup ? (L as any).markerClusterGroup() : markerCluster()

    bookings.forEach((b) => {
      const marker = L.marker([b.gpsCoordinates.lat, b.gpsCoordinates.lng])
      marker.bindPopup(`<div><strong>${b.carName}</strong><div>${b.customerName}</div><div>${b.currentLocation || ''}</div></div>`)
      group.addLayer(marker)
    })

    map.addLayer(group)

    return () => {
      try {
        map.removeLayer(group)
      } catch (e) {
        // ignore
      }
    }
  }, [bookings, map])

  return null
}

export default function LeafletMap({ bookings, height = '24rem', cluster = false, showLegend = false }: Props) {
  const center = bookings.length ? [bookings[0].gpsCoordinates.lat, bookings[0].gpsCoordinates.lng] : [28.4595, 77.0266]

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden relative">
      <MapContainer center={center as any} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cluster ? <ClusterLayer bookings={bookings} /> : bookings.map((b) => (
          <Marker key={b.id} position={[b.gpsCoordinates.lat, b.gpsCoordinates.lng] as any}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{b.carName}</div>
                <div className="text-muted-foreground">{b.customerName}</div>
                {b.currentLocation && <div className="text-xs text-muted-foreground">{b.currentLocation}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showLegend && (
        <div className="absolute left-3 bottom-3 bg-white/90 backdrop-blur rounded-md p-2 text-xs shadow">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Active</div>
          <div className="flex items-center gap-2 mt-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Idle</div>
          <div className="flex items-center gap-2 mt-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Emergency</div>
        </div>
      )}
    </div>
  )
}
