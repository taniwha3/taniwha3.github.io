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
                {(() => {
                  // First, handle code blocks properly by not splitting them
                  const content = section.content
                  const codeBlockRegex = /```[\s\S]*?```/g
                  const codeBlocks = []
                  let lastIndex = 0
                  let match
                  
                  // Extract code blocks and replace with placeholders
                  while ((match = codeBlockRegex.exec(content)) !== null) {
                    codeBlocks.push(match[0])
                  }
                  
                  // Split content preserving code blocks
                  const parts = []
                  let tempContent = content
                  let blockIndex = 0
                  
                  while (tempContent.includes('```')) {
                    const startIdx = tempContent.indexOf('```')
                    const endIdx = tempContent.indexOf('```', startIdx + 3) + 3
                    
                    if (startIdx > 0) {
                      // Add text before code block
                      parts.push({ type: 'text', content: tempContent.slice(0, startIdx) })
                    }
                    
                    // Add code block
                    parts.push({ 
                      type: 'code', 
                      content: tempContent.slice(startIdx + 3, endIdx - 3).trim() 
                    })
                    
                    tempContent = tempContent.slice(endIdx)
                  }
                  
                  // Add remaining text
                  if (tempContent) {
                    parts.push({ type: 'text', content: tempContent })
                  }
                  
                  // Render parts
                  return parts.map((part, index) => {
                    if (part.type === 'code') {
                      return (
                        <pre key={index} className={styles.codeBlock}>
                          <code>{part.content}</code>
                        </pre>
                      )
                    } else {
                      // Split text into paragraphs
                      return part.content.split('\n\n').map((paragraph, pIndex) => {
                        if (paragraph.trim()) {
                          // Handle markdown-style formatting
                          if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                            return <h3 key={`${index}-${pIndex}`} className={styles.subheading}>{paragraph.slice(2, -2)}</h3>
                          }
                          
                          // Handle lists
                          if (paragraph.includes('\n-')) {
                            const items = paragraph.split('\n-').filter(item => item.trim())
                            return (
                              <ul key={`${index}-${pIndex}`} className={styles.list}>
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
                              <ol key={`${index}-${pIndex}`} className={styles.numberedList}>
                                {items.map((item, iIndex) => (
                                  <li key={iIndex}>{renderFormattedText(item.replace(/^\d+\.\s*/, ''))}</li>
                                ))}
                              </ol>
                            )
                          }
                          
                          return <p key={`${index}-${pIndex}`}>{renderFormattedText(paragraph)}</p>
                        }
                        return null
                      }).filter(Boolean)
                    }
                  })
                })()}
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