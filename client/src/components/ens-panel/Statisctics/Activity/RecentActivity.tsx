import React from 'react';
import ActivityItem from './ActivityItem';

interface Activity {
  action: string;
  title: string;
  time: string;
}

interface RecentActivityProps {
  title?: string;
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  title = "Activité récente",
  activities
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            {...activity}
            showDivider={index < activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;