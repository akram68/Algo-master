import React from 'react';
import DonutChart from './DonutChart';

interface DistributionItem {
  label: string;
  value: number;
  color: string;
  strokeColor: string;
}

interface StudentDistributionProps {
  title?: string;
  data: DistributionItem[];
  totalStudents: number;
}

const StudentDistribution: React.FC<StudentDistributionProps> = ({
  title = "Répartition des étudiants",
  data,
  totalStudents
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex items-center justify-center mb-6">
        <DonutChart
          segments={data.map(item => ({
            value: item.value,
            strokeColor: item.strokeColor,
            color: item.color
          }))}
          total={totalStudents}
          centerValue={totalStudents.toString()}
          centerLabel="Étudiants"
        />
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDistribution;