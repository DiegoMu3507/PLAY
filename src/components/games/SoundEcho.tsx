import { useState } from 'react';
import { motion } from 'framer-motion';

const ZONES = [
  { id: 'top-left', label: '↖️' },
  { id: 'top-right', label: '↗️' },
  { id: 'bottom-left', label: '↙️' },
  { id: 'bottom-right', label: '↘️' }
];

export function SoundEcho({ onComplete }: { onComplete?: () => void }) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [targetZone, setTargetZone] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const targetScore = 5;

  const playRound = async () => {
    setIsPlaying(true);
    await new Promise(r => setTimeout(r, 1000));
    
    const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
    setTargetZone(zone.id);
    setActiveZone(zone.id);
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      
      const freqs: Record<string, number> = {
        'top-left': 300,
        'top-right': 400,
        'bottom-left': 500,
        'bottom-right': 600
      };
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freqs[zone.id], ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}

    await new Promise(r => setTimeout(r, 500));
    setActiveZone(null);
    setIsPlaying(false);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    playRound();
  };

  const handleGuess = (id: string) => {
    if (isPlaying || gameOver || !targetZone) return;

    if (id === targetZone) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= targetScore) {
        setGameOver(true);
        if (onComplete) onComplete();
      } else {
        playRound();
      }
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 rounded-3xl shadow-xl border border-gray-800 flex flex-col items-center min-h-[400px]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Eco Sonoro</h2>
        <p className="text-gray-400">Escucha y mira de dónde viene la señal.</p>
        <div className="mt-2 text-purple-400 font-bold">Aciertos: {score} / {targetScore}</div>
      </div>

      {!gameOver ? (
        <div className="grid grid-cols-2 gap-4 w-64 h-64">
          {ZONES.map(z => (
            <motion.button
              key={z.id}
              whileTap={!isPlaying ? { scale: 0.9 } : {}}
              onClick={() => handleGuess(z.id)}
              className={`rounded-2xl flex items-center justify-center text-4xl transition-colors duration-200 ${
                activeZone === z.id ? 'bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <span className="opacity-50">{z.label}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">{score >= targetScore ? '🎧' : '💥'}</span>
          <h3 className="text-2xl font-bold mb-2 text-white">
            {score >= targetScore ? '¡Completado!' : '¡Te equivocaste!'}
          </h3>
          <button 
            onClick={startGame}
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl"
          >
            {score >= targetScore ? 'Jugar de nuevo' : 'Reintentar'}
          </button>
        </div>
      )}

      {score === 0 && !isPlaying && !gameOver && (
        <button 
          onClick={startGame}
          className="mt-8 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl"
        >
          Empezar a escuchar
        </button>
      )}
    </div>
  );
}
