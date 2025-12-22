import { Course } from "../../../data/courses";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

function CourseCard({ course, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{course.title}</h3>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {course.level}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{course.description}</p>
        <div className="text-xs text-gray-500 mt-3">Durée : {course.duration}</div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(course)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => confirm("Supprimer ce cours ?") && onDelete(course.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
