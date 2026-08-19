import { describe, it, expect } from 'vitest'
import { computeSemaforoScore } from './SemaforoRapido'

describe('computeSemaforoScore', () => {
  it('da el máximo cuando se acierta cada ronda verde sin falsas alarmas', () => {
    expect(computeSemaforoScore(8, 0, 8)).toEqual({ score: 8, maxScore: 8, completed: true })
  })

  it('penaliza el doble por cada click impulsivo en rojo', () => {
    expect(computeSemaforoScore(5, 3, 8)).toEqual({ score: 0, maxScore: 8, completed: true })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeSemaforoScore(1, 10, 8)).toEqual({ score: 0, maxScore: 8, completed: true })
  })
})
