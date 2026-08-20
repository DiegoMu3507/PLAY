import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { GameProps } from '../types/game'

const ROUNDS = 12
const WINDOW_MS = 1200

function buildSequence(): boolean[] {
  return Array.from({ length: ROUNDS }, () => Math.random() < 0.6)
}

export function computeSemaforoScore(hits: number, falseAlarms: number, greenRounds: number) {
  return { score: Math.max(0, hits - falseAlarms * 2), maxScore: greenRounds, completed: true }
}

export default function SemaforoRapido({ onComplete, onExit }: GameProps) {
  const [sequence] = useState(buildSequence)
  const greenRounds = useMemo(() => sequence.filter(Boolean).length, [sequence])
  const [round, setRound] = useState(0)
  const [display, setDisplay] = useState({ hits: 0, falseAlarms: 0 })
  const clickedRef = useRef(false)
  const statsRef = useRef({ hits: 0, falseAlarms: 0 })
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const finish = useCallback((hits: number, falseAlarms: number) => {
    const timeSeconds = Math.round((Date.now() - startedAt.current) / 1000)
    onComplete({ ...computeSemaforoScore(hits, falseAlarms, greenRounds), timeSeconds })
  }, [greenRounds, onComplete])

  useEffect(() => {
    if (round >= ROUNDS) return
    clickedRef.current = false
    const isGreen = sequence[round]
    const timer = setTimeout(() => {
      const hits = statsRef.current.hits + (isGreen && clickedRef.current ? 1 : 0)
      const falseAlarms = statsRef.current.falseAlarms + (!isGreen && clickedRef.current ? 1 : 0)
      statsRef.current = { hits, falseAlarms }
      setDisplay({ hits, falseAlarms })
      if (round + 1 >= ROUNDS) finish(hits, falseAlarms)
      else setRound((r) => r + 1)
    }, WINDOW_MS)
    return () => clearTimeout(timer)
  }, [round, sequence, finish])

  if (round >= ROUNDS) return null
  const isGreen = sequence[round]

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Toca solo cuando esté en verde · Ronda {round + 1}/{ROUNDS}</p>
      <button
        onClick={() => { clickedRef.current = true }}
        className={['w-40 h-40 rounded-full mx-auto block transition-colors', isGreen ? 'bg-calm-500' : 'bg-red-500'].join(' ')}
        aria-label={isGreen ? 'verde' : 'rojo'}
      />
      <p className="text-sm text-gray-400 mt-4">Aciertos: {display.hits} · Impulsivos: {display.falseAlarms}</p>
      <button onClick={onExit} className="mt-4 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
