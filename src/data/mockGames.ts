export interface GameDef {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  skill: string;
  icon: string;
  color: string;
}

export const mockGames: GameDef[] = [
  {
    id: 'memory-match',
    title: 'Memoria Visual',
    description: 'Encuentra las parejas de cartas para entrenar tu memoria de trabajo y concentración a corto plazo.',
    ageGroup: '7-9',
    skill: 'Memoria',
    icon: '🎴',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'focus-ninja',
    title: 'Ninja del Foco',
    description: 'Atrapa los elementos correctos y evita las distracciones. Mejora la atención selectiva.',
    ageGroup: '10-12',
    skill: 'Atención',
    icon: '🥷',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'calm-breath',
    title: 'Respiración Calma',
    description: 'Aprende a controlar la impulsividad siguiendo el ritmo del círculo mágico.',
    ageGroup: '4-6',
    skill: 'Impulsos',
    icon: '🌬️',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    id: 'rocket-plan',
    title: 'Planeta Cohete',
    description: 'Organiza las piezas del cohete en el orden correcto antes del despegue.',
    ageGroup: '7-9',
    skill: 'Planificación',
    icon: '🚀',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'pattern-hero',
    title: 'Héroe de Patrones',
    description: 'Recuerda y repite la secuencia de colores y sonidos.',
    ageGroup: '4-6',
    skill: 'Memoria',
    icon: '🦸‍♂️',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 'math-focus',
    title: 'Carrera Matemática',
    description: 'Mantén la concentración para resolver problemas rápidos sin distraerte.',
    ageGroup: '13-16',
    skill: 'Atención',
    icon: '🧮',
    color: 'bg-indigo-100 text-indigo-700'
  }
];
