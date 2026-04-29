import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameResult, SkillCategory } from '../types/game'

interface LocalProgress {
  gameId: string
  skillCategory: SkillCategory
  bestScore: number
  timesPlayed: number
  lastPlayed: string
}

interface ProgressState {
  local: Record<string, LocalProgress>
  pendingSync: boolean
  saveResult: (gameId: string, skillCategory: SkillCategory, result: GameResult) => void
  clearLocal: () => void
  setPendingSync: (pending: boolean) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      local: {},
      pendingSync: false,
      saveResult: (gameId, skillCategory, result) => {
        const existing = get().local[gameId]
        set((state) => ({
          local: {
            ...state.local,
            [gameId]: {
              gameId,
              skillCategory,
              bestScore: Math.max(existing?.bestScore ?? 0, result.score),
              timesPlayed: (existing?.timesPlayed ?? 0) + 1,
              lastPlayed: new Date().toISOString(),
            },
          },
          pendingSync: true,
        }))
      },
      clearLocal: () => set({ local: {}, pendingSync: false }),
      setPendingSync: (pending) => set({ pendingSync: pending }),
    }),
    { name: 'tdah-progress' }
  )
)
