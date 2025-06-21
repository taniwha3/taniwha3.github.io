/**
 * Binary math utility functions for subnet calculations
 */

/**
 * Convert decimal number to 8-bit binary string
 * @param {number} decimal - Decimal number (0-255)
 * @returns {string} 8-bit binary string
 */
export function decimalToBinary(decimal) {
  if (!Number.isInteger(decimal) || decimal < 0 || decimal > 255) {
    throw new Error('Input must be an integer between 0 and 255')
  }
  return decimal.toString(2).padStart(8, '0')
}

/**
 * Convert binary string to decimal
 * @param {string} binary - Binary string
 * @returns {number} Decimal number
 */
export function binaryToDecimal(binary) {
  if (typeof binary !== 'string' || !/^[01]+$/.test(binary)) {
    throw new Error('Input must be a binary string containing only 0s and 1s')
  }
  return parseInt(binary, 2)
}

/**
 * Convert IP address to 32-bit binary string
 * @param {string} ip - IP address in dotted decimal format
 * @returns {string} 32-bit binary string
 */
export function ipToBinary(ip) {
  const octets = ip.split('.')
  if (octets.length !== 4) {
    throw new Error('Invalid IP address format')
  }
  
  return octets.map(octet => {
    const num = parseInt(octet, 10)
    if (isNaN(num) || num < 0 || num > 255) {
      throw new Error('Invalid octet value: ' + octet)
    }
    return decimalToBinary(num)
  }).join('')
}

/**
 * Convert 32-bit binary string to IP address
 * @param {string} binary - 32-bit binary string
 * @returns {string} IP address in dotted decimal format
 */
export function binaryToIp(binary) {
  if (binary.length !== 32 || !/^[01]+$/.test(binary)) {
    throw new Error('Input must be a 32-bit binary string')
  }
  
  const octets = []
  for (let i = 0; i < 32; i += 8) {
    const octetBinary = binary.substring(i, i + 8)
    octets.push(binaryToDecimal(octetBinary))
  }
  
  return octets.join('.')
}

/**
 * Perform bitwise AND operation on two binary strings
 * @param {string} binary1 - First binary string
 * @param {string} binary2 - Second binary string
 * @returns {string} Result of AND operation
 */
export function bitwiseAnd(binary1, binary2) {
  if (binary1.length !== binary2.length) {
    throw new Error('Binary strings must have the same length')
  }
  
  let result = ''
  for (let i = 0; i < binary1.length; i++) {
    result += (binary1[i] === '1' && binary2[i] === '1') ? '1' : '0'
  }
  
  return result
}

/**
 * Perform bitwise OR operation on two binary strings
 * @param {string} binary1 - First binary string
 * @param {string} binary2 - Second binary string
 * @returns {string} Result of OR operation
 */
export function bitwiseOr(binary1, binary2) {
  if (binary1.length !== binary2.length) {
    throw new Error('Binary strings must have the same length')
  }
  
  let result = ''
  for (let i = 0; i < binary1.length; i++) {
    result += (binary1[i] === '1' || binary2[i] === '1') ? '1' : '0'
  }
  
  return result
}

/**
 * Calculate network address from IP and subnet mask
 * @param {string} ip - IP address in dotted decimal format
 * @param {string} mask - Subnet mask in dotted decimal format
 * @returns {string} Network address in dotted decimal format
 */
export function calculateNetworkAddress(ip, mask) {
  const ipBinary = ipToBinary(ip)
  const maskBinary = ipToBinary(mask)
  const networkBinary = bitwiseAnd(ipBinary, maskBinary)
  return binaryToIp(networkBinary)
}

/**
 * Calculate broadcast address from IP and subnet mask
 * @param {string} ip - IP address in dotted decimal format
 * @param {string} mask - Subnet mask in dotted decimal format
 * @returns {string} Broadcast address in dotted decimal format
 */
export function calculateBroadcastAddress(ip, mask) {
  const ipBinary = ipToBinary(ip)
  const maskBinary = ipToBinary(mask)
  
  // Invert the mask (host bits become 1s)
  const invertedMask = maskBinary.split('').map(bit => bit === '0' ? '1' : '0').join('')
  
  // OR with IP to get broadcast
  const broadcastBinary = bitwiseOr(ipBinary, invertedMask)
  return binaryToIp(broadcastBinary)
}

/**
 * Get powers of 2 from 0 to n
 * @param {number} n - Maximum power
 * @returns {Array<{power: number, value: number}>} Array of powers and values
 */
export function getPowersOfTwo(n = 8) {
  const powers = []
  for (let i = 0; i <= n; i++) {
    powers.push({
      power: i,
      value: Math.pow(2, i)
    })
  }
  return powers
}

/**
 * Convert binary string to formatted display (with dots)
 * @param {string} binary - 32-bit binary string
 * @returns {string} Formatted binary with dots between octets
 */
export function formatBinary(binary) {
  if (binary.length !== 32) {
    throw new Error('Binary string must be 32 bits')
  }
  
  const octets = []
  for (let i = 0; i < 32; i += 8) {
    octets.push(binary.substring(i, i + 8))
  }
  
  return octets.join('.')
}

/**
 * Convert binary string to nibbles (4-bit groups)
 * @param {string} binary - Binary string
 * @returns {string} Binary string with spaces between nibbles
 */
export function formatBinaryNibbles(binary) {
  const nibbles = []
  for (let i = 0; i < binary.length; i += 4) {
    nibbles.push(binary.substring(i, i + 4))
  }
  return nibbles.join(' ')
}

/**
 * Check if a number is a power of 2
 * @param {number} num - Number to check
 * @returns {boolean} True if power of 2
 */
export function isPowerOfTwo(num) {
  return num > 0 && (num & (num - 1)) === 0
}

/**
 * Find the highest power of 2 less than or equal to a number
 * @param {number} num - Input number
 * @returns {number} Highest power of 2 <= num
 */
export function highestPowerOfTwo(num) {
  if (num < 1) return 0
  
  let power = 1
  while (power * 2 <= num) {
    power *= 2
  }
  return power
}

/**
 * Validate if a string is a valid binary number
 * @param {string} binary - String to validate
 * @returns {boolean} True if valid binary
 */
export function isValidBinary(binary) {
  return /^[01]+$/.test(binary)
}

/**
 * Validate if a string is a valid IP address
 * @param {string} ip - String to validate
 * @returns {boolean} True if valid IP
 */
export function isValidIp(ip) {
  const octets = ip.split('.')
  if (octets.length !== 4) return false
  
  return octets.every(octet => {
    const num = parseInt(octet, 10)
    return !isNaN(num) && num >= 0 && num <= 255 && octet === num.toString()
  })
}