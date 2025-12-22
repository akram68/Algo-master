// pages/ens-panel/components/exercises/ExerciseFilters.tsx
import { Search, Filter } from 'lucide-react';

interface ExerciseFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (type: 'all' | 'qcm' | 'quiz' | 'code') => void;
  currentType: string;
  stats: {
    total: number;
    qcm: number;
    quiz: number;
    code: number;
  };
}

const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  onSearch,
  onFilterChange,
  currentType,
  stats
}) => {
  const filterButtons = [
    { id: 'all', label: 'Tous', count: stats.total },
    { id: 'qcm', label: 'QCM', count: stats.qcm },
    { id: 'quiz', label: 'Quiz', count: stats.quiz },
    { id: 'code', label: 'Code', count: stats.code },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Filtres et recherche</h3>
          <p className="text-sm text-gray-500">
            Gérez et recherchez vos exercices facilement
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtres par type */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    currentType === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                  <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseFilters;