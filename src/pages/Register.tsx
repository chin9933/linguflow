import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Check, ArrowRight, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../stores/authStore';
import { Language } from '../types';

const registerSchema = z.object({
  username: z.string().min(3, '用户名至少3个字符').max(20, '用户名最多20个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8个字符').regex(/[a-zA-Z0-9]/, '密码必须包含字母和数字'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "两次密码输入不一致",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const languageOptions = [
  { code: 'en' as Language, name: '英语', flag: '🇺🇸', color: 'bg-blue-500' },
  { code: 'ja' as Language, name: '日语', flag: '🇯🇵', color: 'bg-red-500' },
  { code: 'ko' as Language, name: '韩语', flag: '🇰🇷', color: 'bg-purple-500' },
];

const goalOptions = [
  { value: 'exam', label: '考试备考', icon: '📝' },
  { value: 'work', label: '工作需要', icon: '💼' },
  { value: 'travel', label: '旅行交流', icon: '✈️' },
  { value: 'hobby', label: '兴趣爱好', icon: '🎯' },
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [step, setStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const toggleLanguage = (lang: Language) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleNextStep = async () => {
    if (step === 1 && selectedLanguages.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedGoal) {
      setStep(3);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    const success = await registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
      languages: selectedLanguages,
      goal: selectedGoal,
      dailyMinutes: 30,
    });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-bold text-neutral-dark mb-2">
            开始学习之旅
          </h1>
          <p className="text-neutral-light">
            创建您的 LinguaFlow 账户
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-layer3 p-8"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                  ${step >= s ? 'bg-primary text-white' : 'bg-gray-100 text-neutral-light'}
                `}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 rounded ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-neutral-dark mb-4 text-center">
                  选择您想学习的语言
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {languageOptions.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`
                        p-6 rounded-xl border-2 transition-all text-center
                        ${selectedLanguages.includes(lang.code)
                          ? 'border-primary bg-primary bg-opacity-5'
                          : 'border-gray-200 hover:border-primary'
                        }
                      `}
                    >
                      <span className="text-4xl mb-2 block">{lang.flag}</span>
                      <span className="font-medium text-neutral-dark">{lang.name}</span>
                      {selectedLanguages.includes(lang.code) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2"
                        >
                          <Check className="w-6 h-6 text-primary mx-auto" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-dark mb-3">学习目标</h3>
                <div className="grid grid-cols-2 gap-3">
                  {goalOptions.map((goal) => (
                    <motion.button
                      key={goal.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedGoal(goal.value)}
                      className={`
                        p-4 rounded-lg border-2 transition-all text-left
                        ${selectedGoal === goal.value
                          ? 'border-primary bg-primary bg-opacity-5'
                          : 'border-gray-200 hover:border-primary'
                        }
                      `}
                    >
                      <span className="text-2xl mr-2">{goal.icon}</span>
                      <span className="font-medium text-neutral-dark">{goal.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNextStep}
                fullWidth
                size="lg"
                disabled={selectedLanguages.length === 0 || !selectedGoal}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                下一步
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-neutral-dark mb-4 text-center">
                设置您的账户
              </h2>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm text-neutral-dark">
                    学习语言：{selectedLanguages.map(l => languageOptions.find(opt => opt.code === l)?.name).join('、')}
                  </span>
                </div>
              </div>

              <form className="space-y-4">
                <Input
                  label="用户名"
                  placeholder="您的用户名"
                  leftIcon={<User className="w-5 h-5" />}
                  error={errors.username?.message}
                  {...register('username')}
                />

                <Input
                  label="邮箱地址"
                  type="email"
                  placeholder="your@email.com"
                  leftIcon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="relative">
                  <Input
                    label="密码"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    leftIcon={<Lock className="w-5 h-5" />}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-neutral-light hover:text-neutral-dark transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Input
                  label="确认密码"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-5 h-5" />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </form>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="ghost"
                  fullWidth
                >
                  上一步
                </Button>
                <Button
                  onClick={handleSubmit(handleNextStep)}
                  fullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  下一步
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-neutral-dark mb-2">
                  准备开始！
                </h2>
                <p className="text-neutral-light">
                  确认您的信息并创建账户
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-light">用户名</span>
                  <span className="font-medium text-neutral-dark">待填写</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-light">邮箱</span>
                  <span className="font-medium text-neutral-dark">待填写</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-light">学习语言</span>
                  <span className="font-medium text-neutral-dark">
                    {selectedLanguages.map(l => languageOptions.find(opt => opt.code === l)?.name).join('、')}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="ghost"
                  fullWidth
                >
                  上一步
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  loading={isLoading}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  创建账户
                </Button>
              </div>

              <p className="text-center text-xs text-neutral-light">
                创建账户即表示您同意我们的{' '}
                <a href="#" className="text-primary">服务条款</a> 和{' '}
                <a href="#" className="text-primary">隐私政策</a>
              </p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-neutral-light">
            已有账户？{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
              立即登录
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
