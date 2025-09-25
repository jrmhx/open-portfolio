// Repository exports and instances
// This provides a centralized way to access all repositories

export { BaseRepository } from './BaseRepository'
export { ProfileRepository } from './ProfileRepository'
export { ProjectsRepository } from './ProjectsRepository'
export { ExperienceRepository, SkillsRepository } from './ExperienceRepository'

import { ProfileRepository } from './ProfileRepository'
import { ProjectsRepository } from './ProjectsRepository'
import { ExperienceRepository, SkillsRepository } from './ExperienceRepository'

// create singleton instances for use throughout the app
export const profileRepository = new ProfileRepository()
export const projectsRepository = new ProjectsRepository()
export const experienceRepository = new ExperienceRepository()
export const skillsRepository = new SkillsRepository()

// repository service aggregator
export class RepositoryService {
  profile = profileRepository
  projects = projectsRepository
  experience = experienceRepository
  skills = skillsRepository
}

// single instance for the entire app
export const repositoryService = new RepositoryService()

// usage examples:
// import { repositoryService } from '@/lib/repositories'
// const profile = await repositoryService.profile.getProfile()
// const projects = await repositoryService.projects.getFeaturedProjects()