export type QuestionType = 'mcq' | 'tf';

export type Question = {
  id: string;
  topicId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: QuestionType;
  question: string;
  options: string[];          // 4 per mcq, 2 per tf ['Vero','Falso']
  correct: number;            // 0-3 per mcq, 0=Vero / 1=Falso per tf
  explanation: string;
};
