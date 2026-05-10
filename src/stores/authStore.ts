import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Language } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addPoints: (points: number) => void;
  updateStreak: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  languages: Language[];
  goal: string;
  dailyMinutes: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: User = {
          id: 'user_' + Date.now(),
          username: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          targetLanguages: ['en', 'ja'],
          currentLevel: {
            en: 'A2',
            ja: 'N5',
            ko: 'TOPIK1'
          },
          dailyGoal: {
            minutes: 30,
            words: 20
          },
          streak: 5,
          totalPoints: 1250,
          achievements: ['first_login', 'week_streak'],
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          token: 'mock_token_' + Date.now()
        });

        return true;
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: 'user_' + Date.now(),
          username: data.username,
          email: data.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
          targetLanguages: data.languages,
          currentLevel: {
            en: 'A1',
            ja: 'N5',
            ko: 'TOPIK1'
          },
          dailyGoal: {
            minutes: data.dailyMinutes,
            words: Math.floor(data.dailyMinutes / 2)
          },
          streak: 0,
          totalPoints: 0,
          achievements: [],
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          token: 'mock_token_' + Date.now()
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null
        });
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      },

      addPoints: (points) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              totalPoints: currentUser.totalPoints + points
            }
          });
        }
      },

      updateStreak: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              streak: currentUser.streak + 1
            }
          });
        }
      }
    }),
    {
      name: 'linguaflow-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
);
