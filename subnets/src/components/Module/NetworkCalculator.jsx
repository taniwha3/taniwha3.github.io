import { useState } from 'react'
import { 
  calculateNetworkAddress, 
  calculateBroadcastAddress,
  ipToBinary,
  formatBinary,
  isValidIp
} from '../../utils/binary'
import styles from './NetworkCalculator.module.css'

function NetworkCalculator() {
  const [ip, setIp] = useState('192.168.1.100')
  const [mask, setMask] = useState('255.255.255.0')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  
  const calculate = () => {
    setError('')
    
    if (!isValidIp(ip)) {
      setError('Invalid IP address format')
      return
    }
    
    if (!isValidIp(mask)) {
      setError('Invalid subnet mask format')
      return
    }
    
    try {
      const network = calculateNetworkAddress(ip, mask)
      const broadcast = calculateBroadcastAddress(ip, mask)
      
      // Calculate first and last usable hosts
      const networkParts = network.split('.').map(Number)
      const broadcastParts = broadcast.split('.').map(Number)
      
      const firstHost = [...networkParts]
      firstHost[3] += 1
      
      const lastHost = [...broadcastParts]
      lastHost[3] -= 1
      
      setResults({
        network,
        broadcast,
        firstHost: firstHost.join('.'),
        lastHost: lastHost.join('.'),
        ipBinary: formatBinary(ipToBinary(ip)),
        maskBinary: formatBinary(ipToBinary(mask)),
        networkBinary: formatBinary(ipToBinary(network))
      })
    } catch (err) {
      setError(err.message)
    }
  }
  
  return (
    <div className={styles.calculator}>
      <h3>Network Calculator</h3>
      
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="ip">IP Address</label>
          <input
            id="ip"
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.100"
            className={styles.input}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="mask">Subnet Mask</label>
          <input
            id="mask"
            type="text"
            value={mask}
            onChange={(e) => setMask(e.target.value)}
            placeholder="255.255.255.0"
            className={styles.input}
          />
        </div>
        
        <button onClick={calculate} className={styles.calculateButton}>
          Calculate
        </button>
      </div>
      
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      
      {results && (
        <div className={styles.results}>
          <h4>Results</h4>
          
          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.label}>Network Address:</span>
              <span className={styles.value}>{results.network}</span>
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
          </div>
          
          <div className={styles.binaryView}>
            <h5>Binary Representation</h5>
            <div className={styles.binaryGrid}>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>IP:</span>
                <code>{results.ipBinary}</code>
              </div>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>Mask:</span>
                <code>{results.maskBinary}</code>
              </div>
              <div className={styles.binaryRow}>
                <span className={styles.binaryLabel}>Network:</span>
                <code>{results.networkBinary}</code>
              </div>
            </div>
          </div>
          
          <div className={styles.explanation}>
            <h5>How it works:</h5>
            <p>The network address is calculated by performing a bitwise AND operation between the IP address and subnet mask. The bits where both IP and mask have 1 remain 1, all others become 0.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default NetworkCalculator