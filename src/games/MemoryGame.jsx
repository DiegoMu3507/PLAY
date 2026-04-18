import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestion, FaStar, FaUndo } from 'react-icons/fa';

const CARD_ICONS = ['🚀', '🎨', '🧩', '🎸', '⚽', '🍦'];
const ALL_CARDS = [...CARD_ICONS, ...CARD_ICONS];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = ALL_CARDS
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffled);
    setSolved([]);
    setFlipped([]);
    setDisabled(false);
  };

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].icon === cards[secondId].icon) {
        setSolved(prev => [...prev, firstId, secondId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || solved.includes(card.id);
          const isSolved = solved.includes(card.id);

          return (
            <div
              key={card.id}
              className="perspective-1000 w-16 h-16 md:w-24 md:h-24 cursor-pointer"
              onClick={() => handleCardClick(card.id)}
            >
              <motion.div
                className="relative w-full h-full transition-all duration-500 preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* Front (Hidden) */}
                <div className="absolute inset-0 w-full h-full backface-hidden glass-panel flex items-center justify-center border-zinc-700 bg-zinc-900/50">
                  <FaQuestion className="text-zinc-700 text-xl" />
                </div>
                
                {/* Back (Visible) */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center text-4xl rounded-3xl border-2 ${
                    isSolved ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-violet-500/10 border-violet-500/50'
                  }`}
                >
                  {card.icon}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <AnimatePresence>
          {solved.length === cards.length && cards.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full p-6 glass-panel bg-emerald-500/10 border-emerald-500/30 text-center"
            >
              <FaStar className="text-emerald-400 text-3xl mx-auto mb-2" />
              <h3 className="text-xl font-bold text-white mb-1">¡Objetivo Logrado!</h3>
              <p className="text-emerald-400/80 text-sm mb-4">Tu concentración ha sido impecable.</p>
              <button 
                onClick={shuffleCards} 
                className="btn btn-sm btn-ghost hover:bg-emerald-500/20 text-emerald-400"
              >
                Volver a Jugar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={shuffleCards} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
        >
          <FaUndo className="text-xs" /> Reiniciar Tablero
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
