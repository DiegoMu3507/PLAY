import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { getArticleBySlug, articles, CATEGORY_COLORS } from '../data/articles'
import { Button } from '../components/shared/Button'
import { ArticleCard } from '../components/info/ArticleCard'

export default function InfoArticle() {
  const { slug } = useParams<{ slug: string }>()
  const navigate  = useNavigate()
  const article   = getArticleBySlug(slug ?? '')

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-6xl mb-4">📄</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Artículo no encontrado</h1>
        <p className="text-gray-500 mb-6">El artículo que buscas no existe.</p>
        <Link to="/informacion"><Button>← Volver a Información</Button></Link>
      </div>
    )
  }

  const related = articles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate('/informacion')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-8 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Volver a Información
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-4">
          <span className={['text-xs font-semibold px-3 py-1 rounded-full', CATEGORY_COLORS[article.category]].join(' ')}>
            {article.categoryLabel}
          </span>
          <span className="text-xs text-gray-400">📖 {article.readTime} min de lectura</span>
          {article.targetAudience === 'children' && (
            <span className="text-xs text-yellow-500 font-semibold">Para niños ⭐</span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{article.emoji}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{article.title}</h1>
        </div>

        <p className="text-lg text-gray-500 leading-relaxed mb-8 pb-8 border-b border-gray-100">
          {article.summary}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="prose prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-li:text-gray-600 prose-li:leading-relaxed
          prose-strong:text-gray-800
          prose-blockquote:border-primary-400 prose-blockquote:bg-primary-50 prose-blockquote:rounded-xl prose-blockquote:py-1 prose-blockquote:px-4
          prose-hr:border-gray-100"
      >
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </motion.div>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-5">Artículos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(a => (
              <ArticleCard
                key={a.slug}
                article={a}
                onClick={() => navigate(`/informacion/${a.slug}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
