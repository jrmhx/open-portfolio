import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { 
  projectsData, 
  getFeaturedProjects, 
  getProjectsByCategory, 
  getProjectCategories,
  getCompletedProjects,
  getInProgressProjects 
} from '@/lib/data'
import type { Project, DataState } from '@/lib/types'

interface ProjectsState extends DataState<Project[]> {
  selectedProject: Project | null
  categories: string[]
  featuredProjects: Project[]
  activeFilter: string
}

const initialState: ProjectsState = {
  data: projectsData,
  status: 'succeeded',
  error: null,
  lastFetched: new Date().toISOString(),
  selectedProject: null,
  categories: getProjectCategories(),
  featuredProjects: getFeaturedProjects(),
  activeFilter: 'All'
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload
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
  setSelectedProject,
  clearSelectedProject,
  setActiveFilter,
  setError,
  clearError 
} = projectsSlice.actions

export default projectsSlice.reducer

// Selectors
export const selectProjects = (state: { projects: ProjectsState }) => state.projects.data
export const selectSelectedProject = (state: { projects: ProjectsState }) => state.projects.selectedProject
export const selectFeaturedProjects = (state: { projects: ProjectsState }) => state.projects.featuredProjects
export const selectProjectCategories = (state: { projects: ProjectsState }) => state.projects.categories
export const selectActiveFilter = (state: { projects: ProjectsState }) => state.projects.activeFilter
export const selectIsProjectsLoading = (state: { projects: ProjectsState }) => state.projects.status === 'loading'
export const selectProjectsByCategory = (category: string) => (state: { projects: ProjectsState }) => 
  getProjectsByCategory(category)
export const selectCompletedProjects = (state: { projects: ProjectsState }) => getCompletedProjects()
export const selectInProgressProjects = (state: { projects: ProjectsState }) => getInProgressProjects()