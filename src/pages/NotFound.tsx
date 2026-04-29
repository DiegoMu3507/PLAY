import { Link } from 'react-router-dom'
import { Button } from '../components/shared/Button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-8xl mb-6">🔍</span>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Página no encontrada</h1>
      <p className="text-gray-500 mb-8">¡Ups! Esta página no existe o se movió a otro lugar.</p>
      <Link to="/"><Button>🏠 Volver al inicio</Button></Link>
    </div>
  )
}
