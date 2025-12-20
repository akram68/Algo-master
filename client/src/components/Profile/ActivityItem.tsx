interface ActivityItemProps {
  title: string;
  type: string;
  timeAgo: string;
  color: string;
}

export default function ActivityItem({ title, type, timeAgo, color }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
      <div className={`w-2 h-2 rounded-full mt-2 bg-${color}-500`} />
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{type} - {timeAgo}</p>
      </div>
    </div>
  );
}
