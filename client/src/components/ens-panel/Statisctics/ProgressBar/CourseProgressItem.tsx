import React from 'react';
import ProgressBar from './ProgressBar';

interface CourseProgressItemProps {
  name: string;
  students: number;
  completion: number;
}

const CourseProgressItem: React.FC<CourseProgressItemProps> = ({ name, students, completion }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{students} étudiants</span>
      </div>
      <ProgressBar progress={completion} />
    </div>
  );
};

export default CourseProgressItem;