'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Eye } from 'lucide-react'
import { IconFactory } from '@/components/common/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAppDispatch } from '@/store/types'
import { setSelectedProject } from '@/store/slices/projectsSlice'
import type { Project } from '@/lib/types'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const dispatch = useAppDispatch()

  // Use only the first image or none
  const projectImage = project.images && project.images.length > 0 ? project.images[0] : null

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
            {!projectImage ? (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400 dark:text-gray-600">
                {project.title.charAt(0)}
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image 
                  src={projectImage}
                  fill
                  alt={`${project.title}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
          
          {/* overlay with quick actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Dialog >
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => dispatch(setSelectedProject(project))}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw]">
                <DialogHeader>
                  <DialogTitle>{project.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                    {!projectImage ? (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-400 dark:text-gray-600">
                        {project.title.charAt(0)}
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={projectImage} 
                          fill
                          alt={`${project.title}`}
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.longDescription || project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Button asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <IconFactory name='github' className="mr-2 h-4 w-4" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {project.githubUrl && (
              <Button
                size="icon"
                variant="secondary"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <IconFactory name='github' className="h-4 w-4" />
                </a>
              </Button>
            )}

            {project.liveUrl && (
              <Button
                size="icon"
                variant="secondary"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.technologies?.slice(0, 3).map((tech: string) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>

            <div className="pt-2">
              <Badge variant="secondary" className="text-xs">
                {project.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}