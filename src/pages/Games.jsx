import React from 'react';
import GameCard from '../components/ui/GameCard';
import Button from '../components/ui/Button';

function Games() {
  const categories = ['Todos', 'Atención', 'Memoria', 'Relajación'];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-32 space-y-20 text-current">
      <header className="space-y-6">
        <span className="text-apple-blue font-bold tracking-widest uppercase text-xs">Plataforma</span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">Entrenar <br/> el enfoque.</h1>
        <p className="text-xl md:text-3xl opacity-70 leading-relaxed max-w-3xl">
          Actividades diseñadas con neuropsicólogos para fortalecer la atención sostenida.
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        {categories.map((cat, index) => (
          <button 
            key={cat} 
            className={`px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${index === 0 ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20' : 'bg-slate-100 dark:bg-slate-900 border border-current/10 opacity-60 hover:opacity-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <GameCard title="Busca el Intruso" category="Atención" icon="🕵️‍♂️" description="Estimulación visual selectiva." status="En Desarrollo" />
        <GameCard title="Parejas Mágicas" category="Memoria" icon="🃏" description="Memoria de trabajo operativa." status="En Desarrollo" />
        <GameCard title="Burbujas" category="Relajación" icon="🧼" description="Regulación emocional y calma." status="En Desarrollo" />
      </div>
    </div>
  );
}

export default Games;
