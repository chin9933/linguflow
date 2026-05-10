export interface LearningRecord {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  score: number;
  timeSpent: number;
  completedAt: Date;
  mistakes: string[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: { sentence: string; translation: string }[];
  level: string;
  mastery: number;
  nextReviewDate: Date;
  reviewCount: number;
  timesCorrect: number;
  timesIncorrect: number;
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number;
  wordsLearned: number;
  exercisesCompleted: number;
  accuracy: number;
}

export interface DailyProgress {
  date: string;
  minutes: number;
  wordsLearned: number;
  exercisesCompleted: number;
  xpEarned: number;
}

export interface LearningStats {
  totalWordsLearned: number;
  totalExercisesCompleted: number;
  totalTimeSpent: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: DailyProgress[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'social' | 'special';
  requirement: number;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: string[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  totalPoints: number;
  weeklyPoints: number;
  rank: number;
  streak: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  language: 'en' | 'ja' | 'ko' | 'general';
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  tags: string[];
  isPinned?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  language: 'en' | 'ja' | 'ko';
  memberCount: number;
  maxMembers: number;
  leaderId: string;
  leaderName: string;
  weeklyGoal: number;
  currentStreak: number;
  isPublic: boolean;
  coverImage?: string;
}
