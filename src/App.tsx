import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Spinner } from './components/shared/Spinner'
import { useAuth } from './hooks/useAuth'
import { useProgressSync } from './hooks/useProgressSync'

const Home        = lazy(() => import('./pages/Home'))
const Login       = lazy(() => import('./pages/Login'))
const InfoHub     = lazy(() => import('./pages/InfoHub'))
const InfoArticle = lazy(() => import('./pages/InfoArticle'))
const GamesPage   = lazy(() => import('./pages/GamesPage'))
const GamePlayer  = lazy(() => import('./pages/GamePlayer'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const NotFound    = lazy(() => import('./pages/NotFound'))

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  useAuth()
  useProgressSync()

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="flex items-center justify-center h-64"><Spinner size="lg" /></div>}>
            <Routes>
              <Route path="/"                  element={<Home />} />
              <Route path="/login"             element={<Login />} />
              <Route path="/informacion"       element={<InfoHub />} />
              <Route path="/informacion/:slug" element={<InfoArticle />} />
              <Route path="/juegos"            element={<GamesPage />} />
              <Route path="/juegos/:id"        element={<GamePlayer />} />
              <Route path="/perfil"            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
