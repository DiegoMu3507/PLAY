import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const Home = () => {
  const containerRef = useRef(null);
  
  // Altura restaurada a 400vh para un scroll más pausado
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // FASE 1: "Tu mente..." - Desaparece al 20%
  const p1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0, 0]);
  const p1Display = useTransform(scrollYProgress, [0, 0.2, 0.21], ["flex", "none"]);

  // FASE 2: "...excepcional" - Aparece al 25% y se va al 65%
  const p2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const p2Display = useTransform(scrollYProgress, [0, 0.24, 0.65, 0.66], ["none", "flex", "flex", "none"]);

  // FASE 3: EL DESTINO FINAL - Sincronizada exactamente al 100%
  const ctaOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.75, 1], [0.9, 1]);
  const ctaY = useTransform(scrollYProgress, [0.75, 1], [50, 0]);
  const ctaDisplay = useTransform(scrollYProgress, [0, 0.74], ["none", "flex"]);

  return (
    <div ref={containerRef} className="h-[400vh] relative bg-blue-500 overflow-clip">
      
      {/* Fondo FOCUS */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <h1 className="text-[25vw] font-black text-white select-none tracking-tighter"
            style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
          FOCUS
        </h1>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Frase 1 */}
        <motion.div 
          style={{ opacity: p1Opacity, display: p1Display }} 
          className="absolute inset-0 flex items-center justify-center px-6 text-center z-10"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter max-w-4xl">
            Tu mente tiene su <br /> <span className="text-blue-200">propio ritmo...</span>
          </h1>
        </motion.div>

        {/* Frase 2 */}
        <motion.div 
          style={{ opacity: p2Opacity, display: p2Display }} 
          className="absolute inset-0 flex items-center justify-center px-6 text-center z-10"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter max-w-4xl">
            ...eso te hace <br /> <span className="text-blue-100 italic">excepcional.</span>
          </h2>
        </motion.div>

        {/* DESTINO FINAL */}
        <motion.div 
          style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY, display: ctaDisplay }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-50"
        >
          <div className="glass-panel p-10 md:p-16 w-full max-w-4xl text-center relative border-white/30 shadow-2xl bg-white/10 backdrop-blur-2xl">
            <div className="flex justify-center gap-4 mb-8 text-white/50 text-3xl">
               <FaStar className="animate-pulse" />
               <FaStar className="text-white scale-125" />
               <FaStar className="animate-pulse" />
            </div>

            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none uppercase">
              Comienza tu <br /> <span className="text-blue-200">aventura</span>
            </h3>
            
            <p className="text-blue-100 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Estamos aquí para acompañarte en cada paso. <br /> Elige cómo quieres empezar hoy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
              <Link to="/juegos" className="bg-white text-blue-600 px-12 py-6 rounded-3xl font-bold text-xl hover:scale-105 transition-all shadow-xl">
                ¡Quiero Jugar! <FaArrowRight className="inline ml-2" />
              </Link>
              <Link to="/info" className="bg-transparent border-2 border-white/40 text-white px-12 py-6 rounded-3xl font-bold text-xl hover:bg-white/10 transition-all">
                Saber más
              </Link>
            </div>
          </div>
          
          <footer className="absolute bottom-8 w-full text-center text-blue-200/40 text-sm font-medium">
            <p>© 2026 FocoAventura • Tu mente, tu ritmo, tu éxito.</p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
