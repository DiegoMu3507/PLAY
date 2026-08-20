// src/games/registry.test.ts
import { describe, it, expect } from 'vitest'
import { GAMES, GAME_COMPONENTS } from './registry'

describe('game registry', () => {
  it('tiene exactamente 50 juegos', () => {
    expect(GAMES).toHaveLength(50)
  })

  it('todos los ids son únicos', () => {
    const ids = GAMES.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('tiene exactamente 8 juegos jugables', () => {
    expect(Object.keys(GAME_COMPONENTS)).toHaveLength(8)
  })

  it('toda key de GAME_COMPONENTS corresponde a un id existente en GAMES', () => {
    const ids = new Set(GAMES.map((g) => g.id))
    for (const key of Object.keys(GAME_COMPONENTS)) {
      expect(ids.has(key)).toBe(true)
    }
  })
})
