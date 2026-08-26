import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type GameState = 'waiting' | 'ready' | 'clicked' | 'too-early' | 'success';

export function ReactionBox({ onComplete }: { onComplete?: () => void }) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTime = useRef<number>(0);
  const timeoutRef = useRef<number>(0);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    const delay = Math.random() * 3000 + 1500; // 1.5s to 4.5s
    
    timeoutRef.current = window.setTimeout(() => {
      setGameState('ready');
      startTime.current = Date.now();
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setGameState('too-early');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime.current;
      setReactionTime(time);
      setGameState('success');
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    } else if (gameState === 'too-early' || gameState === 'success') {
      startGame();
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting': return 'bg-red-500';
      case 'ready': return 'bg-green-500';
      case 'too-early': return 'bg-orange-500';
      case 'success': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'waiting': return 'Espera al verde...';
      case 'ready': return '¡HAZ CLIC AHORA!';
      case 'too-early': return '¡Demasiado pronto! Haz clic para reintentar.';
      case 'success': return `¡Excelente! Tiempo: ${reactionTime}ms`;
      default: return 'Haz clic para empezar';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Caja de Reflejos</h2>
      
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`w-64 h-64 rounded-3xl cursor-pointer flex items-center justify-center text-center p-4 transition-colors ${getBackgroundColor()}`}
      >
        <span className="text-white font-bold text-xl select-none">
          {getMessage()}
        </span>
      </motion.div>

      {gameState === 'waiting' && !startTime.current && (
        <button 
          onClick={startGame}
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl font-bold"
        >
          Comenzar
        </button>
      )}
    </div>
  );
}
