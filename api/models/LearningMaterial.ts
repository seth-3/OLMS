import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningMaterial extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const LearningMaterialSchema = new Schema<ILearningMaterial>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['pdf', 'video', 'link', 'document'], required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILearningMaterial>('LearningMaterial', LearningMaterialSchema);
