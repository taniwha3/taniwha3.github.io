import { useState } from 'react'
import { decimalToBinary, binaryToDecimal, formatBinaryNibbles } from '../../utils/binary'
import styles from './BinaryConverter.module.css'

function BinaryConverter() {
  const [decimal, setDecimal] = useState('')
  const [binary, setBinary] = useState('')
  const [error, setError] = useState('')
  
  const powersOfTwo = [128, 64, 32, 16, 8, 4, 2, 1]
  
  const handleDecimalChange = (value) => {
    setDecimal(value)
    setError('')
    
    if (value === '') {
      setBinary('')
      return
    }
    
    const num = parseInt(value, 10)
    if (isNaN(num) || num < 0 || num > 255) {
      setError('Please enter a number between 0 and 255')
      setBinary('')
    } else {
      try {
        const binaryResult = decimalToBinary(num)
        setBinary(binaryResult)
      } catch (err) {
        setError(err.message)
      }
    }
  }
  
  const handleBinaryChange = (value) => {
    setBinary(value.replace(/[^01]/g, ''))
    setError('')
    
    if (value === '') {
      setDecimal('')
      return
    }
    
    if (value.length > 8) {
      setError('Binary must be 8 bits or less')
      setDecimal('')
      return
    }
    
    try {
      const decimalResult = binaryToDecimal(value)
      setDecimal(decimalResult.toString())
    } catch (err) {
      setError(err.message)
    }
  }
  
  const toggleBit = (position) => {
    const currentBinary = binary.padStart(8, '0')
    const bitArray = currentBinary.split('')
    bitArray[position] = bitArray[position] === '1' ? '0' : '1'
    const newBinary = bitArray.join('')
    setBinary(newBinary)
    handleBinaryChange(newBinary)
  }
  
  const getDecimalBreakdown = () => {
    if (!decimal || decimal === '0') return null
    
    const num = parseInt(decimal, 10)
    const breakdown = []
    let remaining = num
    
    powersOfTwo.forEach(power => {
      if (remaining >= power) {
        breakdown.push(power)
        remaining -= power
      }
    })
    
    return breakdown
  }
  
  const breakdown = getDecimalBreakdown()
  const binaryDisplay = binary.padStart(8, '0')
  
  return (
    <div className={styles.converter}>
      <h3>Binary Converter</h3>
      
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="decimal">Decimal</label>
          <input
            id="decimal"
            type="text"
            value={decimal}
            onChange={(e) => handleDecimalChange(e.target.value)}
            placeholder="0-255"
            className={styles.input}
          />
        </div>
        
        <div className={styles.equals}>=</div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="binary">Binary</label>
          <input
            id="binary"
            type="text"
            value={binary}
            onChange={(e) => handleBinaryChange(e.target.value)}
            placeholder="00000000"
            maxLength="8"
            className={styles.input}
          />
        </div>
      </div>
      
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      
      <div className={styles.visual}>
        <h4>Visual Representation</h4>
        
        <div className={styles.bitsContainer}>
          <div className={styles.powers}>
            {powersOfTwo.map((power, index) => (
              <div key={index} className={styles.power}>
                {power}
              </div>
            ))}
          </div>
          
          <div className={styles.bits}>
            {binaryDisplay.split('').map((bit, index) => (
              <button
                key={index}
                className={`${styles.bit} ${bit === '1' ? styles.bitOn : styles.bitOff}`}
                onClick={() => toggleBit(index)}
                title="Click to toggle"
              >
                {bit}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.formatted}>
          <strong>Nibbles:</strong> {formatBinaryNibbles(binaryDisplay)}
        </div>
      </div>
      
      {breakdown && (
        <div className={styles.breakdown}>
          <h4>Decimal Breakdown</h4>
          <p>
            {decimal} = {breakdown.join(' + ')}
          </p>
        </div>
      )}
      
      <div className={styles.tips}>
        <h4>Quick Reference</h4>
        <ul>
          <li>Each position represents a power of 2</li>
          <li>Add the values where bits are 1</li>
          <li>Click bits to toggle them</li>
        </ul>
      </div>
    </div>
  )
}

export default BinaryConverter