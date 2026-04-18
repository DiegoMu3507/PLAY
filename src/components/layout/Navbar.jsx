import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black text-calm-700 flex items-center gap-2">
        <span className="bg-soft-blue w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg">P</span>
        TDAH Kids
      </Link>
      
      <div className="flex gap-8 font-semibold text-slate-500">
        <Link to="/" className="hover:text-calm-500 transition-colors">Inicio</Link>
        <Link to="/info" className="hover:text-calm-500 transition-colors">Concientización</Link>
        <Link to="/games" className="hover:text-soft-pink transition-colors">Juegos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
