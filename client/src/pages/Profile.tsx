import Dashboard from '../components/Profile/Dashboard';
import UserCard from '../components/Profile/UserCard';
import RecentActivity from '../components/Profile/RecentActivity';
import Achievements from '../components/Profile/Achievements';
import { exercises } from '../data/exercises';

export default function Profile() {
  const completedCount = 7;

  const activities = [
    { title: 'Completed "Sum of Two Numbers"', type: 'Code Exercise', timeAgo: '2 hours ago', color: 'green' },
    { title: 'Completed "Variable Declaration"', type: 'QCM', timeAgo: '1 day ago', color: 'green' },
    { title: 'Started "Control Structures" course', type: 'Course', timeAgo: '2 days ago', color: 'blue' },
    { title: 'Completed "Printf Format Specifier"', type: 'QCM', timeAgo: '3 days ago', color: 'green' },
  ];

  const achievements = [
    { name: 'First Steps', emoji: '🏆', bgColor: 'yellow' },
    { name: 'Quick Learner', emoji: '📚', bgColor: 'blue' },
    { name: 'Code Master', emoji: '💻', bgColor: 'green' },
    { name: 'Locked', emoji: '🔒', bgColor: 'gray', locked: true },
    { name: 'Locked', emoji: '🔒', bgColor: 'gray', locked: true },
    { name: 'Locked', emoji: '🔒', bgColor: 'gray', locked: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <UserCard
            name="John Doe"
            role="Computer Science Student"
            email="john.doe@university.edu"
            joined="Joined September 2024"
            levelName="Algo1"
            level={3}
            progress={65}
          />
          <div className="lg:col-span-2">
            <Dashboard completedExercises={completedCount} totalExercises={exercises.length} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RecentActivity activities={activities} />
          <Achievements achievements={achievements} />
        </div>
      </div>
    </div>
  );
}
