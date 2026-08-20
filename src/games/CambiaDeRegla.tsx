import { useState, useCallback } from 'react'
import type { GameProps } from '../types/game'

type Color = 'red' | 'green' | 'blue'
type Shape = 'circle' | 'square' | 'triangle'
interface Card { color: Color; shape: Shape }

const COLORS: Color[] = ['red', 'green', 'blue']
const SHAPES: Shape[] = ['circle', 'square', 'triangle']
const ICONS: Record<Color, Record<Shape, string>> = {
  red:   { circle: '🔴', square: '🟥', triangle: '🔺' },
  green: { circle: '🟢', square: '🟩', triangle: '🔻' },
  blue:  { circle: '🔵', square: '🟦', triangle: '🔷' },
}

const PILES: Card[] = [
  { color: 'red', shape: 'circle' },
  { color: 'green', shape: 'square' },
  { color: 'blue', shape: 'triangle' },
]

const TOTAL_CARDS = 18
const SWITCH_AFTER = 6

function buildDeck(): Card[] {
  return Array.from({ length: TOTAL_CARDS }, () => ({
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }))
}

export function computeCambiaScore(correctSorts: number, perseverationErrors: number) {
  return { score: Math.max(0, correctSorts - perseverationErrors), maxScore: TOTAL_CARDS, completed: true }
}

export default function CambiaDeRegla({ onComplete, onExit }: GameProps) {
  const [deck] = useState(buildDeck)
  const [index, setIndex] = useState(0)
  const [rule, setRule] = useState<'color' | 'shape'>('color')
  const [streak, setStreak] = useState(0)
  const [correctSorts, setCorrectSorts] = useState(0)
  const [perseverationErrors, setPerseverationErrors] = useState(0)
  const [justSwitched, setJustSwitched] = useState(false)
  const [startedAt] = useState(() => Date.now())

  const finish = useCallback((finalCorrect: number, finalPersev: number) => {
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
    onComplete({ ...computeCambiaScore(finalCorrect, finalPersev), timeSeconds })
  }, [onComplete, startedAt])

  function handleSort(pileIndex: number) {
    const card = deck[index]
    const pile = PILES[pileIndex]
    const otherRule = rule === 'color' ? 'shape' : 'color'
    const isCorrect = card[rule] === pile[rule]
    const isPerseveration = !isCorrect && justSwitched && card[otherRule] === pile[otherRule]

    const nextCorrect = correctSorts + (isCorrect ? 1 : 0)
    const nextPersev = perseverationErrors + (isPerseveration ? 1 : 0)
    const nextStreak = isCorrect ? streak + 1 : 0

    setCorrectSorts(nextCorrect)
    setPerseverationErrors(nextPersev)

    const switching = nextStreak > 0 && nextStreak % SWITCH_AFTER === 0
    setRule(switching ? otherRule : rule)
    setStreak(switching ? 0 : nextStreak)
    setJustSwitched(switching)

    if (index + 1 >= TOTAL_CARDS) finish(nextCorrect, nextPersev)
    else setIndex((i) => i + 1)
  }

  if (index >= TOTAL_CARDS) return null
  const card = deck[index]

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Carta {index + 1}/{TOTAL_CARDS} · Descubre la regla de clasificación</p>
      <div className="text-5xl mb-6">{ICONS[card.color][card.shape]}</div>
      <div className="flex justify-center gap-4">
        {PILES.map((pile, i) => (
          <button key={i} onClick={() => handleSort(i)} className="text-3xl w-16 h-16 rounded-xl bg-gray-50 border border-gray-100">
            {ICONS[pile.color][pile.shape]}
          </button>
        ))}
      </div>
      <button onClick={onExit} className="mt-6 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
