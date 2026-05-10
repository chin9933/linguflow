import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LearningStats, DailyProgress, Achievement, VocabularyWord } from '../types';

interface ProgressState {
  stats: LearningStats;
  vocabulary: VocabularyWord[];
  achievements: Achievement[];
  todayProgress: DailyProgress | null;
  weeklyProgress: DailyProgress[];
  
  addLearningTime: (minutes: number) => void;
  addWordsLearned: (count: number) => void;
  addExercisesCompleted: (count: number) => void;
  updateAccuracy: (accuracy: number) => void;
  addXP: (xp: number) => void;
  updateStreak: () => void;
  addVocabulary: (word: VocabularyWord) => void;
  updateVocabulary: (wordId: string, updates: Partial<VocabularyWord>) => void;
  unlockAchievement: (achievementId: string) => void;
  resetDailyProgress: () => void;
  getTodayStats: () => DailyProgress;
}

const initialStats: LearningStats = {
  totalWordsLearned: 0,
  totalExercisesCompleted: 0,
  totalTimeSpent: 0,
  averageAccuracy: 0,
  currentStreak: 7,
  longestStreak: 14,
  weeklyProgress: []
};

const initialAchievements: Achievement[] = [
  {
    id: 'first_lesson',
    name: '初学者',
    description: '完成第一节课',
    icon: '🎯',
    category: 'learning',
    requirement: 1,
    progress: 0,
    isUnlocked: false,
    xpReward: 50
  },
  {
    id: 'word_master_100',
    name: '词汇达人',
    description: '学习100个单词',
    icon: '📚',
    category: 'learning',
    requirement: 100,
    progress: 0,
    isUnlocked: false,
    xpReward: 200
  },
  {
    id: 'week_streak',
    name: '坚持一周',
    description: '连续学习7天',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
    progress: 0,
    isUnlocked: false,
    xpReward: 300
  },
  {
    id: 'perfect_score',
    name: '满分达成',
    description: '练习获得满分',
    icon: '⭐',
    category: 'learning',
    requirement: 1,
    progress: 0,
    isUnlocked: false,
    xpReward: 150
  },
  {
    id: 'night_owl',
    name: '夜猫子',
    description: '在午夜完成学习',
    icon: '🦉',
    category: 'special',
    requirement: 1,
    progress: 0,
    isUnlocked: false,
    xpReward: 100
  }
];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      stats: initialStats,
      vocabulary: [],
      achievements: initialAchievements,
      todayProgress: null,
      weeklyProgress: [],

      addLearningTime: (minutes) => {
        const { stats, todayProgress } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (todayProgress && todayProgress.date === today) {
          set({
            todayProgress: {
              ...todayProgress,
              minutes: todayProgress.minutes + minutes
            }
          });
        } else {
          set({
            todayProgress: {
              date: today,
              minutes,
              wordsLearned: 0,
              exercisesCompleted: 0,
              xpEarned: 0
            }
          });
        }

        set({
          stats: {
            ...stats,
            totalTimeSpent: stats.totalTimeSpent + minutes
          }
        });
      },

      addWordsLearned: (count) => {
        const { stats, todayProgress, vocabulary } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (todayProgress && todayProgress.date === today) {
          set({
            todayProgress: {
              ...todayProgress,
              wordsLearned: todayProgress.wordsLearned + count
            }
          });
        } else {
          set({
            todayProgress: {
              date: today,
              minutes: 0,
              wordsLearned: count,
              exercisesCompleted: 0,
              xpEarned: 0
            }
          });
        }

        set({
          stats: {
            ...stats,
            totalWordsLearned: stats.totalWordsLearned + count
          }
        });
      },

      addExercisesCompleted: (count) => {
        const { stats, todayProgress } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (todayProgress && todayProgress.date === today) {
          set({
            todayProgress: {
              ...todayProgress,
              exercisesCompleted: todayProgress.exercisesCompleted + count
            }
          });
        } else {
          set({
            todayProgress: {
              date: today,
              minutes: 0,
              wordsLearned: 0,
              exercisesCompleted: count,
              xpEarned: 0
            }
          });
        }

        set({
          stats: {
            ...stats,
            totalExercisesCompleted: stats.totalExercisesCompleted + count
          }
        });
      },

      updateAccuracy: (accuracy) => {
        const { stats } = get();
        const totalExercises = stats.totalExercisesCompleted;
        const currentTotal = stats.averageAccuracy * (totalExercises - 1);
        const newAccuracy = (currentTotal + accuracy) / totalExercises;
        
        set({
          stats: {
            ...stats,
            averageAccuracy: Math.round(newAccuracy)
          }
        });
      },

      addXP: (xp) => {
        const { todayProgress, stats } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (todayProgress && todayProgress.date === today) {
          set({
            todayProgress: {
              ...todayProgress,
              xpEarned: todayProgress.xpEarned + xp
            }
          });
        }
      },

      updateStreak: () => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            currentStreak: stats.currentStreak + 1,
            longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1)
          }
        });
      },

      addVocabulary: (word) => {
        set({ vocabulary: [...get().vocabulary, word] });
      },

      updateVocabulary: (wordId, updates) => {
        const { vocabulary } = get();
        set({
          vocabulary: vocabulary.map(w => 
            w.id === wordId ? { ...w, ...updates } : w
          )
        });
      },

      unlockAchievement: (achievementId) => {
        const { achievements } = get();
        set({
          achievements: achievements.map(a => 
            a.id === achievementId 
              ? { ...a, isUnlocked: true, unlockedAt: new Date() }
              : a
          )
        });
      },

      resetDailyProgress: () => {
        set({ todayProgress: null });
      },

      getTodayStats: () => {
        const { todayProgress } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (todayProgress && todayProgress.date === today) {
          return todayProgress;
        }
        
        return {
          date: today,
          minutes: 0,
          wordsLearned: 0,
          exercisesCompleted: 0,
          xpEarned: 0
        };
      }
    }),
    {
      name: 'linguaflow-progress',
      partialize: (state) => ({
        stats: state.stats,
        vocabulary: state.vocabulary,
        achievements: state.achievements,
        weeklyProgress: state.weeklyProgress
      })
    }
  )
);
