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
