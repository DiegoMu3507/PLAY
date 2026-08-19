import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameProps } from '../types/game'

const ROUNDS = 5
const PENALTY_MS = 1500

export function computeReaccionScore(avgMs: number) {
  return { score: Math.max(0, Math.min(100, 100 - Math.round(avgMs / 10))), maxScore: 100, completed: true }
}

type Phase = 'waiting' | 'ready' | 'tooSoon'

export default function ReaccionRelampago({ onComplete, onExit }: GameProps) {
  const [round, setRound] = useState(0)
  const [phase, setPhase] = useState<Phase>('waiting')
  const [times, setTimes] = useState<number[]>([])
  const readyAt = useRef(0)
  const startedAt = useRef(Date.now())

  const nextRound = useCallback(() => {
    setPhase('waiting')
    const delay = 1000 + Math.random() * 2000
    const timer = setTimeout(() => {
      readyAt.current = Date.now()
      setPhase('ready')
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (round >= ROUNDS) return
    return nextRound()
  }, [round, nextRound])

  function handleClick() {
    if (phase === 'waiting') {
      setPhase('tooSoon')
      setTimes((prev) => [...prev, PENALTY_MS])
      setTimeout(() => setRound((r) => r + 1), 600)
      return
    }
    if (phase !== 'ready') return
    const reaction = Date.now() - readyAt.current
    const next = [...times, reaction]
    setTimes(next)
    if (next.length >= ROUNDS) {
      const avg = next.reduce((a, b) => a + b, 0) / next.length
      const timeSeconds = Math.round((Date.now() - startedAt.current) / 1000)
      onComplete({ ...computeReaccionScore(avg), timeSeconds })
    } else {
      setRound((r) => r + 1)
    }
  }

  if (round >= ROUNDS) return null

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Ronda {round + 1}/{ROUNDS} · Toca en cuanto veas verde</p>
      <button
        onClick={handleClick}
        className={['w-full h-48 rounded-2xl text-white font-bold text-lg', phase === 'ready' ? 'bg-calm-500' : phase === 'tooSoon' ? 'bg-red-400' : 'bg-gray-300'].join(' ')}
      >
        {phase === 'ready' ? '¡YA!' : phase === 'tooSoon' ? 'Muy pronto' : 'Espera...'}
      </button>
      <button onClick={onExit} className="mt-4 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
