import { useState } from 'react'
import { getRandomQuestions, checkAnswer } from '../../data/quizQuestions'
import styles from './ModuleAssessment.module.css'

function PracticeQuiz({ moduleId }) {
  const [numQuestions, setNumQuestions] = useState(5)
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  
  const startPractice = () => {
    const questions = getRandomQuestions(moduleId, numQuestions)
    setQuiz(questions)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }
  
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
      if (checkAnswer(question, answers[question.id])) {
        correct++
      }
    })
    return Math.round((correct / quiz.length) * 100)
  }
  
  const resetPractice = () => {
    setQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }
  
  if (showResults) {
    const score = calculateScore()
    
    return (
      <div className={styles.assessment}>
        <h3>Practice Results</h3>
        <div className={styles.results}>
          <div className={`${styles.scoreCard} ${score >= 80 ? styles.passed : styles.failed}`}>
            <div className={styles.score}>{score}%</div>
            <div className={styles.scoreLabel}>
              {score >= 80 ? 'Great job!' : 'Keep practicing!'}
            </div>
          </div>
          
          <div className={styles.summary}>
            <p>You answered {Object.keys(answers).length} out of {quiz.length} questions.</p>
            <p>Correct answers: {Math.round(score * quiz.length / 100)} / {quiz.length}</p>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={resetPractice}>
              Practice Again
            </button>
            <button className={styles.secondaryButton} onClick={startPractice}>
              New Questions
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (!quiz) {
    return (
      <div className={styles.assessment}>
        <h3>Practice Quiz</h3>
        <div className={styles.quizInfo}>
          <p>Test your knowledge with random questions from this module.</p>
          
          <div style={{ margin: '1rem 0' }}>
            <label>
              Number of questions: 
              <select 
                value={numQuestions} 
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                style={{ marginLeft: '0.5rem' }}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </label>
          </div>
          
          <button className={styles.primaryButton} onClick={startPractice}>
            Start Practice
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
        <h3>Practice Quiz</h3>
        <div className={styles.progress}>
          Question {currentQuestion + 1} of {quiz.length}
        </div>
      </div>
      
      <div className={styles.question}>
        <h4>{question.question}</h4>
        
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
        
        {(question.type === 'fill-in' || question.type === 'conversion' || 
          question.type === 'calculation' || question.type === 'identification') && (
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

export default PracticeQuiz