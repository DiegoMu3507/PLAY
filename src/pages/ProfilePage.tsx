import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { mockGames } from '../data/mockGames';
import { Button } from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, profile } = useAuthStore();
  const { local } = useProgressStore();
  const navigate = useNavigate();

  const progressArray = Object.values(local);
  const totalGamesPlayed = progressArray.length;
  const totalMatches = progressArray.reduce((acc, curr) => acc + curr.timesPlayed, 0);

  // Calcular medallas basadas en progreso
  const achievements = [
    { id: 'first-game', title: 'Primeros Pasos', desc: 'Jugaste tu primer juego', icon: '🐣', earned: totalGamesPlayed > 0 },
    { id: 'five-games', title: 'Explorador', desc: 'Jugaste 5 juegos diferentes', icon: '🧭', earned: totalGamesPlayed >= 5 },
    { id: 'ten-matches', title: 'Constante', desc: 'Completaste 10 partidas', icon: '🔥', earned: totalMatches >= 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-6xl block mb-4">🏆</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mi Progreso</h1>
          <p className="text-gray-500">
            {profile?.type === 'parent' ? 'Panel de control familiar' : 'Tus estadísticas y logros'}
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase() || '👤'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.email || 'Jugador'}</h2>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {profile?.type === 'parent' ? 'Padre/Tutor' : 'Estudiante'}
              </span>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate('/juegos')}>Ir a jugar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>📊</span> Estadísticas Generales
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl text-center">
                <span className="text-3xl block mb-1">🎮</span>
                <span className="block text-2xl font-extrabold text-blue-700">{totalGamesPlayed}</span>
                <span className="text-xs font-bold text-blue-600/70 uppercase">Juegos Probados</span>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl text-center">
                <span className="text-3xl block mb-1">🎯</span>
                <span className="block text-2xl font-extrabold text-green-700">{totalMatches}</span>
                <span className="text-xs font-bold text-green-600/70 uppercase">Partidas Jugadas</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>🏅</span> Medallas y Logros
            </h3>
            <div className="space-y-4">
              {achievements.map(ach => (
                <div key={ach.id} className={`flex items-center gap-4 p-3 rounded-xl border ${ach.earned ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-100 opacity-50 grayscale'}`}>
                  <span className="text-4xl">{ach.icon}</span>
                  <div>
                    <h4 className={`font-bold ${ach.earned ? 'text-amber-900' : 'text-gray-700'}`}>{ach.title}</h4>
                    <p className={`text-xs ${ach.earned ? 'text-amber-700/80' : 'text-gray-500'}`}>{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Played */}
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>⏳</span> Jugados Recientemente
          </h3>
          {progressArray.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {progressArray.sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()).slice(0, 3).map(prog => {
                const gameInfo = mockGames.find(g => g.id === prog.gameId);
                return (
                  <div key={prog.gameId} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary-200 transition-colors">
                    <span className="text-3xl bg-gray-50 p-2 rounded-xl">{gameInfo?.icon || '🎮'}</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{gameInfo?.title || prog.gameId}</h4>
                      <p className="text-xs text-gray-500">Jugado {prog.timesPlayed} veces</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Aún no has jugado ningún juego.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
