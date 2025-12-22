import { Course } from "../../../data/courses";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

function CourseList({ courses, onEdit, onDelete }: Props) {
  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Aucun cours trouvé
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {courses.map(c => (
        <CourseCard key={c.id} course={c} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default CourseList;
