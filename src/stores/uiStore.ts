import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      activeModal: null,
      theme: 'light',
      notifications: [],

      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      openModal: (modalId) => set({ activeModal: modalId }),

      closeModal: () => set({ activeModal: null }),

      setTheme: (theme) => set({ theme }),

      addNotification: (notification) => {
        const id = 'notification_' + Date.now();
        const newNotification = { ...notification, id };
        
        set({ notifications: [...get().notifications, newNotification] });

        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration || 3000);
        }
      },

      removeNotification: (id) => {
        set({ 
          notifications: get().notifications.filter(n => n.id !== id) 
        });
      }
    }),
    {
      name: 'linguaflow-ui',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme
      })
    }
  )
);
