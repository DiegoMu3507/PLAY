import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import type { ArticleCategory } from '../data/articles'
import { ArticleCard } from '../components/info/ArticleCard'
import { CategoryFilter } from '../components/info/CategoryFilter'

export default function InfoHub() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<ArticleCategory | 'all'>('all')
  const [search, setSearch]     = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return articles.filter(a => {
      const matchCat    = category === 'all' || a.category === category
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [category, search])

  const counts = useMemo(() => {
    const base = { all: articles.length, fundamentos: 0, familia: 0, escuela: 0, salud: 0, recursos: 0 }
    articles.forEach(a => { base[a.category]++ })
    return base
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-5xl block mb-3">📚</span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Información sobre TDAH</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          16 guías escritas con claridad y empatía para niños, padres y cuidadores.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white text-sm"
          />
        </div>
      </div>

      <div className="mb-8 flex justify-center">
        <CategoryFilter selected={category} onChange={setCategory} counts={counts} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="text-5xl block mb-3">🔍</span>
          <p>No se encontraron artículos con esa búsqueda.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((article) => (
            <motion.div key={article.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ArticleCard
                article={article}
                onClick={() => navigate(`/informacion/${article.slug}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
