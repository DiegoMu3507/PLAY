import { useProgressStore } from '../store/progressStore';
import { mockGames } from '../data/mockGames';
import { motion } from 'framer-motion';

export default function RewardsPage() {
  const { local } = useProgressStore();
  const progressArray = Object.values(local);
  
  const totalGamesPlayed = progressArray.length;
  const totalMatches = progressArray.reduce((acc, curr) => acc + curr.timesPlayed, 0);

  // Categorías completadas
  const gamesByCategory = mockGames.reduce((acc, game) => {
    acc[game.skill] = (acc[game.skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const playedByCategory = progressArray.reduce((acc, prog) => {
    acc[prog.skillCategory] = (acc[prog.skillCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const allAttention = (playedByCategory['Atención'] || 0) >= (gamesByCategory['Atención'] || 0);
  const allMemory = (playedByCategory['Memoria'] || 0) >= (gamesByCategory['Memoria'] || 0);

  const achievements = [
    { id: 'first-game', title: 'Primeros Pasos', desc: 'Jugaste tu primer juego', icon: '🐣', earned: totalGamesPlayed > 0 },
    { id: 'five-games', title: 'Explorador', desc: 'Jugaste 5 juegos diferentes', icon: '🧭', earned: totalGamesPlayed >= 5 },
    { id: 'ten-matches', title: 'Constante', desc: 'Completaste 10 partidas en total', icon: '🔥', earned: totalMatches >= 10 },
    { id: 'all-attention', title: 'Mente Enfocada', desc: 'Completaste todos los juegos de Atención', icon: '🎯', earned: allAttention && gamesByCategory['Atención'] > 0 },
    { id: 'all-memory', title: 'Memoria de Elefante', desc: 'Completaste todos los juegos de Memoria', icon: '🐘', earned: allMemory && gamesByCategory['Memoria'] > 0 },
    { id: 'master', title: 'Maestro TDAH', desc: 'Jugaste todos los juegos disponibles', icon: '👑', earned: totalGamesPlayed === mockGames.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-6xl block mb-4">🏆</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Sala de Trofeos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aquí puedes ver todas las medallas que has desbloqueado. ¡Sigue jugando y entrenando para conseguirlas todas!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-3xl p-6 border-2 flex flex-col items-center text-center transition-all ${
                ach.earned 
                  ? 'bg-amber-50 border-amber-300 shadow-sm' 
                  : 'bg-white border-gray-100 opacity-60 grayscale hover:grayscale-0'
              }`}
            >
              <span className={`text-6xl mb-4 ${ach.earned ? 'drop-shadow-md' : 'opacity-50'}`}>
                {ach.icon}
              </span>
              <h3 className={`text-xl font-bold mb-2 ${ach.earned ? 'text-amber-900' : 'text-gray-500'}`}>
                {ach.title}
              </h3>
              <p className={`text-sm ${ach.earned ? 'text-amber-700' : 'text-gray-400'}`}>
                {ach.desc}
              </p>
              
              {!ach.earned && (
                <div className="absolute top-3 right-3 bg-gray-200 text-gray-500 text-xs font-bold px-2 py-1 rounded-lg">
                  Bloqueado
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
