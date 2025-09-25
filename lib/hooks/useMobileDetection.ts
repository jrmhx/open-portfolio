'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/types'
import { setIsMobile } from '@/store/slices/uiSlice'

export function useMobileDetection() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768
      console.log('Mobile detection - window width:', window.innerWidth, 'isMobile:', isMobileDevice)
      dispatch(setIsMobile(isMobileDevice))
    }

    // Initial check
    checkMobile()

    // Add event listener with throttling
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      console.log('Mobile detection cleanup')
    }
  }, [dispatch])
}