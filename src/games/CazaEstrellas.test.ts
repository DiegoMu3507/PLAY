import { describe, it, expect } from 'vitest'
import { computeCazaEstrellasScore } from './CazaEstrellas'

describe('computeCazaEstrellasScore', () => {
  it('otorga el máximo cuando se atrapan todas las estrellas sin errores', () => {
    expect(computeCazaEstrellasScore(6, 0)).toEqual({ score: 6, maxScore: 6, completed: true })
  })

  it('resta un punto por cada error', () => {
    expect(computeCazaEstrellasScore(3, 2)).toEqual({ score: 1, maxScore: 6, completed: false })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeCazaEstrellasScore(2, 5)).toEqual({ score: 0, maxScore: 6, completed: false })
  })
})
