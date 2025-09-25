import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { 
  experienceData, 
  skillsData, 
  getSkillsByCategory, 
  getFeaturedSkills 
} from '@/lib/data'
import type { Experience, Skill, DataState } from '@/lib/types'

interface ExperienceState extends DataState<Experience[]> {
  skills: Skill[]
  featuredSkills: Skill[]
}

const initialState: ExperienceState = {
  data: experienceData,
  skills: skillsData,
  featuredSkills: getFeaturedSkills(),
  status: 'succeeded',
  error: null,
  lastFetched: new Date().toISOString()
}

export const experienceSlice = createSlice({
  name: 'experience',
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

export const { setError, clearError } = experienceSlice.actions

export default experienceSlice.reducer

// Selectors
export const selectExperience = (state: { experience: ExperienceState }) => state.experience.data
export const selectSkills = (state: { experience: ExperienceState }) => state.experience.skills
export const selectFeaturedSkills = (state: { experience: ExperienceState }) => state.experience.featuredSkills
export const selectSkillsByCategory = (category: 'backend' | 'database' | 'cloud' | 'mobile' | 'system' | 'frontend' | 'others') => () => getSkillsByCategory(category)
export const selectExperienceError = (state: { experience: ExperienceState }) => state.experience.error
export const selectExperienceStatus = (state: { experience: ExperienceState }) => state.experience.status
export const selectIsExperienceLoading = (state: { experience: ExperienceState }) => state.experience.status === 'loading'