import { describe, it, expect } from 'vitest'
import {
  decimalToBinary,
  binaryToDecimal,
  ipToBinary,
  binaryToIp,
  bitwiseAnd,
  bitwiseOr,
  calculateNetworkAddress,
  calculateBroadcastAddress,
  getPowersOfTwo,
  formatBinary,
  formatBinaryNibbles,
  isPowerOfTwo,
  highestPowerOfTwo,
  isValidBinary,
  isValidIp
} from './binary'

describe('Binary Utilities', () => {
  describe('decimalToBinary', () => {
    it('converts decimal to 8-bit binary', () => {
      expect(decimalToBinary(0)).toBe('00000000')
      expect(decimalToBinary(255)).toBe('11111111')
      expect(decimalToBinary(192)).toBe('11000000')
      expect(decimalToBinary(168)).toBe('10101000')
      expect(decimalToBinary(1)).toBe('00000001')
      expect(decimalToBinary(128)).toBe('10000000')
    })

    it('throws error for invalid input', () => {
      expect(() => decimalToBinary(-1)).toThrow()
      expect(() => decimalToBinary(256)).toThrow()
      expect(() => decimalToBinary(1.5)).toThrow()
      expect(() => decimalToBinary('abc')).toThrow()
    })
  })

  describe('binaryToDecimal', () => {
    it('converts binary to decimal', () => {
      expect(binaryToDecimal('00000000')).toBe(0)
      expect(binaryToDecimal('11111111')).toBe(255)
      expect(binaryToDecimal('11000000')).toBe(192)
      expect(binaryToDecimal('10101000')).toBe(168)
      expect(binaryToDecimal('1')).toBe(1)
      expect(binaryToDecimal('10000000')).toBe(128)
    })

    it('throws error for invalid input', () => {
      expect(() => binaryToDecimal('abc')).toThrow()
      expect(() => binaryToDecimal('102')).toThrow()
      expect(() => binaryToDecimal(123)).toThrow()
    })
  })

  describe('ipToBinary', () => {
    it('converts IP address to 32-bit binary', () => {
      expect(ipToBinary('192.168.1.1')).toBe('11000000101010000000000100000001')
      expect(ipToBinary('255.255.255.255')).toBe('11111111111111111111111111111111')
      expect(ipToBinary('0.0.0.0')).toBe('00000000000000000000000000000000')
      expect(ipToBinary('10.0.0.1')).toBe('00001010000000000000000000000001')
    })

    it('throws error for invalid IP', () => {
      expect(() => ipToBinary('192.168.1')).toThrow()
      expect(() => ipToBinary('192.168.1.256')).toThrow()
      expect(() => ipToBinary('192.168.1.1.1')).toThrow()
      expect(() => ipToBinary('abc.def.ghi.jkl')).toThrow()
    })
  })

  describe('binaryToIp', () => {
    it('converts 32-bit binary to IP address', () => {
      expect(binaryToIp('11000000101010000000000100000001')).toBe('192.168.1.1')
      expect(binaryToIp('11111111111111111111111111111111')).toBe('255.255.255.255')
      expect(binaryToIp('00000000000000000000000000000000')).toBe('0.0.0.0')
      expect(binaryToIp('00001010000000000000000000000001')).toBe('10.0.0.1')
    })

    it('throws error for invalid binary', () => {
      expect(() => binaryToIp('1100000010101000')).toThrow() // Too short
      expect(() => binaryToIp('110000001010100000000001000000011')).toThrow() // Too long
      expect(() => binaryToIp('11000000101010000000000100000002')).toThrow() // Invalid character
    })
  })

  describe('bitwiseAnd', () => {
    it('performs AND operation correctly', () => {
      expect(bitwiseAnd('11111111', '11110000')).toBe('11110000')
      expect(bitwiseAnd('10101010', '11001100')).toBe('10001000')
      expect(bitwiseAnd('11111111', '00000000')).toBe('00000000')
      expect(bitwiseAnd('10101010', '10101010')).toBe('10101010')
    })

    it('throws error for different lengths', () => {
      expect(() => bitwiseAnd('1111', '11110000')).toThrow()
    })
  })

  describe('bitwiseOr', () => {
    it('performs OR operation correctly', () => {
      expect(bitwiseOr('11110000', '00001111')).toBe('11111111')
      expect(bitwiseOr('10101010', '01010101')).toBe('11111111')
      expect(bitwiseOr('00000000', '00000000')).toBe('00000000')
      expect(bitwiseOr('10101010', '10101010')).toBe('10101010')
    })

    it('throws error for different lengths', () => {
      expect(() => bitwiseOr('1111', '11110000')).toThrow()
    })
  })

  describe('calculateNetworkAddress', () => {
    it('calculates network address correctly', () => {
      expect(calculateNetworkAddress('192.168.1.100', '255.255.255.0')).toBe('192.168.1.0')
      expect(calculateNetworkAddress('10.1.5.50', '255.255.0.0')).toBe('10.1.0.0')
      expect(calculateNetworkAddress('172.16.20.100', '255.255.240.0')).toBe('172.16.16.0')
      expect(calculateNetworkAddress('192.168.10.130', '255.255.255.128')).toBe('192.168.10.128')
    })
  })

  describe('calculateBroadcastAddress', () => {
    it('calculates broadcast address correctly', () => {
      expect(calculateBroadcastAddress('192.168.1.100', '255.255.255.0')).toBe('192.168.1.255')
      expect(calculateBroadcastAddress('10.1.5.50', '255.255.0.0')).toBe('10.1.255.255')
      expect(calculateBroadcastAddress('172.16.20.100', '255.255.240.0')).toBe('172.16.31.255')
      expect(calculateBroadcastAddress('192.168.10.130', '255.255.255.128')).toBe('192.168.10.255')
    })
  })

  describe('getPowersOfTwo', () => {
    it('returns correct powers of two', () => {
      const powers = getPowersOfTwo(4)
      expect(powers).toHaveLength(5)
      expect(powers[0]).toEqual({ power: 0, value: 1 })
      expect(powers[1]).toEqual({ power: 1, value: 2 })
      expect(powers[2]).toEqual({ power: 2, value: 4 })
      expect(powers[3]).toEqual({ power: 3, value: 8 })
      expect(powers[4]).toEqual({ power: 4, value: 16 })
    })
  })

  describe('formatBinary', () => {
    it('formats 32-bit binary with dots', () => {
      expect(formatBinary('11000000101010000000000100000001')).toBe('11000000.10101000.00000001.00000001')
      expect(formatBinary('11111111111111111111111100000000')).toBe('11111111.11111111.11111111.00000000')
    })

    it('throws error for invalid length', () => {
      expect(() => formatBinary('11000000')).toThrow()
    })
  })

  describe('formatBinaryNibbles', () => {
    it('formats binary into nibbles', () => {
      expect(formatBinaryNibbles('11000000')).toBe('1100 0000')
      expect(formatBinaryNibbles('10101010')).toBe('1010 1010')
      expect(formatBinaryNibbles('11111111')).toBe('1111 1111')
    })
  })

  describe('isPowerOfTwo', () => {
    it('correctly identifies powers of two', () => {
      expect(isPowerOfTwo(1)).toBe(true)
      expect(isPowerOfTwo(2)).toBe(true)
      expect(isPowerOfTwo(4)).toBe(true)
      expect(isPowerOfTwo(8)).toBe(true)
      expect(isPowerOfTwo(16)).toBe(true)
      expect(isPowerOfTwo(32)).toBe(true)
      expect(isPowerOfTwo(64)).toBe(true)
      expect(isPowerOfTwo(128)).toBe(true)
      expect(isPowerOfTwo(256)).toBe(true)
    })

    it('correctly identifies non-powers of two', () => {
      expect(isPowerOfTwo(0)).toBe(false)
      expect(isPowerOfTwo(3)).toBe(false)
      expect(isPowerOfTwo(5)).toBe(false)
      expect(isPowerOfTwo(6)).toBe(false)
      expect(isPowerOfTwo(7)).toBe(false)
      expect(isPowerOfTwo(9)).toBe(false)
      expect(isPowerOfTwo(15)).toBe(false)
      expect(isPowerOfTwo(100)).toBe(false)
    })
  })

  describe('highestPowerOfTwo', () => {
    it('finds highest power of two', () => {
      expect(highestPowerOfTwo(1)).toBe(1)
      expect(highestPowerOfTwo(2)).toBe(2)
      expect(highestPowerOfTwo(3)).toBe(2)
      expect(highestPowerOfTwo(4)).toBe(4)
      expect(highestPowerOfTwo(5)).toBe(4)
      expect(highestPowerOfTwo(100)).toBe(64)
      expect(highestPowerOfTwo(200)).toBe(128)
      expect(highestPowerOfTwo(255)).toBe(128)
    })

    it('handles edge cases', () => {
      expect(highestPowerOfTwo(0)).toBe(0)
      expect(highestPowerOfTwo(-1)).toBe(0)
    })
  })

  describe('isValidBinary', () => {
    it('validates binary strings', () => {
      expect(isValidBinary('0')).toBe(true)
      expect(isValidBinary('1')).toBe(true)
      expect(isValidBinary('01010101')).toBe(true)
      expect(isValidBinary('11111111')).toBe(true)
      expect(isValidBinary('00000000')).toBe(true)
    })

    it('rejects invalid binary strings', () => {
      expect(isValidBinary('2')).toBe(false)
      expect(isValidBinary('abc')).toBe(false)
      expect(isValidBinary('10102')).toBe(false)
      expect(isValidBinary('')).toBe(false)
      expect(isValidBinary('1 0 1 0')).toBe(false)
    })
  })

  describe('isValidIp', () => {
    it('validates correct IP addresses', () => {
      expect(isValidIp('0.0.0.0')).toBe(true)
      expect(isValidIp('255.255.255.255')).toBe(true)
      expect(isValidIp('192.168.1.1')).toBe(true)
      expect(isValidIp('10.0.0.1')).toBe(true)
      expect(isValidIp('172.16.0.1')).toBe(true)
    })

    it('rejects invalid IP addresses', () => {
      expect(isValidIp('256.1.1.1')).toBe(false)
      expect(isValidIp('1.1.1')).toBe(false)
      expect(isValidIp('1.1.1.1.1')).toBe(false)
      expect(isValidIp('abc.def.ghi.jkl')).toBe(false)
      expect(isValidIp('192.168.1.')).toBe(false)
      expect(isValidIp('192.168.1.01')).toBe(false) // Leading zeros
      expect(isValidIp('192.168.-1.1')).toBe(false)
    })
  })
})