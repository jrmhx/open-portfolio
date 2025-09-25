'use client'

import { Provider } from 'react-redux'
import { store } from './index'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { MobileDetectionProvider } from '@/components/providers/MobileDetectionProvider'

export function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MobileDetectionProvider />
        {children}
      </ThemeProvider>
    </Provider>
  )
}