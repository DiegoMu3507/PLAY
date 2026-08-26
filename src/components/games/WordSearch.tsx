import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 8;
const WORDS = ['FOCO', 'MENTE', 'JUEGO'];

// Simple word search generation for horizontal and vertical words
function generateGrid() {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  
  // Place words
  WORDS.forEach(word => {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() > 0.5;
      const r = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE : GRID_SIZE - word.length));
      const c = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE - word.length : GRID_SIZE));
      
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const rr = isHorizontal ? r : r + i;
        const cc = isHorizontal ? c + i : c;
        if (grid[rr][cc] !== '' && grid[rr][cc] !== word[i]) {
          canPlace = false;
          break;
        }
      }
      
      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const rr = isHorizontal ? r : r + i;
          const cc = isHorizontal ? c + i : c;
          grid[rr][cc] = word[i];
        }
        placed = true;
      }
    }
  });

  // Fill empty spaces
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return grid;
}

export function WordSearch({ onComplete }: { onComplete?: () => void }) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  const getCellId = (r: number, c: number) => `${r}-${c}`;

  const handlePointerDown = (r: number, c: number) => {
    setIsDragging(true);
    setSelectedCells(new Set([getCellId(r, c)]));
  };

  const handlePointerEnter = (r: number, c: number) => {
    if (isDragging) {
      setSelectedCells(prev => new Set(prev).add(getCellId(r, c)));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    
    // Simplification: just check if the selected letters form any of the words
    const selectedLetters = Array.from(selectedCells)
      .map(id => {
        const [r, c] = id.split('-').map(Number);
        return grid[r][c];
      })
      .join('');
      
    const selectedLettersReversed = selectedLetters.split('').reverse().join('');

    const found = WORDS.find(w => w === selectedLetters || w === selectedLettersReversed);
    
    if (found && !foundWords.has(found)) {
      const newFound = new Set(foundWords).add(found);
      setFoundWords(newFound);
      // We should ideally keep the cells highlighted, but for simplicity we let them clear
      // if not tracking them globally. Let's just clear selection for now.
      
      if (newFound.size === WORDS.length) {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    }
    
    setSelectedCells(new Set());
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Sopa de Letras</h2>
      <div className="flex gap-4 mb-6">
        {WORDS.map(w => (
          <span 
            key={w} 
            className={`px-3 py-1 rounded-full font-bold ${foundWords.has(w) ? 'bg-green-100 text-green-700 line-through' : 'bg-gray-100 text-gray-600'}`}
          >
            {w}
          </span>
        ))}
      </div>

      <div 
        className="grid gap-1 bg-pink-50 p-4 rounded-xl select-none"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        onPointerLeave={handlePointerUp}
        onPointerUp={handlePointerUp}
      >
        {grid.map((row, r) => (
          row.map((letter, c) => {
            const id = getCellId(r, c);
            const isSelected = selectedCells.has(id);
            return (
              <motion.div
                key={id}
                onPointerDown={() => handlePointerDown(r, c)}
                onPointerEnter={() => handlePointerEnter(r, c)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-pink-100'
                }`}
              >
                {letter}
              </motion.div>
            );
          })
        ))}
      </div>
      
      {foundWords.size === WORDS.length && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6 text-2xl font-bold text-green-600">
          ¡Completado! 🎉
        </motion.div>
      )}
    </div>
  );
}
