import { Plus, Search } from "lucide-react";

interface Props {
  onAdd: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

function CourseToolbar({ onAdd, searchQuery, setSearchQuery }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">Gestion des cours</h1>
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-1">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un cours..."
            className="w-full border rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} /> Ajouter
        </button>
      </div>
    </div>
  );
}

export default CourseToolbar;
