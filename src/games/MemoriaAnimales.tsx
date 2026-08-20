import { useCallback, useState } from 'react'
import type { GameProps } from '../types/game'

const ANIMALS = ['🐶', '🐱', '🐰', '🦊', '🐼', '🦁']
const TOTAL_PAIRS = ANIMALS.length

function buildDeck(): string[] {
  const deck = [...ANIMALS, ...ANIMALS]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function computeMemoriaScore(matchedPairs: number, attempts: number) {
  const maxScore = TOTAL_PAIRS * 10
  const score = Math.max(0, maxScore - Math.max(0, attempts - matchedPairs) * 2)
  return { score, maxScore, completed: matchedPairs === TOTAL_PAIRS }
}

export default function MemoriaAnimales({ onComplete, onExit }: GameProps) {
  const [deck] = useState(buildDeck)
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [attempts, setAttempts] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const [busy, setBusy] = useState(false)

  const finish = useCallback((finalAttempts: number) => {
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
    onComplete({ ...computeMemoriaScore(TOTAL_PAIRS, finalAttempts), timeSeconds })
  }, [onComplete, startedAt])

  function handleFlip(index: number) {
    if (busy || flipped.includes(index) || matched.has(index)) return
    const next = [...flipped, index]
    setFlipped(next)
    if (next.length !== 2) return

    setBusy(true)
    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)
    const [a, b] = next
    if (deck[a] === deck[b]) {
      const newMatched = new Set(matched).add(a).add(b)
      setMatched(newMatched)
      setFlipped([])
      setBusy(false)
      if (newMatched.size === deck.length) {
        finish(nextAttempts)
      }
    } else {
      setTimeout(() => { setFlipped([]); setBusy(false) }, 700)
    }
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Encuentra las parejas de animales · Intentos: {attempts}</p>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {deck.map((animal, i) => {
          const isVisible = flipped.includes(i) || matched.has(i)
          return (
            <button
              key={i}
              onClick={() => handleFlip(i)}
              disabled={matched.has(i)}
              className="text-3xl aspect-square rounded-xl bg-primary-50 border border-primary-100 disabled:opacity-40"
            >
              {isVisible ? animal : '❓'}
            </button>
          )
        })}
      </div>
      <button onClick={onExit} className="text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
