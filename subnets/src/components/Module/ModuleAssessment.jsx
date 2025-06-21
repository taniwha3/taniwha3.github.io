import { useState, useEffect } from 'react'
import { useProgressContext } from '../../contexts/ProgressContext'
import { useParams } from 'react-router-dom'
import styles from './ModuleAssessment.module.css'

function ModuleAssessment({ assessment, quiz }) {
  const { id } = useParams()
  const moduleId = parseInt(id)
  const { updateQuizScore, completeModule } = useProgressContext()
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [scoreSaved, setScoreSaved] = useState(false)
  
  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer })
  }
  
  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const calculateScore = () => {
    if (!quiz) return 0
    let correct = 0
    quiz.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quiz.length) * 100)
  }
  
  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setShowQuiz(false)
    setScoreSaved(false)
  }
  
  if (!quiz || quiz.length === 0) {
    return (
      <div className={styles.assessment}>
        <h2>Assessment</h2>
        <div className={styles.assessmentInfo}>
          <p><strong>Type:</strong> {assessment.type}</p>
          <p><strong>Task:</strong> {assessment.prompt}</p>
          <p><strong>Description:</strong> {assessment.description}</p>
          {assessment.passingScore && (
            <p><strong>Passing Score:</strong> {assessment.passingScore}%</p>
          )}
        </div>
        <p className={styles.noQuiz}>Interactive quiz coming soon!</p>
      </div>
    )
  }
  
  // Save quiz results when showing results for the first time
  useEffect(() => {
    if (showResults && !scoreSaved) {
      const score = calculateScore()
      const passed = assessment.passingScore ? score >= assessment.passingScore : true
      
      // Save quiz score to progress tracking
      updateQuizScore(moduleId, score, quiz.length)
      
      // Mark module as complete if passed
      if (passed) {
        completeModule(moduleId)
      }
      
      setScoreSaved(true)
    }
  }, [showResults, scoreSaved, moduleId, assessment.passingScore, updateQuizScore, completeModule, quiz])
  
  if (showResults) {
    const score = calculateScore()
    const passed = assessment.passingScore ? score >= assessment.passingScore : true
    
    return (
      <div className={styles.assessment}>
        <h2>Quiz Results</h2>
        <div className={styles.results}>
          <div className={`${styles.scoreCard} ${passed ? styles.passed : styles.failed}`}>
            <div className={styles.score}>{score}%</div>
            <div className={styles.scoreLabel}>
              {passed ? '🎉 Passed!' : '📚 Keep Studying'}
            </div>
          </div>
          
          <div className={styles.summary}>
            <h3>Summary</h3>
            <p>You answered {Object.keys(answers).length} out of {quiz.length} questions.</p>
            {assessment.passingScore && (
              <p>Passing score: {assessment.passingScore}%</p>
            )}
          </div>
          
          <button className={styles.primaryButton} onClick={resetQuiz}>
            Try Again
          </button>
        </div>
      </div>
    )
  }
  
  if (!showQuiz) {
    return (
      <div className={styles.assessment}>
        <h2>Module Assessment</h2>
        <div className={styles.assessmentInfo}>
          <p><strong>Type:</strong> {assessment.type}</p>
          <p><strong>Task:</strong> {assessment.prompt}</p>
          <p><strong>Description:</strong> {assessment.description}</p>
          {assessment.passingScore && (
            <p><strong>Passing Score:</strong> {assessment.passingScore}%</p>
          )}
        </div>
        
        <div className={styles.quizInfo}>
          <h3>Ready to Test Your Knowledge?</h3>
          <p>This quiz contains {quiz.length} questions covering the key concepts from this module.</p>
          <button className={styles.primaryButton} onClick={() => setShowQuiz(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    )
  }
  
  const question = quiz[currentQuestion]
  const isAnswered = answers[question.id] !== undefined
  
  return (
    <div className={styles.assessment}>
      <div className={styles.quizHeader}>
        <h2>Module Quiz</h2>
        <div className={styles.progress}>
          Question {currentQuestion + 1} of {quiz.length}
        </div>
      </div>
      
      <div className={styles.question}>
        <h3>{question.question}</h3>
        
        {question.type === 'multiple-choice' && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label key={index} className={styles.option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={answers[question.id] === index}
                  onChange={() => handleAnswer(question.id, index)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
        
        {question.type === 'true-false' && (
          <div className={styles.options}>
            <label className={styles.option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={true}
                checked={answers[question.id] === true}
                onChange={() => handleAnswer(question.id, true)}
              />
              <span>True</span>
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={false}
                checked={answers[question.id] === false}
                onChange={() => handleAnswer(question.id, false)}
              />
              <span>False</span>
            </label>
          </div>
        )}
        
        {(question.type === 'fill-in' || question.type === 'conversion') && (
          <div className={styles.textInput}>
            <input
              type="text"
              placeholder="Enter your answer..."
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className={styles.navigation}>
        <button 
          className={styles.secondaryButton} 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button 
          className={styles.primaryButton} 
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentQuestion === quiz.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default ModuleAssessment