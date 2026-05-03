export type Question = {
  id: string;
  topicId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
};
