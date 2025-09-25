'use client'

import { motion } from 'framer-motion'
import { IconFactory } from '@/components/common/icons'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/common/LoadingStates'
import { useAppSelector } from '@/store/types'
import { selectProfile, selectIsProfileLoading } from '@/store/slices/profileSlice'

export function HeroSection() {
  const profile = useAppSelector(selectProfile)
  const isLoading = useAppSelector(selectIsProfileLoading)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({behavior: 'smooth'})
  }

  const handleDownloadCV = () => {
    if (profile?.resumeUrl) {
      window.open(profile.resumeUrl, '_blank')
    }
  }

  if (isLoading || !profile) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </section>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* avatar */}
          <motion.div variants={itemVariants} className="mb-8">
            <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* name & title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-gray-100 dark:via-blue-400 dark:to-purple-400">
                {profile.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">
              {profile.title}
            </p>
          </motion.div>

          {/* bio */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>

          {/* status badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                profile.status === 'available' ? 'bg-green-500' : 
                profile.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              {profile.contactInfo.availability}
            </Badge>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            
            {profile.resumeUrl && (
              <Button
                variant="ghost"
                size="lg"
                onClick={handleDownloadCV}
                className="w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            )}
          </motion.div>

          {/* socials */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-6">
            {profile.socialLinks.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                title={link.label || link.platform}
              >
                <span className="sr-only">{link.platform}</span>
                <IconFactory 
                  name={link.icon.toLocaleLowerCase() as any}
                  className="w-6 h-6 rounded"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          onClick={scrollToAbout}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 "></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}