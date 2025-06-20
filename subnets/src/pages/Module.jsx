import { useParams, Link } from 'react-router-dom'
import styles from './Module.module.css'

function Module() {
  const { id } = useParams()
  const moduleId = parseInt(id)
  
  // Placeholder module data - will be replaced with real curriculum data later
  const modules = [
    { id: 0, title: 'Orientation & Pre-Assessment' },
    { id: 1, title: 'Positional Number Systems & Powers of Two' },
    { id: 2, title: 'Bitwise Logic Without Programming' },
    { id: 3, title: 'IPv4 Address Anatomy' },
    { id: 4, title: 'Subnet Masks & CIDR Notation' },
    { id: 5, title: 'Fixed-Length Subnet Calculations' },
    { id: 6, title: 'Variable Length Subnet Masking (VLSM) & Address Planning' },
    { id: 7, title: 'Subnetting in Practice: Routing & ACL Implications' },
    { id: 8, title: 'IPv6 Subnet Fundamentals' },
    { id: 9, title: 'Verification & Troubleshooting Tools' },
  ]
  
  const currentModule = modules[moduleId]
  const prevModule = moduleId > 0 ? modules[moduleId - 1] : null
  const nextModule = moduleId < modules.length - 1 ? modules[moduleId + 1] : null
  
  if (!currentModule) {
    return (
      <div className={styles.error}>
        <h1>Module Not Found</h1>
        <p>The requested module does not exist.</p>
        <Link to="/" className={styles.homeLink}>Return to Home</Link>
      </div>
    )
  }
  
  return (
    <div className={styles.module}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span> / </span>
        <span>Module {moduleId}</span>
      </nav>
      
      <header className={styles.header}>
        <h1>Module {moduleId}: {currentModule.title}</h1>
      </header>
      
      <div className={styles.content}>
        <div className={styles.placeholder}>
          <p>Module content will be loaded here once curriculum data is integrated.</p>
          <p>This will include:</p>
          <ul>
            <li>Learning objectives</li>
            <li>Key concepts and activities</li>
            <li>Interactive exercises</li>
            <li>Assessment questions</li>
          </ul>
        </div>
      </div>
      
      <nav className={styles.navigation}>
        {prevModule && (
          <Link to={`/module/${prevModule.id}`} className={styles.navButton}>
            ← Module {prevModule.id}: {prevModule.title}
          </Link>
        )}
        {nextModule && (
          <Link to={`/module/${nextModule.id}`} className={`${styles.navButton} ${styles.navButtonNext}`}>
            Module {nextModule.id}: {nextModule.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Module