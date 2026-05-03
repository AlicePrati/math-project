export type { StudyPlan } from './types';
import { prereqPlans } from './prereq';
import { analysis1Plans } from './analysis1';
import { analysis2Plans } from './analysis2';

export const studyPlans = [...prereqPlans, ...analysis1Plans, ...analysis2Plans];

// mapping: app topic ID → study plan topic ID (same as questions)
const APP_TO_PLAN: Record<string, string | null> = {
  logica_quantificatori: 'logica_quantificatori',
  implicazione_contronominale: 'implicazione',
  dimostrazione_ind: 'dimostrazione',
  insiemi_reali: 'insiemi_operazioni',
  intervalli_intorni: 'intervalli_intorni',
  disug_valore_assoluto: 'valore_assoluto',
  disug_notevoli: null,
  funzioni_base: 'funzioni_base',
  iniettivita: 'iniettivita',
  funzione_composta: 'composta_inversa',
  potenze_radicali: null,
  esponenziale_log: 'exp_log',
  trig: 'trigonometria',
  insiemi_numerici: 'insiemi_numerici',
  estremo_sup_inf: 'estremo_sup',
  principio_induzione: 'principio_induzione',
  valore_assoluto: 'valore_assoluto',
  numeri_complessi: null,
  successioni_def: null,
  limite_successione: 'limite_successione',
  successioni_monotone: 'successioni_monotone',
  teorema_carabinieri: null,
  cauchy_successione: 'cauchy_successione',
  numero_eulero: 'numero_eulero',
  limite_eps_delta: 'limite_eps_delta',
  limiti_ds: null,
  limiti_infinito: null,
  algebra_limiti: 'algebra_limiti',
  forme_indeterminate: 'forme_indeterminate',
  limiti_notevoli: 'limiti_notevoli',
  confronto_infiniti: 'confronto_infiniti',
  teorema_confronto: null,
  continuita_def: 'continuita_def',
  continuita_intervallo: null,
  bolzano: 'bolzano',
  weierstrass: 'weierstrass',
  tvi: null,
  discontinuita: 'discontinuita',
  derivata_def: 'derivata_def',
  derivate_fondamentali: 'regole_derivazione',
  regole_derivazione: 'regole_derivazione',
  chain_rule: 'chain_rule',
  derivata_inversa: null,
  fermat: 'teoremi_derivate',
  rolle: 'teoremi_derivate',
  lagrange: 'teoremi_derivate',
  cauchy_derivate: 'teoremi_derivate',
  de_lhopital: 'de_lhopital',
  derivate_superiori: null,
  monotonia: 'monotonia',
  massimi_minimi: 'massimi_minimi',
  concavita_flessi: 'concavita',
  studio_funzione: null,
  asintoti: 'asintoti',
  taylor_peano: 'taylor_peano',
  taylor_lagrange: null,
  maclaurin_notevoli: 'taylor_notevoli',
  taylor_limiti: 'taylor_limiti',
  riemann_def: 'integrale_def',
  integrale_prop: 'proprieta_integrali',
  teorema_media: null,
  torricelli: 'torricelli',
  primitiva_indefinito: 'int_immediate',
  int_immediate: 'int_immediate',
  sostituzione: 'int_sostituzione',
  int_parti: 'int_parti',
  razionali_fratte: 'razionali_fratte',
  int_radicali: null,
  improprio_illimitato: 'improprio_illimitato',
  improprio_funzione: 'improprio_funzione',
  criteri_conv: 'criteri_conv',
  edo_separabili: 'ode_separabili',
  edo_lineari_1: 'ode_lineari_1',
  edo_lineari_2: 'ode_lineari_2',
  problema_cauchy: 'cauchy_problema',
  sovrapposizione: null,
};

/** Lookup study plan by app topic ID and current star rating (1–5). */
export function getStudyPlanForTopic(
  appTopicId: string,
  rating: number,
): import('./types').StudyPlan | undefined {
  const planTopicId = APP_TO_PLAN[appTopicId] ?? appTopicId;
  const r = Math.max(1, Math.min(5, Math.round(rating))) as 1 | 2 | 3 | 4 | 5;
  return studyPlans.find((p) => p.topicId === planTopicId && p.rating === r);
}

export function hasPlan(appTopicId: string): boolean {
  return APP_TO_PLAN[appTopicId] !== null && APP_TO_PLAN[appTopicId] !== undefined;
}
