import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/IUser";

// Define the User schema
const userSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quizScores: [
      {
        quizId: {
          type: Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    progress: [
      {
        quizId: {
          type: Schema.Types.ObjectId,
          ref: "Quiz",
          required: true,
        },
        currentQuestion: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
