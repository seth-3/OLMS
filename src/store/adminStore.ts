import { create } from 'zustand';
import type { User, Department, SystemSettings, ActivityLog } from '../types';

interface AdminState {
  users: User[];
  departments: Department[];
  settings: SystemSettings;
  logs: ActivityLog[];
  
  createUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  updateSettings: (settings: SystemSettings) => void;
  logActivity: (log: ActivityLog) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  departments: [],
  settings: {
    institutionName: 'Global Learning Hub',
    academicYear: '2026-2027',
    currentTerm: 'Fall'
  },
  logs: [],
  createUser: (u) => set((state) => ({ users: [...state.users, u] })),
  deleteUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  updateUser: (id, patch) => set((state) => ({ users: state.users.map((user) => user.id === id ? { ...user, ...patch } : user) })),
  updateSettings: (s) => set({ settings: s }),
  logActivity: (l) => set((state) => ({ logs: [l, ...state.logs] })),
}));
