import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Item {
  id: number;
  emoji: string;
  x: number;
  isTarget: boolean;
  clicked: boolean;
}

const TARGET = '⭐';
const DISTRACTIONS = ['💣', '👻', '👾', '🕷️', '🍅'];

export function FocusNinja({ onComplete }: { onComplete?: () => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  const timerRef = useRef<number>(0);
  const spawnRef = useRef<number>(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setItems([]);
  };

  useEffect(() => {
    if (gameOver) return;
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameOver(true);
          if (onComplete) onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    spawnRef.current = window.setInterval(() => {
      const isTarget = Math.random() > 0.5;
      const emoji = isTarget ? TARGET : DISTRACTIONS[Math.floor(Math.random() * DISTRACTIONS.length)];
      
      setItems(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          emoji,
          x: Math.random() * 80 + 10, // 10% to 90%
          isTarget,
          clicked: false
        }
      ]);
    }, 800);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
    };
  }, [gameOver, onComplete]);

  const handleClick = (id: number, isTarget: boolean) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, clicked: true } : item));
    if (isTarget) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative">
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <div className="text-xl font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">
          Tiempo: {timeLeft}s
        </div>
        <div className="text-xl font-bold bg-amber-50 text-amber-700 px-4 py-2 rounded-xl">
          Puntos: {score}
        </div>
      </div>

      <div className="h-96 relative bg-gradient-to-b from-blue-900 to-indigo-900 rounded-2xl overflow-hidden border-4 border-indigo-950">
        {!gameOver ? (
          <AnimatePresence>
            {items.map(item => !item.clicked && (
              <motion.div
                key={item.id}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 500, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: item.isTarget ? 2.5 : 2, ease: "linear" }}
                onAnimationComplete={() => {
                  setItems(prev => prev.filter(i => i.id !== item.id));
                }}
                className="absolute text-5xl cursor-pointer"
                style={{ left: `${item.x}%` }}
                onPointerDown={() => handleClick(item.id, item.isTarget)}
              >
                {item.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-20">
            <span className="text-6xl mb-4">🥷</span>
            <h2 className="text-3xl font-bold mb-2">¡Tiempo Acabado!</h2>
            <p className="text-xl mb-6">Puntuación Final: {score}</p>
            <button 
              onClick={startGame}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-transform active:scale-95"
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
