import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LoginModal } from './LoginModal'
import { Button } from '../shared/Button'

export function UserAvatar() {
  const { user, profile, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  if (!user) {
    return (
      <>
        <Button size="sm" onClick={() => setShowLogin(true)}>
          Entrar
        </Button>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </>
    )
  }

  const initials = profile?.name
    ? profile.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : user.email?.[0].toUpperCase() ?? '?'

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-9 h-9 rounded-full bg-primary-500 text-white font-bold text-sm flex items-center justify-center hover:bg-primary-600 transition-colors"
        aria-label="Menú de usuario"
      >
        {initials}
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-11 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 min-w-[180px] overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-sm text-gray-800 truncate">{profile?.name ?? 'Usuario'}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <Link
              to="/perfil"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>👤</span> Mi perfil
            </Link>
            <button
              onClick={() => { logout(); setMenuOpen(false) }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span> Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}
