import { useState } from 'react'
import { 
  calculateNetworkAddress, 
  calculateBroadcastAddress,
  ipToBinary,
  binaryToIp
} from '../../utils/binary'
import { cidrToMask, maskToCidr } from '../../utils/subnet'
import styles from './NetworkCalculator.module.css'

function NetworkCalculator() {
  const [ip, setIp] = useState('192.168.1.100')
  const [cidr, setCidr] = useState('24')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  
  const validateIp = (ipStr) => {
    const parts = ipStr.split('.')
    if (parts.length !== 4) return false
    
    return parts.every(part => {
      const num = parseInt(part)
      return !isNaN(num) && num >= 0 && num <= 255
    })
  }
  
  const calculate = () => {
    setError('')
    
    if (!validateIp(ip)) {
      setError('Please enter a valid IP address')
      return
    }
    
    const cidrNum = parseInt(cidr)
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      setError('CIDR must be between 0 and 32')
      return
    }
    
    const mask = cidrToMask(cidrNum)
    const network = calculateNetworkAddress(ip, mask)
    const broadcast = calculateBroadcastAddress(ip, mask)
    
    const hostBits = 32 - cidrNum
    const totalHosts = Math.pow(2, hostBits)
    const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0
    
    // Calculate first and last usable hosts
    const networkParts = network.split('.').map(Number)
    const broadcastParts = broadcast.split('.').map(Number)
    
    let firstHost = [...networkParts]
    let lastHost = [...broadcastParts]
    
    if (usableHosts > 0) {
      firstHost[3] += 1
      lastHost[3] -= 1
      
      // Handle overflow
      for (let i = 3; i > 0; i--) {
        if (firstHost[i] > 255) {
          firstHost[i] = 0
          firstHost[i-1] += 1
        }
      }
      
      // Handle underflow
      for (let i = 3; i > 0; i--) {
        if (lastHost[i] < 0) {
          lastHost[i] = 255
          lastHost[i-1] -= 1
        }
      }
    }
    
    setResults({
      network,
      mask,
      broadcast,
      firstHost: usableHosts > 0 ? firstHost.join('.') : 'N/A',
      lastHost: usableHosts > 0 ? lastHost.join('.') : 'N/A',
      totalHosts,
      usableHosts,
      ipBinary: ipToBinary(ip),
      maskBinary: ipToBinary(mask),
      networkBinary: ipToBinary(network)
    })
  }
  
  return (
    <div className={styles.calculator}>
      <h3>Network Calculator</h3>
      
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>IP Address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.100"
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>CIDR:</label>
          <div className={styles.cidrInput}>
            <span>/</span>
            <input
              type="number"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              min="0"
              max="32"
              className={styles.input}
            />
          </div>
        </div>
        
        <button className={styles.calculateBtn} onClick={calculate}>
          Calculate
        </button>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {results && (
        <div className={styles.results}>
          <h4>Results</h4>
          
          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.label}>Network Address:</span>
              <span className={styles.value}>{results.network}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>Subnet Mask:</span>
              <span className={styles.value}>{results.mask}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>Broadcast Address:</span>
              <span className={styles.value}>{results.broadcast}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>First Usable Host:</span>
              <span className={styles.value}>{results.firstHost}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>Last Usable Host:</span>
              <span className={styles.value}>{results.lastHost}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>Total Hosts:</span>
              <span className={styles.value}>{results.totalHosts.toLocaleString()}</span>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.label}>Usable Hosts:</span>
              <span className={styles.value}>{results.usableHosts.toLocaleString()}</span>
            </div>
          </div>
          
          <div className={styles.binaryView}>
            <h5>Binary Representation</h5>
            <div className={styles.binaryGrid}>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>IP:</span>
                <span className={styles.binaryValue}>{results.ipBinary}</span>
              </div>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>Mask:</span>
                <span className={styles.binaryValue}>{results.maskBinary}</span>
              </div>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>Network:</span>
                <span className={styles.binaryValue}>{results.networkBinary}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NetworkCalculator