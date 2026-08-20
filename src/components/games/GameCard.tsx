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
