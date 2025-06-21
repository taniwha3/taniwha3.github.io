import { useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'

const PROGRESS_KEY = 'subnet-master-progress'

/**
 * Custom hook for managing learning progress
 * @returns {object} Progress state and methods
 */
export function useProgress() {
  const [progress, setProgress] = useLocalStorage(PROGRESS_KEY, {
    modules: {},
    quizScores: {},
    practiceCompleted: {},
    lastAccessed: null,
    startedAt: new Date().toISOString()
  })
  
  // Update module progress
  const updateModuleProgress = useCallback((moduleId, updates) => {
    setProgress(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          ...updates,
          lastUpdated: new Date().toISOString()
        }
      },
      lastAccessed: new Date().toISOString()
    }))
  }, [setProgress])
  
  // Mark module as started
  const startModule = useCallback((moduleId) => {
    updateModuleProgress(moduleId, {
      started: true,
      startedAt: new Date().toISOString(),
      completed: false,
      progress: 0
    })
  }, [updateModuleProgress])
  
  // Mark module as completed
  const completeModule = useCallback((moduleId) => {
    updateModuleProgress(moduleId, {
      completed: true,
      completedAt: new Date().toISOString(),
      progress: 100
    })
  }, [updateModuleProgress])
  
  // Update quiz score
  const updateQuizScore = useCallback((moduleId, score, totalQuestions) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [moduleId]: {
          score,
          totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          attempts: (prev.quizScores[moduleId]?.attempts || 0) + 1,
          bestScore: Math.max(score, prev.quizScores[moduleId]?.bestScore || 0),
          lastAttempt: new Date().toISOString()
        }
      }
    }))
  }, [setProgress])
  
  // Mark practice exercise as completed
  const completePractice = useCallback((moduleId, exerciseId) => {
    setProgress(prev => ({
      ...prev,
      practiceCompleted: {
        ...prev.practiceCompleted,
        [moduleId]: {
          ...prev.practiceCompleted[moduleId],
          [exerciseId]: {
            completed: true,
            completedAt: new Date().toISOString()
          }
        }
      }
    }))
  }, [setProgress])
  
  // Get module progress
  const getModuleProgress = useCallback((moduleId) => {
    return progress.modules[moduleId] || {
      started: false,
      completed: false,
      progress: 0
    }
  }, [progress.modules])
  
  // Get quiz score for module
  const getQuizScore = useCallback((moduleId) => {
    return progress.quizScores[moduleId] || null
  }, [progress.quizScores])
  
  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const moduleIds = Array.from({ length: 10 }, (_, i) => i)
    const totalModules = moduleIds.length
    
    let completedModules = 0
    let totalProgress = 0
    
    moduleIds.forEach(id => {
      const module = progress.modules[id] || {}
      if (module.completed) {
        completedModules++
      }
      totalProgress += module.progress || 0
    })
    
    return {
      completedModules,
      totalModules,
      percentage: Math.round(totalProgress / totalModules)
    }
  }, [progress.modules])
  
  // Get next recommended module
  const getNextModule = useCallback(() => {
    for (let i = 0; i < 10; i++) {
      const module = progress.modules[i]
      if (!module || !module.completed) {
        return i
      }
    }
    return null // All modules completed
  }, [progress.modules])
  
  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress({
      modules: {},
      quizScores: {},
      practiceCompleted: {},
      lastAccessed: null,
      startedAt: new Date().toISOString()
    })
  }, [setProgress])
  
  // Export progress data
  const exportProgress = useCallback(() => {
    const data = {
      ...progress,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subnet-master-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [progress])
  
  // Import progress data
  const importProgress = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          setProgress(data)
          resolve()
        } catch (error) {
          reject(new Error('Invalid progress file'))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })
  }, [setProgress])
  
  return {
    progress,
    startModule,
    completeModule,
    updateModuleProgress,
    updateQuizScore,
    completePractice,
    getModuleProgress,
    getQuizScore,
    overallProgress,
    getNextModule,
    resetProgress,
    exportProgress,
    importProgress
  }
}

export default useProgress