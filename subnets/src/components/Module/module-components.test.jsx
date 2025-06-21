import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import ModulePractice from './ModulePractice'
import ModuleContent from './ModuleContent'
import { ProgressProvider } from '../../contexts/ProgressContext'

// Mock the moduleContent data
vi.mock('../../data/moduleContent', () => ({
  getModuleContent: vi.fn((id) => ({
    title: 'Test Module',
    sections: [
      {
        type: 'introduction',
        title: 'Intro',
        content: 'This is a test introduction.'
      }
    ]
  })),
  hasModuleContent: vi.fn(() => true)
}))

// Mock data - matches expected structure from ModulePractice
const mockPractice = {
  title: 'Test Practice',
  exercises: [
    {
      type: 'decimal-to-binary',
      problems: [
        {
          decimal: 192,
          binary: '11000000'
        }
      ]
    }
  ]
}


describe('Module Components', () => {
  describe('ModulePractice', () => {
    it('renders practice exercises', () => {
      render(<ModulePractice exercises={mockPractice} moduleId={1} />)
      
      expect(screen.getByText('Test Practice')).toBeInTheDocument()
      expect(screen.getByText('Exercise 1 of 1')).toBeInTheDocument()
      expect(screen.getByText('Convert Decimal to Binary')).toBeInTheDocument()
      expect(screen.getByText('192')).toBeInTheDocument()
    })

    it('checks answers correctly', async () => {
      const user = userEvent.setup()
      render(<ModulePractice exercises={mockPractice} moduleId={1} />)
      
      const input = screen.getByPlaceholderText('Binary (8 bits)')
      await user.type(input, '11000000')
      await user.click(screen.getByText('Check'))
      
      expect(screen.getByText('✓ Correct!')).toBeInTheDocument()
    })
  })

  describe('ModuleContent', () => {
    it('renders module content sections', () => {
      const mockModule = { id: 1, title: 'Test Module' }
      
      render(
        <BrowserRouter>
          <ProgressProvider>
            <ModuleContent module={mockModule} />
          </ProgressProvider>
        </BrowserRouter>
      )
      
      expect(screen.getByText('Intro')).toBeInTheDocument()
      expect(screen.getByText('This is a test introduction.')).toBeInTheDocument()
    })
  })
})