import { BaseRepository } from './BaseRepository'
import { educationData } from '@/lib/data/education'
import type { Education, ApiResponse } from '@/lib/types'

export class EducationRepository extends BaseRepository {
  /**
   * Simulate fetching all education records
   */
  async getEducation(): Promise<ApiResponse<Education[]>> {
    try {
      // simulate network delay
      await this.simulateDelay(300)

      // simulate occasional API errors
      if (this.shouldSimulateError(0.02)) {
        throw new Error('Failed to fetch education data')
      }

      // sort by start date (most recent first)
      const sortedEducation = [...educationData].sort((a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)
        return dateB.getTime() - dateA.getTime()
      })

      return this.createSuccessResponse(
        sortedEducation,
        'Education data retrieved successfully'
      )
    } catch (error) {
      console.error('EducationRepository.getEducation error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch education data'
      )
    }
  }

  /**
   * Get education by ID
   */
  async getEducationById(id: string): Promise<ApiResponse<Education | null>> {
    try {
      await this.simulateDelay(200)

      if (this.shouldSimulateError(0.01)) {
        throw new Error(`Failed to fetch education with id: ${id}`)
      }

      const education = educationData.find(edu => edu.id === id)
      
      return this.createSuccessResponse(
        education || null,
        education ? `Education record retrieved: ${education.degree}` : `No education found with id: ${id}`
      )
    } catch (error) {
      console.error('EducationRepository.getEducationById error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : `Failed to fetch education with id: ${id}`
      )
    }
  }

  /**
   * Get current/ongoing education (no end date)
   */
  async getCurrentEducation(): Promise<ApiResponse<Education | null>> {
    try {
      await this.simulateDelay(200)

      const currentEducation = educationData.find(edu => !edu.endDate)
      
      return this.createSuccessResponse(
        currentEducation || null,
        currentEducation ? 'Current education retrieved' : 'No current education found'
      )
    } catch (error) {
      console.error('EducationRepository.getCurrentEducation error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch current education'
      )
    }
  }

  /**
   * Get education by institution
   */
  async getEducationByInstitution(institution: string): Promise<ApiResponse<Education[]>> {
    try {
      await this.simulateDelay(250)

      const institutionEducation = educationData.filter(edu => 
        edu.institution.toLowerCase().includes(institution.toLowerCase())
      )
      
      return this.createSuccessResponse(
        institutionEducation,
        `Found ${institutionEducation.length} education records for ${institution}`
      )
    } catch (error) {
      console.error('EducationRepository.getEducationByInstitution error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : `Failed to fetch education for institution: ${institution}`
      )
    }
  }

  /**
   * Get education statistics
   */
  async getEducationStats(): Promise<ApiResponse<{
    totalDegrees: number
    averageGPA: number
    institutions: string[]
    fields: string[]
  }>> {
    try {
      await this.simulateDelay(200)

      const stats = {
        totalDegrees: educationData.length,
        averageGPA: educationData
          .filter(edu => edu.gpa)
          .reduce((sum, edu) => sum + (edu.gpa || 0), 0) / educationData.filter(edu => edu.gpa).length,
        institutions: [...new Set(educationData.map(edu => edu.institution))],
        fields: [...new Set(educationData.map(edu => edu.field))]
      }

      return this.createSuccessResponse(
        stats,
        'Education statistics calculated successfully'
      )
    } catch (error) {
      console.error('EducationRepository.getEducationStats error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to calculate education statistics'
      )
    }
  }
}