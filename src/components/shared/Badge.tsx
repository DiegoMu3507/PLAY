import type { ReactNode } from 'react'

type BadgeVariant =
  | 'age-4-6' | 'age-7-9' | 'age-10-12' | 'age-13-16'
  | 'facil' | 'medio' | 'dificil'
  | 'skill' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const badgeStyles: Record<BadgeVariant, string> = {
  'age-4-6':   'bg-blue-100 text-blue-700',
  'age-7-9':   'bg-green-100 text-green-700',
  'age-10-12': 'bg-yellow-100 text-yellow-700',
  'age-13-16': 'bg-pink-100 text-pink-700',
  facil:       'bg-calm-100 text-calm-700',
  medio:       'bg-yellow-100 text-yellow-700',
  dificil:     'bg-red-100 text-red-700',
  skill:       'bg-lilac-100 text-lilac-600',
  default:     'bg-gray-100 text-gray-600',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        badgeStyles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
