import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { educationData } from '@/lib/data'
import type { Education, DataState } from '@/lib/types'

interface EducationState extends DataState<Education[]> {}

const initialState: EducationState = {
  data: educationData,
  status: 'succeeded',
  error: null,
  lastFetched: new Date().toISOString()
}

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
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

export const { setError, clearError } = educationSlice.actions

export default educationSlice.reducer

// Selectors
export const selectEducation = (state: { education: EducationState }) => state.education.data
export const selectEducationError = (state: { education: EducationState }) => state.education.error
export const selectEducationStatus = (state: { education: EducationState }) => state.education.status
export const selectIsEducationLoading = (state: { education: EducationState }) => state.education.status === 'loading'