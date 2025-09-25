import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { repositoryService } from '@/lib/repositories'
import type { Project, DataState } from '@/lib/types'

// Async thunks for data fetching
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({ page = 1, limit = 6 }: { page?: number; limit?: number } = {}) => {
    const response = await repositoryService.projects.getProjects(page, limit)
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch projects')
    }
    return {
      projects: response.data,
      pagination: response.pagination
    }
  }
)

export const fetchFeaturedProjects = createAsyncThunk(
  'projects/fetchFeaturedProjects',
  async () => {
    const response = await repositoryService.projects.getFeaturedProjects()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch featured projects')
    }
    return response.data
  }
)

export const fetchProjectsByCategory = createAsyncThunk(
  'projects/fetchProjectsByCategory',
  async ({ category, page = 1, limit = 6 }: { category: string; page?: number; limit?: number }) => {
    const response = await repositoryService.projects.getProjectsByCategory(category, page, limit)
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch projects by category')
    }
    return {
      projects: response.data,
      pagination: response.pagination,
      category
    }
  }
)

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: string) => {
    const response = await repositoryService.projects.getProjectById(id)
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch project')
    }
    return response.data
  }
)

export const searchProjects = createAsyncThunk(
  'projects/searchProjects',
  async (query: string) => {
    const response = await repositoryService.projects.searchProjects(query)
    if (!response.success) {
      throw new Error(response.message || 'Failed to search projects')
    }
    return response.data
  }
)

export const fetchProjectCategories = createAsyncThunk(
  'projects/fetchProjectCategories',
  async () => {
    const response = await repositoryService.projects.getProjectCategories()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch categories')
    }
    return ['All', ...response.data]
  }
)

// state interface
interface ProjectsState extends DataState<Project[]> {
  featuredProjects: Project[]
  selectedProject: Project | null
  activeFilter: string
  categories: string[]
  searchResults: Project[]
  searchQuery: string
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  searchError: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: ProjectsState = {
  data: [],
  status: 'idle',
  error: null,
  featuredProjects: [],
  selectedProject: null,
  activeFilter: 'All',
  categories: ['All'],
  searchResults: [],
  searchQuery: '',
  searchStatus: 'idle',
  searchError: null,
  pagination: {
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  }
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload
    },
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload
    },
    clearSearch: (state) => {
      state.searchResults = []
      state.searchQuery = ''
      state.searchStatus = 'idle'
      state.searchError = null
    },
    clearError: (state) => {
      state.error = null
      state.searchError = null
    }
  },
  extraReducers: (builder) => {
    // Fetch projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.projects
        state.pagination = action.payload.pagination
        state.lastFetched = new Date().toISOString()
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch projects'
      })

    // Fetch featured projects
    builder
      .addCase(fetchFeaturedProjects.fulfilled, (state, action) => {
        state.featuredProjects = action.payload
      })

    // Fetch projects by category
    builder
      .addCase(fetchProjectsByCategory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProjectsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.projects
        state.pagination = action.payload.pagination
        state.activeFilter = action.payload.category
      })
      .addCase(fetchProjectsByCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch projects by category'
      })

    // Fetch project categories
    builder
      .addCase(fetchProjectCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })

    // Search projects
    builder
      .addCase(searchProjects.pending, (state, action) => {
        state.searchStatus = 'loading'
        state.searchError = null
        state.searchQuery = action.meta.arg
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.searchResults = action.payload
      })
      .addCase(searchProjects.rejected, (state, action) => {
        state.searchStatus = 'failed'
        state.searchError = action.error.message || 'Failed to search projects'
      })

    // Fetch project by ID
    builder
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.selectedProject = action.payload
      })
  }
})

export const { 
  setSelectedProject, 
  setActiveFilter, 
  clearSearch, 
  clearError 
} = projectsSlice.actions

export default projectsSlice.reducer

// Selectors
export const selectProjects = (state: { projects: ProjectsState }) => state.projects.data
export const selectFeaturedProjects = (state: { projects: ProjectsState }) => state.projects.featuredProjects
export const selectProjectsStatus = (state: { projects: ProjectsState }) => state.projects.status
export const selectProjectsError = (state: { projects: ProjectsState }) => state.projects.error
export const selectIsProjectsLoading = (state: { projects: ProjectsState }) => state.projects.status === 'loading'
export const selectSelectedProject = (state: { projects: ProjectsState }) => state.projects.selectedProject
export const selectActiveFilter = (state: { projects: ProjectsState }) => state.projects.activeFilter
export const selectProjectCategories = (state: { projects: ProjectsState }) => state.projects.categories