import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { 
  Home, BookOpen, GraduationCap, Trophy, Users, BarChart3, 
  Settings, X, Globe, Zap, Star 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { path: '/', icon: Home, label: '首页', requiresAuth: false },
  { path: '/courses', icon: BookOpen, label: '课程', requiresAuth: false },
  { path: '/progress', icon: BarChart3, label: '学习进度', requiresAuth: true },
  { path: '/achievements', icon: Trophy, label: '成就', requiresAuth: true },
  { path: '/community', icon: Users, label: '社区', requiresAuth: true },
];

const secondaryNavItems = [
  { path: '/settings', icon: Settings, label: '设置', requiresAuth: true },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  const navItems = [...mainNavItems, ...secondaryNavItems];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
          width: 280
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          fixed left-0 top-0 h-full bg-white shadow-layer2 z-50
          ${isOpen ? 'block' : 'hidden'}
          lg:block lg:relative lg:shadow-none
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-neutral-dark">LinguaFlow</h2>
                  <p className="text-xs text-neutral-light">多语种学习平台</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-dark" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.requiresAuth && !isAuthenticated) return null;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-white shadow-layer1' 
                        : 'text-neutral-dark hover:bg-gray-50 hover:text-primary'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
                学习语言
              </h3>
              <div className="space-y-2">
                {[
                  { code: 'en', name: '英语', flag: '🇺🇸', color: 'accent-en' },
                  { code: 'ja', name: '日语', flag: '🇯🇵', color: 'accent-ja' },
                  { code: 'ko', name: '韩语', flag: '🇰🇷', color: 'accent-ko' },
                ].map((lang) => (
                  <NavLink
                    key={lang.code}
                    to={`/courses?language=${lang.code}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm text-neutral-dark">{lang.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <div className="mt-8 p-4 bg-gradient-to-br from-primary to-secondary rounded-lg text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">每日目标</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>学习时长</span>
                    <span>15/30 分钟</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div className="bg-white rounded-full h-full w-1/2"></div>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-lg">
              <Star className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-neutral-dark">升级到高级版</p>
                <p className="text-xs text-neutral-light">解锁全部课程和功能</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
