import { Link } from 'react-router-dom'
import { useProgressContext } from '../contexts/ProgressContext'
import { modules as curriculumModules } from '../data/curriculum'
import styles from './Progress.module.css'

function Progress() {
  const { 
    getModuleProgress, 
    getQuizScore, 
    overallProgress, 
    resetProgress,
    exportProgress,
    importProgress 
  } = useProgressContext()
  
  const modules = curriculumModules.map(module => {
    const progress = getModuleProgress(module.id)
    const quizScore = getQuizScore(module.id)
    return {
      ...module,
      ...progress,
      quizScore
    }
  })
  
  const handleImportProgress = (event) => {
    const file = event.target.files[0]
    if (file) {
      importProgress(file)
        .then(() => {
          alert('Progress imported successfully!')
          window.location.reload() // Refresh to show new progress
        })
        .catch(error => {
          alert('Failed to import progress: ' + error.message)
        })
    }
  }
  
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress()
      window.location.reload() // Refresh to show reset progress
    }
  }
  
  return (
    <div className={styles.progress}>
      <h1>Your Learning Progress</h1>
      
      <div className={styles.overview}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{overallProgress.percentage}%</div>
          <div className={styles.statLabel}>Overall Progress</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{overallProgress.completedModules}/{overallProgress.totalModules}</div>
          <div className={styles.statLabel}>Modules Completed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>
            {modules.filter(m => m.quizScore && m.quizScore.percentage >= 80).length}
          </div>
          <div className={styles.statLabel}>Quizzes Passed</div>
        </div>
      </div>
      
      <div className={styles.modules}>
        <h2>Module Progress</h2>
        {modules.map(module => (
          <div key={module.id} className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleNumber}>Module {module.id}</span>
                <h3 className={styles.moduleTitle}>{module.title}</h3>
              </div>
              <div className={styles.moduleStatus}>
                {module.completed ? (
                  <span className={styles.completed}>✓ Completed</span>
                ) : module.started ? (
                  <span className={styles.incomplete}>{module.progress || 0}% Complete</span>
                ) : (
                  <span className={styles.notStarted}>Not Started</span>
                )}
              </div>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${module.progress || 0}%` }}
              />
            </div>
            <div className={styles.moduleFooter}>
              <Link to={`/module/${module.id}`} className={styles.moduleLink}>
                {module.completed ? 'Review' : module.started ? 'Continue' : 'Start'} →
              </Link>
              {module.quizScore && (
                <span className={styles.quizScore}>
                  Quiz: {module.quizScore.percentage}% 
                  {module.quizScore.attempts > 1 && ` (${module.quizScore.attempts} attempts)`}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.actions}>
        <button 
          className={styles.resetButton}
          onClick={handleResetProgress}
        >
          Reset All Progress
        </button>
        <button 
          className={styles.exportButton}
          onClick={exportProgress}
        >
          Export Progress
        </button>
        <label className={styles.importButton}>
          Import Progress
          <input
            type="file"
            accept=".json"
            onChange={handleImportProgress}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  )
}

export default Progress