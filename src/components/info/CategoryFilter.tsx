import type { ArticleCategory } from '../../data/articles'
import { CATEGORY_ACTIVE_COLORS } from '../../data/articles'

interface CategoryFilterProps {
  selected: ArticleCategory | 'all'
  onChange: (cat: ArticleCategory | 'all') => void
  counts: Record<ArticleCategory | 'all', number>
}

const ALL_CATEGORIES: Array<ArticleCategory | 'all'> = [
  'all', 'fundamentos', 'familia', 'escuela', 'salud', 'recursos',
]

const ALL_LABELS: Record<ArticleCategory | 'all', string> = {
  all:         'Todos',
  fundamentos: 'Fundamentos',
  familia:     'Familia',
  escuela:     'Escuela',
  salud:       'Salud',
  recursos:    'Recursos',
}

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_CATEGORIES.map((cat) => {
        const isActive = selected === cat
        const activeClass = cat === 'all'
          ? 'bg-gray-800 text-white'
          : CATEGORY_ACTIVE_COLORS[cat as ArticleCategory]

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              'px-4 py-1.5 rounded-full text-sm font-semibold transition-all',
              isActive ? activeClass : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ].join(' ')}
          >
            {ALL_LABELS[cat]}
            <span className="ml-1.5 text-xs opacity-75">({counts[cat]})</span>
          </button>
        )
      })}
    </div>
  )
}
