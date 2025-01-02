// Backend-Aifer-Edutech/src/dtos/QuestionDTO.ts
export interface QuestionDTO {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  quizId: string;
}


export interface QuestionSubmitDTO {
  answers: {
    quizId: string;
    selectedAnswer: number;
  }[];
}
