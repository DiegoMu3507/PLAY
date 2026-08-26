import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MathFocus({ onComplete }: { onComplete?: () => void }) {
  const [problem, setProblem] = useState({ q: '', a: 0, options: [] as number[] });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [distractions, setDistractions] = useState<number[]>([]);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const isAdd = Math.random() > 0.5;
    const q = isAdd ? `${a} + ${b}` : `${a + b} - ${b}`;
    const ans = isAdd ? a + b : a;

    const options = [ans];
    while (options.length < 4) {
      const wrong = ans + Math.floor(Math.random() * 10) - 5;
      if (wrong !== ans && wrong > 0 && !options.includes(wrong)) {
        options.push(wrong);
      }
    }
    
    setProblem({
      q,
      a: ans,
      options: options.sort(() => Math.random() - 0.5)
    });

    // Añadir distracciones aleatorias
    if (Math.random() > 0.5) {
      setDistractions(prev => [...prev, Date.now()]);
    }
  };

  useEffect(() => {
    if (gameOver) return;
    generateProblem();

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameOver(true);
          if (onComplete) onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, onComplete]);

  // Limpiar distracciones
  useEffect(() => {
    if (distractions.length > 0) {
      const timer = setTimeout(() => {
        setDistractions(prev => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [distractions]);

  const handleAnswer = (ans: number) => {
    if (ans === problem.a) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
    generateProblem();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setDistractions([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative min-h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-8 z-10 relative">
        <div className="text-xl font-bold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl">
          Tiempo: {timeLeft}s
        </div>
        <div className="text-xl font-bold bg-pink-50 text-pink-700 px-4 py-2 rounded-xl">
          Puntos: {score}
        </div>
      </div>

      {!gameOver ? (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="text-6xl font-extrabold text-gray-800 mb-12">
            {problem.q} = ?
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10">
            {problem.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-2xl font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-md"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Distractions layer */}
          <AnimatePresence>
            {distractions.map(id => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0, x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 }}
                animate={{ opacity: 1, scale: 1.5, rotate: Math.random() * 360 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute text-5xl pointer-events-none z-0 opacity-50"
              >
                {['🦄', '🌈', '🍭', '🎈', '🎉'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">🧮</span>
          <h2 className="text-3xl font-bold mb-2">¡Tiempo Acabado!</h2>
          <p className="text-xl mb-6 text-gray-600">Puntuación Final: {score}</p>
          <button 
            onClick={startGame}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-xl"
          >
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
