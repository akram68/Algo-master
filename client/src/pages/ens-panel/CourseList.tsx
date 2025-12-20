import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { courses as initialCourses, Course } from '../../data/courses';
import CourseModal from '../../components/ens-panel/CourseModal';

function CourseList() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce cours ?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = (course: Course) => {
    setCourses(prev =>
      prev.some(c => c.id === course.id)
        ? prev.map(c => (c.id === course.id ? course : c))
        : [...prev, course]
    );
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des cours</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="grid gap-4">
        {courses.map(course => (
          <div
            key={course.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            <h3 className="font-bold text-lg">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>

            <div className="text-xs text-gray-500 mt-2">
              Niveau : {course.level} • Durée : {course.duration}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(course)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CourseModal
        show={showModal}
        editingCourse={editingCourse}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default CourseList;

