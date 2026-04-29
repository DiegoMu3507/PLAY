import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginModal } from '../components/auth/LoginModal'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoginModal isOpen={true} onClose={() => navigate(-1)} />
    </div>
  )
}
