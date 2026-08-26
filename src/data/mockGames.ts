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
    "id": "memory-match",
    "title": "Memoria Visual",
    "description": "Encuentra las parejas de cartas para entrenar tu memoria de trabajo y concentración a corto plazo.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🎴",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "focus-ninja",
    "title": "Ninja del Foco",
    "description": "Atrapa los elementos correctos y evita las distracciones. Mejora la atención selectiva.",
    "ageGroup": "10-12",
    "skill": "Atención",
    "icon": "🥷",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "calm-breath",
    "title": "Respiración Calma",
    "description": "Aprende a controlar la impulsividad siguiendo el ritmo del círculo mágico.",
    "ageGroup": "4-6",
    "skill": "Impulsos",
    "icon": "🌬️",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "rocket-plan",
    "title": "Planeta Cohete",
    "description": "Organiza las piezas del cohete en el orden correcto antes del despegue.",
    "ageGroup": "7-9",
    "skill": "Planificación",
    "icon": "🚀",
    "color": "bg-orange-100 text-orange-700"
  },
  {
    "id": "pattern-hero",
    "title": "Héroe de Patrones",
    "description": "Recuerda y repite la secuencia de colores y sonidos.",
    "ageGroup": "4-6",
    "skill": "Memoria",
    "icon": "🦸‍♂️",
    "color": "bg-red-100 text-red-700"
  },
  {
    "id": "math-focus",
    "title": "Carrera Matemática",
    "description": "Mantén la concentración para resolver problemas rápidos sin distraerte.",
    "ageGroup": "13-16",
    "skill": "Atención",
    "icon": "🧮",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "word-search",
    "title": "Sopa de Letras",
    "description": "Encuentra las palabras escondidas para mejorar tu planificación y lenguaje.",
    "ageGroup": "10-12",
    "skill": "Lenguaje",
    "icon": "📝",
    "color": "bg-pink-100 text-pink-700"
  },
  {
    "id": "reaction-box",
    "title": "Caja de Reflejos",
    "description": "Practica el control de impulsos. Haz clic solo cuando veas el color verde.",
    "ageGroup": "7-9",
    "skill": "Impulsos",
    "icon": "⚡",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "color-sort",
    "title": "Clasificador de Colores",
    "description": "Clasifica los objetos rápidamente en sus cestas correspondientes.",
    "ageGroup": "4-6",
    "skill": "Atención",
    "icon": "🧺",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "sound-echo",
    "title": "Eco Sonoro",
    "description": "Identifica de dónde proviene el estímulo auditivo y visual.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🔊",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-11-torneo-del-futuro",
    "title": "Torneo del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "13-16",
    "skill": "Memoria",
    "icon": "🏀",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-12-misión-submarino",
    "title": "Misión Submarino",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🚀",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-13-carrera-del-volcán",
    "title": "Carrera del Volcán",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🚗",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-14-escape-del-volcán",
    "title": "Escape del Volcán",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "13-16",
    "skill": "Memoria",
    "icon": "🎨",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-15-desafío-del-castillo",
    "title": "Desafío del Castillo",
    "description": "Un divertido minijuego para entrenar tu habilidad de Lenguaje.",
    "ageGroup": "4-6",
    "skill": "Lenguaje",
    "icon": "🧩",
    "color": "bg-pink-100 text-pink-700"
  },
  {
    "id": "game-16-desafío-del-futuro",
    "title": "Desafío del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "13-16",
    "skill": "Matemáticas",
    "icon": "✏️",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-17-misterio-secreto",
    "title": "Misterio Secreto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "🐙",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-18-búsqueda-del-futuro",
    "title": "Búsqueda del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "📓",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-19-aventura-helado",
    "title": "Aventura Helado",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "7-9",
    "skill": "Matemáticas",
    "icon": "🏆",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-20-aventura-del-castillo",
    "title": "Aventura del Castillo",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "13-16",
    "skill": "Impulsos",
    "icon": "🚀",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-21-carrera-del-castillo",
    "title": "Carrera del Castillo",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "4-6",
    "skill": "Matemáticas",
    "icon": "🐢",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-22-misión-helado",
    "title": "Misión Helado",
    "description": "Un divertido minijuego para entrenar tu habilidad de Lenguaje.",
    "ageGroup": "7-9",
    "skill": "Lenguaje",
    "icon": "⚽",
    "color": "bg-pink-100 text-pink-700"
  },
  {
    "id": "game-23-desafío-del-futuro",
    "title": "Desafío del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "10-12",
    "skill": "Impulsos",
    "icon": "🐙",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-24-misterio-del-castillo",
    "title": "Misterio del Castillo",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "7-9",
    "skill": "Impulsos",
    "icon": "📓",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-25-misión-pirata",
    "title": "Misión Pirata",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "10-12",
    "skill": "Impulsos",
    "icon": "🎸",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-26-safari-del-desierto",
    "title": "Safari del Desierto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "10-12",
    "skill": "Impulsos",
    "icon": "🏀",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-27-laberinto-mágico",
    "title": "Laberinto Mágico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "13-16",
    "skill": "Atención",
    "icon": "🎨",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-28-safari-espacial",
    "title": "Safari Espacial",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "4-6",
    "skill": "Matemáticas",
    "icon": "🎮",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-29-misión-mágico",
    "title": "Misión Mágico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "🎸",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-30-carrera-helado",
    "title": "Carrera Helado",
    "description": "Un divertido minijuego para entrenar tu habilidad de Lenguaje.",
    "ageGroup": "4-6",
    "skill": "Lenguaje",
    "icon": "🏆",
    "color": "bg-pink-100 text-pink-700"
  },
  {
    "id": "game-31-torneo-submarino",
    "title": "Torneo Submarino",
    "description": "Un divertido minijuego para entrenar tu habilidad de Lenguaje.",
    "ageGroup": "7-9",
    "skill": "Lenguaje",
    "icon": "⭐",
    "color": "bg-pink-100 text-pink-700"
  },
  {
    "id": "game-32-búsqueda-robótico",
    "title": "Búsqueda Robótico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "7-9",
    "skill": "Matemáticas",
    "icon": "🔭",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-33-rescate-helado",
    "title": "Rescate Helado",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🚗",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-34-misterio-del-desierto",
    "title": "Misterio del Desierto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Planificación.",
    "ageGroup": "7-9",
    "skill": "Planificación",
    "icon": "🐙",
    "color": "bg-orange-100 text-orange-700"
  },
  {
    "id": "game-35-aventura-del-bosque",
    "title": "Aventura del Bosque",
    "description": "Un divertido minijuego para entrenar tu habilidad de Impulsos.",
    "ageGroup": "10-12",
    "skill": "Impulsos",
    "icon": "🔭",
    "color": "bg-teal-100 text-teal-700"
  },
  {
    "id": "game-36-escape-robótico",
    "title": "Escape Robótico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "🐙",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-37-rescate-del-volcán",
    "title": "Rescate del Volcán",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "7-9",
    "skill": "Matemáticas",
    "icon": "⚽",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-38-concurso-submarino",
    "title": "Concurso Submarino",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "✈️",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-39-carrera-del-futuro",
    "title": "Carrera del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Planificación.",
    "ageGroup": "7-9",
    "skill": "Planificación",
    "icon": "🐶",
    "color": "bg-orange-100 text-orange-700"
  },
  {
    "id": "game-40-rescate-del-bosque",
    "title": "Rescate del Bosque",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "4-6",
    "skill": "Atención",
    "icon": "🖌️",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-41-desafío-secreto",
    "title": "Desafío Secreto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🐞",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-42-escape-del-volcán",
    "title": "Escape del Volcán",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "🔬",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-43-aventura-robótico",
    "title": "Aventura Robótico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "7-9",
    "skill": "Atención",
    "icon": "📚",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-44-búsqueda-mágico",
    "title": "Búsqueda Mágico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Planificación.",
    "ageGroup": "10-12",
    "skill": "Planificación",
    "icon": "🎹",
    "color": "bg-orange-100 text-orange-700"
  },
  {
    "id": "game-45-rescate-del-futuro",
    "title": "Rescate del Futuro",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "13-16",
    "skill": "Atención",
    "icon": "🐱",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-46-escape-del-volcán",
    "title": "Escape del Volcán",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "13-16",
    "skill": "Memoria",
    "icon": "⭐",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-47-rescate-secreto",
    "title": "Rescate Secreto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Matemáticas.",
    "ageGroup": "4-6",
    "skill": "Matemáticas",
    "icon": "🧩",
    "color": "bg-indigo-100 text-indigo-700"
  },
  {
    "id": "game-48-escape-secreto",
    "title": "Escape Secreto",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "10-12",
    "skill": "Atención",
    "icon": "🦖",
    "color": "bg-blue-100 text-blue-700"
  },
  {
    "id": "game-49-laberinto-mágico",
    "title": "Laberinto Mágico",
    "description": "Un divertido minijuego para entrenar tu habilidad de Memoria.",
    "ageGroup": "7-9",
    "skill": "Memoria",
    "icon": "⭐",
    "color": "bg-purple-100 text-purple-700"
  },
  {
    "id": "game-50-aventura-submarino",
    "title": "Aventura Submarino",
    "description": "Un divertido minijuego para entrenar tu habilidad de Atención.",
    "ageGroup": "4-6",
    "skill": "Atención",
    "icon": "🚀",
    "color": "bg-blue-100 text-blue-700"
  }
];
