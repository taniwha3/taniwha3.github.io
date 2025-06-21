import { getModuleContent, hasModuleContent } from '../../data/moduleContent'
import BinaryConverter from '../Interactive/BinaryConverter'
import NetworkCalculator from '../Interactive/NetworkCalculator'
import AndVisualizer from '../Interactive/AndVisualizer'
import styles from './ModuleContent.module.css'

function ModuleContent({ module }) {
  const moduleContent = getModuleContent(module.id)
  const hasContent = hasModuleContent(module.id)
  
  // If we have full content, render it
  if (hasContent && moduleContent) {
    return (
      <div className={styles.moduleContent}>
        {moduleContent.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            
            {section.type === 'interactive-tool' && section.component === 'BinaryConverter' ? (
              <BinaryConverter />
            ) : section.type === 'interactive-tool' && section.component === 'NetworkCalculator' ? (
              <NetworkCalculator />
            ) : section.type === 'interactive-tool' && section.component === 'AndVisualizer' ? (
              <AndVisualizer />
            ) : (
              <div className={styles.sectionContent}>
                {section.content.split('\n\n').map((paragraph, pIndex) => {
                  // Handle code blocks with triple backticks
                  if (paragraph.includes('```')) {
                    const parts = paragraph.split('```')
                    return (
                      <div key={pIndex}>
                        {parts.map((part, partIndex) => {
                          if (partIndex % 2 === 1) {
                            // This is code
                            return (
                              <pre key={partIndex} className={styles.codeBlock}>
                                <code>{part.trim()}</code>
                              </pre>
                            )
                          } else if (part.trim()) {
                            // This is regular text
                            return <p key={partIndex}>{renderFormattedText(part.trim())}</p>
                          }
                          return null
                        })}
                      </div>
                    )
                  }
                  
                  // Handle markdown-style formatting
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                    return <h3 key={pIndex} className={styles.subheading}>{paragraph.slice(2, -2)}</h3>
                  }
                  
                  // Handle lists
                  if (paragraph.includes('\n-')) {
                    const items = paragraph.split('\n-').filter(item => item.trim())
                    return (
                      <ul key={pIndex} className={styles.list}>
                        {items.map((item, iIndex) => (
                          <li key={iIndex}>{renderFormattedText(iIndex === 0 ? item : '-' + item)}</li>
                        ))}
                      </ul>
                    )
                  }
                  
                  // Handle numbered lists
                  if (paragraph.match(/^\d+\./)) {
                    const items = paragraph.split(/\n(?=\d+\.)/)
                    return (
                      <ol key={pIndex} className={styles.numberedList}>
                        {items.map((item, iIndex) => (
                          <li key={iIndex}>{renderFormattedText(item.replace(/^\d+\.\s*/, ''))}</li>
                        ))}
                      </ol>
                    )
                  }
                  
                  return <p key={pIndex}>{renderFormattedText(paragraph)}</p>
                })}
              </div>
            )}
          </div>
        ))}
        
        {moduleContent.practice && (
          <div className={styles.practice}>
            <h2>{moduleContent.practice.title}</h2>
            {moduleContent.practice.questions && moduleContent.practice.questions.map((q, index) => (
              <div key={index} className={styles.practiceQuestion}>
                <p className={styles.question}><strong>Q{index + 1}:</strong> {q.question}</p>
                {q.hint && <p className={styles.hint}><em>Hint: {q.hint}</em></p>}
                <details className={styles.answer}>
                  <summary>Show Answer</summary>
                  <p>{q.answer}</p>
                </details>
              </div>
            ))}
            
            {moduleContent.practice.exercises && moduleContent.practice.exercises.map((exercise, index) => (
              <div key={index} className={styles.exerciseSection}>
                <h3>{exercise.title}</h3>
                {exercise.instructions && <p className={styles.instructions}>{exercise.instructions}</p>}
                {exercise.problems && (
                  <ul className={styles.problemList}>
                    {exercise.problems.map((problem, pIndex) => (
                      <li key={pIndex}>{problem}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        
        {moduleContent.keyTakeaways && (
          <div className={styles.keyTakeaways}>
            <h2>Key Takeaways</h2>
            <ul>
              {moduleContent.keyTakeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
  
  // Otherwise show the placeholder
  return (
    <div className={styles.moduleContent}>
      <div className={styles.placeholder}>
        <h2>Lesson Content Coming Soon</h2>
        <p>
          This is where the full lesson content for &quot;{module.title}&quot; will appear.
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
          <h3>Common Challenges We&apos;ll Address:</h3>
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

// Helper function to render formatted text
function renderFormattedText(text) {
  // Replace **text** with bold
  const parts = text.split(/\*\*/)
  return parts.map((part, index) => 
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  )
}

export default ModuleContent