import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <button
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
        </button>
        
        <Link to="/" className={styles.logo}>
          <h1>Subnet Pro</h1>
        </Link>
        
        <nav className={styles.desktopNav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/module/0" className={styles.navLink}>Modules</Link>
          <Link to="/progress" className={styles.navLink}>Progress</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header