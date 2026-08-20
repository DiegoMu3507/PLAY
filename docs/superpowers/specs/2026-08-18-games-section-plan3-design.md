# Plan 3 — Sección de Juegos (MenteFocal)

Status: Approved
Date: 2026-08-18

## Contexto

MenteFocal (app TDAH) ya completó:
- Plan 1: scaffold de la app, auth con Supabase, `progressStore` (Zustand + persist, offline-first), tipos de dominio (`src/types/game.ts`: `GameMeta`, `GameResult`, `GameProps`, `SkillCategory`, `AgeRange`, `Difficulty`), rutas placeholder `/juegos` y `/juegos/:id`.
- Plan 2: sección informativa completa (16 artículos) siguiendo el patrón `data/articles.ts` + `InfoHub` + `ArticleCard` + `CategoryFilter`.

`Home.tsx` promete "50 juegos interactivos". Este plan construye la sección de juegos completa: infraestructura de catálogo/reproductor + un subconjunto de juegos realmente jugables, siguiendo el mismo patrón arquitectónico que la sección informativa.

## Alcance

- Framework completo de juegos (catálogo, filtros, reproductor, integración con progreso).
- Catálogo (`GAMES`) con **50 entradas de metadata**, distribuidas entre las 4 franjas de edad (`4-6`, `7-9`, `10-12`, `13-16`) y las 10 categorías de habilidad definidas en `SKILL_LABELS`.
- **8 juegos realmente jugables** (código completo), uno por combinación edad × habilidad listada abajo. El resto del catálogo (42 entradas) es solo metadata — se muestran como "Próximamente" y no tienen componente asociado. Se completan en planes futuros.
- Fuera de alcance: perfiles múltiples de hijos por juego, dificultad ajustable en tiempo real dentro de un juego, canvas/WebGL (todo se construye con React state + `framer-motion`, consistente con el stack actual), sistema de logros (ya existe la tabla `achievements` en Supabase pero no se conecta en este plan).

## Modelo de datos y arquitectura

Reutiliza los tipos ya existentes en `src/types/game.ts` sin modificarlos.

### `src/games/registry.ts`

```ts
export const GAMES: GameMeta[] = [ /* 50 entradas */ ]

export const GAME_COMPONENTS: Record<string, LazyExoticComponent<ComponentType<GameProps>>> = {
  'caza-estrellas':      lazy(() => import('./CazaEstrellas')),
  'memoria-animales':    lazy(() => import('./MemoriaAnimales')),
  'semaforo-rapido':     lazy(() => import('./SemaforoRapido')),
  'laberinto-veloz':     lazy(() => import('./LaberintoVeloz')),
  'reaccion-relampago':  lazy(() => import('./ReaccionRelampago')),
  'secuencia-logica':    lazy(() => import('./SecuenciaLogica')),
  'organiza-tu-dia':     lazy(() => import('./OrganizaTuDia')),
  'cambia-de-regla':     lazy(() => import('./CambiaDeRegla')),
}
```

Solo los 8 ids implementados aparecen en `GAME_COMPONENTS`. Los otros 42 existen únicamente en `GAMES`.

Cada juego jugable es un archivo independiente en `src/games/<Nombre>.tsx` que implementa `GameProps` (`meta`, `onComplete`, `onExit`) y no importa nada de routing ni de Supabase — es una función pura de UI + estado local que termina llamando `onComplete({ score, maxScore, timeSeconds, completed })`.

### `src/pages/GamesPage.tsx`

Mirror de `InfoHub.tsx`:
- Buscador por nombre/descripción.
- Filtro por edad (tabs/chips: Exploradores/Aventureros/Descubridores/Pioneros) y por habilidad (dropdown o chips, análogo a `CategoryFilter`).
- Grid de `GameCard` (nuevo componente en `src/components/games/GameCard.tsx`, análogo a `ArticleCard`).
- Los `GameCard` de juegos sin componente en `GAME_COMPONENTS` muestran un badge "Próximamente" y no son clicables (o navegan a un estado deshabilitado — decisión de implementación: no navegan).

### `src/pages/GamePlayer.tsx`

Resuelve `:id` contra `GAMES` y maneja 3 estados:
1. **No existe** el id en `GAMES` → redirige a `NotFound` (mismo patrón que rutas inválidas).
2. **Existe pero no está en `GAME_COMPONENTS`** → pantalla "Próximamente" con botón volver a `/juegos`.
3. **Existe y es jugable** → `Suspense` + carga lazy del componente, se le pasan `meta`, `onComplete`, `onExit`.
   - `onComplete(result)`: llama `useProgressStore().saveResult(meta.id, meta.skillCategory, result)` y cambia a una pantalla de resultado (puntaje, tiempo, botones "Jugar de nuevo" / "Volver a juegos").
   - `onExit()`: navega de vuelta a `/juegos` sin guardar progreso.

No se modifica `progressStore.ts`, `useProgressSync.ts` ni el schema de Supabase — ya soportan este flujo tal cual.

## Los 8 juegos jugables

| id | Nombre | Edad | Habilidad | Mecánica | Scoring |
|----|--------|------|-----------|----------|---------|
| `caza-estrellas` | Caza Estrellas | 4-6 | Atención | Aparecen formas; tocar solo estrellas amarillas antes de que desaparezcan | +1 acierto, -1 toque erróneo, maxScore = nº de estrellas mostradas |
| `memoria-animales` | Memoria de Animales | 4-6 | Memoria | Memory clásico de parejas con emojis de animales | score = pares acertados; menos intentos = mejor (se refleja en maxScore fijo vs intentos usados) |
| `semaforo-rapido` | Semáforo Rápido | 7-9 | Impulsos | Go/no-go: tocar solo en verde, nunca en rojo | +1 acierto en verde, -1 click en rojo (impulsividad), maxScore = nº de rondas |
| `laberinto-veloz` | Laberinto Veloz | 7-9 | Visomotriz | Navegar laberinto con flechas del punto A a B contra el reloj | score basado en tiempo restante al completar; completed=false si se acaba el tiempo |
| `reaccion-relampago` | Reacción Relámpago | 10-12 | Velocidad | Tocar en cuanto cambia el color de pantalla, varias rondas | score = inverso del tiempo de reacción promedio, normalizado a maxScore |
| `secuencia-logica` | Secuencia Lógica | 10-12 | Lógica | Completar el patrón (números/formas), dificultad creciente por ronda | +1 por patrón correcto, maxScore = nº total de rondas |
| `organiza-tu-dia` | Organiza tu Día | 13-16 | Planificación | Reordenar tareas respetando restricciones simples ("X antes que Y") | score basado en nº de restricciones respetadas en el orden final |
| `cambia-de-regla` | Cambia de Regla | 13-16 | Flexibilidad | Clasificar cartas según una regla que cambia sin aviso (adaptado de Wisconsin Card Sorting) | +1 por clasificación correcta tras el cambio de regla, penaliza perseveración |

Todos usan solo React state + `framer-motion`; ninguno requiere librerías nuevas.

## Las 42 entradas restantes

Solo metadata (sin componente): nombre, emoji, descripción de 1-2 líneas, `ageRange`/`ageLabel`, `difficulty`, `skillCategory`/`skillLabel`. Se distribuyen para que el catálogo de 50 quede balanceado entre las 4 edades y las 10 habilidades (incluyendo `lenguaje` y `relajacion`, sin representación jugable en este plan). No requieren tests de lógica — son datos, igual que los artículos del Plan 2.

## Testing

Sigue el patrón existente (vitest + testing-library, ver `Button.test.tsx`, `ArticleCard.test.tsx`, `useOnline.test.ts`):

- `src/games/registry.test.ts`: 50 entradas, ids únicos, toda key de `GAME_COMPONENTS` existe en `GAMES`.
- `src/components/games/GameCard.test.tsx`: renderiza metadata; muestra badge "Próximamente" cuando el id no está en `GAME_COMPONENTS`.
- Un test de lógica de scoring por cada uno de los 8 juegos (función pura extraída, no simulación completa de UI) — ej. Semáforo Rápido penaliza click en rojo; Reacción Relámpago calcula el promedio correctamente.
- `src/pages/GamePlayer.test.tsx`: cubre los 3 estados (no existe / próximamente / jugable) y que `onComplete` dispare `saveResult` en `progressStore`.

## Riesgos / decisiones abiertas

- Los 8 juegos no cubren `lenguaje` ni `relajacion` — quedan pendientes para un plan futuro.
- El drag-and-drop de "Organiza tu Día" se implementa con clicks para reordenar (no HTML5 drag-and-drop nativo) para evitar problemas de accesibilidad/mobile — decisión tomada en este spec, no requiere aprobación adicional.
