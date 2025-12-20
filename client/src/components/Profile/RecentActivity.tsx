import ActivityItem from './ActivityItem';

interface Activity {
  title: string;
  type: string;
  timeAgo: string;
  color: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, idx) => (
          <ActivityItem key={idx} {...a} />
        ))}
      </div>
    </div>
  );
}
