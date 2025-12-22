import React from 'react';

interface ActivityItemProps {
  action: string;
  title: string;
  time: string;
  showDivider?: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ action, title, time, showDivider = true }) => {
  return (
    <div className={`flex items-start gap-4 pb-4 ${showDivider ? 'border-b border-gray-100' : ''}`}>
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;