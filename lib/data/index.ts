// Centralized data exports
// This file makes it easy to import all data from one place

export { profileData } from './profile'
export { skillsData, getSkillsByCategory, getFeaturedSkills } from './skills'
export { experienceData, getCurrentExperience, getExperienceByType, getTotalYearsOfExperience } from './experience'
export { 
  projectsData, 
  getFeaturedProjects, 
  getProjectsByCategory, 
  getProjectCategories,
  getCompletedProjects,
  getInProgressProjects 
} from './projects'

// - profile.ts: Personal information, contact details, social links
// - skills.ts: Technical skills and proficiencies
// - experience.ts: Work experience, achievements, and career history
// - projects.ts: Portfolio projects, descriptions, and links

// All changes will automatically reflect across the entire application!