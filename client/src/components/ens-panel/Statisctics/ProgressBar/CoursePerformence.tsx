import React from 'react';
import CourseProgressItem from './CourseProgressItem';

interface CourseData {
  name: string;
  students: number;
  completion: number;
}

interface CoursePerformanceProps {
  title?: string;
  courses: CourseData[];
}

const CoursePerformance: React.FC<CoursePerformanceProps> = ({ 
  title = "Performance des cours",
  courses 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <CourseProgressItem key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursePerformance;