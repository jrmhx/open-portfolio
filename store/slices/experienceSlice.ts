import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { repositoryService } from '@/lib/repositories'
import type { Experience, Skill, DataState } from '@/lib/types'

export const fetchExperience = createAsyncThunk(
  'experience/fetchExperience',
  async () => {
    const response = await repositoryService.experience.getExperience()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch experience')
    }
    return response.data
  }
)

export const fetchCurrentPosition = createAsyncThunk(
  'experience/fetchCurrentPosition',
  async () => {
    const response = await repositoryService.experience.getCurrentPosition()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch current position')
    }
    return response.data
  }
)

export const fetchSkills = createAsyncThunk(
  'experience/fetchSkills',
  async () => {
    const response = await repositoryService.skills.getSkills()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch skills')
    }
    return response.data
  }
)

export const fetchFeaturedSkills = createAsyncThunk(
  'experience/fetchFeaturedSkills',
  async (minProficiency: number = 4) => {
    const response = await repositoryService.skills.getFeaturedSkills(minProficiency)
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch featured skills')
    }
    return response.data
  }
)

export const fetchSkillsByCategory = createAsyncThunk(
  'experience/fetchSkillsByCategory',
  async (category: Skill['category']) => {
    const response = await repositoryService.skills.getSkillsByCategory(category)
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch skills by category')
    }
    return { category, skills: response.data }
  }
)

// state interface
interface ExperienceState {
  experience: DataState<Experience[]>
  currentPosition: DataState<Experience | null>
  skills: DataState<Skill[]>
  featuredSkills: Skill[]
  skillsByCategory: Record<string, Skill[]>
  selectedExperience: Experience | null
}

const initialState: ExperienceState = {
  experience: {
    data: [],
    status: 'idle',
    error: null
  },
  currentPosition: {
    data: null,
    status: 'idle',
    error: null
  },
  skills: {
    data: [],
    status: 'idle',
    error: null
  },
  featuredSkills: [],
  skillsByCategory: {},
  selectedExperience: null
}

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setSelectedExperience: (state, action) => {
      state.selectedExperience = action.payload
    },
    clearErrors: (state) => {
      state.experience.error = null
      state.currentPosition.error = null
      state.skills.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.experience.status = 'loading'
        state.experience.error = null
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.experience.status = 'succeeded'
        state.experience.data = action.payload
        state.experience.lastFetched = new Date().toISOString()
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.experience.status = 'failed'
        state.experience.error = action.error.message || 'Failed to fetch experience'
      })

    builder
      .addCase(fetchCurrentPosition.fulfilled, (state, action) => {
        state.currentPosition.status = 'succeeded'
        state.currentPosition.data = action.payload
      })

    builder
      .addCase(fetchSkills.pending, (state) => {
        state.skills.status = 'loading'
        state.skills.error = null
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills.status = 'succeeded'
        state.skills.data = action.payload
        state.skills.lastFetched = new Date().toISOString()
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.skills.status = 'failed'
        state.skills.error = action.error.message || 'Failed to fetch skills'
      })

    builder
      .addCase(fetchFeaturedSkills.fulfilled, (state, action) => {
        state.featuredSkills = action.payload
      })

    builder
      .addCase(fetchSkillsByCategory.fulfilled, (state, action) => {
        state.skillsByCategory[action.payload.category] = action.payload.skills
      })
  }
})

export const { setSelectedExperience, clearErrors } = experienceSlice.actions
export default experienceSlice.reducer

export const selectExperience = (state: { experience: ExperienceState }) => state.experience.experience.data
export const selectExperienceStatus = (state: { experience: ExperienceState }) => state.experience.experience.status
export const selectCurrentPosition = (state: { experience: ExperienceState }) => state.experience.currentPosition.data
export const selectSkills = (state: { experience: ExperienceState }) => state.experience.skills.data
export const selectFeaturedSkills = (state: { experience: ExperienceState }) => state.experience.featuredSkills
export const selectIsExperienceLoading = (state: { experience: ExperienceState }) => 
  state.experience.experience.status === 'loading'
export const selectIsSkillsLoading = (state: { experience: ExperienceState }) => 
  state.experience.skills.status === 'loading'