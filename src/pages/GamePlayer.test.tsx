import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import type { GameProps } from '../types/game'

vi.mock('../games/registry', async () => {
  const actual = await vi.importActual<typeof import('../games/registry')>('../games/registry')
  function FakeGame({ onComplete }: GameProps) {
    return (
      <button onClick={() => onComplete({ score: 5, maxScore: 10, timeSeconds: 3, completed: true })}>
        Completar
      </button>
    )
  }
  return {
    ...actual,
    GAME_COMPONENTS: { ...actual.GAME_COMPONENTS, 'caza-estrellas': FakeGame },
  }
})

import GamePlayer from './GamePlayer'
import { useProgressStore } from '../store/progressStore'

function renderPlayer(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/juegos/${id}`]}>
      <Routes>
        <Route path="/juegos/:id" element={<GamePlayer />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('GamePlayer', () => {
  beforeEach(() => {
    useProgressStore.setState({ local: {}, pendingSync: false })
  })

  it('muestra la página de no encontrado si el id no existe', () => {
    renderPlayer('juego-inexistente')
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('muestra "próximamente" si el juego no tiene componente', () => {
    renderPlayer('burbujas-de-colores')
    expect(screen.getByText(/próximamente/i)).toBeInTheDocument()
  })

  it('guarda el resultado en progressStore y muestra la pantalla de resultado al completar', async () => {
    renderPlayer('caza-estrellas')
    await userEvent.click(await screen.findByText('Completar'))
    expect(useProgressStore.getState().local['caza-estrellas']).toMatchObject({ bestScore: 5, timesPlayed: 1 })
    expect(screen.getByText(/puntaje: 5 \/ 10/i)).toBeInTheDocument()
  })
})
