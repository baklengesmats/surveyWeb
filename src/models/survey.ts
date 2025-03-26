import { Question } from "./question";

export interface Survey {
    surveyId: string;
    title: string;
    questions: Question[];
  }
