import mongoose from "mongoose";

export interface IQuiz extends Document {
  category: string;
  questions: mongoose.Types.ObjectId[];
}
