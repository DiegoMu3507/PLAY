import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { GameCard } from './GameCard'
import type { GameMeta } from '../../types/game'

const mockGame: GameMeta = {
  id: 'caza-estrellas',
  name: 'Caza Estrellas',
  emoji: '⭐',
  description: 'Toca solo las estrellas antes de que desaparezcan.',
  ageRange: '4-6',
  ageLabel: 'Exploradores',
  difficulty: 'facil',
  skillCategory: 'atencion',
  skillLabel: 'Atención',
}

describe('GameCard', () => {
  it('muestra el emoji, nombre y descripción', () => {
    render(<GameCard game={mockGame} playable />)
    expect(screen.getByText('⭐')).toBeInTheDocument()
    expect(screen.getByText('Caza Estrellas')).toBeInTheDocument()
    expect(screen.getByText('Toca solo las estrellas antes de que desaparezcan.')).toBeInTheDocument()
  })

  it('muestra el badge "Próximamente" cuando playable es false', () => {
    render(<GameCard game={mockGame} playable={false} />)
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
  })

  it('no muestra "Próximamente" cuando playable es true', () => {
    render(<GameCard game={mockGame} playable />)
    expect(screen.queryByText('Próximamente')).not.toBeInTheDocument()
  })

  it('llama onClick al hacer clic cuando es jugable', async () => {
    const onClick = vi.fn()
    render(<GameCard game={mockGame} playable onClick={onClick} />)
    await userEvent.click(screen.getByRole('article'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('no llama onClick al hacer clic cuando no es jugable', async () => {
    const onClick = vi.fn()
    render(<GameCard game={mockGame} playable={false} onClick={onClick} />)
    await userEvent.click(screen.getByRole('article'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
