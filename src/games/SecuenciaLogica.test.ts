import { describe, it, expect } from 'vitest'
import { computeSecuenciaScore } from './SecuenciaLogica'

describe('computeSecuenciaScore', () => {
  it('da un punto por cada patrón correcto, sobre 6 rondas', () => {
    expect(computeSecuenciaScore(6)).toEqual({ score: 6, maxScore: 6, completed: true })
  })

  it('siempre marca completado al terminar las rondas, aciertes o no', () => {
    expect(computeSecuenciaScore(0)).toEqual({ score: 0, maxScore: 6, completed: true })
  })
})
