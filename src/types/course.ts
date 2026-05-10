import { Language, Level } from './user';

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  titleEn: string;
  description: string;
  coverImage: string;
  units: Unit[];
  totalDuration: number;
  totalWords: number;
  enrollmentCount: number;
  rating: number;
  category: CourseCategory;
  isPopular?: boolean;
  isNew?: boolean;
}

export type CourseCategory = 
  | 'daily-life'
  | 'social'
  | 'workplace'
  | 'culture'
  | 'exam-prep'
  | 'conversation'
  | 'grammar'
  | 'vocabulary';

export interface Unit {
  id: string;
  title: string;
  titleEn: string;
  lessons: Lesson[];
  isLocked: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  type: LearningType;
  duration: number;
  content: LessonContent;
  isCompleted: boolean;
  score?: number;
}

export type LearningType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface LessonContent {
  items: LearningItem[];
  instructions?: string;
}

export interface LearningItem {
  id: string;
  type: 'word' | 'phrase' | 'sentence' | 'grammar' | 'audio';
  content: string;
  translation?: string;
  pronunciation?: string;
  examples?: Example[];
  tips?: string;
  options?: string[];
  correctAnswer?: string | number;
  audioUrl?: string;
  imageUrl?: string;
}

export interface Example {
  sentence: string;
  translation: string;
  pronunciation?: string;
}

export interface VocabularyItem extends LearningItem {
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: Example[];
  level: Level;
  mastery: number;
  nextReviewDate?: Date;
}

export interface GrammarItem extends LearningItem {
  rule: string;
  structure: string;
  usage: string;
  examples: Example[];
  exercises: GrammarExercise[];
}

export interface GrammarExercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'reorder' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SpeakingItem extends LearningItem {
  audioUrl: string;
  transcript: string;
  translation: string;
  keyPhrases: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListeningItem extends LearningItem {
  audioUrl: string;
  transcript: string;
  translation: string;
  questions: ListeningQuestion[];
  speedOptions: number[];
}

export interface ListeningQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string;
}
