import { Answer } from "./answer";

export interface SurveyResponse {
    surveyId: string;
    userId: string; 
    answers: Answer[];
  }