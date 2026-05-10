# 🌐 LinguaFlow - 凌语言

> 多语种在线学习平台 | 多言語オンライン学習プラットフォーム | Multi-language Online Learning Platform

[简体中文](./README.md) | [English](./README_EN.md)

---

## 📖 简介

LinguaFlow（凌语言）是一款专注于英语、日语、韩语学习的沉浸式在线教育平台，致力于为学习者提供科学、系统、有趣的语言学习体验。

### ✨ 核心特性

- 🎯 **分级课程体系** - 涵盖CEFR、JLPT、TOPIK等国际化标准
- 🧠 **智能记忆系统** - 基于艾宾浩斯遗忘曲线的间隔重复算法
- 🎤 **互动学习模块** - 单词记忆、语法练习、口语跟读、听力训练
- 📊 **学习进度追踪** - 数据可视化分析，实时掌握学习状态
- 🤖 **个性化推荐** - AI驱动的智能学习路径优化
- 🏆 **成就激励系统** - 游戏化的学习体验，持续获得成就感
- 👥 **社区交流** - 学习小组、话题讨论、经验分享

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装

```bash
# 克隆项目
git clone https://github.com/chin9933/linguflow.git

# 进入项目目录
cd linguflow

# 安装依赖
npm install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS 3 |
| 状态管理 | Zustand |
| 路由 | React Router v6 |
| 图表 | Recharts |
| 动画 | Framer Motion |
| 图标 | Lucide React |
| 表单验证 | React Hook Form + Zod |

## 📁 项目结构

```
linguflow/
├── src/
│   ├── api/                 # API 接口层
│   ├── components/          # 组件目录
│   │   ├── ui/             # 基础 UI 组件
│   │   ├── layout/          # 布局组件
│   │   └── common/          # 业务通用组件
│   ├── pages/               # 页面组件
│   │   ├── Learning/        # 学习模块
│   │   └── Course/          # 课程相关
│   ├── hooks/               # 自定义 Hooks
│   ├── stores/              # Zustand 状态管理
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   ├── data/                # 静态数据
│   └── App.tsx              # 根组件
├── public/                  # 静态资源
└── package.json
```

## 🎨 设计系统

### 配色方案

- **主色**: #10B981 (翡翠绿) - 成长、生机
- **辅助色**: #6366F1 (靛蓝紫) - 智慧、创造力
- **英语主题**: #3B82F6 (天空蓝)
- **日语主题**: #F43F5E (玫瑰红)
- **韩语主题**: #8B5CF6 (紫罗兰)

### 字体

- **显示字体**: Noto Serif SC
- **正文字体**: Inter, Noto Sans SC
- **代码字体**: JetBrains Mono

## 📚 支持的语言

### 🇺🇸 英语 (CEFR 标准)

| 等级 | 描述 | 词汇量 |
|------|------|--------|
| A1 | 初学者 | 800+ |
| A2 | 初级 | 1500+ |
| B1 | 中级 | 3500+ |
| B2 | 中高级 | 5500+ |
| C1 | 高级 | 10000+ |
| C2 | 精通 | 接近母语 |

### 🇯🇵 日语 (JLPT 标准)

| 等级 | 描述 | 词汇量 |
|------|------|--------|
| N5 | 入门 | 800 |
| N4 | 初级 | 1500 |
| N3 | 中级 | 3000 |
| N2 | 中高级 | 6000 |
| N1 | 高级 | 10000 |

### 🇰🇷 韩语 (TOPIK 标准)

| 等级 | 描述 | 词汇量 |
|------|------|--------|
| TOPIK I | 1-2级 | 1500 |
| TOPIK II | 3-4级 | 3500 |
| TOPIK II | 5-6级 | 6000 |

## 🔧 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.tsx` 中添加路由
3. 如需权限控制，使用 `ProtectedRoute` 组件

### 添加新组件

1. UI 组件放在 `src/components/ui/`
2. 业务组件放在 `src/components/common/`
3. 遵循组件命名规范（大驼峰）

### 样式规范

- 使用 Tailwind CSS 原子化类名
- 自定义颜色在 `tailwind.config.js` 中配置
- 组件样式优先使用 `@apply` 指令

## 📱 响应式设计

- **移动端**: < 640px
- **平板端**: 640px - 1024px
- **桌面端**: > 1024px

## 🔒 安全建议

- 不要提交 `.env` 文件到仓库
- 使用环境变量管理敏感配置
- 定期更新依赖包版本

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🙏 致谢

- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [React](https://react.dev/) - 用于构建用户界面的 JavaScript 库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Lucide](https://lucide.dev/) - 漂亮的图标
- [Unsplash](https://unsplash.com/) - 免费高清图片

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/chin9933/linguflow/issues)
- 邮箱: support@linguaflow.com

---

<div align="center">

Made with ❤️ by [chin9933](https://github.com/chin9933)

</div>
