import fs from 'fs';

const skills = [
  { name: 'Memoria', color: 'bg-purple-100 text-purple-700' },
  { name: 'Atención', color: 'bg-blue-100 text-blue-700' },
  { name: 'Impulsos', color: 'bg-teal-100 text-teal-700' },
  { name: 'Planificación', color: 'bg-orange-100 text-orange-700' },
  { name: 'Lenguaje', color: 'bg-pink-100 text-pink-700' },
  { name: 'Matemáticas', color: 'bg-indigo-100 text-indigo-700' }
];

const ageGroups = ['4-6', '7-9', '10-12', '13-16'];
const emojis = ['🐶', '🐱', '🐢', '🦖', '🐉', '🐙', '🦋', '🐞', '🚗', '✈️', '🚀', '⭐', '🎈', '🎨', '🧩', '🎮', '🎸', '🎹', '🏀', '⚽', '🏆', '🥇', '💡', '🔍', '🔬', '🔭', '📚', '📓', '✏️', '🖌️'];
const titles = ['Aventura', 'Desafío', 'Búsqueda', 'Carrera', 'Laberinto', 'Misterio', 'Rescate', 'Misión', 'Viaje', 'Safari', 'Escape', 'Concurso', 'Torneo'];
const themes = ['del Bosque', 'Espacial', 'Submarino', 'Mágico', 'Secreto', 'del Volcán', 'Helado', 'del Desierto', 'Robótico', 'del Futuro', 'del Castillo', 'Pirata'];

const existing = [
  { id: 'memory-match', title: 'Memoria Visual', description: 'Encuentra las parejas de cartas para entrenar tu memoria de trabajo y concentración a corto plazo.', ageGroup: '7-9', skill: 'Memoria', icon: '🎴', color: 'bg-purple-100 text-purple-700' },
  { id: 'focus-ninja', title: 'Ninja del Foco', description: 'Atrapa los elementos correctos y evita las distracciones. Mejora la atención selectiva.', ageGroup: '10-12', skill: 'Atención', icon: '🥷', color: 'bg-blue-100 text-blue-700' },
  { id: 'calm-breath', title: 'Respiración Calma', description: 'Aprende a controlar la impulsividad siguiendo el ritmo del círculo mágico.', ageGroup: '4-6', skill: 'Impulsos', icon: '🌬️', color: 'bg-teal-100 text-teal-700' },
  { id: 'rocket-plan', title: 'Planeta Cohete', description: 'Organiza las piezas del cohete en el orden correcto antes del despegue.', ageGroup: '7-9', skill: 'Planificación', icon: '🚀', color: 'bg-orange-100 text-orange-700' },
  { id: 'pattern-hero', title: 'Héroe de Patrones', description: 'Recuerda y repite la secuencia de colores y sonidos.', ageGroup: '4-6', skill: 'Memoria', icon: '🦸‍♂️', color: 'bg-red-100 text-red-700' },
  { id: 'math-focus', title: 'Carrera Matemática', description: 'Mantén la concentración para resolver problemas rápidos sin distraerte.', ageGroup: '13-16', skill: 'Atención', icon: '🧮', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'word-search', title: 'Sopa de Letras', description: 'Encuentra las palabras escondidas para mejorar tu planificación y lenguaje.', ageGroup: '10-12', skill: 'Lenguaje', icon: '📝', color: 'bg-pink-100 text-pink-700' },
  { id: 'reaction-box', title: 'Caja de Reflejos', description: 'Practica el control de impulsos. Haz clic solo cuando veas el color verde.', ageGroup: '7-9', skill: 'Impulsos', icon: '⚡', color: 'bg-teal-100 text-teal-700' },
  { id: 'color-sort', title: 'Clasificador de Colores', description: 'Clasifica los objetos rápidamente en sus cestas correspondientes.', ageGroup: '4-6', skill: 'Atención', icon: '🧺', color: 'bg-blue-100 text-blue-700' },
  { id: 'sound-echo', title: 'Eco Sonoro', description: 'Identifica de dónde proviene el estímulo auditivo y visual.', ageGroup: '7-9', skill: 'Memoria', icon: '🔊', color: 'bg-purple-100 text-purple-700' }
];

let generatedCount = existing.length;

while (generatedCount < 50) {
  const skillObj = skills[Math.floor(Math.random() * skills.length)];
  const ageGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
  const icon = emojis[Math.floor(Math.random() * emojis.length)];
  const titlePart1 = titles[Math.floor(Math.random() * titles.length)];
  const titlePart2 = themes[Math.floor(Math.random() * themes.length)];
  const title = `${titlePart1} ${titlePart2}`;
  
  const id = `game-${generatedCount + 1}-${title.toLowerCase().replace(/ /g, '-')}`;
  
  existing.push({
    id,
    title,
    description: `Un divertido minijuego para entrenar tu habilidad de ${skillObj.name}.`,
    ageGroup,
    skill: skillObj.name,
    icon,
    color: skillObj.color
  });
  
  generatedCount++;
}

const fileContent = `export interface GameDef {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  skill: string;
  icon: string;
  color: string;
}

export const mockGames: GameDef[] = ${JSON.stringify(existing, null, 2)};
`;

fs.writeFileSync('src/data/mockGames.ts', fileContent, 'utf8');
console.log('mockGames.ts generated with ' + existing.length + ' games.');
