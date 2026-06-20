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
    label: 'Prerequisites',
    colors: C.prerequisiti,
    topics: [
      t('logica_quantificatori', 'Logic (quantifiers ∀∃)', 'prerequisiti'),
      t('implicazione_contronominale', 'Implication and contrapositive', 'prerequisiti'),
      t('dimostrazione_ind', 'Proof by contradiction / induction', 'prerequisiti'),
      t('insiemi_reali', 'Number sets and ℝ', 'prerequisiti'),
      t('intervalli_intorni', 'Intervals and neighbourhoods', 'prerequisiti'),
      t('disug_valore_assoluto', 'Inequalities and absolute value', 'prerequisiti'),
      t('disug_notevoli', 'Notable inequalities', 'prerequisiti'),
      t('funzioni_base', 'Functions (domain / codomain / image)', 'prerequisiti'),
      t('iniettivita', 'Injectivity / surjectivity / bijectivity', 'prerequisiti'),
      t('funzione_composta', 'Composite and inverse functions', 'prerequisiti'),
      t('potenze_radicali', 'Powers and radicals', 'prerequisiti'),
      t('esponenziale_log', 'Exponential and logarithm', 'prerequisiti'),
      t('trig', 'Trigonometric functions', 'prerequisiti'),
    ],
  },
  {
    id: 'numeri_reali',
    label: 'Real Numbers',
    colors: C.numeri_reali,
    topics: [
      t('insiemi_numerici', 'Number sets (N, Z, Q, R)', 'numeri_reali'),
      t('estremo_sup_inf', 'Supremum and infimum', 'numeri_reali'),
      t('principio_induzione', 'Principle of induction', 'numeri_reali'),
      t('valore_assoluto', 'Absolute value and inequalities', 'numeri_reali'),
      t('numeri_complessi', 'Complex numbers (overview)', 'numeri_reali'),
    ],
  },
  {
    id: 'successioni',
    label: 'Sequences',
    colors: C.successioni,
    topics: [
      t('successioni_def', 'Definition and properties', 'successioni'),
      t('limite_successione', 'Limit of a sequence', 'successioni'),
      t('successioni_monotone', 'Monotone sequences', 'successioni'),
      t('teorema_carabinieri', 'Squeeze theorem', 'successioni'),
      t('cauchy_successione', 'Cauchy sequence', 'successioni'),
      t('numero_eulero', "Euler's number e", 'successioni'),
    ],
  },
  {
    id: 'limiti',
    label: 'Limits',
    colors: C.limiti,
    topics: [
      t('limite_eps_delta', 'Definition of limit (ε-δ)', 'limiti'),
      t('limiti_ds', 'One-sided limits', 'limiti'),
      t('limiti_infinito', 'Limits at infinity', 'limiti'),
      t('algebra_limiti', 'Limit algebra', 'limiti'),
      t('forme_indeterminate', 'Indeterminate forms', 'limiti'),
      t('limiti_notevoli', 'Notable limits (sin x/x etc.)', 'limiti'),
      t('confronto_infiniti', 'Comparison of infinities and infinitesimals', 'limiti'),
      t('teorema_confronto', 'Comparison theorem', 'limiti'),
    ],
  },
  {
    id: 'continuita',
    label: 'Continuity',
    colors: C.continuita,
    topics: [
      t('continuita_def', 'Definition of continuity', 'continuita'),
      t('continuita_intervallo', 'Continuity at a point and on an interval', 'continuita'),
      t('bolzano', 'Intermediate value theorem (Bolzano)', 'continuita'),
      t('weierstrass', 'Extreme value theorem (Weierstrass)', 'continuita'),
      t('tvi', 'Intermediate value theorem', 'continuita'),
      t('discontinuita', 'Discontinuities (removable, jump, essential)', 'continuita'),
    ],
  },
  {
    id: 'derivate',
    label: 'Derivatives',
    colors: C.derivate,
    topics: [
      t('derivata_def', 'Definition of the derivative', 'derivate'),
      t('derivate_fondamentali', 'Basic derivatives', 'derivate'),
      t('regole_derivazione', 'Differentiation rules', 'derivate'),
      t('chain_rule', 'Chain rule', 'derivate'),
      t('derivata_inversa', 'Derivative of the inverse function', 'derivate'),
      t('fermat', "Fermat's theorem", 'derivate'),
      t('rolle', "Rolle's theorem", 'derivate'),
      t('lagrange', "Lagrange's mean value theorem", 'derivate'),
      t('cauchy_derivate', "Cauchy's mean value theorem", 'derivate'),
      t('de_lhopital', "L'Hôpital's rule", 'derivate'),
      t('derivate_superiori', 'Higher-order derivatives', 'derivate'),
    ],
  },
  {
    id: 'studio_funzione',
    label: 'Function Analysis',
    colors: C.studio_funzione,
    topics: [
      t('monotonia', 'Monotonicity and sign of the first derivative', 'studio_funzione'),
      t('massimi_minimi', 'Local and global maxima/minima', 'studio_funzione'),
      t('concavita_flessi', 'Concavity, convexity and inflection points', 'studio_funzione'),
      t('studio_funzione', 'Complete function analysis', 'studio_funzione'),
      t('asintoti', 'Asymptotes (vertical, horizontal, oblique)', 'studio_funzione'),
    ],
  },
  {
    id: 'taylor',
    label: 'Taylor & MacLaurin',
    colors: C.taylor,
    topics: [
      t('taylor_peano', "Taylor's formula with Peano remainder", 'taylor'),
      t('taylor_lagrange', "Taylor's formula with Lagrange remainder", 'taylor'),
      t('maclaurin_notevoli', 'Notable MacLaurin series', 'taylor'),
      t('taylor_limiti', 'Using Taylor expansions to compute limits', 'taylor'),
    ],
  },
  {
    id: 'integrale_riemann',
    label: 'Riemann Integral',
    colors: C.integrale_riemann,
    topics: [
      t('riemann_def', 'Definition via Riemann sums', 'integrale_riemann'),
      t('integrale_prop', 'Properties of the definite integral', 'integrale_riemann'),
      t('teorema_media', 'Mean value theorem for integrals', 'integrale_riemann'),
      t('torricelli', 'Fundamental theorem of calculus (Torricelli-Barrow)', 'integrale_riemann'),
      t('primitiva_indefinito', 'Antiderivative and indefinite integral', 'integrale_riemann'),
    ],
  },
  {
    id: 'tecniche_int',
    label: 'Integration Techniques',
    colors: C.tecniche_int,
    topics: [
      t('int_immediate', 'Standard integrals', 'tecniche_int'),
      t('sostituzione', 'Substitution (change of variable)', 'tecniche_int'),
      t('int_parti', 'Integration by parts', 'tecniche_int'),
      t('razionali_fratte', 'Rational functions', 'tecniche_int'),
      t('int_radicali', 'Integrals with radicals', 'tecniche_int'),
    ],
  },
  {
    id: 'integrali_impropri',
    label: 'Improper Integrals',
    colors: C.integrali_impropri,
    topics: [
      t('improprio_illimitato', 'Improper integral on an unbounded interval', 'integrali_impropri'),
      t('improprio_funzione', 'Improper integral of an unbounded function', 'integrali_impropri'),
      t('criteri_conv', 'Convergence criteria (asymptotic comparison)', 'integrali_impropri'),
    ],
  },
  {
    id: 'edo',
    label: 'Differential Equations',
    colors: C.edo,
    topics: [
      t('edo_separabili', 'First-order separable ODEs', 'edo'),
      t('edo_lineari_1', 'First-order linear ODEs', 'edo'),
      t('edo_lineari_2', 'Second-order linear ODEs with constant coefficients', 'edo'),
      t('problema_cauchy', 'Cauchy problem (initial value problem)', 'edo'),
      t('sovrapposizione', 'Superposition principle', 'edo'),
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
