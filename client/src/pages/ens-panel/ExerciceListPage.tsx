// pages/ens-panel/ExerciseList.tsx
import { useState } from 'react';
import { useExercises } from '../../hooks/UseExercises';
import ExerciseHeader from '../../components/ens-panel/Exercise/ExerciseHeader';
import ExerciseFilters from '../../components/ens-panel/Exercise/ExerciseFilters';
import ExerciseCard from '../../components/ens-panel/Exercise/ExerciseCard';
import ExerciseModal from '../../components/ens-panel/Exercise/ExerciseModal';
import { Exercise } from '../../data/exercises';

function ExerciseList() {
  const {
    filteredExercises,
    addExercise,
    updateExercise,
    deleteExercise,
    filterByType,
    searchExercises,
    currentType,
    stats
  } = useExercises();

  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const handleAdd = () => {
    setEditingExercise(null);
    setShowModal(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) {
      deleteExercise(id);
    }
  };

  const handleSave = (exercise: Exercise) => {
    if (editingExercise) {
      updateExercise(exercise);
    } else {
      addExercise(exercise);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredExercises, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `exercises-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    // Implémentation simple de l'import
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          // Valider et ajouter les exercices
          if (Array.isArray(data)) {
            const newExercises = data.map((ex: any) => ({
              ...ex,
              id: ex.id || Date.now().toString()
            }));
            newExercises.forEach((ex: Exercise) => addExercise(ex));
            alert(`${newExercises.length} exercices importés avec succès !`);
          }
        } catch (error) {
          alert('Erreur lors de l\'import : fichier JSON invalide');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <div className="pb-8">
      <ExerciseHeader 
        onAdd={handleAdd}
        onExport={handleExport}
        onImport={handleImport}
        stats={stats}
      />

      <ExerciseFilters 
        onSearch={searchExercises}
        onFilterChange={filterByType}
        currentType={currentType}
        stats={stats}
      />

      {/* Résultats */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-gray-600 text-sm">
          {filteredExercises.length} exercice{filteredExercises.length !== 1 ? 's' : ''} trouvé{filteredExercises.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredExercises.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-gray-400 text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun exercice trouvé</h3>
          <p className="text-gray-500 mb-4">
            {currentType !== 'all' 
              ? `Aucun exercice de type ${currentType}.`
              : 'Commencez par créer votre premier exercice !'}
          </p>
          {currentType !== 'all' ? (
            <button
              onClick={() => filterByType('all')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Voir tous les exercices
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Créer un exercice
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ExerciseModal
        show={showModal}
        editingExercise={editingExercise}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default ExerciseList;