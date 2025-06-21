import { useState } from 'react'
import styles from './AndVisualizer.module.css'

function AndVisualizer() {
  const [input1, setInput1] = useState('11001100')
  const [input2, setInput2] = useState('11110000')
  const [showSteps, setShowSteps] = useState(false)
  
  // Ensure inputs are valid 8-bit binary
  const validateBinary = (value) => {
    return value.replace(/[^01]/g, '').slice(0, 8)
  }
  
  const padBinary = (value) => {
    return value.padEnd(8, '0')
  }
  
  const performAnd = (bit1, bit2) => {
    return (bit1 === '1' && bit2 === '1') ? '1' : '0'
  }
  
  const binary1 = padBinary(input1)
  const binary2 = padBinary(input2)
  const result = binary1.split('').map((bit, index) => 
    performAnd(bit, binary2[index])
  ).join('')
  
  const binaryToDecimal = (binary) => {
    return parseInt(binary, 2)
  }
  
  return (
    <div className={styles.visualizer}>
      <h3>AND Operation Visualizer</h3>
      
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>First Binary Number:</label>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(validateBinary(e.target.value))}
            placeholder="8-bit binary"
            className={styles.binaryInput}
            maxLength={8}
          />
          <span className={styles.decimal}>= {binaryToDecimal(binary1)}</span>
        </div>
        
        <div className={styles.inputGroup}>
          <label>Second Binary Number:</label>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(validateBinary(e.target.value))}
            placeholder="8-bit binary"
            className={styles.binaryInput}
            maxLength={8}
          />
          <span className={styles.decimal}>= {binaryToDecimal(binary2)}</span>
        </div>
      </div>
      
      <div className={styles.operation}>
        <div className={styles.calculation}>
          <div className={styles.row}>
            <span className={styles.label}></span>
            {binary1.split('').map((bit, index) => (
              <span key={index} className={styles.bit}>{bit}</span>
            ))}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>AND</span>
            {binary2.split('').map((bit, index) => (
              <span key={index} className={styles.bit}>{bit}</span>
            ))}
          </div>
          <div className={styles.separator}>
            <span className={styles.label}></span>
            {[...Array(8)].map((_, index) => (
              <span key={index} className={styles.dash}>-</span>
            ))}
          </div>
          <div className={styles.row}>
            <span className={styles.label}>=</span>
            {result.split('').map((bit, index) => (
              <span 
                key={index} 
                className={`${styles.bit} ${bit === '1' ? styles.bitOne : styles.bitZero}`}
              >
                {bit}
              </span>
            ))}
          </div>
        </div>
        
        <div className={styles.resultDecimal}>
          Result: {result} = {binaryToDecimal(result)} in decimal
        </div>
      </div>
      
      <button 
        className={styles.toggleButton}
        onClick={() => setShowSteps(!showSteps)}
      >
        {showSteps ? 'Hide' : 'Show'} Step-by-Step
      </button>
      
      {showSteps && (
        <div className={styles.steps}>
          <h4>Bit-by-bit breakdown:</h4>
          <div className={styles.stepGrid}>
            {binary1.split('').map((bit1, index) => {
              const bit2 = binary2[index]
              const resultBit = performAnd(bit1, bit2)
              return (
                <div key={index} className={styles.step}>
                  <div className={styles.stepCalc}>
                    {bit1} AND {bit2} = {resultBit}
                  </div>
                  <div className={styles.stepExplain}>
                    {bit1 === '1' && bit2 === '1' 
                      ? '✓ Both are 1' 
                      : '✗ Not both 1'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      
      <div className={styles.examples}>
        <h4>Try these examples:</h4>
        <div className={styles.exampleButtons}>
          <button onClick={() => { setInput1('11111111'); setInput2('00000000'); }}>
            All 1s AND All 0s
          </button>
          <button onClick={() => { setInput1('10101010'); setInput2('11111111'); }}>
            Pattern AND All 1s
          </button>
          <button onClick={() => { setInput1('11000000'); setInput2('11111111'); }}>
            192 AND 255
          </button>
          <button onClick={() => { setInput1('10101100'); setInput2('11110000'); }}>
            172 AND 240
          </button>
        </div>
      </div>
    </div>
  )
}

export default AndVisualizer