import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { useOnline } from './useOnline'
import { useProgressStore } from '../store/progressStore'

export function useProgressSync() {
  const { user } = useAuth()
  const isOnline = useOnline()
  const { local, pendingSync, clearLocal, setPendingSync } = useProgressStore()

  useEffect(() => {
    if (!user || !isOnline || !pendingSync) return

    async function sync() {
      const entries = Object.values(local)
      if (entries.length === 0) return

      for (const entry of entries) {
        await supabase.from('progress').upsert(
          {
            user_id:        user!.id,
            game_id:        entry.gameId,
            best_score:     entry.bestScore,
            times_played:   entry.timesPlayed,
            skill_category: entry.skillCategory,
            updated_at:     new Date().toISOString(),
          },
          { onConflict: 'user_id,game_id' }
        )
      }

      clearLocal()
      setPendingSync(false)
    }

    sync()
  }, [user, isOnline, pendingSync, local, clearLocal, setPendingSync])
}
