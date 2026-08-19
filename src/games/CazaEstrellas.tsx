import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { GameProps } from '../types/game'

const SHAPES = ['⭐', '🔵', '🔺', '🟩', '🟣']
const GRID_SIZE = 16
const STAR_COUNT = 6
const DURATION_SECONDS = 20

function buildGrid(): string[] {
  const stars = Array(STAR_COUNT).fill('⭐')
  const others = Array(GRID_SIZE - STAR_COUNT)
    .fill(null)
    .map(() => SHAPES[1 + Math.floor(Math.random() * (SHAPES.length - 1))])
  const grid = [...stars, ...others]
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[grid[i], grid[j]] = [grid[j], grid[i]]
  }
  return grid
}

export function computeCazaEstrellasScore(hits: number, misses: number) {
  return { score: Math.max(0, hits - misses), maxScore: STAR_COUNT, completed: hits >= STAR_COUNT }
}

export default function CazaEstrellas({ onComplete, onExit }: GameProps) {
  const [grid] = useState(buildGrid)
  const [cleared, setCleared] = useState<Set<number>>(new Set())
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(DURATION_SECONDS)
  const [startedAt] = useState(Date.now())
  const [finished, setFinished] = useState(false)

  const finish = useCallback((finalHits: number, finalMisses: number) => {
    setFinished(true)
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
    onComplete({ ...computeCazaEstrellasScore(finalHits, finalMisses), timeSeconds })
  }, [onComplete, startedAt])

  useEffect(() => {
    if (finished) return
    if (secondsLeft <= 0) { finish(hits, misses); return }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft, finished, finish, hits, misses])

  function handleClick(index: number) {
    if (finished || cleared.has(index)) return
    setCleared((prev) => new Set(prev).add(index))
    if (grid[index] === '⭐') {
      const nextHits = hits + 1
      setHits(nextHits)
      if (nextHits >= STAR_COUNT) finish(nextHits, misses)
    } else {
      setMisses((m) => m + 1)
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-sm text-gray-500 mb-2">Toca solo las estrellas ⭐ — {secondsLeft}s</p>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {grid.map((shape, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(i)}
            disabled={cleared.has(i)}
            className="text-3xl aspect-square rounded-xl bg-gray-50 border border-gray-100 disabled:opacity-30"
          >
            {shape}
          </motion.button>
        ))}
      </div>
      <p className="text-sm text-gray-400">Aciertos: {hits} / {STAR_COUNT} · Errores: {misses}</p>
      <button onClick={onExit} className="mt-4 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
