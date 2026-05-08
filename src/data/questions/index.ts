export type { Question, QuestionType } from './types';
import { prereqQuestions } from './prereq';
import { analysis1Questions } from './analysis1';
import { analysis2Questions } from './analysis2';
import { analysis3Questions } from './analysis3';
import { tfQuestions } from './tf';

export const questions = [
  ...prereqQuestions,
  ...analysis1Questions,
  ...analysis2Questions,
  ...analysis3Questions,
  ...tfQuestions,
];

export function getQuestionsForTopic(topicId: string) {
  return questions
    .filter((q) => q.topicId === topicId)
    .sort((a, b) => a.difficulty - b.difficulty);
}

// 0-2 → 1★ | 3-4 → 2★ | 5-6 → 3★ | 7-9 → 4★ | 10 → 5★  (scala per 10 domande)
export function computeRating(correctCount: number): 1 | 2 | 3 | 4 | 5 {
  if (correctCount <= 2) return 1;
  if (correctCount <= 4) return 2;
  if (correctCount <= 6) return 3;
  if (correctCount <= 9) return 4;
  return 5;
}
