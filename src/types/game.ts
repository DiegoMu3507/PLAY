export type SkillCategory =
  | 'atencion'
  | 'memoria'
  | 'impulsos'
  | 'velocidad'
  | 'planificacion'
  | 'flexibilidad'
  | 'visomotriz'
  | 'lenguaje'
  | 'logica'
  | 'relajacion'

export type AgeRange = '4-6' | '7-9' | '10-12' | '13-16'

export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface GameMeta {
  id: string
  name: string
  emoji: string
  description: string
  ageRange: AgeRange
  ageLabel: 'Exploradores' | 'Aventureros' | 'Descubridores' | 'Pioneros'
  difficulty: Difficulty
  skillCategory: SkillCategory
  skillLabel: string
}

export interface GameResult {
  score: number
  maxScore: number
  timeSeconds: number
  completed: boolean
}

export interface GameProps {
  meta: GameMeta
  onComplete: (result: GameResult) => void
  onExit: () => void
}

export const AGE_LABELS: Record<AgeRange, string> = {
  '4-6':   'Exploradores',
  '7-9':   'Aventureros',
  '10-12': 'Descubridores',
  '13-16': 'Pioneros',
}

export const SKILL_LABELS: Record<SkillCategory, string> = {
  atencion:      'Atención',
  memoria:       'Memoria',
  impulsos:      'Control de impulsos',
  velocidad:     'Velocidad',
  planificacion: 'Planificación',
  flexibilidad:  'Flexibilidad',
  visomotriz:    'Visomotriz',
  lenguaje:      'Lenguaje',
  logica:        'Lógica',
  relajacion:    'Relajación',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  facil:   'Fácil',
  medio:   'Medio',
  dificil: 'Difícil',
}
