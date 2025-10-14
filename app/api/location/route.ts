import { NextResponse } from 'next/server'

// Simple proxy to OpenStreetMap Nominatim search API
// GET /api/location?q=search+term
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const q = url.searchParams.get('q') || ''
    if (!q) return NextResponse.json([], { status: 200 })

    const nominatim = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=0&limit=7`
    const res = await fetch(nominatim, { headers: { 'User-Agent': 'car-rental-demo/1.0' } })
    if (!res.ok) return NextResponse.json([], { status: res.status })
    const data = await res.json()

    // map to simplified shape
    const out = (data || []).map((item: any) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
    }))

    return NextResponse.json(out)
  } catch (err) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
