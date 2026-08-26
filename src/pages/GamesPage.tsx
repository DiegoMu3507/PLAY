import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockGames } from '../data/mockGames';

export default function GamesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAge = searchParams.get('edad') || 'Todas';
  
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const [selectedSkill, setSelectedSkill] = useState('Todas');

  const ageFilters = ['Todas', '4-6', '7-9', '10-12', '13-16'];
  const skillFilters = ['Todas', 'Atención', 'Memoria', 'Impulsos', 'Planificación'];

  const filteredGames = mockGames.filter(game => {
    const matchAge = selectedAge === 'Todas' || game.ageGroup === selectedAge;
    const matchSkill = selectedSkill === 'Todas' || game.skill === selectedSkill;
    return matchAge && matchSkill;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Catálogo de Juegos 🎮</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección de juegos diseñados específicamente para entrenar y mejorar habilidades cognitivas en niños con TDAH.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Filtrar por Edad</h3>
            <div className="flex flex-wrap gap-2">
              {ageFilters.map(age => (
                <button
                  key={age}
                  onClick={() => {
                    setSelectedAge(age);
                    if (age === 'Todas') {
                      searchParams.delete('edad');
                    } else {
                      searchParams.set('edad', age);
                    }
                    setSearchParams(searchParams);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedAge === age 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {age === 'Todas' ? 'Todas' : `${age} años`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Habilidad a Entrenar</h3>
            <div className="flex flex-wrap gap-2">
              {skillFilters.map(skill => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedSkill === skill 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/juegos/${game.id}`} className="block group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-primary-200 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${game.color}`}>
                        {game.skill}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h2>
                    <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                        {game.ageGroup} años
                      </span>
                      <span className="text-primary-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Jugar ahora <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <span className="text-5xl block mb-4">🕵️‍♂️</span>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron juegos</h3>
              <p className="text-gray-500">Prueba ajustando los filtros para ver más opciones.</p>
              <button 
                onClick={() => { setSelectedAge('Todas'); setSelectedSkill('Todas'); }}
                className="mt-4 text-primary-600 font-semibold hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
