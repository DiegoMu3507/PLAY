// src/games/CambiaDeRegla.test.ts
import { describe, it, expect } from 'vitest'
import { computeCambiaScore } from './CambiaDeRegla'

describe('computeCambiaScore', () => {
  it('resta los errores de perseveración de los aciertos', () => {
    expect(computeCambiaScore(15, 2)).toEqual({ score: 13, maxScore: 18, completed: true })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeCambiaScore(5, 10)).toEqual({ score: 0, maxScore: 18, completed: true })
  })
})
