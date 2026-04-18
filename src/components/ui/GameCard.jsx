import React from 'react';
import Button from './Button';
import Badge from './Badge';

const GameCard = ({ title, category, description, icon, status = 'Disponible' }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <Badge color={status === 'Disponible' ? 'green' : 'pink'}>
          {status}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-calm-500 dark:text-calm-400 uppercase tracking-widest">{category}</span>
        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-8">
        <Button 
          variant={status === 'Disponible' ? 'primary' : 'ghost'} 
          className="w-full justify-center"
          disabled={status !== 'Disponible'}
        >
          {status === 'Disponible' ? '¡Jugar ahora!' : 'Próximamente'}
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
