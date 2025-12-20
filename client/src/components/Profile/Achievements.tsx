import AchievementItem from './AchievmentItem';

interface Achievement {
  name: string;
  emoji: string;
  bgColor: string;
  locked?: boolean;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((a, idx) => (
          <AchievementItem key={idx} {...a} />
        ))}
      </div>
    </div>
  );
}
