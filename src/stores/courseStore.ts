import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Unit, Lesson, Language } from '../types';
import { mockCourses } from '../data/courses';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  currentUnit: Unit | null;
  currentLesson: Lesson | null;
  enrolledCourses: string[];
  favoriteCourses: string[];
  isLoading: boolean;
  
  setCurrentCourse: (course: Course) => void;
  setCurrentUnit: (unit: Unit) => void;
  setCurrentLesson: (lesson: Lesson) => void;
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  toggleFavorite: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, score: number) => void;
  getCoursesByLanguage: (language: Language) => Course[];
  getRecommendedCourses: () => Course[];
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      currentCourse: null,
      currentUnit: null,
      currentLesson: null,
      enrolledCourses: [],
      favoriteCourses: [],
      isLoading: false,

      setCurrentCourse: (course) => set({ currentCourse: course }),
      
      setCurrentUnit: (unit) => set({ currentUnit: unit }),
      
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

      enrollCourse: (courseId) => {
        const { enrolledCourses } = get();
        if (!enrolledCourses.includes(courseId)) {
          set({ enrolledCourses: [...enrolledCourses, courseId] });
        }
      },

      unenrollCourse: (courseId) => {
        const { enrolledCourses } = get();
        set({ 
          enrolledCourses: enrolledCourses.filter(id => id !== courseId) 
        });
      },

      toggleFavorite: (courseId) => {
        const { favoriteCourses } = get();
        if (favoriteCourses.includes(courseId)) {
          set({ 
            favoriteCourses: favoriteCourses.filter(id => id !== courseId) 
          });
        } else {
          set({ 
            favoriteCourses: [...favoriteCourses, courseId] 
          });
        }
      },

      completeLesson: (courseId, lessonId, score) => {
        const { courses, enrolledCourses } = get();
        
        const updatedCourses = courses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              units: course.units.map(unit => ({
                ...unit,
                lessons: unit.lessons.map(lesson => {
                  if (lesson.id === lessonId) {
                    return { ...lesson, isCompleted: true, score };
                  }
                  return lesson;
                })
              }))
            };
          }
          return course;
        });

        const currentCourse = updatedCourses.find(c => c.id === courseId);
        
        set({
          courses: updatedCourses,
          currentCourse: currentCourse || get().currentCourse
        });
      },

      getCoursesByLanguage: (language) => {
        return get().courses.filter(course => course.language === language);
      },

      getRecommendedCourses: () => {
        const { courses, enrolledCourses } = get();
        return courses
          .filter(course => !enrolledCourses.includes(course.id))
          .slice(0, 6);
      }
    }),
    {
      name: 'linguaflow-courses',
      partialize: (state) => ({
        enrolledCourses: state.enrolledCourses,
        favoriteCourses: state.favoriteCourses
      })
    }
  )
);
