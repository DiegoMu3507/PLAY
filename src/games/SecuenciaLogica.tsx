import { useState, useCallback } from 'react'
import type { GameProps } from '../types/game'

const ROUNDS = 6

export function computeSecuenciaScore(correct: number) {
  return { score: correct, maxScore: ROUNDS, completed: true }
}

function buildRound() {
  const start = 1 + Math.floor(Math.random() * 5)
  const step = 1 + Math.floor(Math.random() * 4)
  const sequence = Array.from({ length: 4 }, (_, i) => start + i * step)
  const answer = start + 4 * step
  const options = new Set([answer, answer + step, Math.max(1, answer - step)])
  let extra = 1
  while (options.size < 3) options.add(answer + step * (2 + extra++))
  const shuffled = Array.from(options).sort(() => Math.random() - 0.5)
  return { sequence, answer, options: shuffled }
}

export default function SecuenciaLogica({ onComplete, onExit }: GameProps) {
  const [round, setRound] = useState(0)
  const [current, setCurrent] = useState(buildRound)
  const [correct, setCorrect] = useState(0)
  const [startedAt] = useState(() => Date.now())

  const finish = useCallback((finalCorrect: number) => {
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
    onComplete({ ...computeSecuenciaScore(finalCorrect), timeSeconds })
  }, [onComplete, startedAt])

  function handleAnswer(value: number) {
    const nextCorrect = correct + (value === current.answer ? 1 : 0)
    setCorrect(nextCorrect)
    if (round + 1 >= ROUNDS) {
      finish(nextCorrect)
    } else {
      setRound((r) => r + 1)
      setCurrent(buildRound())
    }
  }

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Ronda {round + 1}/{ROUNDS} · ¿Qué número sigue?</p>
      <p className="text-2xl font-bold text-gray-800 mb-6">{current.sequence.join(', ')}, ?</p>
      <div className="flex justify-center gap-3">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="px-5 py-3 rounded-xl bg-primary-100 text-primary-700 font-bold text-lg hover:bg-primary-200"
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={onExit} className="mt-6 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
