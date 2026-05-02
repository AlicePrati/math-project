export interface Topic {
  id: string;
  label: string;
  sectionId: string;
}

export interface SectionColors {
  border: string;   // border-l-4 accent colour
  dot: string;      // filled circle
  badge: string;    // critical-count badge
  bar: string;      // progress bar fill
  chip: string;     // topic chip in Plan
}

export interface Section {
  id: string;
  label: string;
  colors: SectionColors;
  topics: Topic[];
}

// All colour classes written out fully so Tailwind JIT includes them.
const C: Record<string, SectionColors> = {
  prerequisiti: {
    border: 'border-indigo-500',
    dot: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    bar: 'bg-indigo-500',
    chip: 'bg-indigo-50 border border-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-200',
  },
  numeri_reali: {
    border: 'border-blue-500',
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    bar: 'bg-blue-500',
    chip: 'bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200',
  },
  successioni: {
    border: 'border-sky-500',
    dot: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
    bar: 'bg-sky-500',
    chip: 'bg-sky-50 border border-sky-200 text-sky-800 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-200',
  },
  limiti: {
    border: 'border-cyan-500',
    dot: 'bg-cyan-500',
    badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    bar: 'bg-cyan-500',
    chip: 'bg-cyan-50 border border-cyan-200 text-cyan-800 dark:bg-cyan-900/30 dark:border-cyan-700 dark:text-cyan-200',
  },
  continuita: {
    border: 'border-teal-500',
    dot: 'bg-teal-500',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
    bar: 'bg-teal-500',
    chip: 'bg-teal-50 border border-teal-200 text-teal-800 dark:bg-teal-900/30 dark:border-teal-700 dark:text-teal-200',
  },
  derivate: {
    border: 'border-emerald-500',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    bar: 'bg-emerald-500',
    chip: 'bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-200',
  },
  studio_funzione: {
    border: 'border-amber-500',
    dot: 'bg-amber-500',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    bar: 'bg-amber-500',
    chip: 'bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200',
  },
  taylor: {
    border: 'border-orange-500',
    dot: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    bar: 'bg-orange-500',
    chip: 'bg-orange-50 border border-orange-200 text-orange-800 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-200',
  },
  integrale_riemann: {
    border: 'border-rose-500',
    dot: 'bg-rose-500',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
    bar: 'bg-rose-500',
    chip: 'bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-200',
  },
  tecniche_int: {
    border: 'border-pink-500',
    dot: 'bg-pink-500',
    badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    bar: 'bg-pink-500',
    chip: 'bg-pink-50 border border-pink-200 text-pink-800 dark:bg-pink-900/30 dark:border-pink-700 dark:text-pink-200',
  },
  integrali_impropri: {
    border: 'border-purple-500',
    dot: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    bar: 'bg-purple-500',
    chip: 'bg-purple-50 border border-purple-200 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-200',
  },
  edo: {
    border: 'border-violet-500',
    dot: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    bar: 'bg-violet-500',
    chip: 'bg-violet-50 border border-violet-200 text-violet-800 dark:bg-violet-900/30 dark:border-violet-700 dark:text-violet-200',
  },
};

function t(id: string, label: string, sectionId: string): Topic {
  return { id, label, sectionId };
}

export const SECTIONS: Section[] = [
  {
    id: 'prerequisiti',
    label: 'Prerequisiti',
    colors: C.prerequisiti,
    topics: [
      t('logica_quantificatori', 'Logica (quantificatori ∀∃)', 'prerequisiti'),
      t('implicazione_contronominale', 'Implicazione e contronominale', 'prerequisiti'),
      t('dimostrazione_ind', 'Dimostrazione per assurdo/induzione', 'prerequisiti'),
      t('insiemi_reali', 'Insiemi numerici e ℝ', 'prerequisiti'),
      t('intervalli_intorni', 'Intervalli e intorni', 'prerequisiti'),
      t('disug_valore_assoluto', 'Disuguaglianze e valore assoluto', 'prerequisiti'),
      t('disug_notevoli', 'Disuguaglianze notevoli', 'prerequisiti'),
      t('funzioni_base', 'Funzioni (dominio/codominio/immagine)', 'prerequisiti'),
      t('iniettivita', 'Iniettività/suriettività/biettività', 'prerequisiti'),
      t('funzione_composta', 'Funzione composta e inversa', 'prerequisiti'),
      t('potenze_radicali', 'Potenze e radicali', 'prerequisiti'),
      t('esponenziale_log', 'Esponenziale e logaritmo', 'prerequisiti'),
      t('trig', 'Funzioni trigonometriche', 'prerequisiti'),
    ],
  },
  {
    id: 'numeri_reali',
    label: 'Numeri reali',
    colors: C.numeri_reali,
    topics: [
      t('insiemi_numerici', 'Insiemi numerici (N,Z,Q,R)', 'numeri_reali'),
      t('estremo_sup_inf', 'Estremo superiore e inferiore', 'numeri_reali'),
      t('principio_induzione', 'Principio di induzione', 'numeri_reali'),
      t('valore_assoluto', 'Valore assoluto e disuguaglianze', 'numeri_reali'),
      t('numeri_complessi', 'Numeri complessi (cenni)', 'numeri_reali'),
    ],
  },
  {
    id: 'successioni',
    label: 'Successioni',
    colors: C.successioni,
    topics: [
      t('successioni_def', 'Definizione e proprietà', 'successioni'),
      t('limite_successione', 'Limite di una successione', 'successioni'),
      t('successioni_monotone', 'Successioni monotone', 'successioni'),
      t('teorema_carabinieri', 'Teorema dei carabinieri', 'successioni'),
      t('cauchy_successione', 'Successione di Cauchy', 'successioni'),
      t('numero_eulero', 'Numero di Eulero e e', 'successioni'),
    ],
  },
  {
    id: 'limiti',
    label: 'Limiti',
    colors: C.limiti,
    topics: [
      t('limite_eps_delta', 'Definizione di limite (ε-δ)', 'limiti'),
      t('limiti_ds', 'Limiti destro e sinistro', 'limiti'),
      t('limiti_infinito', 'Limiti all\'infinito', 'limiti'),
      t('algebra_limiti', 'Algebra dei limiti', 'limiti'),
      t('forme_indeterminate', 'Forme indeterminate', 'limiti'),
      t('limiti_notevoli', 'Limiti notevoli (sin x/x ecc.)', 'limiti'),
      t('confronto_infiniti', 'Confronto tra infiniti e infinitesimi', 'limiti'),
      t('teorema_confronto', 'Teorema del confronto', 'limiti'),
    ],
  },
  {
    id: 'continuita',
    label: 'Continuità',
    colors: C.continuita,
    topics: [
      t('continuita_def', 'Definizione di continuità', 'continuita'),
      t('continuita_intervallo', 'Continuità in un punto e in un intervallo', 'continuita'),
      t('bolzano', 'Teorema degli zeri (Bolzano)', 'continuita'),
      t('weierstrass', 'Teorema di Weierstrass', 'continuita'),
      t('tvi', 'Teorema dei valori intermedi', 'continuita'),
      t('discontinuita', 'Discontinuità (1° 2° specie eliminabile)', 'continuita'),
    ],
  },
  {
    id: 'derivate',
    label: 'Derivate',
    colors: C.derivate,
    topics: [
      t('derivata_def', 'Definizione di derivata', 'derivate'),
      t('derivate_fondamentali', 'Derivate fondamentali', 'derivate'),
      t('regole_derivazione', 'Regole di derivazione', 'derivate'),
      t('chain_rule', 'Derivata di funzione composta (chain rule)', 'derivate'),
      t('derivata_inversa', 'Derivata della funzione inversa', 'derivate'),
      t('fermat', 'Teorema di Fermat', 'derivate'),
      t('rolle', 'Teorema di Rolle', 'derivate'),
      t('lagrange', 'Teorema di Lagrange', 'derivate'),
      t('cauchy_derivate', 'Teorema di Cauchy', 'derivate'),
      t('de_lhopital', 'Regola di De L\'Hôpital', 'derivate'),
      t('derivate_superiori', 'Derivate di ordine superiore', 'derivate'),
    ],
  },
  {
    id: 'studio_funzione',
    label: 'Studio di funzione',
    colors: C.studio_funzione,
    topics: [
      t('monotonia', 'Monotonia e segno della derivata prima', 'studio_funzione'),
      t('massimi_minimi', 'Massimi e minimi locali/globali', 'studio_funzione'),
      t('concavita_flessi', 'Concavità, convessità e flessi', 'studio_funzione'),
      t('studio_funzione', 'Schema completo di studio di funzione', 'studio_funzione'),
      t('asintoti', 'Asintoti (verticali, orizzontali, obliqui)', 'studio_funzione'),
    ],
  },
  {
    id: 'taylor',
    label: 'Taylor e MacLaurin',
    colors: C.taylor,
    topics: [
      t('taylor_peano', 'Formula di Taylor con resto di Peano', 'taylor'),
      t('taylor_lagrange', 'Formula di Taylor con resto di Lagrange', 'taylor'),
      t('maclaurin_notevoli', 'Sviluppi di MacLaurin notevoli', 'taylor'),
      t('taylor_limiti', 'Uso degli sviluppi per calcolo di limiti', 'taylor'),
    ],
  },
  {
    id: 'integrale_riemann',
    label: 'Integrale di Riemann',
    colors: C.integrale_riemann,
    topics: [
      t('riemann_def', 'Definizione tramite somme di Riemann', 'integrale_riemann'),
      t('integrale_prop', 'Proprietà dell\'integrale definito', 'integrale_riemann'),
      t('teorema_media', 'Teorema della media integrale', 'integrale_riemann'),
      t('torricelli', 'Teorema fondamentale del calcolo (Torricelli-Barrow)', 'integrale_riemann'),
      t('primitiva_indefinito', 'Primitiva e integrale indefinito', 'integrale_riemann'),
    ],
  },
  {
    id: 'tecniche_int',
    label: 'Tecniche di integrazione',
    colors: C.tecniche_int,
    topics: [
      t('int_immediate', 'Integrazioni immediate', 'tecniche_int'),
      t('sostituzione', 'Sostituzione (cambio di variabile)', 'tecniche_int'),
      t('int_parti', 'Integrazione per parti', 'tecniche_int'),
      t('razionali_fratte', 'Funzioni razionali fratte', 'tecniche_int'),
      t('int_radicali', 'Integrali di funzioni con radicali', 'tecniche_int'),
    ],
  },
  {
    id: 'integrali_impropri',
    label: 'Integrali impropri',
    colors: C.integrali_impropri,
    topics: [
      t('improprio_illimitato', 'Integrale improprio su intervallo illimitato', 'integrali_impropri'),
      t('improprio_funzione', 'Integrale improprio di funzione illimitata', 'integrali_impropri'),
      t('criteri_conv', 'Criteri di convergenza (confronto asintotico)', 'integrali_impropri'),
    ],
  },
  {
    id: 'edo',
    label: 'Equazioni differenziali',
    colors: C.edo,
    topics: [
      t('edo_separabili', 'EDO primo ordine a variabili separabili', 'edo'),
      t('edo_lineari_1', 'EDO primo ordine lineari', 'edo'),
      t('edo_lineari_2', 'EDO secondo ordine lineari a coeff. costanti', 'edo'),
      t('problema_cauchy', 'Problema di Cauchy', 'edo'),
      t('sovrapposizione', 'Principio di sovrapposizione', 'edo'),
    ],
  },
];

export const ALL_TOPICS: Topic[] = SECTIONS.flatMap((s) => s.topics);

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  ALL_TOPICS.map((topic) => [topic.id, topic]),
);

export const SECTION_MAP: Record<string, Section> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
);

export const TOPIC_SECTION_MAP: Record<string, Section> = Object.fromEntries(
  SECTIONS.flatMap((s) => s.topics.map((topic) => [topic.id, s])),
);

export const PRESEED_RATINGS: Record<string, number> = {
  insiemi_numerici: 3,
  principio_induzione: 3,
  valore_assoluto: 2,
  successioni_def: 2,
  limite_successione: 2,
  successioni_monotone: 2,
  teorema_carabinieri: 1,
  cauchy_successione: 1,
  numero_eulero: 1,
  limite_eps_delta: 2,
  limiti_ds: 2,
  limiti_infinito: 2,
  algebra_limiti: 2,
  forme_indeterminate: 3,
  limiti_notevoli: 1,
  confronto_infiniti: 1,
  teorema_confronto: 1,
  continuita_def: 2,
  continuita_intervallo: 2,
  bolzano: 1,
  weierstrass: 1,
  tvi: 1,
  discontinuita: 2,
  derivata_def: 3,
  derivate_fondamentali: 3,
  regole_derivazione: 3,
  chain_rule: 3,
  derivata_inversa: 3,
  fermat: 1,
  rolle: 1,
  lagrange: 1,
  cauchy_derivate: 1,
  de_lhopital: 2,
  monotonia: 2,
  massimi_minimi: 2,
  studio_funzione: 3,
  taylor_peano: 1,
  taylor_lagrange: 1,
  taylor_limiti: 1,
  integrale_prop: 2,
  teorema_media: 1,
  torricelli: 3,
  int_immediate: 1,
  int_parti: 2,
  razionali_fratte: 1,
  int_radicali: 1,
  improprio_illimitato: 2,
  improprio_funzione: 2,
  criteri_conv: 2,
};
