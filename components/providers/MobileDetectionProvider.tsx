'use client'

import { useMobileDetection } from '@/lib/hooks/useMobileDetection'

export function MobileDetectionProvider() {
  useMobileDetection()
  return null
}