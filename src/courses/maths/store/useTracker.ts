import { useState, useCallback } from 'react';
import { INITIAL_REASSESSMENT_DAYS, SUBSEQUENT_REASSESSMENT_DAYS } from '../data/assessmentLevels';

const STORAGE_KEY = 'analisi1_v1';

export interface RatingChange {
  topicId: string;
  from: number;
  to: number;
  ts: string;
}

export interface TrackerData {
  ratings: Record<string, number>;
  history: RatingChange[];
  notes: Record<string, string>;
  sessions: { topicId: string; date: string }[];
  onboardingComplete: boolean;
  lastAssessmentDate: string | null;
  assessmentCount: number; // 0=never, 1=initial done, 2+=re-assessments done
}

function getInitialData(): TrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TrackerData>;
      // Migration: old data without onboardingComplete is treated as already done
      const hasRatings = Object.values(parsed.ratings ?? {}).some((r) => r > 0);
      return {
        ratings: parsed.ratings ?? {},
        history: parsed.history ?? [],
        notes: parsed.notes ?? {},
        sessions: parsed.sessions ?? [],
        onboardingComplete: parsed.onboardingComplete ?? hasRatings,
        lastAssessmentDate: parsed.lastAssessmentDate ?? null,
        assessmentCount: parsed.assessmentCount ?? (hasRatings ? 1 : 0),
      };
    }
  } catch {
    // corrupted storage — reset
  }
  return {
    ratings: {},
    history: [],
    notes: {},
    sessions: [],
    onboardingComplete: false,
    lastAssessmentDate: null,
    assessmentCount: 0,
  };
}

function persist(data: TrackerData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function daysUntilReassessment(data: TrackerData): number | null {
  if (!data.onboardingComplete || data.lastAssessmentDate === null) return null;
  const interval =
    data.assessmentCount <= 1 ? INITIAL_REASSESSMENT_DAYS : SUBSEQUENT_REASSESSMENT_DAYS;
  const due = new Date(data.lastAssessmentDate);
  due.setDate(due.getDate() + interval);
  const diffMs = due.getTime() - Date.now();
  return Math.ceil(diffMs / 86_400_000);
}

export function isReassessmentDue(data: TrackerData): boolean {
  const days = daysUntilReassessment(data);
  return days !== null && days <= 0;
}

export function useTracker() {
  const [data, setData] = useState<TrackerData>(getInitialData);

  const update = useCallback((updater: (prev: TrackerData) => TrackerData) => {
    setData((prev) => {
      const next = updater(prev);
      persist(next);
      return next;
    });
  }, []);

  // Still available for notes
  const setNote = useCallback(
    (topicId: string, note: string) => {
      update((prev) => ({
        ...prev,
        notes: { ...prev.notes, [topicId]: note },
      }));
    },
    [update],
  );

  const completeAssessment = useCallback(
    (answers: Record<string, number>) => {
      update((prev) => {
        const now = new Date().toISOString();
        const newHistory: RatingChange[] = [];

        const newRatings = { ...prev.ratings };
        for (const [topicId, value] of Object.entries(answers)) {
          const from = prev.ratings[topicId] ?? 0;
          if (from !== value) {
            newHistory.push({ topicId, from, to: value, ts: now });
          }
          newRatings[topicId] = value;
        }

        return {
          ...prev,
          ratings: newRatings,
          history: [...prev.history, ...newHistory],
          onboardingComplete: true,
          lastAssessmentDate: now,
          assessmentCount: prev.assessmentCount + 1,
        };
      });
    },
    [update],
  );

  const resetAll = useCallback(() => {
    const fresh: TrackerData = {
      ratings: {},
      history: [],
      notes: {},
      sessions: [],
      onboardingComplete: false,
      lastAssessmentDate: null,
      assessmentCount: 0,
    };
    persist(fresh);
    setData(fresh);
  }, []);

  return { data, setNote, completeAssessment, resetAll };
}
