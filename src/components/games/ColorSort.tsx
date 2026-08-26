import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = [
  { id: 'red', code: 'bg-red-500' },
  { id: 'blue', code: 'bg-blue-500' },
  { id: 'green', code: 'bg-green-500' },
];

export function ColorSort({ onComplete }: { onComplete?: () => void }) {
  const [items, setItems] = useState<{id: string, color: string, x: number}[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const spawnRef = useRef<number>(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setItems([]);
  };

  useEffect(() => {
    if (gameOver) return;

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

    spawnRef.current = window.setInterval(() => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      setItems(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          color: color.id,
          x: Math.random() * 80 + 10
        }
      ]);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(spawnRef.current);
    };
  }, [gameOver, onComplete]);

  const handleDragEnd = (_event: any, info: any, item: any) => {
    // Determine which bucket it was dropped in based on x coordinate
    // Simplification: screen divided into 3 zones
    const dropX = info.point.x;
    const windowWidth = window.innerWidth;
    
    let bucket = '';
    if (dropX < windowWidth / 3) bucket = 'red';
    else if (dropX < (windowWidth * 2) / 3) bucket = 'blue';
    else bucket = 'green';

    if (bucket === item.color) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }

    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center h-[500px] relative overflow-hidden">
      <div className="w-full flex justify-between items-center mb-4 z-20 relative px-4">
        <span className="font-bold text-xl text-blue-700">Tiempo: {timeLeft}s</span>
        <span className="font-bold text-xl text-green-700">Puntos: {score}</span>
      </div>

      {!gameOver ? (
        <>
          <div className="flex-1 w-full relative z-10">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.id}
                  drag
                  dragSnapToOrigin
                  onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ scale: 0 }}
                  className={`absolute w-12 h-12 rounded-full cursor-grab active:cursor-grabbing shadow-md ${COLORS.find(c => c.id === item.color)?.code}`}
                  style={{ left: `${item.x}%` }}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="w-full h-32 flex justify-between gap-4 mt-auto z-0">
            <div className="flex-1 bg-red-100 border-4 border-red-500 rounded-t-2xl flex items-end justify-center pb-2">
              <span className="font-bold text-red-700">Rojo</span>
            </div>
            <div className="flex-1 bg-blue-100 border-4 border-blue-500 rounded-t-2xl flex items-end justify-center pb-2">
              <span className="font-bold text-blue-700">Azul</span>
            </div>
            <div className="flex-1 bg-green-100 border-4 border-green-500 rounded-t-2xl flex items-end justify-center pb-2">
              <span className="font-bold text-green-700">Verde</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-4">Fin del Juego</h2>
          <p className="text-2xl mb-6">Puntos: {score}</p>
          <button 
            onClick={startGame}
            className="bg-primary-500 text-white font-bold px-8 py-3 rounded-xl"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
