import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-calm-600 dark:bg-calm-500 hover:bg-calm-700 dark:hover:bg-calm-400 text-white',
    secondary: 'bg-soft-blue dark:bg-blue-600 hover:bg-calm-400 text-white',
    pink: 'bg-soft-pink dark:bg-pink-600 text-slate-700 dark:text-white',
    green: 'bg-soft-green dark:bg-green-600 text-slate-700 dark:text-white',
    outline: 'bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  };

  return (
    <button 
      className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
