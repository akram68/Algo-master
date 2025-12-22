import React from 'react';
import { Users, BookOpen, FileText, TrendingUp } from 'lucide-react';

// Import des composants
import StatsGrid from '../../components/ens-panel/Statisctics/StatCard/StatsGrid';
import CoursePerformance from '../../components/ens-panel/Statisctics/ProgressBar/CoursePerformence';
import StudentDistribution from '../../components/ens-panel/Statisctics/Piechart/StudentDistribution';
import RecentActivity from '../../components/ens-panel/Statisctics/Activity/RecentActivity';

const Statistics: React.FC = () => {
  // Données pour les cartes de statistiques
  const statsData = [
    { label: 'Étudiants inscrits', value: '247', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Cours publiés', value: '18', icon: BookOpen, color: 'bg-green-500', change: '+3' },
    { label: 'Exercices disponibles', value: '64', icon: FileText, color: 'bg-purple-500', change: '+8' },
    { label: 'Taux de réussite', value: '78%', icon: TrendingUp, color: 'bg-orange-500', change: '+5%' },
  ];

  // Données pour les performances des cours
  const coursesData = [
    { name: 'Introduction aux algorithmes', students: 189, completion: 85 },
    { name: 'Structures de données', students: 156, completion: 72 },
    { name: 'Complexité algorithmique', students: 134, completion: 68 },
    { name: 'Algorithmes de tri', students: 142, completion: 75 },
    { name: 'Récursivité', students: 98, completion: 58 },
  ];

  // Données pour la répartition des étudiants
  const distributionData = [
    { label: 'Ont terminé tous les cours', value: 45, color: 'bg-green-500', strokeColor: '#22c55e' },
    { label: 'En progression', value: 152, color: 'bg-blue-500', strokeColor: '#3b82f6' },
    { label: 'Juste commencé', value: 50, color: 'bg-yellow-500', strokeColor: '#eab308' },
  ];

  // Données pour l'activité récente
  const activitiesData = [
    { action: 'Nouveau cours publié', title: 'Algorithmes de tri avancés', time: 'Il y a 2 heures' },
    { action: '15 étudiants ont terminé', title: 'Introduction aux algorithmes', time: 'Il y a 5 heures' },
    { action: 'Exercice ajouté', title: 'Tri fusion - Exercice pratique', time: 'Il y a 1 jour' },
    { action: '23 étudiants ont commencé', title: 'Récursivité', time: 'Il y a 1 jour' },
  ];

  return (
    <div className="space-y-8">
      {/* Grille de statistiques */}
      <StatsGrid stats={statsData} />

      {/* Section principale avec 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performances des cours */}
        <CoursePerformance courses={coursesData} />
        
        {/* Répartition des étudiants Piechart*/}
        <StudentDistribution
          data={distributionData}
          totalStudents={247}
        />
      </div>

      <RecentActivity activities={activitiesData} />
    </div>
  );
};

export default Statistics;