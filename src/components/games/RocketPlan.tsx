import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTS = [
  { id: 'punta', emoji: '🔺', name: 'Punta' },
  { id: 'cuerpo', emoji: '🟦', name: 'Cuerpo' },
  { id: 'motor', emoji: '🔥', name: 'Motor' },
];

export function RocketPlan({ onComplete }: { onComplete?: () => void }) {
  const [available, setAvailable] = useState([...PARTS].sort(() => Math.random() - 0.5));
  const [assembled, setAssembled] = useState<typeof PARTS>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const expectedOrder = ['punta', 'cuerpo', 'motor'];

  const handleSelect = (part: typeof PARTS[0]) => {
    if (success) return;
    
    // Check if it's the correct next part (top to bottom)
    const nextExpectedId = expectedOrder[assembled.length];
    
    if (part.id === nextExpectedId) {
      setAssembled([...assembled, part]);
      setAvailable(available.filter(p => p.id !== part.id));
      setError(false);
      
      if (assembled.length + 1 === expectedOrder.length) {
        setSuccess(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 min-h-[500px] flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Planeta Cohete</h2>
        <p className="text-gray-500">Arma el cohete desde la punta hasta el motor en el orden correcto.</p>
      </div>

      <div className="flex-1 flex gap-8">
        {/* Zona de piezas disponibles */}
        <div className="flex-1 bg-orange-50 rounded-2xl p-4 border-2 border-orange-200 border-dashed flex flex-col gap-4 items-center justify-center">
          <h3 className="text-sm font-bold text-orange-800 w-full text-center mb-2">Piezas Sueltas</h3>
          <AnimatePresence>
            {available.map(part => (
              <motion.button
                key={part.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(part)}
                className={`bg-white text-5xl p-4 rounded-xl shadow-sm border-2 ${error ? 'border-red-300' : 'border-gray-200'}`}
              >
                {part.emoji}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Zona de ensamblaje */}
        <div className="flex-1 bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 flex flex-col items-center justify-start relative">
          <h3 className="text-sm font-bold text-blue-800 w-full text-center mb-4">Ensamblaje</h3>
          
          <div className="flex flex-col items-center flex-1 justify-center gap-1">
            {assembled.map((part) => (
              <motion.div
                key={part.id}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl"
              >
                {part.emoji}
              </motion.div>
            ))}
            
            {/* Outline placeholder for next piece */}
            {!success && (
              <div className="w-16 h-16 border-2 border-blue-300 border-dashed rounded-lg opacity-50" />
            )}
          </div>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -200, opacity: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeIn" }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <span className="text-9xl">🚀</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
