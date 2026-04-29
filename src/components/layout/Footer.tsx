import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-extrabold text-lg text-primary-600 mb-2">
              <span className="text-2xl">🧠</span>
              <span>MenteFocal</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Juegos y recursos educativos para niños con TDAH y sus familias.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Explorar</h3>
            <ul className="space-y-2">
              {[
                { to: '/informacion', label: '📚 Información sobre TDAH' },
                { to: '/juegos',      label: '🎮 Banco de juegos' },
                { to: '/perfil',      label: '👤 Mi perfil' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Información</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Este sitio es educativo e informativo. No reemplaza el diagnóstico ni el tratamiento médico profesional.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} MenteFocal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
