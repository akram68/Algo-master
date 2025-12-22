interface Props {
  levelFilter: string;
  setLevelFilter: (level: string) => void;
  sortField: "title" | "duration";
  setSortField: (field: "title" | "duration") => void;
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
}

function CourseFilters({ levelFilter, setLevelFilter, sortField, setSortField, sortAsc, setSortAsc }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="input">
        <option value="all">Tous les niveaux</option>
        <option value="Algo1">Algo 1</option>
        <option value="Algo2">Algo 2</option>
      </select>

      <select value={sortField} onChange={(e) => setSortField(e.target.value as "title"|"duration")} className="input">
        <option value="title">Trier par titre</option>
        <option value="duration">Trier par durée</option>
      </select>

      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        {sortAsc ? "Asc" : "Desc"}
      </button>
    </div>
  );
}

export default CourseFilters;
