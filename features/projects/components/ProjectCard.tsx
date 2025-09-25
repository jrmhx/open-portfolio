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
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const dispatch = useAppDispatch()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Determine which images to use
  const projectImages = project.images && project.images.length > 0 ? project.images : []

  // Auto-scroll functionality
  useEffect(() => {
    if (projectImages.length <= 1 || isHovered || isDragging) return

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === projectImages.length - 1 ? 0 : prev + 1
      )
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [projectImages.length, isHovered, isDragging])

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === projectImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? projectImages.length - 1 : prev - 1
    )
  }

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
            {projectImages.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400 dark:text-gray-600">
                {project.title.charAt(0)}
              </div>
            ) : (
              <motion.div 
                className="relative w-full h-full group/image overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  className="flex h-full"
                  animate={{ x: `${-currentImageIndex * 100}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    mass: 0.8
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(event, info) => {
                    setIsDragging(false)
                    const threshold = 50
                    
                    if (info.offset.x > threshold && currentImageIndex > 0) {
                      prevImage()
                    } else if (info.offset.x < -threshold && currentImageIndex < projectImages.length - 1) {
                      nextImage()
                    }
                  }}
                  whileDrag={{ cursor: "grabbing" }}
                  style={{ cursor: isDragging ? "grabbing" : "grab" }}
                >
                  {projectImages.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      className="min-w-full h-full flex-shrink-0 relative"
                      initial={{ opacity: 0.7 }}
                      animate={{ 
                        opacity: imgIndex === currentImageIndex ? 1 : 0.7,
                        scale: imgIndex === currentImageIndex ? 1 : 0.98
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image 
                        src={image}
                        fill
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        className="object-cover select-none"
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Image indicators */}
                {projectImages.length > 1 && (
                  <motion.div 
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {projectImages.map((_, imgIndex) => (
                      <motion.button
                        key={imgIndex}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setCurrentImageIndex(imgIndex)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          imgIndex === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Navigation arrows */}
                {projectImages.length > 1 && (
                  <>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        prevImage()
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      ←
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ x: 10 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      →
                    </motion.button>
                  </>
                )}

                {/* Auto-scroll progress indicator */}
                {projectImages.length > 1 && !isHovered && !isDragging && (
                  <motion.div 
                    className="absolute top-1 left-1 right-1 h-1 bg-white/20 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                  >
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      key={currentImageIndex} // Reset animation on image change
                    />
                  </motion.div>
                )}
              </motion.div>
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
                    {projectImages.length === 0 ? (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-400 dark:text-gray-600">
                        {project.title.charAt(0)}
                      </div>
                    ) : (
                      <div className="relative w-full h-full group/modal">
                        <Image
                          src={projectImages[currentImageIndex]} 
                          fill
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        
                        {/* Image indicators for modal */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {projectImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                  index === currentImageIndex 
                                    ? 'bg-white' 
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Navigation arrows for modal */}
                        {projectImages.length > 1 && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex(prev => 
                                prev === 0 ? projectImages.length - 1 : prev - 1
                              )}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/modal:opacity-100 transition-opacity hover:bg-black/70"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex(prev => 
                                prev === projectImages.length - 1 ? 0 : prev + 1
                              )}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover/modal:opacity-100 transition-opacity hover:bg-black/70"
                            >
                              →
                            </button>
                          </>
                        )}
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