import type { Project } from '@/lib/types'

export const projectsData: Project[] = [
  {
    id: 'open-portfolio',
    title: 'Open Portfolio',
    description: 'Comprehensive analytics platform for online stores with AI-powered insights',
    longDescription: `A powerful analytics dashboard designed specifically for e-commerce businesses. 
      Provides deep insights into customer behavior, sales patterns, inventory optimization, and 
      marketing effectiveness.
      
      Features advanced data visualization, predictive analytics for inventory management, 
      customer segmentation, and automated reporting.`,
    image: '/images/projects/ecommerce-analytics.jpg',
    technologies: ['Next.js', 'Redux', 'shadcn'],
    githubUrl: 'https://github.com/',
    liveUrl: 'about:blank',
    featured: true,
    category: 'Frontend',
    status: 'completed',
    startDate: '2023-03',
    endDate: '2023-08',
    highlights: [
      'Processes over 1M data points daily',
      'Increased sales conversion rates by 25% for clients',
      'Built custom machine learning models for demand forecasting',
      'Integrated with 15+ e-commerce platforms'
    ]
  },
  {
    id: 'ai-gf-bf',
    title: 'AI Girlfriend',
    description: 'An AI powered virtual girlfriend!',
    longDescription: `An AI powered virtual girlfriend!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
      Features include smart categorization, deadline predictions, workload balancing, and integration 
      with popular calendar applications.`,
    image: '/images/projects/ai-task-manager.jpg',
    images: [
      '/images/projects/ai-task-manager-1.jpg',
      '/images/projects/ai-task-manager-2.jpg',
      '/images/projects/ai-task-manager-3.jpg'
    ],
    technologies: ['AI', 'LLM', 'T2I-Adapter', 'T2V'],
    githubUrl: 'https://github.com/',
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
    image: '/images/projects/collaboration-platform.jpg',
    technologies: ['Rust', 'Socket.io', 'WebRTC', 'PostgreSQL', 'Redis', 'AWS', 'K8s'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://www.forbes.com/health/mind/how-to-stop-gambling-expert-advice/',
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