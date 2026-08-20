// src/games/registry.ts
import { lazy } from 'react'
import type { LazyExoticComponent, ComponentType } from 'react'
import type { GameMeta, GameProps } from '../types/game'
import { AGE_LABELS, SKILL_LABELS } from '../types/game'

const AL = AGE_LABELS as Record<GameMeta['ageRange'], GameMeta['ageLabel']>
const SL = SKILL_LABELS

export const GAMES: GameMeta[] = [
  // -- 4-6 (Exploradores) --
  { id: 'caza-estrellas',      name: 'Caza Estrellas',        emoji: '⭐', description: 'Toca solo las estrellas antes de que desaparezcan.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'memoria-animales',    name: 'Memoria de Animales',   emoji: '🐼', description: 'Encuentra las parejas de animales escondidas.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'burbujas-de-colores', name: 'Burbujas de Colores',   emoji: '🫧', description: 'Revienta las burbujas en el orden de colores indicado.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'carrera-de-caracoles',name: 'Carrera de Caracoles',  emoji: '🐌', description: 'Toca al ritmo justo para que tu caracol avance sin chocar.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'construye-tu-casa',   name: 'Construye tu Casa',     emoji: '🏠', description: 'Ordena las piezas en el paso correcto para construir una casita.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'animales-camaleon',   name: 'Animales Camaleón',     emoji: '🦎', description: 'Encuentra qué cambió entre dos imágenes casi iguales.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'atrapa-la-fruta',     name: 'Atrapa la Fruta',       emoji: '🍎', description: 'Guía la cesta con el dedo para atrapar las frutas que caen.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'repite-el-sonido',    name: 'Repite el Sonido',      emoji: '🔊', description: 'Escucha y repite la palabra que dice el personaje.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'sigue-el-patron',     name: 'Sigue el Patrón',       emoji: '🔷', description: 'Completa la fila de figuras siguiendo el patrón de colores.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'respira-con-la-nube', name: 'Respira con la Nube',   emoji: '☁️', description: 'Sigue el ritmo de una nube que crece y se encoge para respirar despacio.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'figuras-escondidas',  name: 'Figuras Escondidas',    emoji: '🔍', description: 'Encuentra las figuras escondidas dentro del dibujo.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'cuenta-cuentos',      name: 'Cuenta Cuentos',        emoji: '📖', description: 'Ordena las viñetas de una historia corta de principio a fin.', ageRange: '4-6', ageLabel: AL['4-6'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },

  // -- 7-9 (Aventureros) --
  { id: 'semaforo-rapido',     name: 'Semáforo Rápido',       emoji: '🚦', description: 'Toca solo cuando el círculo esté en verde, nunca en rojo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'laberinto-veloz',     name: 'Laberinto Veloz',       emoji: '🧭', description: 'Navega el laberinto con las flechas antes de que se acabe el tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'mira-y-recuerda',     name: 'Mira y Recuerda',       emoji: '👀', description: 'Observa los objetos y señala cuáles faltan después.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'torre-de-memoria',    name: 'Torre de Memoria',      emoji: '🗼', description: 'Repite la secuencia de colores que se ilumina, cada vez más larga.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'relevos-numericos',   name: 'Relevos Numéricos',     emoji: '🔢', description: 'Suma o resta rápido antes de que se acabe el tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'mapa-del-tesoro',     name: 'Mapa del Tesoro',       emoji: '🗺️', description: 'Planifica la ruta más corta entre varias paradas para llegar al tesoro.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-de-equipo',    name: 'Cambia de Equipo',      emoji: '🔄', description: 'Agrupa animales según una regla que cambia cada cierto tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'cuentacuentos-vivo',  name: 'Cuentacuentos Vivo',    emoji: '🗣️', description: 'Arma oraciones eligiendo las palabras correctas en orden.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'rompecabezas-express',name: 'Rompecabezas Exprés',   emoji: '🧩', description: 'Resuelve acertijos cortos de lógica contra el reloj.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'jardin-tranquilo',    name: 'Jardín Tranquilo',      emoji: '🌿', description: 'Riega y cuida plantas siguiendo una rutina calmada, sin presión de tiempo.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'detective-de-detalles',name: 'Detective de Detalles',emoji: '🕵️', description: 'Encuentra las diferencias entre dos escenas casi idénticas.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'parejas-veloces',     name: 'Parejas Veloces',       emoji: '🃏', description: 'Encuentra parejas de cartas contra un cronómetro más ajustado.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'espera-tu-turno',     name: 'Espera tu Turno',       emoji: '⏳', description: 'Aguanta sin tocar la pantalla hasta que aparezca la señal correcta.', ageRange: '7-9', ageLabel: AL['7-9'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },

  // -- 10-12 (Descubridores) --
  { id: 'reaccion-relampago',  name: 'Reacción Relámpago',    emoji: '⚡', description: 'Toca en cuanto la pantalla cambie de color, varias rondas.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'secuencia-logica',    name: 'Secuencia Lógica',      emoji: '🔢', description: 'Completa el patrón numérico, la dificultad crece por ronda.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'ojo-de-halcon',       name: 'Ojo de Halcón',         emoji: '🦅', description: 'Localiza objetos específicos entre decenas de distractores.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'mapa-mental',         name: 'Mapa Mental',           emoji: '🧠', description: 'Memoriza la posición de varias cartas y encuentra todos los pares.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'cuenta-hasta-diez',   name: 'Cuenta Hasta Diez',     emoji: '🛑', description: 'Espera el momento exacto antes de actuar para evitar errores por impulsividad.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'organiza-la-mochila', name: 'Organiza la Mochila',   emoji: '🎒', description: 'Decide qué llevar y en qué orden empacar según las restricciones del viaje.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-la-regla',     name: 'Cambia la Regla',       emoji: '🔀', description: 'Clasifica tarjetas mientras la regla de clasificación cambia sin avisar.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'laberinto-de-palabras',name: 'Laberinto de Palabras',emoji: '🔤', description: 'Encuentra el camino uniendo palabras relacionadas entre sí.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'circuito-de-precision',name: 'Circuito de Precisión',emoji: '🎯', description: 'Traza una línea dentro de un camino estrecho sin salirte del borde.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'respiracion-guiada',  name: 'Respiración Guiada',    emoji: '🌊', description: 'Sigue una ola visual que marca el ritmo de inhalar y exhalar.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'atencion-dividida',   name: 'Atención Dividida',     emoji: '👁️', description: 'Vigila dos zonas de la pantalla a la vez y reacciona a la que cambie.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'dificil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'clasifica-y-gana',    name: 'Clasifica y Gana',      emoji: '🗂️', description: 'Vuelve a clasificar tarjetas bajo una nueva regla oculta.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'medio', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'minuto-de-calma',     name: 'Minuto de Calma',       emoji: '🕯️', description: 'Un ejercicio guiado de relajación de un minuto entre actividades.', ageRange: '10-12', ageLabel: AL['10-12'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },

  // -- 13-16 (Pioneros) --
  { id: 'organiza-tu-dia',     name: 'Organiza tu Día',       emoji: '🗓️', description: 'Ordena tareas respetando restricciones simples de secuencia.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'cambia-de-regla',     name: 'Cambia de Regla',       emoji: '🧬', description: 'Clasifica cartas según una regla oculta que cambia sin previo aviso.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'flexibilidad', skillLabel: SL.flexibilidad },
  { id: 'radar-social',        name: 'Radar Social',          emoji: '📡', description: 'Detecta rápidamente el ícono objetivo entre muchos similares en movimiento.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'atencion', skillLabel: SL.atencion },
  { id: 'cadena-de-datos',     name: 'Cadena de Datos',       emoji: '🔗', description: 'Memoriza una secuencia larga de números o símbolos y repítela.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'memoria', skillLabel: SL.memoria },
  { id: 'stop-and-go',         name: 'Stop and Go',           emoji: '🚥', description: 'Reacciona solo ante señales específicas mientras ignoras las distractoras.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'impulsos', skillLabel: SL.impulsos },
  { id: 'sprint-mental',       name: 'Sprint Mental',         emoji: '💨', description: 'Resuelve el máximo de operaciones simples posibles en 60 segundos.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'velocidad', skillLabel: SL.velocidad },
  { id: 'pulso-firme',         name: 'Pulso Firme',           emoji: '✍️', description: 'Traza formas complejas con precisión dentro de un tiempo límite.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'visomotriz', skillLabel: SL.visomotriz },
  { id: 'argumenta-y-gana',    name: 'Argumenta y Gana',      emoji: '💬', description: 'Ordena frases para construir el argumento más coherente.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'medio', skillCategory: 'lenguaje', skillLabel: SL.lenguaje },
  { id: 'enigma-final',        name: 'Enigma Final',          emoji: '🧩', description: 'Resuelve un rompecabezas lógico de varios pasos encadenados.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'logica', skillLabel: SL.logica },
  { id: 'pausa-consciente',    name: 'Pausa Consciente',      emoji: '🧘', description: 'Ejercicio de atención plena guiado para bajar revoluciones.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'facil', skillCategory: 'relajacion', skillLabel: SL.relajacion },
  { id: 'ruta-critica',        name: 'Ruta Crítica',          emoji: '🛠️', description: 'Ordena tareas con dependencias complejas para completar un proyecto simulado.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'planificacion', skillLabel: SL.planificacion },
  { id: 'memoria-de-trabajo',  name: 'Memoria de Trabajo',    emoji: '🗃️', description: 'Recuerda y actualiza una lista mientras se agregan y quitan elementos.', ageRange: '13-16', ageLabel: AL['13-16'], difficulty: 'dificil', skillCategory: 'memoria', skillLabel: SL.memoria },
]

export const GAME_COMPONENTS: Record<string, LazyExoticComponent<ComponentType<GameProps>>> = {
  'caza-estrellas':     lazy(() => import('./CazaEstrellas')),
  'memoria-animales':   lazy(() => import('./MemoriaAnimales')),
  'semaforo-rapido':    lazy(() => import('./SemaforoRapido')),
  'laberinto-veloz':    lazy(() => import('./LaberintoVeloz')),
  'reaccion-relampago': lazy(() => import('./ReaccionRelampago')),
  'secuencia-logica':   lazy(() => import('./SecuenciaLogica')),
  'organiza-tu-dia':    lazy(() => import('./OrganizaTuDia')),
  'cambia-de-regla':    lazy(() => import('./CambiaDeRegla')),
}
