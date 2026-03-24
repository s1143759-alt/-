import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle, XCircle, BookOpen, RotateCcw, Target } from 'lucide-react';
import { clsx } from 'clsx';

type Question = {
  id: string;
  type: 'single' | 'multiple' | 'fill';
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
};

export const QuizResult: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { answers?: Record<string, string | string[]>, questions?: Question[] } | null;
  const answers = state?.answers || {};
  const questions = state?.questions || [];

  // If no state, go back
  if (!state || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper-100)]">
        <button onClick={() => navigate('/main/practice')} className="text-[var(--color-seal-red)] underline">
          返回主页
        </button>
      </div>
    );
  }

  // Calculate Score
  let correctCount = 0;
  const results = questions.map(q => {
    const userAns = answers[q.id];
    let isCorrect = false;

    if (q.type === 'single' || q.type === 'fill') {
      isCorrect = userAns === q.correctAnswer;
    } else if (q.type === 'multiple') {
      const uArr = Array.isArray(userAns) ? [...userAns].sort() : [];
      const cArr = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
      isCorrect = uArr.length === cArr.length && uArr.every((val, i) => val === cArr[i]);
    }

    if (isCorrect) correctCount++;
    return { ...q, isCorrect, userAns };
  });

  const score = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] font-serif pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/main/practice')}
            className="flex items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors p-2 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">返回练红楼</span>
          </button>
          <h1 className="text-base font-bold text-[var(--color-ink-900)] tracking-widest">
            测验结算
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[16px] p-8 shadow-sm border border-[var(--color-paper-300)] text-center relative overflow-hidden"
        >
          {score >= 80 && (
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
          )}
          {score < 60 && (
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl"></div>
          )}

          <h2 className="text-[var(--color-ink-600)] text-lg mb-4">本次得分</h2>
          <div className="text-6xl md:text-8xl font-bold font-serif text-[var(--color-seal-red)] mb-6 drop-shadow-sm">
            {score}
          </div>
          
          <div className="flex justify-center gap-8 text-sm text-[var(--color-ink-800)] font-sans">
            <div className="flex flex-col items-center">
              <span className="text-[var(--color-ink-500)] mb-1">总题数</span>
              <span className="text-xl font-serif">{questions.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[var(--color-ink-500)] mb-1">答对</span>
              <span className="text-xl font-serif text-green-600">{correctCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[var(--color-ink-500)] mb-1">答错</span>
              <span className="text-xl font-serif text-red-600">{questions.length - correctCount}</span>
            </div>
          </div>
        </motion.div>

        {/* Detailed Results */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[var(--color-ink-900)] flex items-center gap-2">
            <Target className="w-6 h-6 text-[var(--color-seal-red)]" /> 题目解析
          </h3>

          {results.map((res, idx) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[12px] p-6 shadow-sm border border-[var(--color-paper-300)]"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1">
                  {res.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm px-2 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-600)] rounded-sm font-sans">
                      {res.type === 'single' ? '单选' : res.type === 'multiple' ? '多选' : '填空'}
                    </span>
                    <span className="text-[var(--color-ink-500)] text-sm font-sans">第 {idx + 1} 题</span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--color-ink-900)] leading-relaxed">
                    {res.text}
                  </h4>
                </div>
              </div>

              {/* User Answer vs Correct Answer */}
              <div className="bg-[var(--color-paper-100)] rounded-lg p-4 mb-4 font-sans text-sm space-y-3">
                <div className="flex items-start gap-4">
                  <span className="text-[var(--color-ink-500)] w-16 shrink-0">你的答案</span>
                  <span className={clsx("font-medium", res.isCorrect ? "text-green-600" : "text-red-500")}>
                    {renderAnswerText(res.userAns, res)}
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[var(--color-ink-500)] w-16 shrink-0">正确答案</span>
                  <span className="font-medium text-green-600">
                    {renderAnswerText(res.correctAnswer, res)}
                  </span>
                </div>
              </div>

              {/* Explanation & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-end">
                <div className="flex-1">
                  <h5 className="text-[var(--color-ink-800)] font-bold mb-1 flex items-center gap-1 text-sm">
                    <BookOpen className="w-4 h-4" /> 解析与出处
                  </h5>
                  <p className="text-[var(--color-ink-600)] text-sm leading-relaxed font-sans">
                    {res.explanation || '此题解析正在由夫子整理中，敬请期待。原文出处：前八十回相关章节。'}
                  </p>
                </div>
                {!res.isCorrect && (
                  <button className="shrink-0 px-4 py-2 border border-[var(--color-seal-red)] text-[var(--color-seal-red)] rounded-full text-sm hover:bg-[var(--color-seal-red)] hover:text-white transition-colors">
                    加入错题本
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4 pt-8">
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-full border-2 border-[var(--color-ink-300)] text-[var(--color-ink-700)] font-bold tracking-widest hover:bg-[var(--color-paper-200)] transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> 再测一次
          </button>
          <button 
            onClick={() => navigate('/main/practice')}
            className="px-8 py-3 rounded-full bg-[var(--color-seal-red)] text-white font-bold tracking-widest hover:bg-[#a02a22] shadow-md transition-colors"
          >
            返回练红楼
          </button>
        </div>

      </main>
    </div>
  );
};

// Helper to render answers based on type
function renderAnswerText(ans: string | string[] | undefined, question: Question) {
  if (!ans || (Array.isArray(ans) && ans.length === 0)) return '未作答';
  
  if (question.type === 'fill') {
    return ans as string;
  }

  const getOptionText = (indexStr: string) => {
    const idx = parseInt(indexStr, 10);
    if (question.options && question.options[idx]) {
      return `${String.fromCharCode(65 + idx)}: ${question.options[idx]}`;
    }
    return indexStr;
  };

  if (Array.isArray(ans)) {
    return ans.map(getOptionText).join('，');
  }
  
  return getOptionText(ans);
}
