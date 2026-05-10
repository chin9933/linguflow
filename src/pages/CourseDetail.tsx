import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { useCourseStore } from '../stores/courseStore';
import { languageConfig } from '../data/courses';
import { 
  ArrowLeft, BookOpen, Clock, Users, Star, Play, 
  Lock, Check, ChevronDown, ChevronRight, Volume2 
} from 'lucide-react';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, enrollCourse, enrolledCourses } = useCourseStore();
  
  const course = courses.find(c => c.id === id);
  const isEnrolled = enrolledCourses.includes(id || '');

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-neutral-dark mb-4">课程未找到</h2>
        <Button onClick={() => navigate('/courses')}>返回课程列表</Button>
      </div>
    );
  }

  const langConfig = languageConfig[course.language];

  const handleEnroll = () => {
    enrollCourse(course.id);
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/learn/${course.id}/${lessonId}`);
  };

  return (
    <div className="space-y-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-neutral-dark hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        返回课程列表
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden"
          >
            <img
              src={course.coverImage}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${langConfig.color}`}>
                  {langConfig.flag} {course.level} · {langConfig.name}
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">{course.title}</h1>
              <p className="text-white/80">{course.titleEn}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <h2 className="text-xl font-display font-bold text-neutral-dark mb-4">
                  课程介绍
                </h2>
                <p className="text-neutral-light leading-relaxed">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-neutral-dark">{course.totalWords}</p>
                    <p className="text-sm text-neutral-light">词汇量</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-lg font-bold text-neutral-dark">{Math.round(course.totalDuration / 60)}h</p>
                    <p className="text-sm text-neutral-light">课程时长</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-accent-ko mx-auto mb-2" />
                    <p className="text-lg font-bold text-neutral-dark">{(course.enrollmentCount / 1000).toFixed(1)}k</p>
                    <p className="text-sm text-neutral-light">学习人数</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-neutral-dark">{course.rating}</p>
                    <p className="text-sm text-neutral-light">课程评分</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-display font-bold text-neutral-dark mb-4">
              课程内容
            </h2>
            <div className="space-y-3">
              {course.units.map((unit, unitIndex) => (
                <UnitAccordion
                  key={unit.id}
                  unit={unit}
                  unitNumber={unitIndex + 1}
                  isEnrolled={isEnrolled}
                  onStartLesson={handleStartLesson}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <Card className="sticky top-24">
            <CardContent>
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-green-600">
                    <Check className="w-6 h-6" />
                    <span className="font-semibold">已报名此课程</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-dark">学习进度</span>
                      <span className="text-primary font-medium">30%</span>
                    </div>
                    <Progress value={30} />
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    leftIcon={<Play className="w-5 h-5" />}
                    onClick={() => {
                      const firstIncompleteLesson = course.units
                        .flatMap(u => u.lessons)
                        .find(l => !l.isCompleted);
                      if (firstIncompleteLesson) {
                        handleStartLesson(firstIncompleteLesson.id);
                      }
                    }}
                  >
                    继续学习
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-bold text-neutral-dark">
                    开始学习之旅
                  </h3>
                  <p className="text-neutral-light text-sm">
                    报名后即可解锁全部课程内容，开始您的语言学习之路
                  </p>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleEnroll}
                  >
                    立即报名
                  </Button>
                </div>
              )}

              <div className="border-t border-gray-100 mt-6 pt-6 space-y-3">
                <h4 className="font-medium text-neutral-dark">学习模块</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: BookOpen, label: '单词记忆', color: 'bg-green-100 text-green-600' },
                    { icon: Volume2, label: '语法练习', color: 'bg-blue-100 text-blue-600' },
                    { icon: Volume2, label: '口语跟读', color: 'bg-purple-100 text-purple-600' },
                    { icon: Volume2, label: '听力训练', color: 'bg-orange-100 text-orange-600' },
                  ].map((module) => (
                    <div
                      key={module.label}
                      className={`flex items-center gap-2 p-3 rounded-lg ${module.color}`}
                    >
                      <module.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{module.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

interface UnitAccordionProps {
  unit: any;
  unitNumber: number;
  isEnrolled: boolean;
  onStartLesson: (lessonId: string) => void;
}

const UnitAccordion: React.FC<UnitAccordionProps> = ({ unit, unitNumber, isEnrolled, onStartLesson }) => {
  const [isOpen, setIsOpen] = useState(unit.progress > 0);

  return (
    <Card>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${unit.isLocked ? 'bg-gray-100 text-neutral-light' : 'bg-primary text-white'}
          `}>
            {unit.isLocked ? <Lock className="w-5 h-5" /> : unitNumber}
          </div>
          <div>
            <h3 className="font-semibold text-neutral-dark">{unit.title}</h3>
            <p className="text-sm text-neutral-light">{unit.titleEn}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!unit.isLocked && unit.lessons.length > 0 && (
            <span className="text-sm text-primary">{unit.progress}% 完成</span>
          )}
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-neutral-light" />
          ) : (
            <ChevronRight className="w-5 h-5 text-neutral-light" />
          )}
        </div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-100"
        >
          <div className="p-4 space-y-2">
            {unit.lessons.map((lesson: any) => (
              <button
                key={lesson.id}
                onClick={() => !unit.isLocked && onStartLesson(lesson.id)}
                disabled={unit.isLocked}
                className={`
                  w-full p-3 rounded-lg flex items-center gap-3 transition-colors
                  ${unit.isLocked 
                    ? 'bg-gray-50 cursor-not-allowed' 
                    : lesson.isCompleted 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${lesson.isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-neutral-dark'
                  }
                `}>
                  {lesson.isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-neutral-dark">{lesson.title}</p>
                  <p className="text-xs text-neutral-light">
                    {lesson.type === 'vocabulary' ? '单词' : 
                     lesson.type === 'grammar' ? '语法' :
                     lesson.type === 'speaking' ? '口语' : '听力'} · {lesson.duration} 分钟
                  </p>
                </div>
                {lesson.score && (
                  <span className="text-sm font-medium text-green-600">
                    {lesson.score}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
};
