import type { Skill } from '@/lib/types'

export const skillsData: Skill[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'backend',
    proficiency: 4,
    icon: 'cpp'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    proficiency: 4,
    icon: 'python'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 3,
    icon: 'typescript'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 4,
    icon: 'postgres'
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 4,
    icon: 'react'
  },
  {
    id: 'gcp',
    name: 'GCP',
    category: 'cloud',
    proficiency: 3
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 3
  },
  {
    id: 'c',
    name: 'C',
    category: 'backend',
    proficiency: 4
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    proficiency: 4
  },
  {
    id: 'redux',
    name: 'Redux',
    category: 'frontend',
    proficiency: 3
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    proficiency: 3
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    proficiency: 5
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'others',
    proficiency: 3
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    proficiency: 3
  },
  {
    id: 'k8s',
    name: 'Kubernetes',
    category: 'cloud',
    proficiency: 3
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'system',
    proficiency: 4
  },
]

export const getSkillsByCategory = (category: Skill['category']) => {
  return skillsData.filter(skill => skill.category === category)
}

export const getFeaturedSkills = () => {
  return skillsData.filter(skill => skill.proficiency >= 4)
}