export type { Question, QuestionType, SelectionQuestion, TFQuestion, ArrangeQuestion } from './types';
import type { Question } from './types';

import prerequisitiRaw      from './prerequisiti.json';
import numeriRealiRaw       from './numeri_reali.json';
import successioniRaw       from './successioni.json';
import limitiRaw            from './limiti.json';
import continuitaRaw        from './continuita.json';
import derivateRaw          from './derivate.json';
import studioFunzioneRaw    from './studio_funzione.json';
import taylorRaw            from './taylor.json';
import integraleRiemannRaw  from './integrale_riemann.json';
import tecnicheIntRaw       from './tecniche_int.json';
import integraliImproperiRaw from './integrali_impropri.json';
import edoRaw               from './edo.json';

function parseQuestions(raw: unknown): Question[] {
  return raw as Question[];
}

export const questions: Question[] = [
  ...parseQuestions(prerequisitiRaw),
  ...parseQuestions(numeriRealiRaw),
  ...parseQuestions(successioniRaw),
  ...parseQuestions(limitiRaw),
  ...parseQuestions(continuitaRaw),
  ...parseQuestions(derivateRaw),
  ...parseQuestions(studioFunzioneRaw),
  ...parseQuestions(taylorRaw),
  ...parseQuestions(integraleRiemannRaw),
  ...parseQuestions(tecnicheIntRaw),
  ...parseQuestions(integraliImproperiRaw),
  ...parseQuestions(edoRaw),
];

export function getQuestionsForTopic(topicId: string): Question[] {
  return questions.filter((q) => q.topicId === topicId);
}

// 0-2 → 1★ | 3-4 → 2★ | 5-6 → 3★ | 7-9 → 4★ | 10 → 5★
export function computeRating(correctCount: number): 1 | 2 | 3 | 4 | 5 {
  if (correctCount <= 2) return 1;
  if (correctCount <= 4) return 2;
  if (correctCount <= 6) return 3;
  if (correctCount <= 9) return 4;
  return 5;
}
