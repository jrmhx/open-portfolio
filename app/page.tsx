'use client'

import { MainNav } from "@/features/navigation"
import { HeroSection } from "@/features/hero"
import { ProjectsGrid } from "@/features/projects"
import { AboutSection } from "@/features/about"
import { Footer } from "@/components/common/Footer"
import { useAppSelector } from "@/store/types"
import { selectProfileError } from "@/store/slices/profileSlice"

export default function Home() {
  // With static data, no initialization needed
  const profileError = useAppSelector(selectProfileError)

  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Failed to load profile data
          </h2>
          <p className="text-gray-600">{profileError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <MainNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsGrid />
        {/* TODO contact section placeholder - can be added later */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-blue-400">
                Get In Touch
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Let&apos;s discuss your next project or opportunity
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Contact form coming soon...
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
