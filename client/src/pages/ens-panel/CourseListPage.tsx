import { useState, useMemo } from "react";
import { useCourses } from "../../hooks/UseCourses";
import CourseToolbar from "../../components/ens-panel/Course/CourseToolBar";
import CourseFilters from "../../components/ens-panel/Course/CourseFilters";
import CourseList from "../../components/ens-panel/Course/CourseList";
import CourseModal from "../../components/ens-panel/Course/CourseModal";
import { Course } from "../../data/courses";

const PAGE_SIZE = 6;

function CourseListPage() {
  const { courses, addOrUpdateCourse, deleteCourse, searchCourses, filterByLevel, sortCourses } = useCourses();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortField, setSortField] = useState<"title" | "duration">("title");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage, recherche, tri
  const filteredCourses = useMemo(() => {
    let result = searchQuery ? searchCourses(searchQuery) : courses;
    result = levelFilter !== "all" ? filterByLevel(levelFilter) : result;
    result = sortCourses(sortField, sortAsc);
    return result;
  }, [courses, searchQuery, levelFilter, sortField, sortAsc]);

  const pageCount = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const paginatedCourses = filteredCourses.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);

  return (
    <div className="p-6 space-y-6">
      <CourseToolbar
        onAdd={() => { setEditingCourse(null); setShowModal(true); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CourseFilters
        levelFilter={levelFilter}
        setLevelFilter={setLevelFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />

      <CourseList
        courses={paginatedCourses}
        onEdit={(c) => { setEditingCourse(c); setShowModal(true); }}
        onDelete={deleteCourse}
      />

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: pageCount }, (_, i) => i+1).map(p => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1 rounded ${currentPage===p?'bg-blue-600 text-white':'bg-gray-100'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <CourseModal
        show={showModal}
        editingCourse={editingCourse}
        onClose={() => setShowModal(false)}
        onSave={(course) => { addOrUpdateCourse(course); setShowModal(false); }}
      />
    </div>
  );
}

export default CourseListPage;
