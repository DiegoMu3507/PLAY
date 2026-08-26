import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS_DATA = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ onComplete }: { onComplete?: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...CARDS_DATA, ...CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map((content, idx) => ({
        id: idx,
        content,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setIsLocked(false);
  };

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].content === cards[secondIndex].content) {
        // Match!
        setTimeout(() => {
          setCards(prev => {
            const matched = [...prev];
            matched[firstIndex].isMatched = true;
            matched[secondIndex].isMatched = true;
            return matched;
          });
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === CARDS_DATA.length) {
              setGameWon(true);
              if (onComplete) onComplete();
            }
            return newMatches;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const unmatched = [...prev];
            unmatched[firstIndex].isFlipped = false;
            unmatched[secondIndex].isFlipped = false;
            return unmatched;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <div className="w-full flex justify-between items-center mb-6 px-4">
        <div className="text-gray-600 font-bold bg-gray-100 px-4 py-2 rounded-xl">
          Movimientos: <span className="text-primary-600">{moves}</span>
        </div>
        <div className="text-gray-600 font-bold bg-gray-100 px-4 py-2 rounded-xl">
          Aciertos: <span className="text-secondary-500">{matches}/{CARDS_DATA.length}</span>
        </div>
        <button 
          onClick={startNewGame}
          className="text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
        >
          🔄 Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full sm:gap-4 perspective-1000">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            whileHover={!card.isFlipped && !card.isMatched && !isLocked ? { scale: 1.05 } : {}}
            whileTap={!card.isFlipped && !card.isMatched && !isLocked ? { scale: 0.95 } : {}}
            onClick={() => handleCardClick(idx)}
            className="aspect-square cursor-pointer relative preserve-3d"
          >
            <motion.div 
              className="w-full h-full absolute inset-0 preserve-3d"
              initial={false}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Back of card (visible when face down) */}
              <div className="absolute inset-0 backface-hidden bg-primary-100 rounded-2xl border-2 border-primary-200 flex items-center justify-center">
                <span className="text-3xl opacity-50">🧠</span>
              </div>
              
              {/* Front of card (visible when face up) */}
              <div 
                className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 flex items-center justify-center text-5xl shadow-inner
                  ${card.isMatched ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'}
                `}
              >
                {card.content}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {gameWon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-8 text-center"
          >
            <span className="text-6xl block mb-2">🎉</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">¡Misión Completada!</h3>
            <p className="text-gray-600">Resolviste el tablero en {moves} movimientos.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
