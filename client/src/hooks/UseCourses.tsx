import { useState } from "react";
import { Course, courses as initialCourses } from "../data/courses";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addOrUpdateCourse = (course: Course) => {
    setCourses(prev =>
      prev.some(c => c.id === course.id)
        ? prev.map(c => (c.id === course.id ? course : c))
        : [...prev, course]
    );
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const searchCourses = (query: string) => {
    return courses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByLevel = (level: string) => {
    if (level === "all") return courses;
    return courses.filter(c => c.level === level);
  };

  const sortCourses = (field: "title" | "duration", asc: boolean) => {
    return [...courses].sort((a, b) => {
      if (field === "title") return asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      if (field === "duration") {
        const numA = parseInt(a.duration) || 0;
        const numB = parseInt(b.duration) || 0;
        return asc ? numA - numB : numB - numA;
      }
      return 0;
    });
  };

  return { courses, addOrUpdateCourse, deleteCourse, searchCourses, filterByLevel, sortCourses };
}
