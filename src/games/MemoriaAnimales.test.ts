import { describe, it, expect } from 'vitest'
import { computeMemoriaScore } from './MemoriaAnimales'

describe('computeMemoriaScore', () => {
  it('da el puntaje máximo con el mínimo de intentos posible', () => {
    expect(computeMemoriaScore(6, 6)).toEqual({ score: 60, maxScore: 60, completed: true })
  })

  it('penaliza 2 puntos por cada intento extra', () => {
    expect(computeMemoriaScore(6, 10)).toEqual({ score: 52, maxScore: 60, completed: true })
  })

  it('no está completo si faltan parejas', () => {
    expect(computeMemoriaScore(3, 5)).toEqual({ score: 56, maxScore: 60, completed: false })
  })
})
