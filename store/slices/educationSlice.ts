import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { educationRepository } from '@/lib/repositories'
import type { Education, ApiResponse } from '@/lib/types'
import type { RootState } from '../types'

// Async thunks for education data
export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<Education[]> = await educationRepository.getEducation()
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Failed to fetch education data')
      }
      
      return response.data
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch education data'
      )
    }
  }
)

export const fetchCurrentEducation = createAsyncThunk(
  'education/fetchCurrentEducation',
  async (_, { rejectWithValue }) => {
    try {
      const response: ApiResponse<Education | null> = await educationRepository.getCurrentEducation()
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Failed to fetch current education data')
      }
      
      return response.data
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch current education data'
      )
    }
  }
)

export const fetchEducationStats = createAsyncThunk(
  'education/fetchEducationStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await educationRepository.getEducationStats()
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Failed to fetch education statistics')
      }
      
      return response.data
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch education statistics'
      )
    }
  }
)

// State interface
interface EducationState {
  education: Education[]
  currentEducation: Education | null
  stats: {
    totalDegrees: number
    averageGPA: number
    institutions: string[]
    fields: string[]
  } | null
  isLoading: boolean
  isStatsLoading: boolean
  error: string | null
  lastFetch: number | null
}

const initialState: EducationState = {
  education: [],
  currentEducation: null,
  stats: null,
  isLoading: false,
  isStatsLoading: false,
  error: null,
  lastFetch: null,
}

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    clearEducationError: (state) => {
      state.error = null
    },
    setSelectedEducation: (state, action: PayloadAction<Education>) => {
      // Could be used for detailed education view
      state.currentEducation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Education
      .addCase(fetchEducation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.isLoading = false
        state.education = action.payload
        state.lastFetch = Date.now()
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Fetch Current Education
      .addCase(fetchCurrentEducation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentEducation.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentEducation = action.payload
      })
      .addCase(fetchCurrentEducation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Fetch Education Stats
      .addCase(fetchEducationStats.pending, (state) => {
        state.isStatsLoading = true
      })
      .addCase(fetchEducationStats.fulfilled, (state, action) => {
        state.isStatsLoading = false
        state.stats = action.payload
      })
      .addCase(fetchEducationStats.rejected, (state, action) => {
        state.isStatsLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearEducationError, setSelectedEducation } = educationSlice.actions

// Selectors
export const selectEducation = (state: RootState) => state.education.education
export const selectCurrentEducation = (state: RootState) => state.education.currentEducation
export const selectEducationStats = (state: RootState) => state.education.stats
export const selectIsEducationLoading = (state: RootState) => state.education.isLoading
export const selectIsEducationStatsLoading = (state: RootState) => state.education.isStatsLoading
export const selectEducationError = (state: RootState) => state.education.error
export const selectEducationLastFetch = (state: RootState) => state.education.lastFetch

export default educationSlice.reducer