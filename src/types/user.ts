import type { SkillCategory } from './game'

export interface UserProfile {
  id: string
  email: string
  name: string
  type: 'parent' | 'child'
  created_at: string
}

export interface ChildProfile {
  id: string
  parent_id: string
  name: string
  birth_year: number
  avatar: string
}

export interface GameSession {
  id: string
  user_id: string
  game_id: string
  score: number
  duration_seconds: number
  completed: boolean
  played_at: string
}

export interface GameProgress {
  user_id: string
  game_id: string
  best_score: number
  times_played: number
  skill_category: SkillCategory
  updated_at: string
}

export interface Achievement {
  id: string
  user_id: string
  achievement_key: string
  unlocked_at: string
}

export const ACHIEVEMENT_DEFINITIONS: Record<string, { label: string; emoji: string; description: string }> = {
  first_game:          { label: 'Primera aventura',    emoji: '🎮', description: 'Jugaste tu primer juego' },
  streak_3:            { label: 'En racha',             emoji: '🔥', description: '3 días jugando seguidos' },
  streak_7:            { label: 'Semana perfecta',      emoji: '⭐', description: '7 días jugando seguidos' },
  category_atencion:   { label: 'Mente enfocada',       emoji: '🎯', description: 'Completaste todos los juegos de Atención' },
  category_memoria:    { label: 'Memoria de elefante',  emoji: '🐘', description: 'Completaste todos los juegos de Memoria' },
  category_impulsos:   { label: 'Capitán calma',        emoji: '🧘', description: 'Completaste todos los juegos de Control de impulsos' },
  category_relajacion: { label: 'Mente tranquila',      emoji: '🌿', description: 'Completaste todos los juegos de Relajación' },
  score_100:           { label: 'Puntuación perfecta',  emoji: '💯', description: 'Obtuviste 100 puntos en un juego' },
  play_10:             { label: 'Jugador frecuente',    emoji: '🏅', description: 'Jugaste 10 veces' },
  play_50:             { label: 'Experto en juegos',    emoji: '🏆', description: 'Jugaste 50 veces' },
  all_easy:            { label: 'Base sólida',          emoji: '🌟', description: 'Completaste todos los juegos fáciles' },
  all_medium:          { label: 'Subiendo de nivel',    emoji: '🚀', description: 'Completaste todos los juegos medios' },
  all_hard:            { label: 'Maestro TDAH',         emoji: '👑', description: 'Completaste todos los juegos difíciles' },
  explorer:            { label: 'Explorador',           emoji: '🗺️', description: 'Jugaste un juego de cada categoría' },
  speed_demon:         { label: 'Rayo de velocidad',    emoji: '⚡', description: 'Completaste un juego en menos de 30 segundos' },
  comeback:            { label: 'No me rindo',          emoji: '💪', description: 'Jugaste de nuevo después de 3 días sin jugar' },
  night_owl:           { label: 'Búho nocturno',        emoji: '🦉', description: 'Jugaste después de las 9pm' },
  early_bird:          { label: 'Madrugador',           emoji: '🌅', description: 'Jugaste antes de las 8am' },
  family_star:         { label: 'Estrella familiar',    emoji: '👨‍👩‍👧', description: 'Tienes 3 perfiles de hijos activos' },
  marathon:            { label: 'Maratón mental',       emoji: '🏃', description: 'Jugaste por más de 30 minutos en un día' },
}
