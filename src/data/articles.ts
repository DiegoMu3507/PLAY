export type ArticleCategory =
  | 'fundamentos'
  | 'familia'
  | 'escuela'
  | 'salud'
  | 'recursos'

export interface Article {
  slug: string
  title: string
  emoji: string
  category: ArticleCategory
  categoryLabel: string
  summary: string
  readTime: number
  targetAudience: 'parents' | 'children' | 'all'
  content: string
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  fundamentos: 'Fundamentos',
  familia:     'Familia',
  escuela:     'Escuela',
  salud:       'Salud',
  recursos:    'Recursos',
}

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  fundamentos: 'bg-primary-100 text-primary-700',
  familia:     'bg-calm-100 text-calm-700',
  escuela:     'bg-yellow-100 text-yellow-700',
  salud:       'bg-pink-100 text-pink-700',
  recursos:    'bg-lilac-100 text-lilac-600',
}

export const CATEGORY_ACTIVE_COLORS: Record<ArticleCategory, string> = {
  fundamentos: 'bg-primary-500 text-white',
  familia:     'bg-calm-500 text-white',
  escuela:     'bg-yellow-500 text-white',
  salud:       'bg-pink-500 text-white',
  recursos:    'bg-lilac-500 text-white',
}

export const articles: Article[] = [
  {
    slug: 'que-es-el-tdah',
    title: '¿Qué es el TDAH?',
    emoji: '🧠',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos',
    summary: 'Una guía clara y empática sobre qué es el Trastorno por Déficit de Atención e Hiperactividad, cómo funciona el cerebro y por qué no es una falta de voluntad.',
    readTime: 5,
    targetAudience: 'all',
    content: `## ¿Qué es el TDAH?

El **Trastorno por Déficit de Atención e Hiperactividad (TDAH)** es una condición del neurodesarrollo que afecta la forma en que el cerebro regula la atención, el control de impulsos y el nivel de actividad. Es uno de los trastornos más comunes en la infancia: afecta aproximadamente al **5-7% de los niños** en todo el mundo.

El TDAH **no es una enfermedad** en el sentido tradicional, ni es culpa del niño, de los padres o de la crianza. Es una diferencia en cómo se conectan y comunican ciertas regiones del cerebro — especialmente las relacionadas con las funciones ejecutivas.

## ¿Cómo funciona el cerebro con TDAH?

Las personas con TDAH tienen diferencias en la cantidad y el funcionamiento de la **dopamina y la noradrenalina**, dos neurotransmisores clave para mantener la atención y regular el comportamiento. Esto significa que:

- **Tareas aburridas o repetitivas** son mucho más difíciles de sostener
- **Actividades emocionantes o novedosas** pueden mantener la atención perfectamente
- El "músculo" del autocontrol se agota más rápido que en cerebros neurotípicos

## Lo que el TDAH NO es

- ❌ Flojera o falta de esfuerzo
- ❌ Mala educación o capricho
- ❌ Consecuencia de demasiada pantalla o azúcar
- ❌ Algo que el niño "supera" con más disciplina

## Una fortaleza diferente

Muchas personas con TDAH tienen capacidades extraordinarias: **creatividad, pensamiento lateral, hiperfoco en temas de interés, energía y entusiasmo**. El objetivo no es "curar" el TDAH, sino encontrar las estrategias y el entorno que permitan al niño o joven brillar con su forma única de pensar.

## ¿A quién afecta?

El TDAH afecta a niños y adultos de todos los géneros, aunque históricamente se diagnosticaba más en niños varones. Las niñas tienden a presentar síntomas menos visibles (más inatención que hiperactividad), lo que a veces retrasa el diagnóstico.

> **Dato importante:** El TDAH tiene una alta tasa de heredabilidad. Si un padre tiene TDAH, hay una probabilidad significativa de que sus hijos también lo tengan.`,
  },
  {
    slug: 'tipos-de-tdah',
    title: 'Tipos de TDAH',
    emoji: '🔍',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos',
    summary: 'No todos los TDAH son iguales. Conoce las diferencias entre el tipo inatento, hiperactivo-impulsivo y combinado, y por qué importa saberlo.',
    readTime: 4,
    targetAudience: 'parents',
    content: `## Los tres tipos de TDAH

El DSM-5 reconoce **tres presentaciones** del TDAH. Conocerlas ayuda a entender mejor al niño y a elegir las estrategias más adecuadas.

---

## 1. Presentación predominantemente inatenta

Antes llamado "TDA sin hiperactividad". Los síntomas principales son:

- Dificultad para mantener la atención en tareas largas o poco interesantes
- Parece no escuchar cuando se le habla directamente
- Se distrae fácilmente con estímulos externos
- Olvida materiales, citas, tareas
- Evita actividades que requieren esfuerzo mental sostenido
- Comete errores por descuido en detalles

**¿A quién afecta más?** Las niñas y adolescentes tienen con mayor frecuencia este tipo.

---

## 2. Presentación predominantemente hiperactiva-impulsiva

Los síntomas principales son:

- Mueve constantemente manos y pies, o se retuerce en el asiento
- Se levanta en situaciones donde debe estar sentado
- Corre o trepa en momentos inapropiados
- Habla en exceso e interrumpe conversaciones
- Tiene dificultad para esperar su turno
- Actúa antes de pensar las consecuencias

---

## 3. Presentación combinada

Es la más frecuente. El niño presenta síntomas significativos de **ambas categorías**: inatención e hiperactividad-impulsividad.

---

## ¿Los tipos cambian con el tiempo?

Sí. Es común que la presentación varíe con la edad. Muchos niños hiperactivos se vuelven más tranquilos en la adolescencia, pero la inatención suele persistir.`,
  },
  {
    slug: 'senales-y-sintomas',
    title: 'Señales y síntomas por edad',
    emoji: '📋',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos',
    summary: 'Las señales del TDAH cambian según la edad del niño. Aprende qué esperar en cada etapa del desarrollo y cuándo consultar con un especialista.',
    readTime: 6,
    targetAudience: 'parents',
    content: `## ¿Cómo se ve el TDAH en cada etapa?

El TDAH no tiene el mismo aspecto en un niño de 4 años que en uno de 15. Los síntomas evolucionan con el desarrollo.

---

## Preescolar (3–5 años)

Las señales de alerta son cuando la intensidad es **significativamente mayor** que la de otros niños:

- Movimiento constante e incapacidad para sentarse
- Rabietas frecuentes e intensas, difíciles de calmar
- Dificultad para seguir instrucciones de dos pasos
- Impulsividad que pone en riesgo su seguridad

---

## Primaria (6–9 años)

Es la etapa donde más diagnósticos se hacen:

- Dificultad para terminar tareas escritas en clase
- Errores frecuentes por descuido
- Pierde constantemente materiales
- Le cuesta iniciar tareas por sí solo

---

## Preadolescencia (10–12 años)

- Trabajos incompletos o entregados tarde
- Dificultad para gestionar múltiples asignaturas
- Problemas para estimar tiempos
- Inicio de problemas de autoestima

---

## Adolescencia (13–16 años)

- Procrastinación severa
- Relaciones sociales complicadas por impulsividad verbal
- Dificultad para regular emociones
- Inicio de desmotivación escolar

---

## Cuándo consultar al especialista

- Los síntomas llevan más de 6 meses
- Aparecen en al menos 2 contextos (casa + escuela)
- El niño expresa que se siente "malo", "tonto" o "diferente"`,
  },
  {
    slug: 'consejos-para-padres',
    title: 'Consejos para padres',
    emoji: '👨‍👩‍👧',
    category: 'familia',
    categoryLabel: 'Familia',
    summary: 'Estrategias prácticas y basadas en evidencia para apoyar a tu hijo en casa: rutinas, comunicación, límites y cómo mantener tu propia salud emocional.',
    readTime: 7,
    targetAudience: 'parents',
    content: `## Ser el padre de un niño con TDAH

Criar a un hijo con TDAH puede ser agotador y hermoso al mismo tiempo. Estas estrategias están basadas en investigación científica.

---

## 1. Estructura y rutinas predecibles

El cerebro con TDAH funciona mejor cuando el entorno es **predecible y estructurado**:

- Establece horarios fijos para despertarse, comer, hacer tarea y dormir
- Usa pictogramas o listas visuales para las rutinas
- Anuncia los cambios con anticipación: "En 10 minutos paramos de jugar"
- Reduce las decisiones innecesarias: uniforme listo la noche anterior

---

## 2. Instrucciones claras y breves

- Da **una instrucción a la vez**
- Habla de frente al niño, con contacto visual
- Confirma que entendió: "¿Puedes decirme qué te pedí?"
- Usa lenguaje positivo: "Siéntate en la silla" en lugar de "¡Deja de brincar!"

---

## 3. Sistema de recompensas concretas

El cerebro con TDAH responde mejor a **recompensas inmediatas y pequeñas**:

- Tablero de estrellas o fichas por comportamientos específicos
- Las recompensas deben ser predecibles y cumplirse siempre
- Celebra el esfuerzo, no solo el resultado

---

## 4. Manejo de las crisis

Cuando el niño está desbordado:

1. **No razones en caliente** — espera a que se calme
2. Ofrece un "espacio de calma"
3. Valida la emoción: "Veo que estás muy frustrado"
4. Después del episodio, habla brevemente sobre qué pasó

---

## 5. Cuida tu propio bienestar

Un padre agotado no puede ayudar bien. Es normal sentir frustración o agotamiento. Busca grupos de apoyo para padres de niños con TDAH.

> Tu hijo no se porta mal a propósito. Su cerebro está haciendo lo mejor que puede.`,
  },
  {
    slug: 'recursos-y-apoyo',
    title: 'Recursos y apoyo',
    emoji: '📚',
    category: 'recursos',
    categoryLabel: 'Recursos',
    summary: 'Organizaciones, libros, apps y comunidades online donde encontrar apoyo profesional y emocional para familias con TDAH en español.',
    readTime: 4,
    targetAudience: 'parents',
    content: `## Recursos para familias con TDAH

---

## Organizaciones

- **CHADD** (chadd.org) — la organización más grande del mundo, con recursos en español
- **CADAH** (fundacioncadah.org) — artículos y guías en español
- **FEAADAH** (feaadah.org) — Federación Española de Asociaciones de Ayuda al TDAH

---

## Libros recomendados para padres

- **"El niño con TDAH en casa y en la escuela"** — Mena Pujol et al.
- **"Niños hiperactivos"** — Christopher Green y Kit Chee
- **"Explosiones de ira"** — Ross Greene

---

## Libros para niños (6–12 años)

- **"Mi cerebro necesita gafas"** — Annick Vincent
- **"El chico que perdió todos sus deberes"** — cuento sobre organización

---

## Apps útiles

- **Tiimo** — planificador visual para TDAH
- **Forest** — concentración con temporizador Pomodoro
- **Routinery** — rutinas visuales con temporizador

---

## Cuándo buscar un profesional

1. **Neuropediatra** — diagnóstico y seguimiento médico
2. **Psicólogo especializado en TDAH** — intervención conductual
3. **Psicopedagogo** — dificultades de aprendizaje asociadas
4. **Terapeuta familiar** — cuando el TDAH afecta la dinámica familiar`,
  },
  {
    slug: 'preguntas-frecuentes',
    title: 'Preguntas frecuentes',
    emoji: '❓',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos',
    summary: 'Las dudas más comunes sobre el TDAH respondidas de forma clara: medicación, diagnóstico, futuro del niño y más.',
    readTime: 6,
    targetAudience: 'all',
    content: `## Preguntas frecuentes sobre el TDAH

---

### ¿El TDAH se puede curar?

El TDAH no se "cura" completamente, pero sí **se puede manejar muy bien**. Con las estrategias adecuadas, la mayoría de los niños con TDAH llevan vidas plenas y exitosas.

---

### ¿Mi hijo siempre necesitará medicación?

No necesariamente. La medicación es una herramienta, no una obligación. La decisión siempre debe tomarse con el médico y revisarse periódicamente.

---

### ¿La medicación cambia la personalidad del niño?

Cuando está bien ajustada, **no cambia la personalidad**. Si notas que el niño se vuelve apático o pierde su chispa, la dosis necesita ajuste.

---

### ¿El azúcar o las pantallas causan TDAH?

No. El TDAH tiene una base neurobiológica y genética. Las pantallas no causan TDAH, aunque el uso excesivo puede empeorar síntomas ya existentes.

---

### ¿Podré ir a la universidad si tengo TDAH?

**Absolutamente sí.** Muchas personas con TDAH destacan en la universidad cuando encuentran carreras que les apasionan.

---

### ¿El TDAH es solo "cosa de niños"?

No. El TDAH persiste en la adultez en el 60-70% de los casos.

---

### ¿Cómo decírselo al niño?

Con honestidad y lenguaje positivo: *"Tu cerebro funciona de una manera especial. Se le da muy bien algunas cosas y otras le cuestan más trabajo."*

---

### ¿El TDAH es culpa mía como padre?

**No.** El TDAH tiene una causa genética y neurobiológica. Ningún estilo de crianza "causa" TDAH.`,
  },
  {
    slug: 'para-el-nino',
    title: 'Para ti, campeón 🌟',
    emoji: '⭐',
    category: 'familia',
    categoryLabel: 'Familia',
    summary: 'Un mensaje especial para niños y jóvenes con TDAH: tu cerebro es único, tienes superpoderes especiales y hay muchas personas que te apoyan.',
    readTime: 3,
    targetAudience: 'children',
    content: `## Hola, campeón o campeona 👋

Este artículo es para **ti**. Sí, exactamente para ti.

---

## Tu cerebro es especial (en serio)

¿Sabes que tu cerebro funciona diferente al de muchos otros niños? Eso no significa que sea peor — significa que es **único**. Eso tiene un nombre: **TDAH**. Y muchos niños y jóvenes en todo el mundo lo tienen. No eres el único. ¡Para nada!

---

## Tus superpoderes

El TDAH viene con algunos retos... **pero también con superpoderes:**

- 🚀 **Energía increíble** — cuando algo te gusta, puedes hacerlo durante horas
- 🎨 **Creatividad desbordante** — tu mente conecta ideas de formas que otros no pueden
- ❤️ **Sensibilidad y empatía** — sientes las cosas profundamente
- 💡 **Pensamiento rápido** — ves soluciones que otros no ven

---

## Personas famosas con TDAH

- 🏊 **Michael Phelps** — el nadador más medallado de la historia olímpica
- 🎬 **Will Smith** — actor
- 🎵 **Justin Timberlake** — cantante

---

## Cosas que quiero que sepas

1. **No eres malo/a** — tu cerebro solo necesita aprender a funcionar con sus propias reglas
2. **No eres tonto/a** — el TDAH no tiene nada que ver con la inteligencia
3. **No estás solo/a** — hay personas que te apoyan

---

> 💬 *"No dejes que nadie te diga que no puedes hacer algo. Si tienes un sueño, tienes que protegerlo."* — Will Smith`,
  },
  {
    slug: 'diagnostico-y-tratamiento',
    title: 'Diagnóstico y tratamiento',
    emoji: '🏥',
    category: 'salud',
    categoryLabel: 'Salud',
    summary: 'Cómo se diagnostica el TDAH, qué profesionales intervienen, qué opciones de tratamiento existen y cómo combinarlas de manera efectiva.',
    readTime: 7,
    targetAudience: 'parents',
    content: `## El camino al diagnóstico

Diagnosticar el TDAH requiere una **evaluación integral** por parte de profesionales capacitados.

---

## ¿Quién puede diagnosticar el TDAH?

- **Neuropediatra** — especialista en sistema nervioso de niños
- **Psiquiatra infantil** — puede diagnosticar y prescribir medicación
- **Psicólogo clínico** — evaluación psicológica completa

---

## ¿Cómo es el proceso de evaluación?

1. **Entrevista clínica** con el niño y los padres
2. **Cuestionarios estandarizados** (Conners, SNAP-IV) completados por padres y maestros
3. **Pruebas psicométricas** de atención y funciones ejecutivas
4. **Revisión de historial** médico y académico

> ⏱ El proceso puede durar varias semanas. Un buen diagnóstico requiere tiempo.

---

## Opciones de tratamiento

El tratamiento más efectivo es **multimodal**:

### 1. Intervención psicológica y conductual
- Terapia cognitivo-conductual para el niño
- Entrenamiento para padres

### 2. Medicación (cuando se indica)
Los medicamentos más usados son los **estimulantes** (metilfenidato) y los **no estimulantes** (atomoxetina). Son seguros bajo supervisión médica.

- ❌ "Crea adicción" — el uso médico supervisado no genera adicción
- ✅ Puede reducir los síntomas en un 70-80% cuando está bien ajustada

### 3. Intervención psicopedagógica
Estrategias de aprendizaje y organización adaptadas al perfil del niño.

---

## Seguimiento

El tratamiento requiere revisiones periódicas para ajustar estrategias a medida que el niño crece.`,
  },
  {
    slug: 'tdah-en-la-escuela',
    title: 'TDAH en la escuela',
    emoji: '🏫',
    category: 'escuela',
    categoryLabel: 'Escuela',
    summary: 'Guía para padres sobre adaptaciones académicas, cómo comunicarse con los maestros y los derechos educativos de los niños con TDAH.',
    readTime: 6,
    targetAudience: 'parents',
    content: `## El TDAH en el entorno escolar

La escuela es uno de los entornos más desafiantes para un niño con TDAH. Con las adaptaciones correctas, la experiencia puede transformarse.

---

## Habla con la escuela

1. **Solicita una reunión formal** con el tutor y el orientador
2. **Comparte el diagnóstico** y el plan de tratamiento
3. **Describe comportamientos específicos**: "se levanta frecuentemente" en lugar de "es hiperactivo"

---

## Adaptaciones que funcionan

### Del entorno
- Sentar al niño cerca del maestro, lejos de ventanas
- Reducir estímulos visuales en el área de trabajo
- Permitir objetos para manipular (fidgets)

### En las tareas
- Dividir tareas largas en partes más pequeñas
- Dar instrucciones por escrito además de oralmente
- Proporcionar organizadores gráficos

### En la evaluación
- Tiempo extra en exámenes
- Exámenes en ambiente tranquilo
- Evaluar de forma oral cuando la escritura es el obstáculo

---

## Los derechos del niño con TDAH

En la mayoría de los países hispanohablantes, los niños con TDAH tienen derecho a:
- Adaptaciones curriculares y metodológicas
- Apoyo del departamento de orientación
- No ser sancionados por conductas directamente relacionadas con el trastorno

> 💡 Solicita por escrito cualquier adaptación aprobada.`,
  },
  {
    slug: 'regulacion-emocional',
    title: 'Regulación emocional',
    emoji: '🌊',
    category: 'salud',
    categoryLabel: 'Salud',
    summary: 'Por qué los niños con TDAH tienen reacciones emocionales intensas y cómo ayudarles a manejar la frustración, la rabia y la baja autoestima.',
    readTime: 5,
    targetAudience: 'parents',
    content: `## Las emociones y el TDAH

Los niños con TDAH experimentan emociones de forma más **intensa, rápida y difícil de controlar** que sus pares. No es manipulación, no es capricho: es neurología.

---

## Estrategias para en casa

### Para el momento de crisis
1. **Mantén la calma tú primero** — el sistema nervioso del niño se "contagia" del adulto
2. No intentes razonar en el pico emocional
3. Ofrece presencia tranquila: "Estoy aquí contigo"

### Para prevenir crisis
- Anticipa las situaciones difíciles (transiciones, esperas, cambios)
- Usa el "semáforo emocional": rojo = explotar, amarillo = agitado, verde = tranquilo
- Enseña vocabulario emocional específico

### Técnicas de regulación para niños
- **Respiración 4-7-8:** inhala 4s, sostén 7s, exhala 8s
- **5 sentidos:** nombrar 5 cosas que ve, 4 que toca, 3 que escucha
- **Movimiento:** saltar, correr, apretar una pelota anti-estrés

---

## La autoestima: el mayor riesgo

Los niños con TDAH reciben muchas más críticas que elogios. Contrarresta activamente:

- 3 comentarios positivos específicos por cada corrección
- Celebra el progreso, no solo el resultado
- Ayúdale a encontrar actividades donde brille naturalmente`,
  },
  {
    slug: 'sueno-y-tdah',
    title: 'Sueño y TDAH',
    emoji: '🌙',
    category: 'salud',
    categoryLabel: 'Salud',
    summary: 'La relación entre el TDAH y los problemas del sueño, y estrategias concretas para establecer rutinas de descanso que funcionen.',
    readTime: 5,
    targetAudience: 'parents',
    content: `## ¿Por qué los niños con TDAH duermen mal?

Entre el 50% y el 70% de las personas con TDAH tienen algún problema relacionado con el sueño. Los más comunes son:

- Dificultad para "apagar" el cerebro al acostarse
- Retraso de fase — activos por la noche, somnolientos por la mañana
- Insomnio de conciliación — tardan más de 30-45 minutos en dormirse
- Resistencia a la hora de dormir

---

## Estrategias para mejorar el sueño

### Rutina nocturna (45-60 min antes de dormir)
1. Baño o ducha con agua tibia
2. Pijama y preparación del cuarto (oscuro, fresco, silencioso)
3. Tiempo tranquilo: leer, dibujar, música suave
4. Luces bajas — evitar luz azul de pantallas
5. Misma hora todos los días (también fines de semana)

### Lo que hay que evitar
- ❌ Pantallas en el cuarto en las 2 horas previas
- ❌ Actividad física intensa después de cenar
- ❌ Cambiar el horario de sueño los fines de semana más de 1 hora

### Estrategias específicas para el cerebro con TDAH
- **Audio para dormir:** meditaciones guiadas para niños
- **Mantas ponderadas:** pueden ayudar con la sensación de calma
- **Listas de preocupaciones:** escribir los pensamientos para "sacarlos de la cabeza"`,
  },
  {
    slug: 'alimentacion-y-tdah',
    title: 'Alimentación y TDAH',
    emoji: '🥦',
    category: 'salud',
    categoryLabel: 'Salud',
    summary: 'Qué dice la ciencia sobre la relación entre alimentación y TDAH, qué alimentos pueden ayudar a la concentración y cuáles es mejor limitar.',
    readTime: 5,
    targetAudience: 'parents',
    content: `## Alimentación y TDAH: qué dice la ciencia

La alimentación no causa ni cura el TDAH, pero **puede influir en la intensidad de los síntomas**.

---

## Nutrientes que apoyan la concentración

### Omega-3
Varios estudios muestran que los niños con TDAH tienen niveles más bajos de omega-3:
- Pescado azul: salmón, sardinas (2-3 veces por semana)
- Semillas de chía y linaza, nueces

### Proteínas en el desayuno
Ayudan a estabilizar la glucosa y mejoran la concentración:
- Huevo, yogur griego, jamón, legumbres

### Hierro, zinc y magnesio
Las deficiencias de estos minerales se asocian a síntomas más intensos.

---

## Qué limitar

### Azúcares refinados y ultraprocesados
Los picos de glucosa seguidos de caídas bruscas afectan la energía:
- Limitar bebidas azucaradas, bollería industrial

### Colorantes alimentarios artificiales
Algunos estudios sugieren que ciertos colorantes pueden empeorar la hiperactividad en niños susceptibles. Revisar etiquetas: tartrazina (E102), amarillo ocaso (E110).

---

## Un día de alimentación fácil

- **Desayuno:** huevo revuelto + tostada integral + leche
- **Almuerzo:** lentejas con verduras + fruta
- **Merienda:** yogur griego + nueces
- **Cena:** salmón al horno + verduras + arroz integral`,
  },
  {
    slug: 'tdah-en-adolescentes',
    title: 'TDAH en adolescentes',
    emoji: '🚀',
    category: 'familia',
    categoryLabel: 'Familia',
    summary: 'Los retos únicos del TDAH en la adolescencia: identidad, relaciones sociales, rendimiento académico y cómo acompañar esta etapa sin perder la conexión.',
    readTime: 6,
    targetAudience: 'parents',
    content: `## El TDAH en la adolescencia

Para un adolescente con TDAH, los cambios se amplifican y vienen con retos específicos.

---

## Los nuevos retos

### Académicos
- Más asignaturas, más proyectos largos, más autonomía requerida
- La procrastinación se vuelve el principal problema
- Las notas pueden caer bruscamente al pasar a secundaria

### Sociales
- La impulsividad puede dañar amistades y relaciones románticas
- Mayor riesgo de presión de grupo
- Las redes sociales amplifican la distracción

### Emocionales
- Crisis de identidad: "¿Por qué soy así?"
- Mayor riesgo de ansiedad y depresión
- Pueden rechazar el diagnóstico: "No quiero ser diferente"

---

## Lo que cambia en el tratamiento

En la adolescencia, el adolescente debe ser **protagonista** de su tratamiento:

- Incluirle en las decisiones sobre medicación y terapia
- Negociar las estrategias en lugar de imponerlas
- Fomentar la autogestión progresiva

---

## Cómo mantener la conexión

- Reduce las críticas y aumenta las preguntas genuinas
- Elige tus batallas: no todo puede ser motivo de conflicto
- Interésate por sus intereses, aunque no los compartas

---

## Señales de alerta

Busca ayuda profesional urgente si observas:
- Aislamiento social severo o abandono escolar
- Consumo de alcohol, tabaco o cannabis
- Habla de hacerse daño`,
  },
  {
    slug: 'mitos-y-realidades',
    title: 'Mitos y realidades',
    emoji: '🔮',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos',
    summary: 'Desmontamos los 10 mitos más comunes sobre el TDAH con evidencia científica actual. Porque la desinformación hace daño real.',
    readTime: 5,
    targetAudience: 'all',
    content: `## Mitos y realidades sobre el TDAH

---

### ❌ Mito 1: "El TDAH es solo cosa de niños inquietos"
**Realidad:** El TDAH afecta la atención y las funciones ejecutivas — no solo la hiperactividad. El tipo inatento puede ser más difícil de detectar.

---

### ❌ Mito 2: "Si puede concentrarse en videojuegos, no tiene TDAH"
**Realidad:** El TDAH no impide la concentración en actividades estimulantes. El problema es **sostener la atención cuando la tarea es aburrida**.

---

### ❌ Mito 3: "Los medicamentos para el TDAH crean adicción"
**Realidad:** Bajo supervisión médica, son seguros y efectivos. El tratamiento adecuado **reduce** el riesgo de consumo de sustancias en la adultez.

---

### ❌ Mito 4: "El TDAH es una excusa para el mal comportamiento"
**Realidad:** El TDAH tiene una base neurobiológica documentada. Las dificultades conductuales no son elecciones conscientes.

---

### ❌ Mito 5: "El TDAH es un invento de las farmacéuticas"
**Realidad:** El TDAH fue descrito en 1902. La neuroimagen muestra diferencias cerebrales reales. Es reconocido por la OMS y la APA.

---

### ❌ Mito 6: "Solo afecta a niños varones"
**Realidad:** Afecta por igual a niños y niñas, pero las niñas presentan más frecuentemente el tipo inatento.

---

### ❌ Mito 7: "Con más disciplina se cura"
**Realidad:** La disciplina no cambia la neurobiología. Exigir más sin las herramientas adecuadas solo daña la autoestima.

---

### ❌ Mito 8: "El TDAH desaparece al llegar a la adultez"
**Realidad:** En el 60-70% de los casos, persiste en la adultez.

---

### ❌ Mito 9: "El azúcar causa TDAH"
**Realidad:** Múltiples estudios no encontraron relación causal entre el azúcar y el TDAH.

---

### ❌ Mito 10: "Un niño con TDAH no puede tener éxito"
**Realidad:** Con las estrategias adecuadas, las personas con TDAH pueden y logran vidas plenas y extraordinarias.`,
  },
  {
    slug: 'glosario',
    title: 'Glosario de términos',
    emoji: '📖',
    category: 'recursos',
    categoryLabel: 'Recursos',
    summary: 'Definiciones claras de los términos más usados en el mundo del TDAH: desde DSM-5 hasta funciones ejecutivas, pasando por neurodiversidad.',
    readTime: 4,
    targetAudience: 'parents',
    content: `## Glosario de términos clave del TDAH

---

**TDAH** — Trastorno por Déficit de Atención e Hiperactividad. Condición del neurodesarrollo que afecta la atención, el control de impulsos y el nivel de actividad.

---

**DSM-5** — Manual Diagnóstico y Estadístico de la APA (5ª edición). Define los criterios diagnósticos del TDAH.

---

**Funciones ejecutivas** — Habilidades cognitivas para planificar, organizar, iniciar tareas y controlar impulsos. Son las más afectadas en el TDAH.

---

**Neurodiversidad** — Concepto que reconoce que las variaciones neurológicas (TDAH, autismo, dislexia) son parte de la diversidad humana natural.

---

**Metilfenidato (Ritalín, Concerta)** — Medicamento estimulante más utilizado para el TDAH. Aumenta los niveles de dopamina y noradrenalina.

---

**Atomoxetina (Strattera)** — Medicamento no estimulante para el TDAH. Actúa sobre la noradrenalina.

---

**Hiperfoco** — Estado de concentración intensa en una tarea de alto interés. El mismo cerebro que no puede atender una clase puede pasar horas en un proyecto que le apasiona.

---

**DSR (Disforia Sensible al Rechazo)** — Dolor emocional intenso ante la percepción de crítica o rechazo. Muy común en personas con TDAH.

---

**Comorbilidad** — Presencia de dos o más condiciones en la misma persona. El TDAH frecuentemente coexiste con ansiedad, depresión o dislexia.

---

**Intervención multimodal** — Tratamiento que combina medicación, terapia psicológica, apoyo educativo e intervención familiar. Es el enfoque más efectivo.

---

**Acomodaciones académicas** — Ajustes en el entorno o la evaluación: tiempo extra, instrucciones escritas, asiento preferencial.`,
  },
  {
    slug: 'noticias-y-blog',
    title: 'Noticias e investigaciones',
    emoji: '🔬',
    category: 'recursos',
    categoryLabel: 'Recursos',
    summary: 'Avances recientes en la investigación sobre el TDAH: nuevas terapias, hallazgos en neuroimagen y lo más relevante de la ciencia actual.',
    readTime: 5,
    targetAudience: 'all',
    content: `## Lo más reciente en investigación sobre TDAH

---

## Neuroimagen: el cerebro con TDAH

Estudios con resonancia magnética funcional (fMRI) muestran diferencias en el volumen y la conectividad de varias regiones cerebrales, especialmente en:

- **Corteza prefrontal** — planificación y control de impulsos
- **Núcleo caudado** — aprendizaje por recompensa

Estos hallazgos confirman que el TDAH tiene una base neurobiológica real y observable.

---

## Genética del TDAH

Investigaciones de gran escala han identificado **cientos de variantes genéticas** asociadas al TDAH. Esto explica la alta tasa de heredabilidad (70-80%) y abre la puerta a tratamientos más personalizados.

---

## Nuevas terapias no farmacológicas

### Neurofeedback
Técnica que entrena al cerebro a regular sus propias ondas cerebrales. Varios estudios muestran mejoras en atención e impulsividad.

### Mindfulness para TDAH
Programas de atención plena adaptados para niños muestran reducciones en síntomas de inatención y mejoras en regulación emocional.

---

## Tendencias para el futuro

- **Biomarcadores** — indicadores biológicos objetivos que faciliten el diagnóstico
- **Medicina de precisión** — adaptar el tratamiento al perfil genético de cada persona
- **Apps terapéuticas** — aplicaciones clínicamente validadas como complemento al tratamiento

---

## Dónde seguir la investigación

- **PubMed** (pubmed.ncbi.nlm.nih.gov)
- **CHADD Research** (chadd.org/research)
- **Revista de Psiquiatría y Salud Mental**`,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter(a => a.category === category)
}
