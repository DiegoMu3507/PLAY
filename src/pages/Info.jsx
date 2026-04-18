import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaLightbulb, FaTools, FaBolt, FaRocket, FaHeart } from 'react-icons/fa';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-8 flex flex-col gap-4 border-slate-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-xl group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
      <Icon />
    </div>
    <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const Info = () => {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Hero Section */}
      <header className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm"
        >
          Guía de Comprensión
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-slate-800 mt-4 mb-6 tracking-tight"
        >
          Entender tu mente es <br /> el primer <span className="text-blue-500">superpoder.</span>
        </motion.h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          El TDAH no es un límite, es una forma diferente de procesar el mundo. Descubre cómo optimizar tu potencial.
        </p>
      </header>

      {/* Grid de Secciones Principales */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <FeatureCard 
          icon={FaQuestionCircle} 
          title="¿Qué es el TDAH?" 
          description="Una variación neurobiológica que influye en la regulación de la atención y los impulsos. Es un cerebro que busca estímulos de forma única."
          color="text-blue-500 bg-blue-500"
        />
        <FeatureCard 
          icon={FaLightbulb} 
          title="Fortalezas" 
          description="Creatividad desbordante, hiperfoco en pasiones, resiliencia y una capacidad inigualable para conectar ideas distantes."
          color="text-amber-500 bg-amber-500"
        />
        <FeatureCard 
          icon={FaTools} 
          title="Estrategias" 
          description="Desde la gestión visual del tiempo hasta la creación de entornos libres de distracciones. Pequeños cambios, grandes resultados."
          color="text-green-500 bg-green-500"
        />
      </div>

      {/* Sección Detallada con Estilo Moderno */}
      <section className="grid lg:grid-cols-2 gap-16 items-center mb-24 bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-4 font-bold">
            <FaRocket /> <span>CRECIMIENTO</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">Optimiza tu día a día</h2>
          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                <p className="text-slate-600"><span className="font-bold">Listas Visuales:</span> Reduce la carga cognitiva usando apoyos externos para la memoria.</p>
             </div>
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                <p className="text-slate-600"><span className="font-bold">Pausas Activas:</span> Tu cerebro necesita movimiento para resetear la atención.</p>
             </div>
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
                <p className="text-slate-600"><span className="font-bold">Entorno Seguro:</span> Minimiza ruidos y distracciones visuales en tu zona de trabajo.</p>
             </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-[3rem] flex items-center justify-center text-white text-[10rem] shadow-2xl">
            <FaBolt className="animate-pulse" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-panel p-6 bg-white shadow-xl">
             <p className="text-slate-800 font-bold text-center">Tip del día:<br/><span className="text-blue-500">Usa cronómetros visuales.</span></p>
          </div>
        </div>
      </section>

      {/* Formulario de Consulta */}
      <section className="max-w-4xl mx-auto glass-panel p-10 md:p-16 border-blue-100 bg-blue-50/30">
        <div className="text-center mb-10">
          <FaHeart className="text-pink-500 text-3xl mx-auto mb-4" />
          <h2 className="text-3xl font-black text-slate-800">¿Deseas profundizar más?</h2>
          <p className="text-slate-500 font-medium">Déjanos tu consulta y te enviaremos recursos específicos para tu país.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tu Región</label>
            <Select 
              options={options} 
              placeholder="Selecciona país..."
              styles={{
                control: (base) => ({ ...base, borderRadius: '1rem', padding: '4px', border: '2px solid #f1f5f9' }),
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email</label>
            <input 
              type="email" 
              placeholder="hola@ejemplo.com" 
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-[11px] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>
        <button className="mt-10 w-full bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 active:scale-95">
          Enviar Recursos Gratuitos
        </button>
      </section>
    </div>
  );
};

export default Info;
