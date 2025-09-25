'use client'

import { Provider } from 'react-redux'
import { store } from './index'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  )
}