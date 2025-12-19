import React from 'react';
import { Exercise } from '../../data/exercises';

interface ExerciseModalProps {
  show: boolean;
  editingExercise: Exercise | null;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

function ExerciseModal({
  show,
  editingExercise,
  onClose,
  onSave,
}: ExerciseModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const type = formData.get('type') as 'qcm' | 'quiz' | 'code';

    // ✅ Correction propre du correctAnswer
    const rawAnswer = formData.get('correctAnswer');
    const correctAnswer =
      rawAnswer === null
        ? undefined
        : isNaN(Number(rawAnswer))
        ? String(rawAnswer)
        : Number(rawAnswer);

    const exercise: Exercise = {
      id: editingExercise?.id || Date.now().toString(),
      title: formData.get('title') as string,
      type,
      statement: formData.get('statement') as string,
      options:
        type === 'qcm'
          ? (formData.get('options') as string)
              .split('\n')
              .filter(o => o.trim() !== '')
          : undefined,
      correctAnswer: type !== 'code' ? correctAnswer : undefined,
      tests:
        type === 'code'
          ? [
              {
                input: formData.get('testInput') as string,
                expectedOutput: formData.get('testOutput') as string,
              },
            ]
          : undefined,
    };

    onSave(exercise);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold mb-4">
          {editingExercise ? "Modifier l'exercice" : 'Ajouter un exercice'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            defaultValue={editingExercise?.title}
            placeholder="Titre"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            name="statement"
            defaultValue={editingExercise?.statement}
            placeholder="Énoncé"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            name="type"
            defaultValue={editingExercise?.type || 'qcm'}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="qcm">QCM</option>
            <option value="quiz">Quiz</option>
            <option value="code">Code</option>
          </select>

          {/* QCM */}
          <textarea
            name="options"
            placeholder="Options (une par ligne)"
            defaultValue={editingExercise?.options?.join('\n')}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            name="correctAnswer"
            placeholder="Bonne réponse (index ou texte)"
            defaultValue={
              editingExercise?.correctAnswer !== undefined
                ? String(editingExercise.correctAnswer)
                : ''
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Code */}
          <input
            name="testInput"
            placeholder="Test input (code)"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            name="testOutput"
            placeholder="Test output attendu"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
            >
              Enregistrer
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExerciseModal;
