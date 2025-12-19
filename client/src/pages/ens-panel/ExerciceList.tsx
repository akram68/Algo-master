import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { exercises as initialExercises, Exercise } from '../../data/exercises';
import ExerciseModal from '../../components/ens-panel/ExerciseModal';

function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
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
    if (confirm('Supprimer cet exercice ?')) {
      setExercises(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSave = (exercise: Exercise) => {
    setExercises(prev =>
      prev.some(e => e.id === exercise.id)
        ? prev.map(e => (e.id === exercise.id ? exercise : e))
        : [...prev, exercise]
    );
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des exercices</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {exercises.map(ex => (
          <div
            key={ex.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <h3 className="font-bold text-lg">{ex.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{ex.statement}</p>

            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {ex.type.toUpperCase()}
            </span>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(ex)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit2 size={16} />
              </button>

              <button
                onClick={() => handleDelete(ex.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ MODAL */}
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
