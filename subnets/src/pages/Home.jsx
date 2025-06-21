import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Master Subnetting</h1>
        <p className={styles.subtitle}>
          Learn IPv4 and IPv6 subnetting from the ground up with interactive lessons, 
          practice exercises, and real-world examples.
        </p>
        <Link to="/module/0" className={styles.ctaButton}>
          Start Learning
        </Link>
      </section>

      <section className={styles.features}>
        <h2>What You'll Learn</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔢</div>
            <h3>Binary & Decimal</h3>
            <p>Master number conversions and understand the foundation of IP addressing.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h3>IP Addressing</h3>
            <p>Learn IPv4 and IPv6 address structures, classes, and CIDR notation.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔀</div>
            <h3>Subnet Calculations</h3>
            <p>Calculate subnets, hosts, and implement VLSM for efficient network design.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛠️</div>
            <h3>Practical Tools</h3>
            <p>Use real-world tools for verification and troubleshooting network configurations.</p>
          </div>
        </div>
      </section>

      <section className={styles.curriculum}>
        <h2>Curriculum Overview</h2>
        <p>10 comprehensive modules taking you from beginner to subnet expert:</p>
        <ol className={styles.moduleList}>
          <li>Orientation & Pre-Assessment</li>
          <li>Binary Math & Powers of Two</li>
          <li>Bitwise Logic Operations</li>
          <li>IPv4 Address Anatomy</li>
          <li>Subnet Masks & CIDR Notation</li>
          <li>Fixed-Length Subnet Calculations</li>
          <li>Variable Length Subnet Masking (VLSM)</li>
          <li>Routing & ACL Implications</li>
          <li>IPv6 Subnet Fundamentals</li>
          <li>Verification & Troubleshooting</li>
        </ol>
        <Link to="/module/0" className={styles.startButton}>
          Begin Module 0 →
        </Link>
      </section>
    </div>
  )
}

export default Home