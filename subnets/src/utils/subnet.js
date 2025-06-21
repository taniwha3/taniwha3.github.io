/**
 * Subnet calculation utilities for CIDR notation and subnet math
 */

import { 
  ipToBinary, 
  binaryToIp, 
  calculateNetworkAddress,
  calculateBroadcastAddress,
  isValidIp 
} from './binary'

/**
 * Convert CIDR prefix to subnet mask
 * @param {number} prefix - CIDR prefix (0-32)
 * @returns {string} Subnet mask in dotted decimal format
 */
export function cidrToMask(prefix) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error('CIDR prefix must be between 0 and 32')
  }
  
  const maskBinary = '1'.repeat(prefix).padEnd(32, '0')
  return binaryToIp(maskBinary)
}

/**
 * Convert subnet mask to CIDR prefix
 * @param {string} mask - Subnet mask in dotted decimal format
 * @returns {number} CIDR prefix
 */
export function maskToCidr(mask) {
  if (!isValidIp(mask)) {
    throw new Error('Invalid subnet mask format')
  }
  
  const binary = ipToBinary(mask)
  
  // Check if it's a valid subnet mask (contiguous 1s followed by 0s)
  const firstZero = binary.indexOf('0')
  if (firstZero !== -1 && binary.substring(firstZero).includes('1')) {
    throw new Error('Invalid subnet mask - must have contiguous 1s followed by 0s')
  }
  
  return (binary.match(/1/g) || []).length
}

/**
 * Calculate number of hosts in a subnet
 * @param {number} prefix - CIDR prefix
 * @returns {number} Number of total addresses (including network and broadcast)
 */
export function calculateHosts(prefix) {
  if (prefix < 0 || prefix > 32) {
    throw new Error('Invalid CIDR prefix')
  }
  return Math.pow(2, 32 - prefix)
}

/**
 * Calculate number of usable hosts in a subnet
 * @param {number} prefix - CIDR prefix
 * @returns {number} Number of usable host addresses
 */
export function calculateUsableHosts(prefix) {
  if (prefix < 0 || prefix > 32) {
    throw new Error('Invalid CIDR prefix')
  }
  
  // Special cases
  if (prefix === 32) return 1 // Host route
  if (prefix === 31) return 2 // Point-to-point link (RFC 3021)
  
  return calculateHosts(prefix) - 2 // Subtract network and broadcast
}

/**
 * Calculate subnet information from IP and CIDR
 * @param {string} ip - IP address
 * @param {number} prefix - CIDR prefix
 * @returns {object} Subnet information
 */
export function getSubnetInfo(ip, prefix) {
  if (!isValidIp(ip)) {
    throw new Error('Invalid IP address')
  }
  
  const mask = cidrToMask(prefix)
  const network = calculateNetworkAddress(ip, mask)
  const broadcast = calculateBroadcastAddress(ip, mask)
  
  // Calculate first and last usable hosts
  const networkParts = network.split('.').map(Number)
  const broadcastParts = broadcast.split('.').map(Number)
  
  let firstHost, lastHost
  
  if (prefix === 32) {
    // Host route - only one address
    firstHost = network
    lastHost = network
  } else if (prefix === 31) {
    // Point-to-point - both addresses are usable
    firstHost = network
    lastHost = broadcast
  } else {
    // Normal subnet
    const firstHostParts = [...networkParts]
    firstHostParts[3] += 1
    firstHost = firstHostParts.join('.')
    
    const lastHostParts = [...broadcastParts]
    lastHostParts[3] -= 1
    lastHost = lastHostParts.join('.')
  }
  
  return {
    network,
    broadcast,
    firstHost,
    lastHost,
    mask,
    prefix,
    totalHosts: calculateHosts(prefix),
    usableHosts: calculateUsableHosts(prefix)
  }
}

/**
 * Calculate all subnets when dividing a network
 * @param {string} networkIp - Network IP address
 * @param {number} originalPrefix - Original CIDR prefix
 * @param {number} newPrefix - New CIDR prefix for subnets
 * @returns {Array} Array of subnet objects
 */
export function calculateSubnets(networkIp, originalPrefix, newPrefix) {
  if (newPrefix <= originalPrefix) {
    throw new Error('New prefix must be larger than original prefix')
  }
  
  const borrowedBits = newPrefix - originalPrefix
  const numberOfSubnets = Math.pow(2, borrowedBits)
  const hostBits = 32 - newPrefix
  const subnetSize = Math.pow(2, hostBits)
  
  const subnets = []
  const networkBinary = ipToBinary(networkIp)
  const networkDecimal = parseInt(networkBinary, 2)
  
  for (let i = 0; i < numberOfSubnets; i++) {
    const subnetDecimal = networkDecimal + (i * subnetSize)
    const subnetBinary = subnetDecimal.toString(2).padStart(32, '0')
    const subnetIp = binaryToIp(subnetBinary)
    
    subnets.push(getSubnetInfo(subnetIp, newPrefix))
  }
  
  return subnets
}

/**
 * Check if an IP is within a subnet
 * @param {string} ip - IP address to check
 * @param {string} network - Network address
 * @param {number} prefix - CIDR prefix
 * @returns {boolean} True if IP is in subnet
 */
export function isIpInSubnet(ip, network, prefix) {
  if (!isValidIp(ip) || !isValidIp(network)) {
    return false
  }
  
  const mask = cidrToMask(prefix)
  const ipNetwork = calculateNetworkAddress(ip, mask)
  const targetNetwork = calculateNetworkAddress(network, mask)
  
  return ipNetwork === targetNetwork
}

/**
 * Find which subnet an IP belongs to
 * @param {string} ip - IP address
 * @param {Array} subnets - Array of subnet objects
 * @returns {object|null} Matching subnet or null
 */
export function findSubnetForIp(ip, subnets) {
  for (const subnet of subnets) {
    if (isIpInSubnet(ip, subnet.network, subnet.prefix)) {
      return subnet
    }
  }
  return null
}

/**
 * Calculate VLSM allocation
 * @param {string} network - Base network address
 * @param {number} prefix - Base network prefix
 * @param {Array} requirements - Array of {name, hosts} objects sorted by hosts descending
 * @returns {Array} Array of allocated subnets
 */
export function calculateVLSM(network, prefix, requirements) {
  const allocations = []
  let currentNetwork = network
  
  // Sort requirements by number of hosts (descending)
  const sorted = [...requirements].sort((a, b) => b.hosts - a.hosts)
  
  for (const req of sorted) {
    // Find the smallest subnet that can accommodate the hosts
    let subnetPrefix = 32
    while (calculateUsableHosts(subnetPrefix) < req.hosts && subnetPrefix > 0) {
      subnetPrefix--
    }
    
    if (subnetPrefix < prefix) {
      throw new Error(`Cannot allocate ${req.hosts} hosts - subnet too large for remaining space`)
    }
    
    // Get subnet info
    const subnetInfo = getSubnetInfo(currentNetwork, subnetPrefix)
    
    allocations.push({
      name: req.name,
      requiredHosts: req.hosts,
      ...subnetInfo,
      utilization: ((req.hosts / subnetInfo.usableHosts) * 100).toFixed(1) + '%'
    })
    
    // Calculate next available network
    const subnetSize = calculateHosts(subnetPrefix)
    const currentBinary = ipToBinary(currentNetwork)
    const currentDecimal = parseInt(currentBinary, 2)
    const nextDecimal = currentDecimal + subnetSize
    const nextBinary = nextDecimal.toString(2).padStart(32, '0')
    currentNetwork = binaryToIp(nextBinary)
    
    // Check if we've exceeded our allocation
    if (!isIpInSubnet(currentNetwork, network, prefix)) {
      if (allocations.length < sorted.length) {
        throw new Error('Insufficient address space for all requirements')
      }
      break
    }
  }
  
  return allocations
}

/**
 * Summarize multiple networks into a single route
 * @param {Array} networks - Array of {network, prefix} objects
 * @returns {object} Summarized route {network, prefix}
 */
export function summarizeNetworks(networks) {
  if (networks.length === 0) {
    throw new Error('No networks to summarize')
  }
  
  if (networks.length === 1) {
    return networks[0]
  }
  
  // Convert all networks to binary
  const binaries = networks.map(net => ({
    binary: ipToBinary(net.network),
    prefix: net.prefix
  }))
  
  // Find common prefix length
  let commonPrefix = 0
  for (let i = 0; i < 32; i++) {
    const bit = binaries[0].binary[i]
    if (binaries.every(net => net.binary[i] === bit)) {
      commonPrefix++
    } else {
      break
    }
  }
  
  // Get the summary network
  const summaryBinary = binaries[0].binary.substring(0, commonPrefix).padEnd(32, '0')
  const summaryNetwork = binaryToIp(summaryBinary)
  
  return {
    network: summaryNetwork,
    prefix: commonPrefix
  }
}

/**
 * Generate a subnet mask reference table
 * @returns {Array} Array of mask objects
 */
export function getMaskReference() {
  const masks = []
  
  for (let prefix = 0; prefix <= 32; prefix++) {
    const mask = prefix === 0 ? '0.0.0.0' : cidrToMask(prefix)
    masks.push({
      prefix,
      mask,
      hostBits: 32 - prefix,
      totalHosts: calculateHosts(prefix),
      usableHosts: calculateUsableHosts(prefix)
    })
  }
  
  return masks
}

/**
 * Validate if a string is in CIDR notation
 * @param {string} cidr - String to validate (e.g., "192.168.1.0/24")
 * @returns {boolean} True if valid CIDR notation
 */
export function isValidCidr(cidr) {
  const parts = cidr.split('/')
  if (parts.length !== 2) return false
  
  const [ip, prefix] = parts
  if (!isValidIp(ip)) return false
  
  const prefixNum = parseInt(prefix, 10)
  return !isNaN(prefixNum) && prefixNum >= 0 && prefixNum <= 32
}

/**
 * Parse CIDR notation
 * @param {string} cidr - CIDR notation (e.g., "192.168.1.0/24")
 * @returns {object} {ip, prefix}
 */
export function parseCidr(cidr) {
  if (!isValidCidr(cidr)) {
    throw new Error('Invalid CIDR notation')
  }
  
  const [ip, prefix] = cidr.split('/')
  return {
    ip,
    prefix: parseInt(prefix, 10)
  }
}