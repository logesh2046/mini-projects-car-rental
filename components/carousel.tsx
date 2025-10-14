"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Item = { image: string; title?: string; subtitle?: string }

export default function Carousel({ items, interval = 4000 }: { items: Item[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!items || items.length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [items, interval])

  if (!items || items.length === 0) return null

  const prev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length)
  }
  const next = () => {
    setIndex((i) => (i + 1) % items.length)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)`, width: `${items.length * 100}%` }}
      >
        {items.map((it, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <img src={it.image} alt={it.title || `slide-${i}`} className="w-full h-[520px] md:h-[560px] lg:h-[620px] object-cover" />
          </div>
        ))}
      </div>

      {/* controls */}
      {items.length > 1 && (
        <>
          <Button variant="ghost" className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full" onClick={prev}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full" onClick={next}>
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
