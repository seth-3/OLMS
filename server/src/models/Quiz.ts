import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  timeLimitMinutes?: number;
  dueDate?: Date;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

interface Question {
  _id?: mongoose.Types.ObjectId;
  type: 'mcq' | 'fill-blank' | 'true-false';
  text: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

const QuestionSchema = new Schema<Question>({
  type: { type: String, enum: ['mcq', 'fill-blank', 'true-false'], required: true },
  text: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
  points: { type: Number, default: 1 },
});

const QuizSchema = new Schema<IQuiz>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: String,
    timeLimitMinutes: Number,
    dueDate: Date,
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
