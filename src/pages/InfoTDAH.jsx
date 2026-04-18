import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

function InfoTDAH() {
  const [progress, setProgress] = useLocalStorage('tdah_progress', {
    definition: false,
    myths: false,
    tips: false
  });

  const toggleRead = (key) => {
    setProgress({ ...progress, [key]: !progress[key] });
  };

  const sections = [
    {
      id: 'definition',
      title: 'La Esencia',
      content: 'El TDAH es una orquesta donde el director marca un ritmo diferente. No es falta de música, es otra forma de interpretar la partitura.',
      status: progress.definition
    },
    {
      id: 'myths',
      title: 'Claridad',
      content: 'Más allá de las etiquetas. El enfoque no se pierde, se diversifica. La energía no sobra, busca su canal.',
      status: progress.myths
    },
    {
      id: 'tips',
      title: 'Estrategia',
      content: 'Pasos pequeños. Ambientes limpios. El silencio visual es el mejor aliado de la concentración.',
      status: progress.tips
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-32 space-y-40 text-current">
      <header className="space-y-6">
        <span className="text-apple-blue font-bold tracking-widest uppercase text-xs">Conocimiento</span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">Entender <br/> para conectar.</h1>
      </header>

      <div className="space-y-48">
        {sections.map((section) => (
          <section key={section.id} className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{section.title}</h2>
              <p className="text-xl md:text-3xl opacity-70 leading-relaxed font-medium">
                {section.content}
              </p>
              <button 
                onClick={() => toggleRead(section.id)}
                className={`px-10 py-4 rounded-full font-bold transition-all border-2 text-sm uppercase tracking-widest ${section.status ? 'bg-apple-blue border-apple-blue text-white' : 'border-current opacity-50 hover:opacity-100 hover:scale-105'}`}
              >
                {section.status ? 'Módulo Completado' : 'Marcar como leído'}
              </button>
            </div>
            <div className={`h-[400px] rounded-[4rem] ${section.id === 'definition' ? 'bg-soft-blue/10' : section.id === 'myths' ? 'bg-soft-pink/10' : 'bg-soft-green/10'} border border-current/5 flex items-center justify-center text-9xl grayscale hover:grayscale-0 transition-all duration-1000`}>
              {section.id === 'definition' ? '🧩' : section.id === 'myths' ? '✨' : '🌿'}
            </div>
          </section>
        ))}
      </div>

      <footer className="text-center py-24 border-t border-current/10 opacity-30 text-[10px] tracking-[0.5em] uppercase font-black">
        TDAH Kids • 2026
      </footer>
    </div>
  );
}

export default InfoTDAH;
