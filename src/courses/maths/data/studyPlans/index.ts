export type { StudyPlan } from './types';
import type { StudyPlan } from './types';

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

function parsePlans(raw: unknown): StudyPlan[] {
  return raw as StudyPlan[];
}

const sectionPlans: StudyPlan[] = [
  ...parsePlans(prerequisitiRaw),
  ...parsePlans(numeriRealiRaw),
  ...parsePlans(successioniRaw),
  ...parsePlans(limitiRaw),
  ...parsePlans(continuitaRaw),
  ...parsePlans(derivateRaw),
  ...parsePlans(studioFunzioneRaw),
  ...parsePlans(taylorRaw),
  ...parsePlans(integraleRiemannRaw),
  ...parsePlans(tecnicheIntRaw),
  ...parsePlans(integraliImproperiRaw),
  ...parsePlans(edoRaw),
];

export function getStudyPlanForSection(
  sectionId: string,
  rating: number,
): StudyPlan | undefined {
  const r = Math.max(1, Math.min(5, Math.round(rating))) as 1 | 2 | 3 | 4 | 5;
  return sectionPlans.find((p) => p.topicId === sectionId && p.rating === r);
}

export function hasSectionPlan(sectionId: string): boolean {
  return sectionPlans.some((p) => p.topicId === sectionId);
}
