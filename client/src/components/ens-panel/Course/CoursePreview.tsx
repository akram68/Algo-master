// components/ens-panel/Course/CoursePreview.tsx
import { X, BookOpen, Clock, Target, Code, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { Course } from '../../../data/courses';
import { useState } from 'react';

interface CoursePreviewProps {
  course: Course;
  onClose: () => void;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ course, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const levelColors = {
    Algo1: 'bg-blue-100 text-blue-700 border-blue-200',
    Algo2: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextSection = () => {
    if (currentSection < course.content.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{course.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Métadonnées */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} />
              <span className="font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FileText size={18} />
              <span>{course.content.length} section{course.content.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-180px)]">
          {/* Sidebar - Navigation des sections */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Target size={16} />
              <span className="font-medium">Sections du cours</span>
            </div>
            <nav className="space-y-1">
              {course.content.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentSection === index
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      currentSection === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{section.section}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Topics */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <Target size={16} />
                <span className="font-medium">Topics couverts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.topics.map((topic, index) => (
                  <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 p-6 overflow-y-auto">
            {course.content.length > 0 ? (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {course.content[currentSection].section}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Section {currentSection + 1} sur {course.content.length}</span>
                    </div>
                  </div>

                  {/* Théorie */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText size={18} />
                      Théorie
                    </h4>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {course.content[currentSection].theory}
                      </p>
                    </div>
                  </div>

                  {/* Exemple de code */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Code size={18} />
                      Exemple de code
                    </h4>
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono">
                        Exemple en C
                      </div>
                      <pre className="p-4 text-gray-200 text-sm font-mono overflow-x-auto">
                        <code>{course.content[currentSection].codeExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Navigation entre sections */}
                {course.content.length > 1 && (
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={prevSection}
                      disabled={currentSection === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentSection === 0
                          ? 'opacity-50 cursor-not-allowed text-gray-400'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ChevronLeft size={18} />
                      Section précédente
                    </button>
                    <button
                      onClick={nextSection}
                      disabled={currentSection === course.content.length - 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentSection === course.content.length - 1
                          ? 'opacity-50 cursor-not-allowed text-gray-400'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Section suivante
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Contenu en préparation</h3>
                <p className="text-gray-500">
                  Le contenu détaillé de ce cours est en cours de rédaction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;