# 🧠 FocoAventura (Proyecto PLAY)

¡Bienvenido a **FocoAventura**! Una plataforma web de vanguardia diseñada para transformar la percepción del Trastorno por Déficit de Atención e Hiperactividad (TDAH). A través de una narrativa inmersiva y herramientas lúdicas, buscamos empoderar a la comunidad neurodivergente.

---

## 🚀 Visión Técnica y UX

FocoAventura trasciende el concepto de una web informativa convencional. Se ha construido bajo los más altos estándares de ingeniería frontend y diseño UI/UX:

- **Arquitectura de Scrollytelling:** Implementación avanzada de `framer-motion` para guiar al usuario a través de una experiencia cinematográfica impulsada por el scroll.
- **Estética Minimalista SaaS:** Una paleta de colores familiar y acogedora (Azul Cielo, Blanco, Cristal) optimizada para reducir la fatiga visual y fomentar el enfoque.
- **Diseño Adaptativo:** Totalmente Mobile-First, garantizando una experiencia fluida en cualquier dispositivo.

## ✨ Módulos Principales

### 🎭 Experiencia Inmersiva (Home)
- **Animaciones de Scroll:** Mensajes positivos que emergen y se desvanecen con lógica de hardware (`display: none` dinámico) para un rendimiento óptimo.
- **Marca de Agua Focus:** Textura visual dinámica con efectos de contorno y parallax.
- **Final Estacionario:** Un menú de opciones final bloqueado en el centro del visor para facilitar la conversión y navegación.

### 📚 Centro de Aprendizaje (Aprender)
- **Estructura Bento:** Organización jerárquica de la información utilizando tarjetas de cristal translúcido.
- **Enfoque en Fortalezas:** Sección dedicada a los "superpoderes" del TDAH, resaltando la creatividad y el hiperfoco.
- **Recursos Dinámicos:** Integración de formularios inteligentes con selección geográfica global.

### 🎮 Gimnasio Cognitivo (Jugar)
- **Memory Game 3D:** Motor de juego en React con transformaciones físicas en el eje Y para entrenar la memoria de trabajo.
- **Dashboard de Progreso:** Interfaz tipo "Control Center" para gestionar retos y visualizar estadísticas de entrenamiento.

## 🛠️ Stack Tecnológico

- **Core:** React 18 + Vite (Ecosistema ultra-rápido).
- **Styling:** Tailwind CSS v4 + DaisyUI (Sistemas de diseño atómico).
- **Motion:** Framer Motion (Orquestación de animaciones complejas).
- **Form Management:** React Select + Country List.
- **Iconografía:** React Icons (FontAwesome).

## 📋 Guía de Instalación y Uso

### 1. Preparación del Entorno
Clona el repositorio y accede a la carpeta raíz:
```bash
git clone https://github.com/DiegoMu3507/PLAY.git
cd PLAY
```

### 2. Instalación de Dependencias
Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Ejecuta:
```bash
npm install
```

### 3. Desarrollo Local
Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173/`

## 📁 Estructura del Código

```text
/src
 ├── /assets      # Recursos visuales y logotipos
 ├── /components  # Componentes atómicos reutilizables
 ├── /games       # Lógica de motores de juego
 ├── /layouts     # MainLayout y navegación adaptativa
 ├── /pages       # Vistas de alto nivel (Home, Info, Juegos)
 └── index.css    # Definición de tokens de diseño y utilidades 3D
```

---
**FocoAventura** • *Tu mente tiene su propio ritmo, y eso es lo que la hace extraordinaria.*
