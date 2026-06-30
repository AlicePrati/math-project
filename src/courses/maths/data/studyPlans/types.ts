export type ContentBlock =
  | { type: 'analogy'; emoji: string; title: string; text: string }
  | { type: 'visual'; title: string; caption: string; svgKey: string }
  | { type: 'example'; prompt: string; hint: string; answer: string }
  | { type: 'tryit'; question: string; options: string[]; correct: number; explanation: string };

export type StudyPlanVideo = {
  title: string;
  url: string;
};

export type TopicExercise = {
  id: string;
  title?: string;
  question: string;
  svgKey?: string;
  options: string[];
  correct: number;
  explanation: string;
  retry: {
    question: string;
    svgKey?: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
};

export type StudyPlanTopic = {
  id: string;
  label: string;
  scene?: string;
  exercises: TopicExercise[];
  lessons?: TopicExercise[][];
};

export type StudyPlan = {
  topicId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  label: string;
  whatYouNeed: string;
  approach: string[];
  keyPoints: string[];
  commonMistakes: string[];
  exercises: string[];
  nextStep: string;
  videos?: StudyPlanVideo[];
  topics?: StudyPlanTopic[];
  interactive?: ContentBlock[];
};
