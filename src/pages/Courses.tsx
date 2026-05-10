import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { useCourseStore } from '../stores/courseStore';
import { languageConfig } from '../data/courses';
import { Language, Course } from '../types';
import { Search, Filter, Grid, List, Star, BookOpen, Users, ChevronRight } from 'lucide-react';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialLanguage = searchParams.get('language') as Language | null;
  const { courses, enrollCourse, enrolledCourses } = useCourseStore();
  
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>(initialLanguage || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const languages: (Language | 'all')[] = ['all', 'en', 'ja', 'ko'];

  const filteredCourses = courses.filter(course => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-neutral-dark mb-2">
          探索课程
        </h1>
        <p className="text-neutral-light">
          发现适合您的语言学习课程
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-light" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => {
          const config = lang === 'all' 
            ? { name: '全部', flag: '🌍', color: 'bg-gray-500' }
            : languageConfig[lang];
          
          return (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedLanguage === lang
                  ? 'bg-primary text-white shadow-layer1'
                  : 'bg-white text-neutral-dark hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {config.flag} {config.name}
            </button>
          );
        })}
      </div>

      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {filteredCourses.map((course, index) => (
          <CourseCard 
            key={course.id} 
            course={course}
            isEnrolled={enrolledCourses.includes(course.id)}
            viewMode={viewMode}
            index={index}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-neutral-light mx-auto mb-4" />
          <p className="text-neutral-light">未找到符合条件的课程</p>
        </div>
      )}
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  viewMode: 'grid' | 'list';
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled, viewMode, index }) => {
  const navigate = useNavigate();
  const { enrollCourse } = useCourseStore();
  const langConfig = languageConfig[course.language];

  const handleEnroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    enrollCourse(course.id);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="overflow-hidden" onClick={() => navigate(`/courses/${course.id}`)}>
          <div className="flex">
            <div className="relative w-48 h-32 flex-shrink-0">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium text-white ${langConfig.color}`}>
                  {langConfig.flag} {course.level}
                </span>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-bold text-neutral-dark mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-light line-clamp-1">
                    {course.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-light" />
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-light mb-3">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.totalWords} 词
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.enrollmentCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  {course.rating}
                </span>
              </div>
              <button
                onClick={handleEnroll}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${isEnrolled 
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-primary text-white hover:bg-primary-dark'
                  }
                `}
              >
                {isEnrolled ? '已报名' : '立即报名'}
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full flex flex-col" onClick={() => navigate(`/courses/${course.id}`)}>
        <div className="relative h-40 flex-shrink-0">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-medium text-white ${langConfig.color}`}>
              {langConfig.flag} {course.level}
            </span>
            {course.isPopular && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-amber-500 text-white">
                热门
              </span>
            )}
            {course.isNew && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-500 text-white">
                新课
              </span>
            )}
          </div>
        </div>
        <CardContent className="flex-1 flex flex-col">
          <h3 className="font-display font-bold text-neutral-dark mb-2 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-neutral-light mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-sm text-neutral-light mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.totalWords} 词
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              {course.rating}
            </span>
          </div>
          <button
            onClick={handleEnroll}
            className={`
              w-full py-2 rounded-md text-sm font-medium transition-colors
              ${isEnrolled 
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-primary text-white hover:bg-primary-dark'
              }
            `}
          >
            {isEnrolled ? '已报名' : '立即报名'}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
