import { describe, it, expect } from 'vitest'
import { computeReaccionScore } from './ReaccionRelampago'

describe('computeReaccionScore', () => {
  it('da un puntaje alto para reacciones rápidas', () => {
    expect(computeReaccionScore(50)).toEqual({ score: 95, maxScore: 100, completed: true })
  })

  it('da un puntaje medio para reacciones promedio', () => {
    expect(computeReaccionScore(300)).toEqual({ score: 70, maxScore: 100, completed: true })
  })

  it('nunca baja de cero para reacciones muy lentas', () => {
    expect(computeReaccionScore(1500)).toEqual({ score: 0, maxScore: 100, completed: true })
  })
})
