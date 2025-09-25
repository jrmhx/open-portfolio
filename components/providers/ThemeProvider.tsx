'use client'

import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/types'
import { setTheme } from '@/store/slices/uiSlice'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.ui.theme)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize theme only once on mount
    if (!isInitialized) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
      
      // Only set if different from current Redux state
      if (theme !== initialTheme) {
        dispatch(setTheme(initialTheme))
      }
      
      setIsInitialized(true)
    }
  }, [dispatch, theme, isInitialized])

  useEffect(() => {
    // Apply theme to HTML element whenever theme changes
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Save theme to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  return <>{children}</>
}