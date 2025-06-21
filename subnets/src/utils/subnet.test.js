import { describe, it, expect } from 'vitest'
import {
  cidrToMask,
  maskToCidr,
  calculateHosts,
  calculateUsableHosts,
  getSubnetInfo,
  calculateSubnets,
  isIpInSubnet,
  findSubnetForIp,
  calculateVLSM,
  summarizeNetworks,
  getMaskReference,
  isValidCidr,
  parseCidr
} from './subnet'

describe('Subnet Utilities', () => {
  describe('cidrToMask', () => {
    it('converts CIDR prefix to subnet mask', () => {
      expect(cidrToMask(0)).toBe('0.0.0.0')
      expect(cidrToMask(8)).toBe('255.0.0.0')
      expect(cidrToMask(16)).toBe('255.255.0.0')
      expect(cidrToMask(24)).toBe('255.255.255.0')
      expect(cidrToMask(25)).toBe('255.255.255.128')
      expect(cidrToMask(26)).toBe('255.255.255.192')
      expect(cidrToMask(27)).toBe('255.255.255.224')
      expect(cidrToMask(28)).toBe('255.255.255.240')
      expect(cidrToMask(29)).toBe('255.255.255.248')
      expect(cidrToMask(30)).toBe('255.255.255.252')
      expect(cidrToMask(31)).toBe('255.255.255.254')
      expect(cidrToMask(32)).toBe('255.255.255.255')
    })

    it('throws error for invalid prefix', () => {
      expect(() => cidrToMask(-1)).toThrow()
      expect(() => cidrToMask(33)).toThrow()
      expect(() => cidrToMask(1.5)).toThrow()
      expect(() => cidrToMask('24')).toThrow()
    })
  })

  describe('maskToCidr', () => {
    it('converts subnet mask to CIDR prefix', () => {
      expect(maskToCidr('0.0.0.0')).toBe(0)
      expect(maskToCidr('255.0.0.0')).toBe(8)
      expect(maskToCidr('255.255.0.0')).toBe(16)
      expect(maskToCidr('255.255.255.0')).toBe(24)
      expect(maskToCidr('255.255.255.128')).toBe(25)
      expect(maskToCidr('255.255.255.192')).toBe(26)
      expect(maskToCidr('255.255.255.224')).toBe(27)
      expect(maskToCidr('255.255.255.240')).toBe(28)
      expect(maskToCidr('255.255.255.248')).toBe(29)
      expect(maskToCidr('255.255.255.252')).toBe(30)
      expect(maskToCidr('255.255.255.254')).toBe(31)
      expect(maskToCidr('255.255.255.255')).toBe(32)
    })

    it('throws error for invalid mask', () => {
      expect(() => maskToCidr('255.255.255.256')).toThrow()
      expect(() => maskToCidr('255.255.255')).toThrow()
      expect(() => maskToCidr('255.0.255.0')).toThrow() // Non-contiguous
    })
  })

  describe('calculateHosts', () => {
    it('calculates total hosts correctly', () => {
      expect(calculateHosts(24)).toBe(256)
      expect(calculateHosts(25)).toBe(128)
      expect(calculateHosts(26)).toBe(64)
      expect(calculateHosts(27)).toBe(32)
      expect(calculateHosts(28)).toBe(16)
      expect(calculateHosts(29)).toBe(8)
      expect(calculateHosts(30)).toBe(4)
      expect(calculateHosts(31)).toBe(2)
      expect(calculateHosts(32)).toBe(1)
      expect(calculateHosts(16)).toBe(65536)
      expect(calculateHosts(8)).toBe(16777216)
    })

    it('throws error for invalid prefix', () => {
      expect(() => calculateHosts(-1)).toThrow()
      expect(() => calculateHosts(33)).toThrow()
    })
  })

  describe('calculateUsableHosts', () => {
    it('calculates usable hosts correctly', () => {
      expect(calculateUsableHosts(24)).toBe(254)
      expect(calculateUsableHosts(25)).toBe(126)
      expect(calculateUsableHosts(26)).toBe(62)
      expect(calculateUsableHosts(27)).toBe(30)
      expect(calculateUsableHosts(28)).toBe(14)
      expect(calculateUsableHosts(29)).toBe(6)
      expect(calculateUsableHosts(30)).toBe(2)
      expect(calculateUsableHosts(31)).toBe(2) // Special case
      expect(calculateUsableHosts(32)).toBe(1) // Special case
    })
  })

  describe('getSubnetInfo', () => {
    it('calculates subnet information correctly', () => {
      const info = getSubnetInfo('192.168.1.100', 24)
      expect(info.network).toBe('192.168.1.0')
      expect(info.broadcast).toBe('192.168.1.255')
      expect(info.firstHost).toBe('192.168.1.1')
      expect(info.lastHost).toBe('192.168.1.254')
      expect(info.mask).toBe('255.255.255.0')
      expect(info.prefix).toBe(24)
      expect(info.totalHosts).toBe(256)
      expect(info.usableHosts).toBe(254)
    })

    it('handles /32 host route', () => {
      const info = getSubnetInfo('10.0.0.1', 32)
      expect(info.network).toBe('10.0.0.1')
      expect(info.broadcast).toBe('10.0.0.1')
      expect(info.firstHost).toBe('10.0.0.1')
      expect(info.lastHost).toBe('10.0.0.1')
      expect(info.usableHosts).toBe(1)
    })

    it('handles /31 point-to-point', () => {
      const info = getSubnetInfo('10.0.0.0', 31)
      expect(info.network).toBe('10.0.0.0')
      expect(info.broadcast).toBe('10.0.0.1')
      expect(info.firstHost).toBe('10.0.0.0')
      expect(info.lastHost).toBe('10.0.0.1')
      expect(info.usableHosts).toBe(2)
    })

    it('throws error for invalid IP', () => {
      expect(() => getSubnetInfo('192.168.1.256', 24)).toThrow()
    })
  })

  describe('calculateSubnets', () => {
    it('divides network into subnets correctly', () => {
      const subnets = calculateSubnets('192.168.1.0', 24, 26)
      expect(subnets).toHaveLength(4)
      expect(subnets[0].network).toBe('192.168.1.0')
      expect(subnets[1].network).toBe('192.168.1.64')
      expect(subnets[2].network).toBe('192.168.1.128')
      expect(subnets[3].network).toBe('192.168.1.192')
      
      subnets.forEach(subnet => {
        expect(subnet.prefix).toBe(26)
        expect(subnet.usableHosts).toBe(62)
      })
    })

    it('handles large subnet divisions', () => {
      const subnets = calculateSubnets('10.0.0.0', 16, 24)
      expect(subnets).toHaveLength(256)
      expect(subnets[0].network).toBe('10.0.0.0')
      expect(subnets[255].network).toBe('10.0.255.0')
    })

    it('throws error for invalid prefix combination', () => {
      expect(() => calculateSubnets('192.168.1.0', 24, 24)).toThrow()
      expect(() => calculateSubnets('192.168.1.0', 24, 23)).toThrow()
    })
  })

  describe('isIpInSubnet', () => {
    it('correctly identifies IPs in subnet', () => {
      expect(isIpInSubnet('192.168.1.100', '192.168.1.0', 24)).toBe(true)
      expect(isIpInSubnet('192.168.1.255', '192.168.1.0', 24)).toBe(true)
      expect(isIpInSubnet('192.168.2.1', '192.168.1.0', 24)).toBe(false)
      expect(isIpInSubnet('10.0.0.1', '10.0.0.0', 8)).toBe(true)
      expect(isIpInSubnet('10.255.255.255', '10.0.0.0', 8)).toBe(true)
      expect(isIpInSubnet('11.0.0.1', '10.0.0.0', 8)).toBe(false)
    })

    it('handles invalid IPs gracefully', () => {
      expect(isIpInSubnet('invalid', '192.168.1.0', 24)).toBe(false)
      expect(isIpInSubnet('192.168.1.1', 'invalid', 24)).toBe(false)
    })
  })

  describe('findSubnetForIp', () => {
    it('finds correct subnet for IP', () => {
      const subnets = calculateSubnets('192.168.1.0', 24, 26)
      
      const subnet1 = findSubnetForIp('192.168.1.50', subnets)
      expect(subnet1?.network).toBe('192.168.1.0')
      
      const subnet2 = findSubnetForIp('192.168.1.100', subnets)
      expect(subnet2?.network).toBe('192.168.1.64')
      
      const subnet3 = findSubnetForIp('192.168.1.200', subnets)
      expect(subnet3?.network).toBe('192.168.1.192')
      
      const subnet4 = findSubnetForIp('192.168.2.1', subnets)
      expect(subnet4).toBeNull()
    })
  })

  describe('calculateVLSM', () => {
    it('allocates subnets efficiently', () => {
      const requirements = [
        { name: 'Sales', hosts: 60 },
        { name: 'Engineering', hosts: 30 },
        { name: 'Management', hosts: 12 },
        { name: 'Servers', hosts: 6 }
      ]
      
      const allocations = calculateVLSM('192.168.10.0', 24, requirements)
      
      expect(allocations).toHaveLength(4)
      expect(allocations[0].name).toBe('Sales')
      expect(allocations[0].network).toBe('192.168.10.0')
      expect(allocations[0].prefix).toBe(26)
      expect(allocations[0].usableHosts).toBe(62)
      
      expect(allocations[1].name).toBe('Engineering')
      expect(allocations[1].network).toBe('192.168.10.64')
      expect(allocations[1].prefix).toBe(27)
      expect(allocations[1].usableHosts).toBe(30)
      
      expect(allocations[2].name).toBe('Management')
      expect(allocations[2].network).toBe('192.168.10.96')
      expect(allocations[2].prefix).toBe(28)
      expect(allocations[2].usableHosts).toBe(14)
      
      expect(allocations[3].name).toBe('Servers')
      expect(allocations[3].network).toBe('192.168.10.112')
      expect(allocations[3].prefix).toBe(29)
      expect(allocations[3].usableHosts).toBe(6)
    })

    it('throws error for insufficient space', () => {
      const requirements = [
        { name: 'Large Network', hosts: 300 }
      ]
      
      expect(() => calculateVLSM('192.168.1.0', 24, requirements)).toThrow()
    })
  })

  describe('summarizeNetworks', () => {
    it('summarizes contiguous networks', () => {
      const networks = [
        { network: '192.168.0.0', prefix: 24 },
        { network: '192.168.1.0', prefix: 24 },
        { network: '192.168.2.0', prefix: 24 },
        { network: '192.168.3.0', prefix: 24 }
      ]
      
      const summary = summarizeNetworks(networks)
      expect(summary.network).toBe('192.168.0.0')
      expect(summary.prefix).toBe(22)
    })

    it('handles single network', () => {
      const networks = [{ network: '10.0.0.0', prefix: 8 }]
      const summary = summarizeNetworks(networks)
      expect(summary).toEqual(networks[0])
    })

    it('throws error for empty array', () => {
      expect(() => summarizeNetworks([])).toThrow()
    })
  })

  describe('getMaskReference', () => {
    it('generates complete mask reference', () => {
      const masks = getMaskReference()
      expect(masks).toHaveLength(33)
      
      expect(masks[0]).toEqual({
        prefix: 0,
        mask: '0.0.0.0',
        hostBits: 32,
        totalHosts: 4294967296,
        usableHosts: 4294967294
      })
      
      expect(masks[24]).toEqual({
        prefix: 24,
        mask: '255.255.255.0',
        hostBits: 8,
        totalHosts: 256,
        usableHosts: 254
      })
      
      expect(masks[32]).toEqual({
        prefix: 32,
        mask: '255.255.255.255',
        hostBits: 0,
        totalHosts: 1,
        usableHosts: 1
      })
    })
  })

  describe('isValidCidr', () => {
    it('validates correct CIDR notation', () => {
      expect(isValidCidr('192.168.1.0/24')).toBe(true)
      expect(isValidCidr('10.0.0.0/8')).toBe(true)
      expect(isValidCidr('172.16.0.0/12')).toBe(true)
      expect(isValidCidr('0.0.0.0/0')).toBe(true)
      expect(isValidCidr('255.255.255.255/32')).toBe(true)
    })

    it('rejects invalid CIDR notation', () => {
      expect(isValidCidr('192.168.1.0')).toBe(false)
      expect(isValidCidr('192.168.1.0/')).toBe(false)
      expect(isValidCidr('192.168.1.0/33')).toBe(false)
      expect(isValidCidr('192.168.1.0/-1')).toBe(false)
      expect(isValidCidr('192.168.1.256/24')).toBe(false)
      expect(isValidCidr('192.168.1.0/24/25')).toBe(false)
    })
  })

  describe('parseCidr', () => {
    it('parses valid CIDR notation', () => {
      expect(parseCidr('192.168.1.0/24')).toEqual({
        ip: '192.168.1.0',
        prefix: 24
      })
      
      expect(parseCidr('10.0.0.0/8')).toEqual({
        ip: '10.0.0.0',
        prefix: 8
      })
    })

    it('throws error for invalid CIDR', () => {
      expect(() => parseCidr('192.168.1.0')).toThrow()
      expect(() => parseCidr('invalid/24')).toThrow()
    })
  })
})