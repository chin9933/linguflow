# 🌐 LinguaFlow - LinguaFlow

> 多语种在线学习平台 | 多言語オンライン学習プラットフォーム | Multi-language Online Learning Platform

[简体中文](./README.md) | [English](./README_EN.md)

---

## 📖 Introduction

LinguaFlow is an immersive online education platform focused on learning English, Japanese, and Korean, dedicated to providing learners with a scientific, systematic, and fun language learning experience.

### ✨ Core Features

- 🎯 **Structured Course System** - Covering international standards like CEFR, JLPT, TOPIK
- 🧠 **Smart Memory System** - Spaced repetition algorithm based on Ebbinghaus forgetting curve
- 🎤 **Interactive Learning Modules** - Vocabulary memorization, grammar practice, speaking practice, listening training
- 📊 **Learning Progress Tracking** - Data visualization analysis, real-time learning status
- 🤖 **Personalized Recommendations** - AI-driven intelligent learning path optimization
- 🏆 **Achievement System** - Gamified learning experience, continuous sense of accomplishment
- 👥 **Community Interaction** - Study groups, topic discussions, experience sharing

## 🚀 Quick Start

### Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm >= 8.0.0

### Installation

```bash
# Clone the project
git clone https://github.com/chin9933/linguflow.git

# Navigate to project directory
cd linguflow

# Install dependencies
npm install

# Or use pnpm
pnpm install
```

### Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to view the application.

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand |
| Routing | React Router v6 |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| Form Validation | React Hook Form + Zod |

## 📁 Project Structure

```
linguflow/
├── src/
│   ├── api/                 # API layer
│   ├── components/          # Component directory
│   │   ├── ui/             # Basic UI components
│   │   ├── layout/          # Layout components
│   │   └── common/          # Business common components
│   ├── pages/               # Page components
│   │   ├── Learning/        # Learning modules
│   │   └── Course/          # Course related
│   ├── hooks/               # Custom Hooks
│   ├── stores/              # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── data/                # Static data
│   └── App.tsx              # Root component
├── public/                  # Static assets
└── package.json
```

## 🎨 Design System

### Color Scheme

- **Primary**: #10B981 (Emerald Green) - Growth, vitality
- **Secondary**: #6366F1 (Indigo Purple) - Wisdom, creativity
- **English Theme**: #3B82F6 (Sky Blue)
- **Japanese Theme**: #F43F5E (Rose Red)
- **Korean Theme**: #8B5CF6 (Violet)

### Typography

- **Display Font**: Noto Serif SC
- **Body Font**: Inter, Noto Sans SC
- **Code Font**: JetBrains Mono

## 📚 Supported Languages

### 🇺🇸 English (CEFR Standard)

| Level | Description | Vocabulary |
|-------|-------------|------------|
| A1 | Beginner | 800+ |
| A2 | Elementary | 1500+ |
| B1 | Intermediate | 3500+ |
| B2 | Upper Intermediate | 5500+ |
| C1 | Advanced | 10000+ |
| C2 | Proficiency | Near-native |

### 🇯🇵 Japanese (JLPT Standard)

| Level | Description | Vocabulary |
|-------|-------------|------------|
| N5 | Beginner | 800 |
| N4 | Elementary | 1500 |
| N3 | Intermediate | 3000 |
| N2 | Upper Intermediate | 6000 |
| N1 | Advanced | 10000 |

### 🇰🇷 Korean (TOPIK Standard)

| Level | Description | Vocabulary |
|-------|-------------|------------|
| TOPIK I | Level 1-2 | 1500 |
| TOPIK II | Level 3-4 | 3500 |
| TOPIK II | Level 5-6 | 6000 |

## 🔧 Development Guide

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Use `ProtectedRoute` component for authentication control

### Adding New Components

1. UI components go in `src/components/ui/`
2. Business components go in `src/components/common/`
3. Follow component naming conventions (PascalCase)

### Style Guidelines

- Use Tailwind CSS atomic class names
- Configure custom colors in `tailwind.config.js`
- Prefer using `@apply` directive for component styles

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Tips

- Don't commit `.env` files to the repository
- Use environment variables for sensitive configuration
- Regularly update dependency versions

## 📄 License

This project is open source under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Unsplash](https://unsplash.com/) - Free high-quality images

## 📞 Contact

- GitHub Issues: [Submit Issues](https://github.com/chin9933/linguflow/issues)
- Email: support@linguaflow.com

---

<div align="center">

Made with ❤️ by [chin9933](https://github.com/chin9933)

</div>
