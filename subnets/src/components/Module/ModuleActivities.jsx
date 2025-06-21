import styles from './ModuleActivities.module.css'

function ModuleActivities({ activities }) {
  const getActivityIcon = (type) => {
    const icons = {
      tour: '🚀',
      reflection: '💭',
      lesson: '📚',
      exercise: '✏️',
      game: '🎮',
      drill: '🎯',
      lab: '🔬',
      visual: '👁️',
      reference: '📋',
      formula: '🔢',
      worksheet: '📝',
      scenario: '🏢',
      demo: '🖥️',
      puzzle: '🧩',
      comparison: '🔄',
      checklist: '✅'
    }
    return icons[type] || '📌'
  }
  
  return (
    <div className={styles.activities}>
      {activities.map((activity, index) => (
        <div key={index} className={styles.activity}>
          <div className={styles.activityIcon}>
            {getActivityIcon(activity.type)}
          </div>
          <div className={styles.activityContent}>
            <h3 className={styles.activityTitle}>{activity.title}</h3>
            <p className={styles.activityDescription}>{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ModuleActivities