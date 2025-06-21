import BinaryConverter from './BinaryConverter'
import NetworkCalculator from './NetworkCalculator'
import styles from './ModuleContent.module.css'

function ModuleContent({ module }) {
  // Show interactive tools for certain modules
  const showBinaryConverter = [1, 2].includes(module.id)
  const showNetworkCalculator = [2, 3, 4, 5].includes(module.id)
  
  return (
    <div className={styles.moduleContent}>
      <div className={styles.placeholder}>
        <h2>Lesson Content Coming Soon</h2>
        <p>
          This is where the full lesson content for "{module.title}" will appear.
        </p>
        
        <div className={styles.contentPreview}>
          <h3>This lesson will include:</h3>
          <ul>
            <li>📖 Introduction - Why {module.title} matters</li>
            <li>🎯 Step-by-step explanations with examples</li>
            <li>📊 Visual diagrams and charts</li>
            <li>✏️ Interactive practice problems</li>
            <li>💡 Tips and common pitfalls</li>
            <li>📝 Summary and key takeaways</li>
          </ul>
        </div>
        
        <div className={styles.stickingPoints}>
          <h3>Common Challenges We'll Address:</h3>
          {module.stickingPoints.map((point, index) => (
            <div key={index} className={styles.stickingPoint}>
              <strong>Issue:</strong> {point.issue}
              <br />
              <strong>Solution:</strong> {point.remedy}
            </div>
          ))}
        </div>
        
        {showBinaryConverter && (
          <div className={styles.interactiveTool}>
            <h3>Try It Yourself</h3>
            <BinaryConverter />
          </div>
        )}
        
        {showNetworkCalculator && (
          <div className={styles.interactiveTool}>
            <h3>Practice Network Calculations</h3>
            <NetworkCalculator />
          </div>
        )}
      </div>
    </div>
  )
}

export default ModuleContent