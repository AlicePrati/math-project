export type { Question } from './types';
import { prereqQuestions } from './prereq';
import { analysis1Questions } from './analysis1';
import { analysis2Questions } from './analysis2';
import { analysis3Questions } from './analysis3';

export const questions = [
  ...prereqQuestions,
  ...analysis1Questions,
  ...analysis2Questions,
  ...analysis3Questions,
];

export function getQuestionsForTopic(topicId: string) {
  return questions
    .filter((q) => q.topicId === topicId)
    .sort((a, b) => a.difficulty - b.difficulty);
}

// 0 correct → 1★ | 1 → 2★ | 2 → 3★ | 3-4 → 4★ | 5 → 5★
export function computeRating(correctCount: number): 1 | 2 | 3 | 4 | 5 {
  if (correctCount === 0) return 1;
  if (correctCount === 1) return 2;
  if (correctCount === 2) return 3;
  if (correctCount <= 4) return 4;
  return 5;
}
