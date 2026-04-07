import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  authorId: mongoose.Types.ObjectId;
  targetRole: 'student' | 'teacher' | 'admin' | 'all';
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetRole: { type: String, enum: ['student', 'teacher', 'admin', 'all'], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
