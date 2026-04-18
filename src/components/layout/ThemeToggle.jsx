import React from 'react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="fixed top-8 right-10 z-50">
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        title={darkMode ? "Activar Modo Claro" : "Activar Modo Noche"}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-black shadow-inner text-xl">
          {darkMode ? '☀️' : '🌙'}
        </div>
        <span className="hidden md:block pr-4 text-[10px] font-black uppercase tracking-widest opacity-50">
          {darkMode ? 'Claro' : 'Noche'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
