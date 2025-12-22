// components/ens-panel/Course/CourseHeader.tsx
import { Plus, Search, BookOpen, BarChart3 } from 'lucide-react';

interface CourseHeaderProps {
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: {
    total: number;
    algo1: number;
    algo2: number;
    totalDuration: number;
  };
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  onAdd,
  searchQuery,
  onSearchChange,
  stats
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Titre et description */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des cours</h1>
              <p className="text-gray-600">Créez et organisez vos cours d'algorithmique</p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200 min-w-[120px]">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <BarChart3 size={14} />
                Total
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200 min-w-[120px]">
              <div className="text-sm text-blue-600">Algo 1</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">{stats.algo1}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200 min-w-[120px]">
              <div className="text-sm text-purple-600">Algo 2</div>
              <div className="text-2xl font-bold text-purple-700 mt-1">{stats.algo2}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200 min-w-[120px]">
              <div className="text-sm text-green-600">Durée totale</div>
              <div className="text-2xl font-bold text-green-700 mt-1">{stats.totalDuration} semaines</div>
            </div>
          </div>
        </div>

        {/* Recherche et boutons */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher un cours..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAdd}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-sm hover:shadow flex-1"
            >
              <Plus size={20} />
              Nouveau cours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;