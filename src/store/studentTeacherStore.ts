import { create } from 'zustand';
import type { UserProgress, Message, Attendance, Announcement } from '../types';

interface StudentTeacherState {
  userProgress: UserProgress;
  messages: Message[];
  announcements: Announcement[];
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
  
  updateStudentProgress: (subjectId: string, lessonFinished: boolean) => void;
  sendMessage: (msg: Message) => void;
  createAnnouncement: (announcement: Announcement) => void;
}

export const useStudentTeacherStore = create<StudentTeacherState>((set) => ({
  userProgress: {
    totalLessons: 0,
    completedLessons: 0,
    subjects: {},
    studyStreak: 0,
  },
  messages: [],
  announcements: [],
  attendance: [],
  loading: false,
  error: null,
  
  updateStudentProgress: (subjectId, lessonFinished) =>
    set((state) => {
      const newProgress = { ...state.userProgress };
      if (lessonFinished) {
        newProgress.completedLessons++;
        if (newProgress.subjects[subjectId]) {
          newProgress.subjects[subjectId].completed++;
        }
      }
      return { userProgress: newProgress };
    }),
  sendMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  createAnnouncement: (ann) =>
    set((state) => ({ announcements: [ann, ...state.announcements] })),
}));
