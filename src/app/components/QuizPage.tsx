import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, LayoutGrid, AlertCircle, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Question Type
type Question = {
  id: string;
  type: 'single' | 'multiple' | 'fill';
  text: string;
  options?: string[];
  correctAnswer: string | string[];
};

const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: 'single',
    text: '《红楼梦》中，“木石前盟”指的是哪两个人的前世姻缘？',
    options: ['贾宝玉与薛宝钗', '贾宝玉与林黛玉', '神瑛侍者与绛珠仙草', '贾瑞与王熙凤'],
    correctAnswer: '2', // index as string
    explanation: '“木石前盟”是指神瑛侍者（贾宝玉前世）和绛珠仙草（林黛玉前世）的姻缘。神瑛侍者曾以甘露之水浇灌绛珠草，绛珠草修成女体后，誓要以下世的眼泪还报他的灌溉之恩。',
  },
  {
    id: 'q2',
    type: 'multiple',
    text: '下列属于“金陵十二钗”正册的有？（多选）',
    options: ['林黛玉', '薛宝琴', '妙玉', '贾元春', '晴雯'],
    correctAnswer: ['0', '2', '3'],
    explanation: '“金陵十二钗”正册包括：林黛玉、薛宝钗、贾元春、贾探春、史湘云、妙玉、贾迎春、贾惜春、王熙凤、巧姐、李纨、秦可卿。薛宝琴不在正册内，晴雯在又副册。',
  },
  {
    id: 'q3',
    type: 'fill',
    text: '“满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中____？”',
    correctAnswer: '味',
    explanation: '出自《红楼梦》第一回的缘起诗。表达了曹雪芹对自己倾尽心血创作此书却恐无人能懂其中真意的孤寂之感。',
  },
  {
    id: 'q4',
    type: 'single',
    text: '贾宝玉在太虚幻境中听到的曲子叫什么名字？',
    options: ['红楼梦引子', '终身误', '枉凝眉', '红楼梦十二支曲'],
    correctAnswer: '3',
    explanation: '警幻仙子让仙女们演唱的十二支曲子总名为《红楼梦十二支曲》，预示了金陵十二钗的悲惨命运。',
  },
  {
    id: 'q5',
    type: 'multiple',
    text: '贾府四春（元、迎、探、惜）的丫鬟名字依次暗含了哪四种风雅之事？',
    options: ['琴', '棋', '书', '画', '诗'],
    correctAnswer: ['0', '1', '2', '3'],
    explanation: '元春的丫鬟叫抱琴，迎春的叫司棋，探春的叫侍书，惜春的叫入画，合起来是“琴棋书画”。',
  }
];

export const QuizPage: React.FC = () => {
  const { mode, id } = useParams<{ mode: string, id: string }>();
  const navigate = useNavigate();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showSheet, setShowSheet] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Take a slice of questions based on mode (if it's random we pretend to take 'id' number of questions)
  const questionCount = mode === 'random' && id ? parseInt(id, 10) : 5;
  const questions = mockQuestions.slice(0, Math.min(questionCount, mockQuestions.length));
  
  const currentQ = questions[currentIdx];

  useEffect(() => {
    if (mode === 'exam' && id) {
      setTimeLeft(parseInt(id, 10) * 60);
    }
  }, [mode, id]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev || 1) - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (optIdxStr: string) => {
    if (currentQ.type === 'single') {
      setAnswers(prev => ({ ...prev, [currentQ.id]: optIdxStr }));
    } else if (currentQ.type === 'multiple') {
      setAnswers(prev => {
        const currentAns = (prev[currentQ.id] as string[]) || [];
        if (currentAns.includes(optIdxStr)) {
          return { ...prev, [currentQ.id]: currentAns.filter(a => a !== optIdxStr) };
        } else {
          return { ...prev, [currentQ.id]: [...currentAns, optIdxStr] };
        }
      });
    }
  };

  const handleFillInput = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSubmit = () => {
    // Navigate to result
    navigate(`/quiz/result/${mode}/${id}`, { state: { answers, questions } });
  };

  const isAnswered = (qId: string) => {
    const ans = answers[qId];
    if (!ans) return false;
    if (Array.isArray(ans) && ans.length === 0) return false;
    return true;
  };

  const getTitle = () => {
    if (mode === 'exam') return '全真模拟大考';
    if (mode === 'random') return '随机抽题';
    if (mode === 'theme') {
      const themeMap: Record<string, string> = {
        'char_baoyu': '贾宝玉',
        'char_daiyu': '林黛玉',
        'char_baochai': '薛宝钗',
        'char_xifeng': '王熙凤',
        'char_other12': '其他十二钗',
        'char_maids': '大丫鬟群像',
        'plot_1_30': '第一回至第三十回',
        'plot_31_60': '第三十一回至第六十回',
        'plot_61_90': '第六十一回至第九十回',
        'plot_91_120': '第九十一回至第一百二十回',
        'detail_poetry': '诗词曲赋',
        'detail_food': '饮食文化',
        'detail_clothes': '服饰妆容',
        'detail_building': '建筑园林',
        'detail_customs': '习俗礼仪',
        'gk_2024_2022': '高考真题(24-22年)',
        'gk_2021_2019': '高考真题(21-19年)',
        'gk_2018_2016': '高考真题(18-16年)'
      };
      return `${themeMap[id || ''] || '专题'} 专项练`;
    }
    return `第${id}回 专项练`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-100)] flex flex-col font-serif selection:bg-[var(--color-seal-red)]/20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-b border-[var(--color-paper-300)] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/main/practice')}
            className="flex items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors p-2 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">退出</span>
          </button>
          
          <div className="flex flex-col items-center">
            <h1 className="text-base font-bold text-[var(--color-ink-900)] tracking-widest">
              {getTitle()}
            </h1>
            <span className="text-xs text-[var(--color-ink-600)] font-sans">
              进度：{currentIdx + 1} / {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {timeLeft !== null && (
              <div className="flex items-center gap-1 text-[var(--color-seal-red)] font-sans text-sm font-medium bg-[var(--color-seal-red)]/10 px-2 py-1 rounded">
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </div>
            )}
            <button 
              onClick={() => setShowSheet(!showSheet)}
              className="p-2 -mr-2 text-[var(--color-ink-600)] hover:text-[var(--color-seal-red)] transition-colors"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-0.5 w-full bg-[var(--color-paper-300)]">
          <motion.div 
            className="h-full bg-[var(--color-seal-red)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {/* Question Type Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[var(--color-ink-900)] text-[var(--color-paper-100)] text-xs tracking-wider">
              {currentQ.type === 'single' ? '单项选择' : currentQ.type === 'multiple' ? '多项选择' : '填空题'}
            </div>

            {/* Question Text */}
            <h2 className="text-xl md:text-2xl leading-relaxed text-[var(--color-ink-900)] mb-8 text-justify font-bold">
              {currentIdx + 1}. {currentQ.text}
            </h2>

            {/* Options */}
            {currentQ.type !== 'fill' && currentQ.options && (
              <div className="space-y-4 font-sans">
                {currentQ.options.map((opt, optIdx) => {
                  const optIdxStr = optIdx.toString();
                  const isSelected = currentQ.type === 'single' 
                    ? answers[currentQ.id] === optIdxStr 
                    : (answers[currentQ.id] as string[])?.includes(optIdxStr);

                  return (
                    <button
                      key={optIdxStr}
                      onClick={() => handleOptionClick(optIdxStr)}
                      className={clsx(
                        "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 group",
                        isSelected 
                          ? "border-[var(--color-seal-red)] bg-[var(--color-seal-red)]/5 shadow-sm" 
                          : "border-[var(--color-paper-300)] hover:border-[var(--color-gold-dark)]/50 hover:bg-white"
                      )}
                    >
                      <div className={clsx(
                        "w-6 h-6 rounded-full border flex items-center justify-center text-sm transition-colors",
                        isSelected 
                          ? "border-[var(--color-seal-red)] bg-[var(--color-seal-red)] text-white" 
                          : "border-[var(--color-ink-400)] group-hover:border-[var(--color-ink-600)] text-[var(--color-ink-600)]"
                      )}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className={clsx(
                        "text-lg",
                        isSelected ? "text-[var(--color-seal-red)] font-medium" : "text-[var(--color-ink-800)]"
                      )}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Fill-in Input */}
            {currentQ.type === 'fill' && (
              <div className="mt-8">
                <input
                  type="text"
                  value={(answers[currentQ.id] as string) || ''}
                  onChange={(e) => handleFillInput(e.target.value)}
                  placeholder="在此输入答案..."
                  className="w-full bg-white border-b-2 border-[var(--color-ink-400)] focus:border-[var(--color-seal-red)] px-4 py-3 text-xl outline-none transition-colors text-center font-serif text-[var(--color-seal-red)] placeholder:text-[var(--color-ink-300)] placeholder:font-sans"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Footer Controls */}
      <footer className="sticky bottom-0 bg-[var(--color-paper-200)]/90 backdrop-blur-md border-t border-[var(--color-paper-300)] p-4 z-30">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-2.5 rounded-full border border-[var(--color-ink-300)] text-[var(--color-ink-600)] hover:bg-[var(--color-ink-900)] hover:text-white hover:border-transparent transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[var(--color-ink-600)] disabled:hover:border-[var(--color-ink-300)] flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> 上一题
          </button>

          {currentIdx === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 rounded-full bg-[var(--color-seal-red)] text-white font-bold tracking-widest shadow-md hover:bg-[#a02a22] transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> 交卷
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              className="px-6 py-2.5 rounded-full border border-[var(--color-ink-300)] text-[var(--color-ink-600)] hover:bg-[var(--color-ink-900)] hover:text-white hover:border-transparent transition-colors flex items-center gap-1"
            >
              下一题 <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

      {/* Answer Sheet Drawer */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSheet(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 bg-[var(--color-paper-100)] z-50 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-[var(--color-paper-300)] max-h-[80vh] flex flex-col"
            >
              <div className="p-4 border-b border-[var(--color-paper-300)] flex items-center justify-between">
                <h3 className="font-bold text-lg text-[var(--color-ink-900)] tracking-widest">答题卡</h3>
                <button onClick={() => setShowSheet(false)} className="text-[var(--color-ink-600)] p-1">
                  关闭
                </button>
              </div>
              <div className="p-6 overflow-y-auto font-sans grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                {questions.map((q, idx) => {
                  const answered = isAnswered(q.id);
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIdx(idx);
                        setShowSheet(false);
                      }}
                      className={clsx(
                        "aspect-square rounded-lg flex items-center justify-center text-lg transition-all",
                        isCurrent 
                          ? "ring-2 ring-[var(--color-seal-red)] ring-offset-2 ring-offset-[var(--color-paper-100)]" 
                          : "",
                        answered
                          ? "bg-[var(--color-seal-red)]/10 text-[var(--color-seal-red)] border border-[var(--color-seal-red)]/30 font-medium"
                          : "bg-white border border-[var(--color-paper-300)] text-[var(--color-ink-600)]"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="p-4 border-t border-[var(--color-paper-300)] flex justify-between items-center bg-[var(--color-paper-200)]/50">
                <div className="flex gap-4 text-sm text-[var(--color-ink-600)]">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-[var(--color-seal-red)]/10 border border-[var(--color-seal-red)]/30 inline-block"></span> 已答
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm bg-white border border-[var(--color-paper-300)] inline-block"></span> 未答
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-full bg-[var(--color-seal-red)] text-white font-serif text-sm hover:bg-[#a02a22] transition-colors"
                >
                  确认交卷
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
