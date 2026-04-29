import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/shared/Button'

const features = [
  { emoji: '🎮', title: '50 juegos interactivos', desc: 'Diseñados para mejorar atención, memoria, control de impulsos y más.' },
  { emoji: '📚', title: '16 guías informativas',  desc: 'Todo lo que padres y cuidadores necesitan saber sobre el TDAH.' },
  { emoji: '🏆', title: 'Sistema de logros',       desc: 'Seguimiento de progreso con logros y estadísticas por habilidad.' },
  { emoji: '👨‍👩‍👧', title: 'Perfil familiar',      desc: 'Un padre puede gestionar múltiples perfiles de hijos.' },
]

const ageGroups = [
  { label: 'Exploradores',  range: '4–6 años',   emoji: '🔍', color: 'bg-blue-100   text-blue-700'   },
  { label: 'Aventureros',   range: '7–9 años',   emoji: '⚔️', color: 'bg-green-100  text-green-700'  },
  { label: 'Descubridores', range: '10–12 años', emoji: '🔭', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Pioneros',      range: '13–16 años', emoji: '🚀', color: 'bg-pink-100   text-pink-700'   },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-calm-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-6xl mb-4 block">🧠</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Aprende y juega con<br />
              <span className="text-primary-600">mente enfocada</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              50 juegos interactivos y recursos informativos para niños con TDAH y sus familias.
              Sin registrarte — entra y juega ya.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/juegos">
                <Button size="lg">🎮 Jugar ahora</Button>
              </Link>
              <Link to="/informacion">
                <Button size="lg" variant="secondary">📚 Aprender sobre TDAH</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Age groups */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-2">Juegos para cada edad</h2>
          <p className="text-center text-gray-500 mb-10">Contenido adaptado por rango de edad y dificultad</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ageGroups.map(({ label, range, emoji, color }) => (
              <Link key={label} to={`/juegos?edad=${range.split('–')[0]}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={['rounded-2xl p-5 text-center cursor-pointer', color].join(' ')}
                >
                  <span className="text-3xl block mb-2">{emoji}</span>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{range}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-10">¿Qué ofrece MenteFocal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                <span className="text-3xl shrink-0">{emoji}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-600 text-white text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">¿Listo para empezar?</h2>
        <p className="text-primary-100 mb-8 text-lg">No necesitas crear una cuenta. Entra, juega y aprende.</p>
        <Link to="/juegos">
          <Button variant="secondary" size="lg">🎮 Ver todos los juegos</Button>
        </Link>
      </section>
    </div>
  )
}
