// src/pages/GamesPage.tsx
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GAMES, GAME_COMPONENTS } from '../games/registry'
import type { AgeRange, SkillCategory } from '../types/game'
import { GameCard } from '../components/games/GameCard'
import { GameFilters } from '../components/games/GameFilters'

export default function GamesPage() {
  const navigate = useNavigate()
  const [age, setAge] = useState<AgeRange | 'all'>('all')
  const [skill, setSkill] = useState<SkillCategory | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return GAMES.filter((g) => {
      const matchAge = age === 'all' || g.ageRange === age
      const matchSkill = skill === 'all' || g.skillCategory === skill
      const matchSearch = !q || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
      return matchAge && matchSkill && matchSearch
    })
  }, [age, skill, search])

  const ageCounts = useMemo(() => {
    const base: Record<AgeRange | 'all', number> = { all: GAMES.length, '4-6': 0, '7-9': 0, '10-12': 0, '13-16': 0 }
    GAMES.forEach((g) => { base[g.ageRange]++ })
    return base
  }, [])

  const skillCounts = useMemo(() => {
    const base: Record<SkillCategory | 'all', number> = {
      all: GAMES.length, atencion: 0, memoria: 0, impulsos: 0, velocidad: 0,
      planificacion: 0, flexibilidad: 0, visomotriz: 0, lenguaje: 0, logica: 0, relajacion: 0,
    }
    GAMES.forEach((g) => { base[g.skillCategory]++ })
    return base
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-5xl block mb-3">🎮</span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Juegos para mente enfocada</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {GAMES.length} juegos diseñados para mejorar atención, memoria, control de impulsos y más.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white text-sm"
          />
        </div>
      </div>

      <div className="mb-8">
        <GameFilters
          selectedAge={age} selectedSkill={skill}
          onAgeChange={setAge} onSkillChange={setSkill}
          ageCounts={ageCounts} skillCounts={skillCounts}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="text-5xl block mb-3">🔍</span>
          <p>No se encontraron juegos con esos filtros.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((game) => {
            const playable = game.id in GAME_COMPONENTS
            return (
              <motion.div key={game.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GameCard game={game} playable={playable} onClick={() => playable && navigate(`/juegos/${game.id}`)} />
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
