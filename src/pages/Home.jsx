import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      // Ajustamos el progreso para que la animación termine antes de llegar a las tarjetas
      const progress = Math.min(scrolled * 1.8, 1); 
      
      document.documentElement.style.setProperty('--scroll-progress', progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* SECCIÓN HERO ANIMADA (SCROLL-DRIVEN) */}
      <section className="relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* TÍTULO HERO */}
          <div className="hero-title absolute z-20 flex flex-col items-center gap-4 text-center px-4 pointer-events-none">
            <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.8] text-white drop-shadow-2xl">
              MENTES
            </h1>
            <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.8] text-white/90 drop-shadow-2xl">
              ÚNICAS.
            </h1>
          </div>

          {/* CUADRO AZUL CENTRAL */}
          <div className="hero-box relative w-full h-full bg-[#0071e3] z-10 flex items-center justify-center">
             <div className="text-white/5 font-black text-[30vw] select-none tracking-tighter">
               FOCUS
             </div>
          </div>

          {/* MENSAJE FINAL DEL HERO - Bajado al 3% para máximo recorrido */}
          <div className="hero-message absolute bottom-[3%] text-center px-6 z-40 max-w-4xl pointer-events-auto">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 text-[#1d1d1f]">
              La claridad <br /> comienza aquí.
            </h2>
            <div className="flex justify-center gap-6">
              <Link to="/games" className="bg-[#1d1d1f] text-white px-12 py-5 rounded-full font-bold hover:scale-105 transition-transform text-xl shadow-2xl">
                ¡Empezar a Jugar!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: TARJETAS INFORMATIVAS (Recuperadas) */}
      <section className="relative z-30 bg-white py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">¿Por qué TDAH Kids?</h3>
            <p className="text-xl md:text-2xl opacity-40 max-w-2xl font-medium leading-relaxed">
              Un enfoque diseñado para potenciar las habilidades naturales de cada niño en un entorno seguro.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="Didáctico" 
              description="Juegos estructurados para mejorar la concentración y la memoria de forma natural, sin presiones."
              className="border-gray-100"
            >
              <span className="text-5xl block mt-4">🧩</span>
            </Card>

            <Card 
              title="Calmado" 
              description="Un entorno visualmente tranquilo, libre de distracciones y sobreestimulación para facilitar el enfoque."
              className="border-gray-100"
            >
              <span className="text-5xl block mt-4">🌿</span>
            </Card>

            <Card 
              title="Empático" 
              description="Información creada para sensibilizar y educar con empatía, celebrando la neurodiversidad."
              className="border-gray-100"
            >
              <span className="text-5xl block mt-4">❤️</span>
            </Card>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE MANIFIESTO FINAL */}
      <section className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-10 py-32">
        <div className="max-w-5xl space-y-12 text-center md:text-left">
          <h3 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-none">
            Diseñamos para la <span className="text-[#0071e3]">atención</span>.
          </h3>
          <p className="text-2xl md:text-4xl opacity-40 font-medium leading-tight">
            Un espacio donde el TDAH no es una etiqueta, sino un motor de creatividad y energía inagotable.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
