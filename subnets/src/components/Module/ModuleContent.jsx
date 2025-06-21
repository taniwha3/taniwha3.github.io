import styles from './ModuleContent.module.css'

function ModuleContent({ module }) {
  // For now, display a placeholder since we haven't written actual content yet
  // This will be replaced when we implement T-17 through T-26
  
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
      </div>
    </div>
  )
}

export default ModuleContent