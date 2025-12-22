import React from 'react';
import { LucideIcon } from 'lucide-react';
import StatCard from './StatCard';

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;