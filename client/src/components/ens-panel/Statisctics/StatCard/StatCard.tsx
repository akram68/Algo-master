import { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, change }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-2 font-medium">{change}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;