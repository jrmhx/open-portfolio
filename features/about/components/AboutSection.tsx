'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/common/LoadingStates'
import { useAppSelector } from '@/store/types'
import { selectProfile, selectIsProfileLoading } from '@/store/slices/profileSlice'
import { selectExperience, selectSkills, selectIsExperienceLoading } from '@/store/slices/experienceSlice'

export function AboutSection() {
  const profile = useAppSelector(selectProfile)
  const experience = useAppSelector(selectExperience)
  const skills = useAppSelector(selectSkills)
  const isProfileLoading = useAppSelector(selectIsProfileLoading)
  const isExperienceLoading = useAppSelector(selectIsExperienceLoading)

  const isLoading = isProfileLoading || isExperienceLoading

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

  if (isLoading || !profile) {
    return (
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner size="lg" text="Loading about information..." />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-blue-400">
                About Me
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get to know me better through my journey, skills, and passion for technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* left column*/}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>My Story</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {profile.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Key Stats */}
              {/* <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                          5+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                          50+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                          25+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Clients Satisfied</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                          20+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div> */}
              {experience && experience.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Experience</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {experience.slice(0, 3).map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {exp.title}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                            {exp.company}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* right column */}
            <div className="space-y-8">
              {/* skills */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Core Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skills?.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {
                              skill.proficiency === 5 ? 'Expert' :
                              skill.proficiency === 4 ? 'Advanced' :
                              skill.proficiency === 3 ? 'Intermediate' :
                              skill.proficiency === 2 ? 'Novice' :
                              'Beginner'
                            }
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* contact info */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Get In Touch
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.contactInfo.email}
                    </p>
                    {profile.contactInfo.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.contactInfo.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Location
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.contactInfo.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.contactInfo.availability}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}