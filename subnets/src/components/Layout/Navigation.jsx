import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './Navigation.module.css'

function Navigation({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const modules = [
    { id: 0, title: 'Orientation & Pre-Assessment' },
    { id: 1, title: 'Binary & Powers of Two' },
    { id: 2, title: 'Bitwise Logic' },
    { id: 3, title: 'IPv4 Address Anatomy' },
    { id: 4, title: 'Subnet Masks & CIDR' },
    { id: 5, title: 'Fixed-Length Subnets' },
    { id: 6, title: 'VLSM & Address Planning' },
    { id: 7, title: 'Routing & ACL' },
    { id: 8, title: 'IPv6 Fundamentals' },
    { id: 9, title: 'Troubleshooting Tools' },
  ]

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />
      
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
        <div className={styles.navHeader}>
          <h2>Navigation</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>
        
        <div className={styles.navContent}>
          <Link to="/" className={styles.navLink} onClick={onClose}>
            🏠 Home
          </Link>
          
          <Link to="/progress" className={styles.navLink} onClick={onClose}>
            📊 My Progress
          </Link>
          
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>Modules</h3>
            {modules.map(module => (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className={styles.moduleLink}
                onClick={onClose}
              >
                <span className={styles.moduleNumber}>{module.id}</span>
                {module.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation