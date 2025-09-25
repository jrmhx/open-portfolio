import type { Skill } from '@/lib/types'

export const skillsData: Skill[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'backend',
    proficiency: 5,
    yearsOfExperience: 4
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    proficiency: 4,
    yearsOfExperience: 3
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 4,
    yearsOfExperience: 3
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'devops',
    proficiency: 4,
    yearsOfExperience: 3
  },
  {
    id: 'piano',
    name: 'Piano',
    category: 'devops',
    proficiency: 5,
    yearsOfExperience: 10
  }
]

export const getSkillsByCategory = (category: Skill['category']) => {
  return skillsData.filter(skill => skill.category === category)
}

export const getFeaturedSkills = () => {
  return skillsData.filter(skill => skill.proficiency >= 4)
}