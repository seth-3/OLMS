import { create } from 'zustand';
import type { Quiz, QuizAttempt } from '../types';
import { getQuizzesAPI, createQuizAPI, getQuizAPI, submitQuizAPI, getQuizAttemptsAPI } from '../utils/api';

interface QuizState {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  
  fetchQuizzes: (courseId?: string) => Promise<void>;
  createQuiz: (quiz: Omit<Quiz, 'id'>) => Promise<void>;
  fetchQuiz: (quizId: string) => Promise<void>;
  submitAttempt: (quizId: string, answers: Record<string, string>) => Promise<void>;
  fetchAttempts: (quizId: string) => Promise<void>;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizzes: [],
  attempts: [],
  currentQuiz: null,
  loading: false,
  error: null,
  
  fetchQuizzes: async (courseId?: string) => {
    set({ loading: true, error: null });
    try {
      const quizzes = await getQuizzesAPI(courseId);
      set({ quizzes, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  createQuiz: async (quiz) => {
    set({ loading: true, error: null });
    try {
      const newQuiz = await createQuizAPI(quiz);
      set((state) => ({ quizzes: [...state.quizzes, newQuiz], loading: false }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  fetchQuiz: async (quizId) => {
    set({ loading: true, error: null });
    try {
      const currentQuiz = await getQuizAPI(quizId);
      set({ currentQuiz, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  submitAttempt: async (quizId, answers) => {
    set({ loading: true, error: null });
    try {
      const attempt = await submitQuizAPI(quizId, { answers });
      set((state) => ({ attempts: [...state.attempts, attempt], loading: false }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  fetchAttempts: async (quizId) => {
    set({ loading: true, error: null });
    try {
      const attempts = await getQuizAttemptsAPI(quizId);
      set({ attempts, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
}));
