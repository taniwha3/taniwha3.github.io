import { Link } from 'react-router-dom'
import styles from './Progress.module.css'

function Progress() {
  // Placeholder progress data - will be connected to localStorage later
  const modules = [
    { id: 0, title: 'Orientation & Pre-Assessment', completed: false, progress: 0 },
    { id: 1, title: 'Binary & Powers of Two', completed: false, progress: 0 },
    { id: 2, title: 'Bitwise Logic', completed: false, progress: 0 },
    { id: 3, title: 'IPv4 Address Anatomy', completed: false, progress: 0 },
    { id: 4, title: 'Subnet Masks & CIDR', completed: false, progress: 0 },
    { id: 5, title: 'Fixed-Length Subnets', completed: false, progress: 0 },
    { id: 6, title: 'VLSM & Address Planning', completed: false, progress: 0 },
    { id: 7, title: 'Routing & ACL', completed: false, progress: 0 },
    { id: 8, title: 'IPv6 Fundamentals', completed: false, progress: 0 },
    { id: 9, title: 'Troubleshooting Tools', completed: false, progress: 0 },
  ]
  
  const totalProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length
  const completedCount = modules.filter(m => m.completed).length
  
  return (
    <div className={styles.progress}>
      <h1>Your Learning Progress</h1>
      
      <div className={styles.overview}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{Math.round(totalProgress)}%</div>
          <div className={styles.statLabel}>Overall Progress</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{completedCount}/{modules.length}</div>
          <div className={styles.statLabel}>Modules Completed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statLabel}>Practice Problems</div>
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
                ) : (
                  <span className={styles.incomplete}>{module.progress}% Complete</span>
                )}
              </div>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <Link to={`/module/${module.id}`} className={styles.moduleLink}>
              {module.completed ? 'Review' : 'Continue'} →
            </Link>
          </div>
        ))}
      </div>
      
      <div className={styles.actions}>
        <button className={styles.resetButton}>
          Reset All Progress
        </button>
        <button className={styles.exportButton}>
          Export Progress
        </button>
      </div>
    </div>
  )
}

export default Progress