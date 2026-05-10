import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'course_en_a1',
    language: 'en',
    level: 'A1',
    title: '英语基础入门',
    titleEn: 'English Basics A1',
    description: '为零基础学习者设计，掌握最基础的英语词汇和日常表达',
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    totalDuration: 1200,
    totalWords: 500,
    enrollmentCount: 12500,
    rating: 4.8,
    category: 'daily-life',
    isPopular: true,
    units: [
      {
        id: 'unit_en_a1_1',
        title: '问候与介绍',
        titleEn: 'Greetings & Introductions',
        isLocked: false,
        progress: 60,
        lessons: [
          {
            id: 'lesson_en_a1_1_1',
            title: 'Hello & Goodbye',
            titleEn: 'Hello & Goodbye',
            type: 'vocabulary',
            duration: 15,
            isCompleted: true,
            score: 90,
            content: {
              items: [
                { id: 'w1', type: 'word', content: 'hello', pronunciation: '/həˈloʊ/', translation: '你好', examples: [{ sentence: 'Hello, my name is Tom.', translation: '你好，我叫汤姆。' }] },
                { id: 'w2', type: 'word', content: 'goodbye', pronunciation: '/ɡʊdˈbaɪ/', translation: '再见', examples: [{ sentence: 'Goodbye, see you tomorrow!', translation: '再见，明天见！' }] },
                { id: 'w3', type: 'word', content: 'hi', pronunciation: '/haɪ/', translation: '嗨', examples: [{ sentence: 'Hi, how are you?', translation: '嗨，你好吗？' }] },
                { id: 'w4', type: 'word', content: 'morning', pronunciation: '/ˈmɔːrnɪŋ/', translation: '早上', examples: [{ sentence: 'Good morning!', translation: '早上好！' }] },
              ],
              instructions: '学习基础的问候语'
            }
          },
          {
            id: 'lesson_en_a1_1_2',
            title: '自我介绍',
            titleEn: 'Self Introduction',
            type: 'vocabulary',
            duration: 20,
            isCompleted: true,
            score: 85,
            content: {
              items: [
                { id: 'w5', type: 'word', content: 'name', pronunciation: '/neɪm/', translation: '名字', examples: [{ sentence: 'My name is...', translation: '我的名字是...' }] },
                { id: 'w6', type: 'word', content: 'age', pronunciation: '/eɪdʒ/', translation: '年龄', examples: [{ sentence: 'I am 25 years old.', translation: '我25岁了。' }] },
                { id: 'w7', type: 'word', content: 'country', pronunciation: '/ˈkʌntri/', translation: '国家', examples: [{ sentence: 'I am from China.', translation: '我来自中国。' }] },
              ]
            }
          }
        ]
      },
      {
        id: 'unit_en_a1_2',
        title: '数字与时间',
        titleEn: 'Numbers & Time',
        isLocked: false,
        progress: 30,
        lessons: [
          {
            id: 'lesson_en_a1_2_1',
            title: '数字1-100',
            titleEn: 'Numbers 1-100',
            type: 'vocabulary',
            duration: 25,
            isCompleted: false,
            content: {
              items: [
                { id: 'n1', type: 'word', content: 'one', pronunciation: '/wʌn/', translation: '一', examples: [{ sentence: 'I have one apple.', translation: '我有一个苹果。' }] },
                { id: 'n2', type: 'word', content: 'two', pronunciation: '/tuː/', translation: '二', examples: [{ sentence: 'Two plus two is four.', translation: '二加二等于四。' }] },
              ]
            }
          }
        ]
      },
      {
        id: 'unit_en_a1_3',
        title: '日常用语',
        titleEn: 'Daily Expressions',
        isLocked: true,
        progress: 0,
        lessons: []
      }
    ]
  },
  {
    id: 'course_en_a2',
    language: 'en',
    level: 'A2',
    title: '日常英语会话',
    titleEn: 'Daily English Conversations',
    description: '提升日常交流能力，学习实用口语表达',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    totalDuration: 1500,
    totalWords: 800,
    enrollmentCount: 8900,
    rating: 4.7,
    category: 'conversation',
    isNew: true,
    units: []
  },
  {
    id: 'course_ja_n5',
    language: 'ja',
    level: 'N5',
    title: '日语五十音入门',
    titleEn: 'Japanese Hiragana Basics',
    description: '从零开始学习日语假名，掌握日语发音基础',
    coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
    totalDuration: 800,
    totalWords: 300,
    enrollmentCount: 15600,
    rating: 4.9,
    category: 'vocabulary',
    isPopular: true,
    units: [
      {
        id: 'unit_ja_n5_1',
        title: 'あ行 か行',
        titleEn: 'A-row & Ka-row',
        isLocked: false,
        progress: 100,
        lessons: [
          {
            id: 'lesson_ja_n5_1_1',
            title: 'あ い う え お',
            titleEn: 'A I U E O',
            type: 'vocabulary',
            duration: 20,
            isCompleted: true,
            score: 95,
            content: {
              items: [
                { id: 'ja1', type: 'word', content: 'あ', pronunciation: 'a', translation: 'あ', examples: [{ sentence: 'あお (ao) - 蓝色', translation: '蓝色' }] },
                { id: 'ja2', type: 'word', content: 'い', pronunciation: 'i', translation: 'い', examples: [{ sentence: 'いぬ (inu) - 狗', translation: '狗' }] },
                { id: 'ja3', type: 'word', content: 'う', pronunciation: 'u', translation: 'う', examples: [{ sentence: 'うみ (umi) - 大海', translation: '大海' }] },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course_ja_n4',
    language: 'ja',
    level: 'N4',
    title: '日语中级语法',
    titleEn: 'Intermediate Japanese Grammar',
    description: '系统学习N4级别语法，提升阅读理解能力',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    totalDuration: 2000,
    totalWords: 1200,
    enrollmentCount: 6200,
    rating: 4.6,
    category: 'grammar',
    units: []
  },
  {
    id: 'course_ko_topik1',
    language: 'ko',
    level: 'TOPIK1',
    title: '韩语基础会话',
    titleEn: 'Korean Basic Conversations',
    description: '学习韩语基础发音和日常表达，感受韩流文化',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    totalDuration: 900,
    totalWords: 400,
    enrollmentCount: 11200,
    rating: 4.8,
    category: 'conversation',
    isPopular: true,
    units: [
      {
        id: 'unit_ko_1',
        title: '韩文字母发音',
        titleEn: 'Korean Alphabet',
        isLocked: false,
        progress: 50,
        lessons: [
          {
            id: 'lesson_ko_1_1',
            title: '子音 ㄱ ㄴ ㄷ',
            titleEn: 'Consonants ㄱ ㄴ ㄷ',
            type: 'vocabulary',
            duration: 25,
            isCompleted: false,
            content: {
              items: [
                { id: 'ko1', type: 'word', content: 'ㄱ', pronunciation: 'g/k', translation: 'ㄱ', examples: [{ sentence: '가다 (gada) - 去', translation: '去' }] },
                { id: 'ko2', type: 'word', content: 'ㄴ', pronunciation: 'n', translation: 'ㄴ', examples: [{ sentence: '나 (na) - 我', translation: '我' }] },
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course_ko_topik2',
    language: 'ko',
    level: 'TOPIK2',
    title: '韩语TOPIK II备考',
    titleEn: 'Korean TOPIK II Prep',
    description: '针对TOPIK II考试的系统备考课程',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800',
    totalDuration: 2500,
    totalWords: 2000,
    enrollmentCount: 4500,
    rating: 4.5,
    category: 'exam-prep',
    isNew: true,
    units: []
  }
];

export const mockVocabulary = {
  en: [
    { id: 'v1', word: 'apple', pronunciation: '/ˈæpəl/', meaning: '苹果', partOfSpeech: 'noun', examples: [{ sentence: 'I eat an apple every day.', translation: '我每天吃一个苹果。' }], level: 'A1', mastery: 80, nextReviewDate: new Date(), reviewCount: 5, timesCorrect: 4, timesIncorrect: 1 },
    { id: 'v2', word: 'beautiful', pronunciation: '/ˈbjuːtɪfəl/', meaning: '美丽的', partOfSpeech: 'adj', examples: [{ sentence: 'She is beautiful.', translation: '她很美丽。' }], level: 'A1', mastery: 60, nextReviewDate: new Date(), reviewCount: 3, timesCorrect: 2, timesIncorrect: 1 },
  ],
  ja: [
    { id: 'jv1', word: '猫', pronunciation: 'ねこ', meaning: '猫', partOfSpeech: 'noun', examples: [{ sentence: '猫が可愛い。', translation: '猫很可爱。' }], level: 'N5', mastery: 90, nextReviewDate: new Date(), reviewCount: 6, timesCorrect: 6, timesIncorrect: 0 },
    { id: 'jv2', word: '食べる', pronunciation: 'たべる', meaning: '吃', partOfSpeech: 'verb', examples: [{ sentence: '何を食べますか？', translation: '你吃什么？' }], level: 'N5', mastery: 75, nextReviewDate: new Date(), reviewCount: 4, timesCorrect: 3, timesIncorrect: 1 },
  ],
  ko: [
    { id: 'kv1', word: '사랑', pronunciation: 'sarang', meaning: '爱', partOfSpeech: 'noun', examples: [{ sentence: '사랑해요.', translation: '我爱你。' }], level: 'TOPIK1', mastery: 85, nextReviewDate: new Date(), reviewCount: 5, timesCorrect: 5, timesIncorrect: 0 },
  ]
};

export const mockGrammarExamples = {
  en: [
    { id: 'g1', rule: 'be动词', structure: '主语 + be动词 + 表语', usage: '描述身份、状态', examples: [{ sentence: 'I am a student.', translation: '我是一个学生。' }] },
    { id: 'g2', rule: '现在进行时', structure: '主语 + be动词 + 动词ing', usage: '表示正在进行的动作', examples: [{ sentence: 'She is reading a book.', translation: '她正在读书。' }] },
  ],
  ja: [
    { id: 'jg1', rule: '名词です', structure: '名词 + です', usage: '表示肯定陈述', examples: [{ sentence: '私は学生です。', translation: '我是学生。' }] },
    { id: 'jg2', rule: '动词ます形', structure: '动词词干 + ます', usage: '动词现在时肯定式', examples: [{ sentence: '食べます。', translation: '吃。' }] },
  ],
  ko: [
    { id: 'kg1', rule: '입니다', structure: '名词 + 입니다', usage: '正式尊敬体陈述', examples: [{ sentence: '저는 학생입니다.', translation: '我是学生。' }] },
  ]
};

export const languageConfig = {
  en: {
    name: '英语',
    nameEn: 'English',
    flag: '🇺🇸',
    color: 'accent-en',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    levelNames: {
      A1: '初学者',
      A2: '初级',
      B1: '中级',
      B2: '中高级',
      C1: '高级',
      C2: '精通'
    }
  },
  ja: {
    name: '日语',
    nameEn: 'Japanese',
    flag: '🇯🇵',
    color: 'accent-ja',
    levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
    levelNames: {
      N5: '入门',
      N4: '初级',
      N3: '中级',
      N2: '中高级',
      N1: '高级'
    }
  },
  ko: {
    name: '韩语',
    nameEn: 'Korean',
    flag: '🇰🇷',
    color: 'accent-ko',
    levels: ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6'],
    levelNames: {
      TOPIK1: 'TOPIK I',
      TOPIK2: 'TOPIK II',
      TOPIK3: 'TOPIK III',
      TOPIK4: 'TOPIK IV',
      TOPIK5: 'TOPIK V',
      TOPIK6: 'TOPIK VI'
    }
  }
};
