import { Schema, model, Document } from 'mongoose';

interface IQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  quizId: string;
}

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
    quizId: { type: String, required: true, unique: true },
  },
  { versionKey: false } 
);

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
