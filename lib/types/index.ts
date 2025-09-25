// Core data types for the personal website

export interface SocialLink {
  platform: string
  url: string
  icon: string
  label?: string
}

export interface ContactInfo {
  email: string
  phone?: string
  location: string
  timezone?: string
  availability: string
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  detailedBio?: string
  avatar: string
  contactInfo: ContactInfo
  socialLinks: SocialLink[]
  resumeUrl?: string
  status: 'available' | 'busy' | 'unavailable'
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'other'
  proficiency: 1 | 2 | 3 | 4 | 5 // 1=beginner, 5=expert
  yearsOfExperience?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  metrics?: string // e.g., "40% performance improvement"
}

export interface Experience {
  id: string
  title: string
  company: string
  companyUrl?: string
  location?: string
  startDate: string
  endDate?: string // undefined means current position
  description: string
  achievements: Achievement[]
  technologies: string[]
  type: 'work' | 'freelance' | 'internship' | 'volunteer'
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image?: string
  images?: string[] // multiple images for gallery
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  startDate?: string
  endDate?: string
  highlights?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  gpa?: number
  achievements?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type DataStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface DataState<T> {
  data: T | null
  status: DataStatus
  error: string | null
  lastFetched?: string
}