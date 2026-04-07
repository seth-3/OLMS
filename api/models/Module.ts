import mongoose, { Schema, Document } from 'mongoose';

export interface IModule extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema<IModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IModule>('Module', ModuleSchema);
