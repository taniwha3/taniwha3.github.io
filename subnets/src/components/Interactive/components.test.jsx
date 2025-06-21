import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import BinaryConverter from './BinaryConverter'
import NetworkCalculator from './NetworkCalculator'
import AndVisualizer from './AndVisualizer'

describe('Interactive Components', () => {
  describe('BinaryConverter', () => {
    it('renders and converts decimal to binary', async () => {
      const user = userEvent.setup()
      render(<BinaryConverter />)
      
      const input = screen.getByPlaceholderText('Enter decimal (0-255)')
      await user.type(input, '192')
      
      expect(screen.getByText('11000000')).toBeInTheDocument()
    })
  })

  describe('NetworkCalculator', () => {
    it('renders and calculates network details', async () => {
      const user = userEvent.setup()
      render(<NetworkCalculator />)
      
      expect(screen.getByText('Network Calculator')).toBeInTheDocument()
      
      const ipInput = screen.getByPlaceholderText('192.168.1.100')
      const cidrInput = screen.getByRole('spinbutton')
      
      await user.clear(ipInput)
      await user.type(ipInput, '10.0.0.100')
      await user.clear(cidrInput)
      await user.type(cidrInput, '16')
      await user.click(screen.getByText('Calculate'))
      
      expect(screen.getByText('Results')).toBeInTheDocument()
    })
  })

  describe('AndVisualizer', () => {
    it('renders and performs AND operation', () => {
      render(<AndVisualizer />)
      
      expect(screen.getByText('AND Operation Visualizer')).toBeInTheDocument()
      // Check for input labels
      expect(screen.getByText('First Binary Number:')).toBeInTheDocument()
      expect(screen.getByText('Second Binary Number:')).toBeInTheDocument()
      // Result should be displayed
      expect(screen.getByText(/Result:/)).toBeInTheDocument()
    })
  })
})