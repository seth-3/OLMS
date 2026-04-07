import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  teacherId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  themeColor: string;
  studentIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    themeColor: String,
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
