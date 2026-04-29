import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renderiza el texto', () => {
    render(<Badge>Fácil</Badge>)
    expect(screen.getByText('Fácil')).toBeInTheDocument()
  })

  it('aplica variante age-4-6', () => {
    render(<Badge variant="age-4-6">Exploradores</Badge>)
    const badge = screen.getByText('Exploradores')
    expect(badge.className).toContain('bg-blue')
  })
})
