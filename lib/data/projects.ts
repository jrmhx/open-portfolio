import type { Project } from '@/lib/types'

export const projectsData: Project[] = [
  {
    id: 'cpp-database',
    title: 'Bustub Database Engine',
    description: 'a disk orientated relational db engine writen in c++17',
    longDescription: `Built a C++ relational database system, 
    implementing core storage, indexing, SQL execution, and MVCC-based 
    concurrency control with RAII design patterns and performance optimizations.
    `,
    images: [
      '/images/bustub/bustub-1.png'
    ],
    technologies: ['C++', 'RAII', 'concurrency', 'MVCC', 'system-programming'],
    githubUrl: 'https://github.com/jrmhx/bustub-db',
    liveUrl: 'https://github.com/jrmhx/bustub-db',
    featured: true,
    category: 'System',
    status: 'completed',
    startDate: '2025-04',
    endDate: '2025-09',
    highlights: [
      'Implemented buffer pool manager, B+ tree indexing, query execution engine, and transaction management in C++17.',
      'Applied advanced design patterns RAII for resource safety, MVCC for concurrency control.',
      'Developed SQL query processing pipeline (parsing, planning, optimization, execution) enabling support for joins, aggregation, and transactional queries.',
      'Optimized system performance by designing efficient memory management, LRU-k cache page replacement policy.'
    ]
  },
  {
    id: 'py-ocml',
    title: 'Machine Learning Platform for Ovarian Cancer Detection',
    description: 'a self-hosted machine learning backend with web interface for early ovarian cancer detection',
    longDescription: `Developed a self-hosted machine learning backend with a web interface, 
    making advanced ML models for early detection of ovarian cancer accessible to medical professionals. 
    Implemented an event-driven architecture with Flask, RabbitMQ, Celery.`,
    images: [
      '/images/ocml/ocml.png'
    ],
    technologies: ['Python', 'Xgboost', 'RabbitMQ', 'Celery', 'Pandas', 'Docker'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    category: 'AI/ML',
    status: 'completed',
    startDate: '2024-03',
    endDate: '2025-04',
    highlights: [
      'Built a Flask-based backend with event-driven architecture using RabbitMQ for reliable asynchronous communication.',
      'Implemented Celery for multithreaded task execution and efficient ML data processing pipelines with Pandas.',
      'Developed a Next.js frontend to provide medical professionals with an accessible and intuitive web interface.',
      'Deployed the entire system using Docker Compose for fully self-hosted, cloud-native deployment.'
    ]
  },
  {
    id: 'ts-open-portfolio',
    title: 'Open Portfolio Template',
    description: 'what you currently looking at',
    longDescription: `An open-source personal portfolio template designed for developers, designers, and professionals.
      
      Built with the latest web technologies including Next.js, Redux Toolkit, Framer Motion, and shadcn/ui components.
      Includes a companion AI-powered resume parser that can automatically generate portfolio data from resumes.`,
    technologies: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    githubUrl: 'https://github.com/jrmhx/open-portfolio',
    liveUrl: 'https://theopenportfolio.vercel.app',
    featured: false,
    category: 'Frontend',
    status: 'in-progress',
    startDate: '2025-09',
    endDate: '2025-07',
    images: [

    ],
    highlights: [
      'Modern React patterns with TypeScript and Redux Toolkit',
      'Clean, maintainable architecture perfect for customization',
      'Open-source template for the developer community'
    ]
  },
  {
    id: 'c-web-proxy-cache',
    title: 'Web Proxy with Cache',
    description: 'a multithreaded HTTP web proxy with caching in C',
    longDescription: `Implemented a multithreaded web proxy in C that handles HTTP requests 
    from web browsers and forwards them to web servers. Built with Unix Socket APIs and TCP/IP 
    for networking, POSIX Threads with producer-consumer pattern for concurrency, and a cache 
    supporting LRU and LFU replacement policies. Achieved up to 138x browsing speedup on cache hits.`,
    images: [

    ],
    technologies: ['C', 'Unix Sockets', 'TCP/IP', 'POSIX Threads', 'LRU', 'LFU'],
    githubUrl: 'https://github.com/jrmhx/cache-proxy',
    liveUrl: '',
    featured: false,
    category: 'System',
    status: 'completed',
    startDate: '2022-07',
    endDate: '2022-11',
    highlights: [
      'Developed an HTTP web proxy in C using Unix Socket APIs and TCP/IP for client-server communication.',
      'Implemented concurrency with POSIX Threads and the producer-consumer pattern for safe multithreading.',
      'Designed and integrated a cache with LRU and LFU replacement policies for efficient resource management.',
      'Improved browsing performance by achieving up to 138x speedup on cache hits, including multimedia files.'
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