import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  theme: 'light' | 'dark'
  mobileMenuOpen: boolean
  activeSection: string
  scrollProgress: number
  isLoading: boolean
  showScrollToTop: boolean
  isMobile: boolean
}

const initialState: UIState = {
  theme: 'light',
  mobileMenuOpen: false,
  activeSection: 'hero',
  scrollProgress: 0,
  isLoading: false,
  showScrollToTop: false,
  isMobile: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload
      state.showScrollToTop = action.payload > 0.2
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    }
  }
})

export const { 
  setTheme, 
  toggleTheme, 
  setMobileMenuOpen, 
  toggleMobileMenu, 
  setActiveSection, 
  setScrollProgress, 
  setLoading,
  setIsMobile
} = uiSlice.actions

export default uiSlice.reducer