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
