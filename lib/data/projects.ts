import type { Project } from '@/lib/types'

export const projectsData: Project[] = [
  {
  id: 'open-portfolio',
  title: 'Open Portfolio Template',
  description: 'This is what you currently looking at.',
  longDescription: `An open-source personal portfolio template designed for developers, designers, and professionals.
    
    Built with the latest web technologies including Next.js, Redux Toolkit, Framer Motion, and shadcn/ui components.
    Includes a companion AI-powered resume parser (separate Go project) that can automatically generate portfolio data from resumes.`,
  technologies: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
  githubUrl: 'https://github.com/jrmhx/open-portfolio',
  liveUrl: 'https://theopenportfolio.vercel.app',
  featured: true,
  category: 'Frontend',
  status: 'in-progress',
  startDate: '2025-09',
  endDate: '2025-09',
  highlights: [
    'Modern React patterns with TypeScript and Redux Toolkit',
    'Flexible icon system supporting Lucide icons and custom SVGs',
    'Responsive design with dark/light mode support',
    'Companion AI resume parser for automated data generation',
    'Clean, maintainable architecture perfect for customization',
    'Open-source template for the developer community'
  ]
},
  {
    id: 'ai-gf-bf',
    title: 'AI Girlfriend',
    description: 'An AI powered virtual girlfriend!',
    longDescription: `An AI powered virtual girlfriend!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
      Features include smart categorization, deadline predictions, workload balancing, and integration 
      with popular calendar applications.`,
    images: [
      '/images/title-1752569258096-903190563.jpeg'
    ],
    technologies: ['AI', 'LLM', 'T2I-Adapter', 'T2V'],
    githubUrl: 'https://github.com/jrmhx/open-portfolio',
    liveUrl: 'https://www.google.com/search?q=ai+girlfriend',
    featured: false,
    category: 'AI',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-06',
    highlights: [
      'Integrated OpenAI GPT-4 for intelligent task analysis',
      'Built custom scheduling algorithm for optimal task distribution',
      'Implemented real-time collaboration features',
      'Achieved 95% user satisfaction in beta testing'
    ]
  },
  {
    id: 'block-chain',
    title: 'Crypto on Chain Analyzer with AI',
    description: 'A comperhensive on chain realtime data analyser. With AI powered it even trades your cryto while you sleeping.',
    longDescription: `A comperhensive on chain realtime data analyser. With AI powered it even trades your cryto while you sleeping across all broker and mainnet
      
      Really ALL IN NO SLEEP!!! Lets beat the whales!!!`,
    images: [
      '/images/giphy.webp'
    ],
    technologies: ['Rust', 'Socket.io', 'WebRTC', 'PostgreSQL', 'Redis', 'AWS', 'K8s'],
    githubUrl: 'https://github.com/jrmhx/open-portfolio',
    liveUrl: 'https://www.google.com/search?q=quit+gambling',
    featured: false,
    category: 'Blockchain',
    status: 'completed',
    startDate: '2023-08',
    endDate: '2024-02',
    highlights: [
      'Supports 100+ concurrent users in real-time editing',
      'Built custom WebRTC solution for video conferencing',
      'Implemented conflict resolution for collaborative editing',
      'Reduced meeting coordination time by 60% for teams'
    ]
  }
]

// utility functions
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

export const getProjectsByCategory = (category: string) => {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
}

export const getProjectCategories = () => {
  const categories = projectsData.map(project => project.category)
  return ['All', ...Array.from(new Set(categories))]
}

export const getCompletedProjects = () => {
  return projectsData.filter(project => project.status === 'completed')
}

export const getInProgressProjects = () => {
  return projectsData.filter(project => project.status === 'in-progress')
}