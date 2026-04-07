import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface UIState {
  notifications: Notification[];
  isOffline: boolean;
  addNotification: (type: NotificationType, message: string) => void;
  removeNotification: (id: string) => void;
  setOfflineStatus: (status: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  notifications: [],
  isOffline: !navigator?.onLine,
  addNotification: (type, message) => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, type, message }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 5000);
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setOfflineStatus: (status) => set({ isOffline: status }),
}));
