import type { Experience } from '@/lib/types'

export const experienceData: Experience[] = [
  {
    id: 'vp',
    title: 'Corporate Vice President',
    company: 'Some Big Tech Inc.',
    companyUrl: 'https://github.com/jrmhx/open-portfolio',
    location: 'San Francisco, CA',
    startDate: '2024-09',
    // endDate: undefined, // Current position
    description: ``,
    achievements: [
      {
        id: 'perf-improvement',
        title: 'Application Performance Optimization',
        description: 'Optimized application performance through code splitting, lazy loading, and database query optimization',
        metrics: '40% improvement in page load times'
      },
      {
        id: 'team-leadership',
        title: 'Team Leadership & Mentoring',
        description: 'Led and mentored a team of 5 developers, establishing code review processes and best practices',
        metrics: 'Reduced bug reports by 60%'
      },
      {
        id: 'microservices',
        title: 'Microservices Architecture',
        description: 'Designed and implemented microservices architecture for better scalability and maintainability',
        metrics: 'Improved deployment frequency by 300%'
      }
    ],
    technologies: ['Personality', 'Network', 'Social Skill', 'Good Luck'],
    type: 'work'
  },
  {
    id: 'tech-innovations-senior',
    title: 'Tech Lead',
    company: 'Some Big Tech Inc.',
    companyUrl: 'https://github.com/jrmhx/open-portfolio',
    location: 'San Francisco, CA',
    startDate: '2022-03',
    // endDate: undefined, // Current position
    description: `Lead development of xyz service using ABC.`,
    achievements: [
      {
        id: 'perf-improvement',
        title: 'Application Performance Optimization',
        description: 'Optimized application performance through code splitting, lazy loading, and database query optimization',
        metrics: '40% improvement in page load times'
      },
      {
        id: 'team-leadership',
        title: 'Team Leadership & Mentoring',
        description: 'Led and mentored a team of 5 developers, establishing code review processes and best practices',
        metrics: 'Reduced bug reports by 60%'
      },
      {
        id: 'microservices',
        title: 'Microservices Architecture',
        description: 'Designed and implemented microservices architecture for better scalability and maintainability',
        metrics: 'Improved deployment frequency by 300%'
      }
    ],
    technologies: ['C++', 'Go', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
    type: 'work'
  },
  {
    id: 'digital-solutions-fullstack',
    title: 'Software Engineer',
    company: 'Digital Solutions Co.',
    companyUrl: 'https://github.com/jrmhx/open-portfolio',
    location: 'San Francisco, CA',
    startDate: '2020-06',
    endDate: '2022-02',
    description: `Developed and maintained multiple client projects, from e-commerce platforms to enterprise dashboards. 
      Collaborated with cross-functional teams to deliver projects on time and within budget.`,
    achievements: [
      {
        id: 'project-delivery',
        title: 'Successful Project Delivery',
        description: 'Successfully delivered 15+ client projects across various industries',
        metrics: '100% on-time delivery rate'
      },
      {
        id: 'bug-reduction',
        title: 'Quality Improvement Initiative',
        description: 'Implemented automated testing practices and code quality standards',
        metrics: '60% reduction in production bugs'
      },
      {
        id: 'client-satisfaction',
        title: 'Client Satisfaction',
        description: 'Maintained strong client relationships through effective communication and quality deliverables',
        metrics: '95% client satisfaction score'
      }
    ],
    technologies: ['Next.js', 'Typescript', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    type: 'work'
  },
  {
    id: 'startupxyz-frontend',
    title: 'AI Developer',
    company: 'StartupXYZ',
    companyUrl: 'https://github.com/jrmhx/open-portfolio',
    location: 'San Francisco, CA',
    startDate: '2019-01',
    endDate: '2020-05',
    description: `Built responsive web applications and collaborated with designers to implement pixel-perfect interfaces. 
      Focused on user experience and performance optimization.`,
    achievements: [
      {
        id: 'user-engagement',
        title: 'User Engagement Improvement',
        description: 'Redesigned user interface resulting in improved user engagement and retention',
        metrics: '35% increase in user engagement'
      },
      {
        id: 'design-system',
        title: 'Design System Implementation',
        description: 'Created and implemented a comprehensive design system for consistent UI/UX',
        metrics: '50% faster development time for new features'
      },
      {
        id: 'performance-optimization',
        title: 'Frontend Performance Optimization',
        description: 'Optimized application bundle size and implemented performance monitoring',
        metrics: '50% improvement in loading times'
      }
    ],
    technologies: ['React', 'JavaScript', 'SasS', 'Webpack', 'Jest'],
    type: 'work'
  },
  {
    id: 'freelance-developer',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    startDate: '2018-06',
    endDate: '2019-12',
    description: `Worked with various startups and small businesses to build their web presence. 
      Specialized in rapid prototyping and MVP development.`,
    achievements: [
      {
        id: 'client-projects',
        title: 'Diverse Client Portfolio',
        description: 'Successfully completed projects for 8+ clients across different industries',
        metrics: '4.9/5 average client rating'
      },
      {
        id: 'rapid-prototyping',
        title: 'Rapid MVP Development',
        description: 'Specialized in quick turnaround times for startup MVPs',
        metrics: 'Average 2-week MVP delivery'
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB',],
    type: 'freelance'
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