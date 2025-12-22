// hooks/useCourses.ts
import { useState, useMemo } from 'react';
import { Course, courses as initialCourses } from '../data/courses';

type SortField = 'title' | 'duration' | 'level';
type SortOrder = 'asc' | 'desc';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Algo1' | 'Algo2'>('all');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Statistiques
  const stats = useMemo(() => ({
    total: courses.length,
    algo1: courses.filter(c => c.level === 'Algo1').length,
    algo2: courses.filter(c => c.level === 'Algo2').length,
    totalDuration: courses.reduce((sum, c) => {
      const weeks = parseInt(c.duration) || 0;
      return sum + weeks;
    }, 0),
  }), [courses]);

  // Cours filtrés et triés
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    // Filtre par niveau
    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'duration':
          aValue = parseInt(a.duration) || 0;
          bValue = parseInt(b.duration) || 0;
          break;
        case 'level':
          aValue = a.level;
          bValue = b.level;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [courses, searchQuery, levelFilter, sortField, sortOrder]);

  // Actions
  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (course: Course) => {
    setCourses(prev => prev.map(c => 
      c.id === course.id ? course : c
    ));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    courses,
    filteredCourses,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    sortField,
    sortOrder,
    toggleSort,
    addCourse,
    updateCourse,
    deleteCourse,
    stats,
  };
};