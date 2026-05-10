import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { useCourseStore } from '../../stores/courseStore';
import { useProgressStore } from '../../stores/progressStore';
import { useAuthStore } from '../../stores/authStore';
import { ArrowLeft, Volume2, RotateCcw, Check, X, Zap, Target, Award } from 'lucide-react';

type CardState = 'question' | 'answer';
type FeedbackState = 'none' | 'correct' | 'incorrect';

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: { sentence: string; translation: string }[];
}

const mockWords: Word[] = [
  {
    id: '1',
    word: 'apple',
    pronunciation: '/ˈæpəl/',
    meaning: '苹果',
    partOfSpeech: 'noun',
    examples: [
      { sentence: 'I eat an apple every day.', translation: '我每天吃一个苹果。' }
    ]
  },
  {
    id: '2',
    word: 'beautiful',
    pronunciation: '/ˈbjuːtɪfəl/',
    meaning: '美丽的',
    partOfSpeech: 'adjective',
    examples: [
      { sentence: 'She has a beautiful smile.', translation: '她有美丽的笑容。' }
    ]
  },
  {
    id: '3',
    word: 'run',
    pronunciation: '/rʌn/',
    meaning: '跑',
    partOfSpeech: 'verb',
    examples: [
      { sentence: 'I run every morning.', translation: '我每天早上跑步。' }
    ]
  },
  {
    id: '4',
    word: 'water',
    pronunciation: '/ˈwɔːtər/',
    meaning: '水',
    partOfSpeech: 'noun',
    examples: [
      { sentence: 'Please drink some water.', translation: '请喝一些水。' }
    ]
  },
  {
    id: '5',
    word: 'happy',
    pronunciation: '/ˈhæpi/',
    meaning: '快乐的',
    partOfSpeech: 'adjective',
    examples: [
      { sentence: 'The children look very happy.', translation: '孩子们看起来很开心。' }
    ]
  },
];

export const Vocabulary: React.FC = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { courses } = useCourseStore();
  const { addWordsLearned, addXP, addLearningTime } = useProgressStore();
  const { addPoints } = useAuthStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>('question');
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [score, setScore] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const currentWord = mockWords[currentIndex];

  useEffect(() => {
    if (isSessionComplete) {
      const timeSpent = Math.round((Date.now() - sessionStartTime) / 60000);
      addLearningTime(timeSpent);
      addWordsLearned(mockWords.length);
      addPoints(score);
    }
  }, [isSessionComplete]);

  const handleFlipCard = () => {
    setCardState('answer');
  };

  const handleResponse = (quality: 'again' | 'hard' | 'good' | 'easy') => {
    const qualityScores = {
      again: 0,
      hard: 1,
      good: 2,
      easy: 3
    };

    if (quality === 'good' || quality === 'easy') {
      setFeedback('correct');
      setScore(prev => prev + (quality === 'easy' ? 15 : 10));
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback('none');
      if (currentIndex < mockWords.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setCardState('question');
      } else {
        setIsSessionComplete(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCardState('question');
    setFeedback('none');
    setScore(0);
    setIsSessionComplete(false);
  };

  if (isSessionComplete) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Award className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-display font-bold text-neutral-dark mb-2">
            学习完成！
          </h1>
          <p className="text-neutral-light mb-8">
            太棒了！您已完成本次单词学习
          </p>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{mockWords.length}</p>
                  <p className="text-sm text-neutral-light">学习单词</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{score}</p>
                  <p className="text-sm text-neutral-light">获得积分</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent-en">
                    {Math.round(score / (mockWords.length * 15) * 100)}%
                  </p>
                  <p className="text-sm text-neutral-light">正确率</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={<RotateCcw className="w-5 h-5" />}
                  onClick={handleRestart}
                >
                  再学一遍
                </Button>
                <Button
                  fullWidth
                  leftIcon={<Target className="w-5 h-5" />}
                  onClick={() => navigate(`/courses/${courseId}`)}
                >
                  返回课程
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-neutral-dark hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-light">
            {currentIndex + 1} / {mockWords.length}
          </span>
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">{score}</span>
          </div>
        </div>
      </div>

      <Progress 
        value={(currentIndex + 1) / mockWords.length * 100} 
        className="mb-8" 
      />

      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className={`
                cursor-pointer transition-all duration-300 overflow-hidden
                ${feedback === 'correct' ? 'ring-4 ring-green-500' : ''}
                ${feedback === 'incorrect' ? 'ring-4 ring-red-500' : ''}
              `}
              onClick={cardState === 'question' ? handleFlipCard : undefined}
            >
              <CardContent className="p-12 text-center">
                {cardState === 'question' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <p className="text-5xl font-display font-bold text-neutral-dark">
                      {currentWord.word}
                    </p>
                    <p className="text-lg text-neutral-light">
                      点击卡片查看答案
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-4xl font-display font-bold text-neutral-dark mb-2">
                        {currentWord.word}
                      </p>
                      <p className="text-xl text-primary font-medium">
                        {currentWord.pronunciation}
                      </p>
                    </div>
                    
                    <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm text-neutral-dark">
                      {currentWord.partOfSpeech}
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-secondary mb-4">
                        {currentWord.meaning}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-neutral-dark mb-2">
                        {currentWord.examples[0].sentence}
                      </p>
                      <p className="text-neutral-light">
                        {currentWord.examples[0].translation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {cardState === 'question' ? (
          <Button
            fullWidth
            size="lg"
            onClick={handleFlipCard}
          >
            显示答案
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleResponse('again')}
              className="p-4 bg-red-50 hover:bg-red-100 rounded-xl text-left transition-colors"
            >
              <p className="font-semibold text-red-700 mb-1">不认识</p>
              <p className="text-sm text-red-600">需要更多复习</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleResponse('hard')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl text-left transition-colors"
            >
              <p className="font-semibold text-orange-700 mb-1">模糊</p>
              <p className="text-sm text-orange-600">有点不确定</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleResponse('good')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-colors"
            >
              <p className="font-semibold text-green-700 mb-1">认识</p>
              <p className="text-sm text-green-600">已掌握</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleResponse('easy')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors"
            >
              <p className="font-semibold text-blue-700 mb-1">太简单</p>
              <p className="text-sm text-blue-600">完全掌握</p>
            </motion.button>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-neutral-light">
        <Volume2 className="w-4 h-4" />
        <span className="text-sm">点击卡片或按空格键翻转</span>
      </div>

      <AnimatePresence>
        {feedback === 'correct' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-green-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
              <Check className="w-8 h-8 inline mr-2" />
              正确！
            </div>
          </motion.div>
        )}

        {feedback === 'incorrect' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-red-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg">
              <X className="w-8 h-8 inline mr-2" />
              再想想
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
