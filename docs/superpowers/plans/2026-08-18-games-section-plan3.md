# Plan 3 — Sección de Juegos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the games section of MenteFocal: a 50-entry game catalog (8 fully playable games + 42 metadata-only "coming soon" entries), a filterable catalog page, and a game player that wires results into the existing progress store.

**Architecture:** Mirrors the Plan 2 info-section pattern (`data/articles.ts` + `InfoHub` + `ArticleCard` + `CategoryFilter`). Each playable game is an isolated component implementing the existing `GameProps` interface and exporting a pure scoring function for testing. A registry (`src/games/registry.ts`) holds the full 50-entry catalog plus a lazy-loaded component map for only the 8 playable ids. `GamesPage` and `GamePlayer` consume the registry; neither the registry nor the game components know about routing.

**Tech Stack:** React 19, TypeScript, Tailwind, framer-motion, react-router-dom, Zustand (`progressStore`, already exists), Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-18-games-section-plan3-design.md`

## Global Constraints

- Catalog has exactly 50 entries in `GAMES`; exactly 8 have a matching entry in `GAME_COMPONENTS`.
- No new dependencies — games use only React state + `framer-motion`, consistent with the current stack.
- Do not modify `src/store/progressStore.ts`, `src/hooks/useProgressSync.ts`, `src/types/game.ts`, or `supabase/schema.sql` — they already support this flow.
- Follow existing visual/code conventions: Tailwind utility classes matching `ArticleCard`/`CategoryFilter`/`Button`/`Badge`, Spanish copy throughout, `framer-motion` only where the existing pages already use it (hover/layout transitions).
- Tests use Vitest + `@testing-library/react`, matching `Button.test.tsx` / `ArticleCard.test.tsx` / `useOnline.test.ts`. Per-game tests exercise only the exported pure scoring function — not full UI interaction.
- Routes `/juegos` and `/juegos/:id` already exist in `src/App.tsx` pointing at `GamesPage`/`GamePlayer` — no routing changes needed.

---

## Task 1: CazaEstrellas game (4-6, Atención)

**Files:**
- Create: `src/games/CazaEstrellas.tsx`
- Test: `src/games/CazaEstrellas.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game` (`{ meta: GameMeta; onComplete: (result: GameResult) => void; onExit: () => void }`).
- Produces: default export `CazaEstrellas` (component); named export `computeCazaEstrellasScore(hits: number, misses: number): { score: number; maxScore: number; completed: boolean }`. Consumed by Task 9 (registry) and this task's own test.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/CazaEstrellas.test.ts
import { describe, it, expect } from 'vitest'
import { computeCazaEstrellasScore } from './CazaEstrellas'

describe('computeCazaEstrellasScore', () => {
  it('otorga el máximo cuando se atrapan todas las estrellas sin errores', () => {
    expect(computeCazaEstrellasScore(6, 0)).toEqual({ score: 6, maxScore: 6, completed: true })
  })

  it('resta un punto por cada error', () => {
    expect(computeCazaEstrellasScore(3, 2)).toEqual({ score: 1, maxScore: 6, completed: false })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeCazaEstrellasScore(2, 5)).toEqual({ score: 0, maxScore: 6, completed: false })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/CazaEstrellas.test.ts`
Expected: FAIL — `Cannot find module './CazaEstrellas'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/CazaEstrellas.tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/CazaEstrellas.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/CazaEstrellas.tsx src/games/CazaEstrellas.test.ts
git commit -m "feat: agregar juego Caza Estrellas (atención, 4-6 años)"
```

---

## Task 2: MemoriaAnimales game (4-6, Memoria)

**Files:**
- Create: `src/games/MemoriaAnimales.tsx`
- Test: `src/games/MemoriaAnimales.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `MemoriaAnimales`; named export `computeMemoriaScore(matchedPairs: number, attempts: number): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/MemoriaAnimales.test.ts
import { describe, it, expect } from 'vitest'
import { computeMemoriaScore } from './MemoriaAnimales'

describe('computeMemoriaScore', () => {
  it('da el puntaje máximo con el mínimo de intentos posible', () => {
    expect(computeMemoriaScore(6, 6)).toEqual({ score: 60, maxScore: 60, completed: true })
  })

  it('penaliza 2 puntos por cada intento extra', () => {
    expect(computeMemoriaScore(6, 10)).toEqual({ score: 52, maxScore: 60, completed: true })
  })

  it('no está completo si faltan parejas', () => {
    expect(computeMemoriaScore(3, 5)).toEqual({ score: 56, maxScore: 60, completed: false })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/MemoriaAnimales.test.ts`
Expected: FAIL — `Cannot find module './MemoriaAnimales'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/MemoriaAnimales.tsx
import { useState } from 'react'
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
  const [startedAt] = useState(Date.now())
  const [busy, setBusy] = useState(false)

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
        const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
        onComplete({ ...computeMemoriaScore(TOTAL_PAIRS, nextAttempts), timeSeconds })
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/MemoriaAnimales.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/MemoriaAnimales.tsx src/games/MemoriaAnimales.test.ts
git commit -m "feat: agregar juego Memoria de Animales (memoria, 4-6 años)"
```

---

## Task 3: SemaforoRapido game (7-9, Control de impulsos)

**Files:**
- Create: `src/games/SemaforoRapido.tsx`
- Test: `src/games/SemaforoRapido.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `SemaforoRapido`; named export `computeSemaforoScore(hits: number, falseAlarms: number, greenRounds: number): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/SemaforoRapido.test.ts
import { describe, it, expect } from 'vitest'
import { computeSemaforoScore } from './SemaforoRapido'

describe('computeSemaforoScore', () => {
  it('da el máximo cuando se acierta cada ronda verde sin falsas alarmas', () => {
    expect(computeSemaforoScore(8, 0, 8)).toEqual({ score: 8, maxScore: 8, completed: true })
  })

  it('penaliza el doble por cada click impulsivo en rojo', () => {
    expect(computeSemaforoScore(5, 3, 8)).toEqual({ score: 0, maxScore: 8, completed: true })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeSemaforoScore(1, 10, 8)).toEqual({ score: 0, maxScore: 8, completed: true })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/SemaforoRapido.test.ts`
Expected: FAIL — `Cannot find module './SemaforoRapido'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/SemaforoRapido.tsx
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
  const startedAt = useRef(Date.now())

  const finish = useCallback((hits: number, falseAlarms: number) => {
    const timeSeconds = Math.round((Date.now() - startedAt.current) / 1000)
    onComplete({ ...computeSemaforoScore(hits, falseAlarms, greenRounds), timeSeconds })
  }, [greenRounds, onComplete])

  useEffect(() => {
    if (round >= ROUNDS) return
    clickedRef.current = false
    const isGreen = sequence[round]
    const timer = setTimeout(() => {
      setDisplay((prev) => {
        const hits = prev.hits + (isGreen && clickedRef.current ? 1 : 0)
        const falseAlarms = prev.falseAlarms + (!isGreen && clickedRef.current ? 1 : 0)
        if (round + 1 >= ROUNDS) finish(hits, falseAlarms)
        else setRound((r) => r + 1)
        return { hits, falseAlarms }
      })
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/SemaforoRapido.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/SemaforoRapido.tsx src/games/SemaforoRapido.test.ts
git commit -m "feat: agregar juego Semáforo Rápido (impulsos, 7-9 años)"
```

---

## Task 4: LaberintoVeloz game (7-9, Visomotriz)

**Files:**
- Create: `src/games/LaberintoVeloz.tsx`
- Test: `src/games/LaberintoVeloz.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `LaberintoVeloz`; named export `computeLaberintoScore(timeLeft: number, reachedEnd: boolean): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/LaberintoVeloz.test.ts
import { describe, it, expect } from 'vitest'
import { computeLaberintoScore } from './LaberintoVeloz'

describe('computeLaberintoScore', () => {
  it('puntúa el tiempo restante cuando se llega a la meta', () => {
    expect(computeLaberintoScore(20, true)).toEqual({ score: 20, maxScore: 45, completed: true })
  })

  it('da cero si se acaba el tiempo sin llegar', () => {
    expect(computeLaberintoScore(0, false)).toEqual({ score: 0, maxScore: 45, completed: false })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/LaberintoVeloz.test.ts`
Expected: FAIL — `Cannot find module './LaberintoVeloz'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/LaberintoVeloz.tsx
import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameProps } from '../types/game'

const MAZE = [
  [0,1,0,0,0,0,0],
  [0,1,0,1,1,1,0],
  [0,0,0,1,0,0,0],
  [0,1,1,1,0,1,0],
  [0,0,0,0,0,1,0],
  [1,1,1,1,0,1,0],
  [0,0,0,0,0,0,0],
]
const START = { row: 0, col: 0 }
const END = { row: 6, col: 6 }
const TOTAL_TIME = 45

export function computeLaberintoScore(timeLeft: number, reachedEnd: boolean) {
  return { score: reachedEnd ? timeLeft : 0, maxScore: TOTAL_TIME, completed: reachedEnd }
}

export default function LaberintoVeloz({ onComplete, onExit }: GameProps) {
  const [pos, setPos] = useState(START)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [finished, setFinished] = useState(false)
  const finishedRef = useRef(false)
  const timeLeftRef = useRef(TOTAL_TIME)

  useEffect(() => { timeLeftRef.current = timeLeft }, [timeLeft])

  // NOTE: finish() must stay idempotent via finishedRef (a plain ref check,
  // not a setState updater) because it is called from two places below —
  // the countdown effect and the position-watch effect. Do NOT restructure
  // this into a `setFinished((already) => {...})` updater that calls
  // onComplete() inside it: this app renders in <StrictMode> (src/main.tsx),
  // which deliberately double-invokes setState updater functions in dev to
  // surface impurity — an onComplete-calling updater would fire onComplete
  // twice on completion.
  const finish = useCallback((reachedEnd: boolean, finalTimeLeft: number) => {
    if (finishedRef.current) return
    finishedRef.current = true
    setFinished(true)
    onComplete({ ...computeLaberintoScore(finalTimeLeft, reachedEnd), timeSeconds: TOTAL_TIME - finalTimeLeft })
  }, [onComplete])

  useEffect(() => {
    if (finished) return
    if (timeLeft <= 0) { finish(false, 0); return }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, finished, finish])

  // Detects reaching the end by watching `pos` — kept separate from the
  // `setPos` updater below so that updater stays a pure function of its
  // previous state (no onComplete side effect inside a setState updater).
  useEffect(() => {
    if (pos.row === END.row && pos.col === END.col) finish(true, timeLeftRef.current)
  }, [pos, finish])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (finishedRef.current) return
      const deltas: Record<string, [number, number]> = {
        ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1],
      }
      const delta = deltas[e.key]
      if (!delta) return
      setPos((prev) => {
        const row = prev.row + delta[0]
        const col = prev.col + delta[1]
        if (row < 0 || row >= MAZE.length || col < 0 || col >= MAZE[0].length) return prev
        if (MAZE[row][col] === 1) return prev
        return { row, col }
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Usa las flechas para llegar a la bandera · {timeLeft}s</p>
      <div className="grid grid-cols-7 gap-1 mx-auto w-fit">
        {MAZE.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = pos.row === r && pos.col === c
            const isEnd = END.row === r && END.col === c
            return (
              <div
                key={`${r}-${c}`}
                className={['w-8 h-8 flex items-center justify-center text-sm rounded', cell === 1 ? 'bg-gray-700' : 'bg-gray-50'].join(' ')}
              >
                {isPlayer ? '🧑' : isEnd ? '🚩' : ''}
              </div>
            )
          })
        )}
      </div>
      <button onClick={onExit} className="mt-4 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/LaberintoVeloz.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/LaberintoVeloz.tsx src/games/LaberintoVeloz.test.ts
git commit -m "feat: agregar juego Laberinto Veloz (visomotriz, 7-9 años)"
```

---

## Task 5: ReaccionRelampago game (10-12, Velocidad)

**Files:**
- Create: `src/games/ReaccionRelampago.tsx`
- Test: `src/games/ReaccionRelampago.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `ReaccionRelampago`; named export `computeReaccionScore(avgMs: number): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/ReaccionRelampago.test.ts
import { describe, it, expect } from 'vitest'
import { computeReaccionScore } from './ReaccionRelampago'

describe('computeReaccionScore', () => {
  it('da un puntaje alto para reacciones rápidas', () => {
    expect(computeReaccionScore(50)).toEqual({ score: 95, maxScore: 100, completed: true })
  })

  it('da un puntaje medio para reacciones promedio', () => {
    expect(computeReaccionScore(300)).toEqual({ score: 70, maxScore: 100, completed: true })
  })

  it('nunca baja de cero para reacciones muy lentas', () => {
    expect(computeReaccionScore(1500)).toEqual({ score: 0, maxScore: 100, completed: true })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/ReaccionRelampago.test.ts`
Expected: FAIL — `Cannot find module './ReaccionRelampago'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/ReaccionRelampago.tsx
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
      setPhase('tooSoon')
      const next = [...times, PENALTY_MS]
      setTimes(next)
      // A premature click on the final round must still finish the game —
      // without this branch the component silently returns null on round 5
      // (see `if (round >= ROUNDS) return null` below) and onComplete never
      // fires, leaving the game stuck with no result reported.
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/ReaccionRelampago.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/ReaccionRelampago.tsx src/games/ReaccionRelampago.test.ts
git commit -m "feat: agregar juego Reacción Relámpago (velocidad, 10-12 años)"
```

---

## Task 6: SecuenciaLogica game (10-12, Lógica)

**Files:**
- Create: `src/games/SecuenciaLogica.tsx`
- Test: `src/games/SecuenciaLogica.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `SecuenciaLogica`; named export `computeSecuenciaScore(correct: number): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/SecuenciaLogica.test.ts
import { describe, it, expect } from 'vitest'
import { computeSecuenciaScore } from './SecuenciaLogica'

describe('computeSecuenciaScore', () => {
  it('da un punto por cada patrón correcto, sobre 6 rondas', () => {
    expect(computeSecuenciaScore(6)).toEqual({ score: 6, maxScore: 6, completed: true })
  })

  it('siempre marca completado al terminar las rondas, aciertes o no', () => {
    expect(computeSecuenciaScore(0)).toEqual({ score: 0, maxScore: 6, completed: true })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/SecuenciaLogica.test.ts`
Expected: FAIL — `Cannot find module './SecuenciaLogica'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/SecuenciaLogica.tsx
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
  const [startedAt] = useState(Date.now())

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/SecuenciaLogica.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/SecuenciaLogica.tsx src/games/SecuenciaLogica.test.ts
git commit -m "feat: agregar juego Secuencia Lógica (lógica, 10-12 años)"
```

---

## Task 7: OrganizaTuDia game (13-16, Planificación)

**Files:**
- Create: `src/games/OrganizaTuDia.tsx`
- Test: `src/games/OrganizaTuDia.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `OrganizaTuDia`; named export `computeOrganizaScore(order: string[]): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/OrganizaTuDia.test.ts
import { describe, it, expect } from 'vitest'
import { computeOrganizaScore } from './OrganizaTuDia'

describe('computeOrganizaScore', () => {
  it('da el máximo cuando el orden respeta todas las restricciones', () => {
    const result = computeOrganizaScore(['despertar', 'desayuno', 'mochila', 'escuela', 'tarea', 'cena'])
    expect(result).toEqual({ score: 5, maxScore: 5, completed: true })
  })

  it('da cero cuando el orden está completamente invertido', () => {
    const result = computeOrganizaScore(['cena', 'tarea', 'escuela', 'mochila', 'desayuno', 'despertar'])
    expect(result).toEqual({ score: 0, maxScore: 5, completed: true })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/OrganizaTuDia.test.ts`
Expected: FAIL — `Cannot find module './OrganizaTuDia'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/OrganizaTuDia.tsx
import { useState } from 'react'
import type { GameProps } from '../types/game'

interface Task { id: string; label: string; emoji: string }

const TASKS: Task[] = [
  { id: 'despertar', label: 'Despertarse',        emoji: '⏰' },
  { id: 'desayuno',  label: 'Desayunar',           emoji: '🥣' },
  { id: 'mochila',   label: 'Preparar la mochila', emoji: '🎒' },
  { id: 'escuela',   label: 'Ir a la escuela',     emoji: '🏫' },
  { id: 'tarea',     label: 'Hacer la tarea',      emoji: '📝' },
  { id: 'cena',      label: 'Cenar',               emoji: '🍽️' },
]

const CONSTRAINTS: Array<[string, string]> = [
  ['despertar', 'desayuno'],
  ['desayuno', 'mochila'],
  ['mochila', 'escuela'],
  ['escuela', 'tarea'],
  ['tarea', 'cena'],
]

export function computeOrganizaScore(order: string[]) {
  const satisfied = CONSTRAINTS.filter(([before, after]) => order.indexOf(before) < order.indexOf(after)).length
  return { score: satisfied, maxScore: CONSTRAINTS.length, completed: true }
}

function shuffledIds(): string[] {
  const ids = TASKS.map((t) => t.id)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids
}

export default function OrganizaTuDia({ onComplete, onExit }: GameProps) {
  const [order, setOrder] = useState(shuffledIds)
  const [startedAt] = useState(Date.now())

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
  }

  function handleSubmit() {
    const timeSeconds = Math.round((Date.now() - startedAt) / 1000)
    onComplete({ ...computeOrganizaScore(order), timeSeconds })
  }

  return (
    <div className="max-w-sm mx-auto text-center">
      <p className="text-sm text-gray-500 mb-4">Ordena las tareas del día de la forma más lógica</p>
      <ul className="flex flex-col gap-2 mb-6">
        {order.map((id, i) => {
          const task = TASKS.find((t) => t.id === id)!
          return (
            <li key={id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
              <span className="text-xl">{task.emoji}</span>
              <span className="flex-1 text-left text-sm font-semibold text-gray-700">{task.label}</span>
              <button onClick={() => move(i, -1)} disabled={i === 0} className="disabled:opacity-30">⬆️</button>
              <button onClick={() => move(i, 1)} disabled={i === order.length - 1} className="disabled:opacity-30">⬇️</button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleSubmit} className="px-6 py-2.5 rounded-xl bg-primary-500 text-white font-semibold">
        Confirmar orden
      </button>
      <button onClick={onExit} className="block mx-auto mt-4 text-sm text-gray-400 underline">Salir</button>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/OrganizaTuDia.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/OrganizaTuDia.tsx src/games/OrganizaTuDia.test.ts
git commit -m "feat: agregar juego Organiza tu Día (planificación, 13-16 años)"
```

---

## Task 8: CambiaDeRegla game (13-16, Flexibilidad)

**Files:**
- Create: `src/games/CambiaDeRegla.tsx`
- Test: `src/games/CambiaDeRegla.test.ts`

**Interfaces:**
- Consumes: `GameProps` from `../types/game`.
- Produces: default export `CambiaDeRegla`; named export `computeCambiaScore(correctSorts: number, perseverationErrors: number): { score: number; maxScore: number; completed: boolean }`.

- [ ] **Step 1: Write the failing test**

```ts
// src/games/CambiaDeRegla.test.ts
import { describe, it, expect } from 'vitest'
import { computeCambiaScore } from './CambiaDeRegla'

describe('computeCambiaScore', () => {
  it('resta los errores de perseveración de los aciertos', () => {
    expect(computeCambiaScore(15, 2)).toEqual({ score: 13, maxScore: 18, completed: true })
  })

  it('nunca da un puntaje negativo', () => {
    expect(computeCambiaScore(5, 10)).toEqual({ score: 0, maxScore: 18, completed: true })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/CambiaDeRegla.test.ts`
Expected: FAIL — `Cannot find module './CambiaDeRegla'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/games/CambiaDeRegla.tsx
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
  const [startedAt] = useState(Date.now())

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/CambiaDeRegla.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/CambiaDeRegla.tsx src/games/CambiaDeRegla.test.ts
git commit -m "feat: agregar juego Cambia de Regla (flexibilidad, 13-16 años)"
```

---

## Task 9: Game registry (50-entry catalog)

**Files:**
- Create: `src/games/registry.ts`
- Test: `src/games/registry.test.ts`

**Interfaces:**
- Consumes: the 8 default exports from Tasks 1-8 (`./CazaEstrellas`, `./MemoriaAnimales`, `./SemaforoRapido`, `./LaberintoVeloz`, `./ReaccionRelampago`, `./SecuenciaLogica`, `./OrganizaTuDia`, `./CambiaDeRegla`); `GameMeta`, `GameProps`, `AGE_LABELS`, `SKILL_LABELS` from `../types/game`.
- Produces: `GAMES: GameMeta[]` (50 entries) and `GAME_COMPONENTS: Record<string, LazyExoticComponent<ComponentType<GameProps>>>` (8 keys). Consumed by Task 10 (GameCard via `GamesPage`), Task 12 (`GamesPage`), Task 13 (`GamePlayer`).

- [ ] **Step 1: Write the failing test**

```ts
// src/games/registry.test.ts
import { describe, it, expect } from 'vitest'
import { GAMES, GAME_COMPONENTS } from './registry'

describe('game registry', () => {
  it('tiene exactamente 50 juegos', () => {
    expect(GAMES).toHaveLength(50)
  })

  it('todos los ids son únicos', () => {
    const ids = GAMES.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('tiene exactamente 8 juegos jugables', () => {
    expect(Object.keys(GAME_COMPONENTS)).toHaveLength(8)
  })

  it('toda key de GAME_COMPONENTS corresponde a un id existente en GAMES', () => {
    const ids = new Set(GAMES.map((g) => g.id))
    for (const key of Object.keys(GAME_COMPONENTS)) {
      expect(ids.has(key)).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/games/registry.test.ts`
Expected: FAIL — `Cannot find module './registry'`

- [ ] **Step 3: Write minimal implementation**

```ts
// src/games/registry.ts
import { lazy } from 'react'
import type { LazyExoticComponent, ComponentType } from 'react'
import type { GameMeta, GameProps } from '../types/game'
import { AGE_LABELS, SKILL_LABELS } from '../types/game'

// AGE_LABELS is typed Record<AgeRange, string>, but GameMeta.ageLabel needs
// the narrower literal union ('Exploradores' | 'Aventureros' | ...) — cast
// once here so every `AL[ageRange]` lookup below type-checks without an
// `as` on each of the 50 entries.
const AL = AGE_LABELS as Record<GameMeta['ageRange'], GameMeta['ageLabel']>
const SL = SKILL_LABELS

export const GAMES: GameMeta[] = [
  // -- 4-6 (Exploradores) --
  { id: 'caza-estrellas',      name: 'Caza Estrellas',        emoji: '⭐', description: 'Toca solo las estrellas antes de que desaparezcan.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'memoria-animales',    name: 'Memoria de Animales',   emoji: '🐼', description: 'Encuentra las parejas de animales escondidas.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'burbujas-de-colores', name: 'Burbujas de Colores',   emoji: '🫧', description: 'Revienta las burbujas en el orden de colores indicado.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'carrera-de-caracoles',name: 'Carrera de Caracoles',  emoji: '🐌', description: 'Toca al ritmo justo para que tu caracol avance sin chocar.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'construye-tu-casa',   name: 'Construye tu Casa',     emoji: '🏠', description: 'Ordena las piezas en el paso correcto para construir una casita.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'animales-camaleon',   name: 'Animales Camaleón',     emoji: '🦎', description: 'Encuentra qué cambió entre dos imágenes casi iguales.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'atrapa-la-fruta',     name: 'Atrapa la Fruta',       emoji: '🍎', description: 'Guía la cesta con el dedo para atrapar las frutas que caen.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'repite-el-sonido',    name: 'Repite el Sonido',      emoji: '🔊', description: 'Escucha y repite la palabra que dice el personaje.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'sigue-el-patron',     name: 'Sigue el Patrón',       emoji: '🔷', description: 'Completa la fila de figuras siguiendo el patrón de colores.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'respira-con-la-nube', name: 'Respira con la Nube',   emoji: '☁️', description: 'Sigue el ritmo de una nube que crece y se encoge para respirar despacio.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },

  // -- 7-9 (Aventureros) --
  { id: 'semaforo-rapido',     name: 'Semáforo Rápido',       emoji: '🚦', description: 'Toca solo cuando el círculo esté en verde, nunca en rojo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'laberinto-veloz',     name: 'Laberinto Veloz',       emoji: '🧭', description: 'Navega el laberinto con las flechas antes de que se acabe el tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'mira-y-recuerda',     name: 'Mira y Recuerda',       emoji: '👀', description: 'Observa los objetos y señala cuáles faltan después.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'torre-de-memoria',    name: 'Torre de Memoria',      emoji: '🗼', description: 'Repite la secuencia de colores que se ilumina, cada vez más larga.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'relevos-numericos',   name: 'Relevos Numéricos',     emoji: '🔢', description: 'Suma o resta rápido antes de que se acabe el tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'mapa-del-tesoro',     name: 'Mapa del Tesoro',       emoji: '🗺️', description: 'Planifica la ruta más corta entre varias paradas para llegar al tesoro.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-de-equipo',    name: 'Cambia de Equipo',      emoji: '🔄', description: 'Agrupa animales según una regla que cambia cada cierto tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'cuentacuentos-vivo',  name: 'Cuentacuentos Vivo',    emoji: '🗣️', description: 'Arma oraciones eligiendo las palabras correctas en orden.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'rompecabezas-express',name: 'Rompecabezas Exprés',   emoji: '🧩', description: 'Resuelve acertijos cortos de lógica contra el reloj.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'jardin-tranquilo',    name: 'Jardín Tranquilo',      emoji: '🌿', description: 'Riega y cuida plantas siguiendo una rutina calmada, sin presión de tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'detective-de-detalles',name: 'Detective de Detalles',emoji: '🕵️', description: 'Encuentra las diferencias entre dos escenas casi idénticas.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'parejas-veloces',     name: 'Parejas Veloces',       emoji: '🃏', description: 'Encuentra parejas de cartas contra un cronómetro más ajustado.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },

  // -- 10-12 (Descubridores) --
  { id: 'reaccion-relampago',  name: 'Reacción Relámpago',    emoji: '⚡', description: 'Toca en cuanto la pantalla cambie de color, varias rondas.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'secuencia-logica',    name: 'Secuencia Lógica',      emoji: '🔢', description: 'Completa el patrón numérico, la dificultad crece por ronda.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'ojo-de-halcon',       name: 'Ojo de Halcón',         emoji: '🦅', description: 'Localiza objetos específicos entre decenas de distractores.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'mapa-mental',         name: 'Mapa Mental',           emoji: '🧠', description: 'Memoriza la posición de varias cartas y encuentra todos los pares.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'cuenta-hasta-diez',   name: 'Cuenta Hasta Diez',     emoji: '🛑', description: 'Espera el momento exacto antes de actuar para evitar errores por impulsividad.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'organiza-la-mochila', name: 'Organiza la Mochila',   emoji: '🎒', description: 'Decide qué llevar y en qué orden empacar según las restricciones del viaje.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-la-regla',     name: 'Cambia la Regla',       emoji: '🔀', description: 'Clasifica tarjetas mientras la regla de clasificación cambia sin avisar.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'laberinto-de-palabras',name: 'Laberinto de Palabras',emoji: '🔤', description: 'Encuentra el camino uniendo palabras relacionadas entre sí.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'circuito-de-precision',name: 'Circuito de Precisión',emoji: '🎯', description: 'Traza una línea dentro de un camino estrecho sin salirte del borde.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'respiracion-guiada',  name: 'Respiración Guiada',    emoji: '🌊', description: 'Sigue una ola visual que marca el ritmo de inhalar y exhalar.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'atencion-dividida',   name: 'Atención Dividida',     emoji: '👁️', description: 'Vigila dos zonas de la pantalla a la vez y reacciona a la que cambie.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'dificil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'clasifica-y-gana',    name: 'Clasifica y Gana',      emoji: '🗂️', description: 'Vuelve a clasificar tarjetas bajo una nueva regla oculta.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },

  // -- 13-16 (Pioneros) --
  { id: 'organiza-tu-dia',     name: 'Organiza tu Día',       emoji: '🗓️', description: 'Ordena tareas respetando restricciones simples de secuencia.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-de-regla',     name: 'Cambia de Regla',       emoji: '🧬', description: 'Clasifica cartas según una regla oculta que cambia sin previo aviso.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'radar-social',        name: 'Radar Social',          emoji: '📡', description: 'Detecta rápidamente el ícono objetivo entre muchos similares en movimiento.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'cadena-de-datos',     name: 'Cadena de Datos',       emoji: '🔗', description: 'Memoriza una secuencia larga de números o símbolos y repítela.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'stop-and-go',         name: 'Stop and Go',           emoji: '🚥', description: 'Reacciona solo ante señales específicas mientras ignoras las distractoras.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'sprint-mental',       name: 'Sprint Mental',         emoji: '💨', description: 'Resuelve el máximo de operaciones simples posibles en 60 segundos.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'pulso-firme',         name: 'Pulso Firme',           emoji: '✍️', description: 'Traza formas complejas con precisión dentro de un tiempo límite.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'argumenta-y-gana',    name: 'Argumenta y Gana',      emoji: '💬', description: 'Ordena frases para construir el argumento más coherente.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'medio', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'enigma-final',        name: 'Enigma Final',          emoji: '🧩', description: 'Resuelve un rompecabezas lógico de varios pasos encadenados.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'pausa-consciente',    name: 'Pausa Consciente',      emoji: '🧘', description: 'Ejercicio de atención plena guiado para bajar revoluciones.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'ruta-critica',        name: 'Ruta Crítica',          emoji: '🛠️', description: 'Ordena tareas con dependencias complejas para completar un proyecto simulado.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
]

export const GAME_COMPONENTS: Record<string, LazyExoticComponent<ComponentType<GameProps>>> = {
  'caza-estrellas':     lazy(() => import('./CazaEstrellas')),
  'memoria-animales':   lazy(() => import('./MemoriaAnimales')),
  'semaforo-rapido':    lazy(() => import('./SemaforoRapido')),
  'laberinto-veloz':    lazy(() => import('./LaberintoVeloz')),
  'reaccion-relampago': lazy(() => import('./ReaccionRelampago')),
  'secuencia-logica':   lazy(() => import('./SecuenciaLogica')),
  'organiza-tu-dia':    lazy(() => import('./OrganizaTuDia')),
  'cambia-de-regla':    lazy(() => import('./CambiaDeRegla')),
}
```

Note: the array above has 45 entries as literally written; the implementer must add exactly 5 more metadata-only entries (following the same object shape) so that `GAMES.length === 50` and the registry test passes:

```ts
  { id: 'figuras-escondidas',  name: 'Figuras Escondidas',    emoji: '🔍', description: 'Encuentra las figuras escondidas dentro del dibujo.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'cuenta-cuentos',      name: 'Cuenta Cuentos',        emoji: '📖', description: 'Ordena las viñetas de una historia corta de principio a fin.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'espera-tu-turno',     name: 'Espera tu Turno',       emoji: '⏳', description: 'Aguanta sin tocar la pantalla hasta que aparezca la señal correcta.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'minuto-de-calma',     name: 'Minuto de Calma',       emoji: '🕯️', description: 'Un ejercicio guiado de relajación de un minuto entre actividades.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'memoria-de-trabajo',  name: 'Memoria de Trabajo',    emoji: '🗃️', description: 'Recuerda y actualiza una lista mientras se agregan y quitan elementos.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'memoria', skillLabel: SL.memoria },
```

Insert these 5 objects into the `GAMES` array (anywhere — order does not matter) before running the tests. 45 + 5 = exactly 50.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/games/registry.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/games/registry.ts src/games/registry.test.ts
git commit -m "feat: agregar registro de 50 juegos con 8 jugables"
```

---

## Task 10: GameCard component

**Files:**
- Create: `src/components/games/GameCard.tsx`
- Test: `src/components/games/GameCard.test.tsx`

**Interfaces:**
- Consumes: `GameMeta`, `DIFFICULTY_LABELS` from `../../types/game`; `Badge` from `../shared/Badge`.
- Produces: `GameCard({ game, playable, onClick }: { game: GameMeta; playable: boolean; onClick?: () => void })`. Consumed by Task 12 (`GamesPage`).

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/games/GameCard.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { GameCard } from './GameCard'
import type { GameMeta } from '../../types/game'

const mockGame: GameMeta = {
  id: 'caza-estrellas',
  name: 'Caza Estrellas',
  emoji: '⭐',
  description: 'Toca solo las estrellas antes de que desaparezcan.',
  ageRange: '4-6',
  ageLabel: 'Exploradores',
  difficulty: 'facil',
  skillCategory: 'atencion',
  skillLabel: 'Atención',
}

describe('GameCard', () => {
  it('muestra el emoji, nombre y descripción', () => {
    render(<GameCard game={mockGame} playable />)
    expect(screen.getByText('⭐')).toBeInTheDocument()
    expect(screen.getByText('Caza Estrellas')).toBeInTheDocument()
    expect(screen.getByText('Toca solo las estrellas antes de que desaparezcan.')).toBeInTheDocument()
  })

  it('muestra el badge "Próximamente" cuando playable es false', () => {
    render(<GameCard game={mockGame} playable={false} />)
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
  })

  it('no muestra "Próximamente" cuando playable es true', () => {
    render(<GameCard game={mockGame} playable />)
    expect(screen.queryByText('Próximamente')).not.toBeInTheDocument()
  })

  it('llama onClick al hacer clic cuando es jugable', async () => {
    const onClick = vi.fn()
    render(<GameCard game={mockGame} playable onClick={onClick} />)
    await userEvent.click(screen.getByRole('article'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('no llama onClick al hacer clic cuando no es jugable', async () => {
    const onClick = vi.fn()
    render(<GameCard game={mockGame} playable={false} onClick={onClick} />)
    await userEvent.click(screen.getByRole('article'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/games/GameCard.test.tsx`
Expected: FAIL — `Cannot find module './GameCard'`

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/games/GameCard.tsx
import { motion } from 'framer-motion'
import type { GameMeta } from '../../types/game'
import { DIFFICULTY_LABELS } from '../../types/game'
import { Badge } from '../shared/Badge'

interface GameCardProps {
  game: GameMeta
  playable: boolean
  onClick?: () => void
}

const AGE_BADGE: Record<GameMeta['ageRange'], 'age-4-6' | 'age-7-9' | 'age-10-12' | 'age-13-16'> = {
  '4-6': 'age-4-6', '7-9': 'age-7-9', '10-12': 'age-10-12', '13-16': 'age-13-16',
}

export function GameCard({ game, playable, onClick }: GameCardProps) {
  return (
    <motion.article
      role="article"
      whileHover={playable ? { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={playable ? onClick : undefined}
      className={[
        'bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 h-full',
        playable ? 'cursor-pointer' : 'opacity-60',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{game.emoji}</span>
        <div className="flex flex-col items-end gap-1">
          <Badge variant={AGE_BADGE[game.ageRange]}>{game.ageLabel}</Badge>
          {!playable && <Badge variant="default">Próximamente</Badge>}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1 text-base leading-snug">{game.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{game.description}</p>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50">
        <Badge variant="skill">{game.skillLabel}</Badge>
        <Badge variant={game.difficulty}>{DIFFICULTY_LABELS[game.difficulty]}</Badge>
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/games/GameCard.test.tsx`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/games/GameCard.tsx src/components/games/GameCard.test.tsx
git commit -m "feat: agregar componente GameCard"
```

---

## Task 11: GameFilters component

**Files:**
- Create: `src/components/games/GameFilters.tsx`

**Interfaces:**
- Consumes: `AgeRange`, `SkillCategory`, `AGE_LABELS`, `SKILL_LABELS` from `../../types/game`.
- Produces: `GameFilters({ selectedAge, selectedSkill, onAgeChange, onSkillChange, ageCounts, skillCounts })`. Consumed by Task 12 (`GamesPage`).

No dedicated unit test for this task — it is a thin, purely presentational filter mirroring the already-tested `CategoryFilter` pattern (`src/components/info/CategoryFilter.tsx`), and its behavior is exercised indirectly wherever `GamesPage` is used. This matches the spec's testing section, which does not list a `GameFilters` test.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/games/GameFilters.tsx
import type { AgeRange, SkillCategory } from '../../types/game'
import { AGE_LABELS, SKILL_LABELS } from '../../types/game'

interface GameFiltersProps {
  selectedAge: AgeRange | 'all'
  selectedSkill: SkillCategory | 'all'
  onAgeChange: (age: AgeRange | 'all') => void
  onSkillChange: (skill: SkillCategory | 'all') => void
  ageCounts: Record<AgeRange | 'all', number>
  skillCounts: Record<SkillCategory | 'all', number>
}

const AGES: Array<AgeRange | 'all'> = ['all', '4-6', '7-9', '10-12', '13-16']
const SKILLS: Array<SkillCategory | 'all'> = [
  'all', 'atencion', 'memoria', 'impulsos', 'velocidad', 'planificacion',
  'flexibilidad', 'visomotriz', 'lenguaje', 'logica', 'relajacion',
]

function chipClass(isActive: boolean) {
  return [
    'px-4 py-1.5 rounded-full text-sm font-semibold transition-all',
    isActive ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  ].join(' ')
}

export function GameFilters({
  selectedAge, selectedSkill, onAgeChange, onSkillChange, ageCounts, skillCounts,
}: GameFiltersProps) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {AGES.map((age) => (
          <button key={age} onClick={() => onAgeChange(age)} className={chipClass(selectedAge === age)}>
            {age === 'all' ? 'Todas las edades' : AGE_LABELS[age]}
            <span className="ml-1.5 text-xs opacity-75">({ageCounts[age]})</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SKILLS.map((skill) => (
          <button key={skill} onClick={() => onSkillChange(skill)} className={chipClass(selectedSkill === skill)}>
            {skill === 'all' ? 'Todas las habilidades' : SKILL_LABELS[skill]}
            <span className="ml-1.5 text-xs opacity-75">({skillCounts[skill]})</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/games/GameFilters.tsx
git commit -m "feat: agregar componente GameFilters"
```

---

## Task 12: GamesPage (catalog page)

**Files:**
- Modify: `src/pages/GamesPage.tsx` (replace the Plan-3 placeholder entirely)

**Interfaces:**
- Consumes: `GAMES`, `GAME_COMPONENTS` from `../games/registry` (Task 9); `GameCard` (Task 10); `GameFilters` (Task 11); `AgeRange`, `SkillCategory` from `../types/game`.
- Produces: default export page component, already wired to route `/juegos` in `src/App.tsx` — no route changes needed.

No dedicated test file — matches the spec's testing section, which covers the catalog's building blocks (`registry`, `GameCard`) individually rather than the composed page, the same way `InfoHub.tsx` has no test file of its own in this codebase.

- [ ] **Step 1: Replace the placeholder implementation**

```tsx
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
```

- [ ] **Step 2: Manually verify in the dev server**

Run: `npm run dev`, open `/juegos`. Expected: 50 cards render, search and both filter rows narrow the grid, the 8 playable cards navigate to `/juegos/<id>` on click, the other 42 show a "Próximamente" badge and do not navigate.

- [ ] **Step 3: Commit**

```bash
git add src/pages/GamesPage.tsx
git commit -m "feat: reemplazar placeholder de GamesPage con catálogo completo"
```

---

## Task 13: GamePlayer (game runner)

**Files:**
- Modify: `src/pages/GamePlayer.tsx` (replace the Plan-3 placeholder entirely)
- Test: `src/pages/GamePlayer.test.tsx`

**Interfaces:**
- Consumes: `GAMES`, `GAME_COMPONENTS` from `../games/registry` (Task 9); `useProgressStore` from `../store/progressStore` (existing, unmodified — `saveResult(gameId: string, skillCategory: SkillCategory, result: GameResult): void`); `Button` from `../components/shared/Button`; `Spinner` from `../components/shared/Spinner`; `NotFound` from `./NotFound`; `GameResult` from `../types/game`.
- Produces: default export page component, already wired to route `/juegos/:id` in `src/App.tsx` — no route changes needed.

- [ ] **Step 1: Write the failing test**

```tsx
// src/pages/GamePlayer.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import type { GameProps } from '../types/game'

vi.mock('../games/registry', async () => {
  const actual = await vi.importActual<typeof import('../games/registry')>('../games/registry')
  function FakeGame({ onComplete }: GameProps) {
    return (
      <button onClick={() => onComplete({ score: 5, maxScore: 10, timeSeconds: 3, completed: true })}>
        Completar
      </button>
    )
  }
  return {
    ...actual,
    GAME_COMPONENTS: { ...actual.GAME_COMPONENTS, 'caza-estrellas': FakeGame },
  }
})

import GamePlayer from './GamePlayer'
import { useProgressStore } from '../store/progressStore'

function renderPlayer(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/juegos/${id}`]}>
      <Routes>
        <Route path="/juegos/:id" element={<GamePlayer />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('GamePlayer', () => {
  beforeEach(() => {
    useProgressStore.setState({ local: {}, pendingSync: false })
  })

  it('muestra la página de no encontrado si el id no existe', () => {
    renderPlayer('juego-inexistente')
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('muestra "próximamente" si el juego no tiene componente', () => {
    renderPlayer('burbujas-de-colores')
    expect(screen.getByText(/próximamente/i)).toBeInTheDocument()
  })

  it('guarda el resultado en progressStore y muestra la pantalla de resultado al completar', async () => {
    renderPlayer('caza-estrellas')
    await userEvent.click(await screen.findByText('Completar'))
    expect(useProgressStore.getState().local['caza-estrellas']).toMatchObject({ bestScore: 5, timesPlayed: 1 })
    expect(screen.getByText(/puntaje: 5 \/ 10/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/pages/GamePlayer.test.tsx`
Expected: FAIL — placeholder `GamePlayer` renders `GamePlayer — Plan 3`, none of the assertions match.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/pages/GamePlayer.tsx
import { Suspense, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GAMES, GAME_COMPONENTS } from '../games/registry'
import { useProgressStore } from '../store/progressStore'
import { Button } from '../components/shared/Button'
import { Spinner } from '../components/shared/Spinner'
import NotFound from './NotFound'
import type { GameResult } from '../types/game'

export default function GamePlayer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const saveResult = useProgressStore((s) => s.saveResult)
  const [result, setResult] = useState<GameResult | null>(null)
  const [playCount, setPlayCount] = useState(0)

  const meta = GAMES.find((g) => g.id === id)
  if (!meta) return <NotFound />

  const GameComponent = GAME_COMPONENTS[meta.id]
  if (!GameComponent) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">{meta.emoji}</span>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">{meta.name}</h1>
        <p className="text-gray-500 mb-8">Este juego estará disponible próximamente.</p>
        <Button onClick={() => navigate('/juegos')}>🎮 Volver a juegos</Button>
      </div>
    )
  }

  function handleComplete(gameResult: GameResult) {
    saveResult(meta.id, meta.skillCategory, gameResult)
    setResult(gameResult)
  }

  function handleReplay() {
    setResult(null)
    setPlayCount((c) => c + 1)
  }

  if (result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">{result.completed ? '🎉' : '⏱️'}</span>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          {result.completed ? '¡Bien hecho!' : 'Buen intento'}
        </h1>
        <p className="text-gray-500 mb-1">Puntaje: {result.score} / {result.maxScore}</p>
        <p className="text-gray-400 mb-8 text-sm">Tiempo: {result.timeSeconds}s</p>
        <div className="flex gap-3">
          <Button onClick={handleReplay}>🔁 Jugar de nuevo</Button>
          <Button variant="secondary" onClick={() => navigate('/juegos')}>🎮 Volver a juegos</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-10">
      <Suspense fallback={<div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>}>
        <GameComponent key={playCount} meta={meta} onComplete={handleComplete} onExit={() => navigate('/juegos')} />
      </Suspense>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/pages/GamePlayer.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm run test:run`
Expected: PASS — all existing tests plus the ones added in Tasks 1-13.

- [ ] **Step 6: Commit**

```bash
git add src/pages/GamePlayer.tsx src/pages/GamePlayer.test.tsx
git commit -m "feat: reemplazar placeholder de GamePlayer con reproductor de juegos completo"
```

---

## Self-Review Notes

- **Spec coverage:** architecture/registry (Task 9), all 8 playable games (Tasks 1-8), 42 metadata-only entries (Task 9 + inline addendum), catalog page with search/filters (Tasks 11-12), player with 3 states + progress integration (Task 13), testing plan (registry/GameCard/per-game scoring/GamePlayer tests in Tasks 1-10, 13) — all covered.
- **Type consistency:** every game's `computeXScore` return shape (`{ score, maxScore, completed }`) matches how `GamePlayer` merges `timeSeconds` before calling `onComplete`, which matches `GameResult` from `src/types/game.ts`. `GAME_COMPONENTS` keys in Task 9 match the 8 `id` values used in the same task's `GAMES` array and in Task 13's test.
- **Known gap flagged inline:** Task 9's `GAMES` array is written out to 45 entries directly in the plan (to keep the task readable) with a follow-up block of 5 more entries and an explicit instruction to merge them in before running the test — this is intentional, not a placeholder, since the exact content of those 5 is fully specified. Total: 45 + 5 = 50, verified by recount during self-review.
