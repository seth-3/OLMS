import { create } from 'zustand';
import type { Course, Module, LearningMaterial, ClassSchedule } from '../types';
import { getCoursesAPI, createCourseAPI, updateCourseAPI, deleteCourseAPI, getModulesAPI, getMaterialsAPI } from '../utils/api';

interface CourseState {
  courses: Course[];
  modules: Module[];
  materials: LearningMaterial[];
  schedules: ClassSchedule[];
  loading: boolean;
  error: string | null;
  
  fetchCourses: () => Promise<void>;
  createCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, partial: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  fetchModules: (courseId: string) => Promise<void>;
  fetchMaterials: (moduleId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  modules: [],
  materials: [],
  schedules: [],
  loading: false,
  error: null,
  
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const courses = await getCoursesAPI();
      set({ courses, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  createCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      const newCourse = await createCourseAPI(course);
      set((state) => ({ courses: [...state.courses, newCourse], loading: false }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  updateCourse: async (id, partial) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateCourseAPI(id, partial);
      set((state) => ({
        courses: state.courses.map(c => c.id === id ? updated : c),
        loading: false
      }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCourseAPI(id);
      set((state) => ({
        courses: state.courses.filter(c => c.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  fetchModules: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const modules = await getModulesAPI(courseId);
      set({ modules, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
  
  fetchMaterials: async (moduleId) => {
    set({ loading: true, error: null });
    try {
      const materials = await getMaterialsAPI(moduleId);
      set({ materials, loading: false });
    } catch (error) {
      set({ error: String(error), loading: false });
    }
  },
}));
