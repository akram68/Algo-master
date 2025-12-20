import { User, Mail, Calendar } from 'lucide-react';

interface UserCardProps {
  name: string;
  role: string;
  email: string;
  joined: string;
  levelName: string;
  level: number;
  progress: number;
}

export default function UserCard({ name, role, email, joined, levelName, level, progress }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
        <p className="text-gray-600 mb-6">{role}</p>

        <div className="w-full space-y-3">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm">{joined}</span>
          </div>
        </div>

        <div className="mt-6 w-full pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-3">Current Level</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-blue-600">{levelName}</span>
            <span className="text-sm text-gray-600">Level {level}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-600 mt-2">{progress}% to next level</p>
        </div>
      </div>
    </div>
  );
}
