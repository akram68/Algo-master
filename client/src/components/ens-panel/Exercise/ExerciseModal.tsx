// pages/ens-panel/components/exercises/ExerciseModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Exercise } from '../../../data/exercises';

interface ExerciseModalProps {
  show: boolean;
  editingExercise: Exercise | null;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  show,
  editingExercise,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<'qcm' | 'quiz' | 'code'>(
    editingExercise?.type || 'qcm'
  );

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const exercise: Exercise = {
      id: editingExercise?.id || Date.now().toString(),
      title: formData.get('title') as string,
      type,
      statement: formData.get('statement') as string,
    };

    // Champs spécifiques au type
    if (type === 'qcm') {
      exercise.options = (formData.get('options') as string)
        .split('\n')
        .filter(o => o.trim() !== '');

      const answer = formData.get('correctAnswer') as string;
      exercise.correctAnswer = isNaN(Number(answer)) ? answer : Number(answer);
    }

    if (type === 'quiz') {
      exercise.correctAnswer = formData.get('correctAnswer') as string;
    }

    if (type === 'code') {
      const testsInput = formData.get('tests') as string;
      if (testsInput) {
        exercise.tests = testsInput.split('\n')
          .map(line => {
            const [input, output] = line.split('->').map(s => s.trim());
            return input && output ? { input, expectedOutput: output } : null;
          })
          .filter(Boolean) as { input: string; expectedOutput: string }[];
      }
    }

    onSave(exercise);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            {editingExercise ? "Modifier l'exercice" : 'Nouvel exercice'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'exercice
              </label>
              <div className="flex gap-2">
                {(['qcm', 'quiz', 'code'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 rounded border text-sm font-medium ${type === t
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                name="title"
                defaultValue={editingExercise?.title}
                placeholder="Titre de l'exercice"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Énoncé */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Énoncé *
              </label>
              <textarea
                name="statement"
                defaultValue={editingExercise?.statement}
                placeholder="Description de l'exercice"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Champs spécifiques */}
            {type === 'qcm' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options (une par ligne) *
                  </label>
                  <textarea
                    name="options"
                    defaultValue={editingExercise?.options?.join('\n')}
                    placeholder="Option A\nOption B\nOption C\n..."
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Réponse correcte (index ou texte) *
                  </label>
                  <input
                    name="correctAnswer"
                    defaultValue={editingExercise?.correctAnswer?.toString()}
                    placeholder="0 ou 'Option A'"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {type === 'quiz' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réponse correcte *
                </label>
                <input
                  name="correctAnswer"
                  defaultValue={editingExercise?.correctAnswer?.toString()}
                  placeholder="Réponse attendue"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {type === 'code' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tests (input -&gt; output) *
                </label>
                <textarea
                  name="tests"
                  defaultValue={editingExercise?.tests?.map(t => `${t.input} -> ${t.expectedOutput}`).join('\n')}
                  placeholder="5 3 -> 8\n10 20 -> 30"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Un test par ligne. Format: input -&gt; output_attendu
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
              >
                {editingExercise ? 'Mettre à jour' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;