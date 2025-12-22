import { Course } from "../../../data/courses";

interface Props {
  show: boolean;
  editingCourse: Course | null;
  onClose: () => void;
  onSave: (course: Course) => void;
}

function CourseModal({ show, editingCourse, onClose, onSave }: Props) {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    onSave({
      id: editingCourse?.id || crypto.randomUUID(),
      title: data.get("title") as string,
      description: data.get("description") as string,
      duration: data.get("duration") as string,
      level: data.get("level") as "Algo1" | "Algo2",
      topics: (data.get("topics") as string).split(",").map(t => t.trim()),
      content: [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 space-y-4">
        <h2 className="text-xl font-bold">
          {editingCourse ? "Modifier le cours" : "Ajouter un cours"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" defaultValue={editingCourse?.title} required className="input" placeholder="Titre du cours" />
          <textarea name="description" defaultValue={editingCourse?.description} required className="input" placeholder="Description" />
          <input name="duration" defaultValue={editingCourse?.duration} required className="input" placeholder="Durée (ex: 4 semaines)" />
          <input name="topics" defaultValue={editingCourse?.topics.join(", ")} className="input" placeholder="Topics (séparés par virgule)" />
          <select name="level" defaultValue={editingCourse?.level || "Algo1"} className="input">
            <option value="Algo1">Algo 1</option>
            <option value="Algo2">Algo 2</option>
          </select>

          <div className="flex gap-3 pt-3">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Enregistrer</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 py-2 rounded-lg">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseModal;
