/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        secondary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
        },
        accent: {
          en: '#3B82F6',
          ja: '#F43F5E',
          ko: '#8B5CF6',
        },
        neutral: {
          dark: '#1E293B',
          DEFAULT: '#475569',
          light: '#94A3B8',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['Noto Serif SC', 'serif'],
        body: ['Inter', 'Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'layer1': '0 1px 3px rgba(0,0,0,0.1)',
        'layer2': '0 4px 6px rgba(0,0,0,0.1)',
        'layer3': '0 10px 25px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
