'use client'

import { motion } from 'framer-motion'
import { IconFactory } from '@/components/common/icons'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/types'
import { useState, useEffect } from 'react'

export function Footer() {
  const profile = useAppSelector((state) => state.profile.data)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* logo */}
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {profile?.name}
            </h3>
            <p className="text-gray-400 mt-2">{profile?.title}</p>
          </div>

          {/* socials */}
          <div className="flex space-x-6">
            {profile?.socialLinks.map((link) => {
              
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <IconFactory 
                    name={link.icon.toLowerCase() as any} 
                    className="h-6 w-6" 
                  />
                  <span className="sr-only">{link.platform}</span>
                </motion.a>
              )
            })}
          </div>

          {/* copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Jeremiah Xing</p>
            <p className="mt-1">Built with Next.js, Redux, and shadcn/ui</p>
          </div>
        </div>
      </div>

      {/* scroll to top button */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <IconFactory name='arrow-up'/>
          </Button>
        </motion.div>
      )}
    </motion.footer>
  )
}