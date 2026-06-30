import { useState, useCallback } from 'react';

const STORAGE_KEY = 'analisi1_exercises_v1';

interface ExercisesStore {
  completed: Record<string, boolean>;
  quizDifficultyBySection: Record<string, number>; // sectionId → 1–5, updated only by quiz
}

function load(): ExercisesStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ExercisesStore>;
      return {
        completed: parsed.completed ?? {},
        quizDifficultyBySection: parsed.quizDifficultyBySection ?? {},
      };
    }
  } catch {
    // corrupted — reset
  }
  return { completed: {}, quizDifficultyBySection: {} };
}

function persist(store: ExercisesStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useExercises() {
  const [store, setStore] = useState<ExercisesStore>(load);

  const markComplete = useCallback((exerciseId: string) => {
    setStore((prev) => {
      const next = { ...prev, completed: { ...prev.completed, [exerciseId]: true } };
      persist(next);
      return next;
    });
  }, []);

  const getQuizDifficulty = useCallback(
    (sectionId: string): number => store.quizDifficultyBySection[sectionId] ?? 1,
    [store.quizDifficultyBySection],
  );

  const setQuizDifficulty = useCallback((sectionId: string, level: number) => {
    setStore((prev) => {
      const next = {
        ...prev,
        quizDifficultyBySection: {
          ...prev.quizDifficultyBySection,
          [sectionId]: Math.max(1, Math.min(5, level)),
        },
      };
      persist(next);
      return next;
    });
  }, []);

  const isCompleted = useCallback(
    (exerciseId: string) => !!store.completed[exerciseId],
    [store.completed],
  );

  const completedCountForSection = useCallback(
    (ids: string[]) => ids.filter((id) => store.completed[id]).length,
    [store.completed],
  );

  const resetTopic = useCallback((exerciseIds: string[]) => {
    setStore((prev) => {
      const next = { ...prev, completed: { ...prev.completed } };
      for (const id of exerciseIds) delete next.completed[id];
      persist(next);
      return next;
    });
  }, []);

  return { markComplete, resetTopic, getQuizDifficulty, setQuizDifficulty, isCompleted, completedCountForSection };
}
