import { BaseRepository } from './BaseRepository'
import { profileData } from '@/lib/data'
import type { Profile, ApiResponse } from '@/lib/types'

export class ProfileRepository extends BaseRepository {
  /**
   * in a real app with backend, this would make an HTTP request to the backend
   */
  async getProfile(): Promise<ApiResponse<Profile>> {
    try {
      await this.simulateDelay(300)

      // simulate occasional API errors (0% chance)
      if (this.shouldSimulateError(0)) {
        throw new Error('Failed to fetch profile data')
      }

      return this.createSuccessResponse(
        profileData,
        'Profile data retrieved successfully'
      )
    } catch (error) {
      console.error('ProfileRepository.getProfile error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch profile'
      )
    }
  }

  /**
   * simulate updating user profile
   * to a real backend, this would make a PUT/PATCH request
   */
  async updateProfile(updates: Partial<Profile>): Promise<ApiResponse<Profile>> {
    try {
      await this.simulateDelay(500)

      // validation errors
      if (updates.name && updates.name.length < 2) {
        throw new Error('Name must be at least 2 characters long')
      }

      if (updates.contactInfo?.email && !updates.contactInfo.email.includes('@')) {
        throw new Error('Invalid email address')
      }

      const updatedProfile: Profile = {
        ...profileData,
        ...updates,
        contactInfo: {
          ...profileData.contactInfo,
          ...(updates.contactInfo || {})
        }
      }

      return this.createSuccessResponse(
        updatedProfile,
        'Profile updated successfully'
      )
    } catch (error) {
      console.error('ProfileRepository.updateProfile error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to update profile'
      )
    }
  }

  /**
   * simulate uploading profile avatar
   * in a real app with backend, this would handle file upload to your storage service
   */
  async updateAvatar(file: File): Promise<ApiResponse<string>> {
    try {
      await this.simulateDelay(1000)

      // file validation
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB')
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, and WebP images are allowed')
      }

      const avatarUrl = `/images/avatars/${Date.now()}-${file.name}`

      return this.createSuccessResponse(
        avatarUrl,
        'Avatar uploaded successfully'
      )
    } catch (error) {
      console.error('ProfileRepository.updateAvatar error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to upload avatar'
      )
    }
  }
}