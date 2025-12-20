interface AchievementItemProps {
  name: string;
  emoji: string;
  bgColor: string;
  locked?: boolean;
}

export default function AchievementItem({ name, emoji, bgColor, locked }: AchievementItemProps) {
  const containerClasses = `flex flex-col items-center p-4 rounded-lg ${locked ? 'bg-gray-100 opacity-50' : `bg-${bgColor}-50`}`;
  const circleClasses = `w-12 h-12 rounded-full flex items-center justify-center mb-2 ${locked ? 'bg-gray-300' : `bg-${bgColor}-400`}`;

  return (
    <div className={containerClasses}>
      <div className={circleClasses}>
        <span className="text-2xl">{emoji}</span>
      </div>
      <p className="text-xs text-center text-gray-700 font-medium">{name}</p>
    </div>
  );
}
