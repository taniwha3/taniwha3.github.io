import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Progress from './Progress'
import { ProgressProvider } from '../contexts/ProgressContext'

// Mock curriculum data
vi.mock('../data/curriculum', () => ({
  modules: [
    { id: 0, title: 'Module 0', topics: ['Topic 1'] },
    { id: 1, title: 'Module 1', topics: ['Topic 2'] }
  ]
}))

describe('Progress Page', () => {
  it('renders progress overview', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <Progress />
        </ProgressProvider>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Your Learning Progress')).toBeInTheDocument()
    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
    expect(screen.getByText('Module Progress')).toBeInTheDocument()
  })

  it('shows action buttons', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <Progress />
        </ProgressProvider>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Export Progress')).toBeInTheDocument()
    expect(screen.getByText('Import Progress')).toBeInTheDocument()
    expect(screen.getByText('Reset All Progress')).toBeInTheDocument()
  })
})