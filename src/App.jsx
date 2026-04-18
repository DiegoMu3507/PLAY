import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import InfoTDAH from './pages/InfoTDAH';
import Games from './pages/Games';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-[#1d1d1f]">
        
        {/* Navegación Minimalista Superior */}
        <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100">
          <Link to="/" className="text-xl font-black tracking-tighter hover:text-apple-blue transition-colors">
            TDAH.KIDS
          </Link>
          <div className="flex gap-10 items-center">
            <Link to="/info" className="text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 transition-opacity">Aprende</Link>
            <Link to="/games" className="text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 transition-opacity">Juega</Link>
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<InfoTDAH />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </main>

        <footer className="py-20 text-center border-t border-gray-50">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20">TDAH Kids • 2026</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
