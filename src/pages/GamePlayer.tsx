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

  const found = GAMES.find((g) => g.id === id)
  if (!found) return <NotFound />
  const meta = found

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
