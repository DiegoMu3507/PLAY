import { describe, it, expect } from 'vitest'
import { computeOrganizaScore } from './OrganizaTuDia'

describe('computeOrganizaScore', () => {
  it('da el máximo cuando el orden respeta todas las restricciones', () => {
    const result = computeOrganizaScore(['despertar', 'desayuno', 'mochila', 'escuela', 'tarea', 'cena'])
    expect(result).toEqual({ score: 5, maxScore: 5, completed: true })
  })

  it('da cero cuando el orden está completamente invertido', () => {
    const result = computeOrganizaScore(['cena', 'tarea', 'escuela', 'mochila', 'desayuno', 'despertar'])
    expect(result).toEqual({ score: 0, maxScore: 5, completed: true })
  })
})
