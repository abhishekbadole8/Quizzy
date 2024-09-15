import { Document } from "mongoose";

// Define an interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  quizScores: Array<{
    quizId: string;
    score: number;
    date: Date;
  }>;
  progress: Array<{
    quizId: string;
    currentQuestion: number;
  }>;
  answeredQuestions: Array<{
    quizId: string;
    currentQuestion: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
