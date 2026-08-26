import { useParams, Link, useNavigate } from 'react-router-dom';
import { MemoryGame } from '../components/games/MemoryGame';
import { mockGames } from '../data/mockGames';
import { Button } from '../components/shared/Button';

export default function GamePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = mockGames.find(g => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <span className="text-6xl mb-4 block">😢</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Juego no encontrado</h2>
        <p className="text-gray-500 mb-6">Parece que este juego no existe o ha sido movido.</p>
        <Link to="/juegos">
          <Button>Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    // Aquí podríamos guardar el progreso en Supabase / Zustand
    console.log('Juego completado:', game.title);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Game Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/juegos')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Volver"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl bg-gray-50 p-2 rounded-xl">{game.icon}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{game.title}</h1>
              <p className="text-xs text-gray-500 font-semibold">{game.skill}</p>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${game.color}`}>
            {game.ageGroup} años
          </span>
        </div>
      </header>

      {/* Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        {game.id === 'memory-match' ? (
          <MemoryGame onComplete={handleComplete} />
        ) : (
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
            <span className="text-6xl block mb-4">🚧</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">En construcción</h2>
            <p className="text-gray-500 mb-6">
              El juego <strong>"{game.title}"</strong> está siendo desarrollado por nuestro equipo. ¡Vuelve pronto!
            </p>
            <Button onClick={() => navigate('/juegos')} variant="secondary" className="w-full">
              Probar otro juego
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
