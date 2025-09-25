import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { repositoryService } from '@/lib/repositories'
import type { Profile, DataState } from '@/lib/types'

// Async thunks for data fetching
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await repositoryService.profile.getProfile()
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch profile')
    }
    return response.data
  }
)

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (updates: Partial<Profile>) => {
    const response = await repositoryService.profile.updateProfile(updates)
    if (!response.success) {
      throw new Error(response.message || 'Failed to update profile')
    }
    return response.data
  }
)

export const updateAvatar = createAsyncThunk(
  'profile/updateAvatar',
  async (file: File) => {
    const response = await repositoryService.profile.updateAvatar(file)
    if (!response.success) {
      throw new Error(response.message || 'Failed to update avatar')
    }
    return response.data
  }
)

// State interface using the new DataState pattern
interface ProfileState extends DataState<Profile> {
  avatarUploadStatus: 'idle' | 'uploading' | 'success' | 'error'
  avatarUploadError: string | null
}

const initialState: ProfileState = {
  data: null,
  status: 'idle',
  error: null,
  avatarUploadStatus: 'idle',
  avatarUploadError: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Synchronous actions for immediate UI updates
    clearError: (state) => {
      state.error = null
      state.avatarUploadError = null
    },
    resetAvatarUploadStatus: (state) => {
      state.avatarUploadStatus = 'idle'
      state.avatarUploadError = null
    }
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        state.lastFetched = new Date().toISOString()
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch profile'
      })

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        state.lastFetched = new Date().toISOString()
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to update profile'
      })

    // Update avatar
    builder
      .addCase(updateAvatar.pending, (state) => {
        state.avatarUploadStatus = 'uploading'
        state.avatarUploadError = null
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.avatarUploadStatus = 'success'
        if (state.data) {
          state.data.avatar = action.payload
        }
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.avatarUploadStatus = 'error'
        state.avatarUploadError = action.error.message || 'Failed to update avatar'
      })
  }
})

export const { clearError, resetAvatarUploadStatus } = profileSlice.actions
export default profileSlice.reducer

// Selectors for easy data access
export const selectProfile = (state: { profile: ProfileState }) => state.profile.data
export const selectProfileStatus = (state: { profile: ProfileState }) => state.profile.status
export const selectProfileError = (state: { profile: ProfileState }) => state.profile.error
export const selectIsProfileLoading = (state: { profile: ProfileState }) => state.profile.status === 'loading'