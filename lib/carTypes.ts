export const CAR_TYPES = [
  'Economy',
  'Compact',
  'Midsize',
  'Luxury',
  'SUV'
]

export function normalizeCarType(v?: string) {
  if (!v) return ''
  const key = v.trim().toLowerCase()
  const found = CAR_TYPES.find(t => t.toLowerCase() === key)
  return found || ''
}
