import type { Question } from '../data/questions/types';

function pickRandom<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function pickNext(
  pool: Question[],
  usedIds: Set<string>,
  difficulty: number,
): Question | null {
  const candidates = pool.filter((q) => !usedIds.has(q.id) && q.difficulty === difficulty);
  if (candidates.length === 0) return null;
  return pickRandom(candidates);
}

export function pickAnyUnused(pool: Question[], usedIds: Set<string>): Question | null {
  const candidates = pool.filter((q) => !usedIds.has(q.id));
  if (candidates.length === 0) return null;
  return pickRandom(candidates);
}
