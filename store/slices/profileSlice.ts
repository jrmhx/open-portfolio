import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { profileData } from '@/lib/data'
import type { Profile, DataState } from '@/lib/types'

interface ProfileState extends DataState<Profile> {}

const initialState: ProfileState = {
  data: profileData, // Load data immediately - no async needed
  status: 'succeeded',
  error: null,
  lastFetched: new Date().toISOString()
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload }
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.status = 'failed'
    },
    clearError: (state) => {
      state.error = null
      state.status = 'succeeded'
    }
  }
})

export const { 
  updateProfile, 
  setError, 
  clearError 
} = profileSlice.actions

export default profileSlice.reducer

// Selectors for easy data access
export const selectProfile = (state: { profile: ProfileState }) => state.profile.data
export const selectProfileError = (state: { profile: ProfileState }) => state.profile.error
export const selectProfileStatus = (state: { profile: ProfileState }) => state.profile.status
export const selectIsProfileLoading = (state: { profile: ProfileState }) => state.profile.status === 'loading'