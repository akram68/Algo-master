// hooks/useExercises.ts
import { useState, useMemo } from 'react';
import { Exercise, exercises as initialExercises } from '../data/exercises';

type ExerciseType = 'qcm' | 'quiz' | 'code' | 'all';

interface UseExercisesReturn {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  updateExercise: (exercise: Exercise) => void;
  deleteExercise: (id: string) => void;
  filteredExercises: Exercise[];
  filterByType: (type: ExerciseType) => void;
  searchExercises: (query: string) => void;
  currentType: ExerciseType;
  stats: {
    total: number;
    qcm: number;
    quiz: number;
    code: number;
  };
}

export const useExercises = (): UseExercisesReturn => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [filterType, setFilterType] = useState<ExerciseType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calcul des statistiques
  const stats = useMemo(() => ({
    total: exercises.length,
    qcm: exercises.filter(e => e.type === 'qcm').length,
    quiz: exercises.filter(e => e.type === 'quiz').length,
    code: exercises.filter(e => e.type === 'code').length,
  }), [exercises]);

  // Filtrage et recherche
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesType = filterType === 'all' || exercise.type === filterType;
      const matchesSearch = searchQuery === '' || 
        exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.statement.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [exercises, filterType, searchQuery]);

  // Actions
  const addExercise = (exercise: Exercise) => {
    setExercises(prev => [...prev, exercise]);
  };

  const updateExercise = (exercise: Exercise) => {
    setExercises(prev => prev.map(e => 
      e.id === exercise.id ? exercise : e
    ));
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  };

  return {
    exercises,
    addExercise,
    updateExercise,
    deleteExercise,
    filteredExercises,
    filterByType: setFilterType,
    searchExercises: setSearchQuery,
    currentType: filterType,
    stats,
  };
};