import type { Experience } from '@/lib/types'

export const experienceData: Experience[] = [
  {
    id: 'job-anu-2',
    title: 'Software Engineer',
    company: 'Australian National University',
    companyUrl: 'https://comp.anu.edu.au/',
    location: 'Sydney, Australia',
    startDate: '2024-03',
    endDate: '2025-04',
    description: `Built a machine learning platform for ovarian cancer early detection.`,
    achievements: [
      
    ],
    technologies: ['Python', 'Celery', 'Rabbitmq', 'Xgboost'],
    type: 'work'
  },
  {
    id: 'job-anu-1',
    title: 'Academic Tutor',
    company: 'Australian National University',
    companyUrl: 'https://comp.anu.edu.au/',
    location: 'Canberra, Australia',
    startDate: '2023-07',
    endDate: '2024-03',
    description: `COMP2120/6210 Software Engineering`,
    achievements: [
      
    ],
    technologies: ['Java', 'Docker'],
    type: 'work'
  },
  {
    id: 'job-unicornshift',
    title: 'Software Engineer',
    company: 'UnicornShift',
    companyUrl: 'https://www.unicornshift.ai/',
    location: 'North Wollongong, Australia',
    startDate: '2023-07',
    endDate: '2023-12',
    description: `Built a full-stack web application for connecting construction companies with traffic controllers.`,
    achievements: [
      
    ],
    technologies: ['Next.js', 'Typescript', 'Node.js', 'GraphQL', 'GCP'],
    type: 'internship'
  },
  {
    id: 'job-sdu',
    title: 'Undergraduate Research Assistant',
    company: 'Shandong University',
    companyUrl: 'https://www.linkedin.com/school/shandong-university/',
    location: 'Shandong, China',
    startDate: '2021-09',
    endDate: '2022-01',
    description: `3D point cloud processing and modeling in MATLAB`,
    achievements: [

    ],
    technologies: ['Python', 'MATLAB', 'Pytorch'],
    type: 'volunteer'
  }
]

export const getCurrentExperience = () => {
  return experienceData.find(exp => !exp.endDate)
}

export const getExperienceByType = (type: Experience['type']) => {
  return experienceData.filter(exp => exp.type === type)
}

export const getTotalYearsOfExperience = () => {
  const startYear = 2018 // First professional experience
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}