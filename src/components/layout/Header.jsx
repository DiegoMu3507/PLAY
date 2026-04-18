import React from 'react';

const Header = () => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-black text-slate-800 hidden md:block">
          Panel de Control
        </h2>
        {/* Mobile Logo visibility toggle */}
        <div className="md:hidden flex items-center gap-2">
           <div className="bg-calm-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm">P</div>
           <span className="font-black text-slate-800">TDAH Kids</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex -space-x-2">
          {/* Mockup de avatares */}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-soft-pink flex items-center justify-center text-xl shadow-sm">👧</div>
          <div className="w-10 h-10 rounded-full border-2 border-white bg-soft-blue flex items-center justify-center text-xl shadow-sm">👦</div>
        </div>
        <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-calm-600 transition-colors border border-slate-100">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
