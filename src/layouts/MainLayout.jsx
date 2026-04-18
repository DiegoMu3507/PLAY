import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaGamepad, FaInfoCircle, FaHome } from 'react-icons/fa';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Restauramos la lógica de cambio de estilo por scroll
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // El menú vuelve a ser adaptativo (transparente -> sólido)
  const isSolid = !isHome || isScrolled;

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isHome ? 'bg-blue-500' : 'bg-white'}`}>
      {/* Navbar Adaptativo Restaurado */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`px-6 py-4 flex items-center justify-between rounded-[2rem] transition-all duration-500 ${
            isSolid 
              ? 'bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800' 
              : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isSolid ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}>
              <FaBrain className="text-xl" />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${isSolid ? 'text-slate-800' : 'text-white'}`}>
              FocoAventura
            </span>
          </Link>

          <div className={`flex items-center gap-1 sm:gap-4 text-sm font-bold transition-colors ${isSolid ? 'text-slate-500' : 'text-white/70'}`}>
            {[
              { to: '/', icon: <FaHome />, label: 'Inicio' },
              { to: '/info', icon: <FaInfoCircle />, label: 'Aprener' },
              { to: '/juegos', icon: <FaGamepad />, label: 'Jugar' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 transition-all px-4 py-2 rounded-2xl ${
                  location.pathname === link.to 
                    ? (isSolid ? 'bg-blue-50 text-blue-600' : 'bg-white/20 text-white') 
                    : (isSolid ? 'hover:text-slate-800 hover:bg-slate-50' : 'hover:text-white hover:bg-white/10')
                }`}
              >
                {link.icon}
                <span className="hidden md:block">{link.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Restauramos el padding inferior y superior del layout original */}
      <main className={`container mx-auto px-6 ${isHome ? 'pt-0 pb-0' : 'pt-32 pb-20'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!isHome && (
        <footer className="py-12 text-center text-slate-400 text-sm font-medium border-t border-slate-50">
          <p>© 2026 FocoAventura • Diseñado para brillar.</p>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
