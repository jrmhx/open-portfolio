import { BaseRepository } from './BaseRepository'
import { experienceData, skillsData } from '@/lib/data'
import type { Experience, Skill, ApiResponse } from '@/lib/types'

export class ExperienceRepository extends BaseRepository {
  /**
   * Simulate fetching all work experience
   */
  async getExperience(): Promise<ApiResponse<Experience[]>> {
    try {
      // simulate network delay
      await this.simulateDelay(300)

      // simulate occasional API errors
      if (this.shouldSimulateError(0.02)) {
        throw new Error('Failed to fetch experience data')
      }

      // sort by start date (most recent first)
      const sortedExperience = [...experienceData].sort((a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)
        return dateB.getTime() - dateA.getTime()
      })

      return this.createSuccessResponse(
        sortedExperience,
        'Experience data retrieved successfully'
      )
    } catch (error) {
      console.error('ExperienceRepository.getExperience error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch experience data'
      )
    }
  }

  /**
   * simulate fetching current position
   */
  async getCurrentPosition(): Promise<ApiResponse<Experience | null>> {
    try {
      await this.simulateDelay(200)

      const currentPosition = experienceData.find(exp => !exp.endDate)
      
      return this.createSuccessResponse(
        currentPosition || null,
        currentPosition ? 'Current position retrieved' : 'No current position found'
      )
    } catch (error) {
      console.error('ExperienceRepository.getCurrentPosition error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch current position'
      )
    }
  }

  /**
   * simulate fetching experience by type (work, freelance, internship, etc.)
   */
  async getExperienceByType(type: Experience['type']): Promise<ApiResponse<Experience[]>> {
    try {
      await this.simulateDelay(250)

      const filteredExperience = experienceData.filter(exp => exp.type === type)
      
      return this.createSuccessResponse(
        filteredExperience,
        `${type} experience retrieved successfully`
      )
    } catch (error) {
      console.error('ExperienceRepository.getExperienceByType error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : `Failed to fetch ${type} experience`
      )
    }
  }
}

export class SkillsRepository extends BaseRepository {
  /**
   * Simulate fetching all skills
   */
  async getSkills(): Promise<ApiResponse<Skill[]>> {
    try {
      // Simulate network delay
      await this.simulateDelay(200)

      // Simulate occasional API errors
      if (this.shouldSimulateError(0.02)) {
        throw new Error('Failed to fetch skills data')
      }

      // Sort by proficiency level (highest first)
      const sortedSkills = [...skillsData].sort((a, b) => b.proficiency - a.proficiency)

      return this.createSuccessResponse(
        sortedSkills,
        'Skills data retrieved successfully'
      )
    } catch (error) {
      console.error('SkillsRepository.getSkills error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch skills data'
      )
    }
  }

  /**
   * Simulate fetching skills by category
   */
  async getSkillsByCategory(category: Skill['category']): Promise<ApiResponse<Skill[]>> {
    try {
      await this.simulateDelay(150)

      const filteredSkills = skillsData.filter(skill => skill.category === category)
      
      return this.createSuccessResponse(
        filteredSkills,
        `${category} skills retrieved successfully`
      )
    } catch (error) {
      console.error('SkillsRepository.getSkillsByCategory error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : `Failed to fetch ${category} skills`
      )
    }
  }

  /**
   * Simulate fetching featured/top skills
   */
  async getFeaturedSkills(minProficiency: number = 4): Promise<ApiResponse<Skill[]>> {
    try {
      await this.simulateDelay(100)

      const featuredSkills = skillsData
        .filter(skill => skill.proficiency >= minProficiency)
        .sort((a, b) => b.proficiency - a.proficiency)
      
      return this.createSuccessResponse(
        featuredSkills,
        'Featured skills retrieved successfully'
      )
    } catch (error) {
      console.error('SkillsRepository.getFeaturedSkills error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch featured skills'
      )
    }
  }

  /**
   * Simulate getting skill categories
   */
  async getSkillCategories(): Promise<ApiResponse<string[]>> {
    try {
      await this.simulateDelay(50)

      const categories = Array.from(new Set(skillsData.map(skill => skill.category)))
      
      return this.createSuccessResponse(
        categories,
        'Skill categories retrieved successfully'
      )
    } catch (error) {
      console.error('SkillsRepository.getSkillCategories error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch skill categories'
      )
    }
  }
}