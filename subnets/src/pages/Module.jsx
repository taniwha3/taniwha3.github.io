import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { modules, getModuleById } from '../data/curriculum'
import { getModuleQuiz } from '../data/quizQuestions'
import { exercises } from '../data/exercises'
import ModuleContent from '../components/Module/ModuleContent'
import ModuleObjectives from '../components/Module/ModuleObjectives'
import ModuleActivities from '../components/Module/ModuleActivities'
import ModuleAssessment from '../components/Module/ModuleAssessment'
import styles from './Module.module.css'

function Module() {
  const { id } = useParams()
  const moduleId = parseInt(id)
  const [activeTab, setActiveTab] = useState('overview')
  
  const currentModule = getModuleById(moduleId)
  const moduleQuiz = getModuleQuiz(moduleId)
  const moduleExercises = exercises[moduleId]
  const prevModule = moduleId > 0 ? modules[moduleId - 1] : null
  const nextModule = moduleId < modules.length - 1 ? modules[moduleId + 1] : null
  
  if (!currentModule) {
    return (
      <div className={styles.error}>
        <h1>Module Not Found</h1>
        <p>The requested module does not exist.</p>
        <Link to="/" className={styles.homeLink}>Return to Home</Link>
      </div>
    )
  }
  
  return (
    <div className={styles.module}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span> / </span>
        <span>Module {moduleId}</span>
      </nav>
      
      <header className={styles.header}>
        <h1>Module {moduleId}: {currentModule.title}</h1>
      </header>
      
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'content' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Lesson
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'practice' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
      </div>
      
      <div className={styles.content}>
        {activeTab === 'overview' && (
          <div className={styles.overview}>
            <section className={styles.section}>
              <h2>Module Goal</h2>
              <p className={styles.goal}>{currentModule.goal}</p>
            </section>
            
            <ModuleObjectives objectives={currentModule.objectives} />
            
            <section className={styles.section}>
              <h2>What You'll Do</h2>
              <ModuleActivities activities={currentModule.activities} />
            </section>
            
            <section className={styles.section}>
              <h2>Prerequisites</h2>
              {currentModule.prerequisites.length > 0 ? (
                <ul className={styles.prerequisites}>
                  {currentModule.prerequisites.map(prereqId => {
                    const prereq = modules.find(m => m.id === prereqId)
                    return (
                      <li key={prereqId}>
                        <Link to={`/module/${prereqId}`}>
                          Module {prereqId}: {prereq?.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p>None - this is a foundational module!</p>
              )}
            </section>
            
            <section className={styles.section}>
              <h2>Time Estimate</h2>
              <p>{currentModule.estimatedTime} minutes</p>
            </section>
          </div>
        )}
        
        {activeTab === 'content' && (
          <ModuleContent module={currentModule} />
        )}
        
        {activeTab === 'practice' && (
          <div className={styles.practice}>
            <h2>Practice Exercises</h2>
            {moduleExercises ? (
              <p>Practice exercises for {currentModule.title}</p>
            ) : (
              <p>No practice exercises available for this module yet.</p>
            )}
          </div>
        )}
        
        {activeTab === 'quiz' && (
          <ModuleAssessment 
            assessment={currentModule.assessment} 
            quiz={moduleQuiz}
          />
        )}
      </div>
      
      <nav className={styles.navigation}>
        {prevModule && (
          <Link to={`/module/${prevModule.id}`} className={styles.navButton}>
            ← Module {prevModule.id}: {prevModule.title}
          </Link>
        )}
        {nextModule && (
          <Link to={`/module/${nextModule.id}`} className={`${styles.navButton} ${styles.navButtonNext}`}>
            Module {nextModule.id}: {nextModule.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Module