'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/common/LoadingStates'
import { useAppSelector, useAppDispatch } from '@/store/types'
import { setActiveFilter, selectProjects, selectActiveFilter, selectIsProjectsLoading } from '@/store/slices/projectsSlice'
import { ProjectCard } from './ProjectCard'

export function ProjectsGrid() {
  const projects = useAppSelector(selectProjects)
  const activeFilter = useAppSelector(selectActiveFilter)
  const isLoading = useAppSelector(selectIsProjectsLoading)
  const dispatch = useAppDispatch()

  // get unique categories
  const categories = ['All', ...Array.from(new Set((projects || []).map(p => p.category)))]

  // filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? (projects || [])
    : (projects || []).filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner size="lg" text="Loading projects..." />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-blue-400">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for creating innovative solutions
          </p>
        </motion.div>

        {/* project filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Tabs 
            value={activeFilter} 
            onValueChange={(value) => dispatch(setActiveFilter(value))}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {(category === 'All' ? (projects || []) : (projects || []).filter(p => p.category === category)).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* show filtered results count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 dark:text-gray-400"
        >
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' && ` in ${activeFilter}`}
        </motion.div>
      </div>
    </section>
  )
}