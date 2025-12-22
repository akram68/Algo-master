// components/ens-panel/Course/CourseModal.tsx
import { X, Plus, Minus, FileText, Code, Hash, Clock } from 'lucide-react';
import { Course } from '../../../data/courses';
import { useState } from 'react';

interface CourseModalProps {
  show: boolean;
  editingCourse: Course | null;
  onClose: () => void;
  onSave: (course: Course) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({
  show,
  editingCourse,
  onClose,
  onSave,
}) => {
  const [sections, setSections] = useState(
    editingCourse?.content || [{ section: '', theory: '', codeExample: '' }]
  );

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const course: Course = {
      id: editingCourse?.id || Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as 'Algo1' | 'Algo2',
      topics: (formData.get('topics') as string).split(',').map(t => t.trim()).filter(Boolean),
      content: sections.filter(s => s.section.trim() !== ''),
    };

    onSave(course);
    onClose();
  };

  const addSection = () => {
    setSections([...sections, { section: '', theory: '', codeExample: '' }]);
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const updateSection = (index: number, field: keyof typeof sections[0], value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingCourse ? 'Modifier le cours' : 'Créer un nouveau cours'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du cours *
                </label>
                <input
                  name="title"
                  defaultValue={editingCourse?.title}
                  placeholder="Introduction à la programmation en C"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock size={14} />
                  Durée *
                </label>
                <input
                  name="duration"
                  defaultValue={editingCourse?.duration}
                  placeholder="4 semaines"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau *
                </label>
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="level"
                      value="Algo1"
                      defaultChecked={editingCourse?.level === 'Algo1'}
                      className="sr-only peer"
                    />
                    <div className="w-full py-3 text-center border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700">
                      Algo 1
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="level"
                      value="Algo2"
                      defaultChecked={editingCourse?.level === 'Algo2'}
                      className="sr-only peer"
                    />
                    <div className="w-full py-3 text-center border border-gray-300 rounded-lg cursor-pointer peer-checked:bg-purple-50 peer-checked:border-purple-500 peer-checked:text-purple-700">
                      Algo 2
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Hash size={14} />
                  Topics *
                </label>
                <input
                  name="topics"
                  defaultValue={editingCourse?.topics?.join(', ')}
                  placeholder="Variables, Conditions, Boucles, Fonctions"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Séparez les topics par des virgules
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                defaultValue={editingCourse?.description}
                placeholder="Décrivez le contenu et les objectifs de ce cours..."
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sections du cours */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sections du cours</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                >
                  <Plus size={18} />
                  Ajouter une section
                </button>
              </div>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <h4 className="font-medium text-gray-900">Section {index + 1}</h4>
                      </div>
                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Minus size={18} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <FileText size={14} />
                          Titre de la section *
                        </label>
                        <input
                          value={section.section}
                          onChange={(e) => updateSection(index, 'section', e.target.value)}
                          placeholder="Ex: Introduction aux variables"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Théorie *
                        </label>
                        <textarea
                          value={section.theory}
                          onChange={(e) => updateSection(index, 'theory', e.target.value)}
                          placeholder="Expliquez le concept de cette section..."
                          required
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Code size={14} />
                          Exemple de code *
                        </label>
                        <textarea
                          value={section.codeExample}
                          onChange={(e) => updateSection(index, 'codeExample', e.target.value)}
                          placeholder="Saisissez l'exemple de code..."
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow"
              >
                {editingCourse ? 'Mettre à jour' : 'Créer le cours'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium"
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

export default CourseModal;