# 🧠 FocoAventura: Explorando el TDAH

¡Bienvenido a **FocoAventura**! Una plataforma web inmersiva diseñada para informar sobre el Trastorno por Déficit de Atención e Hiperactividad (TDAH) de una manera positiva, moderna y dinámica.

## 🚀 Visión General

FocoAventura no es solo una página informativa; es una experiencia digital que utiliza técnicas de **Scrollytelling** para guiar al usuario a través de una narrativa de auto-aceptación y empoderamiento. El proyecto combina un diseño minimalista de alto nivel con juegos cognitivos diseñados para ejercitar la concentración.

## ✨ Características Principales

### 🎭 Narrativa Inmersiva (Home)
- **Scrollytelling:** Animaciones fluidas que revelan mensajes positivos conforme el usuario se desplaza.
- **Marca de Agua Dinámica:** Fondo con efecto Parallax ("FOCUS") que aporta profundidad visual.
- **Glassmorphism:** Interfaz moderna basada en paneles de cristal translúcido.

### 📚 Sección de Aprendizaje (Aprender)
- **Guía de Superpoderes:** Contenido estructurado que resalta las fortalezas del TDAH (creatividad, hiperfoco, resiliencia).
- **Estrategias de Apoyo:** Consejos prácticos para la vida diaria organizados visualmente.
- **Consultas Personalizadas:** Formulario inteligente con selección de país (`react-select`).

### 🎮 Gimnasio Cognitivo (Jugar)
- **Memory Game 3D:** Un juego de memoria con física de rotación en 3D para entrenar la atención sostenida.
- **Dashboard de Enfoque:** Interfaz estilo tablero para seguir el progreso y aceptar retos diarios.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React (JavaScript) + Vite.
- **Estilos:** Tailwind CSS v4 (Configuración de vanguardia).
- **Animaciones:** Framer Motion (Micro-interacciones y lógica de scroll).
- **Componentes UI:** DaisyUI.
- **Enrutamiento:** React Router DOM.
- **Iconos:** React Icons.
- **Utilidades:** 
  - `date-fns`: Manejo de fechas.
  - `react-select` & `react-select-country-list`: Formularios avanzados.

## 📋 Requerimientos e Instalación

Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/).

### 1. Clonar o entrar a la carpeta del proyecto:
```bash
cd foco-aventura
```

### 2. Instalar todas las dependencias:
Ejecuta el siguiente comando para instalar el motor de animaciones, los estilos y las utilidades necesarias:

```bash
npm install
```

Si por alguna razón necesitas instalar las dependencias clave manualmente:
```bash
npm install framer-motion react-router-dom lucide-react react-icons daisyui react-select react-select-country-list date-fns
```

### 3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173/`.

## 📁 Estructura del Proyecto

- `/src/layouts`: Contiene el `MainLayout` con la lógica del menú adaptativo.
- `/src/pages`: Vistas principales (`Home`, `Info`, `Juegos`).
- `/src/games`: Lógica y componentes de los juegos interactivos.
- `/src/index.css`: Definición de la paleta de colores familiar y utilidades 3D.

---
*FocoAventura • "Tu mente, tu ritmo, tu éxito."*
