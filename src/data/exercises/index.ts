import type { Question } from '../questions/types';

import prerequisitiRaw       from './prerequisiti.json';
import numeriRealiRaw        from './numeri_reali.json';
import successioniRaw        from './successioni.json';
import limitiRaw             from './limiti.json';
import continuitaRaw         from './continuita.json';
import derivateRaw           from './derivate.json';
import studioFunzioneRaw     from './studio_funzione.json';
import taylorRaw             from './taylor.json';
import integraleRiemannRaw   from './integrale_riemann.json';
import tecnicheIntRaw        from './tecniche_int.json';
import integraliImproperiRaw from './integrali_impropri.json';
import edoRaw                from './edo.json';

function parseExercises(raw: unknown): Question[] {
  return raw as Question[];
}

export const exercisesBySection: Record<string, Question[]> = {
  prerequisiti:       parseExercises(prerequisitiRaw),
  numeri_reali:       parseExercises(numeriRealiRaw),
  successioni:        parseExercises(successioniRaw),
  limiti:             parseExercises(limitiRaw),
  continuita:         parseExercises(continuitaRaw),
  derivate:           parseExercises(derivateRaw),
  studio_funzione:    parseExercises(studioFunzioneRaw),
  taylor:             parseExercises(taylorRaw),
  integrale_riemann:  parseExercises(integraleRiemannRaw),
  tecniche_int:       parseExercises(tecnicheIntRaw),
  integrali_impropri: parseExercises(integraliImproperiRaw),
  edo:                parseExercises(edoRaw),
};

export function getExercisesForSection(sectionId: string): Question[] {
  return exercisesBySection[sectionId] ?? [];
}

export function getExercisesForTopic(topicId: string): Question[] {
  return Object.values(exercisesBySection).flat().filter((e) => e.topicId === topicId);
}
