import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import projectsReducer from './slices/projectsSlice'
import experienceReducer from './slices/experienceSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    projects: projectsReducer,
    experience: experienceReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: []
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch