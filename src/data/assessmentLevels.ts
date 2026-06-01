export interface AssessmentLevel {
  value: 1 | 2 | 3 | 4 | 5;
  short: string;   // compact label shown inside button
  full: string;    // full description shown in legend
  selectedClass: string;  // Tailwind classes when selected
  legendClass: string;    // Tailwind classes for legend pill
}

// Used for the first-ever assessment
export const INITIAL_LEVELS: AssessmentLevel[] = [
  {
    value: 1,
    short: 'None',
    full: "I don't know it",
    selectedClass: 'bg-red-500 text-white border-red-500',
    legendClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
  {
    value: 2,
    short: 'Vague',
    full: "I've heard of it",
    selectedClass: 'bg-orange-500 text-white border-orange-500',
    legendClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    value: 3,
    short: 'Theory',
    full: 'I know the definition and theory',
    selectedClass: 'bg-yellow-500 text-white border-yellow-500',
    legendClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  {
    value: 4,
    short: 'Practice',
    full: 'I can apply it in standard exercises',
    selectedClass: 'bg-lime-500 text-white border-lime-500',
    legendClass: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  },
  {
    value: 5,
    short: 'Mastery',
    full: 'I master it in any context',
    selectedClass: 'bg-green-500 text-white border-green-500',
    legendClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
];

// Used for periodic re-assessments — different framing to reduce anchoring bias
export const REASSESSMENT_LEVELS: AssessmentLevel[] = [
  {
    value: 1,
    short: 'Still no',
    full: "Still not clear to me",
    selectedClass: 'bg-red-500 text-white border-red-500',
    legendClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
  {
    value: 2,
    short: 'Gaps',
    full: "I've studied but still have gaps",
    selectedClass: 'bg-orange-500 text-white border-orange-500',
    legendClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    value: 3,
    short: 'Understand',
    full: 'Theory is clear, some practical difficulty',
    selectedClass: 'bg-yellow-500 text-white border-yellow-500',
    legendClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  {
    value: 4,
    short: 'Confident',
    full: 'I solve exercises with confidence',
    selectedClass: 'bg-lime-500 text-white border-lime-500',
    legendClass: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  },
  {
    value: 5,
    short: 'Excellent',
    full: 'No difficulty, full mastery',
    selectedClass: 'bg-green-500 text-white border-green-500',
    legendClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
];

// 4 weeks after initial, 6 weeks after each subsequent re-assessment
export const INITIAL_REASSESSMENT_DAYS = 28;
export const SUBSEQUENT_REASSESSMENT_DAYS = 42;
