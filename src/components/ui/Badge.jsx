import React from 'react';

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-soft-blue/20 dark:bg-blue-900/30 text-calm-700 dark:text-blue-300 border-soft-blue/30',
    pink: 'bg-soft-pink/20 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-soft-pink/30',
    green: 'bg-soft-green/20 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-soft-green/30',
    yellow: 'bg-soft-yellow/20 dark:bg-yellow-900/30 text-orange-700 dark:text-yellow-300 border-orange-200/30',
    purple: 'bg-soft-purple/20 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-soft-purple/30',
  };

  return (
    <span className={`px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

export default Badge;
