import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { useAuthStore } from '../stores/authStore';
import { useCourseStore } from '../stores/courseStore';
import { useProgressStore } from '../stores/progressStore';
import { languageConfig } from '../data/courses';
import { 
  BookOpen, Clock, Flame, Trophy, Target, Zap, 
  ChevronRight, Play, TrendingUp, Star, Calendar 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const mockWeeklyData = [
  { day: '周一', minutes: 45, words: 20 },
  { day: '周二', minutes: 60, words: 25 },
  { day: '周三', minutes: 30, words: 15 },
  { day: '周四', minutes: 50, words: 22 },
  { day: '周五', minutes: 40, words: 18 },
  { day: '周六', minutes: 70, words: 30 },
  { day: '周日', minutes: 55, words: 24 },
];

const mockAbilityData = [
  { subject: '听力', A: 75, fullMark: 100 },
  { subject: '口语', A: 60, fullMark: 100 },
  { subject: '阅读', A: 85, fullMark: 100 },
  { subject: '写作', A: 55, fullMark: 100 },
  { subject: '词汇', A: 80, fullMark: 100 },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { courses, getRecommendedCourses } = useCourseStore();
  const { stats } = useProgressStore();

  const recommendedCourses = getRecommendedCourses();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-neutral-dark mb-2">
          {isAuthenticated ? `欢迎回来，${user?.username}！` : '欢迎来到 LinguaFlow'}
        </h1>
        <p className="text-neutral-light">
          {isAuthenticated ? '继续您的学习之旅，今天也要加油哦！' : '开启您的多语种学习之旅'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Flame, label: '连续学习', value: `${user?.streak || 0} 天`, color: 'text-orange-500', bgColor: 'bg-orange-50' },
          { icon: BookOpen, label: '学习词汇', value: `${stats.totalWordsLearned} 个`, color: 'text-primary', bgColor: 'bg-green-50' },
          { icon: Clock, label: '学习时长', value: `${Math.round(stats.totalTimeSpent / 60)} 小时`, color: 'text-secondary', bgColor: 'bg-indigo-50' },
          { icon: Trophy, label: '获得积分', value: `${user?.totalPoints || 0} XP`, color: 'text-amber-500', bgColor: 'bg-amber-50' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-neutral-light">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-dark">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {isAuthenticated && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display font-bold text-neutral-dark flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      本周学习趋势
                    </h2>
                    <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
                      <option>本周</option>
                      <option>本月</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={mockWeeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="minutes" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent>
                  <h2 className="text-xl font-display font-bold text-neutral-dark mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    今日目标
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-dark">学习时长</span>
                        <span className="text-sm font-medium text-neutral-dark">15/30 分钟</span>
                      </div>
                      <Progress value={50} color="primary" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-neutral-dark">新学单词</span>
                        <span className="text-sm font-medium text-neutral-dark">8/20 个</span>
                      </div>
                      <Progress value={40} color="secondary" />
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-br from-primary to-secondary rounded-lg text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">今日已获得</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">+120 XP</p>
                    <p className="text-sm opacity-80">继续加油！</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-neutral-dark">推荐课程</h2>
              <button 
                onClick={() => navigate('/courses')}
                className="text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors"
              >
                查看全部 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent>
                  <h2 className="text-xl font-display font-bold text-neutral-dark mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    学习能力分析
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={mockAbilityData}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="subject" stroke="#64748B" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E5E7EB" />
                      <Radar 
                        name="能力" 
                        dataKey="A" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="h-full">
                <CardContent>
                  <h2 className="text-xl font-display font-bold text-neutral-dark mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    最新成就
                  </h2>
                  <div className="space-y-4">
                    {[
                      { name: '词汇达人', desc: '学习100个单词', icon: '📚', progress: 75 },
                      { name: '坚持一周', desc: '连续学习7天', icon: '🔥', progress: 85 },
                      { name: '完美发音', desc: '获得10次发音满分', icon: '🎤', progress: 40 },
                    ].map((achievement) => (
                      <div key={achievement.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-neutral-dark">{achievement.name}</span>
                            <span className="text-sm text-neutral-light">{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-primary via-secondary to-accent-ko text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <CardContent className="relative z-10 p-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                开始您的语言学习之旅
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                加入 LinguaFlow，体验科学的间隔重复学习法，沉浸式的听说读写训练，
                让语言学习变得有趣又高效
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  立即开始
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  浏览课程
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: '丰富课程', desc: '涵盖英语、日语、韩语，系统化学习路径' },
              { icon: Target, title: '智能学习', desc: 'AI驱动的个性化推荐，精准提升薄弱环节' },
              { icon: Trophy, title: '成就激励', desc: '游戏化的学习体验，持续获得成就奖励' },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-dark mb-2">{feature.title}</h3>
                  <p className="text-neutral-light">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface CourseCardProps {
  course: any;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const { enrollCourse } = useCourseStore();
  const langConfig = languageConfig[course.language];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden cursor-pointer h-full" onClick={() => navigate(`/courses/${course.id}`)}>
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-medium text-white bg-${langConfig.color}`}>
              {langConfig.flag} {course.level}
            </span>
            {course.isPopular && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-amber-500 text-white">
                热门
              </span>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-display font-bold text-neutral-dark mb-2 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-neutral-light mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-neutral-light">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.totalWords} 词
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500" />
                {course.rating}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
