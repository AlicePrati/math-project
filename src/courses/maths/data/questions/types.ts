export type QuestionType = 'mcq' | 'tf' | 'arrange';

type BaseQuestion = {
  id: string;
  topicId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  explanation: string;
};

// MCQ
// La risposta corretta è sempre options[0]
export type SelectionQuestion = BaseQuestion & {
  type: 'mcq';
  options: string[];
};

// TF: V/F hanno significato semantico fisso; serve 'correct' esplicito
export type TFQuestion = BaseQuestion & {
  type: 'tf';
  options: string[];
  correct: 0 | 1;
};

// Arrange: riordina le parole
export type ArrangeQuestion = BaseQuestion & {
  type: 'arrange';
  bank: string[];
  correct: string[];
};

export type Question = SelectionQuestion | TFQuestion | ArrangeQuestion;
