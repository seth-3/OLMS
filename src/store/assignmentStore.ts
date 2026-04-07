import { create } from 'zustand';
import type { Assignment, Submission } from '../types';
import { getAssignmentsAPI, createAssignmentAPI, submitAssignmentAPI, gradeSubmissionAPI, getSubmissionsAPI } from '../utils/api';

interface AssignmentState {
  assignments: Assignment[];
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  
  fetchAssignments: (courseId?: string) => Promise<void>;
  createAssignment: (assignment: Omit<Assignment, 'id'>) => Promise<void>;
  fetchSubmissions: (assignmentId: string) => Promise<void>;
  submitAssignment: (assignmentId: string, submission: Omit<Submission, 'id'>) => Promise<void>;
  gradeSubmission: (id: string, score: number, feedback: string) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  submissions: [],
  loading: false,
  error: null,
  
  fetchAssignments: async (courseId?: string) => {
    set({ loading: true, error: null });
    try {
      const assignments = await getAssignmentsAPI(courseId);
      set({ assignments, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  createAssignment: async (assignment) => {
    set({ loading: true, error: null });
    try {
      const newAssignment = await createAssignmentAPI(assignment);
      set((state) => ({ assignments: [...state.assignments, newAssignment], loading: false }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  fetchSubmissions: async (assignmentId) => {
    set({ loading: true, error: null });
    try {
      const submissions = await getSubmissionsAPI(assignmentId);
      set({ submissions, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  submitAssignment: async (assignmentId, submission) => {
    set({ loading: true, error: null });
    try {
      const result = await submitAssignmentAPI(assignmentId, submission);
      set((state) => {
        const existingIndex = state.submissions.findIndex(s => s.id === result.id);
        const newSubmissions = existingIndex >= 0
          ? state.submissions.map((s, i) => i === existingIndex ? result : s)
          : [...state.submissions, result];
        return { submissions: newSubmissions, loading: false };
      });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  gradeSubmission: async (id, score, feedback) => {
    set({ loading: true, error: null });
    try {
      const updated = await gradeSubmissionAPI(id, { score, feedback });
      set((state) => ({
        submissions: state.submissions.map(s => s.id === id ? updated : s),
        loading: false
      }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
}));
