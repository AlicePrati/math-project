import { createContext, useContext, useState } from 'react';

export type CourseId = 'maths' | 'statistics' | 'networks';

export interface Course {
  id: CourseId;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}

function MathsIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15M9 6.75L4.5 12 9 17.25M15 6.75l4.5 5.25-4.5 5.25" />
    </svg>
  );
}

function StatisticsIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5V19a1 1 0 001 1h3V13.5M9 8.5V20h3V8.5M15 11V20h3V11M21 5.5V20" />
    </svg>
  );
}

function NetworksIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c-2.4 2.8-3.8 5.8-3.8 9s1.4 6.2 3.8 9M12 3c2.4 2.8 3.8 5.8 3.8 9s-1.4 6.2-3.8 9" />
    </svg>
  );
}

export const COURSES: Course[] = [
  { id: 'maths',    label: 'Maths',            subtitle: 'Analysis 1',  icon: <MathsIcon /> },
  { id: 'statistics', label: 'Statistics',     subtitle: 'Coming soon', icon: <StatisticsIcon /> },
  { id: 'networks', label: 'Computer Networks', subtitle: 'Coming soon', icon: <NetworksIcon /> },
];

interface CourseContextValue {
  course: Course;
  setCourse: (id: CourseId) => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const stored = (localStorage.getItem('active_course') ?? 'maths') as CourseId;
  const initial = COURSES.find(c => c.id === stored) ?? COURSES[0];
  const [course, setCourseState] = useState<Course>(initial);

  function setCourse(id: CourseId) {
    const next = COURSES.find(c => c.id === id) ?? COURSES[0];
    localStorage.setItem('active_course', id);
    setCourseState(next);
  }

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourse must be used inside CourseProvider');
  return ctx;
}
