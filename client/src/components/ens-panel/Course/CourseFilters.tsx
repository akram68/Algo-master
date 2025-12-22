// components/ens-panel/Course/CourseFilters.tsx
import { Filter, ArrowUpDown, Clock, Hash, Type } from 'lucide-react';

interface CourseFiltersProps {
  levelFilter: 'all' | 'Algo1' | 'Algo2';
  onLevelFilterChange: (level: 'all' | 'Algo1' | 'Algo2') => void;
  sortField: 'title' | 'duration' | 'level';
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: 'title' | 'duration' | 'level') => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  levelFilter,
  onLevelFilterChange,
  sortField,
  sortOrder,
  onSortChange
}) => {
  const levels = [
    { id: 'all', label: 'Tous les niveaux', color: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
    { id: 'Algo1', label: 'Algo 1', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' },
    { id: 'Algo2', label: 'Algo 2', color: 'bg-purple-100 hover:bg-purple-200 text-purple-700' },
  ];

  const sortOptions = [
    { id: 'title', label: 'Titre', icon: Type },
    { id: 'duration', label: 'Durée', icon: Clock },
    { id: 'level', label: 'Niveau', icon: Hash },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Filtres par niveau */}
        <div className="flex items-center gap-3">
          <Filter className="text-gray-400 w-5 h-5 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => onLevelFilterChange(level.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${level.color} ${
                  levelFilter === level.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-gray-300 hidden md:block" />

        {/* Options de tri */}
        <div className="flex items-center gap-3">
          <ArrowUpDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              const isActive = sortField === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Icon size={14} />
                  {option.label}
                  {isActive && (
                    <span className="text-xs">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;