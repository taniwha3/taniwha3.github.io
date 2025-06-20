import { useState } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import styles from './Layout.module.css'

function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const closeNav = () => setIsNavOpen(false)

  return (
    <div className={styles.layout}>
      <Header onMenuClick={toggleNav} />
      <Navigation isOpen={isNavOpen} onClose={closeNav} />
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2024 Subnet Master. Built with React & Vite.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout