// pages/ens-panel/CourseListPage.tsx
import { useState } from 'react';
import { useCourses } from '../../hooks/UseCourses';
import { Course } from '../../data/courses';
import CourseHeader from '../../components/ens-panel/Course/CourseHeader';
import CourseFilters from '../../components/ens-panel/Course/CourseFilters';
//import CourseCard from '../../../components/ens-panel/Course/CourseCard';
import CourseList from '../../components/ens-panel/Course/CourseList';
import CourseModal from '../../components/ens-panel/Course/CourseModal';
import CoursePreview from '../../components/ens-panel/Course/CoursePreview';

function CourseListPage() {
  const {
    filteredCourses,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    sortField,
    sortOrder,
    toggleSort,
    addCourse,
    updateCourse,
    deleteCourse,
    stats
  } = useCourses();

  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handlePreview = (course: Course) => {
    setPreviewCourse(course);
    setShowPreview(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      deleteCourse(id);
    }
  };

  const handleSave = (course: Course) => {
    if (editingCourse) {
      updateCourse(course);
    } else {
      addCourse(course);
    }
    setShowModal(false);
  };

  return (
    <div className="pb-8">
      <CourseHeader 
        onAdd={handleAdd}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        stats={stats}
      />

      <CourseFilters 
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={toggleSort}
      />

      {/* Résultats */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-gray-600">
          {filteredCourses.length} cours{filteredCourses.length !== 1 ? '' : ''} trouvé{filteredCourses.length !== 1 ? 's' : ''}
        </div>
        <div className="text-sm text-gray-500">
          {stats.totalDuration} semaines de formation
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun cours trouvé</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery 
              ? `Aucun cours correspondant à "${searchQuery}"`
              : levelFilter !== 'all'
                ? `Aucun cours de niveau ${levelFilter}`
                : 'Commencez par créer votre premier cours !'
            }
          </p>
          {searchQuery || levelFilter !== 'all' ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setLevelFilter('all');
              }}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Réinitialiser les filtres
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium"
            >
              Créer votre premier cours
            </button>
          )}
        </div>
      ) : (
        <CourseList
          courses={filteredCourses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPreview={handlePreview}
        />
      )}

      {/* Modal de création/édition */}
      <CourseModal
        show={showModal}
        editingCourse={editingCourse}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      {/* Modal d'aperçu */}
      {showPreview && previewCourse && (
        <CoursePreview
          course={previewCourse}
          onClose={() => {
            setShowPreview(false);
            setPreviewCourse(null);
          }}
        />
      )}
    </div>
  );
}

export default CourseListPage;