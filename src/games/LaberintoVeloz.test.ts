import { describe, it, expect } from 'vitest'
import { computeLaberintoScore } from './LaberintoVeloz'

describe('computeLaberintoScore', () => {
  it('puntúa el tiempo restante cuando se llega a la meta', () => {
    expect(computeLaberintoScore(20, true)).toEqual({ score: 20, maxScore: 45, completed: true })
  })

  it('da cero si se acaba el tiempo sin llegar', () => {
    expect(computeLaberintoScore(0, false)).toEqual({ score: 0, maxScore: 45, completed: false })
  })
})
