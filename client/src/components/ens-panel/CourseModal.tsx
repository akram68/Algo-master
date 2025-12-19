import { Course } from '../../data/courses';

interface CourseModalProps {
  show: boolean;
  editingCourse: Course | null;
  onClose: () => void;
  onSave: (course: Course) => void;
}

function CourseModal({
  show,
  editingCourse,
  onClose,
  onSave,
}: CourseModalProps) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const course: Course = {
      id: editingCourse?.id || Date.now().toString(),
      title: formData.get('title') as string,
      level: formData.get('level') as 'Algo1' | 'Algo2',
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      topics: (formData.get('topics') as string)
        .split(',')
        .map(t => t.trim()),
      content: [],
    };

    onSave(course);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
        <h3 className="text-xl font-bold mb-4">
          {editingCourse ? 'Modifier le cours' : 'Ajouter un cours'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            defaultValue={editingCourse?.title}
            required
            placeholder="Titre du cours"
            className="w-full border px-4 py-2 rounded-lg"
          />

          <select
            name="level"
            defaultValue={editingCourse?.level || 'Algo1'}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="Algo1">Algo 1</option>
            <option value="Algo2">Algo 2</option>
          </select>

          <textarea
            name="description"
            defaultValue={editingCourse?.description}
            required
            rows={3}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            name="duration"
            defaultValue={editingCourse?.duration}
            required
            placeholder="Durée (ex: 4 semaines)"
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            name="topics"
            defaultValue={editingCourse?.topics.join(', ')}
            placeholder="Topics (séparés par virgule)"
            className="w-full border px-4 py-2 rounded-lg"
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
              className="flex-1 bg-gray-100 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseModal;
