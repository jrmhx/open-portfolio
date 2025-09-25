import { BaseRepository } from './BaseRepository'
import { projectsData, getProjectsByCategory, getFeaturedProjects } from '@/lib/data'
import type { Project, ApiResponse, PaginatedResponse } from '@/lib/types'

export class ProjectsRepository extends BaseRepository {
  async getProjects(page: number = 1, limit: number = 6): Promise<PaginatedResponse<Project>> {
    try {
      await this.simulateDelay(400)

      if (this.shouldSimulateError(0)) {
        throw new Error('Failed to fetch projects')
      }

      return this.createPaginatedResponse(projectsData, page, limit)
    } catch (error) {
      console.error('ProjectsRepository.getProjects error:', error)
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      }
    }
  }

  async getProjectsByCategory(category: string, page: number = 1, limit: number = 6): Promise<PaginatedResponse<Project>> {
    try {
      await this.simulateDelay(300)

      const filteredProjects = getProjectsByCategory(category)
      return this.createPaginatedResponse(filteredProjects, page, limit)
    } catch (error) {
      console.error('ProjectsRepository.getProjectsByCategory error:', error)
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch projects by category',
        timestamp: new Date().toISOString(),
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      }
    }
  }

  async getFeaturedProjects(): Promise<ApiResponse<Project[]>> {
    try {
      await this.simulateDelay(250)

      const featuredProjects = getFeaturedProjects()
      return this.createSuccessResponse(
        featuredProjects,
        'Featured projects retrieved successfully'
      )
    } catch (error) {
      console.error('ProjectsRepository.getFeaturedProjects error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch featured projects'
      )
    }
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    try {
      await this.simulateDelay(200)

      const project = projectsData.find(p => p.id === id)
      
      if (!project) {
        throw new Error('Project not found')
      }

      return this.createSuccessResponse(
        project,
        'Project retrieved successfully'
      )
    } catch (error) {
      console.error('ProjectsRepository.getProjectById error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch project'
      )
    }
  }

  async searchProjects(query: string): Promise<ApiResponse<Project[]>> {
    try {
      await this.simulateDelay(350)

      const searchResults = projectsData.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(query.toLowerCase())
        )
      )

      return this.createSuccessResponse(
        searchResults,
        `Found ${searchResults.length} projects matching "${query}"`
      )
    } catch (error) {
      console.error('ProjectsRepository.searchProjects error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to search projects'
      )
    }
  }


  async getProjectCategories(): Promise<ApiResponse<string[]>> {
    try {
      await this.simulateDelay(100)

      const categories = Array.from(new Set(projectsData.map(p => p.category)))
      return this.createSuccessResponse(
        categories,
        'Project categories retrieved successfully'
      )
    } catch (error) {
      console.error('ProjectsRepository.getProjectCategories error:', error)
      return this.createErrorResponse(
        error instanceof Error ? error.message : 'Failed to fetch project categories'
      )
    }
  }
}