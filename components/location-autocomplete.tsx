"use client"

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'

interface Props {
  value: string
  onChange: (v: string) => void
  onSelect?: (place: { display_name: string; lat?: string; lon?: string; type?: string } | null) => void
  suggestions?: string[]
  className?: string
  size?: "default" | "lg"
}

export default function LocationAutocomplete({ value, onChange, onSelect, suggestions = [], className, size }: Props) {
  const [open, setOpen] = useState(false)
  const [filtered, setFiltered] = useState<string[]>([])
  const [places, setPlaces] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement|null>(null)
  const debounceRef = useRef<number|undefined>(undefined)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  useEffect(() => {
    const q = value.trim()
    // if empty, show static suggestions
    if (!q) {
      setFiltered(suggestions.slice(0, 5))
      setPlaces([])
      setLoading(false)
      return
    }

    // debounce
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/location?q=${encodeURIComponent(q)}`)
        if (!res.ok) {
          setFiltered([])
          setLoading(false)
          return
        }
  const data = await res.json()
  // store the raw place objects so callers can access lat/lon when a suggestion is chosen
  setPlaces(data || [])
  const labels = (data || []).map((d: any) => d.display_name)
  setFiltered(labels.slice(0, 7))
      } catch (e) {
        setFiltered([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [value, suggestions])

  return (
    <div className="relative w-full" ref={ref}>
      <Input
        placeholder="Enter location"
        className={className}
        uiSize={size}
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-2 left-0 right-0 bg-white border rounded shadow-md max-h-72 overflow-auto">
          {filtered.map((s, i) => (
            <button
              key={i}
              type="button"
              className="w-full text-left px-4 py-3 hover:bg-muted"
              onClick={() => {
                // if we have a places entry for this index, expose its coordinates via onSelect
                const place = places[i]
                onChange(s)
                if (place) {
                  onSelect?.({ display_name: place.display_name, lat: place.lat, lon: place.lon, type: place.type })
                } else {
                  onSelect?.(null)
                }
                setOpen(false)
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
