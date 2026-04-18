import React from 'react';
import { motion } from 'framer-motion';
import { FaMemory, FaBolt, FaBrain, FaChartLine } from 'react-icons/fa';
import MemoryGame from '../games/MemoryGame';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-opacity-10 text-xl`}>
      <Icon />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-black text-slate-800">{value}</p>
    </div>
  </div>
);

const Juegos = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Header Dashboard */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm"
          >
            Entrenamiento Mental
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-800 mt-2 mb-4 tracking-tight"
          >
            Gimnasio <span className="text-blue-500">Cognitivo</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Ejercicios diseñados científicamente para mejorar la atención sostenida y la memoria de trabajo de forma divertida.
          </p>
        </div>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
           <StatCard icon={FaBrain} label="Enfoque" value="Nivel 1" color="text-blue-500 bg-blue-500" />
           <StatCard icon={FaChartLine} label="Progreso" value="+12%" color="text-green-500 bg-green-500" />
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Juego Principal: Memoria */}
        <section className="lg:col-span-2 order-2 lg:order-1">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden bg-white border-slate-100 shadow-xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-100">
                  <FaMemory />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Memoria Visual</h2>
                  <p className="text-slate-400 font-medium italic">Encuentra los pares para ganar</p>
                </div>
              </div>
              <div className="hidden md:block px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
                Nivel: Normal
              </div>
            </div>

            <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
               <MemoryGame />
            </div>
          </div>
        </section>

        {/* Sidebar de Retos y Próximos */}
        <aside className="space-y-8 order-1 lg:order-2">
          <div className="glass-panel p-8 bg-blue-600 text-white border-none shadow-xl shadow-blue-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
             <h3 className="text-xl font-bold mb-2">Reto Diario</h3>
             <p className="text-blue-100 text-sm mb-6 leading-relaxed">Completa 3 rondas del juego de memoria hoy para ganar 50 puntos de enfoque.</p>
             <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">
                Aceptar Reto
             </button>
          </div>

          <div className="glass-panel p-8 bg-white border-slate-100 shadow-sm opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-not-allowed">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xl mb-4">
               <FaBolt />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Atención Rápida</h3>
            <p className="text-slate-400 text-sm font-medium">Desbloquea al alcanzar Nivel 5 de Enfoque.</p>
            <div className="mt-6 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-1/3" />
            </div>
          </div>
          
          <div className="p-4 text-center">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">¿Por qué jugar?</p>
             <p className="text-slate-500 text-sm mt-2 italic">"La ludificación ayuda a liberar dopamina de forma controlada, facilitando el aprendizaje."</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Juegos;
