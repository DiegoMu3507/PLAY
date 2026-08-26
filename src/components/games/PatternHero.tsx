import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  { id: 0, color: 'bg-red-500', active: 'bg-red-300', note: '🔴' },
  { id: 1, color: 'bg-blue-500', active: 'bg-blue-300', note: '🔵' },
  { id: 2, color: 'bg-green-500', active: 'bg-green-300', note: '🟢' },
  { id: 3, color: 'bg-yellow-500', active: 'bg-yellow-300', note: '🟡' },
];

export function PatternHero({ onComplete }: { onComplete?: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const targetScore = 5;

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    // Wait a bit before starting
    await new Promise(r => setTimeout(r, 1000));
    
    for (let i = 0; i < seq.length; i++) {
      setActiveButton(seq[i]);
      await new Promise(r => setTimeout(r, 500));
      setActiveButton(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsPlaying(false);
  };

  const nextRound = () => {
    const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(nextSeq);
    setPlayerStep(0);
    playSequence(nextSeq);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setSequence([]);
    setPlayerStep(0);
    // Start first round
    const initialSeq = [Math.floor(Math.random() * 4)];
    setSequence(initialSeq);
    playSequence(initialSeq);
  };

  const handlePlayerClick = (id: number) => {
    if (isPlaying || gameOver || sequence.length === 0) return;

    // Visual feedback
    setActiveButton(id);
    setTimeout(() => setActiveButton(null), 200);

    if (id === sequence[playerStep]) {
      // Correct step
      const nextStep = playerStep + 1;
      setPlayerStep(nextStep);

      if (nextStep === sequence.length) {
        // Finished sequence
        const newScore = score + 1;
        setScore(newScore);
        
        if (newScore >= targetScore) {
          setGameOver(true);
          if (onComplete) onComplete();
        } else {
          setTimeout(nextRound, 1000);
        }
      }
    } else {
      // Wrong step!
      setGameOver(true);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center min-h-[400px]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Héroe de Patrones</h2>
        <p className="text-gray-500">Memoriza y repite la secuencia de colores.</p>
        <div className="mt-2 text-primary-600 font-bold">Ronda: {score} / {targetScore}</div>
      </div>

      {!gameOver ? (
        <div className="grid grid-cols-2 gap-4 w-64 h-64">
          {COLORS.map(c => (
            <motion.button
              key={c.id}
              whileTap={!isPlaying ? { scale: 0.95 } : {}}
              onClick={() => handlePlayerClick(c.id)}
              disabled={isPlaying || sequence.length === 0}
              className={`rounded-2xl transition-colors duration-200 ${
                activeButton === c.id ? c.active : c.color
              } ${isPlaying ? 'cursor-default' : 'cursor-pointer hover:brightness-110'}`}
              style={{
                boxShadow: activeButton === c.id ? '0 0 20px rgba(255,255,255,0.8)' : 'none'
              }}
            >
              <span className="text-4xl opacity-50">{c.note}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">{score >= targetScore ? '🦸‍♂️' : '💥'}</span>
          <h3 className="text-2xl font-bold mb-2">
            {score >= targetScore ? '¡Completado!' : '¡Te equivocaste!'}
          </h3>
          <p className="text-gray-600 mb-6">Llegaste a la ronda {score}.</p>
          <button 
            onClick={startGame}
            className="bg-primary-500 text-white px-6 py-2 rounded-xl font-bold"
          >
            {score >= targetScore ? 'Jugar de nuevo' : 'Reintentar'}
          </button>
        </div>
      )}

      {sequence.length === 0 && !gameOver && (
        <button 
          onClick={startGame}
          className="mt-8 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-xl"
        >
          Comenzar
        </button>
      )}
    </div>
  );
}
