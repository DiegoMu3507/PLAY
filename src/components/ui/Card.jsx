import React from 'react';

const Card = ({ title, description, icon, children, className = '', color = 'white' }) => {
  const bgColors = {
    white: 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700',
    blue: 'bg-calm-50 dark:bg-calm-900/20 border-calm-100 dark:border-calm-800',
    yellow: 'bg-soft-yellow/40 dark:bg-yellow-900/10 border-orange-100 dark:border-orange-900/30',
    pink: 'bg-soft-pink/20 dark:bg-pink-900/10 border-pink-100 dark:border-pink-900/30',
    green: 'bg-soft-green/20 dark:bg-green-900/10 border-green-100 dark:border-green-900/30',
  };

  return (
    <div className={`p-8 rounded-[2rem] shadow-sm border transition-all ${bgColors[color] || bgColors.white} ${className}`}>
      {title && <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-3">{title}</h3>}
      {description && <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
