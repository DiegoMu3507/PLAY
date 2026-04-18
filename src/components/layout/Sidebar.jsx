import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/', label: 'Inicio', icon: '🏠' },
    { to: '/info', label: 'Concientización', icon: '🧠' },
    { to: '/games', label: 'Juegos Didácticos', icon: '🎮' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white border-r border-slate-100 p-6 shadow-sm">
      <div className="mb-12 flex items-center gap-3">
        <div className="bg-calm-600 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg">
          P
        </div>
        <span className="text-xl font-black text-calm-800 tracking-tight">TDAH Kids</span>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                isActive
                  ? 'bg-calm-50 text-calm-700 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`
            }
          >
            <span className="text-2xl">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-soft-blue/10 rounded-3xl border border-soft-blue/20">
        <p className="text-sm font-bold text-calm-700 mb-2">💡 Tip de hoy:</p>
        <p className="text-xs text-slate-500 leading-relaxed italic">
          "Pequeños pasos llevan a grandes metas. ¡Tómate un descanso!"
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
