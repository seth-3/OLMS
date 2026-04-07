export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password?: string;
  mustChangePassword?: boolean;
  status?: 'Active' | 'Inactive';
  avatarUrl?: string;
  departmentId?: string;
}

// Student Models
export interface Subject {
  id: string;
  name: string;
  icon: string; // emoji
  lessons: number;
  progress: number; // 0-100
  color: string; // hex
  description?: string;
}

export type ContentType = 'text' | 'heading' | 'formula' | 'example' | 'practice';

export interface ContentItem {
  type: ContentType;
  content: string;
  title?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  duration: string;
  completed: boolean;
  content: ContentItem[];
  order: number;
}

export type AssignmentStatus = 'pending' | 'submitted' | 'synced' | 'graded';

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  status: AssignmentStatus;
  submittedDate?: string;
  file?: string; // base64 or url
  notes?: string;
  score?: number;
  feedback?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  icon: string;
}

export interface UserProgress {
  totalLessons: number;
  completedLessons: number;
  subjects: Record<string, { completed: number; total: number }>;
  studyStreak: number;
}

// Teacher / Course Models
export interface Course {
  id: string;
  teacherId: string;
  name: string;
  description: string;
  themeColor: string;
  studentIds: string[];
  createdAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
}

export interface LearningMaterial {
  id: string;
  moduleId: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  dayOfWeek: string;
  startTime: string; 
  endTime: string;
  location?: string;
}

// Quiz Models
export type QuestionType = 'mcq' | 'fill-blank' | 'true-false';

export interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  text: string;
  options?: string[]; // for mcq
  correctAnswer: string;
  points: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  timeLimitMinutes?: number;
  dueDate?: string;
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  answers: Record<string, string>; // questionId -> answer
  score?: number;
}

// Admin / System Models
export interface Department {
  id: string;
  name: string;
  headTeacherId?: string;
}

export interface Announcement {
  id: string;
  authorId: string;
  targetRole: Role | 'all';
  title: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  timestamp: string;
}

export interface Attendance {
  id: string;
  courseId: string;
  date: string;
  records: Record<string, 'present' | 'absent' | 'late'>; // studentId -> status
}

export interface DiscussionForum {
  id: string;
  courseId: string;
  title: string;
  description?: string;
}

export interface DiscussionThread {
  id: string;
  forumId: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface SystemSettings {
  institutionName: string;
  logoUrl?: string;
  academicYear: string;
  currentTerm: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details?: string;
}
