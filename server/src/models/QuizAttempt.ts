import mongoose, { Schema, Document } from 'mongoose';

export interface IQuizAttempt extends Document {
  quizId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  answers: Record<string, string>;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizAttemptSchema = new Schema<IQuizAttempt>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true },
    endTime: Date,
    answers: { type: Map, of: String, required: true },
    score: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);
