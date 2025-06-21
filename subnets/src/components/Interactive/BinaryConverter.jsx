import { useState } from 'react'
import { decimalToBinary, binaryToDecimal } from '../../utils/binary'
import styles from './BinaryConverter.module.css'

function BinaryConverter() {
  const [decimal, setDecimal] = useState('')
  const [binary, setBinary] = useState('')
  const [mode, setMode] = useState('decToBin')
  const [error, setError] = useState('')
  
  const handleDecimalChange = (e) => {
    const value = e.target.value
    setDecimal(value)
    setError('')
    
    if (value === '') {
      setBinary('')
      return
    }
    
    const num = parseInt(value)
    if (isNaN(num) || num < 0 || num > 255) {
      setError('Please enter a number between 0 and 255')
      setBinary('')
      return
    }
    
    setBinary(decimalToBinary(num))
  }
  
  const handleBinaryChange = (e) => {
    const value = e.target.value
    setBinary(value)
    setError('')
    
    if (value === '') {
      setDecimal('')
      return
    }
    
    if (!/^[01]+$/.test(value)) {
      setError('Binary can only contain 0s and 1s')
      setDecimal('')
      return
    }
    
    if (value.length > 8) {
      setError('Binary must be 8 bits or less')
      setDecimal('')
      return
    }
    
    setDecimal(binaryToDecimal(value).toString())
  }
  
  const toggleMode = () => {
    setMode(mode === 'decToBin' ? 'binToDec' : 'decToBin')
    setDecimal('')
    setBinary('')
    setError('')
  }
  
  const powers = [128, 64, 32, 16, 8, 4, 2, 1]
  const binaryBits = binary.padStart(8, '0').split('')
  
  return (
    <div className={styles.converter}>
      <div className={styles.header}>
        <h3>Binary Converter</h3>
        <button className={styles.modeToggle} onClick={toggleMode}>
          {mode === 'decToBin' ? '→ Binary to Decimal' : '→ Decimal to Binary'}
        </button>
      </div>
      
      <div className={styles.inputs}>
        {mode === 'decToBin' ? (
          <>
            <div className={styles.inputGroup}>
              <label>Decimal:</label>
              <input
                type="text"
                value={decimal}
                onChange={handleDecimalChange}
                placeholder="Enter decimal (0-255)"
                className={styles.input}
              />
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.inputGroup}>
              <label>Binary:</label>
              <div className={styles.result}>{binary || '--------'}</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputGroup}>
              <label>Binary:</label>
              <input
                type="text"
                value={binary}
                onChange={handleBinaryChange}
                placeholder="Enter binary"
                className={styles.input}
                maxLength={8}
              />
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.inputGroup}>
              <label>Decimal:</label>
              <div className={styles.result}>{decimal || '-'}</div>
            </div>
          </>
        )}
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {binary && (
        <div className={styles.breakdown}>
          <h4>Bit Values:</h4>
          <div className={styles.bitGrid}>
            <div className={styles.bitRow}>
              {powers.map((power, index) => (
                <div key={index} className={styles.power}>{power}</div>
              ))}
            </div>
            <div className={styles.bitRow}>
              {binaryBits.map((bit, index) => (
                <div 
                  key={index} 
                  className={`${styles.bit} ${bit === '1' ? styles.bitOn : styles.bitOff}`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
          {decimal && (
            <div className={styles.calculation}>
              = {binaryBits.map((bit, index) => 
                bit === '1' ? powers[index] : null
              ).filter(Boolean).join(' + ')} = {decimal}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BinaryConverter