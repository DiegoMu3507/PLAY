import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CalmBreath({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycles, setCycles] = useState(0);
  const targetCycles = 5;

  useEffect(() => {
    if (cycles >= targetCycles) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (phase === 'inhale') setPhase('hold');
      else if (phase === 'hold') setPhase('exhale');
      else {
        setPhase('inhale');
        setCycles(c => c + 1);
      }
    }, phase === 'hold' ? 2000 : 4000); // Inhala 4s, Sostiene 2s, Exhala 4s

    return () => clearTimeout(timer);
  }, [phase, cycles, onComplete]);

  const getInstructions = () => {
    if (cycles >= targetCycles) return '¡Muy bien! Te sientes más relajado.';
    if (phase === 'inhale') return 'Inhala profundamente...';
    if (phase === 'hold') return 'Sostén la respiración...';
    return 'Exhala suavemente...';
  };

  const getScale = () => {
    if (cycles >= targetCycles) return 1;
    if (phase === 'inhale') return 1.5;
    if (phase === 'hold') return 1.5;
    return 1;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Respiración Calma</h2>
        <p className="text-gray-500">
          Sigue el círculo para controlar tu respiración. 
          Ciclos: {Math.min(cycles, targetCycles)} / {targetCycles}
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Círculo animado */}
        <motion.div
          animate={{ scale: getScale() }}
          transition={{ duration: phase === 'hold' ? 0 : 4, ease: "easeInOut" }}
          className="absolute w-40 h-40 bg-teal-100 rounded-full border-4 border-teal-300 opacity-80 shadow-lg"
        />
        {/* Emoji central */}
        <span className="text-6xl z-10 drop-shadow-md">
          {cycles >= targetCycles ? '🧘' : phase === 'exhale' ? '😌' : '😮'}
        </span>
      </div>

      <h3 className="text-2xl font-extrabold text-teal-700 h-8">
        {getInstructions()}
      </h3>
    </div>
  );
}
