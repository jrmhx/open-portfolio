'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/types'
import { 
  fetchProfile,
} from '@/store/slices/profileSlice'
import {
  fetchProjects,
  fetchFeaturedProjects,
  fetchProjectCategories
} from '@/store/slices/projectsSlice'
import {
  fetchExperience,
  fetchSkills,
  fetchFeaturedSkills
} from '@/store/slices/experienceSlice'

/**
 * hook to initialize all application data on startup
 */
export function useDataInitialization() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // initialize all data in parallel for faster loading
    const initializeData = async () => {
      try {
        // fetch core profile data first
        await dispatch(fetchProfile()).unwrap()
        
        // fetch other data in parallel
        await Promise.all([
          dispatch(fetchProjects({ page: 1, limit: 12 })),
          dispatch(fetchFeaturedProjects()),
          dispatch(fetchProjectCategories()),
          dispatch(fetchExperience()),
          dispatch(fetchSkills()),
          dispatch(fetchFeaturedSkills(4))
        ])

        console.log('✅ All application data initialized successfully')
      } catch (error) {
        console.error('❌ Failed to initialize application data:', error)
        // you could show a global error message here
      }
    }

    initializeData()
  }, [dispatch])
}

/**
 * hook to refresh data (useful for pull-to-refresh or manual refresh)
 */
export function useDataRefresh() {
  const dispatch = useAppDispatch()

  const refreshAllData = async () => {
    try {
      await Promise.all([
        dispatch(fetchProfile()),
        dispatch(fetchProjects({ page: 1, limit: 12 })),
        dispatch(fetchFeaturedProjects()),
        dispatch(fetchExperience()),
        dispatch(fetchSkills())
      ])
      console.log('🔄 Data refreshed successfully')
    } catch (error) {
      console.error('❌ Failed to refresh data:', error)
      throw error
    }
  }

  return { refreshAllData }
}