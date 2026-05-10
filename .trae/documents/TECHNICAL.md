# LinguaFlow - 技术架构文档

## 1. 系统架构概述

### 1.1 整体架构图
```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层 (UI Layer)                   │
│  React Components + Tailwind CSS + Framer Motion           │
├─────────────────────────────────────────────────────────────┤
│                        业务逻辑层 (Business Layer)              │
│  Zustand Store + Custom Hooks + Context Providers           │
├─────────────────────────────────────────────────────────────┤
│                        数据访问层 (Data Access Layer)            │
│  API Services + Local Storage + IndexedDB                   │
├─────────────────────────────────────────────────────────────┤
│                        基础设施层 (Infrastructure Layer)         │
│  Vite + TypeScript + Build Tools                           │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 技术栈详细清单

| 层级 | 技术选型 | 版本要求 | 用途说明 |
|-----|---------|---------|---------|
| 框架 | React | 18.x | UI框架 |
| 语言 | TypeScript | 5.x | 类型安全 |
| 构建 | Vite | 5.x | 快速构建 |
| 样式 | Tailwind CSS | 3.x | 原子化CSS |
| 状态 | Zustand | 4.x | 轻量状态管理 |
| 路由 | React Router | 6.x | SPA路由 |
| HTTP | Axios | 1.x | HTTP客户端 |
| 图表 | Recharts | 2.x | 数据可视化 |
| 动画 | Framer Motion | 10.x | 交互动画 |
| 图标 | Lucide React | 最新 | 图标库 |
| 表单 | React Hook Form | 7.x | 表单处理 |
| 验证 | Zod | 3.x | schema验证 |
| 日期 | Day.js | 1.x | 日期处理 |

## 2. 项目结构设计

### 2.1 目录结构
```
linguaflow/
├── public/
│   └── assets/
│       ├── images/          # 静态图片资源
│       └── sounds/          # 音频文件
├── src/
│   ├── api/                 # API接口层
│   │   ├── auth.ts          # 认证相关API
│   │   ├── course.ts        # 课程相关API
│   │   ├── learning.ts      # 学习数据API
│   │   └── community.ts      # 社区API
│   ├── assets/              # 内部资源
│   │   └── fonts/           # 自定义字体
│   ├── components/          # 通用组件
│   │   ├── ui/              # 基础UI组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/          # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── common/          # 业务通用组件
│   │       ├── LanguageSwitcher.tsx
│   │       ├── UserAvatar.tsx
│   │       └── StatCard.tsx
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页/仪表盘
│   │   ├── Login.tsx        # 登录页
│   │   ├── Register.tsx     # 注册页
│   │   ├── Courses.tsx      # 课程列表
│   │   ├── CourseDetail.tsx # 课程详情
│   │   ├── Learning/        # 学习模块
│   │   │   ├── Vocabulary.tsx
│   │   │   ├── Grammar.tsx
│   │   │   ├── Speaking.tsx
│   │   │   └── Listening.tsx
│   │   ├── Progress.tsx     # 进度追踪
│   │   ├── Community.tsx    # 社区
│   │   ├── Achievements.tsx # 成就
│   │   └── Profile.tsx      # 个人中心
│   ├── hooks/               # 自定义Hooks
│   │   ├── useAuth.ts       # 认证Hook
│   │   ├── useCourse.ts      # 课程Hook
│   │   ├── useProgress.ts    # 进度Hook
│   │   ├── useLearning.ts     # 学习逻辑Hook
│   │   └── useSpeech.ts       # 语音识别Hook
│   ├── stores/              # Zustand状态库
│   │   ├── authStore.ts      # 认证状态
│   │   ├── courseStore.ts    # 课程状态
│   │   ├── progressStore.ts  # 进度状态
│   │   └── uiStore.ts        # UI状态
│   ├── utils/               # 工具函数
│   │   ├── storage.ts        # 本地存储
│   │   ├── validation.ts     # 表单验证
│   │   ├── helpers.ts        # 辅助函数
│   │   └── constants.ts      # 常量定义
│   ├── types/               # TypeScript类型
│   │   ├── user.ts           # 用户类型
│   │   ├── course.ts         # 课程类型
│   │   ├── learning.ts       # 学习类型
│   │   └── community.ts      # 社区类型
│   ├── context/             # React Context
│   │   └── LanguageContext.tsx
│   ├── data/                # 静态数据
│   │   ├── courses.ts        # 课程数据
│   │   ├── vocabulary.ts     # 词汇数据
│   │   └── grammar.ts        # 语法数据
│   ├── App.tsx              # 根组件
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── .env                     # 环境变量
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 2.2 核心模块职责

#### 状态管理层 (Stores)
```
authStore:
- 管理用户登录状态
- 处理用户信息更新
- 权限验证逻辑

courseStore:
- 缓存课程列表
- 管理当前课程状态
- 处理课程数据请求

progressStore:
- 学习进度追踪
- 成就状态管理
- 统计数据计算

uiStore:
- 主题切换
- 侧边栏状态
- 模态框管理
- Toast通知
```

#### 业务Hooks层
```
useAuth:
- 登录/注册/登出逻辑
- 权限验证
- 会话管理

useCourse:
- 课程数据获取
- 章节进度管理
- 内容缓存策略

useProgress:
- 统计数据计算
- 进度更新
- 历史记录查询

useLearning:
- 学习模块核心逻辑
- 题目生成与批改
- 复习计划算法

useSpeech:
- 语音录制
- 音频播放
- 评分逻辑封装
```

## 3. 数据模型设计

### 3.1 用户数据结构
```typescript
interface User {
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

type Language = 'en' | 'ja' | 'ko';
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
```

### 3.2 课程数据结构
```typescript
interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  coverImage: string;
  units: Unit[];
  totalDuration: number;
  totalWords: number;
  enrollmentCount: number;
  rating: number;
}

interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  isLocked: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  duration: number;
  content: LessonContent;
}
```

### 3.3 学习记录数据结构
```typescript
interface LearningRecord {
  id: string;
  userId: string;
  lessonId: string;
  type: 'vocabulary' | 'grammar' | 'speaking' | 'listening';
  score: number;
  timeSpent: number;
  completedAt: Date;
  mistakes?: string[];
}

interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  examples: Example[];
  level: Level;
  nextReviewDate: Date;
  reviewCount: number;
  mastery: number; // 0-100
}
```

## 4. 核心功能实现方案

### 4.1 用户认证流程
```
注册流程:
1. 前端表单验证 (React Hook Form + Zod)
2. 发送验证码 (模拟实现)
3. 提交注册数据
4. 存储用户信息 (localStorage)
5. 自动登录跳转

登录流程:
1. 表单验证
2. 发送登录请求
3. 验证通过存储Token
4. 获取用户信息
5. 更新全局状态
6. 路由跳转

状态持久化:
- Auth Token: localStorage
- 用户信息: Zustand persist
- 刷新Token: 自动续期机制
```

### 4.2 学习模块核心逻辑

#### 单词记忆算法
```typescript
// SM-2 间隔重复算法简化实现
function calculateNextReview(word: VocabularyWord, quality: number): Date {
  const qualityMap = {
    '不认识': 0,
    '模糊': 2,
    '认识': 4,
    '太简单': 5
  };

  const q = qualityMap[quality];
  let interval: number;

  if (word.reviewCount === 0) {
    interval = 1;
  } else if (word.reviewCount === 1) {
    interval = 6;
  } else {
    interval = Math.round(word.nextReviewDate.getTime() * 2.5);
  }

  const newReviewDate = new Date();
  newReviewDate.setDate(newReviewDate.getDate() + interval);

  return newReviewDate;
}
```

#### 语法练习题目生成
```typescript
// 根据用户水平生成难度适中的题目
function generateGrammarExercise(
  level: Level,
  topic: string
): GrammarExercise {
  const exercises = grammarBank[level][topic];
  const randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
}
```

### 4.3 进度追踪实现
```typescript
// 使用Recharts实现数据可视化
function LearningChart({ records }: { records: LearningRecord[] }) {
  const chartData = useMemo(() => {
    return records.reduce((acc, record) => {
      const date = dayjs(record.completedAt).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + record.timeSpent;
      return acc;
    }, {} as Record<string, number>);
  }, [records]);

  return (
    <AreaChart data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Area type="monotone" dataKey="minutes" stroke="#10B981" />
    </AreaChart>
  );
}
```

## 5. 组件设计规范

### 5.1 组件拆分原则
```
拆分维度:
1. 功能独立性: 每个组件只负责一个功能
2. 可复用性: 通用组件抽取到components/ui
3. 可测试性: 逻辑与UI分离
4. 可维护性: 单个文件不超过200行

组件分类:
- UI组件: 纯展示，无业务逻辑 (Button, Card, Input)
- 业务组件: 包含特定业务逻辑 (CourseCard, WordCard)
- 页面组件: 组合多个业务组件 (Home, CourseDetail)
```

### 5.2 组件接口规范
```typescript
// UI组件接口示例
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

// 业务组件接口示例
interface CourseCardProps {
  course: Course;
  progress?: number;
  onEnroll?: () => void;
  onContinue?: () => void;
}
```

### 5.3 Tailwind CSS使用规范
```
命名规范:
- 颜色: text-primary, bg-secondary, border-accent
- 尺寸: text-sm, text-base, text-lg, text-xl
- 间距: p-4, m-4, gap-4, space-y-4
- 圆角: rounded-sm, rounded-md, rounded-lg
- 阴影: shadow-sm, shadow-md, shadow-lg

响应式前缀:
- sm: 手机 (默认)
- md: 平板 (640px+)
- lg: 桌面 (1024px+)

状态前缀:
- hover: 悬停
- focus: 聚焦
- active: 按下
- disabled: 禁用
```

## 6. 路由设计

### 6.1 路由结构
```typescript
const routes = [
  // 公开路由
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  // 受保护路由
  { path: '/courses', component: Courses, auth: true },
  { path: '/courses/:id', component: CourseDetail, auth: true },
  { path: '/learn/:courseId/:lessonId', component: LearningPage, auth: true },
  { path: '/progress', component: Progress, auth: true },
  { path: '/community', component: Community, auth: true },
  { path: '/achievements', component: Achievements, auth: true },
  { path: '/profile', component: Profile, auth: true },
];
```

### 6.2 路由守卫实现
```typescript
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

## 7. 性能优化策略

### 7.1 首屏加载优化
```
优化措施:
1. 路由懒加载: React.lazy() + Suspense
2. 组件懒加载: 按需加载非首屏组件
3. 图片优化: WebP格式 + 懒加载
4. 代码分割: 动态import()
5. 预加载: prefetch关键资源
6. CDN加速: 静态资源托管

实现示例:
const Courses = lazy(() => import('./pages/Courses'));
```

### 7.2 运行时代码优化
```
优化措施:
1. React.memo: 避免不必要的重渲染
2. useMemo: 缓存计算结果
3. useCallback: 缓存回调函数
4. 虚拟列表: 长列表优化 (react-window)
5. 防抖节流: 频繁操作优化
6. 事件委托: 减少事件监听器

实现示例:
const MemoizedCourseCard = memo(CourseCard);
```

### 7.3 数据缓存策略
```
缓存方案:
1. 课程数据: localStorage缓存24小时
2. 用户信息: Zustand persist持久化
3. 图片资源: 浏览器缓存策略
4. API数据: 请求缓存 (axios cache adapter)

更新策略:
- 拉取刷新: 下次访问获取最新
- 定时刷新: 每小时检查更新
- 手动刷新: 用户触发更新
```

## 8. 安全性考虑

### 8.1 前端安全措施
```
防护措施:
1. XSS防护: React自动转义 + CSP策略
2. CSRF防护: Token验证机制
3. 敏感数据: 加密存储localStorage
4. 表单验证: 前端+后端双重验证
5. 权限控制: 路由守卫+API拦截
```

### 8.2 数据验证
```typescript
// 使用Zod进行schema验证
const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20).regex(/[a-zA-Z0-9]/),
  languages: z.array(z.enum(['en', 'ja', 'ko'])).min(1),
});

function RegisterForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: zodResolver(registerSchema),
  });
}
```

## 9. 可访问性(A11Y)规范

### 9.1 语义化HTML
```
规范要点:
1. 使用正确的HTML标签
2. 标题层级: h1 → h2 → h3
3. 表单关联: label + input
4. 按钮使用: button标签
5. 图片alt: 描述性替代文本
```

### 9.2 ARIA支持
```typescript
// 为复杂组件添加ARIA属性
<div
  role="tablist"
  aria-label="学习模块选择"
>
  <button
    role="tab"
    aria-selected={activeTab === 'vocabulary'}
    aria-controls="vocabulary-panel"
  >
    单词记忆
  </button>
</div>
```

## 10. 开发规范

### 10.1 Git提交规范
```
格式: <type>(<scope>): <subject>

type:
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建/工具

示例:
feat(auth): 添加邮箱注册功能
fix(vocabulary): 修复单词发音问题
```

### 10.2 代码审查清单
```
审查要点:
□ 功能完整性: 所有PRD功能已实现
□ 代码质量: 无重复代码，符合规范
□ 类型安全: TypeScript类型完整
□ 性能表现: 首屏<3s，交互<100ms
□ 兼容性: 主流浏览器测试通过
□ 可访问性: 符合WCAG 2.1 AA标准
□ 测试覆盖: 核心功能有单元测试
□ 文档完善: 关键逻辑有注释说明
```

## 11. 部署方案

### 11.1 构建配置
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash-es', 'dayjs'],
        },
      },
    },
  },
});
```

### 11.2 环境配置
```
环境变量:
VITE_API_BASE_URL: API基础地址
VITE_APP_NAME: 应用名称
VITE_ENABLE_ANALYTICS: 是否启用统计
VITE_GA_ID: Google Analytics ID
```
