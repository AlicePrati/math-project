import { useState, useCallback } from 'react';

const STORAGE_KEY = 'analisi1_exercises_v1';

interface ExercisesStore {
  completed: Record<string, boolean>;
}

function load(): ExercisesStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ExercisesStore>;
      return { completed: parsed.completed ?? {} };
    }
  } catch {
    // corrupted — reset
  }
  return { completed: {} };
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

  const isCompleted = useCallback(
    (exerciseId: string) => !!store.completed[exerciseId],
    [store.completed],
  );

  const completedCountForSection = useCallback(
    (ids: string[]) => ids.filter((id) => store.completed[id]).length,
    [store.completed],
  );

  return { markComplete, isCompleted, completedCountForSection };
}
