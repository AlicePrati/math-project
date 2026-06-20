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
};
