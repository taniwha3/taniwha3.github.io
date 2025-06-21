import styles from './ModuleObjectives.module.css'

function ModuleObjectives({ objectives }) {
  return (
    <section className={styles.objectives}>
      <h2>Learning Objectives</h2>
      <p className={styles.intro}>By the end of this module, you will be able to:</p>
      <ul className={styles.objectivesList}>
        {objectives.map((objective, index) => (
          <li key={index} className={styles.objective}>
            <span className={styles.checkmark}>✓</span>
            {objective}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ModuleObjectives