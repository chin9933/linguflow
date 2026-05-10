export type Language = 'en' | 'ja' | 'ko';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type JapaneseLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type KoreanLevel = 'TOPIK1' | 'TOPIK2' | 'TOPIK3' | 'TOPIK4' | 'TOPIK5' | 'TOPIK6';

export type Level = EnglishLevel | JapaneseLevel | KoreanLevel;

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  targetLanguages: Language[];
  currentLevel: Record<Language, Level>;
  dailyGoal: {
    minutes: number;
    words: number;
  };
  streak: number;
  totalPoints: number;
  achievements: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  languages: Language[];
  goal: 'exam' | 'work' | 'travel' | 'hobby';
  dailyMinutes: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}
