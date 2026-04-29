import { motion } from 'framer-motion'
import type { Article } from '../../data/articles'
import { CATEGORY_COLORS } from '../../data/articles'

interface ArticleCardProps {
  article: Article
  onClick?: () => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <motion.article
      role="article"
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer flex flex-col gap-3 h-full"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{article.emoji}</span>
        <span className={['text-xs font-semibold px-2.5 py-0.5 rounded-full', CATEGORY_COLORS[article.category]].join(' ')}>
          {article.categoryLabel}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1 text-base leading-snug">{article.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{article.summary}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
        <span>📖 {article.readTime} min de lectura</span>
        {article.targetAudience === 'children' && (
          <span className="text-yellow-500 font-semibold">Para niños ⭐</span>
        )}
      </div>
    </motion.article>
  )
}
