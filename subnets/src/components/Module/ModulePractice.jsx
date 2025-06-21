import { useState } from 'react'
import BinaryConverter from '../Interactive/BinaryConverter'
import NetworkCalculator from '../Interactive/NetworkCalculator'
import styles from './ModulePractice.module.css'

function ModulePractice({ exercises, moduleId }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState({})
  
  if (!exercises || !exercises.exercises || exercises.exercises.length === 0) {
    return (
      <div className={styles.noPractice}>
        <p>No practice exercises available for this module yet.</p>
      </div>
    )
  }
  
  const exercise = exercises.exercises[currentExercise]
  
  const handleAnswer = (problemIndex, answer) => {
    const key = `${currentExercise}-${problemIndex}`
    setUserAnswers({ ...userAnswers, [key]: answer })
  }
  
  const checkAnswer = (problemIndex) => {
    const key = `${currentExercise}-${problemIndex}`
    setShowFeedback({ ...showFeedback, [key]: true })
  }
  
  const nextExercise = () => {
    if (currentExercise < exercises.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }
  
  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
    }
  }
  
  const renderExercise = () => {
    switch (exercise.type) {
      case 'decimal-to-binary':
        return (
          <div className={styles.conversionExercise}>
            <h3>Convert Decimal to Binary</h3>
            <p>Convert each decimal number to its 8-bit binary representation.</p>
            {exercise.problems.map((problem, index) => {
              const key = `${currentExercise}-${index}`
              const userAnswer = userAnswers[key] || ''
              const isCorrect = userAnswer === problem.binary
              const showResult = showFeedback[key]
              
              return (
                <div key={index} className={styles.problem}>
                  <div className={styles.problemRow}>
                    <span className={styles.decimal}>{problem.decimal}</span>
                    <span className={styles.arrow}>→</span>
                    <input
                      type="text"
                      className={`${styles.input} ${showResult ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                      value={userAnswer}
                      onChange={(e) => handleAnswer(index, e.target.value)}
                      placeholder="Binary (8 bits)"
                      maxLength={8}
                    />
                    <button 
                      className={styles.checkBtn}
                      onClick={() => checkAnswer(index)}
                    >
                      Check
                    </button>
                  </div>
                  {showResult && (
                    <div className={styles.feedback}>
                      {isCorrect ? (
                        <span className={styles.success}>✓ Correct!</span>
                      ) : (
                        <span className={styles.error}>
                          ✗ Incorrect. The answer is {problem.binary}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
        
      case 'binary-to-decimal':
        return (
          <div className={styles.conversionExercise}>
            <h3>Convert Binary to Decimal</h3>
            <p>Convert each binary number to its decimal equivalent.</p>
            {exercise.problems.map((problem, index) => {
              const key = `${currentExercise}-${index}`
              const userAnswer = userAnswers[key] || ''
              const isCorrect = parseInt(userAnswer) === problem.decimal
              const showResult = showFeedback[key]
              
              return (
                <div key={index} className={styles.problem}>
                  <div className={styles.problemRow}>
                    <span className={styles.binary}>{problem.binary}</span>
                    <span className={styles.arrow}>→</span>
                    <input
                      type="text"
                      className={`${styles.input} ${showResult ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                      value={userAnswer}
                      onChange={(e) => handleAnswer(index, e.target.value)}
                      placeholder="Decimal"
                      maxLength={3}
                    />
                    <button 
                      className={styles.checkBtn}
                      onClick={() => checkAnswer(index)}
                    >
                      Check
                    </button>
                  </div>
                  {showResult && (
                    <div className={styles.feedback}>
                      {isCorrect ? (
                        <span className={styles.success}>✓ Correct!</span>
                      ) : (
                        <span className={styles.error}>
                          ✗ Incorrect. The answer is {problem.decimal}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
        
      case 'powers-of-two':
        return (
          <div className={styles.powersExercise}>
            <h3>Powers of 2</h3>
            <p>Fill in the values for each power of 2.</p>
            {exercise.problems.map((problem, index) => {
              const key = `${currentExercise}-${index}`
              const userAnswer = userAnswers[key] || ''
              const isCorrect = parseInt(userAnswer) === problem.value
              const showResult = showFeedback[key]
              
              return (
                <div key={index} className={styles.problem}>
                  <div className={styles.problemRow}>
                    <span className={styles.power}>2^{problem.power} =</span>
                    <input
                      type="text"
                      className={`${styles.input} ${showResult ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                      value={userAnswer}
                      onChange={(e) => handleAnswer(index, e.target.value)}
                      placeholder="Value"
                      maxLength={3}
                    />
                    <button 
                      className={styles.checkBtn}
                      onClick={() => checkAnswer(index)}
                    >
                      Check
                    </button>
                  </div>
                  {showResult && (
                    <div className={styles.feedback}>
                      {isCorrect ? (
                        <span className={styles.success}>✓ Correct!</span>
                      ) : (
                        <span className={styles.error}>
                          ✗ Incorrect. 2^{problem.power} = {problem.value}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
        
      default:
        return (
          <div className={styles.placeholder}>
            <p>Exercise type "{exercise.type}" not yet implemented.</p>
          </div>
        )
    }
  }
  
  // Show tools for modules 1 and 2
  const showTools = moduleId === 1 || moduleId === 2
  
  return (
    <div className={styles.practice}>
      <div className={styles.header}>
        <h2>{exercises.title}</h2>
        <div className={styles.progress}>
          Exercise {currentExercise + 1} of {exercises.exercises.length}
        </div>
      </div>
      
      <div className={styles.exerciseContent}>
        {renderExercise()}
      </div>
      
      <div className={styles.navigation}>
        <button 
          className={styles.navButton}
          onClick={prevExercise}
          disabled={currentExercise === 0}
        >
          ← Previous
        </button>
        <button 
          className={styles.navButton}
          onClick={nextExercise}
          disabled={currentExercise === exercises.exercises.length - 1}
        >
          Next →
        </button>
      </div>
      
      {showTools && (
        <div className={styles.tools}>
          <h3>Practice Tools</h3>
          <p>Use these tools to help check your work:</p>
          <div className={styles.toolsGrid}>
            {moduleId === 1 && <BinaryConverter />}
            {moduleId === 2 && <NetworkCalculator />}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModulePractice