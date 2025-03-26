export interface Question {
    questionId: string; 
    surveyId: string; 
    questionOrder: number;
    text: string;
    minGrade: number;
    maxGrade: number;
  }