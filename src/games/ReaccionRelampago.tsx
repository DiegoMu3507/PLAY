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
  const startedAt = useRef(0)
  const readyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const nextRound = useCallback(() => {
    setPhase('waiting')
    const delay = 1000 + Math.random() * 2000
    readyTimerRef.current = setTimeout(() => {
      readyAt.current = Date.now()
      setPhase('ready')
    }, delay)
  }, [])

  useEffect(() => {
    if (round >= ROUNDS) return
    // Scheduling the next round's timers here (not a bigger restructure)
    // keeps this already-twice-patched timing-critical game stable; costs
    // one extra render per round, no correctness impact.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    nextRound()
    return () => {
      if (readyTimerRef.current !== null) clearTimeout(readyTimerRef.current)
    }
  }, [round, nextRound])

  function finishRound(next: number[]) {
    if (next.length >= ROUNDS) {
      const avg = next.reduce((a, b) => a + b, 0) / next.length
      const timeSeconds = Math.round((Date.now() - startedAt.current) / 1000)
      onComplete({ ...computeReaccionScore(avg), timeSeconds })
    } else {
      setRound((r) => r + 1)
    }
  }

  function handleClick() {
    if (phase === 'waiting') {
      if (readyTimerRef.current !== null) clearTimeout(readyTimerRef.current)
      setPhase('tooSoon')
      const next = [...times, PENALTY_MS]
      setTimes(next)
      setTimeout(() => finishRound(next), 600)
      return
    }
    if (phase !== 'ready') return
    const reaction = Date.now() - readyAt.current
    const next = [...times, reaction]
    setTimes(next)
    finishRound(next)
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
